import { motion } from 'framer-motion';
import { ExternalLink, Github, Folder } from 'lucide-react';

const projects = [
    {
        title: "Vibe Projects",
        description: "A collection of side projects exploring new tech stacks and UI experiments.",
        tech: ["React", "Vite", "Tailwind"],
        github: "#",
        link: "#"
    },
    {
        title: "Algorithm Visualizer",
        description: "Interactive visualization of sorting and pathfinding algorithms.",
        tech: ["TypeScript", "D3.js"],
        github: "#",
        link: "#"
    },
    {
        title: "Smart Home Dashboard",
        description: "IoT dashboard for monitoring generic home devices using MQTT.",
        tech: ["Vue", "Node.js", "Socket.io"],
        github: "#",
        link: "#"
    }
];

export function Projects() {
    return (
        <section id="projects" className="py-24">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold font-mono mb-12 flex items-center gap-4">
                        <span className="text-terminal-blue">02.</span> Some Things I've Built
                        <span className="h-px bg-slate-200 dark:bg-slate-700 flex-grow max-w-xs"></span>
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <Folder className="w-10 h-10 text-terminal-blue" />
                                    <div className="flex gap-4">
                                        <a href={project.github} className="hover:text-terminal-blue transition-colors"><Github className="w-5 h-5" /></a>
                                        <a href={project.link} className="hover:text-terminal-blue transition-colors"><ExternalLink className="w-5 h-5" /></a>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-terminal-blue transition-colors">{project.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
                                    {project.description}
                                </p>
                                <ul className="flex flex-wrap gap-3 mt-auto">
                                    {project.tech.map(t => (
                                        <li key={t} className="text-xs font-mono text-slate-500">{t}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
