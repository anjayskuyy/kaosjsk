// ========== GOOGLE SHEETS API CONFIGURATION ==========
// GANTI DENGAN URL APPS SCRIPT ANDA
// Cara mendapatkan URL: Deploy Apps Script -> Web App -> Copy URL
const API_URL = 'https://script.google.com/macros/s/AKfycbzMWu9k8BW0lPVrogO3dgNFD8paNfnDXQ3sdPukqEH4w5FcpLdUeECPglIzLGWpDY8tpw/exec';

// Google Sheets Sheet ID (opsional, untuk debug)
const SHEET_ID = 'AKfycbzMWu9k8BW0lPVrogO3dgNFD8paNfnDXQ3sdPukqEH4w5FcpLdUeECPglIzLGWpDY8tpw';

// Status sync
let isSyncing = false;
let syncInterval = null;
let lastSyncTime = 0;
let syncErrorCount = 0;

// ========== KONEKSI KE GOOGLE SHEETS ==========

/**
 * Fetch semua data dari Google Sheets
 * @returns {Promise<boolean>} - Berhasil atau tidak
 */
async function fetchAllData() {
  if (isSyncing) {
    console.log('⚠️ Sync sedang berlangsung, lewati...');
    return false;
  }
  
  isSyncing = true;
  
  try {
    console.log('🔄 Menyinkronkan data dari Google Sheets...');
    
    const response = await fetch(`${API_URL}?action=GET_ALL_DATA&t=${Date.now()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.success && result.data) {
      // Gunakan window.DB dan window.SETTINGS agar sinkron dengan script.js
      const _DB = window.DB || (typeof DB !== 'undefined' ? DB : null);
      const _SETTINGS = window.SETTINGS || (typeof SETTINGS !== 'undefined' ? SETTINGS : null);

      // Update services
      if (_DB && result.data.services && Array.isArray(result.data.services)) {
        _DB.services = result.data.services.map(s => ({
          id: parseInt(s.id) || Date.now(),
          name: s.name || 'Layanan Baru',
          duration: parseInt(s.duration) || 60,
          price: parseInt(s.price) || 100000,
          desc: s.desc || '',
          icon: s.icon || '💆',
          active: s.active === 'true' || s.active === true
        }));
        console.log(`✅ Loaded ${_DB.services.length} layanan`);
      }
      
      // Update team
      if (_DB && result.data.team && Array.isArray(result.data.team)) {
        _DB.team = result.data.team.map(t => ({
          id: parseInt(t.id) || Date.now(),
          name: t.name || 'Terapis Baru',
          spec: t.spec || '',
          cert: t.cert || 'BNSP',
          exp: parseInt(t.exp) || 1,
          emoji: t.emoji || '👤',
          status: t.status || 'aktif',
          rating: parseFloat(t.rating) || 5,
          wa: t.wa || '',
          photo: t.photo || null,
          schedule: {
            days: t.schedule_days ? t.schedule_days.split(',').map(Number) : [1, 2, 3, 4, 5],
            slots: t.schedule_slots ? t.schedule_slots.split(',') : ((_SETTINGS && _SETTINGS.timeSlots) || [])
          }
        }));
        console.log(`✅ Loaded ${_DB.team.length} terapis`);
      }
      
      // Update bookings
      if (_DB && result.data.bookings && Array.isArray(result.data.bookings)) {
        _DB.bookings = result.data.bookings.map(b => ({
          id: parseInt(b.id) || Date.now(),
          name: b.name || '',
          phone: b.phone || '',
          service: b.service || '',
          therapist: b.therapist || '',
          date: b.date || '',
          time: b.time || '',
          status: b.status || 'menunggu',
          note: b.note || '',
          created_at: b.created_at || new Date().toISOString()
        }));
        console.log(`✅ Loaded ${_DB.bookings.length} bookings`);
      }
      
      // Update customers
      if (_DB && result.data.customers && Array.isArray(result.data.customers)) {
        _DB.customers = result.data.customers.map(c => ({
          id: parseInt(c.id) || Date.now(),
          name: c.name || '',
          phone: c.phone || '',
          email: c.email || '',
          visits: parseInt(c.visits) || 0,
          spend: parseInt(c.spend) || 0
        }));
        console.log(`✅ Loaded ${_DB.customers.length} customers`);
      }
      
      // Update testimonials
      if (_DB && result.data.testimonials && Array.isArray(result.data.testimonials)) {
        _DB.testimonials = result.data.testimonials.map(t => ({
          id: parseInt(t.id) || Date.now(),
          name: t.name || 'Anonim',
          loc: t.loc || 'Semarang',
          rating: parseInt(t.rating) || 5,
          text: t.text || '',
          show: t.show === 'true' || t.show === true
        }));
        console.log(`✅ Loaded ${_DB.testimonials.length} testimonials`);
      }
      
      // Update settings — langsung ke objek window.SETTINGS agar sinkron dengan script.js
      if (_SETTINGS && result.data.settings) {
        if (result.data.settings.nameFirst) _SETTINGS.nameFirst = result.data.settings.nameFirst;
        if (result.data.settings.nameLast) _SETTINGS.nameLast = result.data.settings.nameLast;
        if (result.data.settings.address) _SETTINGS.address = result.data.settings.address;
        if (result.data.settings.phone) _SETTINGS.phone = result.data.settings.phone;
        if (result.data.settings.email) _SETTINGS.email = result.data.settings.email;
        if (result.data.settings.hoursWeekday) _SETTINGS.hoursWeekday = result.data.settings.hoursWeekday;
        if (result.data.settings.hoursSat) _SETTINGS.hoursSat = result.data.settings.hoursSat;
        if (result.data.settings.hoursSun) _SETTINGS.hoursSun = result.data.settings.hoursSun;
        if (result.data.settings.waTemplate) _SETTINGS.waTemplate = result.data.settings.waTemplate;
        
        if (result.data.settings.timeSlots) {
          if (typeof result.data.settings.timeSlots === 'string') {
            _SETTINGS.timeSlots = result.data.settings.timeSlots.split(',');
          } else {
            _SETTINGS.timeSlots = result.data.settings.timeSlots;
          }
        }
        
        _SETTINGS.name = (_SETTINGS.nameFirst + ' ' + _SETTINGS.nameLast).trim();
        console.log(`✅ Loaded settings`);
      }
      
      // Render ulang website
      if (typeof renderWebsite === 'function') {
        renderWebsite();
      }
      
      if (typeof updateTimeSlots === 'function') {
        updateTimeSlots();
      }
      
      // Reset error counter
      syncErrorCount = 0;
      lastSyncTime = Date.now();
      
      console.log('✅ Sinkronisasi selesai!');
      return true;
    } else {
      throw new Error(result.error || 'Unknown error');
    }
  } catch (error) {
    console.error('❌ Sync error:', error);
    syncErrorCount++;
    
    // Jika error terlalu banyak, kurangi interval sync
    if (syncErrorCount > 5) {
      console.warn('⚠️ Terlalu banyak error sync, memperlambat interval...');
      if (syncInterval) {
        clearInterval(syncInterval);
        syncInterval = setInterval(() => fetchAllData(), 60000); // Jadi 1 menit
      }
    }
    
    return false;
  } finally {
    isSyncing = false;
  }
}

/**
 * Simpan booking ke Google Sheets
 * @param {Object} bookingData - Data booking
 * @returns {Promise<boolean>}
 */
async function saveBookingToAPI(bookingData) {
  try {
    const newId = Date.now();
    
    const params = new URLSearchParams({
      action: 'SAVE_BOOKING',
      id: newId,
      name: bookingData.name || '',
      phone: bookingData.phone || '',
      service: bookingData.service || '',
      therapist: bookingData.therapist || '',
      date: bookingData.date || '',
      time: bookingData.time || '',
      status: bookingData.status || 'menunggu',
      note: bookingData.note || '',
      created_at: bookingData.created_at || new Date().toISOString()
    });
    
    console.log('📤 Menyimpan booking ke Google Sheets...');
    
    const response = await fetch(`${API_URL}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Tambahkan ke DB lokal
      DB.bookings.unshift({ id: newId, ...bookingData });
      
      // Update atau tambah customer
      const existingCustomer = DB.customers.find(c => c.phone === bookingData.phone);
      if (existingCustomer) {
        existingCustomer.visits = (existingCustomer.visits || 0) + 1;
      } else if (bookingData.name && bookingData.phone) {
        DB.customers.push({
          id: Date.now() + Math.random(),
          name: bookingData.name,
          phone: bookingData.phone,
          email: '-',
          visits: 1,
          spend: 0
        });
      }
      
      // Update UI
      if (typeof renderWebsite === 'function') {
        renderWebsite();
      }
      
      console.log('✅ Booking berhasil disimpan ke Google Sheets');
      return true;
    } else {
      throw new Error(result.error || 'Gagal menyimpan');
    }
  } catch (error) {
    console.error('❌ Save booking error:', error);
    alert('Gagal menyimpan booking ke server. Silakan coba lagi.');
    return false;
  }
}

/**
 * Update status booking
 * @param {number} id - ID booking
 * @param {string} status - Status baru
 * @returns {Promise<boolean>}
 */
async function updateBookingStatusAPI(id, status) {
  try {
    const params = new URLSearchParams({
      action: 'UPDATE_BOOKING',
      id: id,
      status: status
    });
    
    const response = await fetch(`${API_URL}?${params.toString()}`);
    const result = await response.json();
    
    if (result.success) {
      const booking = DB.bookings.find(b => b.id == id);
      if (booking) booking.status = status;
      
      if (typeof renderWebsite === 'function') {
        renderWebsite();
      }
      
      return true;
    }
    return false;
  } catch (error) {
    console.error('Update status error:', error);
    return false;
  }
}

/**
 * Hapus booking
 * @param {number} id - ID booking
 * @returns {Promise<boolean>}
 */
async function deleteBookingAPI(id) {
  try {
    const params = new URLSearchParams({
      action: 'DELETE_BOOKING',
      id: id
    });
    
    const response = await fetch(`${API_URL}?${params.toString()}`);
    const result = await response.json();
    
    if (result.success) {
      DB.bookings = DB.bookings.filter(b => b.id != id);
      
      if (typeof renderWebsite === 'function') {
        renderWebsite();
      }
      
      return true;
    }
    return false;
  } catch (error) {
    console.error('Delete booking error:', error);
    return false;
  }
}

/**
 * Simpan layanan ke Google Sheets
 * @param {Object} serviceData - Data layanan
 * @returns {Promise<boolean>}
 */
async function saveServiceToAPI(serviceData) {
  try {
    const params = new URLSearchParams({
      action: 'SAVE_SERVICE',
      id: serviceData.id || Date.now(),
      name: serviceData.name,
      duration: serviceData.duration,
      price: serviceData.price,
      desc: serviceData.desc || '',
      icon: serviceData.icon || '💆',
      active: serviceData.active ? 'true' : 'false'
    });
    
    const response = await fetch(`${API_URL}?${params.toString()}`);
    const result = await response.json();
    
    if (result.success) {
      if (serviceData.id) {
        const index = DB.services.findIndex(s => s.id == serviceData.id);
        if (index !== -1) DB.services[index] = serviceData;
      } else {
        DB.services.push({ ...serviceData, id: result.id });
      }
      
      if (typeof renderWebsite === 'function') {
        renderWebsite();
      }
      
      return true;
    }
    return false;
  } catch (error) {
    console.error('Save service error:', error);
    return false;
  }
}

/**
 * Simpan terapis ke Google Sheets
 * @param {Object} therapistData - Data terapis
 * @returns {Promise<boolean>}
 */
async function saveTherapistToAPI(therapistData) {
  try {
    const params = new URLSearchParams({
      action: 'SAVE_THERAPIST',
      id: therapistData.id || Date.now(),
      name: therapistData.name,
      spec: therapistData.spec || '',
      cert: therapistData.cert || 'BNSP',
      exp: therapistData.exp || 1,
      emoji: therapistData.emoji || '👤',
      status: therapistData.status || 'aktif',
      rating: therapistData.rating || 5,
      wa: therapistData.wa || '',
      photo: therapistData.photo || '',
      schedule_days: therapistData.schedule?.days?.join(',') || '1,2,3,4,5',
      schedule_slots: therapistData.schedule?.slots?.join(',') || (SETTINGS.timeSlots || []).join(',')
    });
    
    const response = await fetch(`${API_URL}?${params.toString()}`);
    const result = await response.json();
    
    if (result.success) {
      if (therapistData.id) {
        const index = DB.team.findIndex(t => t.id == therapistData.id);
        if (index !== -1) DB.team[index] = therapistData;
      } else {
        DB.team.push({ ...therapistData, id: result.id });
      }
      
      if (typeof renderWebsite === 'function') {
        renderWebsite();
      }
      
      return true;
    }
    return false;
  } catch (error) {
    console.error('Save therapist error:', error);
    return false;
  }
}

/**
 * Simpan testimoni ke Google Sheets
 * @param {Object} testimonialData - Data testimoni
 * @returns {Promise<boolean>}
 */
async function saveTestimonialToAPI(testimonialData) {
  try {
    const params = new URLSearchParams({
      action: 'SAVE_TESTIMONIAL',
      id: testimonialData.id || Date.now(),
      name: testimonialData.name,
      loc: testimonialData.loc || 'Semarang',
      rating: testimonialData.rating || 5,
      text: testimonialData.text || '',
      show: testimonialData.show ? 'true' : 'false'
    });
    
    const response = await fetch(`${API_URL}?${params.toString()}`);
    const result = await response.json();
    
    if (result.success) {
      if (testimonialData.id) {
        const index = DB.testimonials.findIndex(t => t.id == testimonialData.id);
        if (index !== -1) DB.testimonials[index] = testimonialData;
      } else {
        DB.testimonials.push({ ...testimonialData, id: result.id });
      }
      
      if (typeof renderWebsite === 'function') {
        renderWebsite();
      }
      
      return true;
    }
    return false;
  } catch (error) {
    console.error('Save testimonial error:', error);
    return false;
  }
}

/**
 * Update pengaturan ke Google Sheets
 * @returns {Promise<boolean>}
 */
async function updateSettingsAPI() {
  try {
    const params = new URLSearchParams({
      action: 'UPDATE_SETTINGS',
      nameFirst: SETTINGS.nameFirst || '',
      nameLast: SETTINGS.nameLast || '',
      address: SETTINGS.address || '',
      phone: SETTINGS.phone || '',
      email: SETTINGS.email || '',
      hoursWeekday: SETTINGS.hoursWeekday || '',
      hoursSat: SETTINGS.hoursSat || '',
      hoursSun: SETTINGS.hoursSun || '',
      timeSlots: (SETTINGS.timeSlots || []).join(','),
      waTemplate: SETTINGS.waTemplate || ''
    });
    
    const response = await fetch(`${API_URL}?${params.toString()}`);
    const result = await response.json();
    
    return result.success;
  } catch (error) {
    console.error('Update settings error:', error);
    return false;
  }
}

/**
 * Cek koneksi ke Google Sheets
 * @returns {Promise<boolean>}
 */
async function checkConnection() {
  try {
    const response = await fetch(`${API_URL}?action=CHECK&t=${Date.now()}`, {
      method: 'HEAD',
      timeout: 5000
    });
    return response.ok;
  } catch (error) {
    console.warn('Connection check failed:', error);
    return false;
  }
}

/**
 * Mulai auto sync (default setiap 30 detik)
 * @param {number} intervalMs - Interval dalam milidetik (default 30000)
 */
function startAutoSync(intervalMs = 30000) {
  if (syncInterval) {
    clearInterval(syncInterval);
  }
  
  // Sync pertama kali
  fetchAllData();
  
  // Set interval
  syncInterval = setInterval(() => {
    fetchAllData();
  }, intervalMs);
  
  console.log(`🔄 Auto sync started (interval: ${intervalMs / 1000}s)`);
}

/**
 * Hentikan auto sync
 */
function stopAutoSync() {
  if (syncInterval) {
    clearInterval(syncInterval);
    syncInterval = null;
    console.log('⏹️ Auto sync stopped');
  }
}

/**
 * Sync manual (force refresh)
 */
async function manualSync() {
  console.log('🔄 Manual sync triggered...');
  await fetchAllData();
  
  // Tampilkan notifikasi
  const msgDiv = document.getElementById('b-msg');
  if (msgDiv) {
    const originalText = msgDiv.textContent;
    msgDiv.textContent = '✅ Data berhasil disinkronkan!';
    msgDiv.style.display = 'block';
    setTimeout(() => {
      msgDiv.textContent = originalText;
      msgDiv.style.display = 'none';
    }, 2000);
  }
}

// ========== EXPORT FUNCTIONS ==========
// Untuk digunakan di file lain (index.html, admin.html)
window.API = {
  fetchAllData,
  saveBookingToAPI,
  updateBookingStatusAPI,
  deleteBookingAPI,
  saveServiceToAPI,
  saveTherapistToAPI,
  saveTestimonialToAPI,
  updateSettingsAPI,
  checkConnection,
  startAutoSync,
  stopAutoSync,
  manualSync,
  getSyncStatus: () => ({ isSyncing, lastSyncTime, errorCount: syncErrorCount })
};

// ========== INITIALIZATION ==========
// Auto-start sync saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 API.js loaded, initializing...');
  
  // Cek koneksi
  checkConnection().then(connected => {
    if (connected) {
      console.log('✅ Koneksi ke Google Sheets OK');
      startAutoSync(30000);
    } else {
      console.warn('⚠️ Tidak dapat terhubung ke Google Sheets, menggunakan data lokal');
    }
  });
});

// Event listener untuk online/offline
window.addEventListener('online', () => {
  console.log('🌐 Koneksi kembali online, sync ulang...');
  fetchAllData();
  startAutoSync(30000);
});

window.addEventListener('offline', () => {
  console.log('📴 Koneksi offline, sync dihentikan sementara');
  stopAutoSync();
});
