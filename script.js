// Smooth scrolling and navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.2)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Button click handlers
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (this.classList.contains('btn-primary') || this.classList.contains('btn-lg')) {
            alert('Terima kasih! Daftarkan dirimu sekarang melalui form di halaman pendaftaran.');
            // Uncomment untuk redirect ke halaman pendaftaran
            // window.location.href = '#daftar';
        }
    });
});

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
if (navToggle) {
    navToggle.addEventListener('click', () => {
        alert('Mobile menu akan diaktifkan di versi lengkap');
    });
}

// Intersection Observer untuk animasi saat scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards
document.querySelectorAll('.feature-card, .pricing-card, .team-card, .testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    observer.observe(card);
});

// Parallax effect untuk planets
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.planet').forEach((planet, index) => {
        const speed = (index + 1) * 0.3;
        planet.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Counter animation untuk stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter saat stats section terlihat
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = document.querySelectorAll('.stat-item h3');
            statItems.forEach(item => {
                const text = item.textContent;
                const number = parseInt(text);
                if (!isNaN(number)) {
                    animateCounter(item, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Ripple effect untuk buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Cosmos Bimbel Landing Page Loaded!');
});