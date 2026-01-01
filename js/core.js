/* =====================================================
   CORE UI / GLOBAL BEHAVIOR
===================================================== */

import { ROUTES } from "./config.js";

export function initCore() {

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
    let current = 0;
    const step = Math.max(1, Math.floor(target / 80));

    const tick = () => {
      current += step;
      if (current >= target) {
        el.textContent = target;
      } else {
        el.textContent = current;
        requestAnimationFrame(tick);
      }
    };
    tick();
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

  /* ================= SCROLL REVEAL ================= */
  const revealEls = document.querySelectorAll(
    ".why-card, .metric, .service-card"
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
  }
}
