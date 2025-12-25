/* ==========================================
   AZIMOVA SCHOOL - Main JavaScript
   All interactive functionality
   ========================================== */

// ==========================================
// 1. Initialize AOS Animation Library
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100
    });
});

// ==========================================
// 2. Navbar Scroll Effect
// ==========================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==========================================
// 3. Mobile Menu Toggle
// ==========================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileClose = document.getElementById('mobileClose');

function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

if (mobileOverlay) {
    mobileOverlay.addEventListener('click', toggleMobileMenu);
}

if (mobileClose) {
    mobileClose.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

// ==========================================
// 4. Scroll to Top Button
// ==========================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// 5. Animated Counter
// ==========================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Intersection Observer for counter animation
const counters = document.querySelectorAll('.stat-number[data-count]');

if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ==========================================
// 6. FAQ Accordion
// ==========================================
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ==========================================
// 7. Course Filter (Courses Page)
// ==========================================
function filterCourses(category) {
    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter courses
    const sections = document.querySelectorAll('.course-section');
    
    sections.forEach(section => {
        if (category === 'all') {
            section.style.display = 'block';
        } else {
            if (section.id === category) {
                section.style.display = 'block';
                // Scroll to section
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                section.style.display = 'none';
            }
        }
    });
}

// ==========================================
// 8. Contact Form Handling
// ==========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Validate form
        if (!data.firstName || !data.lastName || !data.phone || !data.language) {
            showNotification('Iltimos, barcha majburiy maydonlarni to\'ldiring', 'error');
            return;
        }

        // Validate phone number
        const phoneRegex = /^[\+]?[0-9]{9,15}$/;
        if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
            showNotification('Iltimos, to\'g\'ri telefon raqam kiriting', 'error');
            return;
        }

        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Yuborilmoqda...</span>';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success modal
            showModal();
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Log data (for testing)
            console.log('Form submitted:', data);
        }, 1500);
    });
}

// ==========================================
// 9. Modal Functions
// ==========================================
function showModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on overlay click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
});

// ==========================================
// 10. Notification System
// ==========================================
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${type === 'success' ? '✓' : '⚠'}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;

    // Add animation keyframes
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.25rem;
                cursor: pointer;
                padding: 0 0.25rem;
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// ==========================================
// 11. Phone Number Formatting
// ==========================================
const phoneInput = document.getElementById('phone');

if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.startsWith('998')) {
            value = '+' + value;
        } else if (value.startsWith('9') && value.length > 1) {
            value = '+998' + value.substring(1);
        } else if (!value.startsWith('+')) {
            value = '+998' + value;
        }

        // Format: +998 90 123 45 67
        if (value.length > 4) {
            value = value.substring(0, 4) + ' ' + value.substring(4);
        }
        if (value.length > 7) {
            value = value.substring(0, 7) + ' ' + value.substring(7);
        }
        if (value.length > 11) {
            value = value.substring(0, 11) + ' ' + value.substring(11);
        }
        if (value.length > 14) {
            value = value.substring(0, 14) + ' ' + value.substring(14);
        }

        e.target.value = value.substring(0, 17);
    });
}

// ==========================================
// 12. Smooth Scroll for Anchor Links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==========================================
// 13. Lazy Loading Images
// ==========================================
const lazyImages = document.querySelectorAll('img[data-src]');

if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// 14. Testimonials Slider (Optional)
// ==========================================
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');

function moveTestimonials(direction) {
    if (testimonialCards.length === 0) return;
    
    currentTestimonial += direction;
    
    if (currentTestimonial < 0) {
        currentTestimonial = testimonialCards.length - 1;
    } else if (currentTestimonial >= testimonialCards.length) {
        currentTestimonial = 0;
    }

    const track = document.querySelector('.testimonials-track');
    if (track) {
        const cardWidth = testimonialCards[0].offsetWidth + 32; // Including gap
        track.style.transform = `translateX(-${currentTestimonial * cardWidth}px)`;
    }
}

// ==========================================
// 15. Current Year in Footer
// ==========================================
document.querySelectorAll('.footer-bottom p').forEach(p => {
    if (p.textContent.includes('©')) {
        p.textContent = p.textContent.replace(/\d{4}/, new Date().getFullYear());
    }
});

// ==========================================
// 16. Active Navigation Link
// ==========================================
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

setActiveNavLink();

// ==========================================
// 17. Preloader (Optional)
// ==========================================
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 500);
    }
});

// ==========================================
// 18. Scroll Progress Indicator (Optional)
// ==========================================
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = progress + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// ==========================================
// 19. Copy to Clipboard (for phone/email)
// ==========================================
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Nusxalandi: ' + text, 'success');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// ==========================================
// 20. Keyboard Navigation
// ==========================================
document.addEventListener('keydown', function(e) {
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// ==========================================
// 21. Form Validation Styles
// ==========================================
document.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('invalid', function() {
        this.style.borderColor = '#ef4444';
    });

    field.addEventListener('input', function() {
        if (this.validity.valid) {
            this.style.borderColor = '';
        }
    });
});

// ==========================================
// 22. Detect User's Preferred Language
// ==========================================
function detectLanguage() {
    const userLang = navigator.language || navigator.userLanguage;
    console.log('User language:', userLang);
    // Can be used to show language-specific content
}

detectLanguage();

// ==========================================
// 23. Check if Open Hours
// ==========================================
function isOpenNow() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday
    const hour = now.getHours();

    // Open Monday-Saturday (1-6), 9:00-21:00
    const isWeekday = day >= 1 && day <= 6;
    const isWorkingHour = hour >= 9 && hour < 21;

    return isWeekday && isWorkingHour;
}

// Update open/closed status
const statusElement = document.querySelector('.contact-card-status');
if (statusElement) {
    if (isOpenNow()) {
        statusElement.textContent = 'Hozir ochiq';
        statusElement.classList.add('open');
        statusElement.classList.remove('closed');
    } else {
        statusElement.textContent = 'Hozir yopiq';
        statusElement.classList.add('closed');
        statusElement.classList.remove('open');
        statusElement.style.background = 'rgba(239, 68, 68, 0.2)';
        statusElement.style.color = '#ef4444';
    }
}

// ==========================================
// 24. Console Welcome Message
// ==========================================
console.log('%c🎓 Azimova School', 'font-size: 24px; font-weight: bold; color: #e94560;');
console.log('%cTil o\'rganish markazi | Language Learning Center', 'font-size: 14px; color: #a0a0a0;');
console.log('%c📞 +998 90 123 45 67', 'font-size: 12px; color: #10b981;');

// ==========================================
// 25. Performance Optimization
// ==========================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply debounced scroll handler
const debouncedScroll = debounce(() => {
    // Additional scroll-based functionality can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ==========================================
// End of JavaScript
// ==========================================
