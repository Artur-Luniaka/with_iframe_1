// Index page specific JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Load home page content from JSON
  loadHomeContent();

  // Load testimonials
  loadTestimonials();
});

// Load home page content from JSON
function loadHomeContent() {
  const mainElement = document.querySelector(".home-page");
  if (!mainElement) return;

  fetch("data/home.json")
    .then((response) => response.text())
    .then((data) => {
      try {
        const homeData = JSON.parse(data);

        // Update page meta tags
        document.title = homeData.meta.title;
        document
          .querySelector('meta[name="description"]')
          .setAttribute("content", homeData.meta.description);

        // Create home page sections
        let homeHTML = `
                    <!-- Hero Section -->
                    <section class="hero-section" style="background-image: url('${
                      homeData.hero.backgroundImage
                    }')">
                        <div class="container">
                            <div class="hero-content">
                                <h1 class="hero-title">${
                                  homeData.hero.title
                                }</h1>
                                <p class="hero-subtitle">${
                                  homeData.hero.subtitle
                                }</p>
                            </div>
                        </div>
                    </section>
                    
                    <!-- How to Play Section -->
                    <section id="how-to-play" class="home-section how-to-play">
                        <div class="container">
                            <div class="section-header animate-on-scroll">
                                <h2 class="section-title">${
                                  homeData.howToPlay.title
                                }</h2>
                                <p class="section-subtitle">${
                                  homeData.howToPlay.subtitle
                                }</p>
                            </div>
                            
                            <div class="steps-container">
                                ${homeData.howToPlay.steps
                                  .map(
                                    (step, index) => `
                                    <div class="step-card animate-on-scroll">
                                        <div class="step-number">${
                                          index + 1
                                        }</div>
                                        <h3 class="step-title">${
                                          step.title
                                        }</h3>
                                        <p>${step.description}</p>
                                    </div>
                                `
                                  )
                                  .join("")}
                            </div>
                        </div>
                    </section>
                    
                    <!-- Testimonials Section -->
                    <section class="home-section testimonials">
                        <div class="container">
                            <div class="section-header animate-on-scroll">
                                <h2 class="section-title">${
                                  homeData.testimonials.title
                                }</h2>
                                <p class="section-subtitle">${
                                  homeData.testimonials.subtitle
                                }</p>
                            </div>
                            
                            <div class="testimonials-container">
                                <!-- Testimonials will be loaded from reviews.json -->
                            </div>
                        </div>
                    </section>
                    
                    <!-- Solitaire Mechanics Section -->
                    <section class="home-section solitaire-mechanics">
                        <div class="container">
                            <div class="section-header animate-on-scroll">
                                <h2 class="section-title">${
                                  homeData.mechanics.title
                                }</h2>
                                <p class="section-subtitle">${
                                  homeData.mechanics.subtitle
                                }</p>
                            </div>
                            
                            <div class="mechanics-container">
                                ${homeData.mechanics.items
                                  .map(
                                    (item) => `
                                    <div class="mechanic-card animate-on-scroll">
                                        <div class="mechanic-icon">
                                            <img src="${item.icon}" alt="${item.title} icon">
                                        </div>
                                        <div class="mechanic-content">
                                            <h3 class="mechanic-title">${item.title}</h3>
                                            <p>${item.description}</p>
                                        </div>
                                    </div>
                                `
                                  )
                                  .join("")}
                            </div>
                        </div>
                    </section>
                    
                    <!-- Winning Strategies Section -->
                    <section class="home-section winning-strategies">
                        <div class="container">
                            <div class="section-header animate-on-scroll">
                                <h2 class="section-title">${
                                  homeData.strategies.title
                                }</h2>
                                <p class="section-subtitle">${
                                  homeData.strategies.subtitle
                                }</p>
                            </div>
                            
                            <div class="strategies-container">
                                ${homeData.strategies.items
                                  .map(
                                    (item) => `
                                    <div class="strategy-card animate-on-scroll">
                                        <img src="${item.icon}" alt="${item.title} icon" class="strategy-icon">
                                        <h3 class="strategy-title">${item.title}</h3>
                                        <p>${item.description}</p>
                                    </div>
                                `
                                  )
                                  .join("")}
                            </div>
                        </div>
                    </section>
                    
                    <!-- Fairway Challenge Section -->
                    <section class="home-section fairway-challenge">
                        <div class="container">
                            <div class="section-header animate-on-scroll">
                                <h2 class="section-title">${
                                  homeData.challenge.title
                                }</h2>
                                <p class="section-subtitle">${
                                  homeData.challenge.subtitle
                                }</p>
                            </div>
                            
                            <p class="challenge-description animate-on-scroll">${
                              homeData.challenge.description
                            }</p>
                            
                            <div class="game-container animate-on-scroll">
                                <iframe src="https://html5.gamemonetize.co/k2ry2h1iqplf0qqnl2qw33fbb09fyugi/" width="1152" height="648" scrolling="none" frameborder="0"></iframe>
                            </div>
                        </div>
                    </section>
                `;

        mainElement.innerHTML = homeHTML;

        // Initialize animations after content is loaded
        initAnimations();
      } catch (error) {
        console.error("Error parsing home.json:", error);
      }
    })
    .catch((error) => {
      console.error("Error loading home.json:", error);
    });
}

document.addEventListener("DOMContentLoaded", loadTestimonials);

function loadTestimonials() {
  fetch("data/reviews.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load reviews.json");
      }
      return response.json();
    })
    .then((reviewsData) => {
      const testimonialsContainer = document.querySelector(
        ".testimonials-container"
      );

      if (!testimonialsContainer || !Array.isArray(reviewsData.reviews)) return;

      let testimonialsHTML = "";

      reviewsData.reviews.forEach((testimonial) => {
        const gender = Math.random() > 0.5 ? "men" : "women";
        const index = Math.floor(Math.random() * 100);
        const avatarUrl = `https://randomuser.me/api/portraits/${gender}/${index}.jpg`;

        testimonialsHTML += `
          <div class="testimonial-card animate-on-scroll">
            <p class="testimonial-text">${testimonial.text}</p>
            <div class="testimonial-author">
              <img src="${avatarUrl}" alt="testimonial" class="author-avatar">
              <div>
                <p class="author-name">${testimonial.name}</p>
                <p class="author-title">${testimonial.title}</p>
              </div>
            </div>
          </div>
        `;
      });

      testimonialsContainer.innerHTML = testimonialsHTML;
    })
    .catch((error) => {
      console.error("Error loading testimonials:", error);
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
