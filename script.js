// FUNGSI HELPER
function scrollToSection(selector) {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
}

function pilihPaket(paket) {
    document.getElementById('modal-daftar').style.display = 'flex';
}

function daftarSiswa(e) {
    e.preventDefault();
    alert('Pendaftaran berhasil! Kami akan menghubungi Anda dalam 24 jam. Terima kasih telah memilih Cosmos Bimbel!');
    document.getElementById('modal-daftar').style.display = 'none';
    e.target.reset();
}

function kirimPesan(e) {
    e.preventDefault();
    alert('Pesan Anda telah dikirim! Tim kami akan merespons dalam 1x24 jam.');
    e.target.reset();
}

// RENDER GURU
function renderTeam() {
    const grid = document.getElementById('team-grid');
    grid.innerHTML = guruData.map(guru => `
        <div class="team-card">
            <div class="team-avatar">${guru.avatar}</div>
            <h3>${guru.name}</h3>
            <p>${guru.subject}</p>
            <div class="team-spec">${guru.experience} pengalaman</div>
            <div class="team-stars">${'⭐'.repeat(Math.round(guru.rating))}</div>
            <p style="font-size:0.85rem;color:var(--muted)">${guru.students}+ siswa</p>
        </div>
    `).join('');
}

// RENDER TESTIMONI
function renderTestimonial() {
    const grid = document.getElementById('testimonial-grid');
    grid.innerHTML = testimonialData.map(testi => `
        <div class="testimonial-card">
            <div class="testimonial-stars">${'⭐'.repeat(testi.rating)}</div>
            <p class="testimonial-text">"${testi.text}"</p>
            <div class="testimonial-author">
                <span class="author-avatar">${testi.avatar}</span>
                <div>
                    <strong>${testi.name}</strong>
                    <small>${testi.school || testi.role}</small>
                </div>
            </div>
        </div>
    `).join('');
}

// RENDER BLOG
function renderBlog() {
    const grid = document.getElementById('blog-grid');
    grid.innerHTML = blogData.map(blog => `
        <div class="blog-card">
            <div class="blog-header">
                <div class="blog-category">${blog.category}</div>
                <h4>${blog.title}</h4>
            </div>
            <div class="blog-body">
                <p class="blog-excerpt">${blog.excerpt}</p>
                <div class="blog-meta">
                    <span>📅 ${blog.date}</span>
                    <span>⏱️ ${blog.readTime}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// COUNTER ANIMATION
function animateCounters() {
    const stats = document.querySelectorAll('.stat-item h3');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 100;
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target.toLocaleString();
                clearInterval(interval);
            } else {
                stat.textContent = Math.floor(current).toLocaleString();
            }
        }, 30);
    });
}

// OBSERVER UNTUK ANIMASI SAAT SCROLL
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

// PARALLAX PLANETS
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.planet').forEach((planet, index) => {
        const speed = (index + 1) * 0.3;
        planet.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// NAVBAR SCROLL EFFECT
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.2)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// SMOOTH SCROLL LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// CLOSE MODAL WHEN CLICKING OUTSIDE
window.addEventListener('click', (e) => {
    const modal = document.getElementById('modal-daftar');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// INIT
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Cosmos Bimbel - Landing Page Loaded!');
    renderTeam();
    renderTestimonial();
    renderBlog();
    
    // Trigger counter saat stats terlihat
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const obs = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                obs.unobserve(statsSection);
            }
        }, { threshold: 0.5 });
        obs.observe(statsSection);
    }
});
