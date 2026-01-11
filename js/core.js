/* =====================================================
   CORE UI / GLOBAL BEHAVIOR
===================================================== */

import { ROUTES } from "./config.js";

export function initCore() {

  // Smooth self-draw SVG text
  window.addEventListener("load", () => {
    const lines = document.querySelectorAll("svg .stroke-line");

    lines.forEach((text, i) => {
      const length = text.getComputedTextLength();
      text.style.strokeDasharray = length;
      text.style.strokeDashoffset = length;
      text.style.stroke = "#ffffff"; // outline color
      text.style.fill = "none";      // hide fill

      // stagger drawing using setTimeout
      setTimeout(() => {
        text.style.transition = "stroke-dashoffset 1.2s ease-out";
        text.style.strokeDashoffset = 0; // draw the line
      }, i * 500); // 0ms, 500ms, 1000ms for each line
    });
  });

  /* ================= FOOTER YEAR ================= */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ================= HAMBURGER MENU ================= */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      const expanded =
        hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute(
        "aria-expanded",
        String(!expanded)
      );
      navMenu.classList.toggle("active");
    });
  }

  /* ================= ROUTING ================= */
  const go = url => {
    if (!url) return;
    window.location.assign(url);
  };

  [
    ["contactBtn", ROUTES["contact & grievance"]],
    ["applyLoanBtn", ROUTES["apply loan"]],
    ["applyJobBtn", ROUTES["apply job"]],
    ["heroApply", ROUTES["apply loan"]],
    ["heroLearn", ROUTES.about],
    ["serviceApply", ROUTES["apply loan"]],
    ["partnerBtn", ROUTES["apply job"]]
  ].forEach(([id, url]) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", () => go(url));
  });

  document.querySelectorAll(".selectLoan").forEach(btn => {
    btn.addEventListener("click", () =>
      go(ROUTES["apply loan"])
    );
  });

  document.querySelectorAll(".links li").forEach(li => {
    const key = li.textContent.trim().toLowerCase();
    if (ROUTES[key]) {
      li.style.cursor = "pointer";
      li.addEventListener("click", () => go(ROUTES[key]));
    }
  });

  /* ================= FAQ ACCORDION ================= */
  document.querySelectorAll(".faq-item").forEach(item => {
    const btn = item.querySelector(".faq-q");
    const answer = item.querySelector(".faq-a");
    if (!btn || !answer) return;

    answer.style.height = "0px";
    answer.style.overflow = "hidden";
    answer.style.transition = "height .35s ease";

    btn.addEventListener("click", () => {
      const open = item.classList.contains("open");

      document
        .querySelectorAll(".faq-item.open")
        .forEach(i => {
          i.classList.remove("open");
          const a = i.querySelector(".faq-a");
          if (a) a.style.height = "0px";
        });

      if (!open) {
        item.classList.add("open");
        answer.style.height =
          answer.scrollHeight + "px";
      }
    });
  });

  /* ================= COUNTERS ================= */
  const counters = document.querySelectorAll("[data-target]");

  const animateCount = (el, target) => {
    const duration = 1200;
    const startTime = performance.now();
  
    const tick = now => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3); // smooth cubic easing
      el.textContent = Math.floor(easeOut * target);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  

  const counterObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (
          entry.isIntersecting &&
          !entry.target.dataset.done
        ) {
          entry.target.dataset.done = "true";
          const el =
            entry.target.querySelector(".num") ||
            entry.target.querySelector(".mnum");
          if (el) {
            animateCount(
              el,
              Number(entry.target.dataset.target)
            );
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(c =>
    counterObserver.observe(c)
  );

  /* ================= SCROLL REVEAL (NON-ABOUT PAGES ONLY) ================= */

  if (!document.querySelector(".about-page")) {

    const revealEls = document.querySelectorAll(
      ".why-card, .service-card"
    );

    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "none";
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealEls.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      revealObserver.observe(el);
    });

  }

  /* ================= ABOUT PAGE SCROLL ANIMATIONS ================= */

  if (document.querySelector(".about-page")) {

    const aboutRevealEls = document.querySelectorAll(
      ".about-hero, .process-step, .founder-grid, .triple-grid > div, .timeline-grid .metric"
    );

    aboutRevealEls.forEach(el => el.classList.add("reveal"));

    const aboutObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            aboutObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    aboutRevealEls.forEach(el =>
      aboutObserver.observe(el)
    );

  }

  /* ================= BANK TICKER ================= */
  const bankTrack = document.getElementById("banksTrack");
  if (bankTrack) {
    if (window.matchMedia("(hover: hover)").matches) {
      bankTrack.addEventListener(
        "mouseenter",
        () =>
          (bankTrack.style.animationPlayState =
            "paused")
      );
      bankTrack.addEventListener(
        "mouseleave",
        () =>
          (bankTrack.style.animationPlayState =
            "running")
      );
    }
  }

    /* ---------------- STORY CARD DIRECTIONAL HOVER ---------------- */
    if (window.matchMedia("(hover: hover)").matches) {
      document.querySelectorAll(".story-card").forEach(card => {

        card.addEventListener("mousemove", e => {
          const rect = card.getBoundingClientRect();

          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const cx = rect.width / 2;
          const cy = rect.height / 2;

          const dx = (x - cx) / cx;
          const dy = (y - cy) / cy;

          card.style.setProperty("--rx", `${dy * -8}deg`);
          card.style.setProperty("--ry", `${dx * 8}deg`);
          card.style.setProperty("--tx", `${dx * 6}px`);
          card.style.setProperty("--ty", `${dy * 6}px`);

          card.classList.add("is-hovered");
        });

        card.addEventListener("mouseleave", () => {
          card.classList.remove("is-hovered");
          card.style.setProperty("--rx", "0deg");
          card.style.setProperty("--ry", "0deg");
          card.style.setProperty("--tx", "0px");
          card.style.setProperty("--ty", "0px");
        });

      });

    // Hero Cards Tilt
    document.querySelectorAll(".float-card").forEach(card => {
      card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const dx = (x - rect.width / 2) / (rect.width / 2);
        const dy = (y - rect.height / 2) / (rect.height / 2);

        card.style.transform = `
          rotateX(${-dy * 10}deg)
          rotateY(${dx * 10}deg)
          translateY(-5px)
        `;
        card.style.transition = "transform 0.2s ease";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0)";
      });
    });

  }

  /* ================= BRANCH MAP ================= */

  const branches = {
    vashi: {
      embed: "https://www.google.com/maps?q=Alfa+TZA+LLP+Vashi+Plaza&output=embed",
      link: "https://www.google.com/maps?q=Alfa+TZA+LLP+Vashi+Plaza"
    },
    thane: {
      embed: "https://www.google.com/maps?q=The+Corporate+Park+Vashi&output=embed",
      link: "https://www.google.com/maps?q=The+Corporate+Park+Vashi"
    }
  };

  let activeBranch = "vashi";

  window.switchBranch = function (branch) {
    if (!branches[branch]) return;
    activeBranch = branch;

    const map = document.getElementById("branchMap");
    if (map) map.src = branches[branch].embed;

    document.querySelectorAll(".branch-card").forEach(card => {
      card.classList.toggle(
        "active",
        card.dataset.branch === branch
      );
    });
  };

  window.openMap = function () {
    const branch = branches[activeBranch];
    if (branch) window.open(branch.link, "_blank");
  };

} // ← closes initCore ONLY
