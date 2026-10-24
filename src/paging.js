// Full-page scrolling on desktop: the first wheel tick moves to the next section
// straight away, instead of waiting for the gesture (and trackpad momentum) to end
// the way CSS scroll-snap does.

const DURATION = 520;
const QUIET_MS = 140; // wheel silence that marks the end of a gesture

const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

export function initPaging(sections) {
    const media = window.matchMedia('(min-width: 861px) and (min-height: 641px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const root = document.documentElement;

    let animating = false;
    let locked = false;      // ignore the rest of the gesture that triggered a move
    let lastWheel = 0;
    let lastDelta = 0;
    let quietTimer = 0;
    let settleTimer = 0;

    const enabled = () => media.matches;
    const maxScroll = () => root.scrollHeight - window.innerHeight;

    const currentIndex = () => {
        const y = window.scrollY + window.innerHeight / 2;
        let idx = 0;
        sections.forEach((s, i) => { if (s.offsetTop <= y) idx = i; });
        return idx;
    };

    function scrollToY(target) {
        target = Math.max(0, Math.min(maxScroll(), target));
        const start = window.scrollY;
        const dist = target - start;
        if (Math.abs(dist) < 1) return;
        if (reduced.matches) { window.scrollTo(0, target); return; }

        animating = true;
        const t0 = performance.now();
        const step = (now) => {
            const t = Math.min(1, (now - t0) / DURATION);
            window.scrollTo(0, start + dist * easeOutQuart(t));
            if (t < 1) requestAnimationFrame(step);
            else animating = false;
        };
        requestAnimationFrame(step);
    }

    function goTo(index) {
        index = Math.max(0, Math.min(sections.length - 1, index));
        scrollToY(sections[index].offsetTop);
    }

    // Sections taller than the screen scroll normally until their edge is reached
    function canScrollWithin(dir) {
        const sec = sections[currentIndex()];
        const top = sec.offsetTop;
        const bottom = top + sec.offsetHeight;
        if (dir > 0) return bottom > window.scrollY + window.innerHeight + 2;
        return top < window.scrollY - 2;
    }

    function onWheel(e) {
        if (!enabled() || e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
        const dir = Math.sign(e.deltaY);
        if (!dir) return;
        if (!animating && !locked && canScrollWithin(dir)) return;

        e.preventDefault();
        const now = performance.now();
        const delta = Math.abs(e.deltaY);

        // A fresh flick during leftover momentum shows up as a jump in delta
        const newGesture = now - lastWheel > QUIET_MS || (!animating && delta > lastDelta * 1.6 && delta > 12);
        lastWheel = now;
        lastDelta = delta;

        clearTimeout(quietTimer);
        quietTimer = setTimeout(() => { locked = false; }, QUIET_MS);

        if (animating || (locked && !newGesture)) return;
        locked = true;
        goTo(currentIndex() + dir);
    }

    function onKey(e) {
        if (!enabled() || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
        const tag = document.activeElement?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

        const map = { ArrowDown: 1, PageDown: 1, ArrowUp: -1, PageUp: -1 };
        let dir = map[e.key];
        if (e.key === ' ') dir = e.shiftKey ? -1 : 1;
        if (e.key === 'Home') { e.preventDefault(); goTo(0); return; }
        if (e.key === 'End') { e.preventDefault(); goTo(sections.length - 1); return; }
        if (!dir || canScrollWithin(dir)) return;

        e.preventDefault();
        if (!animating) goTo(currentIndex() + dir);
    }

    // Scrollbar drags and touch scrolling settle onto the nearest section
    function onScroll() {
        if (!enabled() || animating) return;
        clearTimeout(settleTimer);
        settleTimer = setTimeout(() => {
            if (animating || locked) return;
            const idx = currentIndex();
            const sec = sections[idx];
            const fitsScreen = sec.offsetHeight <= window.innerHeight + 2;
            if (fitsScreen && Math.abs(window.scrollY - sec.offsetTop) > 1) goTo(idx);
        }, 160);
    }

    function onAnchorClick(e) {
        const a = e.target.closest('a[href^="#"]');
        if (!a || !enabled()) return;
        const idx = sections.findIndex((s) => `#${s.id}` === a.getAttribute('href'));
        if (idx < 0) return;
        e.preventDefault();
        history.replaceState(null, '', a.getAttribute('href'));
        goTo(idx);
    }

    const applyMode = () => root.classList.toggle('paging', enabled());

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('click', onAnchorClick);
    media.addEventListener('change', applyMode);
    applyMode();
}
