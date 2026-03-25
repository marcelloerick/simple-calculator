# Simple Calculator Project

Sebuah proyek kalkulator berbasis web yang dirancang untuk meniru perilaku dan logika operasional dari kalkulator fisik klasik. Proyek ini dibangun dengan fokus pada arsitektur kode yang bersih.

## Fitur Utama
- Continuous Chaining Operations: Mendukung perhitungan berantai secara langsung tanpa harus menekan tombol sama dengan (`=`) terlebih dahulu (misal: `5 + 3 * 2` akan langsung mengeksekusi `5 + 3` saat `*` ditekan).
- Scientific Notation Fallback: Penanganan otomatis (*overflow*) menggunakan notasi 'e' jika angka hasil melebihi batas layar, persis seperti kalkulator fisik sungguhan.
- Dark Mode UI: Antarmuka modern yang nyaman di mata dengan palet warna gelap.
- Keyboard Support: Pengguna dapat sepenuhnya mengoperasikan kalkulator menggunakan *numpad* atau *keyboard* laptop.

## Arsitektur Proyek (Separation of Concerns)
Proyek ini secara ketat memisahkan peran masing-masing bahasa pemrograman:
- `index.html`: Murni berisi struktur kerangka tanpa gaya atau logika (bebas dari atribut `onclick`).
- `style.css`: Mengatur tata letak menggunakan CSS Grid dan Flexbox untuk antarmuka yang responsif.
- `script.js`: Menangani interaksi DOM (Document Object Model) dan event listeners.
- `src/utils/math.js`: Memisahkan fungsi matematika inti menggunakan standar ES6 Modules.

## Cara Menjalankan Proyek
Karena proyek ini menggunakan ES6 Modules (`import`/`export`), ia harus dijalankan melalui local server.

1. *Clone repository* ini ke komputer lokal.
2. Pastikan kamu memiliki [Node.js](https://nodejs.org/) terinstal.
3. Buka terminal di direktori proyek dan jalankan Live Server:
   npx live-server