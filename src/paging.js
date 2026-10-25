// Full-page scrolling on desktop: the first wheel tick moves to the next section
// straight away, instead of waiting for the gesture (and trackpad momentum) to end
// the way CSS scroll-snap does. Sections taller than the screen are stepped through.

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

    // Stops: every section's top, plus the bottom edge of sections taller than the
    // screen. Between a tall section's top and bottom stop it moves a screen at a time.
    // (a section only a little taller than the screen is treated as fitting)
    function ranges() {
        const vh = window.innerHeight;
        return sections.map((s) => {
            const overflow = s.offsetHeight - vh;
            return { top: s.offsetTop, end: overflow > 80 ? s.offsetTop + overflow : s.offsetTop };
        });
    }

    function nextTarget(dir) {
        const y = window.scrollY;
        const step = window.innerHeight * 0.85;
        const inTall = ranges().find((r) => r.end > r.top && y >= r.top - 1 && y <= r.end + 1);
        if (inTall) {
            if (dir > 0 && y < inTall.end - 1) return Math.min(y + step, inTall.end);
            if (dir < 0 && y > inTall.top + 1) return Math.max(y - step, inTall.top);
        }
        const stops = ranges().flatMap((r) => (r.end > r.top ? [r.top, r.end] : [r.top]));
        if (dir > 0) return stops.find((p) => p > y + 1) ?? y;
        return [...stops].reverse().find((p) => p < y - 1) ?? y;
    }

    // Nearest place to rest: inside a tall section's range, or else the closest stop
    function settleTarget() {
        const y = window.scrollY;
        const rs = ranges();
        if (rs.some((r) => y >= r.top - 1 && y <= r.end + 1)) return null;
        const stops = rs.flatMap((r) => [r.top, r.end]);
        return stops.reduce((best, p) => (Math.abs(p - y) < Math.abs(best - y) ? p : best), stops[0]);
    }

    function onWheel(e) {
        if (!enabled() || e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
        const dir = Math.sign(e.deltaY);
        if (!dir) return;

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
        scrollToY(nextTarget(dir));
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
        if (!dir) return;

        e.preventDefault();
        if (!animating) scrollToY(nextTarget(dir));
    }

    // Scrollbar drags and touch scrolling settle onto the nearest section
    function onScroll() {
        if (!enabled() || animating) return;
        clearTimeout(settleTimer);
        settleTimer = setTimeout(() => {
            if (animating || locked) return;
            const target = settleTarget();
            if (target !== null) scrollToY(target);
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
