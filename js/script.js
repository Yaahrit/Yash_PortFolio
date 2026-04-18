// Initialize Libraries
document.addEventListener('DOMContentLoaded', () => {
    // Typed.js Initialization
    new Typed('#typed', {
        strings: ['Java Backend Developer', 'Spring Boot Expert', 'Problem Solver', 'Lifetime Student'],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true,
        backDelay: 1500
    });

    // Set Dynamic Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // AOS Initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // Progress Bar Animation Logic
    const skillSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.progress-bar-fill');

    if (skillSection && skillBars.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach(bar => {
                        const level = bar.getAttribute('data-level');
                        bar.style.width = level;
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(skillSection);
    }

    // Mobile Navbar Auto-Close
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const menuToggle = document.getElementById('navbarNav');
    
    if (menuToggle && typeof bootstrap !== 'undefined') {
        const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });
        navLinks.forEach((l) => {
            l.addEventListener('click', () => {
                if (window.innerWidth < 992 && menuToggle.classList.contains('show')) {
                    bsCollapse.hide();
                }
            });
        });
    }
});

// Unified Scroll Logic
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Scroll progress bar
    const scrolled = (winScroll / height) * 100;
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) scrollProgress.style.width = scrolled + '%';

    // Show/hide scroll-to-top button
    const btn = document.getElementById('scrollTopBtn');
    if (btn) {
        if (winScroll > 400) {
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
            btn.style.transform = 'translateY(0)';
        } else {
            btn.style.opacity = '0';
            btn.style.pointerEvents = 'none';
            btn.style.transform = 'translateY(20px)';
        }
    }

    // Scroll Spy: Active Link Highlighting
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href*=${sectionId}]`);

        if (winScroll > sectionTop && winScroll <= sectionTop + sectionHeight) {
            if (navLink) navLink.classList.add('active');
        } else {
            if (navLink) navLink.classList.remove('active');
        }
    });

    // Refresh AOS on scroll to ensure smooth reveal
    if (typeof AOS !== 'undefined') AOS.refresh();
});

// Scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Contact form submission
const contactForm = document.getElementById("contact-form");
const contactSuccess = document.getElementById("contact-success");

if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');

        // Loading state
        submitBtn.disabled = true;
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';

        // Simulate network delay
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;

            // Hide form and show success state
            contactForm.classList.add('d-none');
            contactSuccess.classList.remove('d-none');
            
            // Auto-refresh/reset after 10 seconds if needed, or leave it to User's 'Send Another'
        }, 1500);
    });
}

