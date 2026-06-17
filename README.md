# Website Profil Desa Wisata Watesari

Website profil modern, elegan, dan profesional yang dirancang sebagai media promosi dan informasi untuk mendukung revitalisasi **Desa Wisata Watesari**, Balongbendo, Sidoarjo. Website ini dibuat menggunakan HTML, CSS, dan JavaScript murni tanpa framework tambahan, sehingga sangat cepat, responsif, dan siap dideploy ke layanan hosting statis seperti GitHub Pages.

---

## 🌟 Fitur Utama

- **Desain Premium & Profesional:** Menggunakan skema warna yang elegan (Hijau Tua, Krem, Aksen Emas Lembut) dengan tipografi modern untuk memberikan kesan destinasi wisata berkelas.
- **Dynamic Content Loading:** Data destinasi wisata dan profil UMKM dimuat secara dinamis dari file JSON (`data/wisata.json` & `data/umkm.json`), memudahkan pembaruan konten di masa mendatang tanpa mengubah struktur HTML.
- **Scrollspy & Sticky Navbar:** Navigasi atas yang melekat (sticky) dengan efek blur kaca modern yang secara otomatis menyoroti menu aktif saat pengguna melakukan scroll halaman.
- **Stats Counter Animation:** Animasi perhitungan angka statistik destinasi, UMKM, dan event desa yang berjalan otomatis saat masuk ke dalam viewport.
- **Destinasi Wisata Detail Modal:** Kartu wisata interaktif di mana menekan tombol "Detail Wisata" akan menampilkan modal dialog berisi informasi detail, harga tiket, jam buka, dan lokasi lengkap secara pop-up.
- **Peta Interaktif Sidebar:** Integrasi Google Maps Embed dengan panel navigasi lokasi penting desa yang dapat diklik untuk memperbarui titik fokus peta secara instan.
- **Galeri Foto Lightbox:** Galeri grid/masonry premium dengan efek hover halus. Klik pada foto akan membuka mode lightbox dengan navigasi *Sebelumnya* dan *Berikutnya* serta dukungan keyboard (Tombol Panah & Escape).
- **Formulir Kontak Valid:** Formulir pesan dengan animasi loading tombol dan notifikasi sukses (toast notification) yang meluncur masuk secara elegan setelah pengiriman berhasil.
- **Scroll Reveal:** Animasi transisi masuk yang halus (fade-in-up) untuk elemen situs ketika di-scroll guna meningkatkan kenyamanan pengalaman pengguna.
- **Mobile Responsive:** Tampilan teroptimasi penuh untuk perangkat desktop, tablet, maupun smartphone dengan menu hamburger mobile yang interaktif.
- **SEO Optimized:** Dilengkapi dengan semantic HTML5 dan metadata lengkap (termasuk Open Graph untuk sharing sosial media).

---

## 📁 Struktur Folder

```text
/
├── index.html          # Halaman Utama (Struktur HTML & Meta SEO)
├── README.md           # Dokumentasi Projek
│
├── css/
│   └── style.css       # Custom CSS Variables, Layout, Typography, & Animasi
│
├── js/
│   ├── app.js          # Logika Interaktivitas (Sticky Header, Lightbox, Modals, dll)
│   └── data-loader.js  # Mengambil & merender data dari file JSON
│
├── data/
│   ├── wisata.json     # Data Destinasi Wisata
│   └── umkm.json       # Data Profil UMKM Desa
│
└── assets/
    └── images/         # Aset Gambar Utama (Hero & Foto Destinasi)
```

---

## 🚀 Cara Menjalankan

### Catatan Penting Mengenai CORS:
Karena website ini memuat data secara dinamis dari file JSON lokal menggunakan API `fetch()`, browser modern melarang pemuatan ini langsung melalui protokol `file://` (membuka file `index.html` dengan klik ganda) karena kebijakan keamanan CORS (*Cross-Origin Resource Sharing*).

Untuk menjalankan dan melihat fungsionalitas penuh website ini, Anda perlu membukanya melalui web server lokal.

### Pilihan Cara Menjalankan Secara Lokal:

#### Pilihan 1: Menggunakan Ekstensi VS Code (Sangat Direkomendasikan)
1. Buka folder proyek ini di **Visual Studio Code**.
2. Pasang ekstensi **Live Server** oleh Ritwick Dey.
3. Klik tombol **"Go Live"** di bilah status kanan bawah VS Code, atau klik kanan pada `index.html` dan pilih **"Open with Live Server"**.

#### Pilihan 2: Menggunakan Python
Jika Anda telah memasang Python di sistem Anda, jalankan perintah ini di terminal pada direktori proyek:
```bash
# Untuk Python 3
python -m http.server 8000
```
Lalu buka browser Anda dan akses `http://localhost:8000`.

#### Pilihan 3: Menggunakan Node.js (npx)
Jika Anda menggunakan Node.js, jalankan perintah ini di terminal:
```bash
npx serve
```
Lalu buka browser Anda dan akses alamat lokal yang diberikan.

---

## 🎨 Panduan Desain & Warna

- **Hijau Tua (`#1F4D3F`):** Warna utama, mencerminkan nuansa asri pedesaan, pertanian, dan keberlanjutan.
- **Krem (`#F5F1E8`):** Warna latar belakang sekunder, memberikan nuansa warisan budaya yang hangat dan elegan.
- **Aksen Emas Lembut (`#C7A86B`):** Digunakan untuk border, tombol utama, ikon, dan detail teks penting untuk memberikan kesan premium.
- **Tipografi:** Heading menggunakan font **Montserrat** (tegas, modern) dan Body menggunakan font **Poppins** (bersih, sangat terbaca di layar gadget).
