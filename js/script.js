// ===================================
// FLOWMETRICS ANALYTICS - JAVASCRIPT
// Basato su research Perplexity 2025
// Funzionalità interattive ottimizzate
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initPricingToggle();
    initFAQAccordion();
    initSmoothScrolling();
    initFormValidation();
    initModal();
    initScrollEffects();
    initLazyLoading();
    initInteractiveDashboard();
    initHeroDesaturation();
});

// Mobile Navigation Menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Pricing Toggle with Discount Calculation
function initPricingToggle() {
    const toggleInput = document.getElementById('pricing-toggle');
    const monthlyAmounts = document.querySelectorAll('.amount.monthly');
    const annualAmounts = document.querySelectorAll('.amount.annual');
    
    if (toggleInput && monthlyAmounts.length > 0 && annualAmounts.length > 0) {
        toggleInput.addEventListener('change', function() {
            const isAnnual = this.checked;
            
            monthlyAmounts.forEach(amount => {
                amount.style.display = isAnnual ? 'none' : 'inline';
            });
            
            annualAmounts.forEach(amount => {
                amount.style.display = isAnnual ? 'inline' : 'none';
            });
            
            // Track pricing toggle interaction for analytics
            trackEvent('pricing_toggle', {
                billing_cycle: isAnnual ? 'annual' : 'monthly',
                discount_applied: isAnnual ? '20%' : '0%'
            });
        });
    }
}

// FAQ Accordion
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    
                    // Track FAQ interaction
                    const faqQuestion = question.querySelector('h3').textContent;
                    trackEvent('faq_open', {
                        question: faqQuestion.substring(0, 50) // Limit length
                    });
                }
            });
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#" or empty
            if (href === '#' || href === '') return;
            
            // Skip if href refers to a tab or other non-section element
            if (href === '#contact-modal' || href.startsWith('/')) return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20; // 20px extra spacing
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Track navigation click
                trackEvent('navigation_click', {
                    destination: targetId
                });
            }
        });
    });
}

// Form Validation
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const formMessage = document.getElementById('contact-form-message');
            
            // Reset previous messages
            formMessage.className = 'form-message';
            formMessage.style.display = 'none';
            
            // Validate form
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Validate email
            const emailField = document.getElementById('contact-email');
            if (emailField && emailField.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value.trim())) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (isValid) {
                // Show success message
                formMessage.textContent = 'Grazie per averci contattato! Ti risponderemo quanto prima.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                
                // Track form submission
                trackEvent('contact_form_submit', {
                    contact_reason: formData.get('reason')
                });
                
                // Reset form
                contactForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            } else {
                // Show error message
                formMessage.textContent = 'Per favore, compila tutti i campi obbligatori.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
            }
        });
        
        // Remove error class on input
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    }
}

// Modal Functionality
function initModal() {
    const modal = document.getElementById('contact-modal');
    const openModalButtons = document.querySelectorAll('a[href="#contact"]');
    const closeModalButton = document.querySelector('.close-modal');
    
    // Open modal
    openModalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            
            // Track modal open
            trackEvent('contact_modal_open');
        });
    });
    
    // Close modal
    if (closeModalButton) {
        closeModalButton.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore background scrolling
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add/remove shadow based on scroll position
        if (currentScrollY > 10) {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Animate elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.benefit-item, .feature-item, .pricing-card');
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// Analytics Tracking (placeholder function)
function trackEvent(eventName, eventData) {
    // This is a placeholder for analytics tracking
    // In a real implementation, this would send data to Google Analytics, Mixpanel, etc.
    console.log('Event tracked:', eventName, eventData);
    
    // Example implementation with Google Analytics 4:
    // gtag('event', eventName, eventData);
}

// Performance Optimization - Debounce Function
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Performance Optimization - Throttle Function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Lightweight Interactive Dashboard Functionality
function initInteractiveDashboard() {
    // Simple number animation for metrics
    function animateNumbers() {
        const metricNumbers = document.querySelectorAll('.metric-number[data-target]');
        
        metricNumbers.forEach(element => {
            const target = parseInt(element.dataset.target);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current).toLocaleString('it-IT');
            }, 16);
        });
    }
    
    // Simple tab switching
    function initTabSwitching() {
        const tabs = document.querySelectorAll('.dashboard-tab');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Initialize dashboard when visible
    const dashboard = document.querySelector('.dashboard-css-pure');
    if (dashboard) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    initTabSwitching();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(dashboard);
    }
}

// Add CSS class for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .error {
        border-color: #f5c6cb !important;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Hero Gradual Desaturation Effect
function initHeroDesaturation() {
    const heroBg = document.querySelector('.hero-bg');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroBg && heroContent) {
        console.log('Hero effect initialized'); // Debug log
        
        // Get the center position of hero content
        function getContentCenter() {
            const rect = heroContent.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };
        }
        
        // Calculate distance from mouse to content center
        function calculateDistance(mouseX, mouseY) {
            const center = getContentCenter();
            const dx = mouseX - center.x;
            const dy = mouseY - center.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
        
        // Apply effect based on distance with smooth easing
        function applyEffect(distance) {
            const maxDistance = 400; // Maximum distance for effect
            const rawIntensity = Math.max(0, Math.min(1, 1 - (distance / maxDistance)));
            
            // Apply smooth easing function (ease-out cubic)
            const intensity = 1 - Math.pow(1 - rawIntensity, 3);
            
            // Apply only desaturation to background (100% max)
            const desaturationLevel = intensity * 1.0; // Max 100% desaturation
            const filterValue = intensity > 0.05
                ? `grayscale(${desaturationLevel})`
                : 'none';
            
            // Apply zoom-out effect (returning to normal from initial 3% zoom-in)
            const scale = 1.03 - (intensity * 0.03); // From 1.03 to 1.0 (3% zoom-out)
            const transformValue = `scale(${scale})`;
            
            heroBg.style.filter = filterValue;
            heroBg.style.transform = transformValue;
        }
        
        // Mouse move handler with throttling for performance
        let ticking = false;
        document.addEventListener('mousemove', function(e) {
            if (!ticking) {
                requestAnimationFrame(function() {
                    const distance = calculateDistance(e.clientX, e.clientY);
                    applyEffect(distance);
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Initial state - no filter applied
        heroBg.style.filter = 'none';
    } else {
        console.log('Hero background or content not found'); // Debug log
    }
}