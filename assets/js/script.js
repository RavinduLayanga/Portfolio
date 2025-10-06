
$(document).ready(function () {
 
  $(window).on("scroll", function () {
    if (this.scrollY > 20) $(".navbar").addClass("sticky");
    else $(".navbar").removeClass("sticky");

    if (this.scrollY > 500) $(".scroll-up-btn").addClass("show");
    else $(".scroll-up-btn").removeClass("show");
  });

  $(".scroll-up-btn").on("click", function () {
    $("html").animate({ scrollTop: 0 });
    $("html").css("scrollBehavior", "auto");
  });

  $(".navbar .menu li a").on("click", function () {
    $("html").css("scrollBehavior", "smooth");
  });

  $(".menu-btn").on("click", function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });

  /* ---------- Typed text ---------- */
  function startTyping(roles) {
    const list = Array.isArray(roles) && roles.length ? roles
      : ["Software Engineer","Backend Developer","Frontend Developer"];
    new Typed(".typing", { strings: list, typeSpeed: 100, backSpeed: 60, loop: true });
    new Typed(".typing-2", { strings: list, typeSpeed: 100, backSpeed: 60, loop: true });
  }

  /* ---------- Constants ---------- */
  const GH_USER = "RavinduLayanga";
  const LOCAL_JSON = "assets/data/portfolio.json";
  const GH_JSON = "assets/data/github_repos.json";
  const MAX_REPOS = 10;
  const $carousel = $("#github-carousel");
  let owlInitialized = false;

  /* ---------- Helpers ---------- */
  const truncate = (txt, n) => !txt ? "" : txt.length > n ? txt.slice(0, n - 1) + "…" : txt;
  const displayName = (n) => (n || "").replace(/[_-]+/g, " ").trim();
  const repoImage = (owner, name) => `https://opengraph.githubassets.com/1/${owner}/${name}`;

  function gradientPlaceholder(title) {
    const palettes = [
      ["#ff5858","#f09819"],["#00c6ff","#0072ff"],["#8E2DE2","#4A00E0"],
      ["#56ab2f","#a8e063"],["#f953c6","#b91d73"],["#11998e","#38ef7d"],
      ["#fc466b","#3f5efb"],["#ee0979","#ff6a00"]
    ];
    const i = Math.abs((title||"").split("").reduce((a,c)=>(a<<5)-a+c.charCodeAt(0),0)) % palettes.length;
    const [c1,c2] = palettes[i];
    const t = (title||"").replace(/</g,"&lt;").slice(0,36);
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630'>
      <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='${c1}'/><stop offset='1' stop-color='${c2}'/></linearGradient></defs>
      <rect width='1200' height='630' fill='url(#g)'/>
      <text x='60' y='360' font-family='Poppins, Ubuntu, Arial' font-size='72' font-weight='700' fill='rgba(255,255,255,.92)'>${t}</text>
    </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function badges(langs, fws) {
    const langBadges = (langs || []).map(l => `<span class="tag">${l}</span>`).join("");
    const fwBadges = (fws || []).map(f => `<span class="tag tag-fw">${f}</span>`).join("");
    return `<div class="tags">${langBadges}${fwBadges}</div>`;
  }

  function frameworksFromTopics(topics) {
    if (!Array.isArray(topics)) return [];
    const map = { react:"React", nextjs:"Next.js", vue:"Vue", angular:"Angular", svelte:"Svelte",
                  node:"Node.js", nodejs:"Node.js", express:"Express", django:"Django", flask:"Flask",
                  spring:"Spring", "spring-boot":"Spring Boot", bootstrap:"Bootstrap", tailwind:"Tailwind CSS",
                  flutter:"Flutter", fastapi:"FastAPI" };
    const set = new Set();
    topics.forEach(t => { const k = (t||"").toLowerCase(); if (map[k]) set.add(map[k]); });
    return [...set];
  }

  function repoCard(repo) {
    const title = displayName(repo.name);
    const cover = repoImage(repo.owner.login, repo.name);
    const fallback = gradientPlaceholder(title);
    const stars = repo.stargazers_count || 0;
    const updated = new Date(repo.updated_at || repo.pushed_at || repo.created_at).toLocaleDateString();
    const langs = repo._languages || [];
    const fws = frameworksFromTopics(repo._topics || repo.topics || []);
    const rawDesc = repo.description || "";
    const desc = truncate(rawDesc.replace(/\blive\s*site\b/gi,"").trim(), 120);
    const live =
      repo.homepage && repo.homepage.trim() &&
      !/^https?:\/\/github\.com/i.test(repo.homepage)
      ? `<a href="${repo.homepage}" target="_blank" rel="noopener" class="live-link">Live Site</a>`
      : "";

    return `
      <div class="card">
        <a href="${repo.html_url}" style="color:#f8f6f6" target="_blank" rel="noopener">
          <div class="box">
            <div class="thumb">
              <img src="${cover}" alt="${title}" loading="lazy"
                   onerror="this.onerror=null;this.src='${fallback}';"/>
            </div>
            <div class="text">${title}</div>
            <div class="repo-meta">★ ${stars} • Updated ${updated}</div>
            ${live}
            <div class="repo-desc">${desc}</div>
            ${badges(langs, fws)}
          </div>
        </a>
      </div>
    `;
  }

  function initOwl() {
    $carousel.owlCarousel({
      margin: 20,
      loop: true,
      autoplay: true,
      autoplayTimeout: 2200,
      autoplayHoverPause: true,
      responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items: 3 } },
    });
    owlInitialized = true;
  }

  function mountCards(htmlArray) {
    if (owlInitialized) {
      $carousel.trigger("destroy.owl.carousel");
      $carousel.removeClass("owl-loaded");
      $carousel.find(".owl-stage-outer").children().unwrap();
      owlInitialized = false;
    }
    $carousel.empty();
    htmlArray.forEach(h => $carousel.append(h));
    initOwl();
  }

  /* ---------- Local JSON: profile/skills/projects ---------- */
  async function renderFromLocalJSON() {
    try {
      const res = await fetch(LOCAL_JSON, { cache: "no-store" });
      if (!res.ok) throw new Error();
      const data = await res.json();

      // profile + about
      if (data.profile?.name) {
        $(".js-name").text(data.profile.name);
        const first = data.profile.name.split(" ")[0] || data.profile.name;
        $(".js-first-name").text(first);
      }
      startTyping(data.profile?.roles);

      if (data.profile?.photo) $(".js-photo").attr("src", data.profile.photo);
      if (data.profile?.cv_url) $(".js-cv-link").attr("href", data.profile.cv_url);
      if (data.about?.bio) $(".js-bio").text(data.about.bio);

      const $links = $(".js-about-links").empty();
      const mk = (href, label) => `<a href="${href}" target="_blank" rel="noopener"><i class="fab fa-${label.toLowerCase()}"></i></a>`;
      if (data.links?.linkedin) $links.append(mk(data.links.linkedin, "linkedin"));
      if (data.links?.github) $links.append(mk(data.links.github, "github"));

      // projects (manual fallback)
      const projects = Array.isArray(data.projects) ? data.projects : [];
      if (projects.length) {
        const html = projects.map(p => {
          const title = p.title || "Untitled";
          const cover = p.cover || gradientPlaceholder(title);
          const updated = p.updated ? new Date(p.updated).toLocaleDateString() : "";
          const stars = p.stars || 0;
          const desc = truncate(p.description || "", 120);
          return `
            <div class="card">
              <a href="${p.repo || "#"}" style="color:#f8f6f6" target="_blank" rel="noopener">
                <div class="box">
                  <div class="thumb">
                    <img src="${cover}" alt="${title}" loading="lazy"
                         onerror="this.onerror=null;this.src='${gradientPlaceholder(title)}';"/>
                  </div>
                  <div class="text">${title}</div>
                  <div class="repo-meta">★ ${stars}${updated ? ` • Updated ${updated}` : ""}</div>
                  <div class="repo-desc">${desc}</div>
                  ${badges(p.languages || [], p.frameworks || [])}
                </div>
              </a>
            </div>
          `;
        });
        mountCards(html);
      } else {
        startTyping(); 
      }

      return true;
    } catch {
      startTyping();
      return false;
    }
  }

  /* ---------- Cached GitHub JSON built by Actions ---------- */
  async function renderFromCachedGH() {
    try {
      const res = await fetch(GH_JSON, { cache: "no-store" });
      if (!res.ok) return false;
      const repos = await res.json();
      if (!Array.isArray(repos) || !repos.length) return false;
      const html = repos.slice(0, MAX_REPOS).map(repoCard);
      mountCards(html);
      return true;
    } catch {
      return false;
    }
  }

  /* ---------- Boot ---------- */
  (async function init() {
    await renderFromLocalJSON();      
    const usedCache = await renderFromCachedGH(); // replace with enriched repos if available
    if (!usedCache) {
      // nothing else to do; page already shows manual cards
      // (we intentionally avoid live GitHub fetch in browser to keep it token-free)
    }
  })();
});
