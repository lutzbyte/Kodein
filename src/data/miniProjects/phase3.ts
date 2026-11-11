import type { Project } from '@/types/content';

export const phase3Projects: Project[] = [
  {
    id: 'f3-dynamic-array',
    phaseId: 'f3',
    title: 'Dynamic Array',
    description:
      'Implementasikan array yang ukurannya bisa tumbuh otomatis, seperti vector, menggunakan malloc dan realloc.',
    goals: [
      'Memahami alokasi memori dinamis dan pengelolaan kapasitas.',
      'Menerapkan strategi menggandakan kapasitas.',
      'Mengelola memori dengan benar tanpa leak.',
    ],
    technologies: ['C', 'stdlib.h'],
    difficulty: 'Medium',
    requirements: [
      'Membuat struct berisi pointer data, ukuran, dan kapasitas.',
      'Menyediakan operasi tambah (append), ambil, ubah, dan hapus terakhir dengan pemeriksaan batas indeks.',
      'Menggandakan kapasitas saat penuh dan menangani kegagalan alokasi.',
      'Menyediakan fungsi pembebasan memori.',
    ],
    checklist: [
      'Membuat struct dan fungsi inisialisasi',
      'Mengimplementasikan append dengan penggandaan kapasitas',
      'Mengimplementasikan get dan set dengan pemeriksaan batas',
      'Mengimplementasikan hapus elemen terakhir',
      'Menjalankan program dan memastikan tidak ada memory leak',
    ],
  },
  {
    id: 'f3-linked-list-implementation',
    phaseId: 'f3',
    title: 'Linked List Implementation',
    description:
      'Bangun singly linked list lengkap dengan operasi sisip, cari, hapus, dan pencetakan di C.',
    goals: [
      'Mengelola pointer antar-node dengan benar.',
      'Menangani kasus khusus seperti list kosong dan node pertama.',
      'Membebaskan seluruh node tanpa memory leak.',
    ],
    technologies: ['C', 'stdlib.h'],
    difficulty: 'Medium',
    requirements: [
      'Menyediakan sisip di awal dan di akhir.',
      'Menyediakan pencarian nilai dan penghapusan node berdasarkan nilai.',
      'Menyediakan pencetakan seluruh list dan pembebasan list.',
      'Menangani list kosong tanpa crash.',
    ],
    checklist: [
      'Membuat struct node dan fungsi sisip di awal',
      'Membuat sisip di akhir',
      'Membuat pencarian dan penghapusan berdasarkan nilai',
      'Membuat pencetakan dan pembebasan list',
      'Menguji list kosong, satu node, dan banyak node',
    ],
  },
  {
    id: 'f3-stack-implementation',
    phaseId: 'f3',
    title: 'Stack Implementation',
    description:
      'Implementasikan stack dengan array lalu pakai untuk memeriksa apakah tanda kurung dalam sebuah teks seimbang.',
    goals: [
      'Menerapkan operasi push, pop, dan peek.',
      'Menangani overflow dan underflow.',
      'Menerapkan stack pada masalah nyata.',
    ],
    technologies: ['C', 'string.h'],
    difficulty: 'Medium',
    requirements: [
      'Membuat stack berbasis array dengan push, pop, peek, dan pengecekan kosong atau penuh.',
      'Memeriksa kurung (), [], dan {} pada teks yang diketik pengguna.',
      'Menampilkan hasil "seimbang" atau "tidak seimbang" dengan alasan singkat.',
    ],
    checklist: [
      'Membuat struct stack dan operasi dasarnya',
      'Menangani overflow dan underflow',
      'Memproses setiap karakter teks',
      'Mencocokkan kurung penutup dengan pembuka',
      'Menguji "{[()]}" (seimbang) dan "([)]" (tidak seimbang)',
    ],
  },
  {
    id: 'f3-queue-implementation',
    phaseId: 'f3',
    title: 'Queue Implementation',
    description:
      'Implementasikan circular queue dan gunakan untuk mensimulasikan antrean pelanggan di kasir.',
    goals: [
      'Menerapkan circular queue dengan modulus.',
      'Membedakan kondisi penuh dan kosong.',
      'Menggunakan queue untuk simulasi sederhana.',
    ],
    technologies: ['C', 'stdio.h'],
    difficulty: 'Medium',
    requirements: [
      'Membuat circular queue berbasis array dengan enqueue dan dequeue.',
      'Menu: pelanggan datang, layani pelanggan, tampilkan antrean.',
      'Menolak pelanggan baru jika antrean penuh dan memberi pesan jika antrean kosong saat melayani.',
    ],
    checklist: [
      'Membuat struct queue dan operasi enqueue serta dequeue',
      'Menangani antrean penuh dan kosong',
      'Membuat menu simulasi',
      'Menampilkan isi antrean sesuai urutan',
      'Menguji pengisian sampai penuh dan pengosongan sampai habis',
    ],
  },
  {
    id: 'f3-binary-search-tree',
    phaseId: 'f3',
    title: 'Binary Search Tree',
    description:
      'Bangun binary search tree dengan operasi sisip, cari, hapus, penelusuran, dan perhitungan tinggi.',
    goals: [
      'Menerapkan rekursi pada struktur pohon.',
      'Menangani tiga kasus penghapusan node.',
      'Memahami pengaruh urutan penyisipan terhadap tinggi pohon.',
    ],
    technologies: ['C', 'stdlib.h'],
    difficulty: 'Hard',
    requirements: [
      'Menyediakan sisip dan cari.',
      'Menyediakan hapus yang menangani node daun, satu anak, dan dua anak.',
      'Menyediakan penelusuran inorder, preorder, dan postorder serta perhitungan tinggi.',
      'Membebaskan seluruh node di akhir program.',
    ],
    checklist: [
      'Membuat struct node dan fungsi sisip',
      'Membuat fungsi cari',
      'Membuat tiga penelusuran',
      'Membuat fungsi hapus untuk tiga kasus',
      'Membandingkan tinggi pohon untuk data acak dan data terurut',
    ],
  },
  {
    id: 'f3-hash-table',
    phaseId: 'f3',
    title: 'Hash Table',
    description:
      'Buat hash table sendiri dengan penanganan collision memakai chaining untuk menyimpan pasangan nama dan nilai.',
    goals: [
      'Menulis fungsi hash untuk string.',
      'Menangani collision dengan linked list.',
      'Memahami pengaruh faktor beban terhadap performa.',
    ],
    technologies: ['C', 'stdlib.h', 'string.h'],
    difficulty: 'Hard',
    requirements: [
      'Memakai fungsi hash string (misalnya djb2) dan array bucket berisi linked list.',
      'Menyediakan operasi sisip atau perbarui, cari, dan hapus berdasarkan kunci.',
      'Menghitung dan menampilkan faktor beban (jumlah data dibagi jumlah bucket).',
      'Membebaskan seluruh memori di akhir program.',
    ],
    checklist: [
      'Membuat fungsi hash dan struktur bucket',
      'Mengimplementasikan sisip atau perbarui',
      'Mengimplementasikan cari dan hapus',
      'Menguji collision dengan jumlah bucket kecil',
      'Menampilkan faktor beban dan membebaskan memori',
    ],
  },
  {
    id: 'f3-graph-representation',
    phaseId: 'f3',
    title: 'Graph Representation',
    description:
      'Representasikan graph dengan adjacency matrix dan adjacency list, lalu tampilkan derajat setiap simpul.',
    goals: [
      'Membandingkan dua representasi graph.',
      'Membaca graph dari input pengguna.',
      'Menghitung derajat simpul.',
    ],
    technologies: ['C', 'stdlib.h'],
    difficulty: 'Medium',
    requirements: [
      'Membaca jumlah simpul dan sisi, lalu setiap pasangan simpul yang terhubung.',
      'Menyimpan graph dalam adjacency matrix dan adjacency list sekaligus.',
      'Mencetak kedua representasi dan derajat setiap simpul.',
      'Memvalidasi nomor simpul yang diinput.',
    ],
    checklist: [
      'Membaca dan memvalidasi input graph',
      'Membangun adjacency matrix',
      'Membangun adjacency list dengan linked list',
      'Mencetak kedua representasi',
      'Menghitung dan menampilkan derajat setiap simpul',
    ],
  },
];