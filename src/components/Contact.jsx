import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

export function Contact() {
    return (
        <section id="contact" className="py-24 text-center">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="font-mono text-terminal-blue mb-4">04. What's Next?</p>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
                        Whether you have a question, a project idea, or simply want to say hello, feel free to drop me an email.
                        I'm always open to discussing new opportunities and cool tech!
                    </p>

                    <a
                        href="mailto:hello@example.com"
                        className="inline-flex items-center gap-2 px-8 py-4 border-2 border-terminal-blue text-terminal-blue font-bold rounded hover:bg-terminal-blue/10 transition-colors"
                    >
                        <Mail className="w-5 h-5" />
                        Say Hello
                    </a>

                    <div className="mt-24 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center gap-6">
                        <div className="flex gap-6">
                            <a href="#" className="text-slate-500 hover:text-terminal-blue transition-colors hover:-translate-y-1 transform duration-200"><Github /></a>
                            <a href="#" className="text-slate-500 hover:text-terminal-blue transition-colors hover:-translate-y-1 transform duration-200"><Linkedin /></a>
                            <a href="#" className="text-slate-500 hover:text-terminal-blue transition-colors hover:-translate-y-1 transform duration-200"><Twitter /></a>
                        </div>
                        <p className="font-mono text-xs text-slate-500">
                            Designed & Built by Prat
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
