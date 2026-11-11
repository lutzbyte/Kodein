import type { LessonContent } from '@/types/content';

export const phase3Lessons: LessonContent[] = [
  {
    id: 'f3-array',
    description:
      'Array menyimpan sekumpulan data bertipe sama dalam satu variabel dan diakses cepat melalui indeks.',
    objectives: [
      'Mendeklarasikan dan menginisialisasi array.',
      'Mengakses elemen lewat indeks yang dimulai dari 0.',
      'Menelusuri array dengan loop tanpa melewati batas.',
    ],
    explanation: [
      'Array adalah kumpulan elemen bertipe sama yang disimpan berurutan di memori. Dengan satu nama dan sebuah indeks, kita bisa mengakses setiap elemen. Indeks pertama adalah 0, sehingga array berukuran 5 memiliki indeks 0 sampai 4.',
      'Karena elemennya berurutan di memori, alamat elemen ke-i bisa dihitung langsung. Itu sebabnya mengakses elemen lewat indeks sangat cepat, yaitu O(1). Sebaliknya, menyisipkan atau menghapus di tengah array membutuhkan penggeseran elemen sehingga O(n).',
      'C tidak memeriksa batas indeks. Mengakses nilai[5] pada array berukuran 5 tidak menimbulkan error kompilasi, tetapi perilakunya tidak terdefinisi dan sering menjadi sumber bug serius. Simpan ukuran array dan periksa batasnya sendiri.',
    ],
    sectionsTitle: 'Dasar Array',
    sections: [
      {
        title: 'Deklarasi dan inisialisasi',
        body: 'int a[5]; membuat array 5 elemen tanpa nilai awal. int b[5] = {1, 2, 3, 4, 5}; memberi nilai awal. int c[] = {1, 2, 3}; membuat ukuran otomatis menjadi 3.',
      },
      {
        title: 'Menghitung ukuran',
        body: 'sizeof(arr) / sizeof(arr[0]) menghasilkan jumlah elemen. Cara ini hanya benar pada array aslinya, bukan pada array yang dikirim ke fungsi (di sana ia menjadi pointer), jadi kirim ukurannya sebagai parameter terpisah.',
      },
      {
        title: 'Kompleksitas',
        body: 'Akses lewat indeks O(1). Pencarian nilai O(n). Sisip atau hapus di tengah O(n) karena elemen harus digeser.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int main(void) {
    int nilai[5] = {80, 65, 90, 75, 85};
    int total = 0;

    for (int i = 0; i < 5; i++) {
        total += nilai[i];
    }

    printf("Elemen pertama: %d\n", nilai[0]);
    printf("Elemen terakhir: %d\n", nilai[4]);
    printf("Rata-rata: %.1f\n", (double)total / 5);
    return 0;
}`,
      explanation: [
        'nilai[0] adalah elemen pertama dan nilai[4] elemen terakhir pada array berukuran 5.',
        'Loop menjumlahkan semua elemen: 80 + 65 + 90 + 75 + 85 = 395.',
        '(double)total / 5 memaksa pembagian desimal sehingga hasilnya 79.0, bukan 79 hasil pembulatan integer.',
      ],
      output: 'Elemen pertama: 80\nElemen terakhir: 85\nRata-rata: 79.0',
    },
    notes: [
      'Batas indeks yang valid adalah 0 sampai ukuran - 1. Menulis di luar batas dapat merusak data lain di memori.',
      'Array tidak otomatis bernilai 0 jika tidak diinisialisasi. Tulis int a[5] = {0}; untuk mengisi semuanya dengan 0.',
    ],
  },
  {
    id: 'f3-multidimensional-array',
    description:
      'Array multidimensi menyimpan data berbentuk tabel atau matriks dengan lebih dari satu indeks.',
    objectives: [
      'Mendeklarasikan array dua dimensi.',
      'Menelusuri baris dan kolom dengan nested loop.',
      'Memahami cara array dua dimensi disusun di memori.',
    ],
    explanation: [
      'Array dua dimensi cocok untuk data berbentuk tabel, misalnya nilai beberapa siswa pada beberapa mata pelajaran, papan permainan, atau matriks. Elemennya diakses dengan dua indeks: matriks[baris][kolom].',
      'Secara fisik, memori tetap berupa deretan satu dimensi. C menyimpan array dua dimensi secara row-major: seluruh baris pertama, lalu baris kedua, dan seterusnya. Karena itu menelusuri baris demi baris (loop baris di luar, kolom di dalam) lebih ramah cache daripada sebaliknya.',
      'Saat mengirim array dua dimensi ke fungsi, jumlah kolom harus disebutkan pada parameter, misalnya int m[][3]. Compiler membutuhkan jumlah kolom untuk menghitung posisi setiap elemen.',
    ],
    sectionsTitle: 'Hal Penting',
    sections: [
      {
        title: 'Deklarasi',
        body: 'int m[2][3] = {{1, 2, 3}, {4, 5, 6}}; membuat matriks 2 baris dan 3 kolom.',
      },
      {
        title: 'Nested loop',
        body: 'Loop luar mengatur baris, loop dalam mengatur kolom. Total putaran adalah baris x kolom.',
      },
      {
        title: 'Dimensi ketiga',
        body: 'Array tiga dimensi (int a[2][3][4]) mengikuti aturan yang sama dan dipakai misalnya untuk data berlapis. Pada praktiknya dua dimensi paling sering dipakai.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int main(void) {
    int matriks[2][3] = {{1, 2, 3}, {4, 5, 6}};
    int total = 0;

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%3d", matriks[i][j]);
            total += matriks[i][j];
        }
        printf("\n");
    }

    printf("Jumlah semua elemen: %d\n", total);
    return 0;
}`,
      explanation: [
        'matriks[2][3] memiliki 2 baris dan 3 kolom, total 6 elemen.',
        '%3d mencetak setiap angka dengan lebar 3 karakter sehingga kolom terlihat sejajar.',
        'Setelah satu baris selesai dicetak, printf("\\n") pindah ke baris berikutnya.',
        'Jumlah elemen: 1 + 2 + 3 + 4 + 5 + 6 = 21.',
      ],
      output: '  1  2  3\n  4  5  6\nJumlah semua elemen: 21',
    },
    notes: [
      'Hati-hati menukar urutan indeks: matriks[baris][kolom], bukan sebaliknya.',
      'Untuk matriks yang ukurannya baru diketahui saat program berjalan, gunakan alokasi memori dinamis.',
    ],
  },
  {
    id: 'f3-string-manipulation',
    description:
      'String di C adalah array char yang diakhiri karakter null, dan pustaka string.h menyediakan fungsi untuk mengolahnya.',
    objectives: [
      'Menjelaskan bahwa string C adalah array char berakhiran null.',
      'Memakai strlen, strcpy, strcat, dan strcmp.',
      'Mencegah buffer overflow saat menyalin dan menggabungkan string.',
    ],
    explanation: [
      'C tidak punya tipe string bawaan. String adalah array char yang diakhiri karakter khusus null (\\0) sebagai penanda akhir. String "Kodein" memakai 7 elemen: enam huruf ditambah satu null. Semua fungsi string membaca sampai menemukan null.',
      'Pustaka string.h menyediakan strlen (panjang), strcpy (menyalin), strcat (menyambung), dan strcmp (membandingkan; hasil 0 berarti sama). Jangan membandingkan string dengan == karena itu hanya membandingkan alamat, bukan isi.',
      'strcpy dan strcat tidak memeriksa ukuran tujuan. Jika tujuan terlalu kecil, data akan menimpa memori lain (buffer overflow). Pastikan array tujuan cukup besar, atau gunakan snprintf yang membatasi jumlah karakter yang ditulis.',
    ],
    sectionsTitle: 'Fungsi string.h',
    sections: [
      {
        title: 'strlen dan strcmp',
        body: 'strlen(s) mengembalikan jumlah karakter sebelum null. strcmp(a, b) mengembalikan 0 jika sama, negatif jika a lebih kecil secara alfabet, positif jika lebih besar.',
      },
      {
        title: 'strcpy dan strcat',
        body: 'strcpy(tujuan, sumber) menyalin termasuk null. strcat(tujuan, sumber) menempelkan sumber di akhir tujuan. Keduanya mensyaratkan tujuan cukup besar.',
      },
      {
        title: 'Alternatif aman',
        body: 'snprintf(tujuan, ukuran, "%s %s", a, b) menulis maksimal ukuran - 1 karakter ditambah null, sehingga tidak melewati batas.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>
#include <string.h>

int main(void) {
    char kata[20] = "Kodein";
    char salinan[20];

    printf("Panjang: %zu\n", strlen(kata));

    strcpy(salinan, kata);
    strcat(salinan, " App");
    printf("Salinan: %s\n", salinan);

    printf("Sama? %s\n", strcmp(kata, "Kodein") == 0 ? "ya" : "tidak");
    return 0;
}`,
      explanation: [
        'strlen(kata) bernilai 6 karena null tidak dihitung.',
        'salinan berukuran 20, cukup untuk "Kodein App" (10 karakter + null), sehingga aman.',
        'strcmp(kata, "Kodein") == 0 menguji kesamaan isi, bukan alamat.',
      ],
      output: 'Panjang: 6\nSalinan: Kodein App\nSama? ya',
    },
    notes: [
      'Selalu sisakan satu elemen untuk karakter null.',
      'Menulis string literal langsung ke pointer (char *s = "abc") membuatnya read-only. Gunakan array jika ingin mengubah isinya.',
    ],
  },
  {
    id: 'f3-pointer',
    description:
      'Pointer adalah variabel yang menyimpan alamat memori, sehingga kita bisa mengakses dan mengubah data secara tidak langsung.',
    objectives: [
      'Menjelaskan alamat, pointer, dan dereferensi.',
      'Menggunakan operator & dan * dengan benar.',
      'Memakai pointer agar fungsi dapat mengubah variabel milik pemanggil.',
    ],
    explanation: [
      'Setiap variabel menempati lokasi di memori yang punya alamat. Operator & mengambil alamat variabel, dan pointer adalah variabel yang menyimpan alamat tersebut. Deklarasi int *p; berarti p menyimpan alamat sebuah int. Operator * (dereferensi) mengakses nilai yang ditunjuk pointer.',
      'Ingat bahwa C mengirim argumen sebagai salinan (pass by value). Jika fungsi menerima alamat variabel lewat pointer, ia bisa mengubah variabel asli. Itulah cara fungsi tukar (swap) bekerja, dan alasan scanf membutuhkan tanda & di depan variabel.',
      'Pointer yang tidak menunjuk ke mana pun sebaiknya diisi NULL, dan pointer NULL tidak boleh didereferensi. Mendereferensi pointer yang belum diinisialisasi atau sudah tidak valid adalah salah satu kesalahan paling berbahaya di C.',
    ],
    sectionsTitle: 'Operator Pointer',
    sections: [
      {
        title: '& (alamat)',
        body: '&angka menghasilkan alamat variabel angka. Tipenya adalah pointer ke int.',
      },
      {
        title: '* (dereferensi)',
        body: '*p mengakses nilai pada alamat yang disimpan p. Menulis *p = 25; mengubah variabel yang ditunjuk.',
      },
      {
        title: 'NULL',
        body: 'Nilai khusus yang berarti tidak menunjuk ke mana pun. Periksa pointer sebelum didereferensi jika kemungkinan NULL.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

void tukar(int *x, int *y) {
    int sementara = *x;
    *x = *y;
    *y = sementara;
}

int main(void) {
    int angka = 10;
    int *p = &angka;
    *p = 25;
    printf("angka = %d\n", angka);

    int a = 3, b = 7;
    tukar(&a, &b);
    printf("a = %d, b = %d\n", a, b);
    return 0;
}`,
      explanation: [
        'p menyimpan alamat angka, sehingga *p = 25 sama dengan mengubah angka menjadi 25.',
        'tukar menerima alamat a dan b, lalu menukar isi keduanya lewat dereferensi.',
        'Tanpa pointer, fungsi hanya akan menukar salinan dan a serta b tidak berubah.',
      ],
      output: 'angka = 25\na = 7, b = 3',
    },
    notes: [
      'Jangan mengembalikan alamat variabel lokal dari fungsi. Variabelnya hilang saat fungsi selesai.',
      'Inisialisasi pointer dengan alamat yang valid atau NULL.',
    ],
  },
  {
    id: 'f3-struct-dan-enum',
    description:
      'Struct menggabungkan beberapa data berbeda tipe menjadi satu kesatuan, dan enum memberi nama pada sekumpulan konstanta bilangan bulat.',
    objectives: [
      'Mendefinisikan struct dan mengakses anggotanya.',
      'Menggunakan pointer ke struct dengan operator ->.',
      'Mendefinisikan enum untuk pilihan yang terbatas.',
    ],
    explanation: [
      'Struct memungkinkan kita menggabungkan beberapa data yang saling berhubungan, misalnya nama, umur, dan jurusan seorang mahasiswa, menjadi satu tipe baru. Anggota diakses dengan operator titik (m.umur). Jika kita memegang pointer ke struct, anggota diakses dengan operator panah (p->umur), yang setara dengan (*p).umur.',
      'Enum mendefinisikan sekumpulan konstanta bernama, misalnya jurusan atau hari. Secara bawaan nilainya berurutan mulai 0. Memakai enum membuat kode lebih mudah dibaca daripada angka mentah seperti 0, 1, dan 2.',
      'Struct menjadi dasar hampir semua struktur data berikutnya, seperti node linked list dan tree. Menguasainya sekarang akan sangat memudahkan materi selanjutnya.',
    ],
    sectionsTitle: 'Ringkasan',
    sections: [
      {
        title: 'Struct',
        body: 'struct Mahasiswa { char nama[30]; int umur; }; Mendeklarasikan variabel: struct Mahasiswa m = {"Rina", 20};',
      },
      {
        title: 'Operator . dan ->',
        body: 'Gunakan . pada variabel struct dan -> pada pointer ke struct.',
      },
      {
        title: 'typedef',
        body: 'typedef struct Mahasiswa Mahasiswa; memungkinkan menulis Mahasiswa m; tanpa kata struct.',
      },
      {
        title: 'Enum',
        body: 'enum Jurusan { INFORMATIKA, SISTEM_INFORMASI }; INFORMATIKA bernilai 0 dan SISTEM_INFORMASI bernilai 1.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

enum Jurusan { INFORMATIKA, SISTEM_INFORMASI, TEKNIK_KOMPUTER };

struct Mahasiswa {
    char nama[30];
    int umur;
    enum Jurusan jurusan;
};

int main(void) {
    struct Mahasiswa m = {"Rina", 20, INFORMATIKA};

    printf("Nama: %s\n", m.nama);
    printf("Umur: %d\n", m.umur);
    printf("Jurusan: %s\n", m.jurusan == INFORMATIKA ? "Informatika" : "Lainnya");

    struct Mahasiswa *p = &m;
    p->umur++;
    printf("Umur tahun depan: %d\n", m.umur);
    return 0;
}`,
      explanation: [
        'Struct Mahasiswa menggabungkan nama, umur, dan jurusan dalam satu tipe.',
        'm.nama dan m.umur mengakses anggota lewat operator titik.',
        'p->umur++ mengubah anggota lewat pointer, sehingga m.umur berubah menjadi 21.',
        'Enum Jurusan membuat pilihan jurusan lebih jelas daripada angka mentah.',
      ],
      output: 'Nama: Rina\nUmur: 20\nJurusan: Informatika\nUmur tahun depan: 21',
    },
    notes: [
      'Mengirim struct ke fungsi menyalin seluruh isinya. Untuk struct besar, kirim pointer agar lebih efisien.',
      'Nilai enum pada dasarnya int, sehingga C tidak mencegah kamu memberi nilai di luar daftar.',
    ],
  },
  {
    id: 'f3-linked-list',
    description:
      'Linked list adalah rangkaian node yang saling terhubung lewat pointer, sehingga ukurannya bisa tumbuh dan menyusut dengan fleksibel.',
    objectives: [
      'Menjelaskan struktur node dan hubungan antar-node.',
      'Menelusuri linked list dari kepala hingga NULL.',
      'Membandingkan linked list dengan array.',
    ],
    explanation: [
      'Linked list terdiri dari node. Setiap node menyimpan data dan pointer ke node berikutnya. Node terakhir menunjuk ke NULL sebagai penanda akhir. Kita hanya perlu menyimpan pointer ke node pertama (kepala atau head) untuk mengakses seluruh list.',
      'Berbeda dengan array, node tidak harus berurutan di memori, sehingga menyisipkan atau menghapus di awal cukup mengubah beberapa pointer (O(1)) tanpa menggeser elemen. Kekurangannya, kita tidak bisa melompat langsung ke elemen ke-i: harus berjalan dari kepala (O(n)), dan setiap node butuh memori ekstra untuk pointer.',
      'Pada contoh ini node dibuat secara statis supaya hubungan pointernya terlihat jelas. Materi berikutnya membuat node secara dinamis dengan malloc.',
    ],
    sectionsTitle: 'Linked List vs Array',
    sections: [
      {
        title: 'Akses elemen ke-i',
        body: 'Array O(1), linked list O(n) karena harus menelusuri dari kepala.',
      },
      {
        title: 'Sisip di awal',
        body: 'Array O(n) karena menggeser elemen, linked list O(1).',
      },
      {
        title: 'Memori',
        body: 'Array hemat dan berurutan (ramah cache). Linked list butuh pointer tambahan per node dan tersebar di memori.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

struct Node {
    int nilai;
    struct Node *berikut;
};

int main(void) {
    struct Node c = {30, NULL};
    struct Node b = {20, &c};
    struct Node a = {10, &b};

    for (struct Node *p = &a; p != NULL; p = p->berikut) {
        printf("%d -> ", p->nilai);
    }
    printf("NULL\n");
    return 0;
}`,
      explanation: [
        'Setiap node menyimpan nilai dan alamat node berikutnya.',
        'a menunjuk ke b, b menunjuk ke c, dan c menunjuk ke NULL sebagai akhir list.',
        'Loop berjalan dengan p = p->berikut sampai menemukan NULL.',
      ],
      output: '10 -> 20 -> 30 -> NULL',
    },
    notes: [
      'Selalu periksa NULL sebelum mengakses p->berikut agar tidak mendereferensi pointer kosong.',
      'Kehilangan pointer ke kepala berarti kehilangan seluruh list.',
    ],
  },
  {
    id: 'f3-singly-linked-list',
    description:
      'Singly linked list menyimpan satu pointer per node dan umumnya dibuat secara dinamis dengan malloc.',
    objectives: [
      'Membuat node secara dinamis dengan malloc.',
      'Menyisipkan node di awal list.',
      'Membebaskan seluruh node dengan free untuk mencegah memory leak.',
    ],
    explanation: [
      'Pada penggunaan nyata, jumlah node tidak diketahui saat kompilasi, sehingga setiap node dibuat dengan malloc. malloc mengembalikan NULL jika memori tidak tersedia, jadi hasilnya harus diperiksa sebelum dipakai.',
      'Menyisipkan di awal sangat sederhana: buat node baru, arahkan pointer berikutnya ke kepala lama, lalu jadikan node baru sebagai kepala. Operasi ini O(1). Menambah di akhir memerlukan penelusuran O(n) kecuali kita menyimpan pointer ke ekor.',
      'Setiap node hasil malloc harus dibebaskan dengan free. Saat membebaskan list, simpan pointer ke node berikutnya sebelum free, karena setelah dibebaskan node tidak boleh diakses lagi.',
    ],
    sectionsTitle: 'Operasi Dasar',
    sections: [
      {
        title: 'Sisip di awal - O(1)',
        body: 'baru->berikut = kepala; kepala = baru;',
      },
      {
        title: 'Cari nilai - O(n)',
        body: 'Telusuri dari kepala sampai node bernilai target atau NULL.',
      },
      {
        title: 'Hapus list',
        body: 'Simpan p->berikut ke variabel sementara, free(p), lalu lanjut ke node sementara itu.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>
#include <stdlib.h>

struct Node {
    int nilai;
    struct Node *berikut;
};

struct Node *tambahDepan(struct Node *kepala, int nilai) {
    struct Node *baru = malloc(sizeof(struct Node));
    if (baru == NULL) {
        return kepala;
    }
    baru->nilai = nilai;
    baru->berikut = kepala;
    return baru;
}

void cetak(const struct Node *kepala) {
    for (const struct Node *p = kepala; p != NULL; p = p->berikut) {
        printf("%d -> ", p->nilai);
    }
    printf("NULL\n");
}

void bebaskan(struct Node *kepala) {
    while (kepala != NULL) {
        struct Node *berikut = kepala->berikut;
        free(kepala);
        kepala = berikut;
    }
}

int main(void) {
    struct Node *kepala = NULL;
    kepala = tambahDepan(kepala, 30);
    kepala = tambahDepan(kepala, 20);
    kepala = tambahDepan(kepala, 10);

    cetak(kepala);
    bebaskan(kepala);
    return 0;
}`,
      explanation: [
        'tambahDepan membuat node baru dengan malloc dan menjadikannya kepala. Fungsi mengembalikan kepala yang baru.',
        'Node ditambahkan berurutan 30, 20, 10, tetapi karena selalu disisipkan di depan, urutan hasilnya 10, 20, 30.',
        'bebaskan menyimpan pointer berikutnya sebelum free, sehingga rantai tidak terputus.',
      ],
      output: '10 -> 20 -> 30 -> NULL',
    },
    notes: [
      'Setiap malloc harus berpasangan dengan free. Jika tidak, terjadi memory leak.',
      'Fungsi yang mengubah kepala harus mengembalikan kepala baru (atau menerima pointer ke pointer kepala).',
    ],
  },
  {
    id: 'f3-doubly-linked-list',
    description:
      'Doubly linked list memiliki pointer ke node sebelumnya dan berikutnya, sehingga bisa ditelusuri dua arah.',
    objectives: [
      'Menjelaskan struktur node dengan dua pointer.',
      'Menelusuri list maju dan mundur.',
      'Menyebutkan keuntungan dan biaya tambahan dibanding singly linked list.',
    ],
    explanation: [
      'Setiap node pada doubly linked list menyimpan pointer ke node sebelum dan sesudahnya. Dengan begitu, kita bisa menelusuri dari depan maupun dari belakang, dan menghapus sebuah node tanpa perlu mencari node sebelumnya, selama kita sudah memegang node tersebut.',
      'Biayanya adalah memori tambahan untuk satu pointer per node dan lebih banyak pointer yang harus dijaga konsisten. Setiap penyisipan atau penghapusan harus memperbarui kedua arah hubungan agar list tetap valid.',
      'Struktur ini dipakai misalnya pada riwayat navigasi (maju dan mundur) dan pada implementasi deque atau cache.',
    ],
    sectionsTitle: 'Perbandingan',
    sections: [
      {
        title: 'Keuntungan',
        body: 'Bisa ditelusuri dua arah dan penghapusan sebuah node diketahui O(1) tanpa mencari pendahulunya.',
      },
      {
        title: 'Kekurangan',
        body: 'Memori lebih besar per node dan lebih rawan kesalahan karena dua pointer harus selalu diperbarui bersama.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

struct Node {
    int nilai;
    struct Node *sebelum;
    struct Node *berikut;
};

int main(void) {
    struct Node a = {10, NULL, NULL};
    struct Node b = {20, NULL, NULL};
    struct Node c = {30, NULL, NULL};

    a.berikut = &b;
    b.sebelum = &a;
    b.berikut = &c;
    c.sebelum = &b;

    printf("Maju  : ");
    for (struct Node *p = &a; p != NULL; p = p->berikut) {
        printf("%d", p->nilai);
        if (p->berikut != NULL) printf(" <-> ");
    }
    printf("\n");

    printf("Mundur: ");
    for (struct Node *p = &c; p != NULL; p = p->sebelum) {
        printf("%d", p->nilai);
        if (p->sebelum != NULL) printf(" <-> ");
    }
    printf("\n");
    return 0;
}`,
      explanation: [
        'Setiap hubungan dibuat dua kali: a.berikut = &b dan b.sebelum = &a.',
        'Penelusuran maju memakai pointer berikut dari a sampai NULL.',
        'Penelusuran mundur dimulai dari c dan memakai pointer sebelum sampai NULL.',
      ],
      output: 'Maju  : 10 <-> 20 <-> 30\nMundur: 30 <-> 20 <-> 10',
    },
    notes: [
      'Saat menyisipkan atau menghapus, perbarui kedua pointer pada kedua node yang terlibat.',
      'Periksa kasus khusus: list kosong, node pertama, dan node terakhir.',
    ],
  },
  {
    id: 'f3-stack',
    description:
      'Stack adalah struktur data LIFO (Last In, First Out): elemen yang terakhir masuk adalah yang pertama keluar.',
    objectives: [
      'Menjelaskan prinsip LIFO dan operasi push serta pop.',
      'Mengimplementasikan stack dengan array.',
      'Menangani kondisi stack penuh dan kosong.',
    ],
    explanation: [
      'Bayangkan setumpuk piring: kita menaruh dan mengambil piring dari atas. Stack bekerja dengan cara yang sama. push menambah elemen di atas, pop mengambil elemen teratas, dan peek melihat elemen teratas tanpa mengambilnya. Semua operasi ini O(1).',
      'Implementasi dengan array memerlukan variabel atas yang menunjukkan indeks elemen teratas. Nilai awalnya -1 yang berarti kosong. Stack penuh jika atas sama dengan kapasitas - 1, dan push saat penuh disebut stack overflow. pop saat kosong disebut stack underflow.',
      'Stack dipakai di banyak tempat: call stack pemanggilan fungsi, tombol undo, pengecekan kurung seimbang, dan evaluasi ekspresi.',
    ],
    sectionsTitle: 'Operasi Stack',
    sections: [
      { title: 'push', body: 'Menambah elemen di puncak. Gagal (overflow) jika stack penuh.' },
      { title: 'pop', body: 'Mengambil dan menghapus elemen teratas. Gagal (underflow) jika stack kosong.' },
      { title: 'peek', body: 'Membaca elemen teratas tanpa menghapusnya.' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

#define KAPASITAS 5

struct Stack {
    int data[KAPASITAS];
    int atas;
};

void init(struct Stack *s) {
    s->atas = -1;
}

int push(struct Stack *s, int nilai) {
    if (s->atas == KAPASITAS - 1) {
        return 0;
    }
    s->data[++s->atas] = nilai;
    return 1;
}

int pop(struct Stack *s, int *nilai) {
    if (s->atas < 0) {
        return 0;
    }
    *nilai = s->data[s->atas--];
    return 1;
}

int main(void) {
    struct Stack s;
    init(&s);

    push(&s, 1);
    push(&s, 2);
    push(&s, 3);

    int nilai;
    if (pop(&s, &nilai)) printf("Pop: %d\n", nilai);
    if (pop(&s, &nilai)) printf("Pop: %d\n", nilai);
    printf("Sisa elemen: %d\n", s.atas + 1);
    return 0;
}`,
      explanation: [
        'atas bernilai -1 saat stack kosong. Setiap push menaikkan atas lalu menyimpan nilai.',
        'push dan pop mengembalikan 1 jika berhasil dan 0 jika gagal (penuh atau kosong).',
        'Karena LIFO, pop pertama mengembalikan 3 dan pop kedua mengembalikan 2.',
        'Tersisa satu elemen (nilai 1), yaitu atas + 1 = 1.',
      ],
      output: 'Pop: 3\nPop: 2\nSisa elemen: 1',
    },
    notes: [
      'Selalu periksa hasil push dan pop agar overflow dan underflow tertangani.',
      'Stack juga bisa dibuat dengan linked list sehingga tidak memiliki batas kapasitas tetap.',
    ],
  },
  {
    id: 'f3-queue',
    description:
      'Queue adalah struktur data FIFO (First In, First Out): elemen yang pertama masuk adalah yang pertama keluar.',
    objectives: [
      'Menjelaskan prinsip FIFO dan operasi enqueue serta dequeue.',
      'Mengimplementasikan circular queue dengan array.',
      'Menangani antrean penuh dan kosong.',
    ],
    explanation: [
      'Queue bekerja seperti antrean di kasir: yang datang lebih dulu dilayani lebih dulu. enqueue menambah elemen di belakang dan dequeue mengambil elemen di depan. Keduanya O(1) jika diimplementasikan dengan benar.',
      'Jika queue memakai array biasa, ruang di bagian depan yang sudah kosong akan terbuang. Solusinya adalah circular queue: indeks dihitung dengan operator modulus sehingga setelah mencapai akhir array, penambahan berikutnya kembali ke awal array yang sudah kosong.',
      'Kita cukup menyimpan indeks depan dan jumlah elemen. Posisi penambahan berikutnya adalah (depan + jumlah) % kapasitas. Queue dipakai pada antrean cetak, penjadwalan proses, dan penelusuran BFS pada graf.',
    ],
    sectionsTitle: 'Operasi Queue',
    sections: [
      { title: 'enqueue', body: 'Menambah elemen di belakang. Gagal jika queue penuh.' },
      { title: 'dequeue', body: 'Mengambil elemen di depan. Gagal jika queue kosong.' },
      {
        title: 'Circular',
        body: 'Indeks berputar dengan modulus: (depan + jumlah) % KAPASITAS, sehingga seluruh ruang array bisa dipakai ulang.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

#define KAPASITAS 4

struct Queue {
    int data[KAPASITAS];
    int depan;
    int jumlah;
};

void init(struct Queue *q) {
    q->depan = 0;
    q->jumlah = 0;
}

int enqueue(struct Queue *q, int nilai) {
    if (q->jumlah == KAPASITAS) {
        return 0;
    }
    q->data[(q->depan + q->jumlah) % KAPASITAS] = nilai;
    q->jumlah++;
    return 1;
}

int dequeue(struct Queue *q, int *nilai) {
    if (q->jumlah == 0) {
        return 0;
    }
    *nilai = q->data[q->depan];
    q->depan = (q->depan + 1) % KAPASITAS;
    q->jumlah--;
    return 1;
}

int main(void) {
    struct Queue q;
    init(&q);

    enqueue(&q, 10);
    enqueue(&q, 20);
    enqueue(&q, 30);

    int nilai;
    dequeue(&q, &nilai);
    printf("Keluar: %d\n", nilai);

    enqueue(&q, 40);
    enqueue(&q, 50);
    if (!enqueue(&q, 60)) {
        printf("Antrean penuh\n");
    }

    printf("Urutan keluar:");
    while (dequeue(&q, &nilai)) {
        printf(" %d", nilai);
    }
    printf("\n");
    return 0;
}`,
      explanation: [
        'Setelah tiga enqueue dan satu dequeue, tersisa 20 dan 30 dengan depan di indeks 1.',
        'enqueue 40 dan 50 mengisi indeks 3 dan 0 berkat modulus, sehingga queue kembali penuh (4 elemen).',
        'enqueue 60 gagal karena penuh dan program mencetak pesannya.',
        'Elemen keluar sesuai urutan masuk (FIFO): 20, 30, 40, 50.',
      ],
      output: 'Keluar: 10\nAntrean penuh\nUrutan keluar: 20 30 40 50',
    },
    notes: [
      'Menyimpan jumlah elemen memudahkan membedakan queue penuh dan kosong.',
      'Untuk antrean tanpa batas, gunakan linked list dengan pointer depan dan belakang.',
    ],
  },
  {
    id: 'f3-hash-table',
    description:
      'Hash table menyimpan pasangan kunci dan nilai dan mengaksesnya rata-rata dalam waktu konstan memakai fungsi hash.',
    objectives: [
      'Menjelaskan fungsi hash dan collision.',
      'Memakai std::unordered_map di C++ untuk menyimpan dan mencari data.',
      'Menyebutkan kompleksitas rata-rata dan kasus terburuk.',
    ],
    explanation: [
      'Hash table memakai fungsi hash untuk mengubah kunci (misalnya nama) menjadi indeks pada array. Dengan begitu, mencari, menyisipkan, dan menghapus berdasarkan kunci rata-rata hanya membutuhkan waktu O(1), tidak bergantung jumlah data.',
      'Dua kunci berbeda bisa menghasilkan indeks yang sama. Ini disebut collision. Cara umum menanganinya adalah chaining (setiap slot menyimpan list) atau open addressing (mencari slot kosong lain). Jika banyak collision, performa turun hingga O(n) pada kasus terburuk.',
      'Di C++, std::unordered_map sudah menyediakan hash table siap pakai. Kita fokus pada penggunaan, sedangkan membuat hash table sendiri di C menjadi mini proyek pada fase ini.',
    ],
    sectionsTitle: 'Konsep Penting',
    sections: [
      {
        title: 'Fungsi hash',
        body: 'Mengubah kunci menjadi bilangan, lalu dipetakan ke indeks dengan modulus ukuran tabel. Fungsi yang baik menyebar kunci secara merata.',
      },
      {
        title: 'Collision',
        body: 'Terjadi saat dua kunci menempati slot yang sama. Ditangani dengan chaining atau open addressing.',
      },
      {
        title: 'Kompleksitas',
        body: 'Rata-rata O(1) untuk sisip, cari, dan hapus. Kasus terburuk O(n). Data tidak tersimpan terurut.',
      },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <iostream>
#include <string>
#include <unordered_map>

int main() {
    std::unordered_map<std::string, int> nilai;
    nilai["Budi"] = 80;
    nilai["Sari"] = 95;
    nilai["Budi"] = 85;

    std::cout << "Budi: " << nilai["Budi"] << "\n";
    std::cout << "Jumlah data: " << nilai.size() << "\n";

    if (nilai.find("Dewi") == nilai.end()) {
        std::cout << "Dewi tidak ada\n";
    }
    return 0;
}`,
      explanation: [
        'Kunci berupa nama (string) dan nilai berupa angka. Menulis ke kunci yang sudah ada akan menimpa nilai lama, sehingga Budi menjadi 85.',
        'size() mengembalikan 2 karena hanya ada dua kunci unik: Budi dan Sari.',
        'find mencari tanpa menambah data. Jika hasilnya sama dengan end(), kunci tidak ditemukan.',
      ],
      output: 'Budi: 85\nJumlah data: 2\nDewi tidak ada',
    },
    notes: [
      'operator[] menambahkan kunci baru bernilai default jika belum ada. Gunakan find jika hanya ingin memeriksa keberadaan.',
      'Urutan iterasi unordered_map tidak terjamin. Gunakan std::map jika membutuhkan urutan kunci.',
    ],
  },
  {
    id: 'f3-set-dan-map',
    description:
      'Set menyimpan elemen unik, dan map menyimpan pasangan kunci-nilai, keduanya terurut berdasarkan kunci di C++.',
    objectives: [
      'Memakai std::set untuk elemen unik yang terurut.',
      'Memakai std::map untuk pasangan kunci dan nilai.',
      'Memilih antara set, map, dan unordered_map sesuai kebutuhan.',
    ],
    explanation: [
      'std::set menyimpan elemen unik dan otomatis terurut. Menambah elemen yang sudah ada tidak berpengaruh. std::map menyimpan pasangan kunci-nilai dengan kunci unik dan terurut berdasarkan kunci. Keduanya biasanya diimplementasikan dengan pohon seimbang sehingga sisip, cari, dan hapus O(log n).',
      'Dibanding unordered_map yang rata-rata O(1) tetapi tidak terurut, set dan map memberi urutan terurut dan operasi seperti mencari elemen terkecil atau menelusuri rentang kunci. Pilih sesuai kebutuhan: urutan atau kecepatan murni.',
      'Iterasi pada set atau map selalu menghasilkan elemen dari kunci terkecil ke terbesar. Pada map, setiap elemen adalah pasangan dengan anggota first (kunci) dan second (nilai).',
    ],
    sectionsTitle: 'Memilih Struktur',
    sections: [
      { title: 'set', body: 'Kumpulan elemen unik dan terurut. Cocok untuk menghapus duplikat.' },
      { title: 'map', body: 'Pasangan kunci-nilai dengan kunci terurut. Cocok jika perlu menelusuri berurutan.' },
      { title: 'unordered_map', body: 'Kunci-nilai tanpa urutan, rata-rata O(1). Cocok jika urutan tidak penting.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <iostream>
#include <map>
#include <set>
#include <string>

int main() {
    std::set<int> unik = {5, 1, 3, 5, 1};
    std::cout << "Set:";
    for (int x : unik) {
        std::cout << " " << x;
    }
    std::cout << "\n";

    std::map<std::string, int> stok;
    stok["pisang"] = 12;
    stok["apel"] = 7;
    stok["jeruk"] = 5;

    for (const auto &item : stok) {
        std::cout << item.first << " = " << item.second << "\n";
    }
    return 0;
}`,
      explanation: [
        'Set menghapus duplikat dan mengurutkan: {5, 1, 3, 5, 1} menjadi 1, 3, 5.',
        'Map mengurutkan berdasarkan kunci secara alfabet: apel, jeruk, pisang.',
        'item.first adalah kunci dan item.second adalah nilainya.',
      ],
      output: 'Set: 1 3 5\napel = 7\njeruk = 5\npisang = 12',
    },
    notes: [
      'Kunci pada set dan map harus bisa dibandingkan dengan operator <.',
      'Menambah atau menghapus elemen tidak membatalkan iterator ke elemen lain pada set dan map.',
    ],
  },
  {
    id: 'f3-tree',
    description:
      'Tree adalah struktur data hierarkis yang terdiri dari node dengan hubungan induk dan anak.',
    objectives: [
      'Menyebutkan istilah akar, anak, daun, dan tinggi.',
      'Menelusuri tree dengan preorder, inorder, dan postorder.',
      'Menuliskan penelusuran tree secara rekursif.',
    ],
    explanation: [
      'Tree adalah kumpulan node yang dihubungkan secara hierarkis. Node teratas disebut akar (root), setiap node bisa memiliki anak, dan node tanpa anak disebut daun. Contoh dalam kehidupan sehari-hari: struktur folder, silsilah keluarga, dan hierarki organisasi.',
      'Binary tree adalah tree yang setiap node-nya memiliki paling banyak dua anak: kiri dan kanan. Ada tiga cara menelusuri binary tree secara kedalaman: preorder (node, kiri, kanan), inorder (kiri, node, kanan), dan postorder (kiri, kanan, node).',
      'Penelusuran tree sangat alami ditulis dengan rekursi. Base case-nya adalah node NULL, yang berarti tidak ada yang dikunjungi.',
    ],
    sectionsTitle: 'Istilah Tree',
    sections: [
      { title: 'Akar dan daun', body: 'Akar adalah node paling atas tanpa induk. Daun adalah node tanpa anak.' },
      { title: 'Kedalaman dan tinggi', body: 'Kedalaman node adalah jumlah sisi dari akar. Tinggi tree adalah kedalaman terbesar.' },
      { title: 'Subtree', body: 'Setiap node beserta seluruh keturunannya membentuk tree yang lebih kecil.' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

struct Node {
    int nilai;
    struct Node *kiri;
    struct Node *kanan;
};

void preorder(const struct Node *n) {
    if (n == NULL) return;
    printf(" %d", n->nilai);
    preorder(n->kiri);
    preorder(n->kanan);
}

void inorder(const struct Node *n) {
    if (n == NULL) return;
    inorder(n->kiri);
    printf(" %d", n->nilai);
    inorder(n->kanan);
}

void postorder(const struct Node *n) {
    if (n == NULL) return;
    postorder(n->kiri);
    postorder(n->kanan);
    printf(" %d", n->nilai);
}

int main(void) {
    struct Node n4 = {4, NULL, NULL};
    struct Node n5 = {5, NULL, NULL};
    struct Node n3 = {3, NULL, NULL};
    struct Node n2 = {2, &n4, &n5};
    struct Node n1 = {1, &n2, &n3};

    printf("Preorder:");  preorder(&n1);  printf("\n");
    printf("Inorder:");   inorder(&n1);   printf("\n");
    printf("Postorder:"); postorder(&n1); printf("\n");
    return 0;
}`,
      explanation: [
        'Tree berakar di 1, dengan anak kiri 2 (anak: 4 dan 5) dan anak kanan 3.',
        'Ketiga fungsi hanya berbeda pada posisi printf relatif terhadap dua pemanggilan rekursif.',
        'Base case n == NULL menghentikan rekursi di bawah daun.',
      ],
      output: 'Preorder: 1 2 4 5 3\nInorder: 4 2 5 1 3\nPostorder: 4 5 2 3 1',
    },
    notes: [
      'Preorder berguna untuk menyalin tree, inorder untuk mendapatkan urutan terurut pada BST, dan postorder untuk menghapus tree.',
      'Pada tree yang sangat dalam, rekursi bisa menyebabkan stack overflow.',
    ],
  },
  {
    id: 'f3-binary-search-tree',
    description:
      'Binary Search Tree (BST) adalah binary tree terurut: nilai di kiri lebih kecil dan nilai di kanan lebih besar dari node.',
    objectives: [
      'Menjelaskan sifat BST.',
      'Menyisipkan dan mencari nilai di BST.',
      'Memahami bahwa penelusuran inorder menghasilkan data terurut.',
    ],
    explanation: [
      'BST memiliki aturan: untuk setiap node, semua nilai di subtree kiri lebih kecil, dan semua nilai di subtree kanan lebih besar. Aturan ini membuat pencarian efisien: pada setiap node kita bisa membuang separuh pohon dengan satu perbandingan.',
      'Jika tree seimbang, pencarian, penyisipan, dan penghapusan membutuhkan O(log n). Namun jika data dimasukkan sudah terurut, BST menjadi seperti linked list dengan tinggi n sehingga operasinya jatuh menjadi O(n). Karena itu ada varian pohon seimbang seperti AVL dan Red-Black Tree.',
      'Penelusuran inorder pada BST selalu menghasilkan nilai dalam urutan menaik. Inilah dasar dari pengurutan dengan BST.',
    ],
    sectionsTitle: 'Operasi BST',
    sections: [
      { title: 'Cari', body: 'Bandingkan dengan node. Jika sama, ketemu. Jika lebih kecil ke kiri, jika lebih besar ke kanan.' },
      { title: 'Sisip', body: 'Cari posisi yang sesuai seperti pencarian, lalu pasang node baru sebagai daun.' },
      { title: 'Hapus', body: 'Tiga kasus: node daun, node dengan satu anak, dan node dengan dua anak (digantikan penerus inorder).' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>
#include <stdlib.h>

struct Node {
    int nilai;
    struct Node *kiri;
    struct Node *kanan;
};

struct Node *sisip(struct Node *akar, int nilai) {
    if (akar == NULL) {
        struct Node *baru = malloc(sizeof(struct Node));
        if (baru == NULL) return NULL;
        baru->nilai = nilai;
        baru->kiri = NULL;
        baru->kanan = NULL;
        return baru;
    }
    if (nilai < akar->nilai) {
        akar->kiri = sisip(akar->kiri, nilai);
    } else if (nilai > akar->nilai) {
        akar->kanan = sisip(akar->kanan, nilai);
    }
    return akar;
}

int cari(const struct Node *akar, int nilai) {
    while (akar != NULL) {
        if (nilai == akar->nilai) return 1;
        akar = (nilai < akar->nilai) ? akar->kiri : akar->kanan;
    }
    return 0;
}

void inorder(const struct Node *n) {
    if (n == NULL) return;
    inorder(n->kiri);
    printf(" %d", n->nilai);
    inorder(n->kanan);
}

void bebaskan(struct Node *n) {
    if (n == NULL) return;
    bebaskan(n->kiri);
    bebaskan(n->kanan);
    free(n);
}

int main(void) {
    struct Node *akar = NULL;
    int data[] = {50, 30, 70, 20, 40, 60, 80};

    for (int i = 0; i < 7; i++) {
        akar = sisip(akar, data[i]);
    }

    printf("Inorder:");
    inorder(akar);
    printf("\n");
    printf("60 ada? %s\n", cari(akar, 60) ? "ya" : "tidak");
    printf("65 ada? %s\n", cari(akar, 65) ? "ya" : "tidak");

    bebaskan(akar);
    return 0;
}`,
      explanation: [
        'sisip turun ke kiri atau kanan secara rekursif sampai menemukan posisi kosong, lalu membuat node baru di sana.',
        'Nilai duplikat diabaikan karena tidak masuk ke kondisi mana pun.',
        'cari berjalan menuruni tree dan berhenti saat ketemu atau mencapai NULL.',
        'Inorder menghasilkan nilai terurut menaik, dan bebaskan memakai postorder agar anak dibebaskan sebelum induk.',
      ],
      output: 'Inorder: 20 30 40 50 60 70 80\n60 ada? ya\n65 ada? tidak',
    },
    notes: [
      'Bentuk BST bergantung pada urutan penyisipan. Data yang sudah terurut membuat tree miring.',
      'Selalu bebaskan seluruh node dengan urutan postorder.',
    ],
  },
  {
    id: 'f3-heap',
    description:
      'Heap adalah binary tree lengkap yang disimpan dalam array dengan sifat induk selalu lebih besar (max-heap) atau lebih kecil (min-heap) dari anaknya.',
    objectives: [
      'Menjelaskan sifat heap dan hubungan indeks induk dan anak.',
      'Menyisipkan elemen dengan sift-up.',
      'Mengambil elemen maksimum dengan sift-down.',
    ],
    explanation: [
      'Max-heap adalah tree lengkap di mana setiap node bernilai lebih besar atau sama dengan kedua anaknya, sehingga elemen terbesar selalu berada di akar. Karena bentuknya lengkap, heap bisa disimpan dalam array tanpa pointer: untuk node di indeks i, anak kiri di 2i + 1, anak kanan di 2i + 2, dan induk di (i - 1) / 2.',
      'Menyisipkan elemen: taruh di akhir array, lalu naikkan (sift-up) selama lebih besar dari induknya. Mengambil maksimum: ambil elemen akar, pindahkan elemen terakhir ke akar, lalu turunkan (sift-down) dengan menukar dengan anak terbesar. Keduanya O(log n).',
      'Heap adalah dasar priority queue dan algoritma heap sort. Melihat elemen terbesar cukup O(1).',
    ],
    sectionsTitle: 'Rumus Indeks',
    sections: [
      { title: 'Anak kiri', body: '2 * i + 1' },
      { title: 'Anak kanan', body: '2 * i + 2' },
      { title: 'Induk', body: '(i - 1) / 2' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

void tukar(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}

void sisip(int heap[], int *n, int nilai) {
    int i = (*n)++;
    heap[i] = nilai;
    while (i > 0) {
        int induk = (i - 1) / 2;
        if (heap[induk] >= heap[i]) break;
        tukar(&heap[induk], &heap[i]);
        i = induk;
    }
}

int ambilMaks(int heap[], int *n) {
    int maks = heap[0];
    heap[0] = heap[--(*n)];

    int i = 0;
    while (1) {
        int kiri = 2 * i + 1;
        int kanan = 2 * i + 2;
        int terbesar = i;
        if (kiri < *n && heap[kiri] > heap[terbesar]) terbesar = kiri;
        if (kanan < *n && heap[kanan] > heap[terbesar]) terbesar = kanan;
        if (terbesar == i) break;
        tukar(&heap[i], &heap[terbesar]);
        i = terbesar;
    }
    return maks;
}

int main(void) {
    int heap[10];
    int n = 0;
    int data[] = {10, 40, 30, 50, 20};

    for (int i = 0; i < 5; i++) {
        sisip(heap, &n, data[i]);
    }

    printf("Heap:");
    for (int i = 0; i < n; i++) printf(" %d", heap[i]);
    printf("\n");

    printf("Ambil: %d\n", ambilMaks(heap, &n));
    printf("Ambil: %d\n", ambilMaks(heap, &n));
    return 0;
}`,
      explanation: [
        'Setiap sisip menaruh nilai di akhir lalu menukarnya ke atas selama lebih besar dari induknya.',
        'Setelah lima penyisipan, array heap berisi 50 40 30 10 20 dengan 50 di akar.',
        'ambilMaks menukar akar dengan elemen terakhir, mengurangi ukuran, lalu menurunkan akar baru ke posisi yang benar.',
        'Dua pengambilan menghasilkan 50, kemudian 40, yaitu nilai terbesar berikutnya.',
      ],
      output: 'Heap: 50 40 30 10 20\nAmbil: 50\nAmbil: 40',
    },
    notes: [
      'Array heap tidak terurut penuh. Hanya hubungan induk dan anak yang dijamin.',
      'Pastikan array cukup besar sebelum menyisipkan agar tidak melewati batas.',
    ],
  },
  {
    id: 'f3-graph',
    description:
      'Graph terdiri dari simpul (node) dan sisi (edge) yang menghubungkan simpul, dipakai untuk memodelkan jaringan dan relasi.',
    objectives: [
      'Menjelaskan simpul, sisi, graph berarah, dan graph berbobot.',
      'Merepresentasikan graph dengan adjacency matrix.',
      'Membaca daftar tetangga setiap simpul.',
    ],
    explanation: [
      'Graph adalah kumpulan simpul yang dihubungkan oleh sisi. Graph dipakai untuk memodelkan peta jalan, jaringan sosial, dan hubungan antar-halaman web. Sisi bisa tidak berarah (hubungan dua arah) atau berarah (satu arah), dan bisa memiliki bobot seperti jarak atau biaya.',
      'Ada dua representasi umum. Adjacency matrix adalah tabel n x n yang bernilai 1 jika ada sisi, cepat untuk memeriksa sisi tertentu (O(1)) tetapi memakai memori O(n²). Adjacency list menyimpan daftar tetangga setiap simpul dan hemat memori untuk graph yang jarang sisinya.',
      'Pada graph tidak berarah, menambah sisi a-b berarti mengisi matrix[a][b] dan matrix[b][a]. Derajat sebuah simpul adalah jumlah sisi yang terhubung dengannya.',
    ],
    sectionsTitle: 'Representasi',
    sections: [
      { title: 'Adjacency matrix', body: 'Tabel n x n. Cek sisi O(1), memori O(n²). Cocok untuk graph padat.' },
      { title: 'Adjacency list', body: 'Daftar tetangga per simpul. Memori O(n + sisi). Cocok untuk graph jarang.' },
      { title: 'Berarah dan berbobot', body: 'Pada graph berarah hanya satu sel yang diisi. Pada graph berbobot, sel menyimpan bobot sisi.' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

#define N 4

void tambahSisi(int graf[N][N], int a, int b) {
    graf[a][b] = 1;
    graf[b][a] = 1;
}

int main(void) {
    int graf[N][N] = {0};

    tambahSisi(graf, 0, 1);
    tambahSisi(graf, 0, 2);
    tambahSisi(graf, 1, 3);
    tambahSisi(graf, 2, 3);

    for (int i = 0; i < N; i++) {
        printf("Node %d:", i);
        for (int j = 0; j < N; j++) {
            if (graf[i][j]) {
                printf(" %d", j);
            }
        }
        printf("\n");
    }
    return 0;
}`,
      explanation: [
        'graf[N][N] = {0} membuat matrix 4 x 4 berisi 0, artinya belum ada sisi.',
        'tambahSisi mengisi dua sel karena graph ini tidak berarah.',
        'Loop mencetak setiap simpul dan simpul-simpul yang bernilai 1 pada barisnya, yaitu tetangganya.',
      ],
      output: 'Node 0: 1 2\nNode 1: 0 3\nNode 2: 0 3\nNode 3: 1 2',
    },
    notes: [
      'Graph ini membentuk siklus 0-1-3-2-0, sehingga setiap simpul memiliki derajat 2.',
      'Pilih adjacency list untuk graph besar yang jarang agar tidak menghabiskan memori.',
    ],
  },
];