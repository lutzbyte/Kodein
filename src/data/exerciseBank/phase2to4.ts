import type { Exercise } from '@/types/content';

export const phase2to4Exercises: Exercise[] = [
  // Fase 2
  {
    id: 'f2-ex-pola-segitiga',
    phaseId: 'f2',
    title: 'Pola Bintang',
    kind: 'predict-output',
    difficulty: 'Easy',
    durationMinutes: 5,
    question: 'Apa output dari potongan kode berikut?',
    code: String.raw`for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= i; j++) printf("*");
    printf("\n");
}`,
    options: ['*\n**\n***', '***\n**\n*', '***\n***\n***', '*\n*\n*'],
    correctIndex: 0,
    explanation:
      'Loop luar mengatur baris dan loop dalam mencetak bintang sebanyak nomor baris: 1, lalu 2, lalu 3 bintang.',
  },
  {
    id: 'f2-ex-base-case',
    phaseId: 'f2',
    title: 'Base Case pada Rekursi',
    kind: 'multiple-choice',
    difficulty: 'Medium',
    durationMinutes: 5,
    question: 'Apa fungsi base case pada fungsi rekursif?',
    options: [
      'Menghentikan rekursi dan langsung memberi jawaban',
      'Mempercepat pemanggilan fungsi',
      'Menyimpan hasil ke variabel global',
      'Membuat fungsi dipanggil lebih banyak kali',
    ],
    correctIndex: 0,
    explanation:
      'Base case adalah kondisi berhenti. Tanpa base case, fungsi memanggil dirinya terus-menerus sampai stack penuh (stack overflow).',
  },
  {
    id: 'f2-ex-debug-fpb',
    phaseId: 'f2',
    title: 'Debugging: Algoritma FPB',
    kind: 'debugging',
    difficulty: 'Medium',
    durationMinutes: 10,
    question: 'Fungsi FPB ini selalu menghasilkan jawaban yang salah. Perbaikan apa yang tepat?',
    code: [
      'int fpb(int a, int b) {',
      '    while (b != 0) {',
      '        a = b;',
      '        b = a % b;',
      '    }',
      '    return a;',
      '}',
    ].join('\n'),
    options: [
      'Simpan sisa dulu: int sisa = a % b; lalu a = b; b = sisa;',
      'Ganti while dengan if',
      'Ganti operator % dengan /',
      'Ubah return a menjadi return b',
    ],
    correctIndex: 0,
    explanation:
      'Setelah a = b, nilai a sudah berubah sehingga a % b menjadi b % b yang selalu 0. Sisa pembagian harus dihitung dari a yang lama dan disimpan lebih dulu.',
  },
  {
    id: 'f2-ex-loop-bersarang',
    phaseId: 'f2',
    title: 'Menghitung Langkah Loop',
    kind: 'problem-solving',
    difficulty: 'Medium',
    durationMinutes: 5,
    question:
      'Dua loop bersarang, masing-masing berjalan n kali. Jika n = 20, berapa kali pernyataan di dalam loop terdalam dijalankan?',
    acceptedAnswers: ['400'],
    hint: 'Kalikan jumlah putaran kedua loop.',
    explanation: 'Loop bersarang menghasilkan n x n langkah: 20 x 20 = 400. Itulah ciri kompleksitas O(n²).',
  },

  // Fase 3
  {
    id: 'f3-ex-indeks-array',
    phaseId: 'f3',
    title: 'Indeks Array',
    kind: 'predict-output',
    difficulty: 'Easy',
    durationMinutes: 5,
    question: 'Apa output dari potongan kode berikut?',
    code: ['int a[4] = {5, 10, 15, 20};', 'printf("%d", a[2] + a[0]);'].join('\n'),
    options: ['15', '20', '25', '30'],
    correctIndex: 1,
    explanation: 'Indeks dimulai dari 0, sehingga a[2] bernilai 15 dan a[0] bernilai 5. Jumlahnya 20.',
  },
  {
    id: 'f3-ex-stack-lifo',
    phaseId: 'f3',
    title: 'Prinsip Stack',
    kind: 'true-false',
    difficulty: 'Easy',
    durationMinutes: 3,
    question: 'Pada stack, elemen yang pertama dimasukkan adalah elemen yang pertama dikeluarkan.',
    options: ['Benar', 'Salah'],
    correctIndex: 1,
    explanation:
      'Stack bersifat LIFO (Last In, First Out): elemen yang terakhir masuk keluar lebih dulu. Prinsip "yang pertama masuk keluar pertama" adalah milik queue (FIFO).',
  },
  {
    id: 'f3-ex-debug-null-pointer',
    phaseId: 'f3',
    title: 'Debugging: Pointer NULL',
    kind: 'debugging',
    difficulty: 'Medium',
    durationMinutes: 5,
    question: 'Program ini berhenti dengan error saat dijalankan. Apa penyebabnya?',
    code: ['int *p = NULL;', 'printf("%d", *p);'].join('\n'),
    options: [
      'Mendereferensi pointer NULL',
      'Format printf salah',
      'Variabel p belum dideklarasikan',
      'Tipe int terlalu kecil',
    ],
    correctIndex: 0,
    explanation:
      'NULL berarti pointer tidak menunjuk ke mana pun. Membaca nilai lewat *p pada pointer NULL adalah kesalahan runtime. Periksa p != NULL sebelum didereferensi.',
  },
  {
    id: 'f3-ex-anak-bst',
    phaseId: 'f3',
    title: 'Menyusun BST',
    kind: 'problem-solving',
    difficulty: 'Medium',
    durationMinutes: 10,
    question:
      'Nilai 8, 3, 10, 1, 6 disisipkan berurutan ke Binary Search Tree yang awalnya kosong. Berapa nilai anak kanan dari akar?',
    acceptedAnswers: ['10'],
    hint: 'Akar adalah nilai pertama. Nilai yang lebih besar dari akar masuk ke kanan.',
    explanation:
      'Akar adalah 8. Nilai 3, 1, dan 6 lebih kecil sehingga masuk ke subtree kiri. Nilai 10 lebih besar dari 8, jadi menjadi anak kanan akar.',
  },

  // Fase 4
  {
    id: 'f4-ex-syarat-binary-search',
    phaseId: 'f4',
    title: 'Syarat Binary Search',
    kind: 'multiple-choice',
    difficulty: 'Easy',
    durationMinutes: 3,
    question: 'Apa syarat utama agar binary search dapat dipakai?',
    options: [
      'Data sudah terurut',
      'Data berisi bilangan genap',
      'Jumlah data kelipatan dua',
      'Data disimpan di linked list',
    ],
    correctIndex: 0,
    explanation:
      'Binary search membuang separuh data berdasarkan perbandingan dengan elemen tengah, dan itu hanya valid jika data sudah terurut.',
  },
  {
    id: 'f4-ex-langkah-binary-search',
    phaseId: 'f4',
    title: 'Langkah Binary Search',
    kind: 'problem-solving',
    difficulty: 'Medium',
    durationMinutes: 10,
    question:
      'Data terurut berisi 100 elemen. Berapa perbandingan maksimum yang dibutuhkan binary search (floor(log2 n) + 1)?',
    acceptedAnswers: ['7'],
    hint: 'Ukuran data dibagi dua di setiap langkah: 100, 50, 25, 12, 6, 3, 1.',
    explanation:
      'log2(100) sekitar 6,64 sehingga floor-nya 6, ditambah 1 menjadi 7. Setiap perbandingan memangkas separuh kemungkinan.',
  },
  {
    id: 'f4-ex-kompleksitas-merge-sort',
    phaseId: 'f4',
    title: 'Kompleksitas Merge Sort',
    kind: 'multiple-choice',
    difficulty: 'Medium',
    durationMinutes: 5,
    question: 'Berapa kompleksitas waktu merge sort pada kasus terburuk?',
    options: ['O(n log n)', 'O(n²)', 'O(log n)', 'O(n)'],
    correctIndex: 0,
    explanation:
      'Merge sort membagi data menjadi dua (log n tingkat) dan menggabungkannya dengan kerja linear di setiap tingkat, sehingga O(n log n) pada semua kasus.',
  },
  {
    id: 'f4-ex-greedy-koin',
    phaseId: 'f4',
    title: 'Keterbatasan Greedy',
    kind: 'multiple-choice',
    difficulty: 'Hard',
    durationMinutes: 10,
    question:
      'Pecahan koin yang tersedia: 1, 3, dan 4. Algoritma greedy (selalu mengambil koin terbesar yang muat) menukar nilai 6. Berapa koin yang dipakai?',
    options: ['2', '3', '4', '1'],
    correctIndex: 1,
    explanation:
      'Greedy mengambil 4, lalu sisa 2 diambil dengan 1 + 1, total 3 koin. Padahal 3 + 3 hanya butuh 2 koin. Greedy tidak selalu optimal, dan untuk kasus ini dibutuhkan dynamic programming.',
  },
];