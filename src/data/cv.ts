export interface Experience {
    company: string;
    role: string;
    startDate: string;
    endDate: string | "Present";
    description?: string[];
    location: string;
    status?: "current" | "upcoming";
}

export interface SkillCategory {
    name: string;
    skills: string[];
}

export interface Education {
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
}

export const cvData = {
    personal: {
        name: "Gunnar Hollander",
        role: "Forward Deployed Engineer",
        roleStartDate: "December 2026",
        summary: "Forward Deployed Engineer at Sanitas, applying over a decade of software engineering experience in Swiss banking and healthcare. I work closely with users and stakeholders to turn business needs into shipped software solutions.",
        email: "contact@hollander.one",
        location: "Zürich, Switzerland",
        languages: ["German (native)", "Dutch (native)", "English (fluent)"]
    },
    experience: [
        {
            company: "Sanitas Krankenversicherung",
            role: "Forward Deployed Engineer",
            startDate: "Dec 2026",
            endDate: "Present",
            location: "Zürich",
            status: "current",
            description: [
                "Working closely with users and stakeholders to turn business needs into shipped software solutions"
            ]
        },
        {
            company: "Sanitas Krankenversicherung",
            role: "Lead Software Engineer",
            startDate: "Jan 2024",
            endDate: "Nov 2026",
            location: "Zürich",
            description: [
                "Setting up and delivering Offer & Application projects in collaboration with business units",
                "Sharing and improving AI tooling, solutions, and engineering pipelines"
            ]
        },
        {
            company: "CLEO AG / nu.education",
            role: "Lead / Senior Software Engineer",
            startDate: "Oct 2022",
            endDate: "Dec 2023",
            location: "Zürich",
            description: [
                "Modelling of data structure and business processes",
                "Feature planning in cooperation with product owners",
                "Product responsibility",
                "Design, implementation and architecture of microservices with Spring Boot, Go and GraphQL",
                "Refactoring and performance optimization of existing microservices",
                "Contact person for backend-topics",
                "Reworking of authentication and authorization with Keycloak via Spring Security",
                "Onboarding and coaching of new developers",
                "Ensuring clean code principles",
                "Incident management",
                "Setting up and configuring Kubernetes clusters in Jelastic"
            ]
        },
        {
            company: "Health Info Net (HIN) AG / AD Swiss Net AG",
            role: "Senior Software Engineer",
            startDate: "Apr 2021",
            endDate: "Sep 2022",
            location: "Wallisellen",
            description: [
                "Developing COVID vaccination reporting and COVID certificate service “AD Swiss Covid Impfen”",
                "Technical contact person for 3rd party systems",
                "Product and server-responsibility",
                "Supporting requirements engineer and project lead with application planning and risk assessments",
                "Integration of SAML and OAuth authentication",
                "Supporting and onboarding external developers",
                "3rd level support"
            ]
        },
        {
            company: "Health Info Net (HIN) AG / AD Swiss Net AG",
            role: "Software Engineer",
            startDate: "Sep 2019",
            endDate: "Mar 2021",
            location: "Wallisellen"
        },
        {
            company: "ETH Zürich",
            role: "Software Engineer",
            startDate: "Apr 2017",
            endDate: "Aug 2019",
            location: "Zürich"
        },
        {
            company: "SapientNitro",
            role: "Quality Assurance Associate",
            startDate: "Apr 2015",
            endDate: "Mar 2017",
            location: "Zürich"
        },
        {
            company: "UBS AG",
            role: "Junior Software Engineer",
            startDate: "Oct 2013",
            endDate: "Mar 2015",
            location: "Zürich"
        },
        {
            company: "UBS AG",
            role: "Internship Software Engineer",
            startDate: "Aug 2012",
            endDate: "Sep 2013",
            location: "Zürich"
        }
    ] as Experience[],
    skills: [
        {
            name: "Programming Languages",
            skills: ["Java", "SQL", "HTML5", "CSS", "XML", "JSON", "JavaScript", "PHP", "Go", "GraphQL"]
        },
        {
            name: "Frameworks & Architectures",
            skills: ["Spring Boot", "Hibernate", "OpenSAML", "Bootstrap", "Swagger", "SOAP", "jQuery", "JUnit", "Astro", "TailwindCSS"]
        },
        {
            name: "Tools & Platforms",
            skills: ["IntelliJ", "Git", "Google Cloud", "Docker", "Kubernetes", "Apache Tomcat", "Ubuntu Server", "MariaDB", "MySQL", "Keycloak"]
        },
        {
            name: "AI & Coding Assistants",
            skills: ["Cline", "Roo Code", "Kilo Code", "Antigravity", "Hermes", "Claude", "Codex", "Opencode", "Pi", "Kimi Code", "LiteLLM", "llama.cpp"]
        }
    ] as SkillCategory[],
    education: [
        {
            school: "Kantonsschule Enge, Zürich",
            degree: "Fähigkeitszeugnis (Federal VET Diploma), Informatiker EFZ",
            startDate: "2012",
            endDate: "2013"
        },
        {
            school: "Kantonsschule Enge, Zürich",
            degree: "Berufsmatura (Federal Vocational Baccalaureate), Kaufmännisch",
            startDate: "2009",
            endDate: "2012"
        }
    ]
};
