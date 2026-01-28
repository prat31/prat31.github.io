import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Moon, Sun, Monitor, Hash, Github } from 'lucide-react';

export function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const down = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const commands = [
        {
            section: "Navigation",
            items: [
                { icon: Hash, label: 'Go to About', action: () => window.location.href = '#about' },
                { icon: Hash, label: 'Go to Projects', action: () => window.location.href = '#projects' },
                { icon: Hash, label: 'Go to Bookshelf', action: () => window.location.href = '#bookshelf' },
                { icon: Hash, label: 'Go to Contact', action: () => window.location.href = '#contact' },
            ]
        },
        {
            section: "General",
            items: [
                { icon: Moon, label: 'Dark Mode', action: () => document.documentElement.classList.add('dark') },
                { icon: Sun, label: 'Light Mode', action: () => document.documentElement.classList.remove('dark') },
                { icon: Github, label: 'View Source', action: () => window.open('https://github.com/prat31/prat31.github.io', '_blank') },
            ]
        }
    ];

    const filteredItems = commands.map(group => ({
        ...group,
        items: group.items.filter(item => item.label.toLowerCase().includes(query.toLowerCase()))
    })).filter(group => group.items.length > 0);

    const handleSelect = (action) => {
        action();
        setOpen(false);
        setQuery('');
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[20vh] p-4"
                    onClick={() => setOpen(false)}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-4 py-3">
                            <Search className="w-5 h-5 text-slate-400 mr-3" />
                            <input
                                className="flex-1 bg-transparent border-none outline-none text-slate-700 dark:text-slate-200 placeholder-slate-400 h-6"
                                placeholder="Type a command or search..."
                                autoFocus
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <div className="flex bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs text-slate-500 font-mono">
                                ESC
                            </div>
                        </div>

                        <div className="max-h-[300px] overflow-y-auto py-2">
                            {filteredItems.length === 0 ? (
                                <div className="p-4 text-center text-slate-500">No results found.</div>
                            ) : (
                                filteredItems.map((group, groupIdx) => (
                                    <div key={groupIdx}>
                                        <h3 className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                            {group.section}
                                        </h3>
                                        {group.items.map((item, itemIdx) => (
                                            <button
                                                key={itemIdx}
                                                onClick={() => handleSelect(item.action)}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-200"
                                            >
                                                <item.icon className="w-4 h-4 text-slate-500" />
                                                <span>{item.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-2 text-xs text-slate-400 border-t border-slate-200 dark:border-slate-800 flex justify-between">
                            <span>Navigate with arrows</span>
                            <span>Select with Enter</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
