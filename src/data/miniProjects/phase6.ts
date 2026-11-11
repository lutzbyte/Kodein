import type { Project } from '@/types/content';

export const phase6Projects: Project[] = [
  {
    id: 'f6-process-monitor',
    phaseId: 'f6',
    title: 'Process Monitor',
    description:
      'Program yang menampilkan daftar proses yang bisa dibaca beserta PID, nama, dan penggunaan memori, dengan penyegaran berkala.',
    goals: [
      'Membaca informasi proses dari antarmuka sistem (/proc).',
      'Mengurai teks terstruktur dari berkas sistem.',
      'Menangani izin akses yang dibatasi.',
    ],
    technologies: ['Python', 'C'],
    difficulty: 'Medium',
    requirements: [
      'Membaca /proc/<PID>/status untuk nama dan memori setiap proses yang bisa dibaca.',
      'Melewati proses yang tidak bisa dibaca (izin ditolak atau proses sudah selesai) tanpa crash.',
      'Mengurutkan berdasarkan pemakaian memori dan menampilkan sepuluh teratas.',
      'Menyegarkan tampilan setiap beberapa detik sampai pengguna menghentikan.',
    ],
    checklist: [
      'Membaca daftar PID dari /proc',
      'Mengurai berkas status',
      'Menangani proses yang tidak bisa dibaca',
      'Mengurutkan dan menampilkan sepuluh teratas',
      'Menambahkan penyegaran berkala',
    ],
  },
  {
    id: 'f6-file-explorer-cli',
    phaseId: 'f6',
    title: 'File Explorer CLI',
    description:
      'Penjelajah berkas berbasis terminal: menampilkan isi folder dengan ukuran dan jenis, berpindah folder, dan melihat detail berkas.',
    goals: [
      'Memakai opendir, readdir, dan stat.',
      'Memahami izin dan metadata berkas.',
      'Menangani jalur dan kesalahan sistem berkas.',
    ],
    technologies: ['C', 'dirent.h', 'sys/stat.h'],
    difficulty: 'Medium',
    requirements: [
      'Menampilkan nama, jenis (berkas atau folder), dan ukuran setiap entri di folder aktif.',
      'Perintah cd, ls, info (detail ukuran, izin, waktu ubah), dan keluar.',
      'Menolak perintah tidak dikenal dan menangani folder yang tidak ada atau tidak bisa diakses.',
      'Menampilkan ukuran dalam satuan yang mudah dibaca (B, KB, MB).',
    ],
    checklist: [
      'Membaca isi folder dengan opendir dan readdir',
      'Mengambil metadata dengan stat',
      'Mengimplementasikan cd dan ls',
      'Mengimplementasikan info dan format ukuran',
      'Menangani folder yang tidak ada dan izin ditolak',
    ],
  },
  {
    id: 'f6-threading-experiment',
    phaseId: 'f6',
    title: 'Threading Experiment',
    description:
      'Eksperimen thread: bandingkan counter tanpa kunci dan dengan mutex, serta ukur percepatan membagi pekerjaan ke beberapa thread.',
    goals: [
      'Mengamati race condition secara langsung.',
      'Memperbaikinya dengan mutex dan membandingkan biayanya.',
      'Mengukur dampak jumlah thread pada waktu eksekusi.',
    ],
    technologies: ['C', 'pthread'],
    difficulty: 'Medium',
    requirements: [
      'Membuat versi counter tanpa kunci, dengan mutex, dan dengan variabel atomik, lalu membandingkan hasilnya.',
      'Menjalankan setiap versi beberapa kali dan mencatat hasil yang tidak konsisten pada versi tanpa kunci.',
      'Membagi penjumlahan array besar ke 1, 2, 4, dan 8 thread dan mengukur waktunya dengan clock_gettime.',
      'Menampilkan tabel ringkasan hasil di akhir program.',
    ],
    checklist: [
      'Membuat counter tanpa kunci dan menunjukkan hasil yang salah',
      'Memperbaikinya dengan mutex',
      'Membuat versi atomik',
      'Membuat pengukuran waktu untuk variasi jumlah thread',
      'Menyusun tabel ringkasan dan membahas hasilnya',
    ],
  },
  {
    id: 'f6-tcp-client-server',
    phaseId: 'f6',
    title: 'TCP Client dan Server',
    description:
      'Server chat sederhana yang menerima beberapa klien TCP dan menyiarkan pesan ke semua klien, beserta program klien.',
    goals: [
      'Memakai API socket (bind, listen, accept, connect).',
      'Menangani banyak koneksi (thread atau select/poll).',
      'Menangani batas pesan pada aliran TCP.',
    ],
    technologies: ['C', 'Python', 'sockets'],
    difficulty: 'Hard',
    requirements: [
      'Server menerima beberapa klien sekaligus dan menyiarkan setiap pesan ke klien lain.',
      'Pesan dipisahkan dengan karakter newline dan dibaca sampai lengkap, sehingga tidak bergantung pada batas recv.',
      'Klien dapat mengirim dan menerima pesan secara bersamaan.',
      'Menangani klien yang terputus tanpa menjatuhkan server.',
    ],
    checklist: [
      'Membuat server yang menerima koneksi',
      'Menangani beberapa klien (thread atau poll)',
      'Menyiarkan pesan ke klien lain',
      'Membuat klien dengan kirim dan terima bersamaan',
      'Menguji klien yang terputus dan pesan panjang',
    ],
  },
  {
    id: 'f6-http-client',
    phaseId: 'f6',
    title: 'HTTP Client',
    description:
      'Klien HTTP/1.1 sederhana yang dibuat di atas socket TCP: mengirim permintaan GET dan mengurai status, header, dan isi respons.',
    goals: [
      'Memahami format teks permintaan dan respons HTTP.',
      'Membaca respons sampai lengkap memakai Content-Length.',
      'Menangani pengalihan dan kesalahan.',
    ],
    technologies: ['Python', 'sockets'],
    difficulty: 'Medium',
    requirements: [
      'Menerima URL (http://host:port/path), mengurai host, port, dan path.',
      'Mengirim permintaan GET dengan header Host dan Connection: close.',
      'Mengurai baris status, header, dan isi respons, lalu menampilkannya terpisah.',
      'Mengikuti pengalihan 301 dan 302 hingga maksimal lima kali, dan menangani kesalahan koneksi.',
    ],
    checklist: [
      'Mengurai URL',
      'Mengirim permintaan GET lewat socket',
      'Membaca dan mengurai respons',
      'Menangani pengalihan',
      'Menguji terhadap server HTTP lokal buatan sendiri',
    ],
  },
  {
    id: 'f6-simple-shell',
    phaseId: 'f6',
    title: 'Simple Shell',
    description:
      'Shell mini yang membaca perintah, menjalankannya sebagai proses anak, dan mendukung beberapa perintah bawaan serta pipe.',
    goals: [
      'Memakai fork, exec, dan wait.',
      'Mengurai baris perintah menjadi argumen.',
      'Menghubungkan proses dengan pipe.',
    ],
    technologies: ['C', 'unistd.h', 'sys/wait.h'],
    difficulty: 'Hard',
    requirements: [
      'Menampilkan prompt, membaca satu baris, lalu menguraikannya menjadi argumen.',
      'Menjalankan program eksternal dengan fork dan execvp, lalu menunggu selesai dan menampilkan exit code jika bukan nol.',
      'Perintah bawaan: cd, exit, dan help.',
      'Mendukung satu pipe (cmd1 | cmd2) dengan pipe, dup2, dan fork.',
    ],
    checklist: [
      'Membaca dan mengurai baris perintah',
      'Menjalankan program dengan fork dan execvp',
      'Mengimplementasikan cd, exit, dan help',
      'Mengimplementasikan satu pipe',
      'Menangani perintah yang tidak ditemukan dan EOF (Ctrl+D)',
    ],
  },
];