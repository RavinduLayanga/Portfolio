document.addEventListener("DOMContentLoaded", () => {
  /* ===============================
     1. PARTICLES BACKGROUND 
  ================================ */
  if (window.tsParticles) {
    tsParticles.load("tsparticles", {
      fpsLimit: 60,
      background: {
        color: "#000000",
      },
      particles: {
        number: {
          value: 60,
          density: { enable: true, area: 800 },
        },
        color: {
          value: ["#6c63ff", "#00e5ff", "#ffffff", "#a78bfa", "#1e40af"],
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.8,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: { min: 3, max: 5 },
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.3,
            sync: false,
          },
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: "none",
          random: true,
          straight: false,
          outModes: "out",
        },
        links: { enable: false },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "bubble",
          },
          onClick: {
            enable: true,
            mode: "push",
          },
        },
        modes: {
          bubble: {
            distance: 200,
            size: 7,
            duration: 2,
            opacity: 1,
          },
        },
      },
      detectRetina: true,
    });
  }

  /* ===============================
     2. INITIALIZE LENIS
  ================================ */
  const lenis = new Lenis({
    autoRaf: true,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  /* ===============================
    32. CACHE POSITIONS (Fixed Offset)
  ================================ */
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  let sectionPositions = [];

  function cacheSectionPositions() {
    sectionPositions = Array.from(sections).map((section) => ({
      id: section.getAttribute("id"),
      top: section.offsetTop - 10,
      bottom: section.offsetTop + section.offsetHeight - 10,
    }));
  }

  cacheSectionPositions();
  window.addEventListener("resize", cacheSectionPositions);

  /* ===============================
     4. ACTIVE LINK LOGIC
  ================================ */
  let isClickScrolling = false;

  function setActiveLink() {
    if (isClickScrolling) return;

    const scrollY = window.scrollY;
    const triggerPoint = scrollY + 100;

    let currentId = "";

    for (const section of sectionPositions) {
      if (triggerPoint >= section.top && triggerPoint < section.bottom) {
        currentId = section.id;
      }
    }

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentId) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);

  /* ===============================
     5. CLICK HANDLER 
  ================================ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      if (!targetId) return;

      const cachedSection = sectionPositions.find((s) => s.id === targetId);
      if (!cachedSection) return;

      isClickScrolling = true;

      navLinks.forEach((link) => link.classList.remove("active"));
      this.classList.add("active");

      const distance = Math.abs(cachedSection.top - window.scrollY);
      let duration = distance < 1000 ? 0.6 : 1.0;

      lenis.scrollTo(cachedSection.top, {
        offset: 0,
        duration: duration,
        lock: false,
        force: true,
        onComplete: () => {
          isClickScrolling = false;
        },
      });
    });
  });

  /* ===============================
     6. SCROLL TO TOP & UI LOGIC
  ================================ */
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    if (!scrollTopBtn) return;
    const show = window.scrollY > 500;
    scrollTopBtn.classList.toggle("opacity-100", show);
    scrollTopBtn.classList.toggle("opacity-0", !show);
    scrollTopBtn.classList.toggle("invisible", !show);
    scrollTopBtn.classList.toggle("translate-y-0", show);
    scrollTopBtn.classList.toggle("translate-y-10", !show);
  });

  scrollTopBtn?.addEventListener("click", () => {
    lenis.scrollTo(0, { duration: 1.5 });
  });

  /* ===============================
     7. Menu, Carousel, Typewriter
  ================================ */
  // --- MOBILE MENU ---
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  menuBtn?.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });

  // --- PROJECT CAROUSEL ---
  const carousel = document.getElementById("projectCarousel");
  const dotsContainer = document.getElementById("projectDots");

  if (carousel && dotsContainer) {
    let currentPage = 0;
    let autoScrollInterval;
    let isHovering = false;

    const getCards = () => Array.from(carousel.children);
    const isMobile = () => window.innerWidth < 768;
    const getCardsPerView = () => (isMobile() ? 1 : 2);

    function getScrollAmount() {
      const cards = getCards();
      if (!cards.length) return 0;
      const style = window.getComputedStyle(carousel);
      const gap = parseInt(style.gap || 0, 10);
      return (cards[0].offsetWidth + gap) * getCardsPerView();
    }

    const getPageCount = () => Math.ceil(getCards().length / getCardsPerView());

    function createDots() {
      dotsContainer.innerHTML = "";
      if (isMobile()) return;
      const pageCount = getPageCount();
      if (pageCount <= 1) return;

      for (let i = 0; i < pageCount; i++) {
        const dot = document.createElement("div");
        dot.className = "project-dot";
        if (i === currentPage) dot.classList.add("active");
        dot.addEventListener("click", () => {
          goToPage(i);
          resetAutoScroll();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateDots() {
      if (isMobile()) return;
      [...dotsContainer.children].forEach((dot, i) =>
        dot.classList.toggle("active", i === currentPage),
      );
    }

    function goToPage(page) {
      if (isMobile()) return;
      carousel.scrollTo({
        left: getScrollAmount() * page,
        behavior: "smooth",
      });
      currentPage = page;
      updateDots();
    }

    function autoScroll() {
      const pageCount = getPageCount();
      if (pageCount <= 1) return;
      currentPage = (currentPage + 1) % pageCount;
      goToPage(currentPage);
    }

    function resetAutoScroll() {
      clearInterval(autoScrollInterval);
      if (!isHovering && !isMobile()) {
        autoScrollInterval = setInterval(autoScroll, 5000);
      }
    }

    carousel.addEventListener("mouseenter", () => {
      isHovering = true;
      clearInterval(autoScrollInterval);
    });

    carousel.addEventListener("mouseleave", () => {
      isHovering = false;
      resetAutoScroll();
    });

    window.addEventListener("resize", () => {
      currentPage = 0;
      createDots();
      goToPage(0);
      resetAutoScroll();
      cacheSectionPositions();
    });

    function initCarousel() {
      createDots();
      resetAutoScroll();
    }

    document.addEventListener("projects:loaded", initCarousel);
    if (window.__PROJECTS_LOADED__) {
      initCarousel();
    }
  }

  // --- REVEAL ON SCROLL ---
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  reveals.forEach((el) => observer.observe(el));

  // --- TYPEWRITER EFFECT ---
  const textElement = document.getElementById("typewriter");
  if (textElement) {
    const phrases = [
      "Full Stack Software Engineer",
      "Backend Developer",
      "Software Engineer",
      "AI & ML Enthusiast",
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex--);
        typeSpeed = 50;
      } else {
        textElement.textContent = currentPhrase.substring(0, ++charIndex);
        typeSpeed = 100;
      }
      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
      }
      setTimeout(type, typeSpeed);
    }
    type();
  }

  /* ===============================
     8. MOBILE NAV 
  ================================ */
  const mobileNav = document.getElementById("mobileNav");
  let lastScrollY = window.scrollY;

  if (mobileNav) {
    // 1. Reset transform to ensure it sits correctly on load
    mobileNav.style.transform = "translateY(0)";

    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;

      // A. Always show at the very top
      if (currentScrollY < 10) {
        mobileNav.style.transform = "translateY(0)";
        lastScrollY = currentScrollY;
        return;
      }

      // B. Scroll Direction Check
      if (currentScrollY > lastScrollY) {
        mobileNav.style.transform = "translateY(-200%)";

        // Close menu if open
        const mobileMenu = document.getElementById("mobileMenu");
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
        }
      } else {
        // SCROLLING UP -> SHOW (
        mobileNav.style.transform = "translateY(0)";
      }

      lastScrollY = currentScrollY;
    });
  }
});
