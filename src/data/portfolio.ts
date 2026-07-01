import { env } from "@/config/env";
import electronicImage from "@/assets/electronic.png";
import ten11Image from "@/assets/ten11.png";
import studentImage from "@/assets/student.png";
export const profile = {
  name: "Sothearith Kim",
  title: "Full-Stack Developer",
  tagline: "",
  intro:
    "Motivated Information Technology student at the Royal University of Phnom Penh with experience in web application development using Java, PHP/Laravel, JavaScript, React.js, and SQL databases. Strong understanding of object-oriented programming, RESTful APIs, and database design. Eager to apply technical skills and continue learning as a Junior Web Developer or Backend Developer.",
  location: "Phnom Penh",
  email: env.contactEmail,
  socials: {
    github: env.githubUrl,
  },
};

export const about = {
  bio: [
    "I am a second-year Semester 2 Information Technology student at the Royal University of Phnom Penh and an aspiring Full-Stack Developer. I have hands-on experience in web development using HTML, CSS, JavaScript, React.js, Tailwind CSS, PHP/Laravel, MySQL, and PostgreSQL.",
    "I completed a Backend Development Internship at KRU IT Solution, where I gained practical experience in building and maintaining web applications, working with databases, and collaborating in a development environment.",
    "I am passionate about learning modern technologies, writing clean and maintainable code, and continuously improving my skills in both frontend and backend development. My goal is to build scalable and user-friendly applications while growing as a professional software developer.",
  ],
};

export const skills: { category: string; items: string[] }[] = [
  { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Vite"] },
  { category: "Backend", items: ["Laravel", "Spring Boot", "PostgreSQL","MySQL", "REST API"] },
  { category: "Tool", items: ["Git", "Docker", "Github", "Figma", "Postman"] },
];

export interface Project {
  title: string;
  image: string;
  description: string;
  stack: string[];
  github?: string;
  demo?: string;
}

export const projects: Project[] = [

  {
    title: "ElECTRONIC STORE",
    image: electronicImage,
    description: "At EIECTRNIC, we bridge the gap between high-end innovation and everyday accessibility. Whether you are a professional looking for the power of an Apple iPad Pro M4, a gamer seeking a high-refresh-rate laptop, we’ve curated a selection that prioritizes performance and style.",
    stack: ["React.js", "Tailwind CSS", "Vercel"],
    github: "https://github.com/Sothearith22/Electronic-Shop",
    demo: "https://electronic-shop-one-iota.vercel.app/",
  },
  {
    title: "TEN ELEVEN ClONE",
    image: ten11Image,
    description: "A high-fidelity digital storefront recreation of Cambodia's leading fashion brand. This project focuses on translating complex retail layouts into modular React components with a heavy emphasis on mobile-first responsiveness and UI performance.",
    stack: ["React", "Tailwind CSS", "Vercel"],
    github: "https://github.com/Sothearith22/Project_TEN11",
    demo: "https://project-ten-11.vercel.app/"
  },
  {
    title: "Student Management System",
    image: studentImage,
    description: "A comprehensive Full-Stack ERP solution for educational institutions. This platform features a secure Role-Based Access Control (RBAC) system allowing Admins to manage academic records, real-time attendance tracking, and automated reporting.",
    stack: ["React.js", "Laravel", "Tailwind", "MYSQL"],
    github: "https://github.com/Sothearith22/System-Management-Student",
    // demo: "",
  },
    {
    title: "Booking System Full-Stack Application",
    image: studentImage,
    description: "A comprehensive Full-Stack ERP solution for educational institutions. This platform features a secure Role-Based Access Control (RBAC) system allowing Admins to manage academic records, real-time attendance tracking, and automated reporting.",
    stack: ["React.js", "Laravel", "Tailwind", "MYSQL"],
    // github: "https://github.com/Sothearith22/S",
    // demo: "",
  },
];

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
}

export const experience: ExperienceItem[] = [
  {
    role: "Backend Developer",
    company: "Kru IT Solution",
    period: "Feb - May",
    description: "Completed a Backend Development Internship at KRU IT Solution, where I gained practical experience in developing and maintaining web applications. Worked with PHP/Laravel, databases, and RESTful APIs while learning software development best practices, version control with Git, and collaborative development workflows. Strengthened problem-solving skills and gained hands-on experience in building reliable and maintainable backend systems.",
  },
  // {
  //   role: "Full-Stack Engineer",
  //   company: "Beacon Software",
  //   period: "2020 - 2023",
  //   description: "Built dashboards, billing, and a public API serving 50M requests/month.",
  // },
  // {
  //   role: "Frontend Developer",
  //   company: "Studio Quanta",
  //   period: "2018 - 2020",
  //   description: "Crafted marketing sites and interactive experiences for SaaS clients.",
  // },
];
