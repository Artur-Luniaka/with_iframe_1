// Import individual page scripts
import "./index.js";
import "./news.js";
import "./contacts.js";
import "./disclaimer.js";
import "./privacy.js";
import "./cookie.js";

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  // Load header and footer
  loadComponent("header-container", "header.html");
  loadComponent("footer-container", "footer.html");

  // Initialize animations
  initAnimations();
});

// Load HTML component
function loadComponent(containerId, componentPath) {
  const container = document.getElementById(containerId);
  if (!container) return;

  fetch(componentPath)
    .then((response) => response.text())
    .then((html) => {
      container.innerHTML = html;

      // If this is the header, initialize the mobile menu
      if (containerId === "header-container") {
        initMobileMenu();
      }
    })
    .catch((error) => {
      console.error(`Error loading ${componentPath}:`, error);
    });
}

function initMobileMenu() {
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const navList = document.querySelector(".nav-list");

  if (!menuToggle || !navList) return;

  menuToggle.addEventListener("click", function () {
    navList.classList.toggle("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !event.target.closest(".main-nav") &&
      navList.classList.contains("active")
    ) {
      navList.classList.remove("active");
    }
  });

  // Close menu when clicking on a list item (li) inside nav-list
  navList.addEventListener("click", function (event) {
    // Проверяем, что клик был по <li> или по ссылке внутри <li>
    if (event.target.closest("li")) {
      navList.classList.remove("active");
    }
  });
}

// Initialize animations
function initAnimations() {
  // Animate elements when they come into view
  const animateElements = document.querySelectorAll(".animate-on-scroll");

  if (animateElements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  animateElements.forEach((element) => {
    observer.observe(element);
  });
}

// Helper function to get current page name
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split("/").pop();
  return page || "index.html";
}

// Helper function to highlight current page in navigation
function highlightCurrentPage() {
  const currentPage = getCurrentPage();
  const navLinks = document.querySelectorAll(".nav-list a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const cookieBar = document.getElementById("cookieBar");
  const acceptBtn = document.getElementById("acceptCookiesBtn");

  // Показываем бар, если пользователь ещё не принял
  if (!localStorage.getItem("cookiesAccepted")) {
    cookieBar.style.display = "flex";
  }

  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    cookieBar.style.display = "none";
  });
});
