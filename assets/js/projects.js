const projects = [
  {
    title: "Skin Consultation Management System",
    description:
      "A full-stack system designed to manage patient records, consultations, and appointments with a clean separation of concerns.",
    tags: ["Java", "Spring Boot", "MySQL", "MVC"],
    github: "https://github.com/yourusername/skin-consultation-system",
  },
  {
    title: "Tea Collection Management System",
    description:
      "A web-based application to track daily tea collection records and automatically calculate monthly payments for suppliers.",
    tags: ["React", "Node.js", "REST API", "SQL"],
    github: "https://github.com/yourusername/tea-collection-system",
  },
  {
    title: "Skin Consultation Management System 2",
    description: "Extended version with improved architecture and validations.",
    tags: ["Java", "Spring Boot", "MySQL"],
    github: "https://github.com/yourusername/skin-consultation-system",
  },
  {
    title: "Skin Consultation Management System 3",
    description:
      "A full-stack system designed to manage patient records, consultations, and appointments with a clean separation of concerns.",
    tags: ["Java", "Spring Boot", "MySQL", "MVC"],
    github: "https://github.com/yourusername/skin-consultation-system",
  },
  {
    title: "Tea Collection Management System 2",
    description:
      "A web-based application to track daily tea collection records and automatically calculate monthly payments for suppliers.",
    tags: ["React", "Node.js", "REST API", "SQL"],
    github: "https://github.com/yourusername/tea-collection-system",
  },
  {
    title: "Skin Consultation Management System 4",
    description: "Extended version with improved architecture and validations.",
    tags: ["Java", "Spring Boot", "MySQL"],
    github: "https://github.com/yourusername/skin-consultation-system",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("projectCarousel");
  if (!carousel) return;

  projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card snap-start w-full md:w-[420px]";

    card.innerHTML = `
      <h3 class="text-2xl font-semibold">${project.title}</h3>
      <p class="mt-4 text-gray-300">${project.description}</p>

      <div class="mt-4 flex flex-wrap gap-2">
        ${project.tags.map(t => `<span class="project-tag">${t}</span>`).join("")}
      </div>

      <div class="mt-auto flex w-full justify-center">
        <a href="${project.github}" target="_blank"
           class="project-link flex items-center gap-2">

          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.95.57.1.78-.25.78-.55v-2.02c-3.2.7-3.88-1.38-3.88-1.38-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 015.8 0c2.2-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.4-5.28 5.69.42.36.79 1.07.79 2.16v3.2c0 .3.21.66.79.55a11.53 11.53 0 007.86-10.95C23.5 5.74 18.27.5 12 .5z"/>
          </svg>

          <span>View Code</span>
        </a>
      </div>
    `;

    carousel.appendChild(card);
  });


  window.__PROJECTS_LOADED__ = true;
  document.dispatchEvent(new Event("projects:loaded"));
});
