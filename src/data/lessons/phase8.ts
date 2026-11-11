import type { LessonContent } from '@/types/content';

export const phase8Lessons: LessonContent[] = [
  {
    id: 'f8-backend-engineering',
    description:
      'Backend engineering membangun bagian server yang mengelola data, aturan bisnis, dan API yang dipakai aplikasi lain.',
    objectives: [
      'Menjelaskan peran backend dan komponen utamanya.',
      'Merancang endpoint REST dengan metode dan kode status yang tepat.',
      'Mengenal topik lanjutan: database, otentikasi, dan sistem terdistribusi.',
    ],
    explanation: [
      'Backend menerima permintaan dari klien (aplikasi mobile atau web), menjalankan aturan bisnis, menyimpan atau mengambil data dari database, lalu mengirim respons. Aplikasi seperti Kodein memakai Firebase sebagai backend siap pakai, sedangkan di jalur ini kamu belajar membangun layanan sendiri.',
      'API REST memodelkan data sebagai sumber daya dengan alamat (misalnya /tugas) dan memakai metode HTTP sesuai artinya: GET membaca, POST membuat, PUT atau PATCH mengubah, DELETE menghapus. Kode status memberi tahu hasil: 200 berhasil, 201 berhasil dibuat, 400 permintaan salah, 401 belum terautentikasi, 404 tidak ditemukan, dan 500 galat server.',
      'Jalur ini luas: bahasa (Go, Java, Python, JavaScript atau TypeScript), database relasional (SQL) dan non-relasional, desain API, keamanan, hingga sistem terdistribusi. Contoh di bawah membuat API kecil dengan server dan klien dalam satu program memakai pustaka standar Python.',
    ],
    sectionsTitle: 'Peta Belajar',
    sections: [
      { title: 'Bahasa', body: 'Go (sederhana dan cepat untuk layanan jaringan), Java (ekosistem enterprise yang besar), Python (cepat untuk membangun prototipe), dan JavaScript atau TypeScript (satu bahasa untuk server dan klien).' },
      { title: 'Database', body: 'SQL dan desain tabel, indeks, transaksi, dan normalisasi. Kenali juga database dokumen dan key-value untuk kebutuhan tertentu.' },
      { title: 'API', body: 'Desain REST, validasi input, penanganan error yang konsisten, otentikasi dan otorisasi, serta dokumentasi API.' },
      { title: 'Sistem terdistribusi', body: 'Replikasi, antrean pesan, idempotensi, konsistensi, dan cara menangani kegagalan sebagian pada layanan yang berjalan di banyak mesin.' },
    ],
    codeExample: {
      language: 'Python',
      code: String.raw`import json
import threading
import urllib.request
from http.server import BaseHTTPRequestHandler, HTTPServer

tugas = [{"id": 1, "judul": "Belajar API", "selesai": False}]


class Penangan(BaseHTTPRequestHandler):
    def _kirim(self, kode, data):
        isi = json.dumps(data).encode()
        self.send_response(kode)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(isi)))
        self.end_headers()
        self.wfile.write(isi)

    def do_GET(self):
        if self.path == "/tugas":
            self._kirim(200, tugas)
        else:
            self._kirim(404, {"galat": "tidak ditemukan"})

    def do_POST(self):
        if self.path != "/tugas":
            self._kirim(404, {"galat": "tidak ditemukan"})
            return
        panjang = int(self.headers.get("Content-Length", 0))
        data = json.loads(self.rfile.read(panjang))
        baru = {"id": len(tugas) + 1, "judul": data["judul"], "selesai": False}
        tugas.append(baru)
        self._kirim(201, baru)

    def log_message(self, format, *args):
        pass


server = HTTPServer(("127.0.0.1", 0), Penangan)
alamat = f"http://127.0.0.1:{server.server_address[1]}"
thread = threading.Thread(target=server.serve_forever)
thread.start()

permintaan = urllib.request.Request(
    alamat + "/tugas",
    data=json.dumps({"judul": "Pelajari database"}).encode(),
    headers={"Content-Type": "application/json"},
    method="POST",
)
with urllib.request.urlopen(permintaan) as respons:
    print("POST /tugas ->", respons.status, json.loads(respons.read()))

with urllib.request.urlopen(alamat + "/tugas") as respons:
    print("GET /tugas  ->", respons.status, len(json.loads(respons.read())), "tugas")

server.shutdown()
thread.join()
server.server_close()`,
      explanation: [
        'do_GET membaca daftar tugas dan do_POST membuat tugas baru. Keduanya mengirim JSON dan kode status yang sesuai (200 dan 201).',
        'Jalur yang tidak dikenal mendapat 404, dan metode tidak dikenal membuat server menolak permintaan.',
        'Klien (urllib) mengirim POST untuk membuat tugas, lalu GET untuk membaca daftar yang kini berisi dua tugas.',
        'Aplikasi nyata menambahkan validasi input, otentikasi, dan database di balik penangan ini.',
      ],
      output:
        "POST /tugas -> 201 {'id': 2, 'judul': 'Pelajari database', 'selesai': False}\nGET /tugas  -> 200 2 tugas",
    },
    notes: [
      'Data pada contoh disimpan di memori dan hilang saat program berhenti. Mini proyek jalur ini memakai SQLite.',
      'Server bawaan Python hanya untuk belajar. Gunakan kerangka kerja yang matang untuk produksi.',
    ],
  },
  {
    id: 'f8-data-science-dan-ai',
    description:
      'Data science dan AI memakai statistika dan komputasi untuk menemukan pola pada data dan membangun model yang dapat memprediksi.',
    objectives: [
      'Menjelaskan alur kerja data science dari data hingga model.',
      'Menghitung regresi linear sederhana dari nol.',
      'Mengenal topik pendukung: statistika, aljabar linear, machine learning, dan deep learning.',
    ],
    explanation: [
      'Alur kerja umum: kumpulkan data, bersihkan, jelajahi dengan statistik dan visualisasi, bangun model, lalu evaluasi dan perbaiki. Model machine learning belajar dari contoh: ia menyesuaikan parameternya agar prediksinya mendekati data yang diketahui, lalu dipakai untuk memprediksi data baru.',
      'Model paling sederhana adalah regresi linear: mencari garis y = a + bx yang paling mendekati data. Kemiringan b dihitung dari kovarians x dan y dibagi varians x, dan titik potong a dari rata-rata. Memahami rumus ini memberi dasar untuk model yang lebih kompleks, karena prinsip dasarnya sama: meminimalkan selisih prediksi dan kenyataan.',
      'Jalur ini bertumpu pada Python (dengan pustaka seperti NumPy, pandas, dan scikit-learn), SQL untuk mengambil data, dan R untuk statistik. Fondasi matematikanya adalah statistika, probabilitas, dan aljabar linear. Deep learning memakai jaringan saraf berlapis untuk data kompleks seperti gambar dan teks.',
    ],
    sectionsTitle: 'Peta Belajar',
    sections: [
      { title: 'Bahasa dan alat', body: 'Python (NumPy, pandas, scikit-learn), SQL untuk data, dan R untuk analisis statistik.' },
      { title: 'Matematika', body: 'Statistika dan probabilitas untuk memahami data dan ketidakpastian. Aljabar linear (vektor dan matriks) menjadi bahasa model machine learning.' },
      { title: 'Machine learning', body: 'Regresi, klasifikasi, pengelompokan, serta evaluasi model dan bahaya overfitting.' },
      { title: 'Deep learning', body: 'Jaringan saraf, pelatihan dengan gradient descent, dan arsitektur untuk gambar dan teks.' },
    ],
    codeExample: {
      language: 'Python',
      code: String.raw`jam_belajar = [1, 2, 3, 4, 5]
nilai = [52, 58, 66, 71, 78]

n = len(jam_belajar)
rata_x = sum(jam_belajar) / n
rata_y = sum(nilai) / n

kovarians = sum((x - rata_x) * (y - rata_y) for x, y in zip(jam_belajar, nilai))
varians_x = sum((x - rata_x) ** 2 for x in jam_belajar)

kemiringan = kovarians / varians_x
titik_potong = rata_y - kemiringan * rata_x


def prediksi(jam):
    return titik_potong + kemiringan * jam


print(f"Model: nilai = {titik_potong:.1f} + {kemiringan:.1f} x jam")
print(f"Prediksi 6 jam: {prediksi(6):.1f}")`,
      explanation: [
        'Data berisi jam belajar dan nilai ujian lima siswa. Rata-rata jam belajar 3 dan rata-rata nilai 65.',
        'Kovarians 65 dibagi varians 10 menghasilkan kemiringan 6,5: setiap tambahan satu jam belajar menambah nilai sekitar 6,5.',
        'Titik potong = 65 - 6,5 x 3 = 45,5. Untuk 6 jam, prediksi nilai = 45,5 + 6,5 x 6 = 84,5.',
        'Model ini dihitung tanpa pustaka apa pun sehingga rumusnya terlihat jelas.',
      ],
      output: 'Model: nilai = 45.5 + 6.5 x jam\nPrediksi 6 jam: 84.5',
    },
    notes: [
      'Data contoh sengaja kecil dan hampir linear. Data nyata berisik dan butuh evaluasi pada data yang tidak dipakai untuk melatih.',
      'Korelasi bukan berarti sebab-akibat. Jangan menyimpulkan lebih dari yang didukung data.',
    ],
  },
  {
    id: 'f8-embedded-systems',
    description:
      'Embedded systems adalah komputer kecil yang tertanam di perangkat untuk mengendalikan perangkat keras, seperti lampu, sensor, dan motor.',
    objectives: [
      'Menjelaskan mikrokontroler, firmware, dan RTOS secara garis besar.',
      'Mengendalikan register perangkat keras dengan operasi bit.',
      'Merancang perilaku perangkat sebagai state machine.',
    ],
    explanation: [
      'Mikrokontroler adalah chip yang menggabungkan CPU, memori, dan pin masukan/keluaran (GPIO) dalam satu kemasan kecil. Program yang berjalan di dalamnya disebut firmware. Sumber dayanya sangat terbatas (kilobyte memori), sehingga efisiensi dan pemahaman perangkat keras sangat penting.',
      'Perangkat keras dikendalikan lewat register: alamat memori khusus yang tiap bitnya mengendalikan satu pin atau fitur. Menyalakan lampu berarti mengatur satu bit di register keluaran, itulah mengapa operasi bitwise (Fase 5) penting. Variabel yang berubah di luar kendali program (seperti register perangkat) ditandai volatile.',
      'Perilaku perangkat paling aman dirancang sebagai state machine: perangkat berada pada satu keadaan, dan keadaan berubah berdasarkan kejadian atau waktu. RTOS (Real-Time Operating System) menjadwalkan beberapa tugas dengan batas waktu yang pasti. Jalur ini memakai C, C++, dan Rust. Contoh di bawah menyimulasikan lampu lalu lintas di komputermu, tanpa perangkat keras.',
    ],
    sectionsTitle: 'Peta Belajar',
    sections: [
      { title: 'Bahasa', body: 'C dan C++ (paling umum), serta Rust (keamanan memori tanpa pengumpul sampah).' },
      { title: 'Perangkat keras', body: 'Mikrokontroler (misalnya papan Arduino, ESP32, atau STM32), GPIO, timer, interupsi, dan protokol seperti UART, I2C, dan SPI.' },
      { title: 'Firmware dan RTOS', body: 'Menulis kode yang hemat memori dan responsif, state machine, dan penjadwalan tugas dengan RTOS seperti FreeRTOS.' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdint.h>
#include <stdio.h>

#define LED_MERAH   (1u << 0)
#define LED_KUNING  (1u << 1)
#define LED_HIJAU   (1u << 2)

enum Keadaan { MERAH, HIJAU, KUNING };

static volatile uint8_t gpio_keluaran = 0;

static void tulis_led(uint8_t mask) {
    gpio_keluaran = mask;
}

static void cetak_register(const char *nama) {
    printf("%-7s GPIO = ", nama);
    for (int i = 2; i >= 0; i--) {
        putchar(((gpio_keluaran >> i) & 1u) ? '1' : '0');
    }
    printf("\n");
}

int main(void) {
    enum Keadaan keadaan = MERAH;

    for (int langkah = 0; langkah < 4; langkah++) {
        switch (keadaan) {
            case MERAH:
                tulis_led(LED_MERAH);
                cetak_register("MERAH");
                keadaan = HIJAU;
                break;
            case HIJAU:
                tulis_led(LED_HIJAU);
                cetak_register("HIJAU");
                keadaan = KUNING;
                break;
            case KUNING:
                tulis_led(LED_KUNING);
                cetak_register("KUNING");
                keadaan = MERAH;
                break;
        }
    }
    return 0;
}`,
      explanation: [
        'gpio_keluaran menyimulasikan register keluaran: bit 0 untuk lampu merah, bit 1 kuning, dan bit 2 hijau.',
        'volatile memberi tahu compiler bahwa nilai register dapat berubah di luar kendali program, sehingga tidak boleh dioptimalkan sembarangan.',
        'switch menjalankan state machine: MERAH menuju HIJAU, HIJAU menuju KUNING, dan KUNING kembali ke MERAH.',
        'Setiap langkah mencetak isi register sebagai tiga bit (bit 2, 1, 0).',
      ],
      output:
        'MERAH   GPIO = 001\nHIJAU   GPIO = 100\nKUNING  GPIO = 010\nMERAH   GPIO = 001',
    },
    notes: [
      'Pada perangkat keras nyata, tulis_led akan menulis ke alamat register mikrokontroler, dan perpindahan keadaan dipicu timer.',
      'Mini proyek jalur ini mengembangkan simulasi serupa. Jika punya papan Arduino atau ESP32, kamu bisa mencobanya pada perangkat sungguhan.',
    ],
  },
  {
    id: 'f8-game-development',
    description:
      'Game development memadukan pemrograman, fisika, grafik, dan desain untuk membuat permainan interaktif yang berjalan secara real-time.',
    objectives: [
      'Menjelaskan game loop dan peran delta time.',
      'Menyimulasikan fisika sederhana dengan langkah waktu tetap.',
      'Mengenal topik pendukung: game engine, fisika, dan rendering.',
    ],
    explanation: [
      'Inti setiap game adalah game loop: berulang kali memproses masukan, memperbarui keadaan dunia game, lalu menggambar hasilnya ke layar, puluhan kali per detik. Pembaruan keadaan memakai delta time, yaitu selisih waktu antar-frame, agar kecepatan permainan tidak bergantung pada kecepatan perangkat.',
      'Untuk fisika, pendekatan umum adalah langkah waktu tetap: dunia selalu diperbarui dengan selisih waktu yang sama sehingga simulasi stabil dan dapat diulang. Kecepatan bertambah oleh percepatan (gravitasi), dan posisi bertambah oleh kecepatan. Saat objek menabrak lantai, kecepatannya dibalik dan dikurangi sehingga memantul.',
      'Jalur ini memakai C++ dan C# serta game engine seperti Unity, Godot, atau Unreal yang menyediakan grafik, fisika, suara, dan antarmuka editor. Memahami simulasi dasar seperti contoh di bawah membantu kamu memakai engine dengan lebih sadar.',
    ],
    sectionsTitle: 'Peta Belajar',
    sections: [
      { title: 'Bahasa', body: 'C++ (performa dan engine besar) dan C# (Unity). Godot memakai GDScript yang mirip Python.' },
      { title: 'Game engine', body: 'Unity, Godot, dan Unreal Engine: menyediakan scene, komponen, fisika, suara, dan alat build.' },
      { title: 'Fisika dan matematika', body: 'Vektor, gerak, tabrakan, dan integrasi numerik untuk simulasi yang stabil.' },
      { title: 'Rendering', body: 'Sprite dan model 3D, shader, kamera, dan pencahayaan untuk menampilkan dunia game.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <iomanip>
#include <iostream>

struct Bola {
    double y;
    double kecepatan;
};

int main() {
    const double gravitasi = -9.8;
    const double dt = 0.1;
    Bola bola{1.0, 0.0};

    std::cout << std::fixed << std::setprecision(2);
    for (int frame = 1; frame <= 5; frame++) {
        bola.kecepatan += gravitasi * dt;
        bola.y += bola.kecepatan * dt;

        if (bola.y < 0.0) {
            bola.y = 0.0;
            bola.kecepatan = -bola.kecepatan * 0.5;
        }

        std::cout << "Frame " << frame << ": y = " << bola.y
                  << ", kecepatan = " << bola.kecepatan << "\n";
    }
    return 0;
}`,
      explanation: [
        'Setiap putaran loop adalah satu frame dengan langkah waktu tetap dt = 0,1 detik.',
        'Kecepatan berkurang oleh gravitasi, lalu posisi diperbarui memakai kecepatan baru.',
        'Pada frame ke-5 bola menembus lantai (y < 0). Posisinya dikembalikan ke 0 dan kecepatannya dibalik lalu dikurangi setengah, sehingga bola memantul ke atas.',
        'Game nyata mengganti cetak teks dengan menggambar di layar, dan membaca masukan pemain di setiap frame.',
      ],
      output:
        'Frame 1: y = 0.90, kecepatan = -0.98\nFrame 2: y = 0.71, kecepatan = -1.96\nFrame 3: y = 0.41, kecepatan = -2.94\nFrame 4: y = 0.02, kecepatan = -3.92\nFrame 5: y = 0.00, kecepatan = 2.45',
    },
    notes: [
      'Kompilasi dengan: clang++ -std=c++17 program.cpp -o program',
      'Jangan memakai waktu frame yang berubah-ubah langsung untuk fisika. Langkah waktu tetap membuat simulasi stabil.',
    ],
  },
  {
    id: 'f8-cybersecurity',
    description:
      'Cybersecurity melindungi sistem, jaringan, dan data dari penyalahgunaan, dengan fondasi kriptografi, jaringan, dan praktik pemrograman yang aman.',
    objectives: [
      'Menjelaskan tujuan keamanan: kerahasiaan, integritas, dan ketersediaan.',
      'Menyimpan kata sandi dengan hash berkunci dan salt.',
      'Menyebutkan batas etika dan hukum dalam belajar keamanan.',
    ],
    explanation: [
      'Keamanan informasi bertumpu pada tiga tujuan: kerahasiaan (hanya pihak berhak yang bisa membaca), integritas (data tidak diubah tanpa izin), dan ketersediaan (sistem bisa dipakai saat dibutuhkan). Hampir semua kontrol keamanan melayani salah satu dari ketiganya. Prinsip penting: hak akses seminimal mungkin (least privilege) dan pertahanan berlapis.',
      'Kriptografi adalah alat utamanya. Kata sandi tidak boleh disimpan sebagai teks asli. Simpan hasil hash yang lambat dan berkunci (seperti PBKDF2, bcrypt, atau Argon2) beserta salt acak yang unik untuk setiap pengguna, sehingga dua pengguna dengan sandi sama punya hash berbeda dan tabel hash siap pakai tidak berguna. Bandingkan hash dengan fungsi waktu-konstan agar tidak membocorkan informasi lewat selisih waktu.',
      'Jalur ini memerlukan fondasi jaringan, sistem operasi, dan pemrograman (Python, C, C++, Go, Assembly) serta kriptografi. Aturan etika sangat penting: hanya uji sistem milikmu sendiri atau yang kamu punya izin tertulis untuk diuji. Akses tanpa izin adalah tindakan melanggar hukum, apa pun niatnya.',
    ],
    sectionsTitle: 'Peta Belajar',
    sections: [
      { title: 'Fondasi', body: 'Jaringan (TCP/IP, DNS, HTTP, TLS), sistem operasi, dan hak akses. Pemahaman cara kerja sistem adalah dasar memahami kelemahannya.' },
      { title: 'Kriptografi', body: 'Hash, enkripsi simetris dan asimetris, tanda tangan digital, dan sertifikat. Pakai pustaka matang, jangan membuat algoritma sendiri.' },
      { title: 'Pemrograman aman', body: 'Validasi input, hindari buffer overflow dan injeksi, kelola rahasia dengan benar, dan perbarui dependensi.' },
      { title: 'Etika dan hukum', body: 'Hanya menguji sistem yang kamu miliki atau yang kamu punya izin tertulis untuk diuji. Laporkan kerentanan secara bertanggung jawab.' },
    ],
    codeExample: {
      language: 'Python',
      code: String.raw`import hashlib
import hmac
import os


def buat_hash(kata_sandi, garam=None, putaran=200_000):
    garam = garam or os.urandom(16)
    hasil = hashlib.pbkdf2_hmac("sha256", kata_sandi.encode(), garam, putaran)
    return garam, hasil


def verifikasi(kata_sandi, garam, hash_tersimpan, putaran=200_000):
    _, hasil = buat_hash(kata_sandi, garam, putaran)
    return hmac.compare_digest(hasil, hash_tersimpan)


garam, tersimpan = buat_hash("rahasia-kuat-123")

print("Panjang garam:", len(garam), "byte")
print("Panjang hash :", len(tersimpan), "byte")
print("Sandi benar  :", verifikasi("rahasia-kuat-123", garam, tersimpan))
print("Sandi salah  :", verifikasi("rahasia-salah", garam, tersimpan))

garam_lain, hash_lain = buat_hash("rahasia-kuat-123")
print("Hash sama untuk sandi sama?", hash_lain == tersimpan)`,
      explanation: [
        'buat_hash membuat salt acak 16 byte dan menurunkan hash 32 byte dengan PBKDF2 sebanyak 200.000 putaran, yang sengaja lambat.',
        'verifikasi menghitung ulang hash dari sandi yang dimasukkan dengan salt yang sama, lalu membandingkannya dengan hmac.compare_digest (waktu-konstan).',
        'Karena salt acak, sandi yang sama menghasilkan hash berbeda di setiap pembuatan sehingga baris terakhir bernilai False.',
        'Simpan salt bersama hash di database. Salt tidak rahasia, tetapi harus unik.',
      ],
      output:
        'Panjang garam: 16 byte\nPanjang hash : 32 byte\nSandi benar  : True\nSandi salah  : False\nHash sama untuk sandi sama? False',
    },
    notes: [
      'Jangan pernah menyimpan kata sandi sebagai teks asli, atau memakai hash cepat seperti MD5 atau SHA-256 polos untuk sandi.',
      'Untuk produksi, gunakan pustaka yang khusus untuk hash sandi (misalnya Argon2 atau bcrypt) dan ikuti rekomendasi parameter terbaru.',
    ],
  },
  {
    id: 'f8-compiler-dan-systems-programming',
    description:
      'Compiler dan systems programming mempelajari bagaimana bahasa pemrograman diterjemahkan menjadi program, serta bagaimana perangkat lunak tingkat rendah dibangun.',
    objectives: [
      'Menjelaskan tahapan lexer, parser, AST, dan eksekusi.',
      'Membuat tokenizer dan parser rekursif sederhana.',
      'Mengenal topik pendukung: compiler, interpreter, dan bahasa sistem.',
    ],
    explanation: [
      'Compiler atau interpreter bekerja dalam beberapa tahap. Lexer memecah teks menjadi token (angka, operator, kata kunci). Parser menyusun token menjadi AST (Abstract Syntax Tree), pohon yang menggambarkan struktur program dan urutan prioritas operasinya. Tahap akhir bisa berupa interpreter yang langsung mengevaluasi pohon, atau compiler yang menghasilkan kode mesin atau bytecode.',
      'Parser rekursif memakai satu fungsi untuk setiap aturan tata bahasa. Aturan ekspresi: ekspresi = suku (("+" | "-") suku)*, suku = faktor (("*" | "/") faktor)*, dan faktor = angka atau "(" ekspresi ")". Karena suku dipanggil dari ekspresi, perkalian otomatis lebih tinggi prioritasnya daripada penjumlahan, dan tanda kurung mengubah urutan.',
      'Jalur ini memakai C, C++, Rust, dan Assembly, serta mencakup struktur data dan algoritma yang kuat. Contoh di bawah adalah kalkulator mini lengkap: lexer, parser rekursif yang menghasilkan AST, dan evaluator, semuanya dalam satu berkas Python.',
    ],
    sectionsTitle: 'Peta Belajar',
    sections: [
      { title: 'Lexer', body: 'Mengubah teks menjadi token. Biasanya memakai ekspresi reguler atau pembaca karakter manual.' },
      { title: 'Parser dan AST', body: 'Mengubah token menjadi pohon sintaks sesuai tata bahasa. Parser rekursif turun adalah titik awal yang paling mudah.' },
      { title: 'Interpreter dan compiler', body: 'Interpreter mengevaluasi AST langsung. Compiler menerjemahkannya menjadi bytecode atau kode mesin, lalu mengoptimalkannya.' },
      { title: 'Bahasa sistem', body: 'C, C++, dan Rust untuk membangun compiler, sistem operasi, dan perangkat lunak yang butuh kendali penuh atas memori.' },
    ],
    codeExample: {
      language: 'Python',
      code: String.raw`import re

POLA = re.compile(r"\s*(?:(\d+\.?\d*)|(.))")


def tokenisasi(teks):
    token = []
    for angka, simbol in POLA.findall(teks):
        if angka:
            token.append(("ANGKA", float(angka)))
        elif simbol.strip():
            token.append(("OP", simbol))
    return token


class Penguraian:
    def __init__(self, token):
        self.token = token
        self.posisi = 0

    def intip(self):
        return self.token[self.posisi] if self.posisi < len(self.token) else None

    def ambil(self):
        t = self.intip()
        self.posisi += 1
        return t

    def ekspresi(self):
        simpul = self.suku()
        while self.intip() in (("OP", "+"), ("OP", "-")):
            operator = self.ambil()[1]
            simpul = (operator, simpul, self.suku())
        return simpul

    def suku(self):
        simpul = self.faktor()
        while self.intip() in (("OP", "*"), ("OP", "/")):
            operator = self.ambil()[1]
            simpul = (operator, simpul, self.faktor())
        return simpul

    def faktor(self):
        t = self.ambil()
        if t is None:
            raise SyntaxError("Ekspresi berakhir terlalu cepat")
        if t[0] == "ANGKA":
            return t[1]
        if t == ("OP", "("):
            simpul = self.ekspresi()
            if self.ambil() != ("OP", ")"):
                raise SyntaxError("Kurung tutup tidak ditemukan")
            return simpul
        raise SyntaxError(f"Token tidak terduga: {t[1]}")


def evaluasi(simpul):
    if isinstance(simpul, float):
        return simpul
    operator, kiri, kanan = simpul
    a = evaluasi(kiri)
    b = evaluasi(kanan)
    if operator == "+":
        return a + b
    if operator == "-":
        return a - b
    if operator == "*":
        return a * b
    return a / b


token = tokenisasi("2 + 3 * (4 - 1)")
ast = Penguraian(token).ekspresi()

print("Jumlah token:", len(token))
print("AST   :", ast)
print("Hasil :", evaluasi(ast))`,
      explanation: [
        'tokenisasi memecah "2 + 3 * (4 - 1)" menjadi 9 token: angka, operator, dan kurung.',
        'Penguraian membangun AST berbentuk tuple bersarang. suku dipanggil dari ekspresi, sehingga perkalian berprioritas lebih tinggi daripada penjumlahan.',
        'Tanda kurung ditangani di faktor dengan memanggil ekspresi lagi, sehingga (4 - 1) dihitung lebih dulu.',
        'evaluasi menelusuri AST secara rekursif: 4 - 1 = 3, lalu 3 x 3 = 9, lalu 2 + 9 = 11.',
      ],
      output:
        "Jumlah token: 9\nAST   : ('+', 2.0, ('*', 3.0, ('-', 4.0, 1.0)))\nHasil : 11.0",
    },
    notes: [
      'Contoh ini belum menangani minus unary (misalnya -5) dan pembagian dengan nol. Menambahkannya adalah latihan yang bagus.',
      'Mini proyek jalur ini mengembangkan kalkulator ini menjadi compiler bytecode dengan mesin virtual berbasis stack.',
    ],
  },
];