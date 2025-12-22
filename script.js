/* =====================================================
   ALFA TZA LLP — PRODUCTION JS
   Matched exactly to provided HTML
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------- FOOTER YEAR ---------------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

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

  /* ---------------- PAGE ROUTING ---------------- */
  const route = {
    home: "/",
    about: "/about.html",
    careers: "/careers.html",
    events: "/events.html",
    "contact & grievance": "/contact.html",
    "customer feedback": "/feedback/customer.html",
    "employee feedback": "/feedback/employee.html",
    grievance: "/feedback/grievance.html",
    "apply loan": "/loan.html",
    "apply job": "/job.html"
  };

  const go = url => window.location.href = url;

  // Header / Hero / Service buttons
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

  // Floating cards
  document.querySelectorAll(".selectLoan").forEach(btn => {
    btn.addEventListener("click", () => go(route["apply loan"]));
  });

  // Footer links
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

    btn?.addEventListener("click", () => {
      const open = item.classList.contains("open");

      document.querySelectorAll(".faq-item.open").forEach(i => {
        i.classList.remove("open");
        i.querySelector(".faq-q")
          ?.setAttribute("aria-expanded", "false");
      });

      if (!open) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
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
        animateCount(el, Number(entry.target.dataset.target));
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

  /* ---------------- BANK TICKER PAUSE ---------------- */
  const bankTrack = document.getElementById("banksTrack");
  if (bankTrack) {
    bankTrack.addEventListener("mouseenter", () => {
      bankTrack.style.animationPlayState = "paused";
    });
    bankTrack.addEventListener("mouseleave", () => {
      bankTrack.style.animationPlayState = "running";
    });
  }

  /* ---------------- FLOAT CARD TILT (DESKTOP ONLY) ---------------- */
  if (window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll("[data-tilt]").forEach(card => {
      card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rx = ((y / rect.height) - 0.5) * -8;
        const ry = ((x / rect.width) - 0.5) * 8;
        card.style.transform =
          `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "none";
      });
    });
  }

});

/* ================= BRANCH MAP HANDLER ================= */

const branches = {
  vashi: {
    embed:
      "https://www.google.com/maps?q=Alfa+TZA+LLP+Vashi+Plaza+Sector+17+Navi+Mumbai&output=embed",
    link:
      "https://www.google.com/maps/dir//3rd+Floor,+Vashi+Plaza,+Alfa+TZA+LLP,+D+wing-512,+Plot+No.+80%2F81,+Sector+17,+Vashi,+Navi+Mumbai,+Maharashtra+400703"
  },
  thane: {
    embed:
      "https://www.google.com/maps?q=The+Corporate+Park+opp+Pudari+Press+next+to+Warna+Dairy+Sector+18+Vashi+Navi+Mumbai+Thane+Maharashtra&output=embed",
    link:
      "https://www.google.com/maps/dir/?api=1&destination=The+Corporate+Park+opp+Pudari+Press+next+to+Warna+Dairy+Sector+18+Vashi+Navi+Mumbai+Thane+Maharashtra" 
  }
};

let activeBranch = "vashi";

function switchBranch(branch) {
  if (!branches[branch]) return;

  activeBranch = branch;

  // update map iframe
  const map = document.getElementById("branchMap");
  if (map) {
    map.src = branches[branch].embed;
  }

  // update active card UI
  document.querySelectorAll(".branch-card").forEach(card => {
    card.classList.toggle(
      "active",
      card.dataset.branch === branch
    );
  });
}

/* ================= OPEN MAP ================= */
function openMap() {
  const branch = branches[activeBranch];
  if (!branch) return;
  window.open(branch.link, "_blank");
}
