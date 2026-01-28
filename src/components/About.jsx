import { motion } from 'framer-motion';

const skills = [
    "JavaScript (ES6+)", "TypeScript", "React", "Next.js",
    "Node.js", "Python", "Rust", "Docker", "AWS", "Git"
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
                                Hello! My name is Prat and I enjoy creating things that live on the internet.
                                My interest in web development started back in 2015 when I decided to try editing custom Tumblr themes — turns out hacking together HTML & CSS was pretty fun!
                            </p>
                            <p>
                                Fast-forward to today, and I've had the privilege of working at an advertising agency, a start-up, and a huge corporation.
                                My main focus these days is building accessible, inclusive products and digital experiences.
                            </p>
                            <p>
                                Here are a few technologies I've been working with recently:
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
                            <div className="w-full h-full bg-slate-300 dark:bg-slate-700 rounded overflow-hidden flex items-center justify-center">
                                <span className="font-mono text-slate-500">Profile Pic</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
