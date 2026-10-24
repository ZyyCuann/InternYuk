# InternYuk

Prototipe aplikasi karier dengan gamifikasi, ditampilkan di dalam HP pada latar perkotaan 3D. Memuat 42 layar/tampilan untuk profil, jalur karier, materi, kuis, kasus kerja, portofolio, peluang internship, pelacakan lamaran, komunitas, jaringan, dan pesan demo.

Alamat GitHub Pages setelah deployment berhasil: https://zyycuann.github.io/InternYuk/

## Menjalankan lokal

Node.js 18+ diperlukan. Tidak ada dependensi yang perlu diinstal.

```sh
node server.cjs
```

Buka http://127.0.0.1:3223. Mode aplikasi memperbesar layar HP; Mode panggung menampilkan komposisi di tengah kota. Seret latar untuk mengubah sudut kota. Gulir dan klik layar HP untuk memakai aplikasi.

## Pengujian

```sh
node tests/model.test.mjs
```

Tes mencakup rekomendasi berbasis aturan, XP unik, pengulangan kuis/kasus, progres per jalur, validasi lamaran, duplikat posisi, timeline status, notifikasi, serta streak.

## Deployment

Workflow .github/workflows/pages.yml menguji model lalu menerbitkan hanya folder dist. GitHub Actions menerbitkan aplikasi langsung dari dist. Publikasi dari branch main, folder /(root), juga didukung: index.html pada folder utama menggunakan basis aset ./dist/. Setiap push ke main memicu deployment berikutnya. Tidak diperlukan server Node.js pada GitHub Pages karena aplikasi berjalan statis di browser.

## Batas prototipe

Login, pembacaan CV contoh, rekomendasi, perusahaan/lowongan, lamaran, pesan dan sertifikat merupakan simulasi lokal. Tidak ada pengiriman ke perusahaan atau pemrosesan CV oleh AI. CV pribadi hanya dipilih sebagai metadata; isi berkas tidak diunggah atau disimpan. Profil dan progres disimpan di localStorage pada browser pengguna. Gunakan data contoh saat mencoba di perangkat bersama.

Pencapaian berasal dari aktivitas: modul lulus 150 XP sekali, kasus lulus 200 XP sekali per jalur, profil lengkap 50 XP sekali. Skor dan indeks latihan bukan kredensial resmi atau prediksi diterima kerja.

Lihat [peta alur](FLOW.md) dan [atribusi aset](ATTRIBUTION.md). Gambar referensi pribadi dan file kerja lokal tidak disertakan dalam repositori ini.
