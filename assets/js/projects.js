const projects = [
  {
    title: "Personal Portfolio Website",
    description:
      "A modern, responsive portfolio website built to showcase projects and experience, with a focus on clean UI architecture, performance, and maintainable design patterns.",
    tags: ["HTML", "CSS ", "JavaScript", "Tailwind CSS", "UI Architecture"],
    github: "https://github.com/RavinduLayanga/portfolio",
    live: "https://ravindulayanga.dev"
  },
  {
    title: "MixCap – Multimodal Captioning System",
    description:
      "A research-driven deep learning system that generates captions by jointly learning from visual and textual inputs, focusing on multimodal feature fusion and representation learning.",
    tags: ["Python", "PyTorch", "Deep Learning", "Multimodal Models"],
    github: "https://github.com/RavinduLayanga/mixcap-multimodal-captioning",
  },
   {
    title: "MixCap Web Platform",
    description:
      "A full-stack web application that deploys a multimodal captioning model through a RESTful API, providing a user-friendly interface for model interaction and evaluation.",
    tags: ["Flask", "REST APIs", "React", "Full Stack"],
    github: "https://github.com/RavinduLayanga/mixcap-web-platform",
  },
  
    {
    title: "Skin Consultation Management System",
    description:
      "A full-stack web application designed to manage online consultations, appointments, and user roles using a structured MVC-based architecture.",
    tags: ["Full Stack", "MVC", "Database Design", "Java"],
    github: "https://github.com/RavinduLayanga/Skin-Consultation-Management-System",
  },
  {
    title: "Fuel Management System",
    description:
      "An enterprise-style management system built to manage fuel distribution records, user roles, and database-driven workflows with a focus on reliability and data consistency.",
    tags: ["Backend Development", "Databases", "CRUD", "System Design"],
    github: "https://github.com/RavinduLayanga/Fuel-Management-System",
  },
  {
    title: "Hybrid Employee Attrition Predictor",
    description:
      "A machine learning system designed to predict employee attrition using data preprocessing, feature engineering, and predictive modeling techniques.",
    tags: ["Python", "Machine Learning", "Scikit-learn", "Data Analysis"],
    github: "https://github.com/RavinduLayanga/hybrid-attrition-predictor",
  }
];


document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("projectCarousel");
  if (!carousel) return;

  projects.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card snap-start w-full md:w-[420px]";

    // Logic: Only create the Live Demo button if 'live' property exists
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
      </h3><h3 class="text-2xl font-semibold min-h-[64px] flex items-end">${project.title}</h3>
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
