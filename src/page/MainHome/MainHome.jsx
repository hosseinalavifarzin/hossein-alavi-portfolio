import {
    Link
} from 'react-router-dom';

import {
    HiArrowRight,
    HiBookOpen,
    HiBriefcase,
    HiSearch,
    HiLightBulb,
    HiCollection
} from 'react-icons/hi';

import MainNavBar from '../../Component/MainNavBar/MainNavBar';
import FirstShow from '../../Component/FirstShow/FirstShow';
import About from '../../Component/About/About';
import Footer from '../../Component/footer/Footer';

import projects from '../../data/projects';


const workAreas = [

    {
        icon: HiBriefcase,
        title: 'Product Design',
        description:
            'Designing digital products from problem definition and product flows through interface design and delivery.'
    },

    {
        icon: HiSearch,
        title: 'UX Research',
        description:
            'Understanding users, workflows, pain points, context, and the real problems behind product decisions.'
    },

    {
        icon: HiLightBulb,
        title: 'Product Thinking',
        description:
            'Connecting user needs, business goals, constraints, assumptions, and product decisions.'
    },

    {
        icon: HiCollection,
        title: 'Design Systems',
        description:
            'Creating reusable patterns and scalable foundations for complex products and product ecosystems.'
    }

];


function MainHome() {

    const featuredProjects =
        projects.slice(0, 3);


    return (

        <main className="min-h-screen bg-theme-primary">


            <MainNavBar />


            <FirstShow />


            {/* =====================================================
                FEATURED WORK
            ====================================================== */}
            <section
                id="projects"
                className="
                    relative
                    py-16
                    sm:py-24
                    overflow-hidden
                "
            >

                <div className="absolute inset-0 bg-theme-secondary">

                    <div className="
                        absolute
                        top-0
                        left-0
                        w-full
                        h-px
                        bg-gradient-to-r
                        from-transparent
                        via-primary-500/50
                        to-transparent
                    " />

                    <div className="
                        absolute
                        bottom-0
                        left-0
                        w-full
                        h-px
                        bg-gradient-to-r
                        from-transparent
                        via-primary-500/50
                        to-transparent
                    " />

                </div>


                <div className="
                    container
                    mx-auto
                    px-4
                    relative
                    z-10
                ">

                    <div className="
                        text-center
                        mb-10
                        sm:mb-16
                    ">

                        <span className="
                            inline-block
                            px-3
                            sm:px-4
                            py-1.5
                            sm:py-2
                            rounded-full
                            glass-light
                            text-primary-500
                            text-xs
                            sm:text-sm
                            font-medium
                            mb-3
                            sm:mb-4
                        ">

                            Featured Work

                        </span>


                        <h2 className="section-title">

                            <span className="text-theme-primary">
                                Selected Product{' '}
                            </span>

                            <span className="gradient-text">
                                Design Work
                            </span>

                        </h2>


                        <p className="
                            section-subtitle
                            px-2
                            sm:px-0
                        ">

                            A selection of product design work across
                            complex digital products, platforms, and
                            operational experiences.

                        </p>

                    </div>


                    <div className="
                        grid
                        md:grid-cols-2
                        lg:grid-cols-3
                        gap-6
                    ">

                        {featuredProjects.map((project) => (

                            <Link
                                key={project.id}
                                to={`/projects/${project.id}`}
                                aria-label={`View ${project.title} product design case study`}
                                className="
                                    group
                                    glass
                                    rounded-xl
                                    sm:rounded-2xl
                                    overflow-hidden
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                "
                            >

                                {project.images?.[0] && (

                                    <div className="
                                        h-48
                                        sm:h-56
                                        overflow-hidden
                                        bg-theme-secondary
                                    ">

                                        <img
                                            src={project.images[0]}
                                            alt={`${project.title} product design case study`}
                                            className="
                                                w-full
                                                h-full
                                                object-cover
                                                transition-transform
                                                duration-500
                                                group-hover:scale-[1.02]
                                            "
                                        />

                                    </div>

                                )}


                                <div className="
                                    p-5
                                    sm:p-6
                                ">

                                    <p className="
                                        text-primary-500
                                        text-xs
                                        uppercase
                                        tracking-[0.18em]
                                        font-semibold
                                        mb-3
                                    ">

                                        {project.category}

                                    </p>


                                    <h3 className="
                                        text-xl
                                        font-bold
                                        text-theme-primary
                                        mb-3
                                        group-hover:text-primary-500
                                        transition-colors
                                    ">

                                        {project.title}

                                    </h3>


                                    <p className="
                                        text-theme-secondary
                                        text-sm
                                        leading-relaxed
                                        mb-5
                                    ">

                                        {project.description}

                                    </p>


                                    <div className="
                                        flex
                                        items-center
                                        gap-2
                                        text-primary-500
                                        text-sm
                                        font-medium
                                    ">

                                        View Case Study

                                        <HiArrowRight className="
                                            transition-transform
                                            duration-300
                                            group-hover:translate-x-1
                                        " />

                                    </div>

                                </div>

                            </Link>

                        ))}

                    </div>


                    <div className="
                        mt-10
                        sm:mt-12
                        text-center
                    ">

                        <Link
                            to="/portfolio"
                            className="
                                btn-primary
                                inline-flex
                                items-center
                                gap-2
                            "
                        >

                            View Full Portfolio

                            <HiArrowRight />

                        </Link>

                    </div>

                </div>

            </section>


            {/* =====================================================
                WHAT I WORK ON
            ====================================================== */}
            <section className="
                relative
                py-16
                sm:py-24
                overflow-hidden
            ">

                <div className="
                    container
                    mx-auto
                    px-4
                    relative
                    z-10
                ">

                    <div className="
                        text-center
                        mb-10
                        sm:mb-16
                    ">

                        <span className="
                            inline-block
                            px-3
                            sm:px-4
                            py-1.5
                            sm:py-2
                            rounded-full
                            glass-light
                            text-primary-500
                            text-xs
                            sm:text-sm
                            font-medium
                            mb-3
                            sm:mb-4
                        ">

                            What I Work On

                        </span>


                        <h2 className="section-title">

                            <span className="text-theme-primary">
                                Product Design Beyond{' '}
                            </span>

                            <span className="gradient-text">
                                The Interface
                            </span>

                        </h2>

                    </div>


                    <div className="
                        grid
                        sm:grid-cols-2
                        lg:grid-cols-4
                        gap-5
                    ">

                        {workAreas.map((item) => {

                            const Icon = item.icon;

                            return (

                                <div
                                    key={item.title}
                                    className="
                                        glass
                                        rounded-xl
                                        sm:rounded-2xl
                                        p-5
                                        sm:p-6
                                    "
                                >

                                    <div className="
                                        w-10
                                        h-10
                                        rounded-xl
                                        bg-gradient-to-br
                                        from-primary-500
                                        to-accent-cyan
                                        flex
                                        items-center
                                        justify-center
                                        text-white
                                        mb-5
                                    ">

                                        <Icon className="text-xl" />

                                    </div>


                                    <h3 className="
                                        text-lg
                                        font-bold
                                        text-theme-primary
                                        mb-3
                                    ">

                                        {item.title}

                                    </h3>


                                    <p className="
                                        text-theme-secondary
                                        text-sm
                                        leading-relaxed
                                    ">

                                        {item.description}

                                    </p>

                                </div>

                            );

                        })}

                    </div>

                </div>

            </section>


            {/* =====================================================
                WRITING
            ====================================================== */}
            <section className="
                relative
                py-16
                sm:py-24
                overflow-hidden
            ">

                <div className="
                    absolute
                    inset-0
                    bg-theme-secondary
                " />


                <div className="
                    container
                    mx-auto
                    px-4
                    relative
                    z-10
                ">

                    <div className="
                        glass
                        rounded-xl
                        sm:rounded-2xl
                        p-6
                        sm:p-10
                        lg:p-12
                    ">

                        <div className="
                            grid
                            lg:grid-cols-12
                            gap-8
                            lg:gap-12
                            items-center
                        ">

                            <div className="
                                lg:col-span-8
                            ">

                                <span className="
                                    inline-block
                                    px-3
                                    py-1.5
                                    rounded-full
                                    glass-light
                                    text-primary-500
                                    text-xs
                                    font-medium
                                    mb-4
                                ">

                                    Writing

                                </span>


                                <h2 className="
                                    text-3xl
                                    sm:text-4xl
                                    font-bold
                                    text-theme-primary
                                    mb-5
                                ">

                                    Product Design Notes
                                    {' '}

                                    <span className="gradient-text">
                                        & Thinking
                                    </span>

                                </h2>


                                <p className="
                                    text-theme-secondary
                                    leading-relaxed
                                    max-w-2xl
                                ">

                                    Practical notes about user research,
                                    problem framing, product thinking,
                                    design systems, and the decisions
                                    behind better digital products.

                                </p>

                            </div>


                            <div className="
                                lg:col-span-4
                                lg:text-right
                            ">

                                <Link
                                    to="/blog"
                                    className="
                                        btn-primary
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                    "
                                >

                                    <HiBookOpen />

                                    Explore Blog

                                    <HiArrowRight />

                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            <About />


            <div id="contact">

                <Footer />

            </div>


        </main>

    );

}


export default MainHome;