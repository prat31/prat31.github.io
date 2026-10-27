// All site content lives here. Edit this file to update the page.

export const profile = {
    name: 'Pratyush Prasad',
    tagline: 'Software Engineer.',
    lede: 'I build software that runs in production: robust pipelines and reliable systems, with intelligence baked in. On the side I build the tools I wish existed.',
    email: 'pratcode07@gmail.com',
    location: 'Bangalore',
    timezone: 'Asia/Kolkata',
    timezoneLabel: 'IST',
    github: 'prat31', // latest public activity is shown on the intro
    linkedin: {
        url: 'https://www.linkedin.com/in/prat31/',
        connections: '3k+'
    },
    resume: 'https://drive.google.com/file/d/1j3wyiRrwdpwDPvHWG9-jeUZ8v3ZNrjPy/view?usp=sharing',
    calendar: 'https://calendar.app.google/74qeEczvdcZ7ce7H9',
    // embeddable version of the booking page, shown live in the "Book a call" card
    calendarEmbed: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3Msp_yCSWnkowCDKp_Xe5lXE73RESIavnbu3zMYwuP992sD-u1kH24dn5l84gJ4U_ATZrBu0Oy?gv=true',
};

export const about = [
    "I build systems that scale, stay alive under pressure, and generally behave better than my sleep schedule. Most of my time goes into Python, FastAPI, AsyncIO and Celery. If it involves queues, schedulers, worker pools or weird race conditions, I'm probably already tinkering with it.",
    "I like orchestrating services with Docker and Kubernetes, wiring pipelines together with RabbitMQ, Redis and Trino, and making Prometheus and Grafana dashboards look cooler than they need to. I care about performance, clean APIs, and making systems faster, safer and more predictable.",
    "Lately I'm working out how LLMs and agents fit into the backend stacks I already love, where traditional distributed systems meet the fast-moving AI world.",
    "When I'm not coding, I'm reading about the latest AI breakthroughs, refactoring something that wasn't broken, or testing another “brilliant idea”.",
];

export const stack = {
    language: ['Python'],
    frameworks: ['FastAPI', 'AsyncIO', 'Celery', 'SQLAlchemy'],
    messaging: ['RabbitMQ', 'Redis'],
    data: ['MySQL', 'Trino', 'DynamoDB'],
    infra: ['AWS', 'Docker', 'Kubernetes'],
    observability: ['Prometheus', 'Grafana'],
};

// Experience → Professional experience, newest first. `end: null` means current.
// Optional `color` / `textColor` / `icon` style that role's segment in the time bar;
// `about` (from the company's website) shows when hovering it.
export const career = [
    {
        company: 'AppOmni',
        about: 'SaaS and AI security for enterprises: visibility, posture and agentic AI governance.',
        role: 'Software Engineer',
        color: '#003785', // appomni.com navy blue
        textColor: '#ffffff',
        icon: '/images/companies/appomni.png',
        start: '2026-06',
        end: null,
        place: 'Bangalore',
        points: [
            'Architecting an AI code-review agent with domain knowledge that learns from review comments.',
            'Building AI-driven threat detection for audit logs, and contributing to an autonomous agent that writes SaaS connectors.',
        ],
    },
    {
        company: 'Akridata',
        about: 'AI-powered visual inspection for quality control in manufacturing and asset monitoring.',
        role: 'Member of Technical Staff 2',
        color: '#51459e', // akridata.ai brand purple
        textColor: '#ffffff',
        icon: '/images/companies/akridata.png',
        start: '2022-07',
        end: '2025-11',
        place: 'Bangalore',
        points: [
            'Built and launched a real-time statistics service processing over 1 TB a day, with de-duplication, checkpointing and retries.',
            'Made results load 8× faster, and owned reliability and security work through to SOC 2 compliance.',
        ],
    },
    {
        company: 'Amazon',
        about: "Aiming to be Earth's most customer-centric company, across shopping, AWS, AI and devices.",
        role: 'SDE Intern',
        color: '#ff9900', // Amazon logo orange
        textColor: '#111111',
        icon: '/images/companies/amazon.png',
        start: '2022-01',
        end: '2022-06',
        place: 'Remote',
        points: [
            'Built services that detect anomalous seller shipping charges for the Logistics Exchange for Sellers team.',
        ],
    },
];

// `summary` shows on the card; the rest appears when it expands. Omit `source` for private repos;
// `preview` is an optional image or GIF shown when the card expands.
// `logoDark` is an optional logo version used in dark mode;
// `logoHeight` overrides the default 28px logo height.
export const projects = [
    {
        title: 'IDIM',
        summary: 'I Do It Myself: self-hosted email automation.',
        description: 'Connect your inbox, define labels in plain English, and an AI model labels your emails. Processors then act on what it finds. Gmail is connected read-only with encrypted tokens.',
        tech: ['Python', 'FastAPI', 'Celery', 'RabbitMQ', 'PostgreSQL', 'React'],
        source: 'https://github.com/prat31/idoitmyself',
        logo: '/images/projects/idim-light.png',
        logoDark: '/images/projects/idim-dark.png',
        preview: '/images/projects/idim-demo.png',
    },
    {
        title: 'HealthSight',
        summary: 'A personal dashboard for Health Connect data.',
        description: 'Ingests scheduled Health Connect backups from Google Drive or a local folder, stores them in SQLite, and charts steps, workouts, sleep and body metrics.',
        tech: ['Python', 'FastAPI', 'SQLite', 'APScheduler', 'React', 'Recharts', 'Docker'],
        source: 'https://github.com/prat31/healthsight',
        logo: '/images/projects/healthsight-light.png',
        logoDark: '/images/projects/healthsight-dark.png',
        logoHeight: 50,
        preview: '/images/projects/healthsight-demo.gif',
    },
    {
        title: 'linpuzs',
        summary: "Solves LinkedIn's daily puzzles on your phone.",
        description: 'Plug in an Android phone and run linpuzs: it screenshots the board over ADB, reads it, solves it and taps the answer in, all in a few seconds. Handles Queens, Tango, Zip, Mini Sudoku and Patches.',
        tech: ['Python', 'NumPy', 'Pillow', 'ADB', 'Rich'],
        source: 'https://github.com/prat31/linpuzs',
        live: { label: 'PyPI', href: 'https://pypi.org/project/linpuzs/' },
        logo: '/images/projects/linpuzs.png',
        preview: '/images/projects/linpuzs-demo.gif',
    },
    {
        title: 'fastHLD',
        summary: 'Talk through a system design; the diagram draws itself.',
        description: 'Speak or type an architecture ("an ALB in front of EC2 talking to RDS") and an LLM turns it into a live, editable high-level design diagram. Knows 53 AWS, GCP, Azure and open-source services, and can rebuild a diagram from a photo of a whiteboard.',
        tech: ['Python', 'FastAPI', 'React', 'React Flow', 'Ollama', 'OpenAI', 'Whisper'],
        source: 'https://github.com/prat31/fastHLD',
        logo: '/images/projects/fasthld-light.png',
        logoDark: '/images/projects/fasthld-dark.png',
    },
    {
        title: 'kindle-ai-tracker',
        summary: 'A jailbroken Kindle as a desk display for AI plan usage.',
        description: 'Shows usage, limits and resets for Claude, ChatGPT, GitHub Copilot, OpenRouter and Z.ai on the Kindle\'s e-ink screen, refreshing every 5 minutes. Sign in by scanning QR codes from your phone; tap to refresh, swipe to switch services.',
        tech: ['Go', 'FBInk', 'Shell', 'Make'],
        source: 'https://github.com/prat31/kindle-ai-tracker',
        preview: '/images/projects/kindle-ai-tracker-demo.gif',
        logo: '/images/projects/kindle-ai-tracker.svg',
    },
];

// Side quests → Bookshelf: always exactly three books, one per slot.
// When you finish the book you're reading, move it to `read`, move `next` to `reading`,
// and pick a new `next`.
export const bookshelf = {
    read: { title: 'Head First Design Patterns', author: 'Eric Freeman, Elisabeth Robson', rating: 4, cover: '/images/head-first-design-patterns.jpg' },
    reading: { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', progress: 15, cover: '/images/designing-data-intensive-applications.jpg' },
    next: { title: 'The Pragmatic Programmer', author: 'Andrew Hunt, David Thomas', cover: '/images/the-pragmatic-programmer.jpg' },
};

// Side quests → Projects I am working on: one slide each, scrolled sideways
export const workingOn = [
    {
        title: 'IDIM',
        source: 'https://github.com/prat31/idoitmyself',
        about: "IDIM (I Do It Myself) is a self-hosted mailbox app. I connect my inbox, describe labels in plain English, and a model called Jev reads each email and decides which labels fit. Gmail is connected read-only with encrypted tokens, and a dashboard tracks stats, trends, coverage and model spend.",
        plans: [
            'Support more email providers, not just Gmail.',
            "Have Jev ask me when it isn't sure, and learn from my answers.",
            'Add processors: actions attached to a label that run whenever new mail gets it.',
            'Build analytics and alerts on top of what the processors produce.',
        ],
    },
    {
        title: 'fastHLD',
        source: 'https://github.com/prat31/fastHLD',
        about: 'fastHLD turns talking through a system design into a diagram. I speak or type the architecture, and an LLM builds an editable high-level design diagram as I go. It knows 53 AWS, GCP, Azure and open-source services, and can recreate a diagram from a photo of a whiteboard.',
        plans: [],
    },
];

// Side quests → My homelab (from github.com/prat31/homelab)
export const homelab = {
    source: 'https://github.com/prat31/homelab',
    motto: 'Own your stack.',
    about: 'Everything I self-host runs in Docker, defined in a single compose file with pinned versions. Traefik routes traffic and handles HTTPS, a Cloudflare Tunnel makes chosen services reachable from anywhere, Uptime Kuma monitors every public service, and Kopia takes care of backups.',
    groups: [
        { name: 'Apps', items: ['Jellyfin', 'Immich', 'n8n', 'Homarr', 'HealthSight'] },
        { name: 'Infrastructure', items: ['Traefik', 'Cloudflare Tunnel', 'Uptime Kuma', 'Beszel', 'Kopia'] },
    ],
};
