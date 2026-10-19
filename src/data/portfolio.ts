import { env } from "@/config/env";
import electronicImage from "@/assets/electronic.png";
import ten11Image from "@/assets/ten11.png";
import studentImage from "@/assets/student.png";
import BookingImage from "@/assets/booking.png";
import cinemaImage from "@/assets/cinema.png";
import odooUniversityImage from "@/assets/odoo_university.png";

export const profile = {
  name: "Kim Sothearith",
  title: "Full-Stack Web Developer",
  position: "ODOO DEVELOPER INTERN",
  phone: "0968435574",
  email: env.contactEmail || "kimsothearith2007@gmail.com",
  location: "Phnom Penh, Cambodia",
  website: "https://portfolio-chi-sandy-61.vercel.app",
  tagline: "Web Developer Intern at RMA Cambodia with hands-on experience in Spring Boot, Laravel, React.js, and relational databases.",
  roles: [
    "Web Developer Intern @ RMA Cambodia",
    "Backend Developer (Spring Boot & Laravel)",
    "Full-Stack Developer (React Ts & Spring Boot Laravel)",
    "IT Student @ RUPP",
  ],
  intro:
    "Information Technology student at the Royal University of Phnom Penh and Web Developer Intern at RMA Cambodia. Experienced in Odoo ERP module development, backend engineering with Java/Spring Boot and PHP/Laravel, and modern frontend development with React, TypeScript, and Tailwind CSS. Passionate about building robust REST APIs, secure authentication systems, and scalable web solutions.",
  resume: env.resume,
  socials: {
    github: env.githubUrl || "https://github.com/Sothearith22",
  },
};

export const about = {
  bio: [
    "I am an Information Technology student at the Royal University of Phnom Penh and an Web Developer Intern at RMA Cambodia. My technical foundation spans ERP development, backend engineering, and modern full-stack web applications.",
    "At RMA Cambodia, I work on Odoo ERP module development and the University Management System. Previously, during my Web Developer Internship at KRU IT Solution, I developed authentication, authorization, and CRUD REST APIs with MySQL/PostgreSQL for a School Management System.",
    "I also completed an intensive Spring Boot course at ETEC Center, where I led the full-stack architecture of Cinematique—a cinema booking platform featuring Spring Boot 3, Spring Security JWT with rate limiting, Bakong KHQR payments, Cloudinary media management, and Docker CI/CD.",
  ],
  coreFocus:
    "Specializing in Odoo ERP customization, secure backend engineering (Spring Boot & Laravel), REST API architecture, and modern full-stack web interfaces with React & TypeScript.",
};

export interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "ERP Development",
    items: ["Odoo", "Python", "XML", "OWL", "PostgreSQL"],
  },
  {
    category: "Backend Development",
    items: ["Java", "Spring Boot", "PHP", "Laravel", "REST APIs", "Spring Security", "JWT"],
  },
  {
    category: "Frontend Development",
    items: ["React.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5", "CSS3", "Bootstrap"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL"],
  },
  {
    category: "Developer Tools",
    items: ["Git", "GitHub", "Docker", "GitHub Actions", "Postman", "Swagger / OpenAPI", "Vite"],
  },
];

export const softSkills = [
  "Problem-Solving",
  "Communication & Teamwork",
  "Adaptability & Learning Agility",
  "Willingness to Learn",
  "Time Management",
];

export const languages = [
  { name: "Khmer", level: "Native" },
  { name: "English", level: "Intermediate" },
];

export const interests = [
  "ERP Systems & Business Workflows",
  "Software Architecture & REST APIs",
  "Modern Frontend Interfaces",
  "Continuous Learning & System Security",
  "Intergrate Ai into Web Development",
];

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  details?: string;
}

export const education: EducationItem[] = [
  {
    degree: "Spring Boot Course",
    institution: "ETEC Center",
    period: "Completed — Certificate Earned",
    details:
      "Intensive practical training covering Spring Boot 3, Spring Security, RESTful APIs, JPA/Hibernate, MySQL/PostgreSQL, JWT authentication, and full-stack project development.",
  },
  {
    degree: "Bachelor of Information Technology (Year 3)",
    institution: "Royal University of Phnom Penh (RUPP)",
    period: "2025 — Present (Expected 2028)",
    details: "Core study covering software engineering, algorithms, database systems, and networking.",
  },
  {
    degree: "High School Diploma",
    institution: "Samdach Ov High School",
    period: "2021 — 2024",
  },
];

export const achievements = [
  "Web Developer Intern at RMA Cambodia working on University Management System.",
  "Completed Spring Boot Course and earned Certificate at ETEC Center.",
  "Completed Backend Development Internship at KRU IT Solution.",
  "Earned Full Stack Web Development Certificate.",
];

export const reference = {
  name: "Srin Nalen",
  role: "Team Leader",
  company: "KRU IT Solution",
  phone: "087294774",
  email: "nalensrin480@gmail.com",
};

export interface Project {
  title: string;
  image?: string;
  description: string;
  stack: string[];
  category: "Full-Stack" | "Frontend" | "Backend" | "ERP";
  status?: string;
  github?: string;
  githubFrontend?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    title: "Cinema Management System (Cinematique)",
    image: cinemaImage,
    description:
      "A completed team project built after a Spring Boot course at ETEC Center. Integrates a React and TypeScript frontend with Spring Boot REST APIs, PostgreSQL, Cloudinary image hosting, Google login, and Bakong KHQR payments. Includes API rate limiting, Docker-based development, automated GitHub Actions workflows, and Swagger documentation.",
    stack: [
      "Spring Boot",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Cloudinary",
      "Google Auth",
      "Bakong KHQR",
      "Docker",
      "GitHub Actions",
      "Swagger",
    ],
    category: "Full-Stack",
    status: "Completed Team Project",
    github: "https://github.com/Sothearith22/cenima_final_project",
    githubFrontend: "https://github.com/Sothearith22/Cinema-Project",
  },
  {
    title: "Odoo University Management System",
    image: odooUniversityImage,
    description:
      "An ERP-based University Management System built and customized on the Odoo platform. Implements academic workflows, student and faculty management, relational PostgreSQL database design, XML view layouts, and custom business logic.",
    stack: ["Odoo", "Python", "XML", "PostgreSQL", "ERP Architecture"],
    category: "ERP",
    status: "Active / In Progress @ RMA Cambodia",
  },
  {
    title: "Hotel Management System",
    image: BookingImage,
    description:
      "A full-stack room booking management system for handling room reservations and user management. Features responsive user interfaces integrated with backend services, authentication, database design, and API validation.",
    stack: ["React.js", "Laravel", "PostgreSQL", "Tailwind CSS"],
    category: "Full-Stack",
    status: "In Progress / Active",
  },
  {
    title: "Student Management System",
    image: studentImage,
    description:
      "A full-stack Student Management System for managing student records, courses, and academic information. Integrated MySQL database for secure storage, retrieval of student data, and role-based access control.",
    stack: ["React.js", "Laravel", "MySQL", "Tailwind CSS"],
    category: "Full-Stack",
    github: "https://github.com/Sothearith22/System-Management-Student",
  },
  {
    title: "ELECTRONIC STORE",
    image: electronicImage,
    description:
      "A high-performance modern e-commerce storefront showcasing tech hardware, laptops, and mobile devices. Built with modular React components, clean responsive layouts, and modern UI transitions.",
    stack: ["React.js", "Tailwind CSS", "Vercel"],
    category: "Frontend",
    github: "https://github.com/Sothearith22/Electronic-Shop",
    demo: "https://electronic-shop-one-iota.vercel.app/",
  },
  {
    title: "TEN ELEVEN CLONE",
    image: ten11Image,
    description:
      "A high-fidelity digital storefront recreation of Cambodia's leading fashion brand. Focuses on translating complex retail layouts into modular React components with mobile-first responsiveness.",
    stack: ["React", "Tailwind CSS", "Vercel"],
    category: "Frontend",
    github: "https://github.com/Sothearith22/Project_TEN11",
    demo: "https://project-ten-11.vercel.app/",
  },
];

export interface ExperienceItem {
  role: string;
  company: string;
  project?: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
  isCurrent?: boolean;
}

export const experience: ExperienceItem[] = [
  {
    role: "Web Developer Intern",
    company: "RMA Cambodia",
    project: "University Management System",
    period: "26 August 2026 — Present",
    isCurrent: true,
    description:
      "Working as an Web Developer Intern at RMA Cambodia, focusing on ERP development, customization, and business logic implementation for the University Management System.",
    highlights: [
      "Developing and customizing Odoo modules for the University Management System.",
      "Working with Odoo's Python backend, XML architecture, and PostgreSQL database.",
      "Collaborating with the team on ERP requirements, workflows, and module implementation.",
    ],
    technologies: ["Odoo", "Python", "XML", "PostgreSQL", "Git"],
  },
  {
    role: "Backend Developer Internship",
    company: "KRU IT Solution",
    project: "School Management System",
    period: "Feb 2026 — May 2026",
    isCurrent: false,
    description:
      "Completed a Backend Developer Internship at KRU IT Solution on the School Management System, gaining practical production experience in developing REST APIs, database schemas, and team collaboration.",
    highlights: [
      "Developed authentication, authorization, and CRUD APIs.",
      "Practiced Git/GitHub workflow and team collaboration.",
      "Improved API validation, error handling, and secure authentication.",
    ],
    technologies: ["PHP", "Laravel", "PostgreSQL", "REST APIs", "Git", "GitHub", "Postman"],
  },
];

export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    title: "Building Custom Modules & Relational Models in Odoo 19",
    excerpt:
      "A hands-on guide to structuring custom Odoo ERP modules, defining PostgreSQL models, creating XML tree and form views, and implementing business logic.",
    date: "October 2026",
    readTime: "5 min read",
    category: "ERP & Odoo",
    tags: ["Odoo", "Python", "PostgreSQL", "XML"],
  },
  {
    title: "Securing Spring Boot 3 REST APIs with JWT & Rate Limiting",
    excerpt:
      "Deep dive into implementing stateless Spring Security 6 authentication with JWT tokens and bucket-based rate limiting to protect endpoints against brute-force attacks.",
    date: "September 2026",
    readTime: "7 min read",
    category: "Backend Engineering",
    tags: ["Spring Boot", "Java", "Security", "REST API"],
  },
  {
    title: "Integrating Bakong KHQR Payments in Modern Web Applications",
    excerpt:
      "How to implement Cambodia's national standard Bakong KHQR payment workflows with real-time QR generation and webhook verification in full-stack web applications.",
    date: "August 2026",
    readTime: "6 min read",
    category: "Full-Stack",
    tags: ["Fintech", "Bakong KHQR", "TypeScript", "React"],
  },
];
