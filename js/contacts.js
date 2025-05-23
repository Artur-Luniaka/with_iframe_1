// Contacts page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Load contacts content from JSON
    loadContactsContent();
    
    // Initialize contact form validation
    initContactForm();
});

// Load contacts content from JSON
function loadContactsContent() {
    const mainElement = document.querySelector('.contacts-page');
    if (!mainElement) return;
    
    fetch('data/contacts.json')
        .then(response => response.text())
        .then(data => {
            try {
                const contactsData = JSON.parse(data);
                
                // Update page meta tags
                document.title = contactsData.meta.title;
                document.querySelector('meta[name="description"]').setAttribute('content', contactsData.meta.description);
                
                // Create contacts page sections
                let contactsHTML = `
                    <div class="container">
                        <div class="contact-header animate-on-scroll">
                            <h1 class="contact-title">${contactsData.header.title}</h1>
                            <p class="contact-subtitle">${contactsData.header.subtitle}</p>
                        </div>
                        
                        <div class="contact-container">
                            <div class="contact-form-container animate-on-scroll">
                                <h2>${contactsData.form.title}</h2>
                                <form class="contact-form" id="contactForm">
                                    <div class="form-group">
                                        <label for="name" class="form-label">${contactsData.form.nameLabel}</label>
                                        <input type="text" id="name" name="name" class="form-input" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="email" class="form-label">${contactsData.form.emailLabel}</label>
                                        <input type="email" id="email" name="email" class="form-input" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="message" class="form-label">${contactsData.form.messageLabel}</label>
                                        <textarea id="message" name="message" class="form-textarea" required></textarea>
                                    </div>
                                    
                                    <button type="submit" class="btn form-submit">${contactsData.form.submitButton}</button>
                                </form>
                            </div>
                            
                            <div class="contact-info-container animate-on-scroll">
                                <h2 class="contact-info-title">${contactsData.info.title}</h2>
                                
                                <div class="contact-info-item">
                                    <div class="contact-info-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                    </div>
                                    <div class="contact-info-content">
                                        <p class="contact-info-label">${contactsData.info.addressLabel}</p>
                                        <p class="contact-info-text">${contactsData.info.address}</p>
                                    </div>
                                </div>
                                
                                <div class="contact-info-item">
                                    <div class="contact-info-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                        </svg>
                                    </div>
                                    <div class="contact-info-content">
                                        <p class="contact-info-label">${contactsData.info.phoneLabel}</p>
                                        <p class="contact-info-text">${contactsData.info.phone}</p>
                                    </div>
                                </div>
                                
                                <div class="contact-info-item">
                                    <div class="contact-info-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </svg>
                                    </div>
                                    <div class="contact-info-content">
                                        <p class="contact-info-label">${contactsData.info.emailLabel}</p>
                                        <p class="contact-info-text">${contactsData.info.email}</p>
                                    </div>
                                </div>
                                
                                <div class="contact-info-item">
                                    <div class="contact-info-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                    </div>
                                    <div class="contact-info-content">
                                        <p class="contact-info-label">${contactsData.info.hoursLabel}</p>
                                        <p class="contact-info-text">${contactsData.info.hours}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="map-container animate-on-scroll">
                            <iframe src="${contactsData.map.embedUrl}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                `;
                
                mainElement.innerHTML = contactsHTML;
                
                // Initialize contact form after content is loaded
                initContactForm();
                
                // Initialize animations after content is loaded
                initAnimations();
            } catch (error) {
                console.error('Error parsing contacts.json:', error);
            }
        })
        .catch(error => {
            console.error('Error loading contacts.json:', error);
        });
}

// Initialize contact form validation
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Simple form validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialize animations
function initAnimations() {
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animateElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}