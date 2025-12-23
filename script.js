/* =====================================================
   ALFA TZA LLP — PRODUCTION JS (VERCEL SAFE)
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------- FOOTER YEAR ---------------- */
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* ---------------- HAMBURGER MENU ---------------- */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      const expanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", String(!expanded));
      navMenu.classList.toggle("active");
    });
  }

  /* ---------------- PAGE ROUTING (RELATIVE FOR VERCEL) ---------------- */
  const route = {
    home: "index.html",
    about: "about.html",
    careers: "careers.html",
    events: "events.html",
    "contact & grievance": "contact.html",
    "customer feedback": "feedback/customer.html",
    "employee feedback": "feedback/employee.html",
    grievance: "feedback/grievance.html",
    "apply loan": "loan.html",
    "apply job": "job.html"
  };

  const go = url => {
    if (!url) return;
    window.location.assign(url);
  };

  /* ---------------- BUTTON ROUTING ---------------- */
  [
    ["contactBtn", route["contact & grievance"]],
    ["applyLoanBtn", route["apply loan"]],
    ["applyJobBtn", route["apply job"]],
    ["heroApply", route["apply loan"]],
    ["heroLearn", route.about],
    ["serviceApply", route["apply loan"]],
    ["partnerBtn", route["apply job"]]
  ].forEach(([id, url]) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", () => go(url));
  });

  document.querySelectorAll(".selectLoan").forEach(btn => {
    btn.addEventListener("click", () => go(route["apply loan"]));
  });

  document.querySelectorAll(".links li").forEach(li => {
    const key = li.textContent.trim().toLowerCase();
    if (route[key]) {
      li.style.cursor = "pointer";
      li.addEventListener("click", () => go(route[key]));
    }
  });

  /* ---------------- FAQ ACCORDION ---------------- */
  document.querySelectorAll(".faq-item").forEach(item => {
    const btn = item.querySelector(".faq-q");
    const answer = item.querySelector(".faq-a");
    if (!btn || !answer) return;

    answer.style.height = "0px";
    answer.style.overflow = "hidden";
    answer.style.transition = "height .35s ease";

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item.open").forEach(i => {
        i.classList.remove("open");
        const a = i.querySelector(".faq-a");
        if (a) a.style.height = "0px";
      });

      if (!isOpen) {
        item.classList.add("open");
        answer.style.height = answer.scrollHeight + "px";
      }
    });
  });

  /* ---------------- COUNTER ANIMATION ---------------- */
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

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.done) {
        entry.target.dataset.done = "true";
        const el =
          entry.target.querySelector(".num") ||
          entry.target.querySelector(".mnum");
        if (el) {
          animateCount(el, Number(entry.target.dataset.target));
        }
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  /* ---------------- SCROLL REVEALS ---------------- */
  const revealEls = document.querySelectorAll(
    ".why-card, .metric, .service-card"
  );

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "none";
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealEls.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    revealObserver.observe(el);
  });

  /* ---------------- BANK TICKER (NO EARLY RETURN) ---------------- */
  const bankTrack = document.getElementById("banksTrack");

  if (bankTrack) {
    if (window.matchMedia("(hover: hover)").matches) {
      bankTrack.addEventListener("mouseenter", () => {
        bankTrack.style.animationPlayState = "paused";
      });

      bankTrack.addEventListener("mouseleave", () => {
        bankTrack.style.animationPlayState = "running";
      });
    }

    bankTrack.addEventListener("touchstart", () => {
      bankTrack.style.animationPlayState = "running";
    }, { passive: true });

    bankTrack.addEventListener("touchend", () => {
      bankTrack.style.animationPlayState = "running";
    }, { passive: true });
  }

  /* ---------------- FLOAT CARD TILT ---------------- */
  if (window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll("[data-tilt]").forEach(card => {
      card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
        const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
        card.style.transform =
          `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "none";
      });
    });
  }

});

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

function switchBranch(branch) {
  if (!branches[branch]) return;
  activeBranch = branch;

  const map = document.getElementById("branchMap");
  if (map) {
    map.src = branches[branch].embed;
  }

  document.querySelectorAll(".branch-card").forEach(card => {
    card.classList.toggle("active", card.dataset.branch === branch);
  });
}

function openMap() {
  const branch = branches[activeBranch];
  if (branch) {
    window.open(branch.link, "_blank");
  }
}
