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
     home: "/",
     about: "/about",
     careers: "/careers",
     events: "/events",
     "contact & grievance": "/contact",
     "apply loan": "/loan",
     "apply job": "/job",
     "work & testimonials": "/testimonials",
     "lenders & policies": "/policies"
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

// ================== CONFIG ==================
const SUPABASE_URL = "https://ttnlhduxxztpkthodctn.supabase.co";
const SUPABASE_KEY = "sb_publishable_nn0MYL0NpoTuA706h88L7g_BlEU1SDE";


// ================== JOB FORM SUBMIT ==================
const jobForm = document.getElementById("jobForm");
const jobSuccessMsg = document.getElementById("jobSuccessMessage");

if (jobForm) {
  jobForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      full_name: document.getElementById("fullName").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      position: document.getElementById("position").value
    };

    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/job_applications`,
        {
          method: "POST",
          headers: {
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`,
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
          },
          body: JSON.stringify(payload)
        }
      );

      if (!res.ok) throw new Error(await res.text());

      jobForm.reset();
      jobSuccessMsg.style.display = "block";

    } catch (err) {
      console.error(err);
      alert("Submission failed. Check console.");
    }
  });
}


// ================== GRIEVANCE FORM ==================
const grievanceForm = document.getElementById("grievanceForm");
const grievanceSuccessMsg = document.getElementById("grievanceSuccessMessage");

if (grievanceForm) {
  grievanceForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      full_name: document.getElementById("fullName").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value
    };

    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/grievances`,
        {
          method: "POST",
          headers: {
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`,
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
          },
          body: JSON.stringify(payload)
        }
      );

      if (!res.ok) throw new Error(await res.text());

      grievanceForm.reset();
      grievanceSuccessMsg.style.display = "block";

    } catch (err) {
      console.error(err);
      alert("Failed to submit grievance.");
    }
  });
}


// ================== LOAN APPLICATION ==================
const loanForm = document.getElementById("loanForm");
const successMsg = document.getElementById("loanSuccessMessage");

if (loanForm) {
  loanForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      full_name: document.getElementById("fullName").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      loan_amount: document.getElementById("loanAmount").value,
      loan_tenure: document.getElementById("loanTenure").value,
      city: document.getElementById("city").value,
      pincode: document.getElementById("pincode").value
    };

    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/loan_applications`,
        {
          method: "POST",
          headers: {
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`,
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
          },
          body: JSON.stringify(payload)
        }
      );

      if (!res.ok) throw new Error(await res.text());

      loanForm.reset();
      successMsg.style.display = "block";

    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    }
  });
}
