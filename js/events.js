/* =====================================================
   EVENTS + IMAGE POPUP (ROBUST, DEBUGGED)
===================================================== */

import { supabaseClient } from "./config.js";

/* ================= INIT ================= */

export function initEvents() {
  // Ensure DOM is ready even if called early
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
}

function run() {
  const galleries = document.querySelectorAll(".event-gallery");

  console.log("[Events] Found galleries:", galleries.length);

  if (!galleries.length) return;

  galleries.forEach(gallery => {
    const folder = gallery.dataset.folder;

    if (!folder) {
      console.warn("[Events] Missing data-folder", gallery);
      return;
    }

    console.log("[Events] Loading folder:", folder);
    loadEventImages(folder.trim(), gallery);
  });

  initPopup();
}

/* ================= IMAGE LOADER ================= */

async function loadEventImages(folderName, container) {
  try {
    const { data, error } = await supabaseClient
      .storage
      .from("events")
      .list(folderName, {
        limit: 100,
        sortBy: { column: "name", order: "asc" }
      });

    if (error) {
      console.error("[Supabase LIST error]", folderName, error);
      return;
    }

    if (!data || !data.length) {
      console.warn("[Events] No images in folder:", folderName);
      return;
    }

    console.log(`[Events] ${folderName}: ${data.length} files`);

    let hiddenCount = 0;

    data.forEach((file, index) => {
      if (!/\.(jpg|jpeg|png|webp)$/i.test(file.name)) return;

      const { data: urlData } = supabaseClient
        .storage
        .from("events")
        .getPublicUrl(`${folderName}/${file.name}`);

      if (!urlData?.publicUrl) {
        console.warn("[Events] No public URL:", file.name);
        return;
      }

      const img = document.createElement("img");
      img.src = urlData.publicUrl;
      img.loading = "lazy";
      img.alt = folderName;

      if (index >= 4) {
        img.style.display = "none";
        img.classList.add("hidden");
        hiddenCount++;
      }

      container.appendChild(img);
    });

    if (hiddenCount > 0) {
      const btn = document.createElement("button");
      btn.textContent = "Show more";
      btn.className = "btn ghost";

      btn.addEventListener("click", () => {
        container
          .querySelectorAll(".hidden")
          .forEach(img => {
            img.style.display = "block";
            img.classList.remove("hidden");
          });
        btn.remove();
      });

      container.after(btn);
    }

  } catch (err) {
    console.error("[Events] Fatal error:", err);
  }
}

/* ================= IMAGE POPUP ================= */

function initPopup() {
  const overlay = document.getElementById("popupOverlay");
  const popupImage = document.getElementById("popupImage");
  const close = document.getElementById("popupClose");
  const prev = document.getElementById("prevImg");
  const next = document.getElementById("nextImg");

  if (!overlay || !popupImage) return;

  let currentGallery = [];
  let currentIndex = 0;

  function show(index) {
    if (!currentGallery.length) return;

    if (index < 0) index = currentGallery.length - 1;
    if (index >= currentGallery.length) index = 0;

    currentIndex = index;
    popupImage.src = currentGallery[currentIndex].src;
  }

  document.addEventListener("click", e => {
    const img = e.target;

    if (
      img.tagName === "IMG" &&
      img.closest(".photos")
    ) {
      const galleryEl = img.closest(".photos");
      currentGallery = Array.from(
        galleryEl.querySelectorAll("img")
      );
      currentIndex = currentGallery.indexOf(img);

      popupImage.src = img.src;
      overlay.classList.add("active");
    }
  });

  prev.addEventListener("click", e => {
    e.stopPropagation();
    show(currentIndex - 1);
  });

  next.addEventListener("click", e => {
    e.stopPropagation();
    show(currentIndex + 1);
  });

  overlay.addEventListener("click", e => {
    if (e.target === overlay || e.target === close) {
      overlay.classList.remove("active");
      popupImage.src = "";
    }
  });

  document.addEventListener("keydown", e => {
    if (!overlay.classList.contains("active")) return;

    if (e.key === "ArrowLeft") show(currentIndex - 1);
    if (e.key === "ArrowRight") show(currentIndex + 1);
    if (e.key === "Escape") overlay.classList.remove("active");
  });
}
