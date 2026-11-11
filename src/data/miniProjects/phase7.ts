import type { Project } from '@/types/content';

export const phase7Projects: Project[] = [
  {
    id: 'f7-library-management-system',
    phaseId: 'f7',
    title: 'Library Management System',
    description:
      'Sistem perpustakaan berbasis terminal dengan kelas Buku, Anggota, dan Perpustakaan untuk meminjam, mengembalikan, dan menghitung denda.',
    goals: [
      'Merancang kelas dengan tanggung jawab yang jelas.',
      'Menerapkan enkapsulasi dan validasi pada data.',
      'Menulis unit test untuk aturan peminjaman.',
    ],
    technologies: ['Java', 'OOP', 'JUnit atau unittest'],
    difficulty: 'Medium',
    requirements: [
      'Kelas Buku, Anggota, dan Perpustakaan dengan atribut private dan metode yang menjaga aturan.',
      'Aturan peminjaman: maksimal tiga buku per anggota, buku yang sedang dipinjam tidak bisa dipinjam lagi.',
      'Denda dihitung per hari keterlambatan dan dapat diubah di satu tempat.',
      'Minimal lima unit test untuk aturan peminjaman, pengembalian, dan denda.',
    ],
    checklist: [
      'Merancang kelas dan hubungannya',
      'Mengimplementasikan peminjaman dan pengembalian',
      'Mengimplementasikan penghitungan denda',
      'Membuat menu terminal',
      'Menulis dan menjalankan unit test',
    ],
  },
  {
    id: 'f7-inventory-management-system',
    phaseId: 'f7',
    title: 'Inventory Management System',
    description:
      'Sistem stok barang dengan kelas Produk dan Gudang, pencatatan barang masuk dan keluar, peringatan stok minimum, dan penyimpanan ke berkas JSON.',
    goals: [
      'Memisahkan logika bisnis dari penyimpanan data.',
      'Menerapkan prinsip Single Responsibility dan Dependency Inversion.',
      'Menguji dengan integration test terhadap berkas sementara.',
    ],
    technologies: ['Python', 'JSON', 'unittest'],
    difficulty: 'Medium',
    requirements: [
      'Kelas Produk dan Gudang dengan stok yang tidak boleh negatif.',
      'Repositori yang bisa diganti (memori dan berkas JSON) lewat antarmuka yang sama.',
      'Peringatan otomatis ketika stok kurang dari batas minimum.',
      'Unit test untuk aturan stok dan integration test untuk penyimpanan JSON.',
    ],
    checklist: [
      'Membuat kelas Produk dan Gudang',
      'Membuat antarmuka repositori dan dua implementasinya',
      'Mengimplementasikan barang masuk dan keluar',
      'Menambahkan peringatan stok minimum',
      'Menulis unit test dan integration test',
    ],
  },
  {
    id: 'f7-banking-simulation',
    phaseId: 'f7',
    title: 'Banking Simulation',
    description:
      'Simulasi perbankan dengan pewarisan dan polimorfisme: rekening tabungan dan giro memiliki aturan bunga dan penarikan yang berbeda.',
    goals: [
      'Menerapkan pewarisan dan fungsi virtual.',
      'Menjaga invarian saldo dengan enkapsulasi dan exception.',
      'Mengelola objek secara polimorfik dengan pointer pintar.',
    ],
    technologies: ['C++', 'OOP', 'STL'],
    difficulty: 'Hard',
    requirements: [
      'Kelas dasar abstrak Rekening, dengan turunan Tabungan (bunga tahunan) dan Giro (batas tarik melebihi saldo).',
      'Operasi setor, tarik, dan transfer antar-rekening dengan exception untuk kondisi tidak valid.',
      'Riwayat transaksi untuk setiap rekening.',
      'Menyimpan semua rekening dalam std::vector<std::unique_ptr<Rekening>> dan memprosesnya secara polimorfik.',
    ],
    checklist: [
      'Mendesain kelas dasar abstrak',
      'Mengimplementasikan Tabungan dan Giro',
      'Mengimplementasikan transfer dengan penanganan error',
      'Mencatat riwayat transaksi',
      'Menguji saldo tidak pernah negatif pada rekening tabungan',
    ],
  },
  {
    id: 'f7-cli-task-manager',
    phaseId: 'f7',
    title: 'CLI Task Manager',
    description:
      'Aplikasi manajemen tugas berbasis terminal dengan arsitektur berlapis, penyimpanan JSON, tes, dan riwayat Git yang rapi.',
    goals: [
      'Menerapkan arsitektur berlapis (entity, use case, adapter).',
      'Menulis tes otomatis dan memakai alur Git yang baik.',
      'Menulis kode bersih dengan nama dan struktur yang jelas.',
    ],
    technologies: ['Python', 'JSON', 'Git', 'unittest'],
    difficulty: 'Medium',
    requirements: [
      'Perintah tambah, daftar, selesai, dan hapus dari baris perintah.',
      'Pemisahan entity, use case, repositori JSON, dan antarmuka baris perintah ke modul berbeda.',
      'Unit test untuk use case dan integration test untuk repositori JSON.',
      'Repositori Git dengan commit kecil bermakna, .gitignore yang benar, dan README singkat.',
    ],
    checklist: [
      'Menyusun struktur modul',
      'Mengimplementasikan use case dan repositori',
      'Membuat antarmuka baris perintah',
      'Menulis unit test dan integration test',
      'Membuat repositori Git dengan riwayat commit yang rapi',
    ],
  },
  {
    id: 'f7-modular-cpp-application',
    phaseId: 'f7',
    title: 'Modular C++ Application',
    description:
      'Aplikasi C++ yang dibagi menjadi beberapa modul dengan header dan implementasi terpisah, dibangun dengan build system, dan diuji.',
    goals: [
      'Membagi program menjadi modul dengan antarmuka yang jelas.',
      'Memakai build system untuk membangun beberapa berkas.',
      'Mengelola dependensi antar-modul.',
    ],
    technologies: ['C++', 'Make atau CMake', 'Git'],
    difficulty: 'Hard',
    requirements: [
      'Minimal tiga modul (misalnya model, layanan, dan antarmuka) dengan header berpelindung include guard.',
      'Build system (Makefile atau CMakeLists.txt) yang membangun ulang hanya berkas yang berubah.',
      'Tes sederhana yang dijalankan lewat target build tersendiri.',
      'Tidak ada ketergantungan melingkar antar-modul, dan seluruh peringatan compiler diselesaikan dengan -Wall -Wextra.',
    ],
    checklist: [
      'Merancang pembagian modul dan antarmukanya',
      'Menulis header dan implementasi setiap modul',
      'Menulis Makefile atau CMakeLists.txt',
      'Menambahkan target tes',
      'Membuktikan build inkremental dengan mengubah satu berkas',
    ],
  },
];