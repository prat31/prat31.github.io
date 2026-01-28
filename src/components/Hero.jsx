import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

export function Hero() {
    return (
        <section id="hero" className="min-h-screen flex flex-col justify-center relative pt-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="font-mono text-terminal-blue mb-4">Hi, my name is</p>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Pratyush.
                    </h1>
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-400 dark:text-slate-500 mb-8">
                        I build stuff.
                    </h2>
                    <p className="max-w-xl text-lg text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
                        I'm a software engineer and tech enthusiast specializing in building exceptional digital experiences.
                        Currently, I'm focused on accessible, human-centered products at <span className="text-terminal-blue">Stealth Mode</span>.
                    </p>

                    <div className="flex gap-4">
                        <a href="#projects" className="px-6 py-3 border border-terminal-blue text-terminal-blue font-mono rounded hover:bg-terminal-blue/10 transition-colors">
                            Check out my work
                        </a>
                        <div className="flex items-center gap-4 ml-4">
                            <a href="https://github.com/prat31" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-terminal-blue transition-colors"><Github className="w-6 h-6" /></a>
                            <a href="#" className="p-2 hover:text-terminal-blue transition-colors"><Linkedin className="w-6 h-6" /></a>
                            <a href="mailto:hello@example.com" className="p-2 hover:text-terminal-blue transition-colors"><Mail className="w-6 h-6" /></a>
                        </div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <ArrowDown className="w-6 h-6 text-slate-400" />
            </motion.div>
        </section>
    );
}
