// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Countdown Timer
function updateCountdown() {
    // Set event date to 30 days from now (you can change this to actual event date)
    const eventDate = new Date();
    eventDate.setDate(eventDate.getDate() + 30);
    eventDate.setHours(9, 0, 0, 0);
    
    const now = new Date();
    const timeDifference = eventDate - now;
    
    if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Scroll Animations
const fadeElements = document.querySelectorAll('.fade-in');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(element => {
    observer.observe(element);
});

// Form Validation and Submission
const signupForm = document.getElementById('signupForm');
const successMessage = document.getElementById('successMessage');

signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous errors
    clearErrors();
    
    // Validate form
    let isValid = true;
    
    // Username validation
    const username = document.getElementById('username');
    if (!username.value.trim()) {
        showError('username', 'Please enter your Roblox username');
        isValid = false;
    } else if (username.value.trim().length < 3) {
        showError('username', 'Username must be at least 3 characters');
        isValid = false;
    }
    
    // Email validation
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError('email', 'Please enter your email address');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Age validation
    const age = document.getElementById('age');
    if (!age.value) {
        showError('age', 'Please select your age group');
        isValid = false;
    }
    
    // Experience validation
    const experience = document.getElementById('experience');
    if (!experience.value) {
        showError('experience', 'Please select your experience level');
        isValid = false;
    }
    
    // If form is valid, show success message
    if (isValid) {
        // In a real application, you would send this data to a server
        console.log('Form submitted:', {
            username: username.value,
            email: email.value,
            age: age.value,
            experience: experience.value,
            motivation: document.getElementById('motivation').value
        });
        
        // Hide form and show success message
        signupForm.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Scroll to success message
        successMessage.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
});

function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        const inputElement = document.getElementById(fieldId);
        if (inputElement) {
            inputElement.style.borderColor = '#FF4444';
        }
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    const inputs = document.querySelectorAll('.signup-form input, .signup-form select');
    inputs.forEach(input => {
        input.style.borderColor = '#e0e0e0';
    });
}

// Real-time validation feedback
document.getElementById('username').addEventListener('blur', function() {
    if (this.value.trim() && this.value.trim().length < 3) {
        showError('username', 'Username must be at least 3 characters');
    }
});

document.getElementById('email').addEventListener('blur', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value.trim() && !emailRegex.test(this.value)) {
        showError('email', 'Please enter a valid email address');
    }
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        navbar.style.background = 'var(--dark-bg)';
    }
});

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--primary-red)';
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const shapes = hero.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.05;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// Button hover sound effect (visual feedback)
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Animate timeline items with stagger
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            timelineObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Form input animations
const formInputs = document.querySelectorAll('.signup-form input, .signup-form select, .signup-form textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.2s';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Console message for developers
console.log('%c🏗️ Roblox Build Day', 'font-size: 24px; font-weight: bold; color: #FF4444;');
console.log('%cWelcome, future builder! See you at Build Day!', 'font-size: 14px; color: #00A2FF;');
