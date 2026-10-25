import { profile, about, stack, career, projects, bookshelf, workingOn, homelab } from './data.js';
import { initPaging } from './paging.js';
import { renderHeroLinks } from './linkcards.js';

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const ext = (href) => href.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : '';
const icon = (name) => name ? `<span class="icon" style="--icon:url(/images/icons/${esc(name)}.png)" aria-hidden="true"></span>` : '';

// Safety net: any link to another site opens in a new tab, including ones added later
document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || !/^https?:/.test(a.href) || new URL(a.href).origin === location.origin) return;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
}, true);

// ---------- content ----------

$('name').textContent = profile.name;
$('tagline').textContent = profile.tagline;
$('lede').textContent = profile.lede;
// Intro details: current role, local time, what I'm up to, latest GitHub activity
const currentRole = career.find((r) => !r.end);
renderHeroLinks($('hero-links'), profile, currentRole);
// Each "lately" item links to Side quests and highlights what it refers to
const lately = [
    workingOn[0] && `<a href="#side-quests" data-highlight="slide">Building ${esc(workingOn[0].title)}</a>`,
].filter(Boolean).join(' · ');
$('hero-meta').innerHTML = [
    currentRole && `<dt>now</dt><dd>${esc(currentRole.role)} at ${esc(currentRole.company)}</dd>`,
    `<dt>local</dt><dd>${esc(profile.location)} · <span id="local-time"></span></dd>`,
    lately && `<dt>lately</dt><dd>${lately}</dd>`,
    `<dt class="gh-row" hidden>activity</dt><dd class="gh-row" id="gh-activity" hidden></dd>`,
].filter(Boolean).join('');

const timeFormat = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit', timeZone: profile.timezone });
const tickTime = () => { $('local-time').textContent = `${timeFormat.format(new Date())} ${profile.timezoneLabel}`; };
tickTime();
setInterval(tickTime, 30000);

const ago = (date) => {
    const mins = Math.round((Date.now() - date) / 60000);
    if (mins < 60) return `${Math.max(mins, 1)} min ago`;
    const hours = Math.round(mins / 60);
    if (hours < 24) return `${hours} h ago`;
    const days = Math.round(hours / 24);
    return days === 1 ? 'yesterday' : `${days} days ago`;
};
// Most recent public push; the row stays hidden if GitHub can't be reached
fetch(`https://api.github.com/users/${encodeURIComponent(profile.github)}/events/public?per_page=30`)
    .then((r) => (r.ok ? r.json() : []))
    .then((events) => {
        const push = events.find((e) => e.type === 'PushEvent');
        if (!push) return;
        const repo = push.repo.name;
        $('gh-activity').innerHTML = `Pushed to <a href="https://github.com/${esc(repo)}"${ext('https://')}>${esc(repo.split('/')[1])}</a> · ${ago(new Date(push.created_at))}`;
        document.querySelectorAll('.gh-row').forEach((el) => { el.hidden = false; });
    })
    .catch(() => {});

$('about-text').innerHTML = about.map((p) => `<p>${esc(p)}</p>`).join('');

$('stack').innerHTML = Object.entries(stack).map(([k, v]) =>
    `<dt>${esc(k)}</dt><dd>${v.map(esc).join(', ')}</dd>`
).join('');

const logoImg = (p, src, variant) =>
    `<img class="card-logo ${variant}" src="${esc(src)}" alt="${esc(p.title)} logo" style="height:${Number(p.logoHeight) || 28}px" />`;
// Professional experience: a time bar from the first role to today, then the roles
const monthIndex = (ym) => { const [y, m] = ym.split('-').map(Number); return y * 12 + (m - 1); };
const now = new Date();
const nowIndex = now.getFullYear() * 12 + now.getMonth();
const endIndex = (r) => (r.end ? monthIndex(r.end) + 1 : nowIndex + 1);
const firstIndex = Math.min(...career.map((r) => monthIndex(r.start)));
const monthName = (ym) => new Date(`${ym}-01T00:00:00`).toLocaleString('en', { month: 'short', year: 'numeric' });

// The bar's scale counts only months spent in a role, so gaps between jobs take no
// space: each role keeps its true length and the next one starts right after it.
// (The dates listed below are unchanged.)
const worked = career.map((r) => [monthIndex(r.start), endIndex(r)]);
const workedBefore = (i) => worked.reduce((sum, [s, e]) => sum + Math.min(Math.max(i - s, 0), e - s), 0);
const span = workedBefore(nowIndex + 1);
const pct = (i) => (workedBefore(i) / span) * 100;

const years = [];
for (let y = Math.ceil(firstIndex / 12); y * 12 <= nowIndex; y++) years.push(y);
$('timebar').innerHTML = `
    <div class="timebar-track">
        ${career.map((r) => `<span class="timebar-seg${r.end ? '' : ' current'}" style="left:${pct(monthIndex(r.start))}%;width:${pct(endIndex(r)) - pct(monthIndex(r.start))}%${r.color ? `;background-color:${esc(r.color)};opacity:1` : ''}${r.textColor ? `;--seg-text:${esc(r.textColor)}` : ''}"${r.about ? ` tabindex="0" data-about="${esc(r.about)}" aria-label="${esc(r.company)}: ${esc(r.about)}"` : ''}>${r.icon ? `<img class="seg-icon" src="${esc(r.icon)}" alt="" width="16" height="16" />` : ''}<span>${esc(r.company)}</span></span>`).join('')}
    </div>
    <div class="timebar-tip" id="timebar-tip" role="tooltip" hidden></div>
    <div class="timebar-years">${years.map((y) => `<span style="left:${pct(y * 12)}%">${y}</span>`).join('')}<span class="timebar-now" style="left:100%">now</span></div>`;

// Hovering (or focusing/tapping) a segment shows the company's one-liner above it
const tip = $('timebar-tip');
function showTip(seg) {
    tip.textContent = seg.dataset.about;
    tip.hidden = false;
    const bar = $('timebar').getBoundingClientRect();
    const r = seg.getBoundingClientRect();
    const center = r.left + r.width / 2 - bar.left;
    const half = tip.offsetWidth / 2;
    tip.style.left = `${Math.min(Math.max(center - half, 0), bar.width - tip.offsetWidth)}px`;
}
const hideTip = () => { tip.hidden = true; };
document.querySelectorAll('.timebar-seg[data-about]').forEach((seg) => {
    seg.addEventListener('mouseenter', () => showTip(seg));
    seg.addEventListener('focus', () => showTip(seg));
    seg.addEventListener('mouseleave', hideTip);
    seg.addEventListener('blur', hideTip);
});

// Hide a segment's name (keeping its icon) when the segment is too narrow to show it whole
function fitTimebarLabels() {
    document.querySelectorAll('.timebar-seg').forEach((seg) => {
        seg.classList.remove('tight');
        const need = [...seg.children].reduce((w, c) => {
            const cs = getComputedStyle(c);
            // scrollWidth: the name's full width, even when flexbox has squeezed it
            return w + Math.max(c.offsetWidth, c.scrollWidth) + parseFloat(cs.marginLeft) + parseFloat(cs.marginRight);
        }, 0);
        if (need > seg.clientWidth) seg.classList.add('tight');
    });
}
window.addEventListener('resize', fitTimebarLabels);
document.fonts?.ready.then(fitTimebarLabels);
fitTimebarLabels();

// Oldest to newest, left to right, matching the bar above
$('roles').innerHTML = [...career].reverse().map((r) => `
    <article class="role${r.end ? '' : ' current'}">
        <div class="role-head">
            <h4>${esc(r.company)}</h4>
            <span class="role-when">${monthName(r.start)} – ${r.end ? monthName(r.end) : 'now'} · ${esc(r.place)}</span>
        </div>
        <p class="role-title">${esc(r.role)}</p>
        <ul>${r.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
    </article>`).join('');

const cardHtml = projects.map((p, i) => `
    <div class="card${p.source ? ' card-link' : ''}" tabindex="0"${p.source ? ` data-href="${esc(p.source)}"` : ''}>
        <div class="card-top">
            <span class="card-num">${String(i + 1).padStart(2, '0')}</span>
            ${p.logo ? logoImg(p, p.logo, p.logoDark ? 'logo-light' : '') : ''}
            ${p.logoDark ? logoImg(p, p.logoDark, 'logo-dark') : ''}
        </div>
        <h3>${esc(p.title)}</h3>
        <p class="card-summary">${esc(p.summary)}</p>
        <div class="card-more">
            <div class="card-more-inner">
                ${p.preview ? `<img class="card-preview" src="${esc(p.preview)}" alt="${esc(p.title)} demo" loading="lazy" />` : ''}
                <p>${esc(p.description)}</p>
                <div class="card-foot">
                    <span class="tech">${p.tech.map(esc).join(' · ')}</span>
                    <span class="card-links">
                        ${p.source ? `<a href="${esc(p.source)}"${ext(p.source)}>source ↗</a>` : '<span class="private">private repo</span>'}
                        ${p.live ? `<a href="${esc(p.live.href)}"${ext(p.live.href)}>${esc(p.live.label.toLowerCase())} ↗</a>` : ''}
                    </span>
                </div>
            </div>
        </div>
    </div>`);

// Two independent columns on desktop, so opening a card only pushes down
// the cards below it in the same column; one column in reading order on phones.
const singleColumn = window.matchMedia('(max-width: 860px)');
function layoutProjects() {
    const cols = singleColumn.matches ? [cardHtml] : [
        cardHtml.filter((_, i) => i % 2 === 0),
        cardHtml.filter((_, i) => i % 2 === 1),
    ];
    $('projects-list').innerHTML = cols.map((c) => `<div class="cards-col">${c.join('')}</div>`).join('');
}
singleColumn.addEventListener('change', layoutProjects);
layoutProjects();

// Clicking anywhere on a card (or Enter on a focused card) opens its GitHub repo
function openCard(e) {
    const card = e.target.closest('.card-link');
    if (!card || e.target.closest('a') || window.getSelection().toString()) return;
    if (e.type === 'keydown' && e.key !== 'Enter') return;
    window.open(card.dataset.href, '_blank', 'noopener');
}
$('projects-list').addEventListener('click', openCard);
$('projects-list').addEventListener('keydown', openCard);

// Bookshelf: one finished, one in progress, one up next, left to right
const shelfSlots = [
    { key: 'read', label: 'last read' },
    { key: 'reading', label: 'reading' },
    { key: 'next', label: 'up next' },
];
const bookStatus = (key, b) => {
    if (key === 'reading') {
        return `<span class="book-progress"><span style="width:${Number(b.progress) || 0}%"></span></span><span class="book-meta">${Number(b.progress) || 0}% through</span>`;
    }
    if (key === 'read' && b.rating) {
        const stars = '★'.repeat(b.rating) + '<span class="dim">' + '★'.repeat(5 - b.rating) + '</span>';
        return `<span class="book-meta stars" aria-label="Rated ${b.rating} out of 5">${stars}</span>`;
    }
    return '';
};
$('shelf').innerHTML = shelfSlots.filter(({ key }) => bookshelf[key]).map(({ key, label }) => {
    const b = bookshelf[key];
    return `
    <article class="book book-${key}">
        <img class="book-cover" src="${esc(b.cover)}" alt="Cover of ${esc(b.title)}" loading="lazy" width="96" height="140" />
        <div class="book-info">
            <span class="book-status">${label}</span>
            <h4>${esc(b.title)}</h4>
            <p class="book-author">${esc(b.author)}</p>
            ${bookStatus(key, b)}
        </div>
    </article>`;
}).join('');

// Projects I am working on: one slide per project, moved with ← / →
const slides = $('working-on');
slides.innerHTML = workingOn.map((w) => `
    <article class="slide">
        <div class="slide-head">
            <h4>${esc(w.title)}</h4>
            ${w.source ? `<a class="slide-link" href="${esc(w.source)}"${ext(w.source)}>${icon('github')}<span>GitHub</span></a>` : ''}
        </div>
        <p>${esc(w.about)}</p>
        ${w.plans?.length ? `<p>What I'm planning next:</p>
        <ul>${w.plans.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
    </article>`).join('');

$('homelab').innerHTML = `
    <div class="motto-row">
        <p class="motto">“${esc(homelab.motto)}”</p>
        ${homelab.source ? `<a class="slide-link" href="${esc(homelab.source)}"${ext(homelab.source)}>${icon('github')}<span>GitHub</span></a>` : ''}
    </div>
    <p>${esc(homelab.about)}</p>
    <dl class="lab-groups">${homelab.groups.map((g) => `
        <dt>${esc(g.name)}</dt>
        <dd>${g.items.map((i) => `<span class="chip">${esc(i)}</span>`).join('')}</dd>`).join('')}
    </dl>`;

const slideBy = (dir) => slides.scrollBy({ left: dir * slides.clientWidth, behavior: 'smooth' });
$('slide-prev').addEventListener('click', () => slideBy(-1));
$('slide-next').addEventListener('click', () => slideBy(1));

function updateSlideNav() {
    const max = slides.scrollWidth - slides.clientWidth;
    $('slide-prev').disabled = slides.scrollLeft <= 1;
    $('slide-next').disabled = slides.scrollLeft >= max - 1;
}
slides.addEventListener('scroll', updateSlideNav, { passive: true });
window.addEventListener('resize', updateSlideNav);
updateSlideNav();

// Intro "lately" links: after the jump to Side quests, flash the item they refer to
$('hero-meta').addEventListener('click', (e) => {
    const link = e.target.closest('[data-highlight]');
    if (!link) return;
    let target;
    if (link.dataset.highlight === 'slide') {
        target = slides.firstElementChild;
        slides.scrollTo({ left: 0 });
    } else {
        target = document.querySelector('.book-reading');
    }
    if (!target) return;
    target.classList.remove('flash');
    setTimeout(() => {
        void target.offsetWidth; // restart the animation if it's clicked again
        target.classList.add('flash');
        setTimeout(() => target.classList.remove('flash'), 2600);
    }, 550);
});

window.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    const r = slides.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return; // only while it's on screen
    e.preventDefault();
    slideBy(e.key === 'ArrowRight' ? 1 : -1);
});

// ---------- scroll: rail progress ----------

const sections = [...document.querySelectorAll('main section')];

// Scroll hint at the bottom of every page except the last
sections.slice(0, -1).forEach((sec, i) => {
    const next = sections[i + 1];
    sec.insertAdjacentHTML('beforeend', `<a class="scroll-hint" href="#${next.id}" aria-label="Next: ${esc(next.querySelector('h2')?.textContent || next.id)}">↓</a>`);
});
initPaging(sections);
const hops = [...document.querySelectorAll('.hop')];
const hopLabels = hops.map((h) => h.querySelector('b').textContent);
const fill = $('fill');

function update() {
    const probe = window.scrollY + window.innerHeight * 0.4;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

    let active = 0;
    sections.forEach((s, i) => { if (s.offsetTop <= probe) active = i; });
    if (atBottom) active = sections.length - 1;

    const sec = sections[active];
    const frac = atBottom ? 0 : Math.min(1, Math.max(0, (probe - sec.offsetTop) / sec.offsetHeight));

    hops.forEach((h, i) => {
        h.classList.toggle('past', i < active);
        h.classList.toggle('now', i === active);
    });

    const dotY = (h) => h.offsetTop + 9;
    const from = dotY(hops[active]);
    const to = hops[active + 1] ? dotY(hops[active + 1]) : from;
    fill.style.height = `${from - dotY(hops[0]) + (to - from) * frac}px`;

    $('topbar-hop').textContent = hopLabels[active];
    const overall = atBottom ? 1 : (active + frac) / (sections.length - 1);
    $('topbar-fill').style.width = `${Math.min(100, overall * 100)}%`;
}

let ticking = false;
const schedule = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; update(); });
};
window.addEventListener('scroll', schedule, { passive: true });
window.addEventListener('resize', schedule);
document.fonts?.ready.then(schedule);
update();

// ---------- theme ----------

// Light by default; the switch choice is remembered
const themeSwitch = $('theme');
let saved = null;
try { saved = localStorage.getItem('theme'); } catch { /* storage unavailable */ }
if (saved !== 'light' && saved !== 'dark') saved = null;

const currentTheme = () => saved || 'light';

function applyTheme() {
    const theme = currentTheme();
    if (theme === 'dark') document.documentElement.dataset.theme = 'dark';
    else delete document.documentElement.dataset.theme;
    themeSwitch.setAttribute('aria-checked', String(theme === 'dark'));
    $('theme-state').textContent = theme;
}
themeSwitch.addEventListener('click', () => {
    saved = currentTheme() === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', saved); } catch { /* storage unavailable */ }
    applyTheme();
});
applyTheme();
