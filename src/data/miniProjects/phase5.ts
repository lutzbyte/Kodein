import type { Project } from '@/types/content';

export const phase5Projects: Project[] = [
  {
    id: 'f5-simple-memory-allocator',
    phaseId: 'f5',
    title: 'Simple Memory Allocator',
    description:
      'Bangun pengalokasi memori sederhana yang mengelola sebuah blok besar sebagai kumpulan blok kecil yang bisa dialokasikan dan dibebaskan.',
    goals: [
      'Memahami bagaimana malloc dan free bekerja di balik layar.',
      'Mengelola metadata blok dan alignment.',
      'Mengenali fragmentasi memori.',
    ],
    technologies: ['C', 'stdint.h'],
    difficulty: 'Hard',
    requirements: [
      'Mengelola satu blok statis (misalnya 4 KB) dengan daftar blok berisi ukuran dan status bebas atau terpakai.',
      'Menyediakan fungsi alokasi dan pembebasan dengan alignment 8 byte.',
      'Menggabungkan blok bebas yang bersebelahan saat pembebasan.',
      'Menyediakan fungsi yang mencetak peta blok dan total memori terpakai.',
    ],
    checklist: [
      'Mendefinisikan struct header blok',
      'Mengimplementasikan alokasi dengan strategi first-fit',
      'Mengimplementasikan pembebasan',
      'Menggabungkan blok bebas bersebelahan',
      'Menguji pola alokasi dan pembebasan bergantian dan mencetak peta memori',
    ],
  },
  {
    id: 'f5-memory-address-inspector',
    phaseId: 'f5',
    title: 'Memory Address Inspector',
    description:
      'Program yang mencetak alamat berbagai jenis variabel (global, lokal, heap, fungsi) dan menunjukkan pola tata letak memori proses.',
    goals: [
      'Mengamati tata letak segmen memori secara langsung.',
      'Memahami efek ASLR dengan menjalankan program berkali-kali.',
      'Menghitung selisih alamat antar-elemen array dan field struct.',
    ],
    technologies: ['C', 'stdint.h'],
    difficulty: 'Medium',
    requirements: [
      'Mencetak alamat variabel global, lokal, blok malloc, dan fungsi.',
      'Mencetak alamat dan offset setiap elemen sebuah array serta setiap field sebuah struct.',
      'Menjelaskan secara singkat di output segmen mana setiap alamat berada.',
    ],
    checklist: [
      'Menyiapkan variabel di tiap segmen',
      'Mencetak alamat dengan %p',
      'Mencetak alamat dan selisih elemen array',
      'Mencetak offset field struct dengan offsetof',
      'Menjalankan beberapa kali dan mencatat perubahan akibat ASLR',
    ],
  },
  {
    id: 'f5-bit-manipulation-calculator',
    phaseId: 'f5',
    title: 'Bit Manipulation Calculator',
    description:
      'Kalkulator berbasis menu untuk operasi bit: AND, OR, XOR, geser, atur, hapus, balik, dan periksa bit pada bilangan 32 bit.',
    goals: [
      'Menguasai operator bitwise dan pola manipulasi bit.',
      'Menampilkan bilangan dalam biner, heksadesimal, dan desimal.',
      'Menangani input pengguna dengan aman.',
    ],
    technologies: ['C', 'stdint.h'],
    difficulty: 'Medium',
    requirements: [
      'Menerima bilangan dalam desimal atau heksadesimal (awalan 0x).',
      'Menyediakan menu untuk operasi bitwise dua operand dan operasi pada bit tertentu.',
      'Menampilkan hasil dalam biner 32 bit, heksadesimal, dan desimal.',
      'Menolak posisi bit di luar rentang 0 sampai 31.',
    ],
    checklist: [
      'Membuat fungsi cetak biner 32 bit',
      'Membaca bilangan desimal dan heksa',
      'Mengimplementasikan operasi AND, OR, XOR, dan geser',
      'Mengimplementasikan atur, hapus, balik, dan periksa bit',
      'Menguji batas posisi bit 0 dan 31',
    ],
  },
  {
    id: 'f5-hexadecimal-viewer',
    phaseId: 'f5',
    title: 'Hexadecimal Viewer',
    description:
      'Program yang menampilkan isi berkas dalam format hex dump: offset, 16 byte per baris dalam heksadesimal, dan representasi ASCII.',
    goals: [
      'Membaca berkas biner dengan fread.',
      'Memformat data mentah menjadi heksadesimal dan ASCII.',
      'Menangani berkas yang ukurannya bukan kelipatan 16.',
    ],
    technologies: ['C', 'stdio.h'],
    difficulty: 'Medium',
    requirements: [
      'Menerima nama berkas sebagai argumen baris perintah.',
      'Mencetak offset 8 digit heksa, 16 byte per baris, dan kolom ASCII (karakter tak tercetak diganti titik).',
      'Menangani baris terakhir yang tidak penuh dengan perataan kolom.',
      'Menampilkan pesan yang jelas jika berkas tidak bisa dibuka.',
    ],
    checklist: [
      'Membaca argumen dan membuka berkas',
      'Membaca 16 byte per putaran dengan fread',
      'Mencetak offset dan byte heksa',
      'Mencetak kolom ASCII',
      'Menguji berkas kosong, pendek, dan berukuran kelipatan 16',
    ],
  },
  {
    id: 'f5-pointer-experiment',
    phaseId: 'f5',
    title: 'Pointer Experiment',
    description:
      'Kumpulan percobaan kecil dengan pointer: aritmatika, pointer ke pointer, pointer ke fungsi, dan array pointer, lengkap dengan penjelasan hasil.',
    goals: [
      'Mendalami aritmatika pointer dan hubungan array-pointer.',
      'Memahami pointer ke pointer dan pointer ke fungsi.',
      'Melatih membaca deklarasi pointer yang rumit.',
    ],
    technologies: ['C'],
    difficulty: 'Medium',
    requirements: [
      'Membuat percobaan aritmatika pointer pada array int dan char dan menjelaskan selisih byte.',
      'Membuat fungsi yang mengubah pointer pemanggil lewat pointer ke pointer.',
      'Membuat tabel pointer ke fungsi untuk operasi aritmatika dasar.',
      'Mencetak penjelasan singkat untuk setiap percobaan.',
    ],
    checklist: [
      'Percobaan aritmatika pointer int dan char',
      'Percobaan pointer ke pointer',
      'Percobaan pointer ke fungsi dengan tabel operasi',
      'Percobaan array of pointer ke string',
      'Menjalankan dengan -Wall -Wextra dan memperbaiki seluruh peringatan',
    ],
  },
  {
    id: 'f5-assembly-program',
    phaseId: 'f5',
    title: 'Assembly Program',
    description:
      'Tulis beberapa fungsi kecil dalam assembly ARM64 (atau x86-64 sesuai perangkat) dan panggil dari program C: penjumlahan, maksimum, dan jumlah deret.',
    goals: [
      'Menulis dan memanggil fungsi assembly dari C.',
      'Memahami konvensi pemanggilan dan penggunaan register.',
      'Membandingkan hasil assembly dengan implementasi C.',
    ],
    technologies: ['Assembly', 'C'],
    difficulty: 'Hard',
    requirements: [
      'Memeriksa arsitektur dengan uname -m dan memilih instruksi yang sesuai.',
      'Mengimplementasikan tambah, maks, dan jumlah deret 1 sampai n (dengan loop) dalam assembly.',
      'Memanggil fungsi tersebut dari C dan membandingkan hasilnya dengan versi C untuk beberapa input.',
      'Menjelaskan register yang dipakai untuk argumen dan nilai balik.',
    ],
    checklist: [
      'Menentukan arsitektur perangkat',
      'Menulis fungsi tambah dan maks',
      'Menulis fungsi jumlah deret dengan loop dan percabangan',
      'Memanggil dari C dan membandingkan dengan versi C',
      'Mendokumentasikan konvensi register yang dipakai',
    ],
  },
];