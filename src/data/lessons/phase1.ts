import type { LessonContent } from '@/types/content';

export const phase1Lessons: LessonContent[] = [
  {
    id: 'f1-pengenalan-programming',
    description:
      'Programming adalah cara kita memberi instruksi yang tepat kepada komputer agar menyelesaikan tugas tertentu.',
    objectives: [
      'Menjelaskan apa itu program, bahasa pemrograman, dan source code.',
      'Membedakan bahasa tingkat tinggi dan bahasa tingkat rendah secara garis besar.',
      'Memahami alasan belajar programming dimulai dari bahasa C.',
    ],
    explanation: [
      'Komputer sangat cepat, tetapi tidak bisa menebak maksud kita. Ia hanya menjalankan instruksi yang ditulis secara tepat dan berurutan. Kumpulan instruksi itu disebut program, dan tulisan instruksinya disebut source code.',
      'Source code ditulis dalam bahasa pemrograman. Bahasa tingkat tinggi seperti Python dan Java dekat dengan cara berpikir manusia, sedangkan bahasa tingkat rendah seperti Assembly dekat dengan cara kerja mesin. C berada di tengah-tengah: cukup mudah dibaca, tetapi tetap memperlihatkan bagaimana data dan memori bekerja.',
      'Kodein memakai C sebagai bahasa pertama karena C melatih fondasi yang dipakai semua bahasa lain: tipe data, alur kontrol, fungsi, dan memori. Setelah paham C, mempelajari bahasa lain menjadi jauh lebih cepat.',
    ],
    sectionsTitle: 'Istilah Dasar',
    sections: [
      {
        title: 'Program',
        body: 'Rangkaian instruksi yang dijalankan komputer secara berurutan dari atas ke bawah, kecuali jika ada instruksi yang mengubah alurnya (seperti percabangan dan perulangan).',
      },
      {
        title: 'Source code',
        body: 'Teks program yang ditulis manusia dan tersimpan dalam berkas, misalnya halo.c. Source code belum bisa langsung dijalankan komputer.',
      },
      {
        title: 'Algoritma',
        body: 'Langkah-langkah yang jelas dan berurutan untuk menyelesaikan suatu masalah. Program adalah algoritma yang ditulis dalam bahasa pemrograman.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int main(void) {
    printf("Halo, Kodein!\n");
    return 0;
}`,
      explanation: [
        '#include <stdio.h> memuat pustaka standar input/output yang menyediakan printf.',
        'int main(void) adalah fungsi utama. Eksekusi program selalu dimulai dari sini.',
        'printf menampilkan teks ke layar. Karakter \\n berarti pindah ke baris baru.',
        'return 0 memberi tahu sistem operasi bahwa program selesai tanpa kesalahan.',
      ],
      output: 'Halo, Kodein!',
    },
    notes: [
      'Komputer menjalankan instruksi persis seperti yang ditulis, bukan seperti yang kamu maksud.',
      'Setiap pernyataan di C diakhiri tanda titik koma (;).',
      'Di Termux kamu bisa memasang compiler dengan perintah: pkg install clang.',
    ],
  },
  {
    id: 'f1-cara-kerja-program',
    description:
      'Source code harus diterjemahkan menjadi bahasa mesin sebelum bisa dijalankan oleh CPU.',
    objectives: [
      'Menjelaskan tahapan dari source code menjadi program yang berjalan.',
      'Membedakan compiler dan interpreter.',
      'Menjalankan proses kompilasi sederhana dari terminal.',
    ],
    explanation: [
      'CPU hanya mengerti instruksi biner yang disebut bahasa mesin. Karena itu, program C harus diterjemahkan lebih dulu oleh compiler. Compiler membaca seluruh source code, memeriksa kesalahan, lalu menghasilkan berkas program yang bisa dijalankan (executable).',
      'Berbeda dengan compiler, interpreter (seperti pada Python) membaca dan menjalankan kode baris demi baris tanpa menghasilkan executable terpisah. Program hasil kompilasi umumnya berjalan lebih cepat, sedangkan interpreter lebih fleksibel saat pengembangan.',
      'Saat program dijalankan, sistem operasi memuat executable ke memori, lalu CPU menjalankan instruksinya satu per satu. Hasilnya kita lihat sebagai output di layar.',
    ],
    sectionsTitle: 'Tahapan Kompilasi',
    sections: [
      {
        title: '1. Preprocessing',
        body: 'Preprocessor memproses baris yang diawali #, misalnya menyisipkan isi pustaka lewat #include dan mengganti nama makro dari #define dengan nilainya.',
      },
      {
        title: '2. Compiling',
        body: 'Compiler memeriksa sintaks, lalu menerjemahkan source code menjadi kode Assembly.',
      },
      {
        title: '3. Assembling',
        body: 'Assembler mengubah kode Assembly menjadi object file berisi instruksi mesin.',
      },
      {
        title: '4. Linking',
        body: 'Linker menggabungkan object file dengan pustaka yang dibutuhkan (misalnya printf) menjadi satu executable.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

#define TAHUN 2026

int main(void) {
    printf("Tahun: %d\n", TAHUN);
    return 0;
}`,
      explanation: [
        '#define TAHUN 2026 adalah makro. Pada tahap preprocessing, setiap kata TAHUN diganti menjadi 2026 sebelum kode dikompilasi.',
        'Untuk mengompilasi, jalankan: clang program.c -o program (atau gcc program.c -o program).',
        'Untuk menjalankan hasilnya, ketik: ./program',
        'Untuk melihat hasil preprocessing saja, gunakan opsi -E: clang -E program.c',
      ],
      output: 'Tahun: 2026',
    },
    notes: [
      'Jika ada kesalahan sintaks, compiler menolak menghasilkan program dan menampilkan pesan error beserta nomor barisnya.',
      'Jika kamu mengubah source code, kamu harus mengompilasi ulang agar perubahannya berlaku.',
    ],
  },
  {
    id: 'f1-syntax-dan-structure',
    description:
      'Sintaks adalah aturan penulisan kode, dan struktur menentukan bagaimana program C tersusun.',
    objectives: [
      'Mengenali bagian-bagian dasar program C.',
      'Menulis komentar dan pernyataan dengan benar.',
      'Memahami bahwa C membedakan huruf besar dan kecil.',
    ],
    explanation: [
      'Setiap program C tersusun dari beberapa bagian: direktif preprocessor di bagian atas (misalnya #include), lalu satu atau lebih fungsi, dengan main sebagai titik awal eksekusi. Isi fungsi ditulis di dalam kurung kurawal { }, yang disebut blok.',
      'Di dalam blok, kita menulis pernyataan (statement). Setiap pernyataan diakhiri titik koma. Komputer tidak peduli spasi dan baris kosong, tetapi manusia sangat peduli, jadi gunakan indentasi agar kode mudah dibaca.',
      'Komentar adalah catatan untuk manusia yang diabaikan compiler. Gunakan komentar untuk menjelaskan alasan di balik kode, bukan sekadar mengulang apa yang sudah jelas.',
    ],
    sectionsTitle: 'Aturan Penting',
    sections: [
      {
        title: 'Case sensitive',
        body: 'C membedakan huruf besar dan kecil. printf berbeda dengan Printf, dan nilai berbeda dengan Nilai. Salah huruf besar-kecil akan menyebabkan error.',
      },
      {
        title: 'Titik koma',
        body: 'Setiap pernyataan harus diakhiri dengan ;. Lupa menulisnya adalah salah satu error sintaks yang paling sering terjadi pada pemula.',
      },
      {
        title: 'Komentar',
        body: 'Komentar satu baris diawali //. Komentar beberapa baris ditulis di antara tanda /* dan */.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

// Fungsi utama: eksekusi program dimulai dari sini
int main(void) {
    printf("Baris pertama\n");
    printf("Baris kedua\n");   // setiap pernyataan diakhiri titik koma

    return 0;   // 0 berarti program selesai tanpa error
}`,
      explanation: [
        'Baris yang diawali // adalah komentar dan tidak dijalankan.',
        'Kurung kurawal { } membungkus isi fungsi main.',
        'Dua pernyataan printf dijalankan berurutan dari atas ke bawah.',
        'Komentar boleh ditulis di akhir baris, setelah pernyataan.',
      ],
      output: 'Baris pertama\nBaris kedua',
    },
    notes: [
      'Gunakan indentasi yang konsisten (misalnya 4 spasi) di dalam setiap blok.',
      'Pesan error compiler biasanya menunjuk baris yang bermasalah. Mulailah memeriksa dari error pertama.',
    ],
  },
  {
    id: 'f1-variables-dan-constants',
    description:
      'Variabel menyimpan data yang bisa berubah, sedangkan konstanta menyimpan data yang tetap.',
    objectives: [
      'Mendeklarasikan dan menginisialisasi variabel.',
      'Mengikuti aturan penamaan identifier di C.',
      'Membuat konstanta dengan const dan #define.',
    ],
    explanation: [
      'Variabel adalah tempat bernama di memori untuk menyimpan nilai. Saat mendeklarasikan variabel, kita menentukan tipe dan namanya, misalnya int umur;. Memberi nilai awal saat deklarasi disebut inisialisasi: int umur = 20;. Variabel yang tidak diinisialisasi berisi nilai acak, jadi biasakan selalu memberi nilai awal.',
      'Nama variabel (identifier) boleh berisi huruf, angka, dan garis bawah, tetapi tidak boleh diawali angka dan tidak boleh sama dengan kata kunci seperti int atau return. Pilih nama yang menjelaskan isi variabel, misalnya jumlahSiswa, bukan x.',
      'Konstanta adalah nilai yang tidak boleh berubah. Ada dua cara umum: const int, yang punya tipe dan dicek compiler, serta #define, yang hanya mengganti teks sebelum kompilasi. Untuk kode baru, const biasanya lebih aman.',
    ],
    sectionsTitle: 'Aturan Penamaan',
    sections: [
      {
        title: 'Yang diperbolehkan',
        body: 'Huruf, angka, dan garis bawah (_), dengan karakter pertama berupa huruf atau garis bawah. Contoh valid: nilai1, total_harga, jumlahSiswa.',
      },
      {
        title: 'Yang dilarang',
        body: 'Diawali angka (1nilai), mengandung spasi atau tanda minus (total harga, total-harga), dan memakai kata kunci bahasa C (int, for, return).',
      },
      {
        title: 'Kebiasaan baik',
        body: 'Gunakan nama yang bermakna dan gaya penulisan yang konsisten. Tulis konstanta dengan huruf kapital, misalnya JAM_PER_HARI.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

#define PI 3.14159

int main(void) {
    int umur = 20;
    const int JAM_PER_HARI = 24;
    double jariJari = 5.0;
    double luas = PI * jariJari * jariJari;

    umur = umur + 1;

    printf("Umur: %d\n", umur);
    printf("Jam per hari: %d\n", JAM_PER_HARI);
    printf("Luas lingkaran: %.2f\n", luas);
    return 0;
}`,
      explanation: [
        'umur adalah variabel yang nilainya bisa diubah, sehingga umur = umur + 1 menghasilkan 21.',
        'JAM_PER_HARI dideklarasikan dengan const, sehingga mencoba mengubahnya akan menyebabkan error kompilasi.',
        'PI didefinisikan dengan #define dan diganti menjadi 3.14159 sebelum kompilasi.',
        '%.2f menampilkan bilangan desimal dengan dua angka di belakang koma.',
      ],
      output: 'Umur: 21\nJam per hari: 24\nLuas lingkaran: 78.54',
    },
    notes: [
      'Variabel yang belum diinisialisasi berisi nilai acak (sampah). Selalu beri nilai awal.',
      'Gunakan const untuk nilai yang tidak seharusnya berubah agar kesalahan terdeteksi lebih awal.',
    ],
  },
  {
    id: 'f1-data-types',
    description:
      'Tipe data menentukan jenis nilai yang bisa disimpan variabel dan berapa memori yang dipakainya.',
    objectives: [
      'Mengenali tipe data dasar int, char, float, dan double.',
      'Menggunakan sizeof untuk mengetahui ukuran tipe data.',
      'Memahami bahaya overflow dan pembagian bilangan bulat.',
    ],
    explanation: [
      'Setiap variabel di C punya tipe. Tipe int menyimpan bilangan bulat, char menyimpan satu karakter (sebenarnya sebuah bilangan kecil yang mewakili kode karakter ASCII), float dan double menyimpan bilangan desimal, dengan double memiliki ketelitian lebih tinggi.',
      'Ukuran tipe bergantung pada platform. Pada kebanyakan komputer dan ponsel modern, int berukuran 4 byte, double 8 byte, dan char 1 byte. Operator sizeof memberi tahu ukuran sebenarnya di platform yang kamu pakai.',
      'Karena ukurannya terbatas, setiap tipe punya batas nilai. Jika hasil perhitungan melebihi batas, terjadi overflow dan hasilnya salah. Pilih tipe yang cukup besar, misalnya long long untuk bilangan yang sangat besar.',
    ],
    sectionsTitle: 'Tipe Dasar',
    sections: [
      {
        title: 'int',
        body: 'Bilangan bulat, contoh: 42 atau -7. Format printf: %d. Pada umumnya berukuran 4 byte dengan rentang sekitar -2 miliar sampai 2 miliar.',
      },
      {
        title: 'char',
        body: "Satu karakter dalam tanda kutip tunggal, contoh: 'K'. Format printf: %c. Karena berupa angka, 'K' tersimpan sebagai kode ASCII 75.",
      },
      {
        title: 'float dan double',
        body: 'Bilangan desimal. float lebih hemat memori tetapi kurang teliti, sedangkan double (format %f) lebih teliti dan lebih umum dipakai.',
      },
      {
        title: 'long long',
        body: 'Bilangan bulat dengan rentang jauh lebih besar (minimal 8 byte). Format printf: %lld. Dipakai misalnya untuk hasil faktorial.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int main(void) {
    int jumlah = 42;
    char huruf = 'K';
    float suhu = 36.5f;
    double pi = 3.141592653589793;

    printf("int    : %d\n", jumlah);
    printf("char   : %c (kode ASCII %d)\n", huruf, huruf);
    printf("float  : %.1f\n", suhu);
    printf("double : %.5f\n", pi);
    printf("Ukuran int    : %zu byte\n", sizeof(int));
    printf("Ukuran double : %zu byte\n", sizeof(double));
    return 0;
}`,
      explanation: [
        "Variabel huruf menyimpan 'K'. Jika dicetak dengan %c tampil sebagai huruf, jika dicetak dengan %d tampil sebagai kode ASCII-nya (75).",
        'Akhiran f pada 36.5f menandakan nilai bertipe float, bukan double.',
        '%.5f membatasi tampilan desimal menjadi lima angka, sehingga pi tampil sebagai 3.14159.',
        '%zu adalah format untuk hasil sizeof. Ukuran 4 dan 8 byte berlaku di kebanyakan platform modern.',
      ],
      output:
        'int    : 42\nchar   : K (kode ASCII 75)\nfloat  : 36.5\ndouble : 3.14159\nUkuran int    : 4 byte\nUkuran double : 8 byte',
    },
    notes: [
      'Pembagian dua int menghasilkan int. 7 / 2 bernilai 3, bukan 3.5. Ubah salah satu operand menjadi double jika butuh desimal.',
      'Cocokkan format printf dengan tipe variabel. Format yang salah menghasilkan output yang salah.',
    ],
  },
  {
    id: 'f1-input-dan-output',
    description:
      'Input dan output menghubungkan program dengan pengguna: menampilkan hasil dan membaca data.',
    objectives: [
      'Menampilkan data dengan printf dan format specifier.',
      'Membaca input dengan scanf secara aman.',
      'Memeriksa apakah input berhasil dibaca.',
    ],
    explanation: [
      'printf menampilkan teks ke layar. Di dalam teksnya kita bisa menyisipkan format specifier, seperti %d untuk int, %f untuk double, %c untuk char, dan %s untuk teks. Nilai yang akan disisipkan ditulis setelah teks, dipisahkan koma, dan urutannya harus sama dengan urutan specifier.',
      'scanf membaca input dari keyboard dan menyimpannya ke variabel. Karena scanf perlu tahu alamat variabel tujuan, kita menulis tanda & di depan nama variabel, misalnya scanf("%d", &umur). Khusus array char (teks), nama array sudah merupakan alamat sehingga tidak memakai &.',
      'scanf mengembalikan jumlah nilai yang berhasil dibaca. Periksa nilai ini agar program tidak memakai data yang tidak valid, misalnya saat pengguna mengetik huruf padahal diminta angka. Untuk teks, batasi panjang input (contoh %49s untuk array 50 karakter) agar tidak melebihi ukuran array.',
    ],
    sectionsTitle: 'Format Specifier',
    sections: [
      {
        title: '%d dan %i',
        body: 'Untuk int. Contoh: printf("%d", 10) menampilkan 10.',
      },
      {
        title: '%f dan %lf',
        body: 'Untuk bilangan desimal. Pada printf, %f dipakai untuk float dan double. Pada scanf, double harus dibaca dengan %lf. Gunakan %.2f untuk dua angka di belakang koma.',
      },
      {
        title: '%c dan %s',
        body: '%c untuk satu karakter dan %s untuk teks (string).',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int main(void) {
    char nama[50];
    int umur;

    printf("Masukkan nama: ");
    scanf("%49s", nama);

    printf("Masukkan umur: ");
    if (scanf("%d", &umur) != 1) {
        printf("Input umur tidak valid.\n");
        return 1;
    }

    printf("Halo, %s! Tahun depan umurmu %d tahun.\n", nama, umur + 1);
    return 0;
}`,
      explanation: [
        'nama[50] adalah array untuk menyimpan teks hingga 49 karakter (satu tempat dipakai penanda akhir teks). Array dibahas lengkap di Fase 3.',
        '%49s membatasi input maksimal 49 karakter agar tidak melebihi ukuran array.',
        'scanf("%d", &umur) membaca bilangan bulat dan mengisinya ke variabel umur.',
        'Jika scanf tidak mengembalikan 1, artinya input bukan bilangan. Program menampilkan pesan lalu berhenti dengan kode 1.',
      ],
      output:
        'Masukkan nama: Budi\nMasukkan umur: 20\nHalo, Budi! Tahun depan umurmu 21 tahun.',
    },
    notes: [
      'Output di atas adalah contoh jika pengguna mengetik Budi dan 20.',
      'scanf("%s") berhenti di spasi, sehingga nama dengan spasi (misalnya "Budi Santoso") hanya terbaca sebagian. Untuk satu baris penuh gunakan fgets.',
      'Jangan lupa tanda & pada scanf untuk variabel bertipe angka.',
    ],
  },
  {
    id: 'f1-operators',
    description:
      'Operator digunakan untuk melakukan operasi pada data, seperti penjumlahan, pengurangan, perbandingan, dan lainnya.',
    objectives: [
      'Mengenali operator aritmatika, perbandingan, logika, dan assignment di C.',
      'Membedakan operator dan operand, serta memahami urutan prioritas operator.',
      'Menulis ekspresi yang menghasilkan nilai dan menampilkannya dengan printf.',
    ],
    explanation: [
      'Operator adalah simbol yang menyuruh komputer melakukan operasi tertentu pada satu atau lebih nilai. Nilai yang dioperasikan disebut operand. Pada ekspresi a + b, simbol + adalah operator, sedangkan a dan b adalah operand.',
      'Setiap ekspresi di C menghasilkan sebuah nilai. Nilai itu bisa disimpan ke variabel, ditampilkan dengan printf, atau dipakai sebagai kondisi pada if dan loop.',
      'Hasil perbandingan dan operator logika berupa bilangan int: 1 untuk benar dan 0 untuk salah.',
    ],
    sectionsTitle: 'Jenis Operator',
    sections: [
      {
        title: 'Aritmatika',
        body: 'Dipakai untuk perhitungan: + (tambah), - (kurang), * (kali), / (bagi), dan % (sisa bagi atau modulus). Jika kedua operand bertipe int, hasil / adalah bilangan bulat: 10 / 3 menghasilkan 3, bukan 3,33. Operator % hanya berlaku untuk bilangan bulat.',
      },
      {
        title: 'Perbandingan',
        body: 'Membandingkan dua nilai dan menghasilkan 1 (benar) atau 0 (salah): == (sama dengan), != (tidak sama), <, >, <=, dan >=. Jangan tertukar dengan =, yang berfungsi memberi nilai ke variabel.',
      },
      {
        title: 'Logika',
        body: 'Menggabungkan beberapa kondisi: && (dan) benar jika kedua sisi benar, || (atau) benar jika salah satu sisi benar, dan ! (bukan) membalik nilai. Operator && dan || berhenti memeriksa sisi kanan jika hasilnya sudah pasti (short-circuit).',
      },
      {
        title: 'Assignment',
        body: '= memberi nilai ke variabel. Bentuk singkatnya: +=, -=, *=, /=, dan %=. Contoh: x += 5 setara dengan x = x + 5. Operator ++ dan -- menambah atau mengurangi nilai variabel sebanyak 1.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int main(void) {
    int a = 10, b = 3;

    printf("a + b  = %d\n", a + b);
    printf("a - b  = %d\n", a - b);
    printf("a * b  = %d\n", a * b);
    printf("a / b  = %d\n", a / b);
    printf("a %% b = %d\n", a % b);
    printf("a > b  = %d\n", a > b);
    printf("(a > 5) && (b < 5) = %d\n", (a > 5) && (b < 5));

    return 0;
}`,
      explanation: [
        '#include <stdio.h> memuat pustaka input/output agar printf bisa dipakai.',
        'int a = 10, b = 3; membuat dua variabel bertipe int beserta nilai awalnya.',
        'a / b bernilai 3 karena pembagian dua int membuang bagian desimal, sedangkan a % b bernilai 1 sebagai sisa pembagian.',
        'Penulisan %% di dalam printf menampilkan satu karakter %.',
        'Ekspresi perbandingan dan logika menghasilkan 1 jika benar. Pada baris terakhir, (a > 5) dan (b < 5) sama-sama benar sehingga hasilnya 1.',
      ],
      output: [
        'a + b  = 13',
        'a - b  = 7',
        'a * b  = 30',
        'a / b  = 3',
        'a % b = 1',
        'a > b  = 1',
        '(a > 5) && (b < 5) = 1',
      ].join('\n'),
    },
    notes: [
      'Gunakan tanda kurung untuk memperjelas urutan perhitungan. Operator *, /, dan % dikerjakan lebih dulu daripada + dan -.',
      'Kesalahan umum: menulis if (x = 5) alih-alih if (x == 5). Penulisan pertama mengubah x menjadi 5, bukan membandingkannya.',
      'Jangan membagi dengan nol. Hasilnya tidak terdefinisi dan program bisa berhenti dengan error.',
    ],
  },
  {
    id: 'f1-conditional-statements',
    description:
      'Percabangan membuat program mengambil keputusan: menjalankan kode tertentu hanya jika kondisinya terpenuhi.',
    objectives: [
      'Menulis percabangan if, else if, dan else.',
      'Memakai switch untuk memilih berdasarkan satu nilai.',
      'Menghindari kesalahan umum pada kondisi dan break.',
    ],
    explanation: [
      'Tanpa percabangan, program selalu menjalankan instruksi yang sama. Dengan if, kita menjalankan blok kode hanya jika kondisi bernilai benar (tidak nol). Tambahkan else if untuk kondisi lain dan else sebagai pilihan terakhir jika semua kondisi sebelumnya salah. Kondisi diperiksa dari atas ke bawah dan hanya satu blok yang dijalankan.',
      'switch cocok ketika kita memilih tindakan berdasarkan satu nilai bertipe bilangan bulat atau karakter. Setiap case diakhiri break; jika break dilupakan, eksekusi akan "jatuh" ke case berikutnya (fall-through). Bagian default dijalankan jika tidak ada case yang cocok.',
      'Urutan kondisi penting. Pada contoh penilaian, kondisi paling ketat (nilai >= 85) harus diperiksa lebih dulu. Jika dibalik, nilai 90 akan masuk ke kondisi nilai >= 65 lebih dulu dan menghasilkan grade yang salah.',
    ],
    sectionsTitle: 'Bentuk Percabangan',
    sections: [
      {
        title: 'if - else',
        body: 'Dua pilihan: if (kondisi) { ... } else { ... }. Blok if dijalankan jika kondisi benar, selain itu blok else.',
      },
      {
        title: 'if - else if - else',
        body: 'Beberapa pilihan bertingkat. Kondisi diperiksa berurutan dan berhenti di kondisi pertama yang benar.',
      },
      {
        title: 'switch',
        body: 'Memilih berdasarkan nilai int atau char. Gunakan break di akhir setiap case dan default sebagai pilihan cadangan.',
      },
      {
        title: 'Operator ternary',
        body: 'Bentuk ringkas untuk dua pilihan sederhana: kondisi ? nilaiJikaBenar : nilaiJikaSalah. Contoh: (n % 2 == 0) ? "genap" : "ganjil".',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int main(void) {
    int nilai = 82;
    char grade;

    if (nilai >= 85) {
        grade = 'A';
    } else if (nilai >= 75) {
        grade = 'B';
    } else if (nilai >= 65) {
        grade = 'C';
    } else {
        grade = 'D';
    }
    printf("Nilai %d -> grade %c\n", nilai, grade);

    int hari = 3;
    switch (hari) {
        case 1:
            printf("Senin\n");
            break;
        case 2:
            printf("Selasa\n");
            break;
        case 3:
            printf("Rabu\n");
            break;
        default:
            printf("Hari lain\n");
    }

    return 0;
}`,
      explanation: [
        'Nilai 82 tidak memenuhi nilai >= 85, tetapi memenuhi nilai >= 75, sehingga grade bernilai B dan kondisi sisanya dilewati.',
        'switch (hari) mencocokkan nilai hari dengan setiap case. Karena hari bernilai 3, yang dijalankan adalah printf("Rabu").',
        'break menghentikan switch. Tanpa break, program akan lanjut menjalankan case berikutnya.',
        'default dijalankan jika tidak ada case yang cocok.',
      ],
      output: 'Nilai 82 -> grade B\nRabu',
    },
    notes: [
      'Gunakan == untuk membandingkan, bukan =. Compiler biasanya memberi peringatan jika kamu salah menulis.',
      'Selalu gunakan kurung kurawal pada if, meskipun isinya hanya satu baris, agar tidak terjadi kesalahan saat kode ditambah.',
      'switch tidak bisa dipakai untuk bilangan desimal atau teks.',
    ],
  },
  {
    id: 'f1-loops',
    description:
      'Perulangan menjalankan blok kode berkali-kali sehingga kita tidak perlu menulis instruksi yang sama berulang.',
    objectives: [
      'Menggunakan for, while, dan do-while.',
      'Memilih jenis loop yang sesuai kebutuhan.',
      'Mengendalikan loop dengan break dan continue serta menghindari loop tak berhingga.',
    ],
    explanation: [
      'Loop for cocok saat jumlah pengulangan sudah diketahui. Bentuknya for (inisialisasi; kondisi; perubahan): inisialisasi dijalankan sekali di awal, kondisi diperiksa sebelum setiap putaran, dan perubahan dijalankan di akhir setiap putaran.',
      'Loop while cocok saat jumlah pengulangan belum pasti dan bergantung pada kondisi. Kondisi diperiksa lebih dulu, sehingga bisa jadi blok tidak dijalankan sama sekali. Loop do-while menjalankan blok minimal sekali, baru memeriksa kondisi di akhir.',
      'break menghentikan loop seketika, sedangkan continue melompati sisa putaran saat ini dan lanjut ke putaran berikutnya. Pastikan kondisi loop pada akhirnya menjadi salah. Jika tidak, program akan terjebak dalam loop tak berhingga.',
    ],
    sectionsTitle: 'Jenis Loop',
    sections: [
      {
        title: 'for',
        body: 'Dipakai jika jumlah putaran diketahui, misalnya mengulang 10 kali atau menghitung dari 1 sampai N.',
      },
      {
        title: 'while',
        body: 'Dipakai jika perulangan bergantung pada kondisi, misalnya terus membaca input sampai pengguna memasukkan nilai tertentu.',
      },
      {
        title: 'do-while',
        body: 'Seperti while, tetapi pasti berjalan sekali. Cocok untuk menu yang harus tampil minimal satu kali.',
      },
      {
        title: 'Nested loop',
        body: 'Loop di dalam loop. Total putaran adalah perkalian jumlah putaran masing-masing, misalnya 10 x 10 = 100. Dipakai untuk pola dan tabel.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int main(void) {
    int total = 0;
    for (int i = 1; i <= 5; i++) {
        total += i;
    }
    printf("Jumlah 1 sampai 5 = %d\n", total);

    int hitung = 3;
    while (hitung > 0) {
        printf("Hitung mundur: %d\n", hitung);
        hitung--;
    }

    int n = 0;
    do {
        printf("do-while dijalankan, n = %d\n", n);
        n++;
    } while (n < 1);

    return 0;
}`,
      explanation: [
        'Loop for menjumlahkan 1 + 2 + 3 + 4 + 5 sehingga total bernilai 15.',
        'Loop while berjalan selama hitung lebih besar dari 0 dan mengurangi hitung di setiap putaran, sehingga akhirnya berhenti.',
        'Pada do-while, blok dijalankan sekali walaupun kondisi (n < 1) sudah salah setelah n++.',
      ],
      output:
        'Jumlah 1 sampai 5 = 15\nHitung mundur: 3\nHitung mundur: 2\nHitung mundur: 1\ndo-while dijalankan, n = 0',
    },
    notes: [
      'Lupa mengubah variabel kontrol (misalnya hitung--) akan membuat loop tidak pernah berhenti. Tekan Ctrl+C di terminal untuk menghentikannya.',
      'Hati-hati dengan kesalahan selisih satu (off-by-one): periksa apakah batas memakai < atau <=.',
    ],
  },
  {
    id: 'f1-functions',
    description:
      'Fungsi memecah program menjadi bagian kecil yang punya nama, bisa dipakai ulang, dan mudah diuji.',
    objectives: [
      'Mendeklarasikan, mendefinisikan, dan memanggil fungsi.',
      'Menggunakan parameter dan nilai balik.',
      'Memahami bahwa argumen dikirim sebagai salinan (pass by value).',
    ],
    explanation: [
      'Fungsi adalah blok kode bernama yang menjalankan satu tugas. Fungsi memiliki tipe nilai balik, nama, dan daftar parameter. Fungsi bertipe void tidak mengembalikan nilai. Memecah program menjadi fungsi-fungsi kecil membuat kode lebih rapi, mudah dibaca, dan tidak perlu ditulis berulang.',
      'Compiler membaca kode dari atas ke bawah, sehingga fungsi harus sudah dikenal sebelum dipanggil. Cara yang umum adalah menulis prototipe (deklarasi tanpa isi) di atas main, lalu mendefinisikan isi fungsinya di bawah.',
      'Saat fungsi dipanggil, nilai argumen disalin ke parameter (pass by value). Mengubah parameter di dalam fungsi tidak mengubah variabel asli di pemanggil. Untuk mengubah variabel asli dibutuhkan pointer, yang dibahas di Fase 3.',
    ],
    sectionsTitle: 'Bagian Fungsi',
    sections: [
      {
        title: 'Prototipe',
        body: 'Deklarasi singkat di atas main, contoh: int tambah(int a, int b); Memberi tahu compiler nama, parameter, dan tipe nilai balik fungsi.',
      },
      {
        title: 'Definisi',
        body: 'Isi fungsi yang sebenarnya: int tambah(int a, int b) { return a + b; }',
      },
      {
        title: 'Pemanggilan',
        body: 'Memakai fungsi dengan mengisi argumen: int hasil = tambah(3, 4); Nilai balik bisa disimpan ke variabel atau langsung dipakai.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int tambah(int a, int b);
void cetakGaris(int panjang);

int main(void) {
    cetakGaris(20);
    printf("3 + 4 = %d\n", tambah(3, 4));
    cetakGaris(20);
    return 0;
}

int tambah(int a, int b) {
    return a + b;
}

void cetakGaris(int panjang) {
    for (int i = 0; i < panjang; i++) {
        printf("-");
    }
    printf("\n");
}`,
      explanation: [
        'Dua baris di atas main adalah prototipe sehingga main boleh memanggil fungsi yang isinya ditulis di bawah.',
        'tambah menerima dua int dan mengembalikan jumlahnya dengan return.',
        'cetakGaris bertipe void: ia hanya mencetak, tidak mengembalikan nilai.',
        'Fungsi cetakGaris dipanggil dua kali, sehingga logikanya tidak perlu ditulis dua kali.',
      ],
      output: '--------------------\n3 + 4 = 7\n--------------------',
    },
    notes: [
      'Satu fungsi sebaiknya hanya mengerjakan satu tugas dan diberi nama berupa kata kerja yang jelas.',
      'Fungsi bertipe selain void harus selalu mengembalikan nilai pada semua jalur eksekusi.',
    ],
  },
  {
    id: 'f1-scope-dan-lifetime',
    description:
      'Scope menentukan di mana variabel bisa dipakai, sedangkan lifetime menentukan berapa lama variabel hidup di memori.',
    objectives: [
      'Membedakan variabel lokal dan global.',
      'Memahami block scope dan shadowing.',
      'Menggunakan variabel static untuk menyimpan nilai antar-pemanggilan.',
    ],
    explanation: [
      'Variabel lokal dideklarasikan di dalam fungsi atau blok dan hanya bisa dipakai di sana. Variabel ini dibuat saat blok dijalankan dan dihapus saat blok selesai, sehingga nilainya tidak bertahan antar-pemanggilan fungsi.',
      'Variabel global dideklarasikan di luar semua fungsi dan bisa diakses dari mana saja dalam berkas. Variabel global hidup selama program berjalan. Karena bisa diubah dari banyak tempat, penggunaannya sebaiknya dibatasi agar program tetap mudah dipahami.',
      'Variabel lokal yang dideklarasikan dengan static punya scope lokal tetapi lifetime seumur program. Ia hanya diinisialisasi sekali dan nilainya tetap tersimpan ketika fungsi dipanggil lagi.',
    ],
    sectionsTitle: 'Ringkasan',
    sections: [
      {
        title: 'Lokal',
        body: 'Scope: di dalam blok tempat dideklarasikan. Lifetime: sampai blok selesai.',
      },
      {
        title: 'Global',
        body: 'Scope: seluruh berkas setelah deklarasi. Lifetime: selama program berjalan.',
      },
      {
        title: 'Static lokal',
        body: 'Scope: di dalam fungsinya. Lifetime: selama program berjalan, dan hanya diinisialisasi sekali.',
      },
      {
        title: 'Shadowing',
        body: 'Variabel lokal dengan nama yang sama dengan variabel di scope luar akan menyembunyikan yang luar di dalam blok tersebut. Hindari karena membingungkan.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int totalPanggilan = 0;

void hitung(void) {
    static int dipanggil = 0;
    int lokal = 0;

    dipanggil++;
    lokal++;
    totalPanggilan++;

    printf("static=%d lokal=%d global=%d\n", dipanggil, lokal, totalPanggilan);
}

int main(void) {
    hitung();
    hitung();
    hitung();
    return 0;
}`,
      explanation: [
        'lokal dibuat ulang dan bernilai 0 setiap hitung dipanggil, sehingga setelah lokal++ nilainya selalu 1.',
        'dipanggil bertipe static: inisialisasi = 0 hanya terjadi sekali, lalu nilainya terus bertambah di setiap pemanggilan.',
        'totalPanggilan adalah variabel global yang bisa diakses dan diubah dari fungsi mana pun.',
      ],
      output: 'static=1 lokal=1 global=1\nstatic=2 lokal=1 global=2\nstatic=3 lokal=1 global=3',
    },
    notes: [
      'Gunakan variabel lokal sebisa mungkin. Variabel global yang diubah dari banyak fungsi membuat bug sulit dilacak.',
      'Variabel lokal biasa tidak otomatis bernilai 0. Selalu inisialisasi sendiri.',
    ],
  },
  {
    id: 'f1-debugging',
    description:
      'Debugging adalah proses menemukan, memahami, dan memperbaiki kesalahan pada program.',
    objectives: [
      'Membedakan kesalahan sintaks, runtime, dan logika.',
      'Memakai compiler warning dan printf untuk melacak bug.',
      'Menerapkan langkah sistematis saat mencari penyebab bug.',
    ],
    explanation: [
      'Ada tiga jenis kesalahan. Kesalahan sintaks terdeteksi compiler sebelum program jalan. Kesalahan runtime terjadi saat program berjalan, misalnya pembagian dengan nol. Kesalahan logika adalah yang paling sulit: program berjalan tanpa error tetapi hasilnya salah karena rumus atau alur yang keliru.',
      'Langkah pertama adalah membaca pesan compiler dengan teliti dan mengaktifkan peringatan dengan opsi -Wall -Wextra. Banyak bug tertangkap pada tahap ini. Untuk bug logika, cetak nilai variabel di titik-titik penting dengan printf agar kamu bisa melihat di mana nilainya mulai menyimpang dari yang diharapkan.',
      'Bekerjalah secara sistematis: reproduksi bug dengan input yang pasti, persempit lokasinya, buat hipotesis, lalu uji. Ubah satu hal pada satu waktu. Jika tersedia, debugger seperti gdb atau lldb memungkinkan kamu menjalankan program baris demi baris.',
    ],
    sectionsTitle: 'Jenis Kesalahan',
    sections: [
      {
        title: 'Sintaks',
        body: 'Penulisan tidak sesuai aturan bahasa, misalnya lupa titik koma. Compiler menolak mengompilasi dan menunjuk barisnya.',
      },
      {
        title: 'Runtime',
        body: 'Program berhenti atau crash saat berjalan, misalnya membagi dengan nol atau mengakses memori yang tidak seharusnya.',
      },
      {
        title: 'Logika',
        body: 'Program berjalan normal tetapi hasilnya salah. Contoh: pembagian integer yang membuang desimal saat menghitung rata-rata.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int main(void) {
    int total = 17;
    int jumlah = 4;

    double salah = total / jumlah;
    double benar = (double)total / jumlah;

    printf("DEBUG total=%d jumlah=%d\n", total, jumlah);
    printf("Rata-rata salah : %.2f\n", salah);
    printf("Rata-rata benar : %.2f\n", benar);
    return 0;
}`,
      explanation: [
        'Baris DEBUG mencetak nilai input sehingga kita yakin datanya benar sebelum mencurigai rumusnya.',
        'total / jumlah adalah pembagian dua int sehingga hasilnya 4 (desimal dibuang), baru kemudian disimpan ke double.',
        '(double)total mengubah total menjadi double lebih dulu (type casting), sehingga pembagian menghasilkan 4.25.',
      ],
      output:
        'DEBUG total=17 jumlah=4\nRata-rata salah : 4.00\nRata-rata benar : 4.25',
    },
    notes: [
      'Kompilasi dengan: clang -Wall -Wextra -g program.c -o program. Opsi -g menambahkan informasi untuk debugger.',
      'Hapus printf debugging setelah bug ditemukan agar output program tetap bersih.',
      'Menjelaskan masalahmu dengan lantang kepada orang lain (rubber duck debugging) sering membantu menemukan kesalahan.',
    ],
  },
  {
    id: 'f1-error-handling',
    description:
      'Program yang baik tidak mengasumsikan semuanya akan berhasil: ia memeriksa kegagalan dan meresponsnya dengan benar.',
    objectives: [
      'Memeriksa nilai balik fungsi untuk mendeteksi kegagalan.',
      'Menampilkan pesan error yang jelas dengan perror dan stderr.',
      'Memakai exit code untuk memberi tahu hasil program.',
    ],
    explanation: [
      'Berbeda dengan beberapa bahasa lain, C tidak memiliki exception. Kegagalan dilaporkan lewat nilai balik fungsi: misalnya fopen mengembalikan NULL jika berkas gagal dibuka, dan scanf mengembalikan jumlah nilai yang berhasil dibaca. Kewajiban memeriksanya ada pada programmer.',
      'Saat terjadi kegagalan, tampilkan pesan yang menjelaskan masalahnya. perror menampilkan pesan kustom diikuti penjelasan error dari sistem, dan fprintf(stderr, ...) menulis ke aliran error terpisah dari output normal sehingga tidak tercampur saat output dialihkan ke berkas.',
      'Fungsi main mengembalikan exit code: 0 berarti sukses dan nilai lain berarti gagal. Exit code dipakai oleh shell dan program lain untuk mengetahui apakah program berhasil.',
    ],
    sectionsTitle: 'Strategi Penanganan Error',
    sections: [
      {
        title: 'Validasi input',
        body: 'Jangan percaya input pengguna. Periksa nilai balik scanf dan pastikan nilai berada dalam rentang yang diharapkan sebelum dipakai.',
      },
      {
        title: 'Periksa nilai balik',
        body: 'Fungsi seperti fopen dan malloc mengembalikan NULL jika gagal. Selalu periksa sebelum memakai hasilnya.',
      },
      {
        title: 'Gagal dengan jelas',
        body: 'Tampilkan pesan yang menjelaskan apa yang gagal dan keluar dengan exit code bukan nol, daripada melanjutkan dengan data yang salah.',
      },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int main(void) {
    FILE *berkas = fopen("data-tidak-ada.txt", "r");

    if (berkas == NULL) {
        perror("Gagal membuka berkas");
        return 1;
    }

    printf("Berkas berhasil dibuka.\n");
    fclose(berkas);
    return 0;
}`,
      explanation: [
        'fopen mencoba membuka berkas. FILE * adalah penanda (handle) ke berkas; tanda * dijelaskan di materi Pointer pada Fase 3.',
        'Jika berkas tidak ada, fopen mengembalikan NULL sehingga blok if dijalankan.',
        'perror mencetak pesan kita, diikuti alasan dari sistem (misalnya berkas tidak ditemukan).',
        'return 1 menandakan program berakhir karena gagal. Jika berhasil, berkas ditutup dengan fclose.',
      ],
      output: 'Gagal membuka berkas: No such file or directory',
    },
    notes: [
      'Output di atas muncul jika berkas data-tidak-ada.txt memang tidak ada di folder kerja.',
      'Selalu tutup berkas dengan fclose setelah selesai dipakai.',
      'Menangani error sejak awal jauh lebih murah daripada mencari bug yang disebabkan data tidak valid.',
    ],
  },
];