import { useEffect, useRef, useState } from 'react';
import skilList from './SkilsList';

const categories = [
    { name: 'All', filter: 'all' },
    { name: 'Design', filter: 'design' },
    { name: 'Tools', filter: 'tools' },
    { name: 'Frontend', filter: 'frontend' },
];

function Skills() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    const [hoveredSkill, setHoveredSkill] = useState(null);
    const sectionRef = useRef(null);

    useEffect(() => {
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

        return () => observer.disconnect();
    }, []);

    const filteredSkills = activeFilter === 'all' 
        ? skilList 
        : skilList.filter(skill => skill.category === activeFilter);

    return (
        <section ref={sectionRef} id="skills" className="relative py-16 sm:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-theme-primary">
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent-cyan/10 dark:bg-accent-cyan/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-light text-primary-500 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                        Technical Skills
                    </span>
                    <h2 className="section-title">
                        <span className="text-theme-primary">My </span>
                        <span className="gradient-text">Tech Stack</span>
                    </h2>
                    <p className="section-subtitle px-2 sm:px-0">
                        Technologies and tools I work with on a daily basis
                    </p>
                </div>

                <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {categories.map((category) => (
                        <button
                            key={category.filter}
                            onClick={() => setActiveFilter(category.filter)}
                            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                                activeFilter === category.filter
                                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-glow-green'
                                    : 'glass text-theme-secondary hover:text-theme-primary hover:bg-black/5 dark:hover:bg-white/10'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {filteredSkills.map((skill, index) => (
                        <div
                            key={index}
                            className="relative group"
                            onMouseEnter={() => setHoveredSkill(index)}
                            onMouseLeave={() => setHoveredSkill(null)}
                        >
                            <div className={`glass rounded-xl sm:rounded-2xl p-3 sm:p-6 flex flex-col items-center justify-center card-hover transition-all duration-300 ${
                                hoveredSkill === index ? 'bg-primary-500/10 border-primary-500/30' : ''
                            }`}>
                                <div className="relative w-10 h-10 sm:w-16 sm:h-16 mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <img 
                                        src={skill.url} 
                                        alt={skill.title}
                                        className="w-full h-full object-contain rounded-lg sm:rounded-xl"
                                    />
                                    <div className="absolute inset-0 bg-primary-500/20 rounded-lg sm:rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                
                                <span className="text-theme-secondary font-medium text-center text-xs sm:text-base group-hover:text-theme-primary transition-colors duration-300">
                                    {skill.title}
                                </span>

                                {skill.level && (
                                    <div className="w-full mt-2 sm:mt-3">
                                        <div className="h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-primary-500 to-accent-cyan rounded-full transition-all duration-500"
                                                style={{ width: hoveredSkill === index ? `${skill.level}%` : '0%' }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {hoveredSkill === index && skill.years && (
                                <div className="hidden sm:block absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-theme-card rounded-lg text-xs text-theme-secondary whitespace-nowrap z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                                    {skill.years} years experience
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[var(--card-bg)]"></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className={`mt-10 sm:mt-16 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <p className="text-theme-secondary max-w-2xl mx-auto text-sm sm:text-base px-2 sm:px-0">
                        I'm always eager to learn new design trends and stay updated with the latest in product design.
                        Currently exploring <span className="text-accent-cyan">AI-powered design tools</span> and <span className="text-accent-purple">Advanced Prototyping</span>.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Skills;
