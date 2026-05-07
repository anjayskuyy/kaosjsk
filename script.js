// ========== DATA STORE ==========
let DB = {
  services: [],
  team: [],
  bookings: [],
  customers: [],
  testimonials: []
};

let SETTINGS = {
  nameFirst: 'Serene',
  nameLast: 'Touch',
  address: 'Jl. Gajahmada No. 45, Semarang',
  phone: '+62 822-1234-5678',
  email: 'hello@serenetouch.id',
  hoursWeekday: '09:00 – 21:00',
  hoursSat: '09:00 – 21:00',
  hoursSun: '10:00 – 19:00',
  timeSlots: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '19:00', '20:00'],
  waTemplate: `Halo {{bisnis}}! 👋\n\nSaya ingin melakukan pemesanan:\n\n👤 Nama: {{nama}}\n📱 No. HP: {{hp}}\n💆 Layanan: {{layanan}}\n👩‍⚕️ Terapis: {{terapis}}\n📅 Tanggal: {{tanggal}}\n⏰ Jam: {{jam}}\n📝 Catatan: {{catatan}}\n\nMohon konfirmasinya. Terima kasih!`
};

// ========== RENDER FUNCTIONS ==========
function renderWebsite() {
  renderServices();
  renderTeam();
  renderTestimonials();
  renderBookingOptions();
  renderFooter();
  applySettingsToUI();
}

function renderServices() {
  const container = document.getElementById('services-display');
  if (!container) return;
  
  container.innerHTML = DB.services.filter(s => s.active).map(s => `
    <div class="service-card">
      <div class="service-icon">${s.icon || '💆'}</div>
      <div class="service-name">${s.name}</div>
      <div class="service-desc">${s.desc || ''}</div>
      <div class="service-duration">⏱ ${s.duration} Menit</div>
      <div class="service-price">Rp ${(s.price || 0).toLocaleString('id-ID')} <span>/ sesi</span></div>
    </div>
  `).join('');
}

function renderTeam() {
  const container = document.getElementById('team-display');
  if (!container) return;
  
  const shortDays = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  
  container.innerHTML = DB.team.filter(t => t.status === 'aktif').map(t => {
    const schedule = t.schedule || { days: [], slots: [] };
    const hariAktif = schedule.days && schedule.days.length 
      ? schedule.days.map(d => `<span style="display:inline-block;padding:0.15rem 0.45rem;background:rgba(184,151,90,0.12);border-radius:50px;font-size:0.65rem;margin:0.1rem;">${shortDays[d]}</span>`).join('')
      : '';
    
    return `
      <div class="team-card">
        <div class="team-photo">
          ${t.photo ? `<img src="${t.photo}" alt="${t.name}">` : `<span class="emoji-placeholder">${t.emoji || '👤'}</span>`}
          <span class="cert-badge">${t.cert || 'BNSP'}</span>
        </div>
        <div class="team-info">
          <div class="team-name">${t.name}</div>
          <div class="team-role">${t.spec || ''}</div>
          <div class="team-spec">${t.exp || 0} tahun pengalaman · Rating ${t.rating || 5}★</div>
          <div style="margin-top:0.6rem;">${hariAktif}</div>
        </div>
      </div>
    `;
  }).join('');
  
  // Update stats
  const statsTherapists = document.getElementById('stat-therapists-count');
  if (statsTherapists) statsTherapists.textContent = DB.team.filter(t => t.status === 'aktif').length;
}

function renderTestimonials() {
  const container = document.getElementById('testi-display');
  if (!container) return;
  
  container.innerHTML = DB.testimonials.filter(t => t.show).slice(0, 6).map(t => `
    <div class="testi-card">
      <div class="testi-stars">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
      <div class="testi-text">"${t.text}"</div>
      <div class="testi-author">
        <div class="testi-avatar">${t.name ? t.name[0].toUpperCase() : '?'}</div>
        <div>
          <div class="testi-name">${t.name}</div>
          <div class="testi-loc">${t.loc || 'Semarang'}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderBookingOptions() {
  const serviceSelect = document.getElementById('b-service');
  const therapistSelect = document.getElementById('b-therapist');
  
  if (serviceSelect) {
    serviceSelect.innerHTML = '<option value="">-- Pilih Layanan --</option>' + 
      DB.services.filter(s => s.active).map(s => `<option value="${s.name}">${s.name} – Rp ${(s.price || 0).toLocaleString('id-ID')}</option>`).join('');
  }
  
  if (therapistSelect) {
    therapistSelect.innerHTML = '<option value="">-- Pilih Terapis --</option>' + 
      DB.team.filter(t => t.status === 'aktif').map(t => `<option value="${t.id}">${t.emoji || '👤'} ${t.name} · ${(t.spec || '').split(',')[0]}</option>`).join('');
  }
}

function renderFooter() {
  const footerServices = document.getElementById('footer-services');
  if (footerServices) {
    footerServices.innerHTML = DB.services.slice(0, 5).map(s => `<li><a href="#services">${s.name}</a></li>`).join('');
  }
}

function applySettingsToUI() {
  // Update contact info
  const addressEl = document.getElementById('info-address');
  const phoneEl = document.getElementById('info-phone');
  const emailEl = document.getElementById('info-email');
  const hoursEl = document.getElementById('info-hours');
  
  if (addressEl) addressEl.innerHTML = `<span class="info-item-icon">📍</span> ${SETTINGS.address}`;
  if (phoneEl) phoneEl.innerHTML = `<span class="info-item-icon">📞</span> ${SETTINGS.phone}`;
  if (emailEl) emailEl.innerHTML = `<span class="info-item-icon">📧</span> ${SETTINGS.email}`;
  if (hoursEl) {
    hoursEl.innerHTML = `<span class="info-item-icon">⏰</span><div>
      <div>Senin–Jumat: ${SETTINGS.hoursWeekday}</div>
      <div>Sabtu: ${SETTINGS.hoursSat}</div>
      <div>Minggu: ${SETTINGS.hoursSun}</div>
    </div>`;
  }
  
  // Update footer hours
  const footerWeekday = document.getElementById('footer-hours-weekday');
  const footerSat = document.getElementById('footer-hours-sat');
  const footerSun = document.getElementById('footer-hours-sun');
  if (footerWeekday) footerWeekday.textContent = `Senin–Jumat: ${SETTINGS.hoursWeekday}`;
  if (footerSat) footerSat.textContent = `Sabtu: ${SETTINGS.hoursSat}`;
  if (footerSun) footerSun.textContent = `Minggu: ${SETTINGS.hoursSun}`;
  
  // Update stats customers
  const statsCustomers = document.getElementById('stat-customers-count');
  if (statsCustomers) statsCustomers.textContent = DB.customers.length.toLocaleString() + '+';
}

// ========== BOOKING FUNCTIONS ==========
function getAllSlots() {
  return SETTINGS.timeSlots && SETTINGS.timeSlots.length ? [...SETTINGS.timeSlots].sort() : 
    ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '19:00', '20:00'];
}

function updateTimeSlots() {
  const date = document.getElementById('b-date')?.value;
  const container = document.getElementById('b-time-slots');
  const therapistSelect = document.getElementById('b-therapist');
  if (!container || !date) return;
  
  const selectedTherapistId = therapistSelect?.value ? parseInt(therapistSelect.value) : null;
  let availableSlots = getAllSlots();
  
  if (selectedTherapistId) {
    const therapist = DB.team.find(t => t.id === selectedTherapistId);
    if (therapist?.schedule?.slots?.length) {
      availableSlots = availableSlots.filter(slot => therapist.schedule.slots.includes(slot));
    }
  }
  
  const bookedTimes = new Set(
    DB.bookings.filter(b => b.date === date && b.status !== 'dibatalkan').map(b => b.time)
  );
  
  container.innerHTML = availableSlots.map(slot => {
    const isBooked = bookedTimes.has(slot);
    return `<button type="button" class="time-slot${isBooked ? ' booked' : ''}" 
      data-slot="${slot}" ${isBooked ? 'disabled' : `onclick="selectTimeSlot('${slot}')"`}>
      ${slot}
    </button>`;
  }).join('');
}

function selectTimeSlot(slot) {
  document.getElementById('b-time').value = slot;
  document.querySelectorAll('#b-time-slots .time-slot').forEach(btn => {
    btn.classList.remove('selected');
    if (btn.dataset.slot === slot) btn.classList.add('selected');
  });
}

async function submitBooking() {
  const name = document.getElementById('b-name')?.value.trim();
  const phone = document.getElementById('b-phone')?.value.trim();
  const service = document.getElementById('b-service')?.value;
  const date = document.getElementById('b-date')?.value;
  const time = document.getElementById('b-time')?.value;
  const note = document.getElementById('b-note')?.value.trim();
  const therapistSelect = document.getElementById('b-therapist');
  const therapistId = therapistSelect?.value ? parseInt(therapistSelect.value) : null;
  const therapistName = therapistId ? DB.team.find(t => t.id === therapistId)?.name : '-';
  
  if (!name) { alert('Harap isi nama lengkap!'); return; }
  if (!service) { alert('Harap pilih layanan!'); return; }
  if (!therapistId) { alert('Harap pilih terapis!'); return; }
  if (!date) { alert('Harap pilih tanggal!'); return; }
  if (!time) { alert('Harap pilih jam!'); return; }
  
  const bookingData = {
    name, phone, service, therapist: therapistName, date, time, note,
    status: 'menunggu',
    created_at: new Date().toISOString()
  };
  
  // Simpan ke API
  if (typeof window.saveBookingToAPI === 'function') {
    const result = await window.saveBookingToAPI(bookingData);
    if (!result) {
      alert('Gagal menyimpan booking. Silakan coba lagi.');
      return;
    }
  }
  
  // Reset form
  document.getElementById('b-name').value = '';
  document.getElementById('b-phone').value = '';
  document.getElementById('b-note').value = '';
  document.getElementById('b-service').selectedIndex = 0;
  if (therapistSelect) therapistSelect.selectedIndex = 0;
  document.getElementById('b-time').value = '';
  
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('b-date').value = today;
  updateTimeSlots();
  
  // Kirim WA
  const bulanNama = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const [y, m, d] = date.split('-');
  const tglFormatted = `${parseInt(d)} ${bulanNama[parseInt(m) - 1]} ${y}`;
  
  const waMsg = SETTINGS.waTemplate
    .replace(/{{bisnis}}/g, SETTINGS.name || 'Serene Touch')
    .replace(/{{nama}}/g, name)
    .replace(/{{hp}}/g, phone || '-')
    .replace(/{{layanan}}/g, service)
    .replace(/{{terapis}}/g, therapistName)
    .replace(/{{tanggal}}/g, tglFormatted)
    .replace(/{{jam}}/g, time)
    .replace(/{{catatan}}/g, note || '-');
  
  const therapist = DB.team.find(t => t.id === therapistId);
  let targetPhone = therapist?.wa || SETTINGS.phone || '';
  const rawPhone = targetPhone.replace(/\D/g, '');
  const waNumber = rawPhone.startsWith('0') ? '62' + rawPhone.slice(1) : rawPhone;
  
  const msgDiv = document.getElementById('b-msg');
  if (msgDiv) {
    msgDiv.style.display = 'block';
    setTimeout(() => { msgDiv.style.display = 'none'; }, 3000);
  }
  
  window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(waMsg)}`, '_blank');
}

// ========== NAVIGATION ==========
function openMobileMenu() {
  document.getElementById('nav-mobile-menu')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  document.getElementById('nav-mobile-menu')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ========== INITIALIZATION ==========
function setMinDates() {
  const today = new Date().toISOString().split('T')[0];
  const dateInput = document.getElementById('b-date');
  if (dateInput) {
    dateInput.min = today;
    if (!dateInput.value) dateInput.value = today;
  }
}

window.addEventListener('scroll', () => {
  document.getElementById('main-nav')?.classList.toggle('scrolled', window.scrollY > 60);
});

document.addEventListener('DOMContentLoaded', () => {
  setMinDates();
  
  // Event listeners
  const dateInput = document.getElementById('b-date');
  const therapistSelect = document.getElementById('b-therapist');
  if (dateInput) dateInput.addEventListener('change', updateTimeSlots);
  if (therapistSelect) therapistSelect.addEventListener('change', updateTimeSlots);
});
// ========== EXPORT GLOBAL FUNCTIONS ==========
window.renderWebsite = renderWebsite;
window.updateTimeSlots = updateTimeSlots;
window.submitBooking = submitBooking;
window.openMobileMenu = openMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.selectTimeSlot = selectTimeSlot;

// Data getter untuk admin
window.getDB = () => DB;
window.getSettings = () => SETTINGS;

// Ekspos DB dan SETTINGS ke window agar api.js bisa mengupdate langsung
window.DB = DB;
window.SETTINGS = SETTINGS;
