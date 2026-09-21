import { useEffect, useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { HiDownload, HiSun, HiMoon } from 'react-icons/hi';
import { IoGameController } from 'react-icons/io5';
import { useTheme } from '../../context/ThemeContext';
import DinoGame from '../Game/DinoGame';

// Note: Replace with Hossein's CV file when available
const cvFile = "#";

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const ThemeToggle = ({ isDark, toggleTheme }) => {
  return (
    <div className="flex items-center gap-1 p-1 rounded-xl glass">
      <button
        onClick={() => !isDark || toggleTheme()}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
          !isDark 
            ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md' 
            : 'text-theme-secondary hover:text-theme-primary hover:bg-black/5 dark:hover:bg-white/5'
        }`}
      >
        <HiSun className={`text-lg ${!isDark ? 'text-white' : 'text-yellow-500'}`} />
        <span>Light</span>
      </button>
      <button
        onClick={() => isDark || toggleTheme()}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
          isDark 
            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md' 
            : 'text-theme-secondary hover:text-theme-primary hover:bg-black/5 dark:hover:bg-white/5'
        }`}
      >
        <HiMoon className={`text-lg ${isDark ? 'text-white' : 'text-indigo-500'}`} />
        <span>Dark</span>
      </button>
    </div>
  );
};

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showGame, setShowGame] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'skills', 'experience', 'contact'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Disclosure as="nav" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}>
        {({ open }) => (
          <>
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16 sm:h-20">
                <a href="#home" className="flex items-center gap-2 group">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center text-white font-bold text-lg sm:text-xl transition-transform duration-300 group-hover:scale-110">
                    H
                  </div>
                  <span className="text-lg sm:text-xl font-heading font-bold text-theme-primary hidden sm:block">
                    Hossein<span className="text-primary-500">.</span>
                  </span>
                </a>

                <div className="hidden lg:flex items-center gap-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                        activeSection === item.href.substring(1)
                          ? 'text-primary-500'
                          : 'text-theme-secondary hover:text-theme-primary'
                      }`}
                    >
                      {item.name}
                      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary-500 transition-all duration-300 rounded-full ${
                        activeSection === item.href.substring(1) ? 'w-6' : 'w-0 group-hover:w-4'
                      }`}></span>
                    </a>
                  ))}
                  {/* Game Button */}
                  <button
                    onClick={() => setShowGame(true)}
                    className="relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group text-theme-secondary hover:text-theme-primary flex items-center gap-1"
                  >
                    <IoGameController className="text-lg" />
                    <span>Game</span>
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
                  </button>
                </div>

                <div className="hidden lg:flex items-center gap-3">
                  <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
                  <a
                    href={cvFile}
                    download="Hossein-Alavi-CV.pdf"
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:shadow-glow-green transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <HiDownload className="text-lg" />
                    <span>Download CV</span>
                  </a>
                </div>

                <div className="flex lg:hidden items-center gap-2">
                  {/* Mobile Theme Toggle - Icon Only */}
                  <button
                    onClick={toggleTheme}
                    className="w-9 h-9 rounded-lg glass flex items-center justify-center transition-all duration-300"
                    aria-label="Toggle theme"
                  >
                    {isDark ? (
                      <HiSun className="text-lg text-yellow-400" />
                    ) : (
                      <HiMoon className="text-lg text-indigo-500" />
                    )}
                  </button>
                  
                  <DisclosureButton className="inline-flex items-center justify-center p-2 rounded-lg text-theme-secondary hover:text-theme-primary hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="sr-only">Open main menu</span>
                    {open ? <XMarkIcon className="block h-5 w-5" /> : <Bars3Icon className="block h-5 w-5" />}
                  </DisclosureButton>
                </div>
              </div>
            </div>

            <DisclosurePanel className="lg:hidden glass border-t border-black/10 dark:border-white/10">
              <div className="px-4 py-3 space-y-1">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                      activeSection === item.href.substring(1)
                        ? 'bg-primary-500/20 text-primary-500'
                        : 'text-theme-secondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-theme-primary'
                    }`}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}

                {/* Mobile Game Button */}
                <DisclosureButton
                  as="button"
                  onClick={() => setShowGame(true)}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 text-theme-secondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-theme-primary"
                >
                  <IoGameController className="text-lg" />
                  <span>Play Game</span>
                  <span className="ml-auto px-2 py-0.5 bg-primary-500/20 text-primary-500 text-xs rounded-full">New</span>
                </DisclosureButton>

                <a
                  href={cvFile}
                  download="Hossein-Alavi-CV.pdf"
                  className="flex items-center justify-center gap-2 mt-3 px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold rounded-lg"
                >
                  <HiDownload className="text-base" />
                  <span>Download CV</span>
                </a>
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>

      {/* Game Modal */}
      {showGame && <DinoGame onClose={() => setShowGame(false)} />}
    </>
  );
}
