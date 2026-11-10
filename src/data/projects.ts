import type { Project } from '@/types/content';

export const projects: Project[] = [
  {
    id: 'f1-kalkulator',
    phaseId: 'f1',
    title: 'Calculator',
    description:
      'Program kalkulator sederhana yang menerima dua angka dan satu operator, lalu menampilkan hasil perhitungannya.',
    goals: [
      'Berlatih input dan output dengan scanf dan printf.',
      'Menerapkan operator aritmatika.',
      'Memilih operasi dengan switch atau if-else.',
    ],
    technologies: ['C', 'stdio.h'],
    difficulty: 'Easy',
    requirements: [
      'Mendukung operasi +, -, *, dan /.',
      'Menolak pembagian dengan nol dan menampilkan pesan yang jelas.',
      'Menampilkan hasil dengan format yang rapi.',
    ],
    checklist: [
      'Membaca dua angka dari pengguna',
      'Membaca operator',
      'Menghitung hasil sesuai operator',
      'Menangani pembagian dengan nol',
      'Menguji minimal lima kombinasi input',
    ],
  },
  {
    id: 'f1-konversi-suhu',
    phaseId: 'f1',
    title: 'Temperature Converter',
    description:
      'Program yang mengonversi suhu antara Celsius, Fahrenheit, dan Kelvin berdasarkan pilihan pengguna.',
    goals: [
      'Memakai tipe data float atau double dengan benar.',
      'Menerapkan rumus konversi dalam kode.',
      'Membuat menu pilihan sederhana.',
    ],
    technologies: ['C', 'stdio.h'],
    difficulty: 'Easy',
    requirements: [
      'Mendukung konversi Celsius ke Fahrenheit dan Kelvin, serta sebaliknya.',
      'Menampilkan hasil dengan dua angka di belakang koma.',
      'Menolak pilihan menu yang tidak valid.',
    ],
    checklist: [
      'Membuat menu pilihan konversi',
      'Membaca nilai suhu',
      'Menerapkan rumus konversi',
      'Memformat output dua desimal',
      'Menangani pilihan menu tidak valid',
    ],
  },
  {
    id: 'f1-kasir-sederhana',
    phaseId: 'f1',
    title: 'Simple Cashier',
    description:
      'Program kasir yang menghitung total belanja dari beberapa barang, menerapkan diskon, dan menghitung kembalian.',
    goals: [
      'Memakai loop untuk input berulang.',
      'Menggabungkan variabel, operator, dan percabangan.',
      'Menyusun program menjadi beberapa fungsi.',
    ],
    technologies: ['C', 'stdio.h'],
    difficulty: 'Medium',
    requirements: [
      'Menerima harga dan jumlah untuk setiap barang sampai pengguna berhenti.',
      'Memberi diskon jika total belanja melewati batas tertentu.',
      'Menghitung kembalian dan menolak pembayaran yang kurang.',
    ],
    checklist: [
      'Membaca daftar barang dengan loop',
      'Menghitung subtotal dan total',
      'Menerapkan aturan diskon',
      'Menghitung kembalian',
      'Menangani pembayaran yang kurang',
    ],
  },
  {
    id: 'f1-cek-bilangan-prima',
    phaseId: 'f1',
    title: 'Prime Number Checker',
    description:
      'Program yang memeriksa apakah sebuah bilangan bulat termasuk bilangan prima.',
    goals: [
      'Menerapkan loop dan percabangan bersama-sama.',
      'Memahami kondisi berhenti pada loop.',
      'Mengoptimalkan pengecekan dengan batas akar kuadrat.',
    ],
    technologies: ['C', 'stdio.h', 'math.h'],
    difficulty: 'Medium',
    requirements: [
      'Menangani bilangan kurang dari 2 sebagai bukan prima.',
      'Memeriksa pembagi hanya sampai akar kuadrat bilangan.',
      'Menampilkan hasil yang jelas kepada pengguna.',
    ],
    checklist: [
      'Membaca bilangan dari pengguna',
      'Menangani bilangan kurang dari 2',
      'Mengecek pembagi dengan loop',
      'Membatasi loop sampai akar kuadrat',
      'Menguji bilangan prima dan bukan prima',
    ],
  },
  {
    id: 'f1-faktorial',
    phaseId: 'f1',
    title: 'Factorial Calculator',
    description:
      'Program yang menghitung faktorial sebuah bilangan menggunakan loop dan fungsi.',
    goals: [
      'Membuat dan memanggil fungsi dengan parameter dan nilai balik.',
      'Menerapkan loop for atau while.',
      'Memahami batas nilai sebuah tipe data.',
    ],
    technologies: ['C', 'stdio.h'],
    difficulty: 'Medium',
    requirements: [
      'Menghitung faktorial dalam sebuah fungsi tersendiri.',
      'Menolak bilangan negatif.',
      'Memakai tipe unsigned long long dan memberi peringatan jika hasil melewati batas.',
    ],
    checklist: [
      'Membuat fungsi faktorial',
      'Membaca bilangan dari pengguna',
      'Menolak bilangan negatif',
      'Menangani batas tipe data',
      'Menguji 0!, 1!, 5!, dan 20!',
    ],
  },
];