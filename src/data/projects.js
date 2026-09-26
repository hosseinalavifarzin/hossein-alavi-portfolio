import projectImages from './projectImages';


const projects = [
{
    id: "tipax",

    title: "Logistics Operations Platform",

    company: "Tosan Techno / Tipax",

    category: "Internal Operations Product",

    role: "Product Designer",

    duration: "Ongoing",

    location: "Remote",

    platform: "Web Platform",

    team: "Product & Development",

    scope: "End-to-End Product Design",

    description:
        "An internal logistics platform designed to help operations teams manage complex day-to-day workflows with more clarity and consistency.",

    tags: [
        "Product Design",
        "Logistics",
        "Internal Tools",
        "Operational Workflows"
    ],

    images: projectImages.tipax,

    website: "https://tipaxco.com/",

    details: {

        heroStatement:
            "The goal wasn't to remove the complexity of logistics — it was to make that complexity easier to understand and operate.",


        overview:
            "The platform is used by internal teams responsible for daily logistics operations. My role was to understand how these workflows worked in practice, identify where complexity was getting in the way, and translate them into a clearer digital experience.",


        problem:
            "The challenge wasn't a single screen. Users had to work with connected tasks, statuses, business rules, and large amounts of operational information at the same time.",


        painPoints: [
            {
                title: "Connected workflows",
                description:
                    "Many tasks depended on previous actions, statuses, or conditions, making the overall process harder to follow."
            },

            {
                title: "High information density",
                description:
                    "Users needed access to a lot of information, but not everything was equally important at every moment."
            },

            {
                title: "Inconsistent patterns",
                description:
                    "Similar actions and states needed to behave more consistently so users didn't have to relearn the interface across different workflows."
            }
        ],


        users: [
            {
                title: "Operations Teams",
                description:
                    "Internal teams responsible for managing and completing daily logistics tasks."
            }
        ],


        businessGoals: [
            "Make daily operational workflows easier to understand and manage.",

            "Create a more consistent experience across different parts of the product.",

            "Build reusable interaction patterns that could support future product development."
        ],


        constraints: [
            "The design had to work with existing operational processes instead of changing the business logic behind them.",

            "Important operational information couldn't simply be removed to make the interface look cleaner.",

            "Solutions needed to be practical for development and scalable as the product evolved.",

            "Product and development collaboration happened remotely."
        ],


        contributions: [
            "Mapped and structured complex operational workflows.",

            "Translated business and operational requirements into clearer product flows.",

            "Designed interfaces for internal logistics teams.",

            "Improved information hierarchy across dense operational screens.",

            "Created more consistent interaction patterns across the product.",

            "Collaborated with product and development teams throughout implementation.",

            "Reviewed implementation to help maintain the intended product experience."
        ],


        process: [
            "Understand the workflow",

            "Map dependencies",

            "Find friction",

            "Simplify the structure",

            "Explore solutions",

            "Review implementation"
        ],


        decisions: [
            {
                title: "Use hierarchy instead of hiding information",
                description:
                    "Rather than removing necessary operational information, I focused on making the most important information easier to find and understand."
            },

            {
                title: "Design around the next action",
                description:
                    "The interface gives more visual priority to what users need to understand or do next in the workflow."
            },

            {
                title: "Reuse familiar patterns",
                description:
                    "Similar actions and states use consistent interaction patterns so users can build familiarity across the product."
            },

            {
                title: "Design for daily use",
                description:
                    "Decisions were evaluated based on how practical they would be during repeated operational tasks, not only on how clean the interface looked."
            }
        ],


        imageCaptions: [
            {
                title: "Operations Overview",
                description:
                    "A clearer overview of operational information and frequently used actions."
            },

            {
                title: "Workflow Management",
                description:
                    "A structured experience for handling connected tasks and system states."
            },

            {
                title: "Information Hierarchy",
                description:
                    "Dense operational information organized around priority and context."
            },

            {
                title: "Detailed Operations View",
                description:
                    "A closer look at how status, information, and actions come together in the workflow."
            }
        ],


        outcome:
            "The redesign created a clearer and more consistent structure for internal logistics workflows. Instead of removing necessary complexity, the experience was organized so users could understand information, actions, and system states more easily.",


        nextSteps: [
            "Validate the redesigned workflows with operations teams during real daily tasks.",

            "Observe where users still hesitate, backtrack, or need additional information.",

            "Use feedback and product behavior to refine information hierarchy and workflow details."
        ],


        learnings: [
            "Complex products don't always need less information. They often need better hierarchy.",

            "Consistency matters even more when users repeat similar tasks every day.",

            "Understanding the real workflow is more important than designing the screen too early."
        ]
    }
},

   {
    id: "3click",

    title: "Travel Booking Product Redesign",

    company: "3 Click Group",

    category: "Travel & Booking Platform",

    role: "Product Designer",

    duration: "1.5 Years",

    location: "Tehran, Iran",

    platform: "Web Platform",

    team: "Product & Development",

    scope: "Product Redesign & Design System",

    description:
        "A redesign across 3Click's travel ecosystem, covering the customer website, booking experiences, internal tools, content management, and a shared design system.",

    tags: [
        "Product Design",
        "Travel",
        "Booking",
        "CMS",
        "Design System"
    ],

    images: projectImages["3click"],

    website: "https://3click.com",

    details: {

        heroStatement:
            "The goal wasn't just to redesign a website — it was to create a more consistent experience across the product ecosystem.",


        overview:
            "3Click included more than a customer-facing travel website. Behind the booking experience, internal teams needed tools for managing content, landing pages, bookings, and partner workflows. My work focused on connecting these different experiences through clearer product structures and a more consistent design language.",


        problem:
            "Different parts of the product served different users and needs. The challenge was to create consistency across the ecosystem without forcing every product to behave or look exactly the same.",


        painPoints: [
            {
                title: "Disconnected product experiences",
                description:
                    "The website, booking flows, and internal tools had different purposes, but still needed to feel like parts of the same product ecosystem."
            },

            {
                title: "Content management dependency",
                description:
                    "Internal teams needed a more practical way to manage content and landing pages without relying on development for every change."
            },

            {
                title: "Booking across different users",
                description:
                    "Booking wasn't only a customer-facing experience. Internal teams and partner agencies also needed clear workflows for managing reservations."
            }
        ],


        users: [
            {
                title: "Travel Customers",
                description:
                    "People using the website to explore travel services and move through the booking experience."
            },

            {
                title: "Internal Teams",
                description:
                    "Teams responsible for managing content, landing pages, bookings, and day-to-day product operations."
            },

            {
                title: "Partner Agencies",
                description:
                    "External partners using booking-related tools and workflows."
            }
        ],


        businessGoals: [
            "Create a more consistent experience across 3Click products.",

            "Make content and landing page management easier for internal teams.",

            "Create clearer booking workflows for internal teams and partner agencies.",

            "Reduce unnecessary dependency on development for content-related tasks.",

            "Build a shared design system that could support future product development."
        ],


        constraints: [
            "Customer-facing experiences needed to stay simple while internal tools had to support more information and operational complexity.",

            "Different products needed a shared design language without becoming identical.",

            "The design system had to remain flexible enough to support different product contexts.",

            "Solutions needed to work within real product and development constraints."
        ],


        contributions: [
            "Redesigned the main 3Click website.",

            "Designed responsive experiences across key customer journeys.",

            "Designed a CMS for managing content and landing pages.",

            "Designed booking management experiences for internal teams.",

            "Designed workflows for partner agencies.",

            "Created shared interaction patterns across different products.",

            "Built and maintained a design system for the product ecosystem.",

            "Collaborated with product and development teams throughout implementation."
        ],


        process: [
            "Understand the product",

            "Map user needs",

            "Structure the experience",

            "Connect product flows",

            "Create reusable patterns",

            "Review implementation"
        ],


        decisions: [
            {
                title: "Consistency without making everything identical",
                description:
                    "The website, CMS, and booking tools had different purposes. I focused on giving them shared typography, components, states, and interaction patterns while keeping each experience appropriate for its users."
            },

            {
                title: "Give internal teams more control",
                description:
                    "The CMS was structured to help content teams manage pages and landing content with less dependency on development."
            },

            {
                title: "Design booking beyond the customer journey",
                description:
                    "Booking was considered from the perspective of customers, internal teams, and partner agencies rather than treating it as a single front-end flow."
            },

            {
                title: "Treat the design system as product infrastructure",
                description:
                    "The design system wasn't only a Figma library. It was intended to make future design and development decisions more consistent and reusable."
            }
        ],


        imageCaptions: [
            {
                title: "Flight Booking Experience",
                description:
                    "A selected screen from the flight product, focused on making booking information easier to understand and act on."
            },

            {
                title: "Flight Selection & Booking Flow",
                description:
                    "Part of the flight booking journey where users review information and continue through the reservation process."
            },

            {
                title: "Add Passenger",
                description:
                    "A passenger entry experience designed to make required information easier to enter and review."
            },

            {
                title: "Passenger Information",
                description:
                    "A structured view of passenger details, with emphasis on clarity, form hierarchy, and reducing avoidable input mistakes."
            }
        ],


        outcome:
            "The work created a more consistent foundation across the 3Click product ecosystem. The website, booking experiences, internal tools, and design system became part of a more connected product structure instead of being treated as isolated interfaces.",


        nextSteps: [
            "Continue validating booking flows with real customer and operational behavior.",

            "Expand reusable patterns as new travel products and booking scenarios are introduced.",

            "Use product feedback to refine form behavior, information hierarchy, and booking interactions."
        ],


        learnings: [
            "Consistency doesn't mean making every product look the same. It means giving them a shared logic.",

            "In multi-product ecosystems, the experience of internal teams matters as much as the customer-facing experience.",

            "A design system becomes valuable when it improves real product decisions, not when it is only a well-organized component library."
        ]
    }
},

    {
        id: "blue",

        title: "Blue",

        company: "",

        category: "Selected Project",

        role: "Product Designer",

        duration: "",

        location: "",

        description:
            "A selected product design project from my portfolio.",

        tags: [
            "Product Design"
        ],

        images: projectImages.blue,

        website: null,

        details: null
    },


    {
        id: "darzi",

        title: "Darzi",

        company: "",

        category: "Selected Project",

        role: "Product Designer",

        duration: "",

        location: "",

        description:
            "A selected product design project from my portfolio.",

        tags: [
            "Product Design"
        ],

        images: projectImages.darzi,

        website: null,

        details: null
    },


    {
        id: "yahoo",

        title: "Yahoo",

        company: "",

        category: "Selected Project",

        role: "Product Designer",

        duration: "",

        location: "",

        description:
            "A selected product design project from my portfolio.",

        tags: [
            "Product Design"
        ],

        images: projectImages.yahoo,

        website: null,

        details: null
    },


    {
        id: "citynet",

        title: "Citynet",

        company: "",

        category: "Selected Project",

        role: "Product Designer",

        duration: "",

        location: "",

        description:
            "A selected product design project from my portfolio.",

        tags: [
            "Product Design"
        ],

        images: projectImages.citynet,

        website: null,

        details: null
    }
];


export default projects;