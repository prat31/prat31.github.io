import { profile, about, stack, projects, books } from './data.js';
import { initPaging } from './paging.js';

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const ext = (href) => href.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : '';
const icon = (name) => name ? `<span class="icon" style="--icon:url(/images/icons/${esc(name)}.png)" aria-hidden="true"></span>` : '';
const linkList = (links) => links.map((l) => `<a href="${esc(l.href)}"${ext(l.href)}>${icon(l.icon)}<span>${esc(l.label)}</span></a>`).join('');

// ---------- content ----------

$('name').textContent = profile.name;
$('tagline').textContent = profile.tagline;
$('role').textContent = profile.role;
$('lede').textContent = profile.lede;
$('hero-links').innerHTML = linkList(profile.links);
$('contact-links').innerHTML = linkList(profile.links.filter((l) => !l.href.startsWith('mailto:')));
$('email').textContent = profile.email;
$('email').href = `mailto:${profile.email}`;

$('about-text').innerHTML = about.map((p) => `<p>${esc(p)}</p>`).join('');

$('stack').innerHTML = Object.entries(stack).map(([k, v]) =>
    `<dt>${esc(k)}</dt><dd>${v.map(esc).join(', ')}</dd>`
).join('');

const logoImg = (p, src, variant) =>
    `<img class="card-logo ${variant}" src="${esc(src)}" alt="${esc(p.title)} logo" style="height:${Number(p.logoHeight) || 28}px" />`;
$('projects-meta').textContent = `${projects.length} project${projects.length === 1 ? '' : 's'}`;
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

const statusCell = (b) => {
    if (b.status === 'reading') {
        return `<span class="st st-reading">reading ${b.progress}%</span><span class="bar"><span style="width:${b.progress}%"></span></span>`;
    }
    if (b.status === 'read') {
        const stars = '★'.repeat(b.rating) + '<span class="dim">' + '★'.repeat(5 - b.rating) + '</span>';
        return `<span class="st">read</span> <span class="stars" aria-label="${b.rating} out of 5">${stars}</span>`;
    }
    return '<span class="st dim">up next</span>';
};
$('books').innerHTML = books.map((b) => `
    <tr>
        <td class="c-cover">${b.cover ? `<img src="${esc(b.cover)}" alt="" loading="lazy" width="40" height="56" />` : ''}</td>
        <td class="c-title">${esc(b.title)}<span class="m-author">${esc(b.author)}</span></td>
        <td class="c-author">${esc(b.author)}</td>
        <td class="c-status">${statusCell(b)}</td>
    </tr>`).join('');
$('side-quests-meta').textContent = `${books.length} books`;

// ---------- scroll: rail progress ----------

const sections = [...document.querySelectorAll('main section')];
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
