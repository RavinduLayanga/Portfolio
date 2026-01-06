document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     ACTIVE NAV LINK ON SCROLL
  ================================ */
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  function setActiveLink() {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);
  window.addEventListener("load", setActiveLink);


  /* ===============================
     MOBILE MENU
  ================================ */
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  menuBtn?.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  mobileMenu?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });


  /* ===============================
     RESPONSIVE PROJECT CAROUSEL
  ================================ */
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

    const getPageCount = () =>
      Math.ceil(getCards().length / getCardsPerView());

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
        dot.classList.toggle("active", i === currentPage)
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


  /* ===============================
     REVEAL ON SCROLL
  ================================ */
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));


  /* ===============================
     TYPEWRITER EFFECT
  ================================ */
  const textElement = document.getElementById("typewriter");

  if (textElement) {
    const phrases = [
      "Software Engineer",
      "Fresh Graduate",
      "Full Stack Developer",
      "React & Java Enthusiast",
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
     SCROLL TO TOP BUTTON
  ================================ */
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    if (!scrollTopBtn) return;

    scrollTopBtn.classList.toggle("opacity-100", window.scrollY > 500);
    scrollTopBtn.classList.toggle("opacity-0", window.scrollY <= 500);
    scrollTopBtn.classList.toggle("invisible", window.scrollY <= 500);
    scrollTopBtn.classList.toggle("translate-y-0", window.scrollY > 500);
    scrollTopBtn.classList.toggle("translate-y-10", window.scrollY <= 500);
  });

  scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

});
