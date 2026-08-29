const projects = [
  {
    title: "LSF Train Seat Booking System",
    description:
      "A full-stack train seat reservation system built to handle concurrent booking requests safely. Implemented a Java REST API with Javalin and JDBC, PostgreSQL transactions, row-level locking, and database-driven seat availability to prevent double booking.",
    tags: [
      "Java",
      "Javalin",
      "React",
      "PostgreSQL",
      "JDBC",
      "REST API",
      "Transactions",
      "Concurrency",
      "Docker",
    ],
    github: "https://github.com/RavinduLayanga/segment-seat-booking-system",
  },
  {
    title: "SmartNotes AI",
    description:
      "A full-stack AI-powered note-taking application built with Next.js 16, featuring Google authentication, persistent note storage with Neon PostgreSQL, and AI-powered note summarization. Deployed as a production web application on Vercel.",
    tags: [
      "Next.js 16",
      "Auth.js",
      "Neon PostgreSQL",
      "Tailwind CSS",
      "AI",
      "Vercel",
    ],
    github: "https://github.com/RavinduLayanga/SmartNotes-Ai",
    live: "https://smart-notes-ai-gold.vercel.app/",
  },
  {
    title: "MixCap – Multimodal Captioning System",
    description:
      "A research-driven multimodal deep learning system that generates captions by jointly learning from visual and textual inputs. The project explores multimodal feature fusion and representation learning using PyTorch.",
    tags: ["Python", "PyTorch", "Deep Learning", "Multimodal Models"],
    github: "https://github.com/RavinduLayanga/mixcap-multimodal-captioning",
  },
  {
    title: "MixCap Web Platform",
    description:
      "The web application component of the MixCap project, providing a user-friendly interface for interacting with and evaluating the multimodal captioning model through a Flask REST API and React frontend.",
    tags: ["React", "Flask", "REST API", "Python", "Full Stack"],
    github: "https://github.com/RavinduLayanga/mixcap-web-platform",
  },
  {
    title: "Skin Consultation Management System",
    description:
      "A full-stack web application for managing online consultations, appointments, and user roles, developed with a structured application architecture and database-driven functionality.",
    tags: ["Full Stack", "Java", "Database Design", "MVC"],
    github:
      "https://github.com/RavinduLayanga/Skin-Consultation-Management-System",
  },
  {
    title: "MediTrack – Pharmacy Management System",
    description:
      "A Java and MySQL-based pharmacy management application designed to support pharmaceutical inventory management, sales processing, and user authentication.",
    tags: ["Java", "MySQL", "OOP", "CRUD"],
    github: "https://github.com/RavinduLayanga/MediTrack",
  },
  {
    title: "Hybrid Employee Attrition Predictor",
    description:
      "A machine learning system for predicting employee attrition using data preprocessing, feature engineering, class-imbalance handling, and predictive modeling techniques.",
    tags: ["Python", "Scikit-learn", "Machine Learning", "Data Analysis"],
    github: "https://github.com/RavinduLayanga/hybrid-attrition-predictor",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("projectCarousel");
  if (!carousel) return;

  projects.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card snap-start w-full md:w-[420px]";

    //Only create the Live Demo button if 'live' property exists
    const liveButtonHtml = project.live
      ? `
        <a href="${project.live}" target="_blank"
           class="project-link flex items-center gap-2 group-hover:text-primary transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          <span>Live Demo</span>
        </a>
      `
      : "";

    card.innerHTML = `
      <h3 class="text-2xl font-semibold min-h-[64px] flex items-end">${project.title}</h3>
      <p class="mt-4 text-gray-300 text-sm leading-relaxed">${project.description}</p>

      <div class="mt-4 flex flex-wrap gap-2">
        ${project.tags
          .map((t) => `<span class="project-tag">${t}</span>`)
          .join("")}
      </div>

      <div class="mt-auto flex w-full justify-center gap-6 pt-6">
        <a href="${project.github}" target="_blank"
           class="project-link flex items-center gap-2 group-hover:text-primary transition-colors">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.95.57.1.78-.25.78-.55v-2.02c-3.2.7-3.88-1.38-3.88-1.38-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 015.8 0c2.2-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.4-5.28 5.69.42.36.79 1.07.79 2.16v3.2c0 .3.21.66.79.55a11.53 11.53 0 007.86-10.95C23.5 5.74 18.27.5 12 .5z"/>
          </svg>
          <span>View Code</span>
        </a>

        ${liveButtonHtml}
      </div>
    `;

    carousel.appendChild(card);
  });

  window.__PROJECTS_LOADED__ = true;
  document.dispatchEvent(new Event("projects:loaded"));
});
