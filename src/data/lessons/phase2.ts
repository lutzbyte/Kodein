import type { LessonContent } from '@/types/content';

export const phase2Lessons: LessonContent[] = [
  {
    id: 'f2-computational-thinking',
    description:
      'Computational thinking adalah cara berpikir untuk memecahkan masalah secara terstruktur sehingga solusinya bisa dijalankan komputer.',
    objectives: [
      'Menyebutkan empat pilar computational thinking.',
      'Menerapkan keempat pilar pada masalah sederhana.',
      'Menerjemahkan solusi menjadi langkah yang bisa diprogram.',
    ],
    explanation: [
      'Computational thinking bukan berarti berpikir seperti komputer, melainkan menyusun masalah dan solusi dengan cara yang bisa dilaksanakan oleh manusia maupun mesin. Ada empat pilar: decomposition (memecah masalah), pattern recognition (mengenali pola), abstraction (fokus pada hal penting), dan algorithm design (menyusun langkah solusi).',
      'Ambil contoh mencari bilangan terbesar dari tiga bilangan. Pecah masalahnya menjadi perbandingan satu per satu, kenali bahwa langkahnya berulang (bandingkan kandidat terbesar dengan bilangan berikutnya), abaikan hal yang tidak penting seperti asal bilangan, lalu susun langkahnya menjadi algoritma.',
      'Kebiasaan ini menentukan kualitas programmer. Programmer yang baik tidak langsung mengetik kode, tetapi memahami masalah dan merancang solusi terlebih dahulu.',
    ],
    sectionsTitle: 'Empat Pilar',
    sections: [
      {
        title: 'Decomposition',
        body: 'Memecah masalah besar menjadi bagian-bagian kecil yang lebih mudah dikerjakan.',
      },
      {
        title: 'Pattern recognition',
        body: 'Mencari kesamaan atau pola berulang di antara bagian-bagian masalah agar solusi bisa dipakai ulang.',
      },
      {
        title: 'Abstraction',
        body: 'Menyaring detail yang tidak relevan dan hanya memperhatikan informasi yang penting untuk masalah.',
      },
      {
        title: 'Algorithm design',
        body: 'Menyusun langkah-langkah yang jelas, berurutan, dan berhingga untuk menyelesaikan masalah.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int main(void) {
    int a = 12, b = 45, c = 30;

    int terbesar = a;
    if (b > terbesar) {
        terbesar = b;
    }
    if (c > terbesar) {
        terbesar = c;
    }

    printf("Terbesar: %d\n", terbesar);
    return 0;
}`,
      explanation: [
        'Anggap a sebagai kandidat terbesar, lalu bandingkan dengan bilangan berikutnya satu per satu.',
        'Langkah "bandingkan dengan kandidat" berulang, itulah pola yang nanti bisa dipakai pada banyak bilangan.',
        'Variabel terbesar mewakili abstraksi: kita hanya peduli nilai tertinggi sejauh ini, bukan urutan bilangannya.',
      ],
      output: 'Terbesar: 45',
    },
    notes: [
      'Pahami masalah sebelum menulis kode. Tanyakan: apa inputnya, apa outputnya, dan apa aturannya?',
      'Uji ide dengan contoh kecil di kertas sebelum memprogramnya.',
    ],
  },
  {
    id: 'f2-decomposition',
    description:
      'Decomposition memecah masalah besar menjadi sub-masalah kecil yang masing-masing bisa diselesaikan dan diuji sendiri.',
    objectives: [
      'Memecah masalah menjadi sub-masalah yang jelas.',
      'Memetakan sub-masalah menjadi fungsi.',
      'Menjelaskan manfaat decomposition untuk pengujian dan pemeliharaan.',
    ],
    explanation: [
      'Masalah besar sulit dipahami sekaligus. Dengan decomposition, kita membaginya hingga setiap bagian cukup kecil untuk dikerjakan. Contoh: program menghitung luas dan keliling persegi panjang bisa dipecah menjadi menghitung luas, menghitung keliling, dan menampilkan hasil.',
      'Di C, setiap sub-masalah umumnya menjadi satu fungsi. Fungsi main hanya bertugas mengatur urutan pemanggilan, sehingga alur program mudah dibaca dari atas ke bawah.',
      'Keuntungan lain: setiap fungsi bisa diuji sendiri, dikerjakan oleh orang berbeda, dan diperbaiki tanpa merusak bagian lain.',
    ],
    sectionsTitle: 'Langkah Memecah Masalah',
    sections: [
      {
        title: '1. Tulis tujuan akhir',
        body: 'Rumuskan satu kalimat tentang hasil yang diinginkan, misalnya "menampilkan luas dan keliling persegi panjang".',
      },
      {
        title: '2. Bagi menjadi tugas',
        body: 'Pecah tujuan menjadi tugas kecil yang masing-masing punya satu jawaban jelas, misalnya hitung luas dan hitung keliling.',
      },
      {
        title: '3. Tentukan input dan output tiap tugas',
        body: 'Untuk luas: input panjang dan lebar, output satu angka. Ini langsung menjadi parameter dan nilai balik fungsi.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int hitungLuas(int panjang, int lebar);
int hitungKeliling(int panjang, int lebar);
void tampilkanHasil(int luas, int keliling);

int main(void) {
    int panjang = 8;
    int lebar = 5;

    int luas = hitungLuas(panjang, lebar);
    int keliling = hitungKeliling(panjang, lebar);
    tampilkanHasil(luas, keliling);
    return 0;
}

int hitungLuas(int panjang, int lebar) {
    return panjang * lebar;
}

int hitungKeliling(int panjang, int lebar) {
    return 2 * (panjang + lebar);
}

void tampilkanHasil(int luas, int keliling) {
    printf("Luas: %d\n", luas);
    printf("Keliling: %d\n", keliling);
}`,
      explanation: [
        'Tiga fungsi mewakili tiga sub-masalah: menghitung luas, menghitung keliling, dan menampilkan hasil.',
        'main hanya mengatur alur: ambil data, panggil perhitungan, tampilkan hasil.',
        'Setiap fungsi bisa diuji sendiri, misalnya hitungLuas(8, 5) harus selalu 40.',
      ],
      output: 'Luas: 40\nKeliling: 26',
    },
    notes: [
      'Jika sebuah fungsi sulit diberi nama, kemungkinan ia mengerjakan terlalu banyak tugas dan perlu dipecah lagi.',
      'Pisahkan perhitungan dari tampilan agar logika bisa dipakai ulang.',
    ],
  },
  {
    id: 'f2-pattern-recognition',
    description:
      'Pattern recognition adalah kemampuan melihat keteraturan sehingga satu solusi bisa dipakai untuk banyak kasus.',
    objectives: [
      'Mengenali pola berulang pada data atau output.',
      'Mengubah pola menjadi loop atau rumus.',
      'Memakai nested loop untuk membuat pola dua dimensi.',
    ],
    explanation: [
      'Banyak masalah terlihat berbeda tetapi ternyata memiliki pola yang sama. Jika kamu menemukan polanya, kamu tidak perlu menulis solusi terpisah untuk setiap kasus. Cukup tulis satu aturan umum dan biarkan loop atau fungsi mengulanginya.',
      'Contoh: segitiga bintang dengan 4 baris. Baris pertama berisi 1 bintang, baris kedua 2 bintang, dan seterusnya. Polanya: baris ke-i berisi i bintang. Pola ini bisa ditulis dengan dua loop bertingkat.',
      'Mengenali pola juga berlaku untuk bilangan. Deret 2, 4, 6, 8 memiliki pola "tambah 2" atau rumus 2 x n. Setelah pola ditemukan, kita bisa menghitung suku ke-100 tanpa menuliskan 99 suku sebelumnya.',
    ],
    sectionsTitle: 'Cara Menemukan Pola',
    sections: [
      {
        title: 'Amati beberapa contoh',
        body: 'Tulis tiga sampai lima contoh input dan outputnya, lalu cari apa yang berubah dan apa yang tetap.',
      },
      {
        title: 'Cari hubungan',
        body: 'Tentukan hubungan antara nomor urut dan hasilnya, misalnya "jumlah bintang sama dengan nomor baris".',
      },
      {
        title: 'Ubah menjadi kode',
        body: 'Hal yang berubah menjadi variabel loop, hal yang tetap menjadi isi loop.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int main(void) {
    for (int baris = 1; baris <= 4; baris++) {
        for (int kolom = 1; kolom <= baris; kolom++) {
            printf("*");
        }
        printf("\n");
    }
    return 0;
}`,
      explanation: [
        'Loop luar mengatur baris dari 1 sampai 4.',
        'Loop dalam mencetak bintang sebanyak nomor baris, sesuai pola "baris ke-i berisi i bintang".',
        'printf("\\n") di akhir setiap baris memindahkan kursor ke baris berikutnya.',
      ],
      output: '*\n**\n***\n****',
    },
    notes: [
      'Jika dua bagian kode hampir sama, itu tanda adanya pola yang bisa disatukan dengan loop atau fungsi.',
      'Uji pola dengan nilai kecil dan nilai batas sebelum yakin pola tersebut benar.',
    ],
  },
  {
    id: 'f2-abstraction',
    description:
      'Abstraction menyembunyikan detail rumit di balik antarmuka sederhana sehingga kita fokus pada apa yang dilakukan, bukan bagaimana.',
    objectives: [
      'Menjelaskan perbedaan antara apa yang dilakukan dan bagaimana melakukannya.',
      'Membuat fungsi sebagai lapisan abstraksi.',
      'Memberi nama fungsi yang menggambarkan tujuannya.',
    ],
    explanation: [
      'Saat kamu memakai printf, kamu tidak perlu tahu bagaimana teks digambar di layar. Kamu cukup tahu apa yang dilakukannya. Itulah abstraksi: menyembunyikan detail implementasi dan hanya menampilkan hal yang dibutuhkan pemakai.',
      'Dalam kode, fungsi adalah alat abstraksi paling dasar. Fungsi adalahGenap(n) memberi tahu pemanggil apakah n genap tanpa pemanggil peduli bagaimana pengecekannya dilakukan. Jika caranya diubah suatu hari, kode pemanggil tidak perlu berubah.',
      'Abstraksi yang baik punya nama yang jujur dan tugas yang jelas. Nama seperti hitungDiskon lebih berguna daripada proses2 karena pembaca langsung paham maksudnya tanpa membaca isinya.',
    ],
    sectionsTitle: 'Prinsip Abstraksi',
    sections: [
      {
        title: 'Sembunyikan detail',
        body: 'Pemanggil cukup tahu input dan output fungsi, tidak perlu tahu langkah internalnya.',
      },
      {
        title: 'Beri nama bermakna',
        body: 'Nama fungsi dan variabel harus menjelaskan tujuan, bukan cara kerjanya.',
      },
      {
        title: 'Satu tingkat abstraksi',
        body: 'Dalam satu fungsi, hindari mencampur langkah tingkat tinggi dan detail tingkat rendah.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>
#include <stdbool.h>

bool adalahGenap(int n) {
    return n % 2 == 0;
}

int main(void) {
    int daftar[2] = {7, 10};

    for (int i = 0; i < 2; i++) {
        int n = daftar[i];
        printf("%d adalah %s\n", n, adalahGenap(n) ? "genap" : "ganjil");
    }
    return 0;
}`,
      explanation: [
        'adalahGenap menyembunyikan cara pengecekan (n % 2 == 0) di balik nama yang jelas.',
        'main cukup bertanya "apakah genap?" tanpa memikirkan operator modulus.',
        'Tipe bool dari stdbool.h menyatakan nilai benar atau salah. Array daftar dibahas lengkap di Fase 3.',
      ],
      output: '7 adalah ganjil\n10 adalah genap',
    },
    notes: [
      'Abstraksi yang baik membuat kode terbaca seperti kalimat.',
      'Terlalu banyak lapisan abstraksi bisa mempersulit pemahaman. Buat abstraksi saat memang ada yang diulang atau disembunyikan.',
    ],
  },
  {
    id: 'f2-algorithm-design',
    description:
      'Algorithm design adalah menyusun langkah-langkah yang jelas, berurutan, dan berhingga untuk menyelesaikan suatu masalah.',
    objectives: [
      'Menyebutkan ciri-ciri algoritma yang baik.',
      'Mengikuti tahapan merancang algoritma.',
      'Menguji algoritma dengan contoh nyata sebelum diprogram.',
    ],
    explanation: [
      'Algoritma yang baik memiliki beberapa ciri: ada input dan output yang jelas, setiap langkah pasti dan tidak ambigu, algoritma berhenti setelah jumlah langkah tertentu, dan setiap langkah bisa benar-benar dikerjakan.',
      'Tahapan merancang algoritma: pahami masalah, rancang langkah solusi, uji dengan contoh di atas kertas, baru kemudian tulis kode dan uji lagi. Menguji di atas kertas menghemat waktu karena kesalahan ide ketahuan sebelum kode ditulis.',
      'Contoh: menjumlahkan digit sebuah bilangan. Selama bilangan masih lebih dari 0, ambil digit terakhir dengan operator % 10, tambahkan ke total, lalu buang digit terakhir dengan pembagian 10.',
    ],
    sectionsTitle: 'Ciri Algoritma',
    sections: [
      {
        title: 'Input dan output',
        body: 'Algoritma menerima nol atau lebih input dan menghasilkan minimal satu output.',
      },
      {
        title: 'Pasti (definite)',
        body: 'Setiap langkah ditulis jelas sehingga tidak menimbulkan tafsir ganda.',
      },
      {
        title: 'Berhingga (finite)',
        body: 'Algoritma harus berhenti setelah sejumlah langkah. Loop tanpa akhir bukan algoritma yang baik.',
      },
      {
        title: 'Efektif',
        body: 'Setiap langkah cukup sederhana untuk dikerjakan, dan idealnya tidak boros waktu atau memori.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int main(void) {
    int angka = 4821;
    int n = angka;
    int total = 0;

    while (n > 0) {
        total += n % 10;
        n /= 10;
    }

    printf("Jumlah digit dari %d = %d\n", angka, total);
    return 0;
}`,
      explanation: [
        'n % 10 mengambil digit terakhir (4821 menghasilkan 1).',
        'n /= 10 membuang digit terakhir (4821 menjadi 482), sehingga loop akhirnya berhenti ketika n menjadi 0.',
        'Total: 1 + 2 + 8 + 4 = 15. Salinan n dipakai agar nilai asli angka tidak hilang.',
      ],
      output: 'Jumlah digit dari 4821 = 15',
    },
    notes: [
      'Selalu pikirkan kapan algoritma berhenti.',
      'Uji algoritma dengan kasus biasa, kasus batas (misalnya 0), dan kasus tidak biasa.',
    ],
  },
  {
    id: 'f2-pseudocode',
    description:
      'Pseudocode adalah cara menuliskan algoritma dengan bahasa mirip kode tetapi bebas dari aturan sintaks bahasa tertentu.',
    objectives: [
      'Menulis algoritma sederhana dalam bentuk pseudocode.',
      'Menerjemahkan pseudocode menjadi kode C.',
      'Menggunakan pseudocode untuk mengomunikasikan ide.',
    ],
    explanation: [
      'Pseudocode menjembatani ide dan kode. Tidak ada aturan baku, tetapi kata-kata yang umum dipakai adalah MULAI, SELESAI, BACA, TAMPILKAN, JIKA, MAKA, SELAMA, dan panah untuk pemberian nilai. Karena tidak terikat sintaks, kita bisa fokus pada logika.',
      'Pseudocode yang baik singkat, jelas, dan diberi indentasi untuk menunjukkan struktur. Satu baris menggambarkan satu langkah. Hindari detail sintaks seperti titik koma atau tipe data kecuali penting.',
      'Setelah pseudocode disetujui, menerjemahkannya ke C hampir mekanis: BACA menjadi scanf, TAMPILKAN menjadi printf, JIKA menjadi if, dan SELAMA menjadi while.',
    ],
    sectionsTitle: 'Contoh Pseudocode',
    sections: [
      {
        title: 'Rata-rata tiga nilai',
        body: 'MULAI\n  BACA nilai1, nilai2, nilai3\n  total ← nilai1 + nilai2 + nilai3\n  rata ← total / 3\n  TAMPILKAN rata\nSELESAI',
      },
      {
        title: 'Genap atau ganjil',
        body: 'MULAI\n  BACA n\n  JIKA n mod 2 = 0 MAKA\n    TAMPILKAN "genap"\n  SELAIN ITU\n    TAMPILKAN "ganjil"\nSELESAI',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int main(void) {
    double nilai1 = 80, nilai2 = 90, nilai3 = 70;

    double total = nilai1 + nilai2 + nilai3;
    double rata = total / 3;

    printf("Rata-rata = %.2f\n", rata);
    return 0;
}`,
      explanation: [
        'Setiap baris pseudocode "rata-rata tiga nilai" punya padanan langsung di kode C.',
        'total ← nilai1 + nilai2 + nilai3 menjadi double total = nilai1 + nilai2 + nilai3;',
        'Memakai double agar pembagian menghasilkan desimal. (80 + 90 + 70) / 3 = 80.00.',
      ],
      output: 'Rata-rata = 80.00',
    },
    notes: [
      'Tulis pseudocode dengan bahasa yang bisa dipahami orang yang tidak mengenal C.',
      'Jika pseudocode terlalu mirip kode lengkap, mungkin kamu sudah menulis detail yang tidak perlu.',
    ],
  },
  {
    id: 'f2-flowchart',
    description:
      'Flowchart menggambarkan alur algoritma dengan simbol dan panah sehingga logikanya terlihat secara visual.',
    objectives: [
      'Mengenali simbol dasar flowchart.',
      'Membaca flowchart dari awal sampai akhir.',
      'Menerjemahkan flowchart percabangan menjadi kode C.',
    ],
    explanation: [
      'Flowchart adalah diagram yang menunjukkan urutan langkah algoritma. Setiap simbol mewakili jenis langkah dan panah menunjukkan arah alur. Dengan melihat gambar, kita dapat dengan cepat memahami bagaimana alur bercabang atau berulang.',
      'Simbol yang paling sering dipakai: oval untuk awal dan akhir, jajar genjang untuk input atau output, persegi panjang untuk proses, dan belah ketupat untuk keputusan dengan dua cabang (Ya dan Tidak).',
      'Mulailah dari simbol awal, ikuti panah, dan setiap keputusan harus punya dua jalur keluar yang berlabel. Pastikan semua jalur akhirnya sampai ke simbol akhir.',
    ],
    sectionsTitle: 'Simbol Flowchart',
    sections: [
      {
        title: 'Terminator (oval)',
        body: 'Menandai awal (Mulai) dan akhir (Selesai) algoritma.',
      },
      {
        title: 'Input/Output (jajar genjang)',
        body: 'Menandai langkah membaca data atau menampilkan hasil.',
      },
      {
        title: 'Proses (persegi panjang)',
        body: 'Menandai perhitungan atau pemberian nilai, misalnya total = a + b.',
      },
      {
        title: 'Keputusan (belah ketupat)',
        body: 'Berisi pertanyaan ya atau tidak. Dua panah keluar diberi label Ya dan Tidak.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int main(void) {
    int n = -4;

    if (n > 0) {
        printf("%d adalah bilangan positif\n", n);
    } else if (n < 0) {
        printf("%d adalah bilangan negatif\n", n);
    } else {
        printf("%d adalah nol\n", n);
    }
    return 0;
}`,
      explanation: [
        'Flowchart-nya memiliki dua belah ketupat: pertama "n > 0?", lalu "n < 0?" jika jawabannya Tidak.',
        'Setiap jalur berakhir di simbol output berbeda, lalu bertemu di simbol Selesai.',
        'Setiap belah ketupat pada gambar menjadi satu if atau else if pada kode.',
      ],
      output: '-4 adalah bilangan negatif',
    },
    notes: [
      'Flowchart yang terlalu besar sulit dibaca. Pecah menjadi beberapa flowchart kecil.',
      'Pastikan tidak ada panah yang menggantung tanpa tujuan.',
    ],
  },
  {
    id: 'f2-recursion',
    description:
      'Rekursi adalah teknik di mana sebuah fungsi memanggil dirinya sendiri untuk menyelesaikan versi yang lebih kecil dari masalah yang sama.',
    objectives: [
      'Menjelaskan base case dan recursive case.',
      'Menelusuri pemanggilan rekursif melalui call stack.',
      'Mengenali risiko rekursi tanpa base case dan perbandingannya dengan iterasi.',
    ],
    explanation: [
      'Fungsi rekursif memiliki dua bagian. Base case adalah kondisi berhenti yang langsung memberi jawaban tanpa memanggil diri sendiri. Recursive case memecah masalah menjadi masalah yang lebih kecil lalu memanggil fungsi yang sama. Tanpa base case, pemanggilan tidak pernah berhenti dan program kehabisan memori stack (stack overflow).',
      'Contoh klasik adalah faktorial: n! = n x (n-1)!, dengan base case 0! = 1! = 1. Saat faktorial(3) dipanggil, ia menunggu hasil faktorial(2), yang menunggu faktorial(1). Setelah faktorial(1) mengembalikan 1, hasil dikembalikan satu per satu: 2, lalu 6.',
      'Setiap pemanggilan memakai ruang di call stack. Untuk masalah sederhana, perulangan biasa sering lebih hemat memori. Rekursi unggul pada masalah yang secara alami berbentuk pohon atau terbagi, seperti penelusuran direktori, pohon, dan divide and conquer.',
    ],
    sectionsTitle: 'Menelusuri faktorial(3)',
    sections: [
      {
        title: 'Memanggil ke bawah',
        body: 'faktorial(3) memanggil faktorial(2), yang memanggil faktorial(1). Pada n = 1 base case terpenuhi.',
      },
      {
        title: 'Mengembalikan ke atas',
        body: 'faktorial(1) mengembalikan 1. faktorial(2) menghitung 2 x 1 = 2. faktorial(3) menghitung 3 x 2 = 6.',
      },
      {
        title: 'Kapan memilih rekursi',
        body: 'Pilih rekursi jika masalah terbagi menjadi sub-masalah serupa. Pilih loop jika langkahnya sederhana dan jumlah putaran besar.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

long long faktorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * faktorial(n - 1);
}

int main(void) {
    printf("5! = %lld\n", faktorial(5));
    printf("10! = %lld\n", faktorial(10));
    return 0;
}`,
      explanation: [
        'if (n <= 1) adalah base case: berhenti dan mengembalikan 1.',
        'n * faktorial(n - 1) adalah recursive case: masalah diperkecil dengan mengurangi n.',
        'Tipe long long dipilih karena faktorial tumbuh sangat cepat. 20! adalah batas terbesar yang masih muat di long long pada umumnya.',
      ],
      output: '5! = 120\n10! = 3628800',
    },
    notes: [
      'Pastikan setiap pemanggilan rekursif bergerak mendekati base case.',
      'Rekursi yang terlalu dalam menyebabkan stack overflow.',
    ],
  },
  {
    id: 'f2-brute-force',
    description:
      'Brute force menyelesaikan masalah dengan mencoba semua kemungkinan jawaban sampai menemukan yang benar.',
    objectives: [
      'Menjelaskan cara kerja pendekatan brute force.',
      'Mengimplementasikan brute force sederhana dengan loop.',
      'Menilai kapan brute force masih layak dipakai.',
    ],
    explanation: [
      'Brute force adalah strategi paling langsung: periksa semua kandidat solusi satu per satu dan ambil yang memenuhi syarat. Pendekatan ini mudah dibuat dan hampir pasti benar karena tidak melewatkan kemungkinan apa pun.',
      'Kelemahannya adalah waktu. Jika jumlah kandidat sangat besar, program menjadi sangat lambat. Mencari semua faktor sebuah bilangan n dengan mengecek 1 sampai n butuh n langkah, yang masih wajar untuk n kecil tetapi lambat untuk n yang sangat besar.',
      'Brute force bagus sebagai titik awal dan sebagai pembanding. Buat versi brute force yang benar lebih dulu, lalu cari cara yang lebih efisien dan bandingkan hasilnya untuk memastikan optimasi tidak mengubah jawaban.',
    ],
    sectionsTitle: 'Kapan Brute Force Layak',
    sections: [
      {
        title: 'Ruang pencarian kecil',
        body: 'Jika jumlah kemungkinan hanya ratusan atau ribuan, brute force cukup cepat dan sangat sederhana.',
      },
      {
        title: 'Sebagai pembanding',
        body: 'Versi brute force dipakai untuk memastikan algoritma yang lebih cepat menghasilkan jawaban yang sama.',
      },
      {
        title: 'Tidak layak',
        body: 'Jika kandidat tumbuh eksponensial (misalnya semua kombinasi 30 item), brute force menjadi tidak praktis.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int main(void) {
    int n = 28;

    printf("Faktor dari %d:", n);
    for (int i = 1; i <= n; i++) {
        if (n % i == 0) {
            printf(" %d", i);
        }
    }
    printf("\n");
    return 0;
}`,
      explanation: [
        'Loop mencoba setiap bilangan i dari 1 sampai n sebagai kandidat faktor.',
        'n % i == 0 menguji apakah n habis dibagi i, yang berarti i adalah faktor.',
        'Banyak langkah sama dengan n, jadi pertumbuhan waktunya linear.',
      ],
      output: 'Faktor dari 28: 1 2 4 7 14 28',
    },
    notes: [
      'Brute force bukan berarti buruk. Ia sering menjadi solusi paling aman untuk data kecil.',
      'Ukur dulu sebelum mengoptimasi: pastikan benar-benar ada masalah kecepatan.',
    ],
  },
  {
    id: 'f2-mathematical-algorithms',
    description:
      'Banyak masalah pemrograman bertumpu pada algoritma matematika klasik seperti FPB, KPK, dan bilangan prima.',
    objectives: [
      'Menghitung FPB dengan algoritma Euclid.',
      'Menghitung KPK dari FPB.',
      'Menguji bilangan prima secara efisien.',
    ],
    explanation: [
      'Algoritma Euclid menghitung FPB (faktor persekutuan terbesar) dengan prinsip sederhana: FPB(a, b) sama dengan FPB(b, a mod b). Ulangi sampai sisa pembagian 0; bilangan terakhir yang bukan nol adalah FPB. Algoritma ini jauh lebih cepat daripada mencoba semua faktor.',
      'KPK (kelipatan persekutuan terkecil) bisa dihitung dari FPB: KPK(a, b) = a / FPB(a, b) x b. Membagi lebih dulu sebelum mengalikan membantu mengurangi risiko overflow.',
      'Untuk menguji bilangan prima, cukup periksa pembagi dari 2 sampai akar kuadrat n. Jika n punya faktor lebih besar dari akar n, pasti ia juga punya pasangan faktor yang lebih kecil dari akar n. Kondisi i * i <= n menjadi batas yang efisien tanpa memakai fungsi akar.',
    ],
    sectionsTitle: 'Ringkasan Rumus',
    sections: [
      {
        title: 'FPB (Euclid)',
        body: 'FPB(48, 18): 48 mod 18 = 12, FPB(18, 12): 18 mod 12 = 6, FPB(12, 6): 12 mod 6 = 0. Jadi FPB = 6.',
      },
      {
        title: 'KPK',
        body: 'KPK(48, 18) = 48 / 6 x 18 = 144.',
      },
      {
        title: 'Bilangan prima',
        body: 'Bilangan lebih dari 1 yang hanya habis dibagi 1 dan dirinya sendiri. Periksa pembagi sampai akar kuadrat n.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int fpb(int a, int b) {
    while (b != 0) {
        int sisa = a % b;
        a = b;
        b = sisa;
    }
    return a;
}

int adalahPrima(int n) {
    if (n < 2) {
        return 0;
    }
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            return 0;
        }
    }
    return 1;
}

int main(void) {
    printf("FPB(48, 18) = %d\n", fpb(48, 18));
    printf("KPK(48, 18) = %d\n", 48 / fpb(48, 18) * 18);
    printf("97 prima? %s\n", adalahPrima(97) ? "ya" : "tidak");
    return 0;
}`,
      explanation: [
        'fpb mengulang langkah (a, b) menjadi (b, a mod b) sampai b bernilai 0.',
        'KPK dihitung dengan 48 / fpb x 18. Membagi dulu mencegah hasil perkalian membesar.',
        'adalahPrima mengembalikan 0 untuk bilangan kurang dari 2, lalu mencoba pembagi hingga i * i melebihi n.',
        '97 tidak habis dibagi 2 sampai 9, sehingga ia prima.',
      ],
      output: 'FPB(48, 18) = 6\nKPK(48, 18) = 144\n97 prima? ya',
    },
    notes: [
      '0 dan 1 bukan bilangan prima.',
      'Pada bilangan yang sangat besar, hati-hati dengan overflow saat mengalikan.',
    ],
  },
  {
    id: 'f2-time-complexity',
    description:
      'Time complexity mengukur bagaimana jumlah langkah algoritma bertambah ketika ukuran inputnya membesar.',
    objectives: [
      'Menghitung jumlah langkah algoritma sederhana.',
      'Membedakan pertumbuhan linear dan kuadratik.',
      'Menjelaskan mengapa jumlah langkah lebih bermakna daripada waktu stopwatch.',
    ],
    explanation: [
      'Waktu eksekusi di komputer bergantung pada perangkat keras dan program lain yang sedang berjalan, sehingga kurang adil untuk membandingkan algoritma. Cara yang lebih adil adalah menghitung jumlah langkah dasar sebagai fungsi ukuran input n.',
      'Satu loop yang berjalan n kali melakukan sekitar n langkah (pertumbuhan linear). Dua loop bersarang yang masing-masing berjalan n kali melakukan sekitar n x n langkah (pertumbuhan kuadratik). Saat n membesar, perbedaan keduanya menjadi sangat besar.',
      'Itulah sebabnya pemilihan algoritma sangat penting. Komputer yang lebih cepat hanya mempercepat konstanta, sedangkan algoritma yang lebih baik mengubah laju pertumbuhan.',
    ],
    sectionsTitle: 'Pertumbuhan Langkah',
    sections: [
      {
        title: 'Satu loop',
        body: 'n = 10: 10 langkah. n = 100: 100 langkah. n = 1000: 1.000 langkah.',
      },
      {
        title: 'Dua loop bersarang',
        body: 'n = 10: 100 langkah. n = 100: 10.000 langkah. n = 1000: 1.000.000 langkah.',
      },
      {
        title: 'Pelajaran',
        body: 'Jika input dikali 10, algoritma linear butuh 10 kali lebih banyak langkah, sedangkan algoritma kuadratik butuh 100 kali lebih banyak.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int main(void) {
    int n = 10;

    int langkahSatu = 0;
    for (int i = 0; i < n; i++) {
        langkahSatu++;
    }

    int langkahDua = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            langkahDua++;
        }
    }

    printf("Satu loop : %d langkah\n", langkahSatu);
    printf("Dua loop  : %d langkah\n", langkahDua);
    return 0;
}`,
      explanation: [
        'langkahSatu dihitung di dalam satu loop, jadi nilainya sama dengan n.',
        'langkahDua dihitung di dalam loop bersarang, jadi nilainya n x n.',
        'Coba ubah n menjadi 100 untuk melihat 100 berbanding 10.000.',
      ],
      output: 'Satu loop : 10 langkah\nDua loop  : 100 langkah',
    },
    notes: [
      'Yang dihitung adalah laju pertumbuhan, bukan waktu pasti dalam detik.',
      'Konstanta kecil biasanya diabaikan saat membandingkan algoritma.',
    ],
  },
  {
    id: 'f2-big-o-notation',
    description:
      'Notasi Big O menggambarkan batas atas laju pertumbuhan jumlah langkah algoritma pada input yang besar.',
    objectives: [
      'Menulis kompleksitas algoritma dengan notasi Big O.',
      'Menyederhanakan ekspresi dengan membuang konstanta dan suku yang lebih kecil.',
      'Mengenali kelas kompleksitas umum.',
    ],
    explanation: [
      'Big O menyatakan bagaimana jumlah langkah bertumbuh ketika n sangat besar. Aturan penyederhanaannya: buang konstanta pengali dan buang suku yang pertumbuhannya lebih lambat. Algoritma dengan 3n + 10 langkah ditulis O(n), dan n² + 5n + 2 ditulis O(n²).',
      'Kelas yang umum, dari yang tercepat: O(1) konstan, O(log n) logaritmik, O(n) linear, O(n log n), O(n²) kuadratik, dan O(2ⁿ) eksponensial. Algoritma O(log n) sangat efisien karena setiap langkah memangkas ukuran masalah menjadi setengahnya.',
      'Big O biasanya menggambarkan kasus terburuk, yaitu jaminan bahwa algoritma tidak akan lebih lambat dari batas tersebut. Informasi ini membantu memilih algoritma sebelum data menjadi besar.',
    ],
    sectionsTitle: 'Kelas Kompleksitas',
    sections: [
      {
        title: 'O(1) dan O(log n)',
        body: 'O(1): langkah tetap berapa pun n, misalnya mengakses elemen array. O(log n): ukuran masalah dipangkas separuh tiap langkah, misalnya binary search.',
      },
      {
        title: 'O(n) dan O(n log n)',
        body: 'O(n): satu kali melewati semua data, misalnya mencari nilai terbesar. O(n log n): umum pada algoritma pengurutan yang efisien seperti merge sort.',
      },
      {
        title: 'O(n²) dan O(2ⁿ)',
        body: 'O(n²): loop bersarang, misalnya bubble sort. O(2ⁿ): melipat dua setiap tambah satu input, misalnya fibonacci rekursif naif. Tidak praktis untuk n besar.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int main(void) {
    int n = 1000;
    int langkah = 0;
    int x = n;

    while (x > 1) {
        x /= 2;
        langkah++;
    }

    printf("Membagi %d menjadi 1 butuh %d langkah\n", n, langkah);
    return 0;
}`,
      explanation: [
        'Setiap putaran, x dibagi 2 sehingga ukuran masalah berkurang setengahnya.',
        '1000 menjadi 500, 250, 125, 62, 31, 15, 7, 3, lalu 1: total 9 langkah.',
        'Itulah O(log n). Menggandakan n hanya menambah satu langkah.',
      ],
      output: 'Membagi 1000 menjadi 1 butuh 9 langkah',
    },
    notes: [
      'Big O adalah gambaran pertumbuhan, bukan waktu eksekusi sebenarnya.',
      'Untuk n yang kecil, algoritma dengan Big O lebih buruk kadang masih lebih cepat karena konstanta yang lebih kecil.',
    ],
  },
];