import { motion } from 'framer-motion';

const skills = [
    "Python", "FastAPI", "AsyncIO", "Celery", "RabbitMQ", 
    "Redis", "SQLAlchemy", "MySQL", "Trino", "DynamoDB", 
    "AWS", "Docker", "Kubernetes", "Prometheus", "Grafana"
];

export function About() {
    return (
        <section id="about" className="py-24">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="grid md:grid-cols-2 gap-12 items-center"
                >
                    <div>
                        <h2 className="text-3xl font-bold font-mono mb-8 flex items-center gap-4">
                            <span className="text-terminal-blue">01.</span> About Me
                            <span className="h-px bg-slate-200 dark:bg-slate-700 flex-grow max-w-xs"></span>
                        </h2>

                        <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                            <p>
                                Hey, I’m Pratyush — a backend engineer who loves building systems that scale, stay alive under pressure, and generally behave better than my sleep schedule. I spend most of my time deep in the world of Python, FastAPI, AsyncIO, Celery, and all things distributed. If it involves queues, schedulers, worker pools, or weird race conditions, chances are I’m already tinkering with it.
                            </p> 
                            <p> 
                                I enjoy orchestrating services with Docker and Kubernetes, wiring together pipelines with RabbitMQ, Redis, and Trino, and making observability dashboards on Prometheus & Grafana look way cooler than they need to be. Databases? SQLAlchemy, MySQL, Dynamo-level thinking — I’m all in. Cloud? Give me EKS, EC2, S3, CloudFront and I’m at home.
                            </p>
                            <p>  
                                I’m passionate about performance optimization, backend architecture, clean APIs, and making systems faster, safer, and more predictable. Currently, I’m diving deep into the world of AI, exploring how to integrate LLMs and intelligent agents into the backend stacks I love. I'm fascinated by the intersection of traditional distributed systems and the rapidly evolving AI landscape.
                            </p> 
                            <p> 
                                If I'm not coding, I’m probably reading about the latest AI breakthroughs, refactoring something that wasn’t broken, or testing out another "brilliant idea" that just popped into my head.
                            </p>
                        </div>

                        <ul className="grid grid-cols-2 gap-2 mt-6 font-mono text-sm max-w-md">
                            {skills.map(skill => (
                                <li key={skill} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                    <span className="text-terminal-blue">▹</span> {skill}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="relative group mx-auto">
                        {/* Image Placeholder */}
                        <div className="relative w-72 h-72">
                            <div className="absolute inset-0 border-2 border-terminal-blue rounded translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                            <div className="absolute inset-0 bg-terminal-blue/20 group-hover:bg-transparent rounded transition-colors z-10"></div>
                            <div className="w-full h-full bg-slate-300 dark:bg-slate-700 rounded overflow-hidden">
                                <img
                                    src="/images/warhammer_dp.png"
                                    alt="Profile"
                                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
