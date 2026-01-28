import { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Terminal } from 'lucide-react';

const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Bookshelf', href: '#bookshelf' },
    { name: 'Contact', href: '#contact' },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                scrolled
                    ? "bg-white/80 dark:bg-terminal-dark/80 backdrop-blur-md border-slate-200 dark:border-slate-800 py-3"
                    : "bg-transparent border-transparent py-5"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <a href="#" className="flex items-center gap-2 font-mono font-bold text-xl hover:opacity-80 transition-opacity">
                    <Terminal className="w-6 h-6 text-terminal-blue" />
                    <span>&lt;Pratyush /&gt;</span>
                </a>

                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium hover:text-terminal-blue transition-colors font-mono"
                        >
                            {item.name}
                        </a>
                    ))}
                    <div className="pl-4 border-l border-slate-200 dark:border-slate-800">
                        <ThemeToggle />
                    </div>
                </nav>

                {/* Mobile Menu Button - Placeholder/TODO */}
                <div className="md:hidden flex items-center">
                    <ThemeToggle />
                </div>
            </div>
        </motion.header>
    );
}
