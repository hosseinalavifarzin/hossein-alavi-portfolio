import { useEffect, useRef, useState } from 'react';
import { HiExternalLink, HiLocationMarker, HiCalendar, HiBriefcase, HiArrowRight } from 'react-icons/hi';
import exList from './ExperinceList';

const ExperienceCard = ({ experience, index, isVisible, isLast }) => {
    const isEven = index % 2 === 0;
    
    return (
        <div className="relative sm:pl-16 md:pl-0">
            {!isLast && (
                <div className="hidden sm:block absolute left-6 md:left-1/2 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-accent-cyan to-primary-500/30 md:-translate-x-1/2"></div>
            )}
            
            <div className={`flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-8 ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}>
                <div className="hidden sm:block absolute left-6 md:left-1/2 md:-translate-x-1/2 z-20 top-0">
                    <div className={`relative transition-all duration-700 ${isVisible ? 'scale-100' : 'scale-0'}`} style={{ transitionDelay: `${index * 150}ms` }}>
                        <div className="absolute -inset-2 bg-gradient-to-r from-primary-500 to-accent-cyan rounded-full opacity-30 blur-md animate-pulse"></div>
                        <div className="relative w-12 h-12 rounded-full bg-theme-card border-4 border-primary-500 flex items-center justify-center shadow-glow-green">
                            <HiBriefcase className="text-primary-500 text-lg" />
                        </div>
                    </div>
                </div>

                <div className={`w-full sm:ml-0 md:w-5/12 transition-all duration-700 ${
                    isVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-10'
                } ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}
                style={{ transitionDelay: `${index * 150 + 100}ms` }}>
                    
                    <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-primary-500/5 transition-all duration-300 group relative overflow-hidden">
                        <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-1 h-full bg-gradient-to-b from-primary-500 via-accent-cyan to-accent-purple`}></div>
                        
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 mb-3 sm:mb-4">
                            <HiCalendar className="text-primary-500 text-xs sm:text-sm" />
                            <span className="text-xs sm:text-sm font-medium text-primary-500">{experience.date}</span>
                        </div>

                        <h3 className="text-base sm:text-xl font-bold text-theme-primary mb-2 group-hover:text-primary-500 transition-colors leading-tight">
                            {experience.compony}
                        </h3>
                        
                        <div className={`flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 text-xs sm:text-sm text-theme-secondary ${isEven ? 'md:justify-end' : 'md:justify-start'} flex-wrap`}>
                            <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
                                {experience.position}
                            </span>
                            <div className="flex items-center gap-1">
                                <HiLocationMarker className="text-accent-purple text-sm" />
                                <span>{experience.city}</span>
                            </div>
                        </div>

                        <p className={`text-theme-secondary text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                            {experience.describe}
                        </p>

                        <div className={`flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                            {experience.skil.map((skill) => (
                                <span 
                                    key={skill} 
                                    className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-lg bg-black/5 dark:bg-white/5 text-theme-secondary border border-black/10 dark:border-white/10 hover:border-primary-500/50 hover:text-primary-500 transition-colors"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>

                        <a 
                            href={experience.link}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-primary-500 hover:text-primary-400 transition-colors group/link ${isEven ? 'md:flex-row-reverse' : ''}`}
                        >
                            <span>Visit Website</span>
                            <HiExternalLink className="transition-transform group-hover/link:translate-x-1" />
                        </a>
                    </div>
                </div>

                <div className="hidden md:block md:w-5/12"></div>
            </div>
        </div>
    );
};

function Experience() {
    const [isVisible, setIsVisible] = useState(false);
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

    const sortedExperiences = [...exList].reverse();

    return (
        <section ref={sectionRef} id="experience" className="relative py-16 sm:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-theme-secondary">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
                
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent-cyan/10 dark:bg-accent-cyan/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-purple/10 dark:bg-accent-purple/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className={`text-center mb-12 sm:mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-light text-primary-500 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                        Work Experience
                    </span>
                    <h2 className="section-title">
                        <span className="text-theme-primary">My Professional </span>
                        <span className="gradient-text">Journey</span>
                    </h2>
                    <p className="section-subtitle px-2 sm:px-0">
                        A timeline of my career growth and the companies I've had the pleasure to work with
                    </p>
                    
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
                        <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-primary-500"></div>
                        <span className="text-primary-500 text-xs sm:text-sm font-medium">Start of Journey</span>
                        <HiArrowRight className="text-primary-500 animate-pulse text-sm sm:text-base" />
                    </div>
                </div>

                <div className="relative space-y-12 sm:space-y-16 md:space-y-24 overflow-hidden">
                    {sortedExperiences.map((experience, index) => (
                        <ExperienceCard 
                            key={index}
                            experience={experience}
                            index={index}
                            isVisible={isVisible}
                            isLast={index === sortedExperiences.length - 1}
                        />
                    ))}
                </div>

                <div className={`mt-12 sm:mt-20 text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-flex flex-col items-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center mb-3 sm:mb-4 shadow-glow-green animate-pulse">
                            <span className="text-xl sm:text-2xl">🎨</span>
                        </div>
                        <span className="text-primary-500 font-medium text-sm sm:text-base mb-1 sm:mb-2">Present Day</span>
                        <p className="text-theme-secondary max-w-md text-sm sm:text-base px-4 sm:px-0">
                            Currently designing impactful products and always open to new opportunities
                        </p>
                    </div>
                    
                    <div className="mt-8 sm:mt-10">
                        <p className="text-theme-muted text-sm sm:text-base mb-3 sm:mb-4">
                            Interested in working together?
                        </p>
                        <a 
                            href="#contact" 
                            className="btn-primary inline-flex items-center gap-2 text-sm sm:text-base"
                        >
                            Let's Connect
                            <HiArrowRight />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Experience;
