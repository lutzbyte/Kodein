import type { Project } from '@/types/content';

export const phase4Projects: Project[] = [
  {
    id: 'f4-sorting-visualizer',
    phaseId: 'f4',
    title: 'Sorting Visualizer',
    description:
      'Program terminal yang menampilkan langkah-langkah algoritma pengurutan sebagai batang teks dan menghitung jumlah perbandingan serta pertukaran.',
    goals: [
      'Memahami cara kerja beberapa algoritma pengurutan secara visual.',
      'Membandingkan jumlah operasi antar-algoritma.',
      'Memisahkan logika algoritma dari tampilan.',
    ],
    technologies: ['C++', 'STL'],
    difficulty: 'Medium',
    requirements: [
      'Mendukung minimal bubble sort, insertion sort, dan quick sort.',
      'Menampilkan kondisi data setelah setiap langkah penting sebagai batang karakter.',
      'Menghitung dan menampilkan jumlah perbandingan dan pertukaran di akhir.',
    ],
    checklist: [
      'Membuat fungsi tampilan batang',
      'Mengimplementasikan bubble sort dengan penghitung',
      'Mengimplementasikan insertion sort dengan penghitung',
      'Mengimplementasikan quick sort dengan penghitung',
      'Membandingkan jumlah operasi pada data acak, terurut, dan terbalik',
    ],
  },
  {
    id: 'f4-maze-solver',
    phaseId: 'f4',
    title: 'Maze Solver',
    description:
      'Program yang membaca labirin dari grid teks dan mencari jalur dari titik awal ke tujuan menggunakan BFS dan DFS.',
    goals: [
      'Menerapkan BFS dan DFS pada grid.',
      'Membandingkan jalur yang ditemukan kedua algoritma.',
      'Merekonstruksi jalur dari simpul pendahulu.',
    ],
    technologies: ['C++', 'STL'],
    difficulty: 'Hard',
    requirements: [
      'Membaca labirin dengan penanda dinding, awal (S), dan tujuan (E).',
      'Mencari jalur dengan BFS (terpendek) dan DFS, lalu menampilkan jalurnya pada grid.',
      'Menampilkan panjang jalur dan pesan jika tidak ada jalur.',
    ],
    checklist: [
      'Membaca dan memvalidasi grid labirin',
      'Mengimplementasikan BFS dengan penyimpanan pendahulu',
      'Mengimplementasikan DFS',
      'Merekonstruksi dan menandai jalur pada grid',
      'Menguji labirin tanpa jalur',
    ],
  },
  {
    id: 'f4-shortest-path-finder',
    phaseId: 'f4',
    title: 'Shortest Path Finder',
    description:
      'Program yang mencari jalur terpendek antar-kota pada peta berbobot memakai algoritma Dijkstra.',
    goals: [
      'Menerapkan Dijkstra dengan priority queue.',
      'Merekonstruksi jalur terpendek, bukan hanya jaraknya.',
      'Memodelkan masalah nyata sebagai graph berbobot.',
    ],
    technologies: ['C++', 'STL'],
    difficulty: 'Hard',
    requirements: [
      'Membaca daftar kota dan jalan beserta jaraknya.',
      'Menghitung jarak terpendek dari kota asal ke kota tujuan yang dipilih pengguna.',
      'Menampilkan urutan kota yang dilalui dan total jaraknya.',
      'Menangani kota yang tidak terhubung.',
    ],
    checklist: [
      'Membaca dan menyimpan graph berbobot',
      'Mengimplementasikan Dijkstra',
      'Menyimpan pendahulu dan merekonstruksi jalur',
      'Menampilkan jalur dan total jarak',
      'Menguji kota yang tidak terhubung',
    ],
  },
  {
    id: 'f4-knapsack-solver',
    phaseId: 'f4',
    title: 'Knapsack Solver',
    description:
      'Program yang menyelesaikan masalah knapsack 0/1 dengan dynamic programming dan menampilkan barang yang dipilih.',
    goals: [
      'Merumuskan keadaan dan rekurens dynamic programming.',
      'Merekonstruksi himpunan barang optimal dari tabel.',
      'Membandingkan hasil DP dengan pendekatan greedy.',
    ],
    technologies: ['C++', 'STL'],
    difficulty: 'Medium',
    requirements: [
      'Membaca kapasitas serta berat dan nilai setiap barang.',
      'Mengisi tabel DP dan menampilkan nilai maksimum.',
      'Menampilkan daftar barang yang dipilih.',
      'Membandingkan dengan hasil greedy berdasarkan nilai per berat.',
    ],
    checklist: [
      'Membaca input kapasitas dan barang',
      'Mengisi tabel DP',
      'Merekonstruksi barang yang dipilih',
      'Mengimplementasikan versi greedy sebagai pembanding',
      'Menemukan satu contoh ketika greedy tidak optimal',
    ],
  },
  {
    id: 'f4-sudoku-solver',
    phaseId: 'f4',
    title: 'Sudoku Solver',
    description:
      'Program yang menyelesaikan teka-teki Sudoku 9x9 menggunakan backtracking.',
    goals: [
      'Menerapkan pola pilih, jelajahi, dan batalkan.',
      'Menulis fungsi pemeriksa validitas yang efisien.',
      'Memahami dampak pemangkasan pada waktu eksekusi.',
    ],
    technologies: ['C++', 'STL'],
    difficulty: 'Hard',
    requirements: [
      'Membaca grid 9x9 dengan 0 sebagai sel kosong.',
      'Memeriksa baris, kolom, dan kotak 3x3 sebelum menaruh angka.',
      'Menyelesaikan puzzle dengan backtracking dan menampilkan hasilnya, atau pesan jika tidak ada solusi.',
    ],
    checklist: [
      'Membaca dan menampilkan grid',
      'Membuat fungsi pemeriksa validitas',
      'Mengimplementasikan backtracking',
      'Menampilkan hasil dengan format rapi',
      'Menguji puzzle yang tidak memiliki solusi',
    ],
  },
  {
    id: 'f4-graph-traversal-visualizer',
    phaseId: 'f4',
    title: 'Graph Traversal Visualizer',
    description:
      'Program yang menampilkan langkah demi langkah penelusuran BFS dan DFS pada graph yang dimasukkan pengguna.',
    goals: [
      'Membandingkan urutan kunjungan BFS dan DFS.',
      'Menampilkan isi queue dan stack pada setiap langkah.',
      'Memperkuat pemahaman representasi graph.',
    ],
    technologies: ['C++', 'STL'],
    difficulty: 'Medium',
    requirements: [
      'Membaca graph (jumlah simpul, sisi) dan simpul awal.',
      'Menjalankan BFS dengan menampilkan isi queue pada setiap langkah.',
      'Menjalankan DFS iteratif dengan menampilkan isi stack pada setiap langkah.',
      'Menampilkan urutan kunjungan akhir kedua algoritma.',
    ],
    checklist: [
      'Membaca dan menyimpan graph',
      'Mengimplementasikan BFS dengan jejak queue',
      'Mengimplementasikan DFS iteratif dengan jejak stack',
      'Menampilkan urutan kunjungan akhir',
      'Menguji graph yang tidak sepenuhnya terhubung',
    ],
  },
];