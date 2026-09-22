import { useEffect, useRef, useState } from 'react';
import skilList from './SkilsList';

const categories = [
    {
        name: 'All',
        filter: 'all',
    },
    {
        name: 'Product Design',
        filter: 'design',
    },
    {
        name: 'Development',
        filter: 'development',
    },
    {
        name: 'Tools',
        filter: 'tools',
    },
];

const levelConfig = {
    Expert: {
        description: 'Deep professional experience',
        bars: 4,
    },
    Advanced: {
        description: 'Strong practical experience',
        bars: 3,
    },
    'Mid-Level': {
        description: 'Practical working knowledge',
        bars: 2,
    },
    Familiar: {
        description: 'Working familiarity',
        bars: 1,
    },
};

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
            {
                threshold: 0.1,
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const filteredSkills =
        activeFilter === 'all'
            ? skilList
            : skilList.filter((skill) =>
                  skill.category.includes(activeFilter)
              );

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="relative py-16 sm:py-24 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-theme-primary">
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl"></div>

                <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent-cyan/10 dark:bg-accent-cyan/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">

                {/* Header */}
                <div
                    className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${
                        isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10'
                    }`}
                >
                    <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-light text-primary-500 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                        Skills & Tools
                    </span>

                    <h2 className="section-title">
                        <span className="text-theme-primary">
                            My{' '}
                        </span>

                        <span className="gradient-text">
                            Product Stack
                        </span>
                    </h2>

                    <p className="section-subtitle px-2 sm:px-0">
                        Product design is my core expertise, supported by
                        technical and analytics knowledge that helps me
                        understand users, product constraints, and
                        implementation more effectively.
                    </p>
                </div>

                {/* Filters */}
                <div
                    className={`flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 transition-all duration-700 delay-200 ${
                        isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10'
                    }`}
                >
                    {categories.map((category) => (
                        <button
                            key={category.filter}
                            type="button"
                            onClick={() =>
                                setActiveFilter(category.filter)
                            }
                            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                                activeFilter === category.filter
                                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                                    : 'glass text-theme-secondary hover:text-theme-primary hover:bg-black/5 dark:hover:bg-white/10'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Skills Grid */}
                <div
                    className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6 transition-all duration-700 delay-300 ${
                        isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10'
                    }`}
                >
                    {filteredSkills.map((skill) => {
                        const isHovered =
                            hoveredSkill === skill.title;

                        const level =
                            levelConfig[skill.level] ||
                            levelConfig.Familiar;

                        return (
                            <div
                                key={skill.title}
                                className="relative group"
                                onMouseEnter={() =>
                                    setHoveredSkill(skill.title)
                                }
                                onMouseLeave={() =>
                                    setHoveredSkill(null)
                                }
                            >
                                <div
                                    className={`relative overflow-hidden glass rounded-xl sm:rounded-2xl min-h-[175px] sm:min-h-[220px] p-4 sm:p-6 flex flex-col items-center justify-center transition-all duration-300 ${
                                        isHovered
                                            ? '-translate-y-2 shadow-xl'
                                            : ''
                                    }`}
                                >
                                    {/* Hover Background */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-cyan/10 transition-opacity duration-300 ${
                                            isHovered
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        }`}
                                    ></div>

                                    {/* Icon */}
                                    <div
                                        className={`relative z-10 w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 flex items-center justify-center transition-all duration-300 ${
                                            isHovered
                                                ? 'scale-110 -translate-y-1'
                                                : ''
                                        }`}
                                    >
                                        {skill.url ? (
                                            <img
                                                src={skill.url}
                                                alt={skill.title}
                                                className="w-full h-full object-contain"
                                            />
                                        ) : (
                                            <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#ff61f6] to-[#470137] flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg">
                                                {skill.shortLabel}
                                            </div>
                                        )}
                                    </div>

                                    {/* Skill Name */}
                                    <h3 className="relative z-10 text-theme-primary font-semibold text-center text-sm sm:text-base">
                                        {skill.title}
                                    </h3>

                                    {/* Hover Info */}
                                    <div
                                        className={`relative z-10 w-full overflow-hidden transition-all duration-300 ${
                                            isHovered
                                                ? 'max-h-28 opacity-100 mt-4'
                                                : 'max-h-0 opacity-0 mt-0'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] sm:text-xs text-theme-muted">
                                                Proficiency
                                            </span>

                                            <span className="text-[11px] sm:text-xs font-semibold text-primary-500">
                                                {skill.level}
                                            </span>
                                        </div>

                                        {/* Level Indicator */}
                                        <div className="grid grid-cols-4 gap-1.5 mb-2">
                                            {[1, 2, 3, 4].map((bar) => (
                                                <div
                                                    key={bar}
                                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                                        bar <= level.bars
                                                            ? 'bg-gradient-to-r from-primary-500 to-accent-cyan'
                                                            : 'bg-black/10 dark:bg-white/10'
                                                    }`}
                                                ></div>
                                            ))}
                                        </div>

                                        <p className="text-[10px] sm:text-xs text-theme-secondary text-center leading-relaxed">
                                            {level.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Description */}
                <div
                    className={`mt-10 sm:mt-16 text-center transition-all duration-700 delay-500 ${
                        isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10'
                    }`}
                >
                    <p className="text-theme-secondary max-w-2xl mx-auto text-sm sm:text-base px-2 sm:px-0">
                        My main focus is Product Design. Technical and
                        analytics knowledge help me understand implementation
                        constraints, observe user behavior, make stronger
                        product decisions, and collaborate more effectively
                        with cross-functional teams.
                    </p>
                </div>

            </div>
        </section>
    );
}

export default Skills;