import { env } from "@/config/env";
import electronicImage from "@/assets/electronic.png";
import ten11Image from "@/assets/ten11.png";
import studentImage from "@/assets/student.png";
import BookingImage from "@/assets/booking.png";

export const profile = {
  name: "Kim Sothearith",
  title: "Junior Web Developer",
  position: "JUNIOR WEB DEVELOPER",
  phone: "0968435574",
  email: env.contactEmail || "kimsothearith2007@gmail.com",
  location: "Phnom Penh, Cambodia",
  website: "https://portfolio-chi-sandy-61.vercel.app",
  tagline: "Junior Web Developer specializing in PHP/Laravel, React.js, and RESTful API architecture.",
  roles: [
    "Junior Web Developer",
    "Backend Developer (Laravel & Spring Boot)",
    "Full-Stack Developer (React & PHP/Laravel)",
    "IT Student @ RUPP",
  ],
  intro:
    "Motivated third-year Information Technology student at the Royal University of Phnom Penh with hands-on experience in PHP, Laravel, React.js, JavaScript, MySQL, and PostgreSQL. Completed a Backend Developer internship where I gained experience building REST APIs, working with databases, and collaborating in a development team. Seeking a Web Developer Internship or Junior Developer position to continue developing my technical and professional skills.",
  resume: env.resume,
  socials: {
    github: env.githubUrl || "https://github.com/Sothearith22",
  },
};

export const about = {
  bio: [
    "I am a third-year Information Technology student at the Royal University of Phnom Penh and an aspiring Junior Web Developer. I have hands-on experience in web application development using PHP, Laravel, React.js, JavaScript, Tailwind CSS, Bootstrap, MySQL, and PostgreSQL.",
    "During my Backend Developer Internship at KRU IT Solution, I worked on the School Management System, developing authentication, authorization, and CRUD APIs, improving API validation and error handling, and collaborating on relational database design with Git workflows.",
    "I am passionate about building scalable, secure backend systems, intuitive frontends, and continuously expanding my technical knowledge in modern frameworks and microservices architecture.",
  ],
  coreFocus:
    "Specializing in secure RESTful API development, database architecture (MySQL/PostgreSQL), and modern full-stack web applications with Laravel and React.js.",
};

export interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Programming",
    items: ["PHP", "JavaScript", "Java", "C++"],
  },
  {
    category: "Front-End",
    items: ["React.js", "Tailwind CSS", "Bootstrap", "HTML", "CSS", "TypeScript"],
  },
  {
    category: "Back-End",
    items: ["PHP", "Laravel", "Java", "Spring Boot", "REST APIs"],
  },
  {
    category: "Database",
    items: ["MySQL", "PostgreSQL"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Docker", "Postman", "Vite"],
  },
];

export const softSkills = [
  "Problem-Solving",
  "Communication & Teamwork",
  "Willingness to Learn",
  "Adaptability & Learning Agility",
  "Time Management",
];

export const languages = [
  { name: "Khmer", level: "Native" },
  { name: "English", level: "Intermediate" },
];

export const interests = [
  "Programming & Software Development",
  "Learning New Technologies",
  "Continuous Improvement",
  "Exploring Microservices Architecture",
];

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  details?: string;
}

export const education: EducationItem[] = [
  {
    degree: "Bachelor of Information Technology (Year 2, Semester 2)",
    institution: "Royal University of Phnom Penh (RUPP)",
    period: "2025 — Present",
    details: "Core study covering software engineering, algorithms, database systems, and networking.",
  },
  {
    degree: "Full-Stack Development Course Studies",
    institution: "Course Studies",
    period: "2025 — Present",
    details: "Hands-on project development with React.js, Laravel, REST APIs, and relational databases.",
  },
  {
    degree: "High School Diploma",
    institution: "Samdach Ov High School",
    period: "2021 — 2024",
  },
];

export const achievements = [
  "Completed Backend Development Internship at KRU IT Solution.",
  "Earned a Full Stack Web Development Certificate.",
  "Consistently improve coding skills through personal projects and online learning platforms.",
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
  image: string;
  description: string;
  stack: string[];
  category: "Full-Stack" | "Frontend" | "Backend";
  status?: string;
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    title: "Room Booking Management System",
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
}

export const experience: ExperienceItem[] = [
  {
    role: "Backend Developer Internship",
    company: "KRU IT Solution",
    project: "School Management System",
    period: "Feb 2026 — May 2026",
    description:
      "Completed a Backend Developer Internship at KRU IT Solution on the School Management System, gaining practical production experience in developing REST APIs, database schemas, and team collaboration.",
    highlights: [
      "Developed authentication, authorization, and CRUD APIs.",
      "Practiced Git/GitHub workflow and team collaboration.",
      "Improved API validation error handling, and secure authentication.",
      "Collaborated with the team on database design and API development.",
    ],
    technologies: ["PHP", "Laravel", "MySQL", "PostgreSQL", "REST APIs", "Git", "Postman"],
  },
];
