import type { Project } from '@/types/content';

export const phase2Projects: Project[] = [
  {
    id: 'f2-fizzbuzz',
    phaseId: 'f2',
    title: 'FizzBuzz',
    description:
      'Cetak angka dari 1 sampai N, dengan aturan khusus untuk kelipatan 3, kelipatan 5, dan kelipatan keduanya.',
    goals: [
      'Menerapkan loop dan operator modulus.',
      'Menyusun urutan kondisi if-else dengan benar.',
      'Melatih berpikir sistematis pada aturan sederhana.',
    ],
    technologies: ['C', 'stdio.h'],
    difficulty: 'Easy',
    requirements: [
      'Membaca batas N dari pengguna.',
      'Mencetak "Fizz" untuk kelipatan 3, "Buzz" untuk kelipatan 5, dan "FizzBuzz" untuk kelipatan keduanya.',
      'Mencetak angka itu sendiri untuk bilangan lainnya, satu baris per angka.',
    ],
    checklist: [
      'Membaca nilai N',
      'Membuat loop dari 1 sampai N',
      'Memeriksa kelipatan 15 lebih dulu',
      'Memeriksa kelipatan 3 dan 5',
      'Menguji dengan N = 15 dan N = 30',
    ],
  },
  {
    id: 'f2-generator-bilangan-prima',
    phaseId: 'f2',
    title: 'Prime Number Generator',
    description: 'Cetak seluruh bilangan prima dari 2 sampai batas yang ditentukan pengguna.',
    goals: [
      'Memakai fungsi untuk memisahkan logika pengecekan prima.',
      'Menerapkan nested loop dan pengecekan sampai akar kuadrat.',
      'Menghitung banyaknya bilangan prima yang ditemukan.',
    ],
    technologies: ['C', 'stdio.h'],
    difficulty: 'Medium',
    requirements: [
      'Membuat fungsi adalahPrima yang mengembalikan 1 atau 0.',
      'Mencetak semua bilangan prima sampai batas N.',
      'Menampilkan jumlah bilangan prima yang ditemukan di akhir.',
    ],
    checklist: [
      'Membuat fungsi adalahPrima',
      'Membaca batas N',
      'Mencetak bilangan prima dengan loop',
      'Menghitung jumlah bilangan prima',
      'Menguji dengan N = 30 (hasil: 10 bilangan prima)',
    ],
  },
  {
    id: 'f2-fpb-kpk',
    phaseId: 'f2',
    title: 'GCD dan LCM',
    description:
      'Hitung FPB (GCD) dan KPK (LCM) dari dua bilangan bulat positif yang dimasukkan pengguna.',
    goals: [
      'Memakai algoritma Euclid untuk FPB.',
      'Menurunkan KPK dari FPB.',
      'Memvalidasi input pengguna.',
    ],
    technologies: ['C', 'stdio.h'],
    difficulty: 'Easy',
    requirements: [
      'Membaca dua bilangan bulat positif dan menolak input yang tidak valid.',
      'Menghitung FPB dengan loop while dan operator modulus.',
      'Menghitung KPK dengan rumus a / FPB x b.',
    ],
    checklist: [
      'Membaca dan memvalidasi dua bilangan',
      'Membuat fungsi fpb',
      'Membuat fungsi kpk',
      'Menampilkan kedua hasil',
      'Menguji FPB(48, 18) = 6 dan KPK(48, 18) = 144',
    ],
  },
  {
    id: 'f2-sieve-of-eratosthenes',
    phaseId: 'f2',
    title: 'Sieve of Eratosthenes',
    description:
      'Temukan semua bilangan prima sampai N dengan mencoret kelipatan setiap bilangan prima.',
    goals: [
      'Memahami algoritma yang lebih efisien daripada pengecekan satu per satu.',
      'Mengenal array satu dimensi sebagai penanda (dibahas lengkap di Fase 3).',
      'Membandingkan hasil dengan versi Prime Number Generator.',
    ],
    technologies: ['C', 'stdio.h'],
    difficulty: 'Medium',
    requirements: [
      'Memakai array penanda berukuran N + 1 untuk menandai bilangan komposit.',
      'Mencoret kelipatan i mulai dari i x i untuk setiap bilangan prima i.',
      'Mencetak semua bilangan yang tidak tercoret.',
    ],
    checklist: [
      'Membuat array penanda dan menginisialisasinya',
      'Menandai 0 dan 1 sebagai bukan prima',
      'Mencoret kelipatan setiap bilangan prima',
      'Mencetak bilangan prima yang tersisa',
      'Membandingkan hasil dengan generator biasa untuk N = 100',
    ],
  },
  {
    id: 'f2-algoritma-euclidean',
    phaseId: 'f2',
    title: 'Euclidean Algorithm',
    description:
      'Visualisasikan setiap langkah algoritma Euclid saat mencari FPB, lalu bandingkan versi iteratif dan rekursif.',
    goals: [
      'Memahami algoritma Euclid hingga ke tiap langkahnya.',
      'Membandingkan implementasi iteratif dan rekursif.',
      'Menelusuri algoritma dengan mencetak langkah-langkahnya.',
    ],
    technologies: ['C', 'stdio.h'],
    difficulty: 'Medium',
    requirements: [
      'Membuat fungsi FPB versi iteratif dan versi rekursif.',
      'Mencetak setiap langkah dalam bentuk "a = b x hasilBagi + sisa".',
      'Memastikan kedua versi menghasilkan jawaban yang sama.',
    ],
    checklist: [
      'Membuat fungsi iteratif',
      'Membuat fungsi rekursif',
      'Mencetak tiap langkah perhitungan',
      'Membandingkan kedua hasil',
      'Menguji dengan beberapa pasangan bilangan',
    ],
  },
  {
    id: 'f2-cek-palindrom',
    phaseId: 'f2',
    title: 'Palindrome Checker',
    description:
      'Periksa apakah sebuah bilangan bulat adalah palindrom, yaitu sama saat dibaca dari depan maupun belakang.',
    goals: [
      'Membalik digit bilangan dengan operator % dan /.',
      'Membandingkan hasil dengan bilangan asli.',
      'Menangani kasus khusus dengan tepat.',
    ],
    technologies: ['C', 'stdio.h'],
    difficulty: 'Easy',
    requirements: [
      'Membalik digit bilangan tanpa mengubah teks atau memakai array.',
      'Menganggap bilangan negatif bukan palindrom.',
      'Menampilkan hasil "palindrom" atau "bukan palindrom".',
    ],
    checklist: [
      'Membaca bilangan dari pengguna',
      'Menyalin bilangan asli sebelum dibalik',
      'Membalik digit dengan loop',
      'Membandingkan hasil dan menampilkan pesan',
      'Menguji 121 (palindrom), 123 (bukan), dan 0',
    ],
  },
  {
    id: 'f2-tebak-angka',
    phaseId: 'f2',
    title: 'Number Guessing',
    description:
      'Permainan menebak angka acak dengan petunjuk "terlalu besar" atau "terlalu kecil" dan penghitung jumlah tebakan.',
    goals: [
      'Memakai bilangan acak dengan rand dan srand.',
      'Menggabungkan loop, percabangan, dan input.',
      'Menerapkan ide pencarian biner untuk strategi menebak.',
    ],
    technologies: ['C', 'stdio.h', 'stdlib.h', 'time.h'],
    difficulty: 'Medium',
    requirements: [
      'Membuat angka rahasia 1 sampai 100 dengan srand(time(NULL)) dan rand().',
      'Memberi petunjuk setelah setiap tebakan sampai jawaban benar.',
      'Menampilkan jumlah tebakan saat pemain menang dan menolak input yang bukan angka.',
    ],
    checklist: [
      'Membuat angka acak',
      'Membaca tebakan pemain',
      'Memberi petunjuk besar atau kecil',
      'Menghitung jumlah tebakan',
      'Menangani input yang tidak valid',
    ],
  },
  {
    id: 'f2-fibonacci-rekursif',
    phaseId: 'f2',
    title: 'Recursive Fibonacci',
    description:
      'Hitung bilangan Fibonacci dengan rekursi, lalu amati mengapa versi rekursif naif menjadi sangat lambat.',
    goals: [
      'Menulis fungsi rekursif dengan dua base case.',
      'Membandingkan rekursi dengan iterasi.',
      'Menghitung jumlah pemanggilan untuk memahami pertumbuhan eksponensial.',
    ],
    technologies: ['C', 'stdio.h'],
    difficulty: 'Medium',
    requirements: [
      'Membuat fungsi fibonacci rekursif dengan base case n = 0 dan n = 1.',
      'Membuat versi iteratif sebagai pembanding.',
      'Menghitung dan menampilkan jumlah pemanggilan fungsi rekursif untuk beberapa nilai n.',
    ],
    checklist: [
      'Membuat fungsi rekursif',
      'Membuat fungsi iteratif',
      'Memastikan hasil keduanya sama untuk n = 0 sampai 20',
      'Menghitung jumlah pemanggilan rekursif',
      'Mencatat perbedaan pemanggilan untuk n = 10, 20, dan 30',
    ],
  },
];