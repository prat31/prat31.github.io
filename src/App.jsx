import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Bookshelf } from './components/Bookshelf';
import { Contact } from './components/Contact';
import { CommandPalette } from './components/CommandPalette';

function App() {
    return (
        <div className="min-h-screen bg-terminal-light dark:bg-terminal-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <CommandPalette />
            <Navbar />

            <main>
                <Hero />
                <About />
                <Projects />
                <Bookshelf />
                <Contact />
            </main>
        </div>
    );
}

export default App;
