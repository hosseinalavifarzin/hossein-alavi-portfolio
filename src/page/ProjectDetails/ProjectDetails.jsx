import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
    HiArrowLeft,
    HiArrowRight,
    HiBriefcase,
    HiCalendar,
    HiLocationMarker,
    HiExternalLink
} from 'react-icons/hi';

import projects from '../../data/projects';


function ProjectDetails() {
    const { projectId } = useParams();

    const projectIndex = projects.findIndex(
        (item) => item.id === projectId
    );

    const project = projects[projectIndex];


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [projectId]);


    if (!project) {
        return (
            <main className="min-h-screen bg-theme-primary flex items-center justify-center px-4">

                <div className="text-center">

                    <p className="text-primary-500 text-sm font-bold mb-3">
                        404
                    </p>

                    <h1 className="text-4xl font-bold text-theme-primary mb-5">
                        Project not found
                    </h1>

                    <Link
                        to="/"
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <HiArrowLeft />
                        Back to Portfolio
                    </Link>

                </div>

            </main>
        );
    }


    const details = project.details || {};

    const images = (project.images || []).slice(0, 4);

    const previousProject =
        projectIndex > 0
            ? projects[projectIndex - 1]
            : null;

    const nextProject =
        projectIndex < projects.length - 1
            ? projects[projectIndex + 1]
            : null;


    const painPoints =
        details.painPoints || [];

    const decisions =
        details.decisions || [];

    const learnings =
        details.learnings || [];

    const nextSteps =
        details.nextSteps || [];

    const captions =
        details.imageCaptions || [];


    const getCaption = (index) => {
        const caption = captions[index];

        if (!caption) {
            return {
                title: `Product Screen ${index + 1}`,
                description: ''
            };
        }

        if (typeof caption === 'string') {
            return {
                title: `Product Screen ${index + 1}`,
                description: caption
            };
        }

        return {
            title:
                caption.title ||
                `Product Screen ${index + 1}`,

            description:
                caption.description || ''
        };
    };


    return (
        <main className="min-h-screen bg-theme-primary">


            {/* =====================================================
                TOP BAR
            ====================================================== */}
            <nav className="
                fixed
                top-0
                left-0
                right-0
                z-50
                backdrop-blur-xl
                bg-white/80
                dark:bg-[#0b0b10]/80
                border-b
                border-black/5
                dark:border-white/5
            ">

                <div className="container mx-auto px-4 h-16 flex items-center justify-between">

                    <Link
                        to="/"
                        className="
                            group
                            inline-flex
                            items-center
                            gap-2
                            text-theme-secondary
                            hover:text-primary-500
                            transition-colors
                            text-sm
                        "
                    >
                        <HiArrowLeft className="transition-transform group-hover:-translate-x-1" />
                        Portfolio
                    </Link>


                    <span className="hidden sm:block text-theme-muted text-xs">
                        Product Design Case Study
                    </span>

                </div>

            </nav>


            {/* =====================================================
                HERO
            ====================================================== */}
            <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-20 overflow-hidden">

                <div className="absolute inset-0 pointer-events-none">

                    <div className="
                        absolute
                        -top-24
                        -left-24
                        w-[420px]
                        h-[420px]
                        bg-primary-500/10
                        rounded-full
                        blur-3xl
                    " />

                    <div className="
                        absolute
                        top-20
                        right-0
                        w-[350px]
                        h-[350px]
                        bg-accent-cyan/10
                        rounded-full
                        blur-3xl
                    " />

                </div>


                <div className="container mx-auto px-4 relative z-10">

                    <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">


                        {/* Hero Text */}
                        <div className="lg:col-span-7">

                            <p className="
                                text-primary-500
                                text-xs
                                uppercase
                                tracking-[0.24em]
                                font-semibold
                                mb-5
                            ">
                                {project.category}
                            </p>


                            <h1 className="
                                text-4xl
                                sm:text-5xl
                                lg:text-6xl
                                font-bold
                                text-theme-primary
                                leading-[1.06]
                                mb-6
                                max-w-4xl
                            ">
                                {project.title}
                            </h1>


                            {details.heroStatement && (

                                <p className="
                                    text-theme-primary
                                    text-xl
                                    sm:text-2xl
                                    leading-relaxed
                                    font-medium
                                    max-w-3xl
                                    mb-5
                                ">
                                    {details.heroStatement}
                                </p>

                            )}


                            <p className="
                                text-theme-secondary
                                text-base
                                sm:text-lg
                                leading-relaxed
                                max-w-2xl
                            ">
                                {project.description}
                            </p>


                            {/* Meta */}
                            <div className="
                                flex
                                flex-wrap
                                gap-x-8
                                gap-y-4
                                mt-9
                                pt-7
                                border-t
                                border-black/10
                                dark:border-white/10
                            ">

                                {project.role && (

                                    <div>
                                        <div className="flex items-center gap-2 text-theme-muted text-xs mb-1">
                                            <HiBriefcase />
                                            Role
                                        </div>

                                        <p className="text-theme-primary text-sm font-semibold">
                                            {project.role}
                                        </p>
                                    </div>

                                )}


                                {project.duration && (

                                    <div>
                                        <div className="flex items-center gap-2 text-theme-muted text-xs mb-1">
                                            <HiCalendar />
                                            Timeline
                                        </div>

                                        <p className="text-theme-primary text-sm font-semibold">
                                            {project.duration}
                                        </p>
                                    </div>

                                )}


                                {project.location && (

                                    <div>
                                        <div className="flex items-center gap-2 text-theme-muted text-xs mb-1">
                                            <HiLocationMarker />
                                            Location
                                        </div>

                                        <p className="text-theme-primary text-sm font-semibold">
                                            {project.location}
                                        </p>
                                    </div>

                                )}

                            </div>

                        </div>


                        {/* Hero Image - intentionally compact */}
                        <div className="lg:col-span-5">

                            {images[0] && (

                                <div className="
                                    max-w-[520px]
                                    mx-auto
                                    rounded-2xl
                                    border
                                    border-black/10
                                    
                                    bg-black/[0.02]
                                    
                                    p-3
                                ">

                                    <img
                                        src={images[0]}
                                        alt={project.title}
                                        className="
                                            w-full
                                            h-auto
                                            object-contain
                                            rounded-xl
                                        "
                                    />

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                THE CHALLENGE
            ====================================================== */}
            {(details.problem || painPoints.length > 0) && (

                <section className="py-20 sm:py-24 bg-theme-secondary">

                    <div className="container mx-auto px-4">

                        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">


                            {/* Left */}
                            <div className="lg:col-span-5">

                                <p className="
                                    text-primary-500
                                    text-xs
                                    uppercase
                                    tracking-[0.24em]
                                    font-semibold
                                    mb-4
                                ">
                                    The Challenge
                                </p>


                                <h2 className="
                                    text-3xl
                                    sm:text-4xl
                                    lg:text-5xl
                                    font-bold
                                    text-theme-primary
                                    leading-tight
                                    mb-6
                                ">
                                    Understanding where
                                    the complexity really lives.
                                </h2>


                                {details.problem && (

                                    <p className="
                                        text-theme-secondary
                                        text-base
                                        sm:text-lg
                                        leading-relaxed
                                        max-w-lg
                                    ">
                                        {details.problem}
                                    </p>

                                )}

                            </div>


                            {/* Right */}
                            <div className="lg:col-span-7">

                                {painPoints.length > 0 ? (

                                    <div className="space-y-1">

                                        {painPoints.slice(0, 3).map((item, index) => (

                                            <div
                                                key={index}
                                                className="
                                                    flex
                                                    gap-5
                                                    py-5
                                                    border-b
                                                    border-black/10
                                                    dark:border-white/10
                                                "
                                            >

                                                <span className="
                                                    text-primary-500
                                                    text-xs
                                                    font-bold
                                                    pt-1
                                                ">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>


                                                <div>

                                                    {typeof item === 'object' ? (
                                                        <>
                                                            <h3 className="
                                                                text-theme-primary
                                                                font-bold
                                                                mb-2
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
                                                        </>
                                                    ) : (
                                                        <p className="text-theme-secondary leading-relaxed">
                                                            {item}
                                                        </p>
                                                    )}

                                                </div>

                                            </div>

                                        ))}

                                    </div>

                                ) : images[1] ? (

                                    <div className="max-w-[520px] ml-auto">

                                        <img
                                            src={images[1]}
                                            alt={`${project.title} challenge`}
                                            className="
                                                w-full
                                                h-auto
                                                object-contain
                                                rounded-2xl
                                            "
                                        />

                                    </div>

                                ) : null}

                            </div>

                        </div>

                    </div>

                </section>

            )}


            {/* =====================================================
                MY APPROACH
            ====================================================== */}
            {details.process?.length > 0 && (

                <section className="py-20 sm:py-24">

                    <div className="container mx-auto px-4">

                        <div className="max-w-3xl mb-10">

                            <p className="
                                text-primary-500
                                text-xs
                                uppercase
                                tracking-[0.24em]
                                font-semibold
                                mb-4
                            ">
                                My Approach
                            </p>


                            <h2 className="
                                text-3xl
                                sm:text-4xl
                                font-bold
                                text-theme-primary
                                leading-tight
                                mb-5
                            ">
                                Make the system easier to understand,
                                not artificially simpler.
                            </h2>


                            <p className="
                                text-theme-secondary
                                leading-relaxed
                            ">
                                I focused on understanding the existing workflow,
                                structuring the information, simplifying the
                                interaction, and validating the solution with
                                product and development constraints in mind.
                            </p>

                        </div>


                        {/* Compact Process */}
                        <div className="
                            flex
                            flex-col
                            md:flex-row
                            md:items-center
                            gap-3
                            md:gap-0
                        ">

                            {details.process.slice(0, 4).map((item, index) => (

                                <div
                                    key={index}
                                    className="
                                        flex
                                        md:flex-1
                                        items-center
                                    "
                                >

                                    <div className="
                                        flex-1
                                        min-h-[115px]
                                        border
                                        border-black/10
                                        dark:border-white/10
                                        rounded-2xl
                                        p-5
                                    ">

                                        <span className="
                                            text-primary-500
                                            text-xs
                                            font-bold
                                        ">
                                            0{index + 1}
                                        </span>

                                        <p className="
                                            text-theme-primary
                                            text-sm
                                            font-medium
                                            leading-relaxed
                                            mt-5
                                        ">
                                            {item}
                                        </p>

                                    </div>


                                    {index < Math.min(details.process.length, 4) - 1 && (

                                        <HiArrowRight className="
                                            hidden
                                            md:block
                                            mx-3
                                            text-theme-muted
                                            flex-shrink-0
                                        " />

                                    )}

                                </div>

                            ))}

                        </div>

                    </div>

                </section>

            )}


            {/* =====================================================
                MY ROLE
            ====================================================== */}
            {details.contributions?.length > 0 && (

                <section className="py-20 sm:py-24 bg-theme-secondary">

                    <div className="container mx-auto px-4">

                        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">


                            <div className="lg:col-span-4">

                                <p className="
                                    text-primary-500
                                    text-xs
                                    uppercase
                                    tracking-[0.24em]
                                    font-semibold
                                    mb-4
                                ">
                                    My Role
                                </p>


                                <h2 className="
                                    text-3xl
                                    sm:text-4xl
                                    font-bold
                                    text-theme-primary
                                    leading-tight
                                ">
                                    What I actually owned.
                                </h2>

                            </div>


                            <div className="lg:col-span-8">

                                <div className="grid sm:grid-cols-2 gap-x-8">

                                    {details.contributions
                                        .slice(0, 6)
                                        .map((item, index) => (

                                            <div
                                                key={index}
                                                className="
                                                    flex
                                                    gap-4
                                                    py-4
                                                    border-b
                                                    border-black/10
                                                    dark:border-white/10
                                                "
                                            >

                                                <span className="
                                                    text-primary-500
                                                    text-xs
                                                    font-bold
                                                    pt-1
                                                ">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>


                                                <p className="
                                                    text-theme-secondary
                                                    text-sm
                                                    leading-relaxed
                                                ">
                                                    {item}
                                                </p>

                                            </div>

                                        ))}

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

            )}


            {/* =====================================================
                KEY DESIGN DECISIONS
            ====================================================== */}
            {decisions.length > 0 && (

                <section className="py-20 sm:py-24">

                    <div className="container mx-auto px-4">

                        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">


                            <div className="lg:col-span-4">

                                <p className="
                                    text-primary-500
                                    text-xs
                                    uppercase
                                    tracking-[0.24em]
                                    font-semibold
                                    mb-4
                                ">
                                    Design Decisions
                                </p>


                                <h2 className="
                                    text-3xl
                                    sm:text-4xl
                                    font-bold
                                    text-theme-primary
                                    leading-tight
                                ">
                                    The decisions behind
                                    the interface.
                                </h2>

                            </div>


                            <div className="lg:col-span-8">

                                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">

                                    {decisions.slice(0, 4).map((decision, index) => {

                                        const title =
                                            typeof decision === 'object'
                                                ? decision.title
                                                : `Decision ${index + 1}`;

                                        const description =
                                            typeof decision === 'object'
                                                ? decision.description
                                                : decision;

                                        return (

                                            <div
                                                key={index}
                                                className="
                                                    py-5
                                                    border-t
                                                    border-black/10
                                                    dark:border-white/10
                                                "
                                            >

                                                <div className="
                                                    flex
                                                    items-center
                                                    gap-3
                                                    mb-4
                                                ">

                                                    <span className="
                                                        text-primary-500
                                                        text-xs
                                                        font-bold
                                                    ">
                                                        {String(index + 1).padStart(2, '0')}
                                                    </span>


                                                    <h3 className="
                                                        text-theme-primary
                                                        font-bold
                                                    ">
                                                        {title}
                                                    </h3>

                                                </div>


                                                <p className="
                                                    text-theme-secondary
                                                    text-sm
                                                    leading-relaxed
                                                ">
                                                    {description}
                                                </p>

                                            </div>

                                        );

                                    })}

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

            )}


            {/* =====================================================
                PRODUCT EXPERIENCE
            ====================================================== */}
            {images.length > 0 && (

                <section className="py-20 sm:py-24 bg-theme-secondary">

                    <div className="container mx-auto px-4">

                        <div className="
                            flex
                            flex-col
                            lg:flex-row
                            lg:items-end
                            lg:justify-between
                            gap-5
                            mb-10
                        ">

                            <div>

                                <p className="
                                    text-primary-500
                                    text-xs
                                    uppercase
                                    tracking-[0.24em]
                                    font-semibold
                                    mb-4
                                ">
                                    Product Experience
                                </p>


                                <h2 className="
                                    text-3xl
                                    sm:text-4xl
                                    font-bold
                                    text-theme-primary
                                ">
                                    Selected product screens
                                </h2>

                            </div>


                            <p className="
                                text-theme-secondary
                                text-sm
                                leading-relaxed
                                max-w-md
                            ">
                                A compact look at the main interface,
                                workflow structure, and interaction patterns.
                            </p>

                        </div>


                        {/* Gallery */}
                        <div className="grid md:grid-cols-2 gap-6">

                            {images.map((image, index) => {

                                const caption =
                                    getCaption(index);

                                return (

                                    <div
                                        key={index}
                                        className="
                                            border
                                            border-black/10
                                            dark:border-white/10
                                            rounded-2xl
                                            p-3
                                        "
                                    >

                                        {/* Small controlled image */}
                                        <div className="
                                            h-[210px]
                                            sm:h-[250px]
                                            flex
                                            items-center
                                            justify-center
                                            overflow-hidden
                                            rounded-xl
                                            bg-black/[0.02]
                                            dark:bg-white/[0.02]
                                        ">

                                            <img
                                                src={image}
                                                alt={`${project.title} screen ${index + 1}`}
                                                className="
                                                    max-w-full
                                                    max-h-full
                                                    object-contain
                                                "
                                            />

                                        </div>


                                        <div className="pt-4 px-1">

                                            <div className="flex items-start gap-3">

                                                <span className="
                                                    text-primary-500
                                                    text-xs
                                                    font-bold
                                                    pt-1
                                                ">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>


                                                <div>

                                                    <h3 className="
                                                        text-theme-primary
                                                        text-sm
                                                        font-semibold
                                                        mb-1
                                                    ">
                                                        {caption.title}
                                                    </h3>


                                                    {caption.description && (

                                                        <p className="
                                                            text-theme-muted
                                                            text-xs
                                                            leading-relaxed
                                                        ">
                                                            {caption.description}
                                                        </p>

                                                    )}

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                );

                            })}

                        </div>

                    </div>

                </section>

            )}


            {/* =====================================================
                OUTCOME + REFLECTION
            ====================================================== */}
            {(details.outcome || learnings.length > 0 || nextSteps.length > 0) && (

                <section className="py-20 sm:py-24">

                    <div className="container mx-auto px-4">

                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">


                            {/* Outcome */}
                            <div>

                                <p className="
                                    text-primary-500
                                    text-xs
                                    uppercase
                                    tracking-[0.24em]
                                    font-semibold
                                    mb-4
                                ">
                                    Outcome
                                </p>


                                <h2 className="
                                    text-3xl
                                    sm:text-4xl
                                    font-bold
                                    text-theme-primary
                                    leading-tight
                                    mb-6
                                ">
                                    What moved forward.
                                </h2>


                                {details.outcome && (

                                    <p className="
                                        text-theme-secondary
                                        text-base
                                        sm:text-lg
                                        leading-relaxed
                                    ">
                                        {details.outcome}
                                    </p>

                                )}


                                {project.website && (

                                    <a
                                        href={project.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            inline-flex
                                            items-center
                                            gap-2
                                            mt-7
                                            text-primary-500
                                            hover:text-primary-400
                                            font-semibold
                                            text-sm
                                        "
                                    >
                                        Visit Company Website
                                        <HiExternalLink />
                                    </a>

                                )}

                            </div>


                            {/* Reflection */}
                            <div>

                                <p className="
                                    text-theme-muted
                                    text-xs
                                    uppercase
                                    tracking-[0.24em]
                                    font-semibold
                                    mb-4
                                ">
                                    Reflection
                                </p>


                                <h2 className="
                                    text-2xl
                                    sm:text-3xl
                                    font-bold
                                    text-theme-primary
                                    mb-6
                                ">
                                    What I'd carry forward
                                </h2>


                                {learnings.length > 0 ? (

                                    <div>

                                        {learnings.slice(0, 3).map((item, index) => (

                                            <div
                                                key={index}
                                                className="
                                                    py-4
                                                    border-b
                                                    border-black/10
                                                    dark:border-white/10
                                                "
                                            >

                                                <p className="
                                                    text-theme-secondary
                                                    text-sm
                                                    leading-relaxed
                                                ">
                                                    {item}
                                                </p>

                                            </div>

                                        ))}

                                    </div>

                                ) : nextSteps.length > 0 ? (

                                    <div>

                                        {nextSteps.slice(0, 3).map((item, index) => (

                                            <div
                                                key={index}
                                                className="
                                                    py-4
                                                    border-b
                                                    border-black/10
                                                    dark:border-white/10
                                                "
                                            >

                                                <p className="
                                                    text-theme-secondary
                                                    text-sm
                                                    leading-relaxed
                                                ">
                                                    {item}
                                                </p>

                                            </div>

                                        ))}

                                    </div>

                                ) : (

                                    <p className="
                                        text-theme-secondary
                                        text-sm
                                        leading-relaxed
                                    ">
                                        Complex products don't always need
                                        less information. They often need
                                        clearer hierarchy, stronger structure,
                                        and more predictable interaction patterns.
                                    </p>

                                )}

                            </div>

                        </div>

                    </div>

                </section>

            )}


            {/* =====================================================
                NEXT / PREVIOUS
            ====================================================== */}
            <section className="
                py-14
                sm:py-16
                border-t
                border-black/10
                dark:border-white/10
            ">

                <div className="container mx-auto px-4">

                    <div className="grid sm:grid-cols-2 gap-4">


                        {/* Previous */}
                        <div>

                            {previousProject && (

                                <Link
                                    to={`/projects/${previousProject.id}`}
                                    className="
                                        group
                                        block
                                        py-5
                                    "
                                >

                                    <span className="
                                        text-theme-muted
                                        text-xs
                                    ">
                                        Previous
                                    </span>


                                    <div className="
                                        flex
                                        items-center
                                        gap-3
                                        mt-2
                                    ">

                                        <HiArrowLeft className="
                                            text-primary-500
                                            transition-transform
                                            group-hover:-translate-x-1
                                        " />


                                        <p className="
                                            text-theme-primary
                                            font-bold
                                            group-hover:text-primary-500
                                            transition-colors
                                        ">
                                            {previousProject.title}
                                        </p>

                                    </div>

                                </Link>

                            )}

                        </div>


                        {/* Next */}
                        <div className="sm:text-right">

                            {nextProject && (

                                <Link
                                    to={`/projects/${nextProject.id}`}
                                    className="
                                        group
                                        inline-block
                                        py-5
                                    "
                                >

                                    <span className="
                                        text-theme-muted
                                        text-xs
                                    ">
                                        Next Project
                                    </span>


                                    <div className="
                                        flex
                                        items-center
                                        justify-end
                                        gap-3
                                        mt-2
                                    ">

                                        <p className="
                                            text-theme-primary
                                            font-bold
                                            group-hover:text-primary-500
                                            transition-colors
                                        ">
                                            {nextProject.title}
                                        </p>


                                        <HiArrowRight className="
                                            text-primary-500
                                            transition-transform
                                            group-hover:translate-x-1
                                        " />

                                    </div>

                                </Link>

                            )}

                        </div>

                    </div>


                    <div className="text-center mt-5">

                        <Link
                            to="/"
                            className="
                                text-theme-muted
                                hover:text-primary-500
                                text-xs
                                transition-colors
                            "
                        >
                            View all projects
                        </Link>

                    </div>

                </div>

            </section>

        </main>
    );
}


export default ProjectDetails;