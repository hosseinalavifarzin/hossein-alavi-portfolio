import { useEffect, useRef, useState } from 'react';
import { FaLinkedin, FaDribbble, FaBehance } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker, HiHeart, HiArrowUp } from 'react-icons/hi';
import social from './FooterList';

const contactInfo = [
    { icon: HiMail, label: 'Email', value: social.email, href: `mailto:${social.email}`, color: 'from-primary-500 to-accent-cyan' },
    { icon: HiPhone, label: 'Phone', value: social.call, href: `tel:${social.call}`, color: 'from-accent-cyan to-accent-purple' },
    { icon: HiLocationMarker, label: 'Location', value: social.city, href: '#', color: 'from-accent-purple to-accent-pink' },
];

const socialLinks = [
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/hossein-alavi', label: 'LinkedIn', hoverColor: 'hover:text-white hover:bg-blue-600' },
    { icon: FaDribbble, href: '#', label: 'Dribbble', hoverColor: 'hover:text-white hover:bg-pink-500' },
    { icon: FaBehance, href: '#', label: 'Behance', hoverColor: 'hover:text-white hover:bg-blue-700' },
];

function Footer() {
    const [isVisible, setIsVisible] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer ref={sectionRef} id="contact" className="relative overflow-hidden">
            <div className="bg-theme-secondary pt-16 sm:pt-24 pb-8 sm:pb-12">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
                
                <div className="absolute top-20 -left-20 w-64 h-64 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 -right-20 w-64 h-64 bg-accent-cyan/10 dark:bg-accent-cyan/5 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-light text-primary-500 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                            Get In Touch
                        </span>
                        <h2 className="section-title">
                            <span className="text-theme-primary">Let's Work </span>
                            <span className="gradient-text">Together</span>
                        </h2>
                        <p className="section-subtitle text-sm sm:text-lg px-2 sm:px-0">
                            Have a project in mind? I'd love to hear about it. Let's connect and create something amazing.
                        </p>
                    </div>

                    <div className={`grid md:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-16 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {contactInfo.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 flex items-center gap-3 sm:gap-4 card-hover group"
                            >
                                <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                    <item.icon className="text-lg sm:text-2xl text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-theme-muted text-xs sm:text-sm mb-0.5 sm:mb-1">{item.label}</div>
                                    <div className="text-theme-primary font-medium text-sm sm:text-base group-hover:text-primary-500 transition-colors truncate">
                                        {item.value}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    <div className={`flex justify-center gap-3 sm:gap-4 mb-10 sm:mb-16 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {socialLinks.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-11 h-11 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl glass flex items-center justify-center text-theme-secondary transition-all duration-300 ${item.hoverColor}`}
                                aria-label={item.label}
                            >
                                <item.icon className="text-xl sm:text-2xl" />
                            </a>
                        ))}
                    </div>

                    <div className={`text-center mb-10 sm:mb-16 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <blockquote className="glass rounded-xl sm:rounded-2xl p-5 sm:p-8 max-w-2xl mx-auto">
                            <p className="text-base sm:text-xl text-theme-secondary italic mb-3 sm:mb-4">
                                "Good design is obvious. Great design is transparent."
                            </p>
                            <cite className="text-primary-500 font-medium text-sm sm:text-base">— Joe Sparano</cite>
                        </blockquote>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-black/20 dark:via-white/20 to-transparent mb-6 sm:mb-8"></div>

                    <div className={`flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <a href="#home" className="flex items-center gap-2">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center text-white font-bold text-sm sm:text-base">
                                H
                            </div>
                            <span className="font-heading font-bold text-theme-primary text-sm sm:text-base">
                                Hossein<span className="text-primary-500">.</span>
                            </span>
                        </a>

                        <p className="text-theme-muted text-xs sm:text-sm flex items-center gap-1 text-center">
                            Made with <HiHeart className="text-red-500 animate-pulse" /> by Hossein Alavi
                        </p>

                        <p className="text-theme-muted text-xs sm:text-sm">
                            © {new Date().getFullYear()} All rights reserved.
                        </p>
                    </div>
                </div>
            </div>

            <button
                onClick={scrollToTop}
                className={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center shadow-glow-green transition-all duration-300 z-50 ${
                    showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
                aria-label="Scroll to top"
            >
                <HiArrowUp className="text-lg sm:text-xl" />
            </button>
        </footer>
    );
}

export default Footer;
