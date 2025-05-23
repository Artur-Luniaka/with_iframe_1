// News page specific JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Load news content from JSON
  loadNewsContent();
});

// Load news content from JSON
function loadNewsContent() {
  const mainElement = document.querySelector(".news-page");
  if (!mainElement) return;

  fetch("data/news.json")
    .then((response) => response.text())
    .then((data) => {
      try {
        const newsData = JSON.parse(data);

        // Update page meta tags
        document.title = newsData.meta.title;
        document
          .querySelector('meta[name="description"]')
          .setAttribute("content", newsData.meta.description);

        // Create news page sections
        let newsHTML = `
                    <div class="container">
                        <div class="news-header animate-on-scroll">
                            <h1 class="news-title">${newsData.header.title}</h1>
                            <p class="news-subtitle">${
                              newsData.header.subtitle
                            }</p>
                        </div>
                        
                        <!-- Featured News -->
                        <section class="featured-news animate-on-scroll">
                            <div class="featured-news-card">
                                <img src="${newsData.featured.image}" alt="${
          newsData.featured.title
        }" class="featured-news-image">
                                <div class="featured-news-content">
                                    <span class="featured-label">Featured</span>
                                    <h2 class="featured-news-title">${
                                      newsData.featured.title
                                    }</h2>
                                    <p class="featured-news-excerpt">${
                                      newsData.featured.excerpt
                                    }</p>
                                </div>
                            </div>
                        </section>
                        
                        <!-- News Grid -->
                        <section class="news-grid">
                            <div class="news-container">
                                ${newsData.articles
                                  .map(
                                    (article) => `
                                    <div class="news-card animate-on-scroll">
                                        <img src="${article.image}" alt="${article.title}" class="news-image">
                                        <div class="news-content">
                                            <p class="news-date">${article.date}</p>
                                            <h3 class="news-card-title">${article.title}</h3>
                                            <p class="news-excerpt">${article.excerpt}</p>
                                        </div>
                                    </div>
                                `
                                  )
                                  .join("")}
                            </div>
                        </section>
                        
                        <!-- Tournament Section -->
                        <section class="tournament-section">
                            <div class="tournament-header animate-on-scroll">
                                <h2 class="tournament-title">${
                                  newsData.tournaments.title
                                }</h2>
                                <p class="tournament-subtitle">${
                                  newsData.tournaments.subtitle
                                }</p>
                            </div>
                            
                            <div class="tournament-container">
                                ${newsData.tournaments.items
                                  .map(
                                    (tournament) => `
                                    <div class="tournament-card animate-on-scroll">
                                        <div class="tournament-icon">
                                            <img src="${tournament.icon}" alt="${tournament.title} icon">
                                        </div>
                                        <div class="tournament-content">
                                            <h3 class="tournament-card-title">${tournament.title}</h3>
                                            <p class="tournament-date">${tournament.date}</p>
                                            <p>${tournament.description}</p>
                                        </div>
                                    </div>
                                `
                                  )
                                  .join("")}
                            </div>
                        </section>
                    </div>
                `;

        mainElement.innerHTML = newsHTML;

        // Initialize animations after content is loaded
        initAnimations();
      } catch (error) {
        console.error("Error parsing news.json:", error);
      }
    })
    .catch((error) => {
      console.error("Error loading news.json:", error);
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
