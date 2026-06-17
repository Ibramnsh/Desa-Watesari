/**
 * Desa Wisata Watesari - Data Loader Module
 * Dynamically fetches and renders Tourism Destinations and UMKM from JSON files
 */

// Global variable to keep track of loaded tourism data (for detail modal display)
window.wisataData = [];

document.addEventListener('DOMContentLoaded', () => {
  loadWisataData();
  loadUmkmData();
});

/**
 * Fetches destinations data from data/wisata.json and renders card elements
 */
async function loadWisataData() {
  const wrapper = document.getElementById('wisata-swiper-wrapper');
  if (!wrapper) return;
  
  try {
    const response = await fetch('data/wisata.json');
    if (!response.ok) throw new Error('Failed to fetch tourism data');
    window.wisataData = await response.json();
    
    wrapper.innerHTML = window.wisataData.map((item) => `
      <div class="swiper-slide wisata-slide">
        <div class="wisata-card">
          <div class="wisata-img-wrap">
            <img src="${item.gambar}" alt="${item.nama}" loading="lazy">
            <span class="wisata-badge">${item.kategori}</span>
          </div>
          <div class="wisata-info-box">
            <span class="wisata-badge-mobile">${item.kategori}</span>
            <h3 class="wisata-title">${item.nama}</h3>
            <p class="wisata-desc">${item.deskripsi}</p>
            <button class="btn-card wisata-btn" data-id="${item.id}">Lihat Detail</button>
          </div>
        </div>
      </div>
    `).join('');
    
    // Dispatch custom event to initialize card specific interactions (modal display)
    document.dispatchEvent(new CustomEvent('wisataLoaded'));
  } catch (error) {
    console.error('Error loading wisata data:', error);
    wrapper.innerHTML = `
      <div class="text-center" style="padding: 3rem 1rem; width: 100%;">
        <p style="color: var(--primary); font-weight: 500;">Gagal memuat destinasi wisata. Silakan hubungi pengelola atau coba lagi nanti.</p>
      </div>
    `;
  }
}

/**
 * Fetches UMKM data from data/umkm.json and renders card elements
 */
async function loadUmkmData() {
  const grid = document.getElementById('umkm-grid');
  if (!grid) return;
  
  try {
    const response = await fetch('data/umkm.json');
    if (!response.ok) throw new Error('Failed to fetch UMKM data');
    const data = await response.json();
    
    grid.innerHTML = data.map((item) => `
      <div class="umkm-card reveal">
        <div class="umkm-img-wrap">
          <img src="${item.gambar}" alt="${item.nama}" loading="lazy">
          <div class="umkm-owner">Pemilik: ${item.pemilik}</div>
        </div>
        <div class="umkm-body">
          <h3 class="umkm-title">${item.nama}</h3>
          <div class="umkm-products">${item.produk}</div>
          <p class="umkm-desc">${item.deskripsi}</p>
          <a href="${item.kontak}" target="_blank" rel="noopener noreferrer" class="btn-wa">
            <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: currentColor;"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.688 2.02 14.225.993 11.602.993c-5.434 0-9.858 4.37-9.863 9.8-.001 1.838.484 3.636 1.406 5.218L2.17 21.848l6.02-1.579c-.001.001 0 0 0 0zM17.848 14.5c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.8.99-.98 1.18-.18.19-.36.21-.68.05-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.87-1.76-2.18-.18-.32-.02-.49.14-.65.15-.14.32-.37.48-.56.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.7-.98-2.34-.26-.63-.52-.55-.71-.55-.18-.01-.4-.01-.61-.01-.21 0-.56.08-.85.4-.29.32-1.13 1.1-1.13 2.68 0 1.58 1.15 3.11 1.31 3.32.16.21 2.26 3.45 5.48 4.84.76.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.89-.77 2.15-1.52.27-.75.27-1.4.19-1.52-.08-.12-.3-.19-.62-.35z"/></svg>
            Hubungi via WhatsApp
          </a>
        </div>
      </div>
    `).join('');
    
    // Dispatch custom event to initialize UMKM specific features if any
    document.dispatchEvent(new CustomEvent('umkmLoaded'));
  } catch (error) {
    console.error('Error loading umkm data:', error);
    grid.innerHTML = `
      <div class="text-center" style="grid-column: 1 / -1; padding: 3rem 1rem;">
        <p style="color: var(--primary); font-weight: 500;">Gagal memuat produk UMKM. Silakan hubungi pengelola atau coba lagi nanti.</p>
      </div>
    `;
  }
}
