/**
 * Desa Wisata Watesari - Main Application Script
 * Orchestrates premium UX interactions: loading, scroll animations, responsive navigation,
 * scrollspy, counters, modals, map interactive sidebar, gallery lightbox, and contact forms.
 */

document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initStickyHeader();
  initMobileNav();
  initScrollspy();
  initScrollReveal();
  initStatsCounter();
  initDestinationModal();
  initMapSelector();
  initGalleryLightbox();
  initContactForm();
  initBackToTop();
});

/**
 * 1. Preloader handling
 */
function initPreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  // Fade out preloader when page is fully loaded
  window.addEventListener("load", () => {
    preloader.style.opacity = "0";
    preloader.style.visibility = "hidden";

    // Trigger hero animations explicitly
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
      heroContent.style.opacity = "1";
      heroContent.style.transform = "translateY(0)";
    }
  });

  // Fallback in case load event takes too long
  setTimeout(() => {
    if (preloader.style.opacity !== "0") {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";
    }
  }, 3000);
}

/**
 * 2. Sticky Navbar toggle
 */
function initStickyHeader() {
  const header = document.querySelector("header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });
}

/**
 * 3. Mobile Navigation Menu
 */
function initMobileNav() {
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link, .nav-cta");

  if (!mobileToggle || !navMenu) return;

  // Open / Close Menu
  mobileToggle.addEventListener("click", () => {
    mobileToggle.classList.toggle("active");
    navMenu.classList.toggle("active");

    // Prevent body scrolling when menu is open
    document.body.style.overflow = navMenu.classList.contains("active")
      ? "hidden"
      : "auto";
  });

  // Close menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !navMenu.contains(e.target) &&
      !mobileToggle.contains(e.target) &&
      navMenu.classList.contains("active")
    ) {
      mobileToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}

/**
 * 4. Scrollspy (Highlight active nav link on scroll)
 */
function initScrollspy() {
  const sections = document.querySelectorAll("section, header");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150; // offset for sticky header
      const sectionHeight = section.clientHeight;
      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  });
}

/**
 * 5. Scroll Reveal Animations (Intersection Observer)
 */
function initScrollReveal() {
  const revealElements = () => document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          // Once animated, we don't need to observe it anymore
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  // Observe static reveals
  revealElements().forEach((el) => observer.observe(el));

  // Observe dynamically loaded elements (Wisata & UMKM grids)
  document.addEventListener("wisataLoaded", () => {
    revealElements().forEach((el) => observer.observe(el));
    initWisataSwiper();
  });
  document.addEventListener("umkmLoaded", () => {
    revealElements().forEach((el) => observer.observe(el));
  });
}

/**
 * 6. Stats Counter Animation
 */
function initStatsCounter() {
  const statsSection = document.querySelector(".stats-section");
  const statNums = document.querySelectorAll(".stat-num");

  if (!statsSection || statNums.length === 0) return;

  let started = false;

  const startCounter = () => {
    statNums.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-target"), 10);
      const suffix = stat.getAttribute("data-suffix") || "";
      let count = 0;
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // ~60fps

      const updateCount = () => {
        count += increment;
        if (count < target) {
          stat.innerHTML = Math.floor(count) + `<span>${suffix}</span>`;
          requestAnimationFrame(updateCount);
        } else {
          stat.innerHTML = target + `<span>${suffix}</span>`;
        }
      };

      updateCount();
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          startCounter();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  observer.observe(statsSection);
}

/**
 * 7. Tourist Destination Details Modal
 */
function initDestinationModal() {
  const modal = document.getElementById("detail-modal");
  const closeBtn = document.querySelector(".detail-modal-close");

  if (!modal || !closeBtn) return;

  // Event delegation for cards loaded dynamically
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-card")) {
      const wisataId = e.target.getAttribute("data-id");
      const item = window.wisataData.find((w) => w.id === wisataId);

      if (item) {
        openModal(item);
      }
    }
  });

  function openModal(data) {
    // Populate modal contents
    document.getElementById("modal-img").src = data.gambar;
    document.getElementById("modal-img").alt = data.nama;
    document.getElementById("modal-title").textContent = data.nama;
    document.getElementById("modal-lokasi").textContent = data.lokasi;
    document.getElementById("modal-jam").textContent = data.jam_buka;
    document.getElementById("modal-tiket").textContent = data.tiket;
    document.getElementById("modal-desc").textContent = data.detail;

    // Show Modal
    modal.classList.add("active");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Lock scrolling
  }

  function closeModal() {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.style.display = "none";
    }, 400); // Wait for transition
    document.body.style.overflow = "auto"; // Unlock scrolling
  }

  closeBtn.addEventListener("click", closeModal);

  // Close on background click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

/**
 * 8. Interactive Map Selector
 */
function initMapSelector() {
  const locationItems = document.querySelectorAll(".location-item");
  const mapIframe = document.getElementById("map-iframe");
  const mapLink = document.getElementById("map-gmaps-link");

  if (locationItems.length === 0 || !mapIframe || !mapLink) return;

  // Custom embeds and links for Watesari key locations
  const mapData = {
    "loc-balai": {
      embed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.2737604554316!2d112.5050519!3d-7.433827299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7808fbca4ee405%3A0xbd86071ef28ea873!2sBalai%20Desa%20Watesari!5e0!3m2!1sid!2sid!4v1718625600000",
      link: "https://maps.app.goo.gl/wKrfy71P5QeD5oZGA",
    },
    "loc-kurma": {
      embed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.2801456930514!2d112.5034151!3d-7.4326168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7808fb36c0a767%3A0xc3412a80be36e788!2sKebun%20Kurma%20Desa%20Watesari!5e0!3m2!1sid!2sid!4v1718625700000",
      link: "https://maps.app.goo.gl/o1H58CWhYy1Z6vFz9",
    },
    "loc-wayang": {
      embed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.274020300185!2d112.50267327476023!3d-7.43379929257712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7808fbca4ee405%3A0xbd86071ef28ea873!2sBalai%20Desa%20Watesari!5e0!3m2!1sid!2sid!4v1718625600000",
      link: "https://maps.app.goo.gl/wKrfy71P5QeD5oZGA", // Centered in village area
    },
    "loc-cincau": {
      embed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.2737604554316!2d112.5050519!3d-7.433827299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7808fbca4ee405%3A0xbd86071ef28ea873!2sBalai%20Desa%20Watesari!5e0!3m2!1sid!2sid!4v1718625600000",
      link: "https://maps.app.goo.gl/wKrfy71P5QeD5oZGA", // Centered in village area
    },
  };

  locationItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Toggle active classes
      locationItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");

      // Update Map Iframe and Button Link
      const locKey = item.getAttribute("data-location");
      if (mapData[locKey]) {
        mapIframe.src = mapData[locKey].embed;
        mapLink.href = mapData[locKey].link;
      }
    });
  });
}

/**
 * 9. Gallery Lightbox with Prev/Next Navigation
 */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const lightboxTitle = document.querySelector(".lightbox-title");
  const lightboxCategory = document.querySelector(".lightbox-category");
  const closeBtn = document.querySelector(".lightbox-close");
  const prevBtn = document.querySelector(".lightbox-prev");
  const nextBtn = document.querySelector(".lightbox-next");

  if (galleryItems.length === 0 || !lightbox || !lightboxImg) return;

  let currentIndex = 0;
  const images = [];

  // Extract gallery details
  galleryItems.forEach((item, index) => {
    const img = item.querySelector("img");
    const title = item.querySelector("h4").textContent;
    const category = item.querySelector("p").textContent;

    images.push({
      src: img.src,
      title: title,
      category: category,
    });

    item.addEventListener("click", () => {
      currentIndex = index;
      openLightbox();
    });
  });

  function openLightbox() {
    updateLightboxContent();
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  function updateLightboxContent() {
    const data = images[currentIndex];
    lightboxImg.src = data.src;
    lightboxImg.alt = data.title;
    lightboxTitle.textContent = data.title;
    lightboxCategory.textContent = data.category;
  }

  function navigateNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightboxContent();
  }

  function navigatePrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightboxContent();
  }

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", navigatePrev);
  nextBtn.addEventListener("click", navigateNext);

  // Close on backdrop click
  lightbox.addEventListener("click", (e) => {
    if (
      e.target === lightbox ||
      e.target.classList.contains("lightbox-content")
    ) {
      closeLightbox();
    }
  });

  // Keyboard bindings
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowRight") {
      navigateNext();
    } else if (e.key === "ArrowLeft") {
      navigatePrev();
    }
  });
}

/**
 * 10. Contact Form with Premium Success Toast
 */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const toast = document.getElementById("form-toast");

  if (!form || !toast) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simple verification
    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const subject = document.getElementById("contact-subject").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    if (!name || !email || !subject || !message) {
      alert("Harap isi semua kolom formulir.");
      return;
    }

    const submitBtn = form.querySelector(".btn-submit");
    const originalText = submitBtn.textContent;

    // Premium loading state on button
    submitBtn.disabled = true;
    submitBtn.textContent = "Mengirim Pesan...";
    submitBtn.style.opacity = "0.7";

    // Fake submission delay (1 second)
    setTimeout(() => {
      // Reset button
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      submitBtn.style.opacity = "1";

      // Reset form
      form.reset();

      // Trigger toast notification
      showToast(
        "Terima kasih! Pesan Anda telah berhasil dikirim. Kami akan segera menghubungi Anda.",
      );
    }, 1200);
  });

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    // Hide toast after 4.5 seconds
    setTimeout(() => {
      toast.classList.remove("show");
    }, 4500);
  }
}

/**
 * 11. Back to Top Button
 */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/**
 * 12. Initialize Swiper for Destinasi Wisata 3D Coverflow
 */
function initWisataSwiper() {
  const container = document.querySelector(".wisata-swiper");
  if (!container) return;

  // Make Swiper lighter and more responsive:
  // - disable heavy 3D depths on small screens
  // - enable Swiper lazy loading and avoid preloading all images
  // - reduce animation speed and autoplay on small devices
  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const wisataSwiper = new Swiper(".wisata-swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 12,
    loop: true,
    speed: 600,
    autoplay: isMobile
      ? false
      : {
          delay: 4500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
    preloadImages: false,
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 1,
      loadOnTransitionStart: true,
    },
    coverflowEffect: {
      rotate: 12,
      stretch: 0,
      depth: isMobile ? 40 : 120,
      modifier: isMobile ? 0.9 : 1.2,
      slideShadows: false,
    },
    watchSlidesProgress: true,
    observer: true,
    observeParents: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      // Keep slidesPerView conservative to reduce resource usage
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
        coverflowEffect: { rotate: 4, depth: 35, modifier: 0.85 },
      },
      576: {
        slidesPerView: 1.05,
        spaceBetween: 12,
        coverflowEffect: { rotate: 6, depth: 50, modifier: 0.9 },
      },
      768: {
        slidesPerView: 1.2,
        spaceBetween: 14,
        coverflowEffect: { rotate: 8, depth: 80, modifier: 1.0 },
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 18,
        coverflowEffect: { rotate: 10, depth: 100, modifier: 1.1 },
      },
      1280: {
        slidesPerView: 2.6,
        spaceBetween: 22,
        coverflowEffect: { rotate: 12, depth: 120, modifier: 1.2 },
      },
    },
  });
}
