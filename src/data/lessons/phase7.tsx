import type { LessonContent } from '@/types/content';

export const phase7Lessons: LessonContent[] = [
  {
    id: 'f7-procedural-programming',
    description:
      'Pemrograman prosedural menyusun program sebagai urutan langkah yang dikelompokkan ke dalam prosedur atau fungsi yang bekerja pada data.',
    objectives: [
      'Menjelaskan ciri paradigma prosedural.',
      'Memecah program menjadi fungsi dengan satu tugas yang jelas.',
      'Menyebutkan keterbatasan pendekatan prosedural pada program besar.',
    ],
    explanation: [
      'Pada paradigma prosedural, program adalah rangkaian instruksi yang dijalankan berurutan, dan instruksi yang berkaitan dikelompokkan menjadi prosedur atau fungsi. Data dan fungsi dipisah: data dikirim ke fungsi sebagai parameter, lalu fungsi mengembalikan hasil. C adalah contoh bahasa prosedural yang sudah kamu pakai sejak Fase 1.',
      'Kelebihannya sederhana dan dekat dengan cara komputer bekerja, sehingga mudah ditelusuri dan efisien. Memecah masalah menjadi fungsi (decomposition) membuat kode bisa dipakai ulang dan diuji sendiri-sendiri.',
      'Keterbatasannya muncul pada program besar. Jika banyak fungsi berbagi data yang sama (apalagi variabel global), perubahan struktur data memaksa banyak fungsi ikut diubah, dan sulit menjaga agar data tidak dipakai dengan cara yang salah. Paradigma lain seperti OOP dibuat untuk mengatasi masalah ini.',
    ],
    sectionsTitle: 'Gambaran Paradigma',
    sections: [
      { title: 'Ciri utama', body: 'Program dibagi menjadi fungsi. Data dikirim lewat parameter. Alur dikendalikan dengan urutan, percabangan, dan perulangan.' },
      { title: 'Kelebihan', body: 'Sederhana, efisien, mudah ditelusuri, dan cocok untuk program kecil sampai menengah serta pemrograman sistem.' },
      { title: 'Keterbatasan', body: 'Data dan fungsi terpisah sehingga sulit menjaga konsistensi saat program membesar. Data yang dibagi luas mudah rusak.' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

double hitungRataRata(const int nilai[], int jumlah) {
    int total = 0;
    for (int i = 0; i < jumlah; i++) {
        total += nilai[i];
    }
    return (double)total / jumlah;
}

char tentukanGrade(double rata) {
    if (rata >= 85) return 'A';
    if (rata >= 75) return 'B';
    if (rata >= 65) return 'C';
    return 'D';
}

void cetakLaporan(const char *nama, const int nilai[], int jumlah) {
    double rata = hitungRataRata(nilai, jumlah);
    printf("%s: rata-rata %.1f, grade %c\n", nama, rata, tentukanGrade(rata));
}

int main(void) {
    int nilaiRina[] = {90, 80, 85};
    int nilaiBudi[] = {70, 60, 65};

    cetakLaporan("Rina", nilaiRina, 3);
    cetakLaporan("Budi", nilaiBudi, 3);
    return 0;
}`,
      explanation: [
        'Setiap fungsi mengerjakan satu tugas: menghitung rata-rata, menentukan grade, dan mencetak laporan.',
        'Data (array nilai) dikirim sebagai parameter, bukan disimpan di variabel global.',
        'cetakLaporan menyusun dua fungsi lain, sehingga main tetap pendek dan mudah dibaca.',
      ],
      output: 'Rina: rata-rata 85.0, grade A\nBudi: rata-rata 65.0, grade C',
    },
    notes: [
      'Pemrograman prosedural bukan paradigma yang usang. Banyak sistem operasi dan kernel ditulis dengan gaya ini.',
      'Hindari variabel global yang diubah banyak fungsi. Kirim data lewat parameter.',
    ],
  },
  {
    id: 'f7-object-oriented-programming',
    description:
      'Pemrograman berorientasi objek (OOP) menggabungkan data dan perilaku ke dalam objek yang saling berinteraksi.',
    objectives: [
      'Menjelaskan konsep kelas, objek, dan empat pilar OOP.',
      'Membuat kelas sederhana yang menyatukan data dan fungsi.',
      'Menjelaskan manfaat OOP pada program besar.',
    ],
    explanation: [
      'OOP memodelkan program sebagai kumpulan objek. Setiap objek menyimpan keadaan (data) dan perilaku (fungsi) yang berkaitan, dan objek-objek berinteraksi lewat pemanggilan fungsi. Kelas adalah cetak biru, sedangkan objek adalah wujud nyata dari cetak biru itu.',
      'Empat pilar OOP: encapsulation (menyembunyikan data di balik antarmuka), abstraction (menonjolkan apa yang dilakukan, bukan bagaimana), inheritance (mewarisi sifat dari kelas lain), dan polymorphism (satu antarmuka, banyak perilaku). Masing-masing dibahas di materi berikutnya.',
      'Manfaat utamanya pada program besar: perubahan internal sebuah kelas tidak merusak kode yang memakainya, dan kode lebih mudah diatur karena tanggung jawabnya dikelompokkan per objek. Namun OOP bukan solusi untuk semua masalah, dan desain kelas yang buruk justru menambah kerumitan.',
    ],
    sectionsTitle: 'Empat Pilar OOP',
    sections: [
      { title: 'Encapsulation', body: 'Data disembunyikan (private) dan hanya bisa diubah lewat fungsi yang menjaga aturan.' },
      { title: 'Abstraction', body: 'Pemakai hanya perlu tahu apa yang bisa dilakukan objek, bukan caranya.' },
      { title: 'Inheritance', body: 'Kelas turunan mewarisi data dan fungsi dari kelas dasar, lalu menambah atau mengubahnya.' },
      { title: 'Polymorphism', body: 'Kode yang sama dapat bekerja dengan berbagai jenis objek yang memiliki antarmuka sama.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <iostream>
#include <string>

class Keranjang {
public:
    void tambah(const std::string &nama, int harga) {
        total_ += harga;
        jumlah_++;
        std::cout << "Ditambahkan: " << nama << " (" << harga << ")\n";
    }

    int total() const { return total_; }
    int jumlah() const { return jumlah_; }

private:
    int total_ = 0;
    int jumlah_ = 0;
};

int main() {
    Keranjang keranjang;
    keranjang.tambah("Buku", 50000);
    keranjang.tambah("Pensil", 5000);

    std::cout << "Jumlah barang: " << keranjang.jumlah() << "\n";
    std::cout << "Total: " << keranjang.total() << "\n";
    return 0;
}`,
      explanation: [
        'Kelas Keranjang menyatukan data (total_ dan jumlah_) dengan perilaku (tambah, total, jumlah).',
        'Data berada di bagian private, sehingga hanya bisa diubah lewat fungsi tambah.',
        'keranjang adalah sebuah objek: wujud nyata dari kelas Keranjang.',
      ],
      output: 'Ditambahkan: Buku (50000)\nDitambahkan: Pensil (5000)\nJumlah barang: 2\nTotal: 55000',
    },
    notes: [
      'Kompilasi dengan: clang++ -std=c++17 program.cpp -o program',
      'OOP adalah alat, bukan tujuan. Pilih paradigma yang paling cocok untuk masalahnya.',
    ],
  },
  {
    id: 'f7-functional-programming',
    description:
      'Pemrograman fungsional membangun program dari fungsi murni dan data yang tidak diubah, serta memperlakukan fungsi sebagai nilai.',
    objectives: [
      'Menjelaskan fungsi murni dan efek samping.',
      'Memakai map, filter, dan reduce.',
      'Menjelaskan fungsi sebagai nilai (higher-order function dan closure).',
    ],
    explanation: [
      'Fungsi murni selalu menghasilkan keluaran yang sama untuk masukan yang sama dan tidak mengubah apa pun di luar dirinya (tanpa efek samping). Fungsi seperti ini mudah diuji, mudah dipahami, dan aman dijalankan secara paralel karena tidak berbagi data yang berubah.',
      'Pada gaya fungsional, data tidak diubah di tempat (immutable). Kita membuat data baru dari data lama dengan transformasi: map (ubah setiap elemen), filter (pilih elemen yang memenuhi syarat), dan reduce (gabungkan menjadi satu nilai). Fungsi juga merupakan nilai: bisa dikirim sebagai argumen atau dikembalikan oleh fungsi lain (higher-order function).',
      'Closure adalah fungsi yang mengingat nilai dari lingkungan tempat ia dibuat, misalnya fungsi pengali yang mengingat faktornya. Python, JavaScript, dan C++ modern mendukung gaya ini, walaupun bukan bahasa fungsional murni.',
    ],
    sectionsTitle: 'Konsep Inti',
    sections: [
      { title: 'Fungsi murni', body: 'Keluaran hanya bergantung pada masukan, tanpa membaca atau mengubah keadaan luar.' },
      { title: 'Immutability', body: 'Tidak mengubah data yang ada. Buat salinan baru dengan perubahan yang diinginkan.' },
      { title: 'Higher-order function', body: 'Fungsi yang menerima atau mengembalikan fungsi lain, seperti map, filter, dan reduce.' },
    ],
    codeExample: {
      language: 'Python',
      code: String.raw`from functools import reduce

angka = [1, 2, 3, 4, 5, 6]

genap = list(filter(lambda n: n % 2 == 0, angka))
kuadrat = list(map(lambda n: n * n, genap))
total = reduce(lambda a, b: a + b, kuadrat, 0)


def buat_pengali(faktor):
    return lambda n: n * faktor


kali_tiga = buat_pengali(3)

print("Genap:", genap)
print("Kuadrat:", kuadrat)
print("Total:", total)
print("Kali tiga:", kali_tiga(7))
print("Data asli tidak berubah:", angka)`,
      explanation: [
        'filter memilih bilangan genap, map mengkuadratkannya, dan reduce menjumlahkan hasilnya: 4 + 16 + 36 = 56.',
        'buat_pengali mengembalikan fungsi baru yang mengingat faktor (closure).',
        'Daftar angka asli tidak berubah. Setiap langkah menghasilkan daftar baru.',
      ],
      output:
        'Genap: [2, 4, 6]\nKuadrat: [4, 16, 36]\nTotal: 56\nKali tiga: 21\nData asli tidak berubah: [1, 2, 3, 4, 5, 6]',
    },
    notes: [
      'Jalankan dengan: python program.py',
      'Di Python, list comprehension sering lebih mudah dibaca daripada map dan filter dengan lambda.',
    ],
  },
  {
    id: 'f7-class-dan-object',
    description:
      'Kelas adalah cetak biru yang mendefinisikan data dan perilaku, sedangkan objek adalah instansi nyata dari kelas tersebut.',
    objectives: [
      'Mendefinisikan kelas dengan atribut dan metode.',
      'Membuat beberapa objek dari satu kelas.',
      'Membedakan objek sebagai referensi dari objek sebagai nilai.',
    ],
    explanation: [
      'Kelas mendefinisikan atribut (data) dan metode (fungsi) yang dimiliki semua objeknya. Setiap objek yang dibuat dengan new memiliki salinan atributnya sendiri, sehingga mengubah satu objek tidak memengaruhi objek lain dari kelas yang sama.',
      'Di Java, variabel objek menyimpan referensi (alamat) ke objek di heap, bukan objek itu sendiri. Operator == pada objek membandingkan referensi, yaitu apakah keduanya menunjuk ke objek yang sama, bukan apakah isinya sama. Untuk membandingkan isi, gunakan metode equals.',
      'Kata kunci this merujuk ke objek yang sedang menjalankan metode. Atribut yang tidak boleh diubah setelah dibuat sebaiknya dideklarasikan final.',
    ],
    sectionsTitle: 'Bagian Kelas',
    sections: [
      { title: 'Atribut', body: 'Data milik objek, misalnya nama dan semester. Biasanya dibuat private.' },
      { title: 'Metode', body: 'Fungsi milik objek yang bekerja pada atributnya, misalnya naikSemester.' },
      { title: 'Objek', body: 'Hasil new Mahasiswa(...). Setiap objek punya data sendiri.' },
    ],
    codeExample: {
      language: 'Java',
      code: String.raw`public class Main {
    public static void main(String[] args) {
        Mahasiswa a = new Mahasiswa("Rina", 3);
        Mahasiswa b = new Mahasiswa("Budi", 5);

        a.naikSemester();

        System.out.println(a.deskripsi());
        System.out.println(b.deskripsi());
        System.out.println("Objek sama? " + (a == b));
    }
}

class Mahasiswa {
    private final String nama;
    private int semester;

    Mahasiswa(String nama, int semester) {
        this.nama = nama;
        this.semester = semester;
    }

    void naikSemester() {
        semester++;
    }

    String deskripsi() {
        return nama + " (semester " + semester + ")";
    }
}`,
      explanation: [
        'Mahasiswa mendefinisikan dua atribut dan dua metode. Konstruktor mengisi nilai awalnya.',
        'a dan b adalah dua objek terpisah. Memanggil a.naikSemester() hanya mengubah semester milik a.',
        'a == b membandingkan referensi dan hasilnya false karena keduanya objek yang berbeda.',
      ],
      output: 'Rina (semester 4)\nBudi (semester 5)\nObjek sama? false',
    },
    notes: [
      'Simpan kode di berkas Main.java, lalu jalankan dengan: java Main.java (JDK 11 atau lebih baru). Kelas pertama di berkas harus yang memiliki main.',
      'Di Termux, pasang JDK dengan: pkg install openjdk-17',
    ],
  },
  {
    id: 'f7-constructor-dan-destructor',
    description:
      'Konstruktor menyiapkan objek saat dibuat, dan destruktor membersihkannya saat objek tidak lagi dipakai.',
    objectives: [
      'Menulis konstruktor dengan daftar inisialisasi.',
      'Menjelaskan kapan destruktor dipanggil di C++.',
      'Menjelaskan prinsip RAII.',
    ],
    explanation: [
      'Konstruktor adalah fungsi khusus yang dipanggil otomatis saat objek dibuat, untuk memberi nilai awal dan menyiapkan sumber daya. Daftar inisialisasi (setelah tanda titik dua) adalah cara yang benar dan efisien untuk menginisialisasi anggota kelas.',
      'Destruktor (ditulis dengan awalan ~) dipanggil otomatis saat objek keluar dari scope atau dihapus. Pada objek lokal, destruktor dipanggil dalam urutan terbalik dari pembuatannya.',
      'Dari sinilah prinsip RAII (Resource Acquisition Is Initialization) lahir: sumber daya seperti memori, berkas, atau kunci diperoleh di konstruktor dan dilepas di destruktor. Dengan begitu pelepasan terjadi otomatis, bahkan jika terjadi error, sehingga kebocoran sumber daya jauh berkurang.',
    ],
    sectionsTitle: 'Ringkasan',
    sections: [
      { title: 'Konstruktor', body: 'Nama sama dengan kelas, tanpa tipe balik. Gunakan explicit untuk konstruktor satu parameter agar tidak terjadi konversi tidak sengaja.' },
      { title: 'Destruktor', body: 'Ditulis ~NamaKelas(). Dipanggil otomatis saat objek berakhir. Satu destruktor per kelas.' },
      { title: 'RAII', body: 'Ikat umur sumber daya dengan umur objek: perolehlah di konstruktor, lepaskan di destruktor.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <iostream>
#include <string>
#include <utility>

class Sumber {
public:
    explicit Sumber(std::string nama) : nama_(std::move(nama)) {
        std::cout << "Konstruktor: " << nama_ << " dibuat\n";
    }

    ~Sumber() {
        std::cout << "Destruktor: " << nama_ << " dibersihkan\n";
    }

private:
    std::string nama_;
};

int main() {
    std::cout << "Masuk main\n";
    {
        Sumber a("A");
        Sumber b("B");
        std::cout << "Di dalam blok\n";
    }
    std::cout << "Keluar blok\n";
    return 0;
}`,
      explanation: [
        'Konstruktor mencetak pesan saat objek dibuat, dan daftar inisialisasi mengisi nama_.',
        'Saat eksekusi keluar dari blok, objek lokal dihancurkan otomatis dengan urutan terbalik: b dulu, lalu a.',
        'Tidak ada pemanggilan manual. Pembersihan terjadi otomatis, itulah inti RAII.',
      ],
      output:
        'Masuk main\nKonstruktor: A dibuat\nKonstruktor: B dibuat\nDi dalam blok\nDestruktor: B dibersihkan\nDestruktor: A dibersihkan\nKeluar blok',
    },
    notes: [
      'Jika kelas mengelola memori dengan new, ingat aturan tiga atau lima: destruktor, konstruktor salin, dan operator penugasan harus dipikirkan bersama. Lebih baik pakai pointer pintar seperti std::unique_ptr.',
      'Java tidak memiliki destruktor deterministik. Sumber daya dibersihkan dengan try-with-resources.',
    ],
  },
  {
    id: 'f7-encapsulation',
    description:
      'Encapsulation menyembunyikan data di dalam objek dan hanya memperbolehkan perubahan lewat metode yang menjaga aturan.',
    objectives: [
      'Menjelaskan alasan atribut dibuat private.',
      'Menjaga invarian (aturan yang harus selalu benar) lewat validasi.',
      'Membedakan akses langsung ke atribut dan akses lewat metode.',
    ],
    explanation: [
      'Jika atribut dibuka langsung, siapa pun bisa mengisinya dengan nilai yang tidak masuk akal, misalnya saldo negatif. Dengan menjadikan atribut private dan menyediakan metode, kelas mengendalikan satu-satunya jalan untuk mengubahnya dan dapat menolak perubahan yang tidak valid.',
      'Aturan yang harus selalu benar disebut invarian. Pada rekening, invarian-nya: saldo tidak pernah negatif. Konstruktor dan setiap metode pengubah bertanggung jawab menjaganya, sehingga objek tidak pernah berada dalam keadaan tidak valid.',
      'Manfaat lain: detail internal bisa diganti tanpa mengubah kode pemakai. Pemakai hanya bergantung pada antarmuka publik (setor, tarik, getSaldo), bukan pada cara saldo disimpan.',
    ],
    sectionsTitle: 'Prinsip',
    sections: [
      { title: 'Atribut private', body: 'Data tidak bisa diakses dari luar kelas, hanya lewat metode.' },
      { title: 'Validasi di pintu masuk', body: 'Setiap metode pengubah memeriksa nilai sebelum menerimanya.' },
      { title: 'Antarmuka kecil', body: 'Buka seminimal mungkin. Jangan buat getter dan setter untuk semua atribut secara otomatis.' },
    ],
    codeExample: {
      language: 'Java',
      code: String.raw`public class Main {
    public static void main(String[] args) {
        Rekening rekening = new Rekening(100000);
        rekening.setor(50000);

        System.out.println("Saldo: " + rekening.getSaldo());
        System.out.println("Tarik 200000 berhasil? " + rekening.tarik(200000));
        System.out.println("Tarik 30000 berhasil? " + rekening.tarik(30000));
        System.out.println("Saldo akhir: " + rekening.getSaldo());
    }
}

class Rekening {
    private long saldo;

    Rekening(long saldoAwal) {
        if (saldoAwal < 0) {
            throw new IllegalArgumentException("Saldo awal tidak boleh negatif");
        }
        this.saldo = saldoAwal;
    }

    void setor(long jumlah) {
        if (jumlah <= 0) {
            throw new IllegalArgumentException("Jumlah setor harus positif");
        }
        saldo += jumlah;
    }

    boolean tarik(long jumlah) {
        if (jumlah <= 0 || jumlah > saldo) {
            return false;
        }
        saldo -= jumlah;
        return true;
    }

    long getSaldo() {
        return saldo;
    }
}`,
      explanation: [
        'saldo bersifat private, sehingga kode di Main tidak bisa menulis rekening.saldo secara langsung.',
        'tarik menolak penarikan yang melebihi saldo dan mengembalikan false, sehingga saldo tidak pernah negatif.',
        'Setelah setor 50000 saldo menjadi 150000. Tarik 30000 berhasil, sehingga saldo akhir 120000.',
      ],
      output:
        'Saldo: 150000\nTarik 200000 berhasil? false\nTarik 30000 berhasil? true\nSaldo akhir: 120000',
    },
    notes: [
      'Untuk uang pada aplikasi nyata, gunakan tipe desimal yang tepat dan satuan terkecil (misalnya sen), bukan bilangan desimal biner.',
      'Jalankan dengan: java Main.java',
    ],
  },
  {
    id: 'f7-inheritance',
    description:
      'Inheritance memungkinkan sebuah kelas mewarisi atribut dan metode dari kelas lain, lalu menambah atau mengubah perilakunya.',
    objectives: [
      'Membuat kelas turunan dengan extends dan memanggil konstruktor induk dengan super.',
      'Menimpa metode dengan override.',
      'Mengetahui kapan komposisi lebih baik daripada pewarisan.',
    ],
    explanation: [
      'Kelas turunan (subclass) mewarisi anggota kelas dasar (superclass) dan merupakan jenis khusus dari kelas dasar tersebut (hubungan "adalah sebuah"). Mobil adalah sebuah Kendaraan. Konstruktor turunan harus memanggil konstruktor induk lewat super(...) agar bagian induk terinisialisasi.',
      'Kelas turunan boleh menimpa (override) metode induk untuk mengubah perilaku, dan tetap dapat memanggil versi induk dengan super.metode(). Anotasi @Override membuat compiler memeriksa bahwa metode itu memang menimpa sesuatu.',
      'Pewarisan menciptakan ikatan yang kuat antara dua kelas. Pilih pewarisan hanya jika hubungan "adalah sebuah" benar-benar berlaku. Jika yang dibutuhkan hanyalah memakai kemampuan kelas lain (hubungan "memiliki sebuah"), gunakan komposisi: simpan objek itu sebagai atribut.',
    ],
    sectionsTitle: 'Panduan',
    sections: [
      { title: 'Adalah sebuah (is-a)', body: 'Gunakan pewarisan: Mobil adalah sebuah Kendaraan.' },
      { title: 'Memiliki sebuah (has-a)', body: 'Gunakan komposisi: Mobil memiliki sebuah Mesin sebagai atribut.' },
      { title: 'Protected', body: 'Atribut protected dapat diakses kelas turunan. Pakai seperlunya agar enkapsulasi tidak bocor.' },
    ],
    codeExample: {
      language: 'Java',
      code: String.raw`public class Main {
    public static void main(String[] args) {
        Kendaraan umum = new Kendaraan("Kendaraan", 2);
        Mobil mobil = new Mobil("Sedan", 4);

        System.out.println(umum.info());
        System.out.println(mobil.info());
        System.out.println("Mobil adalah Kendaraan? " + (mobil instanceof Kendaraan));
    }
}

class Kendaraan {
    protected final String nama;
    protected final int roda;

    Kendaraan(String nama, int roda) {
        this.nama = nama;
        this.roda = roda;
    }

    String info() {
        return nama + " dengan " + roda + " roda";
    }
}

class Mobil extends Kendaraan {
    Mobil(String nama, int roda) {
        super(nama, roda);
    }

    @Override
    String info() {
        return super.info() + ", bisa membawa penumpang";
    }
}`,
      explanation: [
        'Mobil extends Kendaraan sehingga mewarisi atribut nama dan roda.',
        'super(nama, roda) memanggil konstruktor Kendaraan untuk mengisi bagian induk.',
        '@Override menimpa info(), dan super.info() memakai ulang perilaku induk sebelum menambah teks baru.',
        'instanceof memeriksa bahwa objek Mobil juga merupakan Kendaraan.',
      ],
      output:
        'Kendaraan dengan 2 roda\nSedan dengan 4 roda, bisa membawa penumpang\nMobil adalah Kendaraan? true',
    },
    notes: [
      'Hierarki pewarisan yang dalam sulit dipelihara. Dahulukan komposisi dan pertahankan hierarki tetap dangkal.',
      'Jalankan dengan: java Main.java',
    ],
  },
  {
    id: 'f7-polymorphism',
    description:
      'Polymorphism memungkinkan kode yang sama bekerja dengan berbagai jenis objek, dan perilaku yang dipilih ditentukan oleh jenis objek sebenarnya saat program berjalan.',
    objectives: [
      'Menjelaskan fungsi virtual dan dynamic dispatch di C++.',
      'Menyimpan berbagai objek turunan lewat pointer ke kelas dasar.',
      'Menjelaskan mengapa destruktor kelas dasar harus virtual.',
    ],
    explanation: [
      'Dengan polimorfisme, kita menulis kode terhadap antarmuka kelas dasar, lalu setiap kelas turunan menyediakan perilakunya sendiri. Di C++, ini dicapai dengan fungsi virtual: ketika fungsi virtual dipanggil lewat pointer atau referensi ke kelas dasar, yang dijalankan adalah versi milik jenis objek sebenarnya (dynamic dispatch).',
      'Fungsi virtual murni (= 0) membuat kelas menjadi abstrak: ia hanya mendefinisikan antarmuka dan tidak bisa dibuat langsung. Kelas turunan wajib mengimplementasikannya. Karena objek disimpan lewat pointer ke kelas dasar, destruktor kelas dasar harus virtual agar objek turunan dihancurkan dengan benar.',
      'Manfaatnya terlihat pada contoh di bawah: daftar bentuk dapat diproses dengan satu loop tanpa tahu jenis bentuknya. Menambah bentuk baru tidak mengubah loop tersebut.',
    ],
    sectionsTitle: 'Istilah',
    sections: [
      { title: 'virtual dan override', body: 'virtual menandai fungsi yang bisa ditimpa. override pada kelas turunan membuat compiler memeriksa penimpaan itu.' },
      { title: 'Kelas abstrak', body: 'Memiliki minimal satu fungsi virtual murni. Tidak bisa dibuat langsung dan berfungsi sebagai antarmuka.' },
      { title: 'Destruktor virtual', body: 'Wajib pada kelas dasar polimorfik agar delete lewat pointer dasar membersihkan objek turunan dengan benar.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <iostream>
#include <memory>
#include <vector>

class Bentuk {
public:
    virtual ~Bentuk() = default;
    virtual double luas() const = 0;
    virtual const char *nama() const = 0;
};

class Persegi : public Bentuk {
public:
    explicit Persegi(double sisi) : sisi_(sisi) {}
    double luas() const override { return sisi_ * sisi_; }
    const char *nama() const override { return "Persegi"; }

private:
    double sisi_;
};

class Lingkaran : public Bentuk {
public:
    explicit Lingkaran(double jariJari) : jariJari_(jariJari) {}
    double luas() const override { return 3.14159 * jariJari_ * jariJari_; }
    const char *nama() const override { return "Lingkaran"; }

private:
    double jariJari_;
};

int main() {
    std::vector<std::unique_ptr<Bentuk>> daftar;
    daftar.push_back(std::make_unique<Persegi>(4));
    daftar.push_back(std::make_unique<Lingkaran>(2));

    for (const auto &bentuk : daftar) {
        std::cout << bentuk->nama() << ": " << bentuk->luas() << "\n";
    }
    return 0;
}`,
      explanation: [
        'Bentuk adalah antarmuka abstrak dengan dua fungsi virtual murni dan destruktor virtual.',
        'Loop hanya memanggil nama() dan luas() lewat Bentuk. Versi yang dijalankan bergantung pada jenis objek sebenarnya.',
        'std::unique_ptr mengelola umur objek sehingga tidak perlu delete manual.',
        'Lingkaran: 3.14159 x 2 x 2 = 12.56636, ditampilkan dengan enam angka signifikan menjadi 12.5664.',
      ],
      output: 'Persegi: 16\nLingkaran: 12.5664',
    },
    notes: [
      'Kompilasi dengan: clang++ -std=c++17 program.cpp -o program',
      'Tanpa destruktor virtual, menghapus objek turunan lewat pointer dasar adalah perilaku tak terdefinisi.',
    ],
  },
  {
    id: 'f7-abstraction',
    description:
      'Abstraksi pada OOP mendefinisikan apa yang bisa dilakukan sebuah komponen lewat antarmuka, tanpa membuka cara melakukannya.',
    objectives: [
      'Mendefinisikan kelas abstrak dan metode abstrak di Python.',
      'Menulis kode yang bergantung pada abstraksi, bukan implementasi.',
      'Menambah implementasi baru tanpa mengubah kode pemakai.',
    ],
    explanation: [
      'Kelas abstrak mendefinisikan kontrak: metode apa yang wajib ada. Di Python, kelas abstrak dibuat dengan mewarisi ABC dan menandai metodenya dengan @abstractmethod. Kelas abstrak tidak bisa dibuat langsung, dan kelas turunan yang belum mengimplementasikan seluruh metode abstrak juga tidak bisa dibuat.',
      'Kode pemakai bergantung pada kontrak, bukan pada kelas konkret. Fungsi proses_transaksi pada contoh hanya tahu bahwa ia menerima sesuatu yang punya metode bayar. Cara pembayarannya (tunai atau kartu) bisa bertambah tanpa mengubah fungsi tersebut.',
      'Abstraksi yang baik kecil dan fokus. Antarmuka yang terlalu besar memaksa implementasinya mengerjakan hal yang tidak relevan, dan akan dibahas lagi pada prinsip Interface Segregation di materi SOLID.',
    ],
    sectionsTitle: 'Abstraksi di Python',
    sections: [
      { title: 'ABC dan abstractmethod', body: 'Kelas yang mewarisi ABC dengan metode @abstractmethod tidak bisa dibuat objeknya.' },
      { title: 'Kontrak', body: 'Turunan wajib mengimplementasikan semua metode abstrak sebelum dapat dibuat.' },
      { title: 'Bergantung pada abstraksi', body: 'Tulis fungsi yang menerima tipe abstrak, bukan tipe konkret.' },
    ],
    codeExample: {
      language: 'Python',
      code: String.raw`from abc import ABC, abstractmethod


class Pembayaran(ABC):
    @abstractmethod
    def bayar(self, jumlah):
        ...


class Tunai(Pembayaran):
    def bayar(self, jumlah):
        return f"Membayar {jumlah} dengan tunai"


class Kartu(Pembayaran):
    def __init__(self, nomor_akhir):
        self.nomor_akhir = nomor_akhir

    def bayar(self, jumlah):
        return f"Membayar {jumlah} dengan kartu berakhiran {self.nomor_akhir}"


def proses_transaksi(metode, jumlah):
    print(metode.bayar(jumlah))


proses_transaksi(Tunai(), 50000)
proses_transaksi(Kartu("4417"), 120000)

try:
    Pembayaran()
except TypeError:
    print("Pembayaran adalah kelas abstrak: tidak bisa dibuat langsung")`,
      explanation: [
        'Pembayaran mendefinisikan kontrak: setiap metode pembayaran wajib punya metode bayar.',
        'Tunai dan Kartu mengimplementasikan kontrak itu dengan caranya masing-masing.',
        'proses_transaksi hanya mengenal kontrak, sehingga metode pembayaran baru bisa ditambahkan tanpa mengubahnya.',
        'Membuat Pembayaran() langsung menimbulkan TypeError karena kelasnya abstrak.',
      ],
      output:
        'Membayar 50000 dengan tunai\nMembayar 120000 dengan kartu berakhiran 4417\nPembayaran adalah kelas abstrak: tidak bisa dibuat langsung',
    },
    notes: [
      'Jangan menyimpan nomor kartu lengkap di aplikasi nyata. Contoh ini hanya memakai empat digit terakhir.',
      'Python juga mendukung duck typing: kode berfungsi selama objeknya punya metode yang dibutuhkan, tanpa harus mewarisi ABC.',
    ],
  },
  {
    id: 'f7-solid-principles',
    description:
      'SOLID adalah lima prinsip desain berorientasi objek yang membuat kode lebih mudah diubah, diuji, dan diperluas.',
    objectives: [
      'Menyebutkan dan menjelaskan lima prinsip SOLID.',
      'Menerapkan Open/Closed dengan menambah perilaku lewat kelas baru.',
      'Menerapkan Dependency Inversion dengan menyuntikkan dependensi.',
    ],
    explanation: [
      'SOLID adalah singkatan dari lima prinsip: Single Responsibility (satu kelas, satu alasan untuk berubah), Open/Closed (terbuka untuk perluasan, tertutup untuk perubahan), Liskov Substitution (objek turunan harus bisa menggantikan objek dasar tanpa merusak program), Interface Segregation (antarmuka kecil dan spesifik), dan Dependency Inversion (bergantung pada abstraksi, bukan implementasi).',
      'Pada contoh berikut, aturan diskon yang berbeda dibuat sebagai kelas terpisah dari satu kontrak Diskon. Kelas Kasir tidak berubah ketika diskon baru ditambahkan (Open/Closed), dan Kasir menerima objek diskon dari luar tanpa membuatnya sendiri (Dependency Inversion).',
      'SOLID adalah pedoman, bukan hukum. Menerapkannya secara berlebihan pada program kecil hanya menambah kerumitan. Gunakan saat kamu merasakan kode sulit diubah atau diuji.',
    ],
    sectionsTitle: 'Lima Prinsip',
    sections: [
      { title: 'S - Single Responsibility', body: 'Satu kelas hanya punya satu tanggung jawab. Kelas yang mengurus perhitungan sebaiknya tidak sekaligus mengurus penyimpanan dan tampilan.' },
      { title: 'O - Open/Closed', body: 'Tambah perilaku baru dengan menulis kelas baru, bukan mengubah kelas yang sudah berjalan.' },
      { title: 'L - Liskov Substitution', body: 'Kelas turunan harus dapat dipakai di mana pun kelas dasarnya dipakai tanpa mengubah kebenaran program.' },
      { title: 'I - Interface Segregation', body: 'Lebih baik beberapa antarmuka kecil daripada satu antarmuka besar yang memaksa implementasi yang tidak perlu.' },
      { title: 'D - Dependency Inversion', body: 'Modul tingkat tinggi bergantung pada abstraksi. Dependensi disuntikkan dari luar.' },
    ],
    codeExample: {
      language: 'Python',
      code: String.raw`from abc import ABC, abstractmethod


class Diskon(ABC):
    @abstractmethod
    def terapkan(self, harga):
        ...


class TanpaDiskon(Diskon):
    def terapkan(self, harga):
        return harga


class DiskonPersen(Diskon):
    def __init__(self, persen):
        self.persen = persen

    def terapkan(self, harga):
        return harga - harga * self.persen // 100


class DiskonPotongan(Diskon):
    def __init__(self, potongan):
        self.potongan = potongan

    def terapkan(self, harga):
        return max(0, harga - self.potongan)


class Kasir:
    def __init__(self, diskon):
        self.diskon = diskon

    def total(self, harga):
        return self.diskon.terapkan(harga)


for diskon in [TanpaDiskon(), DiskonPersen(10), DiskonPotongan(15000)]:
    kasir = Kasir(diskon)
    print(f"{type(diskon).__name__}: {kasir.total(100000)}")`,
      explanation: [
        'Setiap jenis diskon adalah kelas tersendiri dengan satu tanggung jawab (Single Responsibility).',
        'Aturan diskon baru cukup ditambahkan sebagai kelas baru. Kasir tidak perlu diubah (Open/Closed).',
        'Kasir menerima objek diskon lewat konstruktor dan hanya mengenal kontrak Diskon (Dependency Inversion).',
        'Untuk harga 100000: tanpa diskon 100000, diskon 10 persen 90000, dan potongan 15000 menjadi 85000.',
      ],
      output: 'TanpaDiskon: 100000\nDiskonPersen: 90000\nDiskonPotongan: 85000',
    },
    notes: [
      'Tanda bahaya yang sering muncul: rantai if-else panjang berdasarkan jenis, atau kelas yang berubah karena banyak alasan berbeda.',
      'Jangan memecah kode ke dalam banyak kelas sebelum benar-benar ada kebutuhan.',
    ],
  },
  {
    id: 'f7-design-patterns',
    description:
      'Design pattern adalah solusi desain yang sudah teruji untuk masalah yang sering muncul, dan menjadi kosakata bersama bagi para programmer.',
    objectives: [
      'Menyebutkan pola umum dan masalah yang diselesaikannya.',
      'Menerapkan pola Observer.',
      'Memilih pola berdasarkan masalah, bukan sebaliknya.',
    ],
    explanation: [
      'Design pattern bukan kode siap pakai, melainkan pola penyelesaian masalah desain yang berulang. Mengenalnya membantu kamu membahas desain dengan singkat ("pakai Observer di sini") dan menghindari menemukan ulang solusi yang sudah matang.',
      'Pola dikelompokkan menjadi creational (cara membuat objek: Singleton, Factory), structural (cara menyusun objek: Adapter, Decorator), dan behavioral (cara objek berinteraksi: Strategy, Observer). Pola Strategy sudah kamu pakai pada materi SOLID melalui kelas diskon.',
      'Observer menghubungkan satu penerbit dengan banyak pelanggan: ketika keadaan berubah, semua pelanggan diberi tahu otomatis tanpa penerbit mengenal mereka. Pola ini mendasari sistem event, notifikasi, dan banyak kerangka kerja antarmuka.',
    ],
    sectionsTitle: 'Pola Umum',
    sections: [
      { title: 'Strategy', body: 'Membungkus algoritma yang bisa dipertukarkan di balik satu antarmuka, misalnya berbagai aturan diskon.' },
      { title: 'Observer', body: 'Penerbit memberi tahu semua pelanggan saat terjadi perubahan, tanpa mengenal detail pelanggan.' },
      { title: 'Factory', body: 'Memusatkan pembuatan objek sehingga pemakai tidak perlu tahu kelas konkretnya.' },
      { title: 'Decorator', body: 'Menambah perilaku ke objek dengan membungkusnya, tanpa mengubah kelasnya.' },
    ],
    codeExample: {
      language: 'Python',
      code: String.raw`class Penerbit:
    def __init__(self):
        self._pelanggan = []

    def berlangganan(self, fungsi):
        self._pelanggan.append(fungsi)

    def terbitkan(self, pesan):
        for fungsi in self._pelanggan:
            fungsi(pesan)


penerbit = Penerbit()
penerbit.berlangganan(lambda pesan: print("[Email]", pesan))
penerbit.berlangganan(lambda pesan: print("[Notifikasi]", pesan))

penerbit.terbitkan("Materi baru tersedia")
penerbit.terbitkan("Latihan baru tersedia")`,
      explanation: [
        'Penerbit menyimpan daftar fungsi pelanggan dan tidak tahu apa yang dilakukan masing-masing.',
        'terbitkan memanggil setiap pelanggan dengan pesan yang sama.',
        'Pelanggan baru bisa ditambahkan tanpa mengubah kelas Penerbit.',
      ],
      output:
        '[Email] Materi baru tersedia\n[Notifikasi] Materi baru tersedia\n[Email] Latihan baru tersedia\n[Notifikasi] Latihan baru tersedia',
    },
    notes: [
      'Pelajari masalahnya dulu, baru cari polanya. Memaksakan pola ke masalah yang tidak cocok menambah kerumitan.',
      'Singleton sering disalahgunakan sebagai variabel global terselubung. Pakai dengan hati-hati.',
    ],
  },
  {
    id: 'f7-clean-code',
    description:
      'Clean code adalah kode yang mudah dibaca, dipahami, dan diubah orang lain, termasuk dirimu di masa depan.',
    objectives: [
      'Memberi nama yang bermakna pada variabel dan fungsi.',
      'Menghilangkan angka ajaib dengan konstanta bernama.',
      'Menjaga fungsi tetap pendek dan fokus.',
    ],
    explanation: [
      'Kode dibaca jauh lebih sering daripada ditulis. Karena itu, kejelasan lebih penting daripada keringkasan yang membingungkan. Nama yang baik menjelaskan maksud tanpa perlu komentar: hitung_harga_akhir lebih jelas daripada hh, dan DISKON_MEMBER lebih jelas daripada angka 10 yang muncul tiba-tiba.',
      'Fungsi yang baik pendek, mengerjakan satu hal, dan memiliki sedikit parameter. Komentar menjelaskan alasan (mengapa), sedangkan kodenya sendiri harus menjelaskan caranya (apa dan bagaimana). Hindari duplikasi: jika logika yang sama ada di dua tempat, jadikan satu fungsi.',
      'Bandingkan versi buruk dan baik pada bagian di bawah. Keduanya menghitung hal yang sama, tetapi versi baik langsung bisa dipahami tanpa menebak maksud angka dan singkatannya.',
    ],
    sectionsTitle: 'Sebelum dan Sesudah',
    sections: [
      {
        title: 'Versi sulit dibaca',
        body: 'def h(a, b, c):\n    x = a * b\n    if c:\n        x = x - x * 10 // 100\n    return x',
      },
      {
        title: 'Versi bersih',
        body: 'Nama menjelaskan maksud (hitung_harga_akhir, subtotal, member), dan angka 10 menjadi konstanta DISKON_MEMBER yang punya nama.',
      },
      {
        title: 'Aturan praktis',
        body: 'Nama jelas, fungsi pendek, tanpa duplikasi, tanpa angka ajaib, komentar untuk alasan, dan format yang konsisten.',
      },
    ],
    codeExample: {
      language: 'Python',
      code: String.raw`DISKON_MEMBER = 10


def hitung_harga_akhir(harga, jumlah, member):
    subtotal = harga * jumlah
    diskon = DISKON_MEMBER if member else 0
    return subtotal - subtotal * diskon // 100


print("Member    :", hitung_harga_akhir(20000, 3, True))
print("Non-member:", hitung_harga_akhir(20000, 3, False))`,
      explanation: [
        'DISKON_MEMBER memberi nama pada angka 10, sehingga maksudnya jelas dan mudah diubah di satu tempat.',
        'Nama fungsi dan variabel menjelaskan maksudnya, sehingga tidak perlu komentar tambahan.',
        'Subtotal 20000 x 3 = 60000. Member mendapat potongan 10 persen (6000) menjadi 54000.',
      ],
      output: 'Member    : 54000\nNon-member: 60000',
    },
    notes: [
      'Gunakan pemformat otomatis (seperti Prettier atau black) agar gaya penulisan konsisten tanpa debat.',
      'Refactor sedikit-sedikit dan disertai tes, bukan menulis ulang semuanya sekaligus.',
    ],
  },
  {
    id: 'f7-clean-architecture',
    description:
      'Clean architecture memisahkan aturan bisnis dari detail teknis seperti database dan tampilan, dengan ketergantungan yang selalu mengarah ke dalam.',
    objectives: [
      'Menjelaskan lapisan entity, use case, dan adapter.',
      'Menerapkan aturan ketergantungan dengan antarmuka repositori.',
      'Mengganti implementasi penyimpanan tanpa mengubah aturan bisnis.',
    ],
    explanation: [
      'Idenya: aturan bisnis adalah bagian paling berharga dan paling stabil, sehingga tidak boleh bergantung pada hal yang sering berubah seperti framework, database, atau antarmuka pengguna. Lapisan dalam (entity dan use case) tidak mengenal lapisan luar. Ketergantungan hanya boleh mengarah ke dalam.',
      'Agar use case bisa menyimpan data tanpa mengenal database, ia bergantung pada antarmuka (misalnya RepositoriTugas) yang didefinisikan di lapisan dalam. Lapisan luar menyediakan implementasi konkretnya, seperti repositori memori atau SQLite. Ini penerapan Dependency Inversion dari SOLID.',
      'Hasilnya: aturan bisnis bisa diuji tanpa database dan penyimpanannya bisa diganti tanpa menyentuh logika. Biaya yang dibayar adalah lebih banyak kelas dan lapisan, sehingga pola ini paling berguna pada aplikasi yang akan tumbuh dan hidup lama.',
    ],
    sectionsTitle: 'Lapisan',
    sections: [
      { title: 'Entity', body: 'Objek dan aturan bisnis inti, misalnya Tugas. Tidak bergantung pada apa pun di luar.' },
      { title: 'Use case', body: 'Skenario aplikasi, misalnya TambahTugas. Memakai entity dan bergantung pada antarmuka repositori.' },
      { title: 'Adapter', body: 'Implementasi konkret: penyimpanan, API, dan tampilan. Bergantung pada lapisan dalam.' },
    ],
    codeExample: {
      language: 'Python',
      code: String.raw`from abc import ABC, abstractmethod
from dataclasses import dataclass


@dataclass
class Tugas:
    id: int
    judul: str
    selesai: bool = False


class RepositoriTugas(ABC):
    @abstractmethod
    def simpan(self, tugas):
        ...

    @abstractmethod
    def semua(self):
        ...


class RepositoriMemori(RepositoriTugas):
    def __init__(self):
        self._data = {}

    def simpan(self, tugas):
        self._data[tugas.id] = tugas

    def semua(self):
        return list(self._data.values())


class TambahTugas:
    def __init__(self, repositori):
        self.repositori = repositori
        self._id_berikut = 1

    def jalankan(self, judul):
        if not judul.strip():
            raise ValueError("Judul tidak boleh kosong")
        tugas = Tugas(self._id_berikut, judul.strip())
        self._id_berikut += 1
        self.repositori.simpan(tugas)
        return tugas


repositori = RepositoriMemori()
tambah = TambahTugas(repositori)
tambah.jalankan("Belajar rekursi")
tambah.jalankan("Kerjakan proyek")

for tugas in repositori.semua():
    print(tugas.id, tugas.judul, tugas.selesai)`,
      explanation: [
        'Tugas adalah entity: data dan aturan inti yang tidak bergantung pada hal lain.',
        'TambahTugas adalah use case. Ia hanya mengenal antarmuka RepositoriTugas, bukan cara penyimpanannya.',
        'RepositoriMemori adalah adapter. Mengganti ke SQLite cukup dengan membuat repositori baru, tanpa mengubah TambahTugas.',
      ],
      output: '1 Belajar rekursi False\n2 Kerjakan proyek False',
    },
    notes: [
      'Untuk aplikasi kecil dan singkat, arsitektur ini bisa berlebihan. Terapkan saat kerumitan memang menuntutnya.',
      'Use case mudah diuji hanya dengan repositori memori, tanpa database sungguhan.',
    ],
  },
  {
    id: 'f7-modular-programming',
    description:
      'Pemrograman modular membagi program menjadi modul-modul mandiri yang masing-masing punya tanggung jawab dan antarmuka yang jelas.',
    objectives: [
      'Menjelaskan kohesi tinggi dan keterkaitan (coupling) rendah.',
      'Membagi program menjadi modul dengan antarmuka yang jelas.',
      'Memakai pola titik masuk program di Python.',
    ],
    explanation: [
      'Modul adalah satuan kode yang berdiri sendiri: ia menyatukan hal yang berkaitan (kohesi tinggi) dan sesedikit mungkin bergantung pada modul lain (coupling rendah). Modul yang baik bisa dipahami, diuji, dan diganti tanpa membongkar bagian lain.',
      'Di C dan C++, modul biasanya berupa pasangan berkas: header (.h) yang berisi deklarasi (antarmuka publik) dan berkas implementasi (.c atau .cpp). Pemakai cukup menyertakan header. Header diberi include guard agar tidak dimuat dua kali. Di Python, setiap berkas .py adalah modul yang dimuat dengan import.',
      'Pola if __name__ == "__main__" memisahkan kode yang dijalankan sebagai program dari kode yang hanya dipakai sebagai pustaka. Saat berkas dijalankan langsung, __name__ bernilai "__main__", sedangkan saat diimpor nilainya nama modul.',
    ],
    sectionsTitle: 'Tata Letak Proyek',
    sections: [
      { title: 'C/C++', body: 'geometri.h (deklarasi dan include guard), geometri.c atau geometri.cpp (implementasi), dan main.c yang menyertakan geometri.h.' },
      { title: 'Python', body: 'geometri.py berisi fungsi, dan program.py memakai "from geometri import luas_persegi".' },
      { title: 'Prinsip', body: 'Kohesi tinggi: isi satu modul saling berkaitan. Coupling rendah: sedikit bergantung pada modul lain, dan hanya lewat antarmuka.' },
    ],
    codeExample: {
      language: 'Python',
      code: String.raw`# Bagian ini akan menjadi berkas geometri.py
def luas_persegi(sisi):
    return sisi * sisi


def keliling_persegi(sisi):
    return 4 * sisi


# Bagian ini adalah titik masuk program
def utama():
    print("Luas:", luas_persegi(5))
    print("Keliling:", keliling_persegi(5))
    print("Nama modul:", __name__)


if __name__ == "__main__":
    utama()`,
      explanation: [
        'Dua fungsi pertama adalah kode pustaka yang bisa dipakai modul lain lewat import.',
        'utama() adalah titik masuk program yang memakai fungsi pustaka.',
        'Karena berkas dijalankan langsung, __name__ bernilai "__main__" sehingga utama() dipanggil. Jika diimpor, utama() tidak berjalan otomatis.',
      ],
      output: 'Luas: 25\nKeliling: 20\nNama modul: __main__',
    },
    notes: [
      'Hindari ketergantungan melingkar antar-modul (A mengimpor B dan B mengimpor A). Itu tanda pembagian tanggung jawab perlu ditinjau ulang.',
      'Di C/C++ jangan lupa include guard (#ifndef/#define/#endif atau #pragma once) pada setiap header.',
    ],
  },
  {
    id: 'f7-unit-testing',
    description:
      'Unit test memeriksa bagian terkecil program secara otomatis sehingga perubahan kode bisa dilakukan dengan percaya diri.',
    objectives: [
      'Menulis unit test dengan unittest di Python.',
      'Menguji kasus normal, kasus batas, dan kasus error.',
      'Menjelaskan ciri tes yang baik.',
    ],
    explanation: [
      'Unit test adalah program kecil yang memanggil sebuah fungsi dengan masukan tertentu lalu memeriksa apakah hasilnya sesuai harapan. Tes dijalankan otomatis setiap kali kode berubah, sehingga kerusakan (regresi) terdeteksi cepat sebelum sampai ke pengguna.',
      'Tes yang baik cepat, mandiri (tidak bergantung pada tes lain atau layanan luar), dan mudah dibaca. Uji tiga jenis kasus: kasus normal, kasus batas (misalnya nol, kosong, atau nilai terbesar), dan kasus error (pastikan error yang benar dilemparkan). Beri nama tes sesuai perilaku yang diuji.',
      'Python menyediakan modul unittest. Kelas tes mewarisi unittest.TestCase, setiap metode yang namanya diawali test dijalankan sebagai satu tes, dan assertEqual atau assertRaises dipakai untuk memeriksa hasil. Jalankan dengan python program.py atau python -m unittest.',
    ],
    sectionsTitle: 'Ciri Tes yang Baik',
    sections: [
      { title: 'Cepat dan mandiri', body: 'Tidak bergantung pada urutan tes lain, jaringan, atau data yang berubah.' },
      { title: 'Satu perilaku per tes', body: 'Nama tes menjelaskan perilaku, dan saat gagal langsung jelas apa yang rusak.' },
      { title: 'Arrange-Act-Assert', body: 'Siapkan data, jalankan fungsi, lalu periksa hasilnya.' },
    ],
    codeExample: {
      language: 'Python',
      code: String.raw`import unittest


def bagi(a, b):
    if b == 0:
        raise ValueError("Pembagi tidak boleh nol")
    return a / b


class TesBagi(unittest.TestCase):
    def test_pembagian_biasa(self):
        self.assertEqual(bagi(10, 4), 2.5)

    def test_hasil_negatif(self):
        self.assertEqual(bagi(-9, 3), -3)

    def test_pembagi_nol(self):
        with self.assertRaises(ValueError):
            bagi(1, 0)


if __name__ == "__main__":
    unittest.main()`,
      explanation: [
        'Setiap metode yang namanya diawali test_ dijalankan sebagai satu tes.',
        'assertEqual memeriksa hasil, dan assertRaises memastikan error yang diharapkan benar-benar dilemparkan.',
        'Tiga tes mencakup kasus normal, hasil negatif, dan kasus error (pembagi nol).',
        'Setiap tes yang lolos ditandai dengan satu titik pada keluaran.',
      ],
      output: '...\n----------------------------------------------------------------------\nRan 3 tests in 0.000s\n\nOK',
    },
    notes: [
      'Lama waktu pada baris "Ran 3 tests" berbeda di setiap eksekusi.',
      'Tes yang gagal adalah hal yang baik: ia menemukan bug sebelum pengguna. Perbaiki kode, bukan melemahkan tesnya.',
    ],
  },
  {
    id: 'f7-integration-testing',
    description:
      'Integration test memeriksa apakah beberapa komponen bekerja benar ketika digabungkan, misalnya layanan dengan database.',
    objectives: [
      'Membedakan unit test dan integration test.',
      'Menguji layanan bersama repositori dengan database SQLite di memori.',
      'Menyiapkan dan membersihkan lingkungan tes dengan setUp dan tearDown.',
    ],
    explanation: [
      'Unit test memeriksa satu bagian secara terisolasi, sedangkan integration test memeriksa apakah beberapa bagian yang sudah benar bekerja sama dengan benar: urutan pemanggilan, format data, dan interaksi dengan sistem seperti database. Banyak bug hanya muncul di sambungan antar-komponen.',
      'Integration test lebih lambat dan lebih sulit dilacak penyebabnya daripada unit test, sehingga jumlahnya lebih sedikit. Strategi yang umum adalah banyak unit test, lebih sedikit integration test, dan sedikit sekali tes menyeluruh dari ujung ke ujung (piramida tes).',
      'SQLite di memori (":memory:") sangat cocok untuk integration test: database sungguhan tanpa berkas dan tanpa server. Setiap tes memakai database baru lewat setUp, dan tearDown menutupnya, sehingga tes saling terisolasi.',
    ],
    sectionsTitle: 'Piramida Tes',
    sections: [
      { title: 'Unit test', body: 'Banyak, sangat cepat, menguji satu fungsi atau kelas secara terisolasi.' },
      { title: 'Integration test', body: 'Lebih sedikit, menguji beberapa komponen bersama, misalnya layanan dan database.' },
      { title: 'End-to-end test', body: 'Paling sedikit dan paling lambat, menjalankan seluruh aplikasi seperti pengguna.' },
    ],
    codeExample: {
      language: 'Python',
      code: String.raw`import sqlite3
import unittest


class RepositoriPengguna:
    def __init__(self, koneksi):
        self.koneksi = koneksi
        self.koneksi.execute(
            "CREATE TABLE pengguna (id INTEGER PRIMARY KEY, nama TEXT NOT NULL UNIQUE)"
        )

    def tambah(self, nama):
        kursor = self.koneksi.execute("INSERT INTO pengguna (nama) VALUES (?)", (nama,))
        return kursor.lastrowid

    def cari(self, nama):
        return self.koneksi.execute(
            "SELECT id, nama FROM pengguna WHERE nama = ?", (nama,)
        ).fetchone()


class LayananPengguna:
    def __init__(self, repositori):
        self.repositori = repositori

    def daftar(self, nama):
        nama = nama.strip()
        if not nama:
            raise ValueError("Nama wajib diisi")
        if self.repositori.cari(nama) is not None:
            raise ValueError("Nama sudah dipakai")
        return self.repositori.tambah(nama)


class TesIntegrasi(unittest.TestCase):
    def setUp(self):
        self.koneksi = sqlite3.connect(":memory:")
        self.layanan = LayananPengguna(RepositoriPengguna(self.koneksi))

    def tearDown(self):
        self.koneksi.close()

    def test_daftar_lalu_cari(self):
        id_baru = self.layanan.daftar("Rina")
        self.assertEqual(self.layanan.repositori.cari("Rina"), (id_baru, "Rina"))

    def test_nama_ganda_ditolak(self):
        self.layanan.daftar("Budi")
        with self.assertRaises(ValueError):
            self.layanan.daftar("Budi")


if __name__ == "__main__":
    unittest.main()`,
      explanation: [
        'Tes memakai layanan dan repositori nyata bersama database SQLite sungguhan (di memori), bukan tiruan.',
        'setUp membuat database baru sebelum setiap tes, dan tearDown menutupnya, sehingga tes tidak saling memengaruhi.',
        'test_daftar_lalu_cari memeriksa alur lengkap dari layanan sampai data tersimpan dan terbaca kembali.',
        'test_nama_ganda_ditolak memeriksa aturan bisnis dan interaksi dengan database bekerja sama.',
      ],
      output: '..\n----------------------------------------------------------------------\nRan 2 tests in 0.001s\n\nOK',
    },
    notes: [
      'Waktu pada baris "Ran 2 tests" berbeda di setiap eksekusi.',
      'Jangan menguji terhadap database produksi. Gunakan database tes yang terpisah atau di memori.',
    ],
  },
  {
    id: 'f7-git-dan-github',
    description:
      'Git mencatat riwayat perubahan kode sehingga kamu bisa kembali ke versi sebelumnya dan bekerja paralel, sedangkan GitHub adalah layanan untuk berbagi dan berkolaborasi.',
    objectives: [
      'Menjelaskan konsep repositori, commit, dan branch.',
      'Menjalankan alur dasar: init, add, commit, branch, dan merge.',
      'Menjelaskan peran remote, push, pull, dan pull request di GitHub.',
    ],
    explanation: [
      'Git adalah sistem kontrol versi terdistribusi. Setiap commit adalah potret keadaan proyek lengkap dengan pesan yang menjelaskan perubahannya. Dengan riwayat itu, kamu bisa melihat siapa mengubah apa dan kapan, serta kembali ke kondisi sebelumnya jika ada yang rusak.',
      'Branch (cabang) memungkinkan bekerja pada fitur atau perbaikan secara terpisah tanpa mengganggu cabang utama. Setelah selesai, cabang digabung (merge) ke cabang utama. Alur kerja biasa: ubah berkas, git add untuk memilih perubahan, git commit untuk mencatatnya.',
      'GitHub menyimpan salinan repositori di server (remote bernama origin). git push mengirim commit ke sana, git pull mengambil perubahan terbaru, dan pull request adalah usulan penggabungan cabang yang bisa ditinjau tim sebelum digabung. Jangan pernah meng-commit rahasia seperti kata sandi, token, atau berkas .env.',
    ],
    sectionsTitle: 'Perintah Dasar',
    sections: [
      { title: 'Mencatat perubahan', body: 'git status melihat keadaan, git add <berkas> memilih perubahan, git commit -m "pesan" mencatatnya, dan git log --oneline melihat riwayat ringkas.' },
      { title: 'Cabang', body: 'git switch -c nama membuat dan pindah cabang, git switch main kembali, dan git merge nama menggabungkan cabang ke cabang aktif.' },
      { title: 'Berbagi di GitHub', body: 'git remote add origin <url>, git push -u origin main untuk mengirim, git pull untuk mengambil, lalu buka pull request di GitHub untuk ditinjau.' },
      { title: 'Berkas yang diabaikan', body: 'Tulis nama berkas di .gitignore (misalnya .env dan node_modules) agar tidak ikut tercatat.' },
    ],
    codeExample: {
      language: 'Shell',
      code: String.raw`git init -b main kodein-latihan
cd kodein-latihan

git config user.name "Nama Kamu"
git config user.email "kamu@example.com"

echo "# Latihan Git" > README.md
git add README.md
git commit -m "Tambah README"

git switch -c fitur-tambah
echo "Baris baru" >> README.md
git commit -am "Tambah baris baru"

git switch main
git merge fitur-tambah
git log --oneline`,
      explanation: [
        'git init -b main membuat repositori baru dengan cabang utama bernama main.',
        'Commit pertama mencatat README.md. Setelah itu cabang fitur-tambah dibuat dan satu commit lagi ditambahkan di sana.',
        'Setelah kembali ke main, git merge menggabungkan cabang fitur. Karena main belum berubah, penggabungan berupa fast-forward.',
        'git log --oneline menampilkan dua commit, dengan yang terbaru di atas.',
      ],
      output: 'a1b2c3d Tambah baris baru\ne4f5a6b Tambah README',
    },
    notes: [
      'Kode commit (a1b2c3d dan e4f5a6b) hanyalah contoh. Nilainya berbeda di setiap repositori.',
      'Pasang Git di Termux dengan: pkg install git. Untuk GitHub dari Termux, gunakan token akses pribadi atau kunci SSH.',
    ],
  },
  {
    id: 'f7-build-systems',
    description:
      'Build system mengotomatiskan proses mengubah source code menjadi program, dengan hanya membangun ulang bagian yang berubah.',
    objectives: [
      'Menjelaskan target, dependensi, dan aturan pembangunan.',
      'Menjelaskan mengapa build system membangun ulang hanya yang perlu.',
      'Mengenal Make, CMake, dan alat build lain.',
    ],
    explanation: [
      'Pada proyek dengan banyak berkas, mengompilasi semuanya secara manual setiap kali ada perubahan lambat dan rawan salah. Build system menggambarkan hubungan antar-berkas sebagai graf dependensi: program bergantung pada berkas objek, dan berkas objek bergantung pada source code-nya.',
      'Saat dijalankan, build system membandingkan waktu modifikasi: sebuah target hanya dibangun ulang jika ada dependensi yang lebih baru darinya. Jika hanya satu berkas source yang berubah, hanya berkas objek itu dan program akhir yang dibangun ulang. Itulah build inkremental.',
      'Alat yang umum: Make (aturan dalam Makefile, sederhana dan ada di mana-mana), CMake (menghasilkan berkas build untuk berbagai platform), Gradle dan Maven untuk Java, serta pip, npm, atau bun untuk ekosistem masing-masing. Contoh berikut menyimulasikan logika inti build system dengan graf dependensi dan waktu modifikasi.',
    ],
    sectionsTitle: 'Alat Build Umum',
    sections: [
      { title: 'Make', body: 'Aturan di Makefile berbentuk "target: dependensi", diikuti perintah pada baris berikutnya yang diawali karakter TAB. Contoh: program: main.o hitung.o, lalu perintah clang -o program main.o hitung.o.' },
      { title: 'CMake', body: 'Menulis deskripsi proyek di CMakeLists.txt, lalu menghasilkan berkas build (Makefile atau Ninja) untuk platform yang dipakai.' },
      { title: 'Ekosistem lain', body: 'Gradle atau Maven untuk Java, cargo untuk Rust, go build untuk Go, dan bun atau npm untuk JavaScript.' },
    ],
    codeExample: {
      language: 'Python',
      code: String.raw`dependensi = {
    "program": ["main.o", "hitung.o"],
    "main.o": ["main.c"],
    "hitung.o": ["hitung.c"],
}
waktu = {"main.c": 10, "hitung.c": 40, "main.o": 20, "hitung.o": 20, "program": 30}
jam = 50


def bangun(target):
    global jam
    kedaluwarsa = False
    for dep in dependensi.get(target, []):
        bangun(dep)
        if waktu[dep] > waktu[target]:
            kedaluwarsa = True

    if kedaluwarsa:
        jam += 1
        waktu[target] = jam
        print("Membangun", target)
    elif target in dependensi:
        print("Lewati", target, "(sudah terbaru)")


bangun("program")`,
      explanation: [
        'dependensi adalah graf: program bergantung pada dua berkas objek, dan setiap berkas objek bergantung pada source code-nya.',
        'waktu menyimpan waktu modifikasi. hitung.c (40) lebih baru daripada hitung.o (20), sehingga hitung.o perlu dibangun ulang.',
        'main.o sudah lebih baru daripada main.c, sehingga dilewati. Karena hitung.o berubah, program juga harus dibangun ulang.',
        'Hanya bagian yang terdampak yang dibangun ulang. Itulah build inkremental.',
      ],
      output: 'Lewati main.o (sudah terbaru)\nMembangun hitung.o\nMembangun program',
    },
    notes: [
      'Simulasi ini hanya menggambarkan logikanya. Make dan CMake juga menangani banyak hal lain, seperti aturan pola dan eksekusi paralel.',
      'Perintah di Makefile harus diawali karakter TAB, bukan spasi.',
    ],
  },
  {
    id: 'f7-dependency-management',
    description:
      'Manajemen dependensi mengatur pustaka pihak ketiga yang dipakai proyek, termasuk versinya, sehingga hasil build dapat diulang dan aman.',
    objectives: [
      'Menjelaskan semantic versioning (MAJOR.MINOR.PATCH).',
      'Menjelaskan rentang versi dan lockfile.',
      'Menjelaskan dependensi transitif dan risikonya.',
    ],
    explanation: [
      'Hampir semua proyek memakai pustaka orang lain. Package manager (seperti bun, npm, pip, atau cargo) mengunduh pustaka itu beserta pustaka yang dibutuhkannya (dependensi transitif). Proyek mencatat dependensinya di berkas manifes, misalnya package.json atau requirements.txt.',
      'Semantic versioning memberi arti pada nomor versi MAJOR.MINOR.PATCH. PATCH naik untuk perbaikan bug, MINOR untuk fitur baru yang kompatibel, dan MAJOR untuk perubahan yang bisa merusak kompatibilitas. Rentang seperti ^1.2.0 berarti "versi 1.2.0 sampai sebelum 2.0.0": menerima perbaikan dan fitur baru, tetapi tidak perubahan besar.',
      'Lockfile (misalnya bun.lock yang ada di proyek Kodein) mengunci versi persis yang terpasang, sehingga semua orang dan server build mendapat hasil yang sama. Jadikan lockfile bagian dari repositori. Perbarui dependensi secara berkala, terutama untuk perbaikan keamanan, dan hanya pasang pustaka yang benar-benar dibutuhkan, karena setiap dependensi menambah risiko.',
    ],
    sectionsTitle: 'Versi dan Risiko',
    sections: [
      { title: 'Semantic versioning', body: 'MAJOR.MINOR.PATCH. Perubahan MAJOR boleh merusak kompatibilitas, MINOR menambah fitur kompatibel, PATCH memperbaiki bug.' },
      { title: 'Lockfile', body: 'Mengunci versi persis (termasuk dependensi transitif) agar build dapat diulang dan sama di semua mesin.' },
      { title: 'Risiko', body: 'Dependensi yang tidak terawat atau berbahaya dapat memengaruhi seluruh proyek. Periksa reputasi, perbarui berkala, dan minimalkan jumlahnya.' },
    ],
    codeExample: {
      language: 'Python',
      code: String.raw`def parse(versi):
    return tuple(int(bagian) for bagian in versi.split("."))


def memenuhi(versi, minimum, batas_mayor):
    return parse(minimum) <= parse(versi) < parse(batas_mayor)


tersedia = ["1.1.9", "1.2.0", "1.4.3", "2.0.0", "2.1.0"]
cocok = [v for v in tersedia if memenuhi(v, "1.2.0", "2.0.0")]

print("Versi tersedia:", tersedia)
print("Cocok dengan ^1.2.0:", cocok)
print("Dipilih:", max(cocok, key=parse))`,
      explanation: [
        'parse mengubah "1.4.3" menjadi tuple (1, 4, 3) sehingga bisa dibandingkan secara numerik, bukan sebagai teks.',
        'Rentang ^1.2.0 berarti lebih dari atau sama dengan 1.2.0 dan kurang dari 2.0.0, sehingga 1.1.9, 2.0.0, dan 2.1.0 ditolak.',
        'Dari versi yang cocok, dipilih yang tertinggi, yaitu 1.4.3. Package manager nyata bekerja dengan prinsip serupa.',
      ],
      output:
        "Versi tersedia: ['1.1.9', '1.2.0', '1.4.3', '2.0.0', '2.1.0']\nCocok dengan ^1.2.0: ['1.2.0', '1.4.3']\nDipilih: 1.4.3",
    },
    notes: [
      'Membandingkan versi sebagai teks menyesatkan: "1.10.0" lebih kecil daripada "1.9.0" secara alfabet. Selalu bandingkan sebagai angka.',
      'Di proyek Kodein, tambah dependensi dengan: bunx expo install <paket>, yang memilih versi yang cocok dengan Expo.',
    ],
  },
];