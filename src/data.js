// All site content lives here. Edit this file to update the page.

export const profile = {
    name: 'Pratyush Prasad',
    role: 'Backend engineer',
    tagline: "builds the parts you don't see.",
    lede: "I build async Python services, the queues between them, and the dashboards that tell you when they're unhappy.",
    email: 'pratcode07@gmail.com',
    links: [
        { label: 'GitHub', href: 'https://github.com/prat31', icon: 'github' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/prat31/', icon: 'linkedin' },
        { label: 'Email', href: 'mailto:pratcode07@gmail.com', icon: 'email' },
    ],
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
];

// status: 'reading' (with progress %), 'read' (with rating out of 5) or 'next'
export const books = [
    { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', status: 'reading', progress: 15, cover: '/images/designing-data-intensive-applications.jpg' },
    { title: 'Head First Design Patterns', author: 'Eric Freeman, Elisabeth Robson', status: 'read', rating: 4, cover: '/images/head-first-design-patterns.jpg' },
    { title: 'Atomic Habits', author: 'James Clear', status: 'read', rating: 5, cover: '/images/atomic-habits.jpg' },
    { title: 'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow', author: 'Aurélien Géron', status: 'next', cover: '/images/hands-on-machine-learning.jpg' },
    { title: 'The Pragmatic Programmer', author: 'Andrew Hunt, David Thomas', status: 'next', cover: '/images/the-pragmatic-programmer.jpg' },
];
