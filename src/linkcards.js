// Intro links, each with a small card that opens on hover (or keyboard focus).
// Cards load their live content the first time they open.

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const icon = (name) => `<span class="icon" style="--icon:url(/images/icons/${esc(name)}.png)" aria-hidden="true"></span>`;
const newTab = ' target="_blank" rel="noopener noreferrer"';

const yearsSince = (iso) => {
    const months = (Date.now() - new Date(iso)) / (1000 * 60 * 60 * 24 * 30.44);
    return months >= 12 ? `${Math.floor(months / 12)} yr` : `${Math.max(1, Math.round(months))} mo`;
};
const monthYear = (iso) => new Date(iso).toLocaleString('en', { month: 'short', year: 'numeric' });
const driveId = (url) => (url.match(/\/d\/([^/]+)/) || [])[1];

function cached(key, load) {
    try {
        const hit = sessionStorage.getItem(key);
        if (hit) return Promise.resolve(JSON.parse(hit));
    } catch { /* storage unavailable */ }
    return load().then((data) => {
        try { sessionStorage.setItem(key, JSON.stringify(data)); } catch { /* storage unavailable */ }
        return data;
    });
}

const getJson = (url) => fetch(url).then((r) => (r.ok ? r.json() : Promise.reject(r.status)));

// ---------- card contents ----------

function githubCard(p) {
    return {
        label: 'GitHub', href: `https://github.com/${p.github}`, icon: 'github',
        body: `<div class="lc-gh" data-loading>Loading GitHub stats…</div>`,
        load(card) {
            const box = card.querySelector('.lc-gh');
            cached(`gh:${p.github}`, () => Promise.all([
                getJson(`https://api.github.com/users/${encodeURIComponent(p.github)}`),
                getJson(`https://api.github.com/search/commits?q=author:${encodeURIComponent(p.github)}&per_page=1`).catch(() => null),
            ]).then(([u, c]) => ({
                avatar: u.avatar_url, login: u.login, bio: u.bio, created: u.created_at,
                repos: u.public_repos, followers: u.followers, commits: c ? c.total_count : null,
            }))).then((d) => {
                box.removeAttribute('data-loading');
                box.innerHTML = `
                    <div class="lc-head">
                        <img class="lc-avatar" src="${esc(d.avatar)}" alt="" width="40" height="40" />
                        <div><strong>@${esc(d.login)}</strong>${d.bio ? `<p class="lc-sub">${esc(d.bio)}</p>` : ''}</div>
                    </div>
                    <dl class="lc-stats">
                        <div><dt>on GitHub</dt><dd>${yearsSince(d.created)}<small>since ${monthYear(d.created)}</small></dd></div>
                        <div><dt>public repos</dt><dd>${esc(d.repos)}</dd></div>
                        ${d.commits !== null ? `<div><dt>public commits</dt><dd>${esc(d.commits)}</dd></div>` : ''}
                        <div><dt>followers</dt><dd>${esc(d.followers)}</dd></div>
                    </dl>`;
            }).catch(() => { box.textContent = "Couldn't reach GitHub right now."; });
        },
    };
}

function linkedinCard(p, role) {
    const l = p.linkedin;
    return {
        label: 'LinkedIn', href: l.url, icon: 'linkedin',
        body: `
            <div class="lc-head"><div>
                <strong>${esc(p.name)}</strong>
                ${role ? `<p class="lc-sub">${esc(role.role)} at ${esc(role.company)}</p>` : ''}
            </div></div>
            <dl class="lc-stats">
                <div><dt>location</dt><dd>${esc(p.location)}</dd></div>
                ${l.connections ? `<div><dt>connections</dt><dd>${esc(l.connections)}</dd></div>` : ''}
            </dl>`,
    };
}

function emailCard(p) {
    return {
        label: 'Email', href: `mailto:${p.email}`, icon: 'email',
        body: `
            <p class="lc-email">${esc(p.email)}</p>
            <div class="lc-actions">
                <button type="button" class="lc-btn" data-copy="${esc(p.email)}">Copy</button>
                <a class="lc-btn" href="mailto:${esc(p.email)}">Open mail app</a>
            </div>`,
    };
}

function resumeCard(p) {
    const id = driveId(p.resume);
    return {
        label: 'Résumé', href: p.resume, icon: 'resume', wide: true,
        body: `
            ${id ? `<iframe class="lc-frame lc-frame-doc" data-src="https://drive.google.com/file/d/${esc(id)}/preview" title="Résumé preview" loading="lazy"></iframe>` : ''}
            <div class="lc-actions">
                ${id ? `<a class="lc-btn" href="https://drive.google.com/uc?export=download&id=${esc(id)}">Download PDF</a>` : ''}
                <a class="lc-btn"${newTab} href="${esc(p.resume)}">Open ↗</a>
            </div>`,
    };
}

function calendarCard(p) {
    return {
        label: 'Book a call', href: p.calendar, icon: 'calendar', wide: true,
        body: `
            ${p.calendarEmbed ? `<iframe class="lc-frame lc-frame-cal" data-src="${esc(p.calendarEmbed)}" title="Available times" loading="lazy"></iframe>` : ''}
            <div class="lc-actions">
                <a class="lc-btn"${newTab} href="${esc(p.calendar)}">Open booking page ↗</a>
            </div>`,
    };
}

// ---------- rendering ----------

export function renderHeroLinks(container, profile, currentRole) {
    const items = [
        githubCard(profile),
        linkedinCard(profile, currentRole),
        emailCard(profile),
        profile.resume && resumeCard(profile),
        profile.calendar && calendarCard(profile),
    ].filter(Boolean);

    container.innerHTML = items.map((it, i) => `
        <span class="lc">
            <a href="${esc(it.href)}"${it.href.startsWith('http') ? newTab : ''} aria-describedby="lc-card-${i}">${icon(it.icon)}<span>${esc(it.label)}</span></a>
            <span class="lc-card${it.wide ? ' wide' : ''}" id="lc-card-${i}" role="tooltip">${it.body}</span>
        </span>`).join('');

    container.querySelectorAll('.lc').forEach((wrap, i) => {
        const item = items[i];
        const card = wrap.querySelector('.lc-card');
        let loaded = false;
        const open = () => {
            // keep the card inside the window: shift it left if needed, open it on the
            // side with more room, and shrink any preview to fit that space
            card.style.left = '0px';
            const r = card.getBoundingClientRect();
            const overflow = r.right - (window.innerWidth - 16);
            if (overflow > 0) card.style.left = `${-overflow}px`;
            card.classList.remove('up');
            card.style.removeProperty('--frame-max');
            const link = wrap.getBoundingClientRect();
            const below = window.innerHeight - link.bottom - 24;
            const above = link.top - 24;
            const goUp = card.offsetHeight > below && above > below; // prefer opening downwards
            card.classList.toggle('up', goUp);
            const room = goUp ? above : below;
            if (card.offsetHeight > room) {
                const frames = card.querySelectorAll('.lc-frame');
                const frameH = [...frames].reduce((h, f) => h + f.offsetHeight, 0);
                card.style.setProperty('--frame-max', `${Math.max(200, frameH - (card.offsetHeight - room))}px`);
            }
            if (loaded) return;
            loaded = true;
            card.querySelectorAll('iframe[data-src]').forEach((f) => { f.src = f.dataset.src; });
            item.load?.(card);
        };
        wrap.addEventListener('mouseenter', open);
        wrap.addEventListener('focusin', open);
    });

    container.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-copy]');
        if (!btn) return;
        navigator.clipboard?.writeText(btn.dataset.copy).then(() => {
            btn.textContent = 'Copied';
            setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
        });
    });
}
