// Variable Declarations
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const backToTopButton = document.getElementById('backToTop');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

// ===================================
// 1. SCROLL EVENTS & NAVBAR MANAGEMENT
// ===================================

window.addEventListener('scroll', () => {
    // Navbar shrink and Back-to-Top button visibility
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        backToTopButton.classList.add('show');
    } else {
        navbar.classList.remove('scrolled');
        backToTopButton.classList.remove('show');
    }

    // Active link highlight
    let current = 'home'; // Default to home
    const scrollPosition = window.scrollY + 80; // Offset for fixed nav bar

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Determine which section is currently in the viewport
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    // Update active class on nav links
    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active-link');
        }
    });
});

// ===================================
// 2. MOBILE MENU TOGGLE
// ===================================

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Only close if the menu is open (for mobile)
        if (navMenu.classList.contains('active')) {
             navMenu.classList.remove('active');
             hamburger.classList.remove('active');
        }
    });
});

// ===================================
// 3. SMOOTH SCROLL & BACK TO TOP
// ===================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Calculate scroll position accounting for fixed navbar height
            const offsetTop = targetSection.offsetTop - (navbar.clientHeight + 10); 
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// 4. MENU FILTER FUNCTIONALITY
// ===================================

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and add to the clicked one
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        // Hide and filter items with animation
        menuItems.forEach(item => {
            // Fade-out animation start
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            
            // Wait for the animation to finish (300ms from CSS)
            setTimeout(() => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    
                    // Fade-in animation start
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10); 
                } else {
                    item.style.display = 'none';
                }
            }, 300); 
        });
    });
});

// ===================================
// 5. INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ===================================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Triggers when 10% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Apply the CSS animation defined by keyframes
            entry.target.style.animation = 'slideIn 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all relevant elements for the initial load animation
document.querySelectorAll('.feature-item, .menu-item, .gallery-item').forEach(item => {
    observer.observe(item);
});