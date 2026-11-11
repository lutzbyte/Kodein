import type { Project } from '@/types/content';

export const phase8Projects: Project[] = [
  {
    id: 'f8-backend-todo-api',
    phaseId: 'f8',
    title: 'Backend: REST API Tugas dengan Database',
    description:
      'Bangun REST API untuk mengelola tugas dengan database SQLite, validasi input, kode status yang benar, dan tes integrasi.',
    goals: [
      'Mendesain endpoint REST dan skema tabel.',
      'Menangani validasi dan error secara konsisten.',
      'Menguji API terhadap database nyata.',
    ],
    technologies: ['Python atau Go', 'SQLite', 'REST', 'JSON'],
    difficulty: 'Medium',
    requirements: [
      'Endpoint GET, POST, PUT, dan DELETE untuk /tugas dengan kode status yang tepat.',
      'Penyimpanan di SQLite memakai query berparameter (bukan penggabungan string).',
      'Validasi input dan respons error berformat JSON yang konsisten.',
      'Integration test yang menjalankan server dengan database sementara.',
    ],
    checklist: [
      'Merancang skema tabel dan endpoint',
      'Mengimplementasikan CRUD dengan SQLite',
      'Menambahkan validasi dan penanganan error',
      'Menulis integration test',
      'Menguji manual dengan curl',
    ],
  },
  {
    id: 'f8-data-prediksi-nilai',
    phaseId: 'f8',
    title: 'Data Science: Prediksi Nilai dari Jam Belajar',
    description:
      'Analisis data sederhana dari berkas CSV: statistik deskriptif, regresi linear dari nol, lalu evaluasi dan perbandingan dengan pustaka.',
    goals: [
      'Menjalankan alur data dari berkas CSV sampai evaluasi model.',
      'Menghitung regresi linear tanpa pustaka.',
      'Mengevaluasi model dengan metrik yang tepat.',
    ],
    technologies: ['Python', 'CSV', 'statistika'],
    difficulty: 'Medium',
    requirements: [
      'Membaca CSV dan menghitung rata-rata, median, simpangan baku, serta korelasi.',
      'Mengimplementasikan regresi linear dari nol dan memprediksi data baru.',
      'Memisahkan data latih dan data uji, lalu menghitung MAE dan R kuadrat pada data uji.',
      'Membandingkan hasil dengan pustaka (misalnya scikit-learn) dan menjelaskan perbedaannya.',
    ],
    checklist: [
      'Membaca dan membersihkan data CSV',
      'Menghitung statistik deskriptif',
      'Mengimplementasikan regresi linear',
      'Mengevaluasi pada data uji',
      'Membandingkan dengan pustaka dan menulis kesimpulan',
    ],
  },
  {
    id: 'f8-embedded-lampu-lalu-lintas',
    phaseId: 'f8',
    title: 'Embedded: Simulasi Firmware Lampu Lalu Lintas',
    description:
      'Simulasi firmware lampu lalu lintas di komputer: register GPIO virtual, timer berbasis tick, state machine, dan tombol pejalan kaki.',
    goals: [
      'Merancang perilaku perangkat sebagai state machine.',
      'Mengendalikan register dengan operasi bit.',
      'Menangani kejadian tak sinkron (tombol) tanpa menunda program.',
    ],
    technologies: ['C', 'stdint.h'],
    difficulty: 'Medium',
    requirements: [
      'Register GPIO virtual 8 bit dengan makro untuk tiap lampu, ditulis memakai operasi bit.',
      'State machine dengan durasi tiap keadaan dihitung dari tick timer, tanpa fungsi tidur.',
      'Tombol pejalan kaki (disimulasikan dari input) yang meminta fase hijau pejalan kaki pada giliran berikutnya.',
      'Pencatatan tiap perubahan keadaan beserta nomor tick.',
    ],
    checklist: [
      'Mendefinisikan register dan makro bit',
      'Mengimplementasikan state machine',
      'Mengimplementasikan timer berbasis tick',
      'Menambahkan tombol pejalan kaki',
      'Mencatat perubahan keadaan dan memeriksa urutannya',
    ],
  },
  {
    id: 'f8-game-pong-logika',
    phaseId: 'f8',
    title: 'Game Development: Logika Pong di Terminal',
    description:
      'Game Pong sederhana di terminal dengan game loop langkah waktu tetap, deteksi tabrakan, dan skor.',
    goals: [
      'Menerapkan game loop dan langkah waktu tetap.',
      'Menerapkan deteksi tabrakan sederhana dan pantulan.',
      'Memisahkan logika game dari tampilan.',
    ],
    technologies: ['C++', 'STL'],
    difficulty: 'Medium',
    requirements: [
      'Game loop dengan langkah waktu tetap yang memisahkan pembaruan keadaan dari penggambaran.',
      'Bola yang memantul pada dinding dan dua paddle, dengan kecepatan yang bertambah bertahap.',
      'Paddle kedua dikendalikan AI sederhana, dan skor dihitung saat bola lolos.',
      'Logika game ditulis tanpa ketergantungan pada tampilan sehingga bisa diuji secara terpisah.',
    ],
    checklist: [
      'Membuat struktur data keadaan game',
      'Mengimplementasikan game loop dengan langkah waktu tetap',
      'Mengimplementasikan gerak bola dan tabrakan',
      'Menambahkan AI paddle dan skor',
      'Menulis tes untuk logika tabrakan',
    ],
  },
  {
    id: 'f8-cyber-pengaudit-kata-sandi',
    phaseId: 'f8',
    title: 'Cybersecurity: Pengaudit Kata Sandi (Defensif)',
    description:
      'Alat defensif untuk sistem milikmu sendiri: pemeriksa kekuatan kata sandi, penyimpanan hash PBKDF2 dengan salt, dan penganalisis log untuk mendeteksi percobaan masuk yang mencurigakan.',
    goals: [
      'Menerapkan penyimpanan kata sandi yang aman.',
      'Mengenali pola serangan percobaan masuk berulang dari log.',
      'Menerapkan prinsip etika: hanya pada sistem milik sendiri.',
    ],
    technologies: ['Python', 'hashlib', 'hmac'],
    difficulty: 'Medium',
    requirements: [
      'Pemeriksa kekuatan sandi (panjang, ragam karakter, dan daftar sandi umum yang dibuat sendiri) tanpa mengirim sandi ke mana pun.',
      'Penyimpanan hash PBKDF2 dengan salt acak dan verifikasi dengan perbandingan waktu-konstan.',
      'Penganalisis log buatan sendiri yang menandai alamat dengan percobaan gagal berturut-turut melebihi ambang tertentu.',
      'Pembatasan percobaan (rate limiting) sederhana pada fungsi login dan unit test untuk seluruh bagian.',
    ],
    checklist: [
      'Membuat pemeriksa kekuatan sandi',
      'Membuat penyimpanan dan verifikasi hash',
      'Membuat data log buatan dan penganalisisnya',
      'Menambahkan pembatasan percobaan login',
      'Menulis unit test dan mendokumentasikan batas etikanya',
    ],
  },
  {
    id: 'f8-compiler-kalkulator-bytecode',
    phaseId: 'f8',
    title: 'Compiler: Kalkulator ke Bytecode dan Mesin Virtual',
    description:
      'Kembangkan kalkulator ekspresi menjadi compiler mini: lexer, parser, AST, pembuat bytecode, dan mesin virtual berbasis stack.',
    goals: [
      'Memahami seluruh tahap dari teks sampai eksekusi.',
      'Menerjemahkan AST menjadi bytecode.',
      'Membuat mesin virtual berbasis stack yang menjalankan bytecode.',
    ],
    technologies: ['Python atau C++', 'AST', 'bytecode'],
    difficulty: 'Hard',
    requirements: [
      'Lexer dan parser rekursif yang mendukung + - * /, kurung, minus unary, dan variabel dengan penugasan.',
      'Pembuat bytecode (PUSH, LOAD, STORE, ADD, SUB, MUL, DIV, NEG) dari AST.',
      'Mesin virtual berbasis stack yang menjalankan bytecode dan melaporkan error seperti pembagian nol dengan jelas.',
      'Mode tampilan yang mencetak token, AST, bytecode, dan hasil untuk setiap ekspresi.',
    ],
    checklist: [
      'Memperluas lexer dan parser',
      'Mendefinisikan set instruksi bytecode',
      'Menulis pembuat bytecode dari AST',
      'Menulis mesin virtual berbasis stack',
      'Menguji ekspresi bersarang dan kasus error',
    ],
  },
];