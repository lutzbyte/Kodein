import type { LessonContent } from '@/types/content';

export const phase5Lessons: LessonContent[] = [
  {
    id: 'f5-computer-memory-layout',
    description:
      'Saat program berjalan, memorinya dibagi menjadi beberapa wilayah dengan fungsi berbeda: kode, data, heap, dan stack.',
    objectives: [
      'Menyebutkan segmen memori sebuah proses dan isinya.',
      'Mengetahui letak variabel global, lokal, dan hasil malloc.',
      'Memahami bahwa alamat memori berubah di setiap eksekusi.',
    ],
    explanation: [
      'Sistem operasi memberi setiap proses ruang alamat sendiri yang terbagi menjadi segmen. Segmen kode (text) berisi instruksi mesin dan bersifat read-only. Segmen data berisi variabel global yang sudah diberi nilai awal, sedangkan BSS berisi variabel global tanpa nilai awal yang otomatis bernilai 0.',
      'Heap adalah wilayah untuk memori dinamis (malloc) dan tumbuh ke arah alamat yang lebih tinggi. Stack menyimpan variabel lokal dan data pemanggilan fungsi, serta tumbuh ke arah alamat yang lebih rendah pada kebanyakan arsitektur. Keduanya tumbuh saling mendekati di ruang kosong di antaranya.',
      'Sistem modern memakai ASLR (Address Space Layout Randomization) sehingga alamat segmen diacak setiap kali program dijalankan. Karena itu jangan pernah menulis program yang bergantung pada alamat tertentu.',
    ],
    sectionsTitle: 'Segmen Memori',
    sections: [
      {
        title: 'Kode (text) dan data',
        body: 'Text menyimpan instruksi (read-only). Data menyimpan global yang diinisialisasi, BSS menyimpan global yang belum diinisialisasi dan otomatis bernilai nol.',
      },
      {
        title: 'Heap',
        body: 'Dikelola programmer lewat malloc dan free. Ukurannya fleksibel tetapi lebih lambat dan harus dibebaskan manual.',
      },
      {
        title: 'Stack',
        body: 'Dikelola otomatis oleh pemanggilan fungsi. Cepat, tetapi ukurannya terbatas, sehingga rekursi terlalu dalam menyebabkan stack overflow.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

int globalInit = 42;
int globalBss;

int main(void) {
    int lokal = 1;
    int *heap = malloc(sizeof(int));
    if (heap == NULL) {
        return 1;
    }

    printf("Kode  (fungsi main) : %p\n", (void *)(uintptr_t)main);
    printf("Data  (global init) : %p\n", (void *)&globalInit);
    printf("BSS   (global kosong): %p\n", (void *)&globalBss);
    printf("Heap  (malloc)      : %p\n", (void *)heap);
    printf("Stack (variabel lokal): %p\n", (void *)&lokal);

    free(heap);
    return 0;
}`,
      explanation: [
        'Setiap baris mencetak alamat dari satu jenis lokasi memori.',
        '%p menampilkan alamat dalam heksadesimal dan harus diberi argumen bertipe void *.',
        'Variabel global berada di segmen data dan BSS, hasil malloc di heap, dan variabel lokal di stack.',
      ],
      output:
        'Kode  (fungsi main) : 0x5581a3c0a149\nData  (global init) : 0x5581a3c0d010\nBSS   (global kosong): 0x5581a3c0d018\nHeap  (malloc)      : 0x5581a4f6e2a0\nStack (variabel lokal): 0x7ffd5b2c8e4c',
    },
    notes: [
      'Alamat pada output hanyalah contoh. Nilainya berbeda di setiap perangkat dan setiap eksekusi karena ASLR.',
      'Yang bisa kamu amati adalah polanya: alamat stack biasanya jauh lebih tinggi daripada heap, data, dan kode.',
    ],
  },
  {
    id: 'f5-stack-vs-heap',
    description:
      'Stack dan heap adalah dua tempat menyimpan data dengan aturan umur, kecepatan, dan tanggung jawab yang berbeda.',
    objectives: [
      'Membandingkan stack dan heap dari sisi umur data, kecepatan, dan ukuran.',
      'Menentukan kapan data harus dialokasikan di heap.',
      'Menghindari pengembalian pointer ke data stack.',
    ],
    explanation: [
      'Memori stack dialokasikan otomatis ketika fungsi dipanggil dan dilepas otomatis ketika fungsi selesai. Mengalokasikannya hanya menggeser sebuah penunjuk, sehingga sangat cepat. Namun ukurannya terbatas (umumnya beberapa MB) dan datanya hilang begitu fungsi kembali.',
      'Heap dialokasikan dengan malloc dan hidup sampai kamu memanggil free. Ukurannya bisa besar dan ditentukan saat program berjalan, serta datanya bisa diberikan keluar dari fungsi. Konsekuensinya, alokasi lebih lambat dan kamu bertanggung jawab melepasnya.',
      'Aturan praktis: pakai stack untuk data kecil dengan ukuran tetap dan umur pendek. Pakai heap jika ukurannya baru diketahui saat runtime, sangat besar, atau harus hidup melampaui fungsi yang membuatnya.',
    ],
    sectionsTitle: 'Perbandingan',
    sections: [
      { title: 'Stack', body: 'Otomatis, sangat cepat, ukuran terbatas, data hilang saat fungsi selesai.' },
      { title: 'Heap', body: 'Manual (malloc/free), lebih lambat, ukuran fleksibel, data hidup sampai dibebaskan.' },
      {
        title: 'Kesalahan umum',
        body: 'Mengembalikan alamat array lokal dari fungsi (datanya sudah hilang), dan lupa memanggil free untuk data heap.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>
#include <stdlib.h>

int jumlahStack(void) {
    int data[3] = {1, 2, 3};
    int total = 0;
    for (int i = 0; i < 3; i++) {
        total += data[i];
    }
    return total;
}

int *buatArrayHeap(int n) {
    int *data = malloc(n * sizeof(int));
    if (data == NULL) {
        return NULL;
    }
    for (int i = 0; i < n; i++) {
        data[i] = (i + 1) * 10;
    }
    return data;
}

int main(void) {
    printf("Jumlah (stack): %d\n", jumlahStack());

    int *heap = buatArrayHeap(4);
    if (heap == NULL) {
        return 1;
    }
    printf("Isi heap:");
    for (int i = 0; i < 4; i++) {
        printf(" %d", heap[i]);
    }
    printf("\n");

    free(heap);
    return 0;
}`,
      explanation: [
        'Array data di jumlahStack berada di stack dan hilang begitu fungsi selesai. Yang dikembalikan hanyalah nilai total (sebuah salinan).',
        'buatArrayHeap menaruh array di heap sehingga pemanggil boleh terus memakainya setelah fungsi selesai.',
        'main bertanggung jawab memanggil free pada data heap setelah selesai dipakai.',
      ],
      output: 'Jumlah (stack): 6\nIsi heap: 10 20 30 40',
    },
    notes: [
      'Setiap malloc harus punya satu free yang bersesuaian.',
      'Array lokal yang sangat besar (misalnya jutaan elemen) dapat membuat stack overflow. Pindahkan ke heap.',
    ],
  },
  {
    id: 'f5-pointers-dan-references',
    description:
      'Pointer dan reference adalah dua cara mengakses variabel secara tidak langsung, dengan aturan penggunaan yang berbeda.',
    objectives: [
      'Membandingkan pointer (C dan C++) dengan reference (C++).',
      'Mengubah argumen fungsi lewat pointer dan reference.',
      'Memilih antara pointer dan reference sesuai kebutuhan.',
    ],
    explanation: [
      'Pointer adalah variabel yang menyimpan alamat. Ia bisa NULL, bisa diarahkan ulang ke variabel lain, dan harus didereferensi dengan *. Pointer tersedia di C dan C++.',
      'Reference (hanya di C++) adalah nama lain (alias) untuk variabel yang sudah ada. Reference harus diinisialisasi saat dibuat, tidak bisa NULL, dan tidak bisa diarahkan ulang. Karena itu sintaksnya lebih sederhana dan lebih aman untuk meneruskan argumen yang pasti ada.',
      'Aturan praktis di C++: pakai reference jika argumen wajib ada, dan pakai pointer jika argumennya boleh kosong atau perlu diarahkan ulang. Di C, pointer adalah satu-satunya pilihan.',
    ],
    sectionsTitle: 'Perbandingan',
    sections: [
      { title: 'Pointer', body: 'Boleh NULL, bisa diubah targetnya, perlu operator * dan &, tersedia di C dan C++.' },
      { title: 'Reference', body: 'Tidak boleh kosong, tidak bisa diarahkan ulang, dipakai seperti variabel biasa, hanya di C++.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <iostream>

void tambahDenganReferensi(int &x) {
    x += 1;
}

void tambahDenganPointer(int *x) {
    if (x != nullptr) {
        *x += 1;
    }
}

int main() {
    int a = 10;
    int &alias = a;

    alias = 20;
    std::cout << "a setelah alias = 20: " << a << "\n";

    tambahDenganReferensi(a);
    std::cout << "Setelah referensi: " << a << "\n";

    tambahDenganPointer(&a);
    std::cout << "Setelah pointer: " << a << "\n";

    std::cout << "Alamat sama? " << (&alias == &a ? "ya" : "tidak") << "\n";
    return 0;
}`,
      explanation: [
        'alias adalah nama lain untuk a, sehingga mengubah alias langsung mengubah a.',
        'tambahDenganReferensi menerima alias dari a dan mengubahnya tanpa operator khusus.',
        'tambahDenganPointer menerima alamat a dan harus memeriksa nullptr sebelum didereferensi.',
        'Alamat alias dan a sama, karena keduanya adalah objek yang sama.',
      ],
      output: 'a setelah alias = 20: 20\nSetelah referensi: 21\nSetelah pointer: 22\nAlamat sama? ya',
    },
    notes: [
      'Kompilasi dengan: clang++ -std=c++17 program.cpp -o program',
      'Gunakan const int & untuk parameter yang hanya dibaca agar tidak menyalin data besar.',
    ],
  },
  {
    id: 'f5-pointer-arithmetic',
    description:
      'Pointer bisa digeser dengan penjumlahan dan pengurangan, dan satuan pergeserannya adalah ukuran tipe yang ditunjuk.',
    objectives: [
      'Menjelaskan bahwa p + 1 bergeser sebesar sizeof(tipe).',
      'Mengakses elemen array lewat aritmatika pointer.',
      'Menghitung jarak antara dua pointer.',
    ],
    explanation: [
      'Jika p bertipe int *, maka p + 1 menunjuk ke int berikutnya, yaitu bergeser sebesar sizeof(int) byte, bukan 1 byte. Compiler otomatis mengalikan dengan ukuran tipe. Karena itu *(p + i) setara dengan p[i], dan nama array pada banyak konteks berperilaku sebagai pointer ke elemen pertamanya.',
      'Dua pointer ke array yang sama bisa dikurangkan: hasilnya adalah jumlah elemen di antara keduanya (bertipe ptrdiff_t). Pointer juga bisa dibandingkan, tetapi hanya bermakna jika menunjuk ke array yang sama.',
      'Aritmatika pointer hanya valid selama hasilnya masih berada di dalam array atau tepat satu elemen setelah akhir array. Menggeser lebih jauh adalah perilaku tak terdefinisi.',
    ],
    sectionsTitle: 'Aturan',
    sections: [
      { title: 'p + n', body: 'Bergeser sebanyak n elemen, yaitu n x sizeof(*p) byte.' },
      { title: 'p - q', body: 'Jumlah elemen antara dua pointer ke array yang sama.' },
      { title: 'Batas valid', body: 'Hanya di dalam array, atau tepat satu elemen setelah elemen terakhir (tanpa didereferensi).' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stddef.h>
#include <stdio.h>

int main(void) {
    int arr[5] = {10, 20, 30, 40, 50};
    int *p = arr;

    printf("*p = %d\n", *p);
    printf("*(p + 2) = %d\n", *(p + 2));

    p += 3;
    printf("Setelah p += 3, *p = %d\n", *p);
    printf("Jarak ke awal: %td elemen\n", p - arr);
    printf("Selisih byte: %zu\n", (size_t)((char *)p - (char *)arr));
    return 0;
}`,
      explanation: [
        '*(p + 2) mengambil elemen indeks 2, yaitu 30.',
        'p += 3 menggeser pointer sejauh tiga elemen int sehingga menunjuk ke 40.',
        'p - arr menghasilkan 3 elemen. Jika dihitung dalam byte (dengan char *), selisihnya 3 x sizeof(int).',
      ],
      output:
        '*p = 10\n*(p + 2) = 30\nSetelah p += 3, *p = 40\nJarak ke awal: 3 elemen\nSelisih byte: 12',
    },
    notes: [
      'Selisih 12 byte berlaku jika sizeof(int) adalah 4, seperti pada kebanyakan platform.',
      'Jangan mendereferensi pointer yang sudah melewati batas array.',
    ],
  },
  {
    id: 'f5-dynamic-memory-allocation',
    description:
      'Alokasi memori dinamis memungkinkan program meminta, mengubah ukuran, dan melepas memori di heap saat berjalan.',
    objectives: [
      'Memakai malloc, calloc, realloc, dan free dengan benar.',
      'Selalu memeriksa hasil alokasi terhadap NULL.',
      'Mengubah ukuran blok dengan aman tanpa kehilangan pointer lama.',
    ],
    explanation: [
      'malloc(n) meminta n byte dan mengembalikan pointer ke blok tersebut (isinya belum diinisialisasi). calloc(jumlah, ukuran) meminta memori dan mengisinya dengan nol. Keduanya mengembalikan NULL jika gagal, sehingga hasilnya harus diperiksa sebelum dipakai.',
      'realloc(p, ukuranBaru) mengubah ukuran blok. Isi lama dipertahankan, dan blok bisa dipindah ke alamat baru. Jangan menulis p = realloc(p, ...) langsung, karena jika realloc gagal dan mengembalikan NULL, pointer lama hilang dan terjadi memory leak. Simpan hasilnya ke pointer sementara terlebih dahulu.',
      'Setiap blok yang sudah tidak dipakai harus dibebaskan dengan free tepat satu kali. Membebaskan dua kali (double free) adalah kesalahan serius.',
    ],
    sectionsTitle: 'Fungsi Alokasi',
    sections: [
      { title: 'malloc', body: 'Meminta blok memori tanpa inisialisasi. Isinya sampah sampai kamu menulisnya.' },
      { title: 'calloc', body: 'Meminta blok untuk sejumlah elemen dan mengisinya dengan nol.' },
      { title: 'realloc', body: 'Mengubah ukuran blok. Simpan hasilnya ke pointer sementara agar pointer lama tidak hilang jika gagal.' },
      { title: 'free', body: 'Membebaskan blok. Panggil sekali per alokasi, lalu jangan pakai pointernya lagi.' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 3;
    int *data = calloc(n, sizeof(int));
    if (data == NULL) {
        return 1;
    }
    for (int i = 0; i < n; i++) {
        data[i] = (i + 1) * 5;
    }

    printf("Isi awal:");
    for (int i = 0; i < n; i++) {
        printf(" %d", data[i]);
    }
    printf("\n");

    int *lebih = realloc(data, 5 * sizeof(int));
    if (lebih == NULL) {
        free(data);
        return 1;
    }
    data = lebih;
    data[3] = 20;
    data[4] = 25;

    int total = 0;
    printf("Setelah realloc:");
    for (int i = 0; i < 5; i++) {
        printf(" %d", data[i]);
        total += data[i];
    }
    printf("\n");
    printf("Jumlah: %d\n", total);

    free(data);
    return 0;
}`,
      explanation: [
        'calloc menyiapkan 3 int yang diisi nol, lalu loop mengisinya dengan 5, 10, dan 15.',
        'realloc memperbesar blok menjadi 5 elemen. Hasilnya disimpan di pointer sementara lebih dan baru dipindahkan ke data jika berhasil.',
        'Elemen lama tetap utuh, sedangkan elemen baru (indeks 3 dan 4) diisi manual.',
        'Terakhir, free membebaskan blok. Jumlahnya 5 + 10 + 15 + 20 + 25 = 75.',
      ],
      output: 'Isi awal: 5 10 15\nSetelah realloc: 5 10 15 20 25\nJumlah: 75',
    },
    notes: [
      'Selalu periksa NULL setelah malloc, calloc, dan realloc.',
      'Gunakan sizeof(*pointer) atau sizeof(tipe) untuk menghitung ukuran, bukan angka yang ditulis manual.',
    ],
  },
  {
    id: 'f5-memory-alignment',
    description:
      'Compiler menata data di memori sesuai aturan perataan (alignment), sehingga struct sering lebih besar dari jumlah ukuran anggotanya.',
    objectives: [
      'Menjelaskan alasan alignment dan padding.',
      'Memperkirakan ukuran struct dan offset anggotanya.',
      'Menghemat memori dengan mengurutkan anggota struct.',
    ],
    explanation: [
      'CPU membaca memori paling efisien jika sebuah nilai berada di alamat kelipatan ukurannya. Karena itu compiler menyisipkan byte kosong (padding) agar setiap anggota struct berada di alamat yang rata. Pada platform umum, int berukuran 4 byte dan membutuhkan alamat kelipatan 4.',
      'Ukuran struct juga dibulatkan ke kelipatan alignment anggota terbesarnya, supaya elemen dalam array struct tetap rata. Mengurutkan anggota dari yang terbesar ke terkecil biasanya mengurangi padding.',
      'Makro offsetof (dari stddef.h) menghasilkan posisi sebuah anggota dalam struct, sehingga kamu bisa melihat padding secara langsung.',
    ],
    sectionsTitle: 'Contoh Perhitungan',
    sections: [
      {
        title: 'Urutan boros',
        body: 'char (1 byte) di offset 0, lalu 3 byte padding, int di offset 4, char di offset 8, lalu 3 byte padding akhir: total 12 byte.',
      },
      {
        title: 'Urutan hemat',
        body: 'int di offset 0, char di offset 4, char di offset 5, lalu 2 byte padding akhir: total 8 byte.',
      },
      { title: 'Packed struct', body: 'Atribut khusus compiler dapat menghilangkan padding, tetapi akses data yang tidak rata bisa lebih lambat atau bermasalah pada beberapa CPU.' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stddef.h>
#include <stdio.h>

struct Boros {
    char a;
    int b;
    char c;
};

struct Hemat {
    int b;
    char a;
    char c;
};

int main(void) {
    printf("Boros: ukuran %zu (a=%zu, b=%zu, c=%zu)\n",
           sizeof(struct Boros), offsetof(struct Boros, a),
           offsetof(struct Boros, b), offsetof(struct Boros, c));
    printf("Hemat: ukuran %zu (b=%zu, a=%zu, c=%zu)\n",
           sizeof(struct Hemat), offsetof(struct Hemat, b),
           offsetof(struct Hemat, a), offsetof(struct Hemat, c));
    return 0;
}`,
      explanation: [
        'Kedua struct berisi anggota yang sama (dua char dan satu int), tetapi urutannya berbeda.',
        'offsetof menunjukkan posisi tiap anggota. Pada Boros, b berada di offset 4 karena ada padding setelah a.',
        'Hemat lebih kecil karena dua char ditempatkan berdampingan sehingga padding berkurang.',
      ],
      output:
        'Boros: ukuran 12 (a=0, b=4, c=8)\nHemat: ukuran 8 (b=0, a=4, c=5)',
    },
    notes: [
      'Hasil di atas berlaku pada platform dengan int 4 byte dan alignment 4, seperti kebanyakan perangkat modern.',
      'Jangan mengasumsikan ukuran struct sama dengan jumlah ukuran anggotanya. Gunakan sizeof.',
    ],
  },
  {
    id: 'f5-memory-leak',
    description:
      'Memory leak terjadi ketika memori heap tidak lagi bisa diakses tetapi belum dibebaskan, sehingga pemakaian memori terus bertambah.',
    objectives: [
      'Menjelaskan penyebab umum memory leak.',
      'Melacak alokasi dan pembebasan secara sederhana.',
      'Mengenal alat pendeteksi seperti AddressSanitizer.',
    ],
    explanation: [
      'Leak terjadi ketika pointer ke blok heap hilang (ditimpa, keluar dari scope, atau fungsi keluar lebih awal) sebelum free dipanggil. Blok itu tetap menempati memori sampai program berakhir. Pada program yang berjalan lama, leak kecil yang berulang dapat menghabiskan memori.',
      'Penyebab yang paling sering: jalur keluar lebih awal (return atau error) yang melewati free, menimpa pointer dengan alokasi baru, dan menyimpan pointer di struktur yang tidak pernah dibongkar. Biasakan pola "siapa yang mengalokasikan, dia pula yang bertanggung jawab membebaskan", dan satu titik pembersihan di akhir fungsi.',
      'Untuk mendeteksi leak, kamu bisa memakai AddressSanitizer (kompilasi dengan -fsanitize=address -g) jika tersedia, atau Valgrind di sistem Linux. Contoh di bawah memakai penghitung sederhana untuk memperlihatkan idenya.',
    ],
    sectionsTitle: 'Pencegahan',
    sections: [
      { title: 'Satu pemilik', body: 'Tentukan dengan jelas bagian kode mana yang bertanggung jawab memanggil free.' },
      { title: 'Jalur error', body: 'Pastikan setiap jalur keluar (termasuk error) melepas memori yang sudah dialokasikan.' },
      { title: 'Alat bantu', body: 'AddressSanitizer dan Valgrind melaporkan blok yang tidak dibebaskan beserta lokasi alokasinya.' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>
#include <stdlib.h>

static int blokAktif = 0;

void *alokasi(size_t ukuran) {
    void *p = malloc(ukuran);
    if (p != NULL) {
        blokAktif++;
    }
    return p;
}

void bebas(void *p) {
    if (p != NULL) {
        free(p);
        blokAktif--;
    }
}

int main(void) {
    int *a = alokasi(sizeof(int));
    int *b = alokasi(sizeof(int));
    int *c = alokasi(sizeof(int));
    printf("Blok aktif setelah alokasi: %d\n", blokAktif);

    bebas(a);
    bebas(b);
    printf("Blok aktif setelah membebaskan dua: %d\n", blokAktif);

    if (blokAktif > 0) {
        printf("Peringatan: %d blok belum dibebaskan (leak)\n", blokAktif);
    }

    bebas(c);
    printf("Blok aktif di akhir: %d\n", blokAktif);
    return 0;
}`,
      explanation: [
        'alokasi dan bebas membungkus malloc dan free sambil menghitung blok yang masih aktif.',
        'Setelah tiga alokasi dan dua pembebasan, satu blok (c) masih aktif. Jika program berhenti di sini, itulah leak.',
        'Setelah bebas(c) dipanggil, penghitung kembali ke 0 yang menandakan tidak ada leak.',
      ],
      output:
        'Blok aktif setelah alokasi: 3\nBlok aktif setelah membebaskan dua: 1\nPeringatan: 1 blok belum dibebaskan (leak)\nBlok aktif di akhir: 0',
    },
    notes: [
      'Sistem operasi membebaskan seluruh memori proses saat program berakhir, tetapi leak tetap berbahaya pada program yang berjalan lama.',
      'Penghitung seperti ini hanya alat belajar. Untuk proyek nyata, gunakan AddressSanitizer atau Valgrind.',
    ],
  },
  {
    id: 'f5-dangling-pointer',
    description:
      'Dangling pointer adalah pointer yang masih menyimpan alamat memori yang sudah dibebaskan atau tidak lagi valid.',
    objectives: [
      'Mengenali tiga sumber dangling pointer.',
      'Menerapkan kebiasaan mengisi pointer dengan NULL setelah free.',
      'Menjelaskan mengapa menyalin pointer menimbulkan risiko ini.',
    ],
    explanation: [
      'Setelah free(p), memori yang ditunjuk p sudah dikembalikan ke sistem, tetapi nilai p tidak otomatis berubah. p sekarang dangling: ia menyimpan alamat yang tidak lagi boleh dipakai. Mendereferensinya (use-after-free) adalah perilaku tak terdefinisi dan bisa menyebabkan crash, data rusak, atau celah keamanan.',
      'Sumber dangling pointer: pointer yang tetap dipakai setelah free, pointer ke variabel lokal yang dikembalikan dari fungsi (variabelnya hilang saat fungsi selesai), dan pointer lain yang menyalin alamat yang sama dengan blok yang sudah dibebaskan lewat pointer pertama.',
      'Kebiasaan terbaik: setelah free, langsung isi pointer dengan NULL. Pemeriksaan if (p != NULL) lalu menjadi aman. Namun salinan pointer lain tidak ikut menjadi NULL, jadi rancang kepemilikan memori dengan jelas.',
    ],
    sectionsTitle: 'Sumber Masalah',
    sections: [
      { title: 'Use-after-free', body: 'Memakai pointer setelah free dipanggil. Jadikan pointer NULL tepat setelah free.' },
      { title: 'Alamat variabel lokal', body: 'Mengembalikan &variabelLokal dari fungsi. Variabelnya hilang begitu fungsi selesai.' },
      { title: 'Salinan pointer', body: 'Dua pointer ke blok yang sama: free lewat satu, yang lain menjadi dangling.' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>
#include <stdlib.h>

void bebaskanAman(int **p) {
    if (p != NULL && *p != NULL) {
        free(*p);
        *p = NULL;
    }
}

int main(void) {
    int *p = malloc(sizeof(int));
    if (p == NULL) {
        return 1;
    }
    *p = 42;
    int *salinan = p;

    printf("Nilai: %d\n", *p);

    bebaskanAman(&p);
    if (p == NULL) {
        printf("p sudah NULL, aman diperiksa\n");
    }

    printf("salinan sekarang dangling, jangan didereferensi\n");
    (void)salinan;
    return 0;
}`,
      explanation: [
        'bebaskanAman menerima alamat pointer (int **) agar bisa mengubah pointer asli menjadi NULL setelah free.',
        'Setelah pemanggilan, p bernilai NULL sehingga pemeriksaan p == NULL benar.',
        'salinan masih menyimpan alamat lama yang sudah dibebaskan. Karena itu ia tidak boleh dipakai lagi.',
      ],
      output: 'Nilai: 42\np sudah NULL, aman diperiksa\nsalinan sekarang dangling, jangan didereferensi',
    },
    notes: [
      'Mendereferensi NULL biasanya membuat program berhenti dengan jelas, sedangkan dangling pointer bisa merusak data secara diam-diam.',
      'AddressSanitizer mampu mendeteksi use-after-free saat pengujian.',
    ],
  },
  {
    id: 'f5-buffer-overflow',
    description:
      'Buffer overflow terjadi ketika data yang ditulis melebihi ukuran buffer sehingga menimpa memori di sekitarnya.',
    objectives: [
      'Menjelaskan mengapa menulis di luar batas array berbahaya.',
      'Memakai fungsi yang membatasi jumlah karakter, seperti snprintf.',
      'Mendeteksi pemotongan data dengan memeriksa nilai balik.',
    ],
    explanation: [
      'C tidak memeriksa batas array. Jika program menyalin teks sepanjang 20 karakter ke buffer berukuran 10, sisa 10 karakter menimpa data lain yang berada di dekatnya, misalnya variabel lain atau data kontrol fungsi di stack. Akibatnya bisa berupa crash, data rusak, atau celah keamanan serius yang bisa dieksploitasi.',
      'Fungsi seperti gets, strcpy, strcat, dan sprintf tidak membatasi panjang tulisannya, sehingga rawan jika sumbernya lebih panjang dari tujuan. Alternatif yang lebih aman adalah fgets untuk membaca baris dan snprintf untuk menyalin atau memformat dengan batas ukuran.',
      'Pertahanan berlapis: periksa panjang input sebelum menyalin, selalu sertakan ukuran buffer, dan kompilasi dengan perlindungan seperti -fstack-protector serta uji dengan AddressSanitizer. Sistem operasi modern juga menambah ASLR dan memori non-executable, tetapi itu bukan pengganti kode yang benar.',
    ],
    sectionsTitle: 'Praktik Aman',
    sections: [
      { title: 'Hindari fungsi tanpa batas', body: 'Jangan pakai gets. Hindari strcpy, strcat, dan sprintf pada data yang panjangnya tidak pasti.' },
      { title: 'Gunakan versi berbatas', body: 'fgets(buf, sizeof buf, stdin) dan snprintf(buf, sizeof buf, ...) selalu menghormati ukuran buffer.' },
      { title: 'Periksa pemotongan', body: 'snprintf mengembalikan panjang yang seharusnya ditulis. Jika nilainya >= ukuran buffer, berarti data terpotong.' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int main(void) {
    char buffer[10];
    const char *masukan = "Halo Kodein Developer";

    int panjang = snprintf(buffer, sizeof(buffer), "%s", masukan);

    printf("Hasil: %s\n", buffer);
    printf("Dipotong: %s\n", panjang >= (int)sizeof(buffer) ? "ya" : "tidak");
    printf("Panjang seharusnya: %d\n", panjang);
    return 0;
}`,
      explanation: [
        'buffer hanya menampung 10 byte, yaitu 9 karakter ditambah karakter null.',
        'snprintf menulis paling banyak ukuran - 1 karakter lalu menambahkan null, sehingga tidak pernah melewati batas.',
        'Nilai balik 21 (panjang teks asli) lebih besar dari ukuran buffer, sehingga program tahu datanya terpotong.',
      ],
      output: 'Hasil: Halo Kode\nDipotong: ya\nPanjang seharusnya: 21',
    },
    notes: [
      'Jangan menulis kode yang sengaja melewati batas buffer di perangkat yang berisi data penting. Hasilnya tidak bisa diprediksi.',
      'Pemotongan data tetap perlu ditangani: tolak input, minta lebih pendek, atau gunakan buffer lebih besar.',
    ],
  },
  {
    id: 'f5-bitwise-operations',
    description:
      'Operasi bitwise bekerja pada bit-bit sebuah bilangan secara langsung, dan dipakai untuk flag, mask, dan perhitungan efisien.',
    objectives: [
      'Memakai operator &, |, ^, ~, <<, dan >>.',
      'Mengatur, menghapus, membalik, dan memeriksa bit tertentu.',
      'Menerapkan flag dalam satu variabel.',
    ],
    explanation: [
      'Operator bitwise bekerja pada setiap bit: AND (&) menghasilkan 1 jika kedua bit 1, OR (|) menghasilkan 1 jika salah satunya 1, XOR (^) menghasilkan 1 jika kedua bit berbeda, dan NOT (~) membalik semua bit. Geser kiri (<<) menggandakan nilai untuk setiap geseran, dan geser kanan (>>) membaginya dua (dibulatkan ke bawah untuk bilangan tak bertanda).',
      'Untuk memanipulasi satu bit ke-n: atur dengan x |= (1u << n), hapus dengan x &= ~(1u << n), balik dengan x ^= (1u << n), dan periksa dengan (x >> n) & 1u. Pola ini dipakai untuk menyimpan banyak flag boolean dalam satu bilangan.',
      'Gunakan tipe tak bertanda (unsigned) untuk operasi bit. Menggeser bilangan bertanda negatif atau menggeser sebanyak lebar tipe memiliki perilaku yang tidak terdefinisi atau bergantung implementasi.',
    ],
    sectionsTitle: 'Pola Manipulasi Bit',
    sections: [
      { title: 'Atur bit', body: 'x |= (1u << n);' },
      { title: 'Hapus bit', body: 'x &= ~(1u << n);' },
      { title: 'Balik bit', body: 'x ^= (1u << n);' },
      { title: 'Periksa bit', body: '(x >> n) & 1u menghasilkan 1 jika bit ke-n aktif.' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int main(void) {
    unsigned char a = 12;
    unsigned char b = 10;

    printf("a & b  = %d\n", a & b);
    printf("a | b  = %d\n", a | b);
    printf("a ^ b  = %d\n", a ^ b);
    printf("~a     = %d\n", (unsigned char)~a);
    printf("a << 1 = %d\n", a << 1);
    printf("a >> 2 = %d\n", a >> 2);

    unsigned int bendera = 0;
    bendera |= 1u << 2;
    bendera |= 1u << 0;
    bendera &= ~(1u << 2);
    bendera ^= 1u << 3;

    printf("bendera = %u\n", bendera);
    printf("bit 3 aktif? %s\n", ((bendera >> 3) & 1u) ? "ya" : "tidak");
    return 0;
}`,
      explanation: [
        '12 adalah 1100 dan 10 adalah 1010. AND menghasilkan 1000 (8), OR menghasilkan 1110 (14), XOR menghasilkan 0110 (6).',
        '~a membalik 8 bit sehingga 00001100 menjadi 11110011 (243).',
        'Geser kiri 1 menggandakan 12 menjadi 24, geser kanan 2 membaginya empat menjadi 3.',
        'bendera: bit 2 diatur (4), bit 0 diatur (5), bit 2 dihapus (1), bit 3 dibalik (9).',
      ],
      output:
        'a & b  = 8\na | b  = 14\na ^ b  = 6\n~a     = 243\na << 1 = 24\na >> 2 = 3\nbendera = 9\nbit 3 aktif? ya',
    },
    notes: [
      'Jangan tertukar antara & (bitwise) dan && (logika), atau | dan ||.',
      'Beri nama pada mask dengan konstanta atau enum agar kode flag mudah dibaca.',
    ],
  },
  {
    id: 'f5-binary-representation',
    description:
      'Semua data di komputer disimpan sebagai bit. Memahami biner, heksadesimal, dan oktal membantu membaca memori dan data mentah.',
    objectives: [
      'Mengonversi bilangan antara desimal, biner, heksadesimal, dan oktal.',
      'Menjelaskan mengapa heksadesimal populer untuk menampilkan byte.',
      'Mencetak representasi biner sebuah bilangan.',
    ],
    explanation: [
      'Komputer hanya mengenal dua keadaan, sehingga semua data disimpan dalam bilangan biner (basis 2). Setiap bit memiliki bobot pangkat dua: 11001010 sama dengan 128 + 64 + 8 + 2 = 202. Delapan bit membentuk satu byte yang dapat menyimpan nilai 0 sampai 255.',
      'Heksadesimal (basis 16) memakai digit 0-9 dan A-F. Satu digit heksa mewakili tepat empat bit, sehingga satu byte selalu ditulis dengan dua digit heksa. Itulah sebabnya dump memori dan kode warna memakai heksadesimal: ringkas dan mudah dikonversi ke biner. Oktal (basis 8) mewakili tiga bit per digit dan masih dipakai pada izin berkas Unix.',
      'Konversi paling mudah dilakukan per kelompok: 1100 1010 menjadi C dan A, sehingga 0xCA. Di C, awalan 0x menandai heksa, awalan 0 menandai oktal, dan format printf %X, %o menampilkannya.',
    ],
    sectionsTitle: 'Basis Bilangan',
    sections: [
      { title: 'Biner (basis 2)', body: 'Digit 0 dan 1. Setiap bit bernilai pangkat dua dari posisinya.' },
      { title: 'Heksadesimal (basis 16)', body: 'Digit 0-9 dan A-F. Satu digit mewakili empat bit, dua digit mewakili satu byte.' },
      { title: 'Oktal (basis 8)', body: 'Digit 0-7. Satu digit mewakili tiga bit. Di C, angka berawalan 0 dibaca sebagai oktal.' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

void cetakBiner(unsigned int nilai, int jumlahBit) {
    for (int i = jumlahBit - 1; i >= 0; i--) {
        putchar(((nilai >> i) & 1u) ? '1' : '0');
    }
}

int main(void) {
    unsigned int daftar[] = {5, 202, 255};

    for (int i = 0; i < 3; i++) {
        printf("%3u = ", daftar[i]);
        cetakBiner(daftar[i], 8);
        printf(" = 0x%02X = 0%o\n", daftar[i], daftar[i]);
    }
    return 0;
}`,
      explanation: [
        'cetakBiner memeriksa bit dari yang paling kiri (indeks tertinggi) ke kanan dengan (nilai >> i) & 1.',
        '%02X mencetak heksadesimal huruf besar minimal dua digit, dan %o mencetak oktal.',
        '202 adalah 11001010 dalam biner, CA dalam heksa, dan 312 dalam oktal.',
      ],
      output:
        '  5 = 00000101 = 0x05 = 05\n202 = 11001010 = 0xCA = 0312\n255 = 11111111 = 0xFF = 0377',
    },
    notes: [
      'Satu byte selalu cocok dengan tepat dua digit heksadesimal.',
      'Hati-hati: angka seperti 010 di C dibaca sebagai oktal (bernilai 8), bukan sepuluh.',
    ],
  },
  {
    id: 'f5-two-s-complement',
    description:
      "Two's complement adalah cara komputer menyimpan bilangan bulat bertanda sehingga penjumlahan dan pengurangan memakai rangkaian yang sama.",
    objectives: [
      "Menghitung representasi two's complement sebuah bilangan negatif.",
      'Menentukan rentang nilai bilangan bertanda n-bit.',
      'Memahami hubungan bilangan bertanda dan tak bertanda pada bit yang sama.',
    ],
    explanation: [
      "Pada two's complement, bit paling kiri adalah bit tanda (1 berarti negatif). Untuk mendapatkan negatif sebuah bilangan: balik semua bit lalu tambah 1. Contoh 8 bit: 5 = 00000101, dibalik menjadi 11111010, ditambah 1 menjadi 11111011, yaitu -5.",
      'Rentang bilangan bertanda n bit adalah -2^(n-1) sampai 2^(n-1) - 1. Untuk 8 bit: -128 sampai 127. Nilai negatif terdalamnya (-128 = 10000000) tidak punya pasangan positif.',
      'Keunggulan utama: penjumlahan bilangan positif dan negatif memakai rangkaian penjumlah yang sama tanpa penanganan khusus. Pola bit yang sama dapat dibaca sebagai bilangan bertanda atau tak bertanda: 11111011 adalah -5 jika bertanda, tetapi 251 jika tak bertanda.',
    ],
    sectionsTitle: 'Langkah Menegasikan',
    sections: [
      { title: '1. Tulis biner positifnya', body: '5 dalam 8 bit: 00000101.' },
      { title: '2. Balik semua bit', body: '00000101 menjadi 11111010.' },
      { title: '3. Tambah 1', body: '11111010 + 1 = 11111011, yaitu -5.' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdint.h>
#include <stdio.h>

void cetakBit(uint8_t n) {
    for (int i = 7; i >= 0; i--) {
        putchar(((n >> i) & 1u) ? '1' : '0');
    }
}

int main(void) {
    int8_t angka[] = {5, -5, -1, -128};

    for (int i = 0; i < 4; i++) {
        printf("%4d = ", angka[i]);
        cetakBit((uint8_t)angka[i]);
        printf("\n");
    }

    int8_t lawan = (int8_t)(~5 + 1);
    printf("~5 + 1 = %d\n", lawan);
    printf("Pola bit -5 dibaca tak bertanda: %u\n", (uint8_t)-5);
    return 0;
}`,
      explanation: [
        'Konversi ke uint8_t memperlihatkan pola bit sebenarnya dari bilangan bertanda.',
        '-5 tersimpan sebagai 11111011, -1 sebagai 11111111, dan -128 sebagai 10000000.',
        '~5 + 1 menegasikan 5 dengan cara pembalikan bit lalu tambah satu, hasilnya -5.',
        'Pola bit yang sama (11111011) bernilai 251 jika dibaca sebagai bilangan tak bertanda.',
      ],
      output:
        '   5 = 00000101\n  -5 = 11111011\n  -1 = 11111111\n-128 = 10000000\n~5 + 1 = -5\nPola bit -5 dibaca tak bertanda: 251',
    },
    notes: [
      'Overflow pada bilangan bertanda adalah perilaku tak terdefinisi di C, berbeda dengan bilangan tak bertanda yang berputar (wrap around).',
      'Berhati-hatilah saat membandingkan bilangan bertanda dengan tak bertanda: yang bertanda dikonversi menjadi tak bertanda.',
    ],
  },
  {
    id: 'f5-endianness',
    description:
      'Endianness menentukan urutan penyimpanan byte dari bilangan multi-byte di memori: byte terkecil dulu (little-endian) atau terbesar dulu (big-endian).',
    objectives: [
      'Membedakan little-endian dan big-endian.',
      'Mengamati urutan byte sebuah bilangan di memori.',
      'Mengonversi urutan byte untuk pertukaran data lewat jaringan.',
    ],
    explanation: [
      'Bilangan 32 bit 0x12345678 terdiri dari empat byte. Pada little-endian, byte paling tidak signifikan (78) disimpan di alamat terendah, sehingga urutannya 78 56 34 12. Pada big-endian, urutannya 12 34 56 78. x86 dan hampir semua perangkat ARM modern memakai little-endian.',
      'Perbedaan ini penting ketika data dipertukarkan antar-sistem: berkas biner, protokol jaringan, atau data antarperangkat. Protokol jaringan memakai network byte order, yaitu big-endian. Fungsi htonl/htons mengubah urutan host menjadi urutan jaringan, dan ntohl/ntohs sebaliknya.',
      'Cara memeriksa urutan byte: baca byte pertama bilangan melalui pointer unsigned char. Jika byte pertama adalah byte terkecil (0x78), mesin tersebut little-endian.',
    ],
    sectionsTitle: 'Ringkasan',
    sections: [
      { title: 'Little-endian', body: 'Byte terkecil di alamat terendah. Dipakai x86 dan kebanyakan ARM.' },
      { title: 'Big-endian', body: 'Byte terbesar di alamat terendah. Dipakai network byte order dan beberapa arsitektur lama.' },
      { title: 'Konversi jaringan', body: 'htons/htonl mengubah ke urutan jaringan, ntohs/ntohl mengubah kembali.' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <arpa/inet.h>
#include <stdint.h>
#include <stdio.h>

void cetakByte(const char *label, uint32_t nilai) {
    const unsigned char *b = (const unsigned char *)&nilai;
    printf("%s:", label);
    for (int i = 0; i < 4; i++) {
        printf(" %02X", b[i]);
    }
    printf("\n");
}

int main(void) {
    uint32_t nilai = 0x12345678;

    cetakByte("Urutan di memori", nilai);
    cetakByte("Urutan jaringan ", htonl(nilai));
    printf("Mesin ini: %s-endian\n", ((unsigned char *)&nilai)[0] == 0x78 ? "little" : "big");
    return 0;
}`,
      explanation: [
        'cetakByte membaca empat byte dari bilangan satu per satu lewat pointer unsigned char sehingga urutan sebenarnya terlihat.',
        'htonl mengubah urutan byte ke network byte order (big-endian).',
        'Jika byte pertama bernilai 0x78, mesin menyimpan byte terkecil lebih dulu, yaitu little-endian.',
      ],
      output:
        'Urutan di memori: 78 56 34 12\nUrutan jaringan : 12 34 56 78\nMesin ini: little-endian',
    },
    notes: [
      'Output di atas berlaku pada mesin little-endian (misalnya HP Android dan PC x86). Pada mesin big-endian, kedua baris pertama sama.',
      'Jangan mengirim struct mentah lewat jaringan atau berkas lintas platform. Serialisasikan field satu per satu dengan urutan byte yang jelas.',
    ],
  },
  {
    id: 'f5-assembly-fundamentals',
    description:
      'Assembly adalah bahasa instruksi CPU yang dibaca manusia. Satu baris assembly hampir selalu menjadi satu instruksi mesin.',
    objectives: [
      'Menjelaskan hubungan assembly dengan bahasa mesin dan arsitektur CPU.',
      'Membaca instruksi ARM64 sederhana (add, cmp, csel).',
      'Menyisipkan assembly pada kode C dengan inline assembly.',
    ],
    explanation: [
      'Setiap arsitektur CPU punya instruksi sendiri, sehingga assembly untuk ARM64 (HP Android) berbeda dengan x86-64 (PC). Instruksi assembly bekerja pada register, yaitu penyimpanan super cepat di dalam CPU. Bentuk umum ARM64: operasi tujuan, sumber1, sumber2, misalnya add w0, w1, w2 berarti w0 = w1 + w2.',
      'Beberapa instruksi dasar ARM64: mov (menyalin nilai), add dan sub (hitung), cmp (bandingkan dan mengatur flag), csel (pilih salah satu nilai berdasarkan flag), ldr dan str (baca dan tulis memori), b dan bl (lompat dan panggil fungsi). Register w0-w30 adalah separuh bawah (32 bit) dari register x0-x30 (64 bit).',
      'Cara paling mudah mencoba assembly adalah inline assembly di C. Kita menulis instruksi sebagai teks dan mendeklarasikan operand: "=r"(hasil) berarti hasil ditulis ke register pilihan compiler, dan "r"(a) berarti a dibaca dari register. Contoh ini hanya berjalan pada arsitektur ARM64 (cek dengan uname -m yang harus menampilkan aarch64).',
    ],
    sectionsTitle: 'Instruksi Dasar',
    sections: [
      { title: 'ARM64: aritmatika', body: 'add w0, w1, w2 berarti w0 = w1 + w2. sub dan mul bekerja serupa. mov w0, #5 mengisi w0 dengan 5.' },
      { title: 'ARM64: bandingkan dan pilih', body: 'cmp w1, w2 mengurangkan tanpa menyimpan hasil dan mengatur flag. csel w0, w1, w2, gt memilih w1 jika w1 > w2, selain itu w2.' },
      { title: 'Padanan x86-64', body: 'Instruksi x86-64 berbentuk dua operand: add eax, ebx berarti eax = eax + ebx. cmp lalu cmov (misalnya cmovg) menjadi padanan csel.' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int tambahAsm(int a, int b) {
    int hasil;
    __asm__("add %w0, %w1, %w2" : "=r"(hasil) : "r"(a), "r"(b));
    return hasil;
}

int maksAsm(int a, int b) {
    int hasil;
    __asm__("cmp %w1, %w2\n\tcsel %w0, %w1, %w2, gt"
            : "=r"(hasil)
            : "r"(a), "r"(b)
            : "cc");
    return hasil;
}

int main(void) {
    printf("3 + 4 = %d\n", tambahAsm(3, 4));
    printf("maks(7, 3) = %d\n", maksAsm(7, 3));
    printf("maks(2, 9) = %d\n", maksAsm(2, 9));
    return 0;
}`,
      explanation: [
        '%w0, %w1, %w2 adalah register 32 bit yang dipilihkan compiler untuk hasil, a, dan b.',
        'add menjumlahkan a dan b. Hasilnya langsung menjadi nilai balik fungsi.',
        'cmp membandingkan a dan b dan mengatur flag, lalu csel memilih a jika a > b, selain itu b. "cc" memberi tahu compiler bahwa flag diubah.',
        'Kode ini khusus ARM64. Di mesin x86-64 instruksi di atas tidak akan dikenali compiler.',
      ],
      output: '3 + 4 = 7\nmaks(7, 3) = 7\nmaks(2, 9) = 9',
    },
    notes: [
      'Cek arsitektur dulu dengan: uname -m (aarch64 berarti ARM64).',
      'Inline assembly tidak portabel. Pakailah hanya jika benar-benar perlu, dan bungkus dalam fungsi kecil.',
    ],
  },
  {
    id: 'f5-cpu-registers',
    description:
      'Register adalah penyimpanan terkecil dan tercepat di dalam CPU, dipakai untuk menampung operand, hasil, dan alamat.',
    objectives: [
      'Menyebutkan kelompok register utama pada ARM64 dan x86-64.',
      'Menjelaskan fungsi register untuk argumen, nilai balik, stack, dan alamat kembali.',
      'Memakai register dalam inline assembly sederhana.',
    ],
    explanation: [
      'CPU melakukan perhitungan hanya pada register. Data dari memori dimuat ke register, diproses, lalu hasilnya ditulis balik. Jumlah register sedikit tetapi aksesnya paling cepat di seluruh hierarki memori. Karena itu compiler yang baik berusaha menyimpan variabel yang sering dipakai di register.',
      'ARM64 memiliki register serbaguna x0-x30 (64 bit). Menurut konvensi pemanggilan, x0-x7 membawa argumen fungsi dan x0 membawa nilai balik. x29 adalah frame pointer, x30 (link register) menyimpan alamat kembali setelah pemanggilan fungsi, sp adalah penunjuk stack, dan xzr selalu bernilai nol. Program counter (pc) menunjuk instruksi berikutnya dan tidak ditulis langsung.',
      'x86-64 memiliki rax, rbx, rcx, rdx, rsi, rdi, rbp, rsp, r8-r15, penunjuk instruksi rip, dan register status rflags. Pada konvensi System V, enam argumen pertama dikirim lewat rdi, rsi, rdx, rcx, r8, dan r9, sedangkan nilai balik lewat rax.',
    ],
    sectionsTitle: 'Peran Register',
    sections: [
      { title: 'ARM64: argumen dan hasil', body: 'x0-x7 untuk argumen, x0 untuk nilai balik. w0-w7 adalah separuh bawah 32 bit.' },
      { title: 'ARM64: khusus', body: 'sp (stack pointer), x29 (frame pointer), x30 (alamat kembali), xzr (selalu nol), pc (instruksi berikutnya).' },
      { title: 'x86-64', body: 'rdi, rsi, rdx, rcx, r8, r9 untuk argumen, rax untuk hasil, rsp stack pointer, rbp frame pointer, rip instruksi berikutnya.' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

long hitungAsm(long a, long b) {
    long hasil;
    __asm__("mul %0, %1, %2\n\tadd %0, %0, %1"
            : "=&r"(hasil)
            : "r"(a), "r"(b));
    return hasil;
}

long nolAsm(void) {
    long hasil;
    __asm__("mov %0, xzr" : "=r"(hasil));
    return hasil;
}

int main(void) {
    printf("6 x 7 + 6 = %ld\n", hitungAsm(6, 7));
    printf("xzr selalu bernilai: %ld\n", nolAsm());
    return 0;
}`,
      explanation: [
        'Tipe long berukuran 64 bit, sehingga compiler memakai register x0-x30 dan tidak perlu pengubah %w.',
        'mul mengalikan a dan b ke register hasil, lalu add menambahkan a. Tanda "=&r" (early clobber) mencegah hasil memakai register yang sama dengan input karena hasil ditulis sebelum seluruh input selesai dibaca.',
        'xzr adalah register yang selalu bernilai nol, jadi mov %0, xzr mengisi hasil dengan 0.',
        'Kode ini khusus ARM64 (aarch64).',
      ],
      output: '6 x 7 + 6 = 48\nxzr selalu bernilai: 0',
    },
    notes: [
      'Register callee-saved (x19-x28 pada ARM64) harus dipulihkan oleh fungsi yang memakainya. Inline assembly yang memakainya harus dideklarasikan sebagai clobber.',
      'Konvensi pemanggilan berbeda antar-arsitektur dan sistem operasi. Rujuk dokumentasi ABI jika menulis assembly murni.',
    ],
  },
];