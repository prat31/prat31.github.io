import { motion } from 'framer-motion';
import { BookOpen, CheckCircle } from 'lucide-react';

const currentlyReading = {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    progress: 65,
    cover: "https://images-na.ssl-images-amazon.com/images/I/41as+WafrFL._SX396_BO1,204,203,200_.jpg" // Placeholder or color
};

const readBooks = [
    { title: "Clean Code", author: "Robert C. Martin", rating: 5 },
    { title: "Sapiens", author: "Yuval Noah Harari", rating: 5 },
    { title: "Project Hail Mary", author: "Andy Weir", rating: 4 },
    { title: "Atomic Habits", author: "James Clear", rating: 5 },
];

export function Bookshelf() {
    return (
        <section id="bookshelf" className="py-24 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold font-mono mb-12 flex items-center gap-4">
                        <span className="text-terminal-blue">03.</span> Bookshelf
                        <span className="h-px bg-slate-200 dark:bg-slate-700 flex-grow max-w-xs"></span>
                    </h2>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Currently Reading */}
                        <div className="lg:col-span-1">
                            <h3 className="font-mono text-terminal-blue mb-6 flex items-center gap-2">
                                <BookOpen className="w-5 h-5" /> Currently Reading
                            </h3>
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                                <div className="aspect-[2/3] bg-slate-200 dark:bg-slate-700 mb-6 rounded flex items-center justify-center text-slate-400">
                                    {/* In real app, use <img> here */}
                                    <span className="text-xs font-mono">Book Cover</span>
                                </div>
                                <h4 className="text-xl font-bold mb-1">{currentlyReading.title}</h4>
                                <p className="text-slate-500 text-sm mb-4">by {currentlyReading.author}</p>

                                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-2">
                                    <div
                                        className="bg-terminal-blue h-2 rounded-full transition-all duration-1000"
                                        style={{ width: `${currentlyReading.progress}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-right text-slate-500 font-mono">{currentlyReading.progress}% complete</p>
                            </div>
                        </div>

                        {/* Read List */}
                        <div className="lg:col-span-2">
                            <h3 className="font-mono text-terminal-green mb-6 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" /> Recently Read
                            </h3>
                            <div className="grid sm:grid-cols-2 ml-4 gap-4">
                                {readBooks.map((book, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 rounded hover:bg-white dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                                        <div className="w-12 h-16 bg-slate-200 dark:bg-slate-700 rounded flex-shrink-0"></div>
                                        <div>
                                            <h4 className="font-bold text-sm">{book.title}</h4>
                                            <p className="text-xs text-slate-500 mb-2">{book.author}</p>
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, starIndex) => (
                                                    <span key={starIndex} className={`text-xs ${starIndex < book.rating ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}`}>★</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
