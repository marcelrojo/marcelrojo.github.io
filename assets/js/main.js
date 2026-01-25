/* ========================================
   MARCEL ROJEWSKI - PERSONAL WEBSITE
   Main JavaScript File
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all modules
    initNavigation();
    initSmoothScroll();
    initAnimations();
    
});

/* ----------------------------------------
   NAVIGATION
   ---------------------------------------- */

function initNavigation() {
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    
    // Add scrolled class to header on scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Close mobile menu on link click
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
    
    // Update active nav link on scroll
    updateActiveNavOnScroll();
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ----------------------------------------
   SMOOTH SCROLL
   ---------------------------------------- */

function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ----------------------------------------
   ANIMATIONS
   ---------------------------------------- */

function initAnimations() {
    // Don't use animations - keep it simple
    // All content is visible by default
}

/* ----------------------------------------
   THEME TOGGLE (Optional - for future use)
   ---------------------------------------- */

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) return;
    
    // Check for saved preference
    const savedTheme = localStorage.getItem('pref-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light') {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
    } else if (savedTheme === 'dark' || prefersDark) {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark')) {
            document.body.classList.remove('dark');
            document.body.classList.add('light');
            localStorage.setItem('pref-theme', 'light');
        } else {
            document.body.classList.add('dark');
            document.body.classList.remove('light');
            localStorage.setItem('pref-theme', 'dark');
        }
    });
}

/* ----------------------------------------
   UTILITY FUNCTIONS
   ---------------------------------------- */

// Debounce function for performance
function debounce(func, wait = 20) {
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

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
