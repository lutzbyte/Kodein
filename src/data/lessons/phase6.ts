import type { LessonContent } from '@/types/content';

export const phase6Lessons: LessonContent[] = [
  {
    id: 'f6-computer-architecture',
    description:
      'Arsitektur komputer menjelaskan bagaimana CPU, memori, dan perangkat I/O bekerja sama menjalankan program.',
    objectives: [
      'Menjelaskan arsitektur von Neumann dan siklus fetch-decode-execute.',
      'Menyebutkan hierarki memori dan alasannya.',
      'Menelusuri eksekusi program kecil pada CPU sederhana.',
    ],
    explanation: [
      'Arsitektur von Neumann menyimpan instruksi dan data dalam memori yang sama. CPU berulang kali menjalankan siklus: fetch (ambil instruksi dari alamat yang ditunjuk program counter), decode (artikan instruksinya), dan execute (jalankan, lalu perbarui program counter). Semua program, dari kalkulator sampai game, bekerja dengan siklus ini.',
      'Memori dibuat berjenjang: register (paling cepat, sangat kecil), cache (kecil dan cepat), RAM (lebih besar dan lebih lambat), lalu penyimpanan seperti flash (sangat besar tetapi paling lambat). Hierarki ini bekerja karena program cenderung memakai data yang sama atau berdekatan berulang kali (locality).',
      'Perangkat I/O terhubung lewat bus dan dikendalikan oleh driver. Contoh di bawah menyimulasikan CPU kecil dengan satu akumulator sehingga kamu bisa melihat siklus eksekusi secara nyata.',
    ],
    sectionsTitle: 'Komponen Utama',
    sections: [
      { title: 'CPU', body: 'Menjalankan instruksi. Berisi register, unit aritmatika-logika (ALU), dan unit kendali.' },
      { title: 'Memori', body: 'Menyimpan instruksi dan data. Semakin dekat ke CPU semakin cepat dan semakin kecil.' },
      { title: 'I/O dan bus', body: 'Bus memindahkan data antara CPU, memori, dan perangkat seperti layar, penyimpanan, dan jaringan.' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

enum Op { HALT, LOAD, ADD, SUB };

int main(void) {
    int program[] = {LOAD, 10, ADD, 7, SUB, 3, HALT, 0};
    int pc = 0;
    int akumulator = 0;
    int jalan = 1;

    while (jalan) {
        int op = program[pc];
        int operand = program[pc + 1];
        printf("PC=%d op=%d operand=%d\n", pc, op, operand);
        pc += 2;

        switch (op) {
            case LOAD:
                akumulator = operand;
                break;
            case ADD:
                akumulator += operand;
                break;
            case SUB:
                akumulator -= operand;
                break;
            case HALT:
                jalan = 0;
                break;
        }
    }

    printf("Akumulator = %d\n", akumulator);
    return 0;
}`,
      explanation: [
        'program[] berisi pasangan (opcode, operand) yang disimpan di memori, sama seperti data biasa.',
        'pc (program counter) menunjuk instruksi berikutnya. Setiap putaran loop adalah satu siklus fetch-decode-execute.',
        'switch mewakili tahap decode dan execute, sedangkan akumulator berperan sebagai register.',
        'Hasilnya: 10 + 7 - 3 = 14, lalu HALT menghentikan CPU.',
      ],
      output:
        'PC=0 op=1 operand=10\nPC=2 op=2 operand=7\nPC=4 op=3 operand=3\nPC=6 op=0 operand=0\nAkumulator = 14',
    },
    notes: [
      'CPU nyata menjalankan banyak instruksi sekaligus lewat pipeline, tetapi hasilnya harus setara dengan eksekusi satu per satu.',
      'Akses memori jauh lebih lambat dari akses register, sehingga pola akses data sangat memengaruhi kecepatan program.',
    ],
  },
  {
    id: 'f6-cpu-architecture',
    description:
      'CPU tersusun dari unit kendali, ALU, register, dan cache, dan dibangun dari gerbang logika.',
    objectives: [
      'Menjelaskan fungsi ALU, register, unit kendali, dan cache.',
      'Menjelaskan konsep pipeline dan multi-core secara garis besar.',
      'Membangun penjumlah biner dari gerbang logika.',
    ],
    explanation: [
      'Unit kendali mengatur alur: mengambil dan menerjemahkan instruksi, lalu menyalakan jalur data yang tepat. ALU (Arithmetic Logic Unit) melakukan perhitungan dan operasi logika. Register menyimpan operand dan hasil sementara, sedangkan cache menyimpan salinan data memori yang sering dipakai agar akses lebih cepat.',
      'Pipeline membagi eksekusi instruksi menjadi tahap-tahap (fetch, decode, execute, write-back) sehingga beberapa instruksi dikerjakan bersamaan di tahap berbeda, seperti jalur perakitan pabrik. CPU multi-core memiliki beberapa inti yang masing-masing dapat menjalankan instruksi sendiri, sehingga beberapa thread berjalan benar-benar paralel.',
      'Semua kemampuan ini berawal dari gerbang logika (AND, OR, XOR). Contoh di bawah membuat penjumlah 4 bit ripple-carry dari gerbang-gerbang itu: inilah inti sebuah ALU.',
    ],
    sectionsTitle: 'Komponen CPU',
    sections: [
      { title: 'Unit kendali', body: 'Mengambil dan menerjemahkan instruksi, lalu mengatur komponen lain.' },
      { title: 'ALU', body: 'Menjalankan operasi aritmatika dan logika seperti tambah, kurang, AND, OR.' },
      { title: 'Cache dan register', body: 'Register paling cepat dan sangat sedikit. Cache menyimpan data memori yang sering dipakai (biasanya L1, L2, L3).' },
      { title: 'Pipeline dan multi-core', body: 'Pipeline menumpuk tahap eksekusi beberapa instruksi. Multi-core menjalankan beberapa urutan instruksi secara paralel.' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int penjumlahPenuh(int a, int b, int cin, int *cout) {
    int jumlah = a ^ b ^ cin;
    *cout = (a & b) | (cin & (a ^ b));
    return jumlah;
}

int tambah4Bit(int x, int y) {
    int carry = 0;
    int hasil = 0;
    for (int i = 0; i < 4; i++) {
        int a = (x >> i) & 1;
        int b = (y >> i) & 1;
        int cout;
        int jumlah = penjumlahPenuh(a, b, carry, &cout);
        hasil |= jumlah << i;
        carry = cout;
    }
    return hasil | (carry << 4);
}

void cetakBiner5(int n) {
    for (int i = 4; i >= 0; i--) {
        putchar(((n >> i) & 1) ? '1' : '0');
    }
}

int main(void) {
    int pasangan[][2] = {{6, 7}, {15, 1}};

    for (int i = 0; i < 2; i++) {
        int hasil = tambah4Bit(pasangan[i][0], pasangan[i][1]);
        printf("%d + %d = %d (", pasangan[i][0], pasangan[i][1], hasil);
        cetakBiner5(hasil);
        printf(")\n");
    }
    return 0;
}`,
      explanation: [
        'penjumlahPenuh menjumlahkan tiga bit (a, b, dan carry masuk) memakai XOR, AND, dan OR, persis seperti rangkaian gerbang logika.',
        'tambah4Bit merangkai empat penjumlah penuh dari bit paling rendah. Carry dari bit ke-i diteruskan ke bit ke-(i+1) (ripple-carry).',
        'Carry terakhir menjadi bit ke-5. Pada 15 + 1, semua bit 1 ditambah 1 menghasilkan 10000 (16).',
      ],
      output: '6 + 7 = 13 (01101)\n15 + 1 = 16 (10000)',
    },
    notes: [
      'CPU nyata memakai penjumlah yang lebih cepat (misalnya carry-lookahead), tetapi prinsipnya sama.',
      'Menambah jumlah core tidak otomatis mempercepat program. Program harus dirancang agar pekerjaannya bisa dibagi.',
    ],
  },
  {
    id: 'f6-instruction-set-architecture',
    description:
      'Instruction Set Architecture (ISA) adalah kontrak antara perangkat lunak dan CPU: daftar instruksi, register, dan cara memorinya diakses.',
    objectives: [
      'Menjelaskan apa itu ISA dan contohnya (x86-64, ARM64, RISC-V).',
      'Membedakan filosofi RISC dan CISC secara umum.',
      'Menerjemahkan instruksi assembly sederhana menjadi kode mesin biner.',
    ],
    explanation: [
      'ISA mendefinisikan instruksi apa yang dimengerti CPU, jumlah dan ukuran register, tipe data, mode pengalamatan, dan format biner setiap instruksi. Program yang dikompilasi untuk satu ISA tidak bisa berjalan di ISA lain tanpa diterjemahkan ulang. Contoh ISA: x86-64 (PC), ARM64 (kebanyakan ponsel), dan RISC-V (terbuka).',
      'RISC (Reduced Instruction Set Computer) memakai instruksi sedikit dan sederhana dengan panjang seragam, sehingga mudah di-pipeline (ARM, RISC-V). CISC (Complex Instruction Set Computer) memiliki instruksi lebih beragam dan kompleks dengan panjang bervariasi (x86). Dalam praktik, CPU modern dari keduanya saling meminjam ide.',
      'Assembler menerjemahkan mnemonic menjadi bit. Contoh di bawah adalah assembler mini untuk ISA mainan 8 bit: 4 bit opcode dan 4 bit operand, sehingga kamu bisa melihat bagaimana sebuah instruksi berubah menjadi biner.',
    ],
    sectionsTitle: 'Contoh ISA',
    sections: [
      { title: 'x86-64', body: 'ISA CISC dengan instruksi panjang bervariasi. Dipakai pada PC dan server.' },
      { title: 'ARM64 (AArch64)', body: 'ISA RISC dengan instruksi 32 bit seragam. Dipakai pada ponsel, tablet, dan banyak laptop.' },
      { title: 'RISC-V', body: 'ISA RISC terbuka dan modular yang dapat dipakai tanpa lisensi.' },
    ],
    codeExample: {
      language: 'Python',
      code: String.raw`OPCODE = {"HALT": 0b0000, "LOAD": 0b0001, "ADD": 0b0010, "SUB": 0b0011}


def encode(baris):
    bagian = baris.split()
    opcode = OPCODE[bagian[0]]
    operand = int(bagian[1]) if len(bagian) > 1 else 0
    return (opcode << 4) | operand


program = ["LOAD 9", "ADD 4", "SUB 3", "HALT"]

for baris in program:
    kode = encode(baris)
    print(f"{baris:<8} -> {kode:08b} (0x{kode:02X})")`,
      explanation: [
        'Setiap instruksi 8 bit: 4 bit di kiri adalah opcode dan 4 bit di kanan adalah operand.',
        'LOAD memiliki opcode 0001 dan operand 9 (1001), sehingga hasilnya 00011001 atau 0x19.',
        'Operator << 4 menggeser opcode ke 4 bit teratas, dan | menggabungkannya dengan operand.',
        'Jalankan dengan: python program.py',
      ],
      output:
        'LOAD 9   -> 00011001 (0x19)\nADD 4    -> 00100100 (0x24)\nSUB 3    -> 00110011 (0x33)\nHALT     -> 00000000 (0x00)',
    },
    notes: [
      'ISA bersifat abstrak. Beberapa CPU berbeda (misalnya dari vendor berbeda) dapat mengimplementasikan ISA yang sama.',
      'Format instruksi nyata jauh lebih rumit, tetapi prinsip "opcode + operand" sama.',
    ],
  },
  {
    id: 'f6-operating-system',
    description:
      'Sistem operasi mengelola perangkat keras dan menyediakan layanan bagi program: proses, memori, berkas, perangkat, dan keamanan.',
    objectives: [
      'Menyebutkan tugas utama sistem operasi.',
      'Menjelaskan bahwa program berinteraksi dengan OS lewat antarmuka standar.',
      'Membaca informasi sistem operasi dari program.',
    ],
    explanation: [
      'Sistem operasi (OS) berdiri di antara aplikasi dan perangkat keras. Tugas utamanya: mengelola proses (menjalankan dan menjadwalkan program), mengelola memori (memberi tiap proses ruang alamat yang terisolasi), mengelola berkas (menyimpan dan mencari data), mengelola perangkat lewat driver, serta menjaga keamanan dan hak akses.',
      'Dengan abstraksi ini, program tidak perlu tahu merek penyimpanan atau layar yang dipakai. Cukup panggil layanan OS seperti membuka berkas atau menulis ke layar. Android memakai kernel Linux, sedangkan Termux adalah lingkungan terminal di atasnya yang menyediakan alat bergaya Linux.',
      'Setiap bahasa menyediakan pustaka untuk bertanya ke OS. Contoh di bawah memakai Python untuk membaca informasi dasar sistem tempat program berjalan.',
    ],
    sectionsTitle: 'Tugas Sistem Operasi',
    sections: [
      { title: 'Proses dan CPU', body: 'Membuat, menjadwalkan, dan menghentikan proses sehingga banyak program berbagi CPU.' },
      { title: 'Memori', body: 'Mengalokasikan memori, mengisolasi ruang alamat antarproses, dan mengelola memori virtual.' },
      { title: 'Berkas dan perangkat', body: 'Menyediakan sistem berkas dan antarmuka seragam ke perangkat lewat driver.' },
      { title: 'Keamanan', body: 'Mengatur hak akses pengguna dan proses agar program tidak saling mengganggu.' },
    ],
    codeExample: {
      language: 'Python',
      code: String.raw`import os
import platform

print("Sistem operasi:", platform.system())
print("Jenis OS:", os.name)
print("Variabel HOME ada:", "HOME" in os.environ)`,
      explanation: [
        'platform.system() menanyakan nama OS kepada sistem.',
        'os.name bernilai posix pada sistem bergaya Unix seperti Linux dan Android, dan nt pada Windows.',
        'os.environ berisi variabel lingkungan yang disediakan OS untuk proses, misalnya HOME.',
      ],
      output: 'Sistem operasi: Linux\nJenis OS: posix\nVariabel HOME ada: True',
    },
    notes: [
      'Output di atas adalah hasil di Termux (Android) atau Linux. Di Windows atau macOS hasilnya berbeda.',
      'Perbedaan antar-OS sering membuat program perlu penyesuaian, misalnya pemisah folder dan izin berkas.',
    ],
  },
  {
    id: 'f6-kernel',
    description:
      'Kernel adalah inti sistem operasi yang berjalan dengan hak istimewa penuh dan mengelola CPU, memori, dan perangkat.',
    objectives: [
      'Membedakan user mode dan kernel mode.',
      'Menjelaskan jenis kernel: monolitik dan microkernel.',
      'Menjelaskan bagaimana program meminta layanan kernel.',
    ],
    explanation: [
      'Kernel berjalan di kernel mode, yaitu mode CPU dengan hak penuh atas perangkat keras dan seluruh memori. Aplikasi biasa berjalan di user mode dengan hak terbatas, sehingga aplikasi yang bermasalah tidak bisa merusak sistem atau program lain. Perpindahan dari user mode ke kernel mode hanya terjadi lewat mekanisme terkontrol, seperti system call dan interupsi.',
      'Kernel monolitik (misalnya Linux) menjalankan sebagian besar layanan (penjadwal, sistem berkas, driver) dalam satu ruang kernel yang besar, sehingga cepat. Microkernel menjaga kernel sekecil mungkin dan menjalankan layanan lain sebagai proses terpisah, sehingga lebih modular dan terisolasi tetapi butuh lebih banyak komunikasi antarproses.',
      'Android memakai kernel Linux. Kita bisa menanyakan nama kernel lewat system call uname, seperti pada contoh berikut.',
    ],
    sectionsTitle: 'Kernel Mode vs User Mode',
    sections: [
      { title: 'User mode', body: 'Hak terbatas. Aplikasi tidak boleh mengakses perangkat atau memori proses lain secara langsung.' },
      { title: 'Kernel mode', body: 'Hak penuh. Hanya kode kernel dan driver yang berjalan di sini.' },
      { title: 'Berpindah mode', body: 'Lewat system call (diminta aplikasi), interupsi (dari perangkat), dan exception (misalnya akses memori ilegal).' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>
#include <sys/utsname.h>

int main(void) {
    struct utsname info;

    if (uname(&info) != 0) {
        perror("uname");
        return 1;
    }

    printf("Kernel: %s\n", info.sysname);
    return 0;
}`,
      explanation: [
        'uname adalah system call: program meminta kernel mengisi struct utsname dengan informasi sistem.',
        'info.sysname berisi nama kernel, yaitu Linux pada Android dan Termux.',
        'Nilai balik bukan nol berarti permintaan gagal, dan perror menampilkan alasannya.',
      ],
      output: 'Kernel: Linux',
    },
    notes: [
      'Nama kernel selalu Linux di Android, tetapi nomor versinya berbeda antar-perangkat.',
      'Bug pada kode kernel atau driver bisa menjatuhkan seluruh sistem, sedangkan bug aplikasi hanya menjatuhkan aplikasinya.',
    ],
  },
  {
    id: 'f6-process-dan-thread',
    description:
      'Proses adalah program yang sedang berjalan dengan ruang memori sendiri, sedangkan thread adalah alur eksekusi di dalam proses.',
    objectives: [
      'Membedakan proses dan thread.',
      'Membuat proses anak dengan fork dan menunggunya dengan waitpid.',
      'Menjelaskan exit code sebagai hasil proses.',
    ],
    explanation: [
      'Proses memiliki ruang alamat sendiri (kode, data, heap, stack), tabel berkas terbuka, dan identitas (PID). Proses saling terisolasi: satu proses tidak bisa langsung membaca memori proses lain. Thread adalah alur eksekusi di dalam proses; semua thread dalam satu proses berbagi ruang alamat tetapi punya stack dan register sendiri.',
      'Pada sistem POSIX, fork() membuat proses anak sebagai salinan proses induk. fork mengembalikan 0 pada proses anak dan PID anak pada proses induk. Induk memakai waitpid untuk menunggu anak selesai dan membaca exit code-nya (0 berarti sukses, selainnya gagal).',
      'Proses lebih berat tetapi lebih terisolasi, sedangkan thread lebih ringan dan mudah berbagi data tetapi lebih rawan kesalahan sinkronisasi. Pilihannya bergantung pada kebutuhan isolasi dan berbagi data.',
    ],
    sectionsTitle: 'Proses vs Thread',
    sections: [
      { title: 'Proses', body: 'Memori terpisah, isolasi kuat, pembuatan lebih mahal, komunikasi lewat IPC (pipe, socket, berkas).' },
      { title: 'Thread', body: 'Berbagi memori proses, pembuatan lebih murah, tetapi butuh sinkronisasi untuk menghindari race condition.' },
      { title: 'Exit code', body: 'Angka yang dikembalikan proses saat selesai. 0 berarti berhasil, nilai lain menandakan kegagalan.' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>
#include <stdlib.h>
#include <sys/wait.h>
#include <unistd.h>

int main(void) {
    printf("Induk: membuat proses anak\n");
    fflush(stdout);

    pid_t pid = fork();
    if (pid < 0) {
        perror("fork");
        return 1;
    }

    if (pid == 0) {
        printf("Anak: bekerja lalu selesai\n");
        exit(3);
    }

    int status = 0;
    waitpid(pid, &status, 0);
    if (WIFEXITED(status)) {
        printf("Induk: anak selesai dengan kode %d\n", WEXITSTATUS(status));
    }
    return 0;
}`,
      explanation: [
        'fflush(stdout) dipanggil sebelum fork agar buffer keluaran tidak ikut tersalin ke anak dan tercetak dua kali.',
        'Setelah fork, pid bernilai 0 pada proses anak dan bernilai PID anak pada proses induk. Keduanya menjalankan baris berikutnya.',
        'Anak mencetak pesan lalu keluar dengan kode 3. Induk memakai waitpid untuk menunggu dan WEXITSTATUS untuk membaca kode itu.',
      ],
      output: 'Induk: membuat proses anak\nAnak: bekerja lalu selesai\nInduk: anak selesai dengan kode 3',
    },
    notes: [
      'Tanpa waitpid, proses anak yang sudah selesai menjadi zombie sampai induknya mengumpulkan statusnya.',
      'Windows tidak memiliki fork. Contoh ini berlaku untuk Linux, Android (Termux), dan macOS.',
    ],
  },
  {
    id: 'f6-scheduling',
    description:
      'Penjadwal (scheduler) menentukan proses mana yang memakai CPU berikutnya, dengan tujuan efisiensi dan keadilan.',
    objectives: [
      'Membandingkan FCFS, SJF, Round Robin, dan prioritas.',
      'Menghitung waktu tunggu rata-rata.',
      'Menjelaskan trade-off antara waktu tunggu dan responsivitas.',
    ],
    explanation: [
      'Karena jumlah proses biasanya lebih banyak dari jumlah core, OS menjadwalkan giliran pemakaian CPU. Algoritma yang umum: FCFS (First Come First Served: siapa datang dulu dilayani dulu), SJF (Shortest Job First: proses terpendek lebih dulu), Round Robin (setiap proses mendapat jatah waktu tetap secara bergiliran), dan penjadwalan prioritas.',
      'Metrik penting: waktu tunggu (lama proses menunggu di antrean), turnaround (waktu dari datang sampai selesai), dan waktu respons (lama sampai pertama kali dijalankan). FCFS sederhana, tetapi proses pendek bisa menunggu lama di belakang proses panjang. Round Robin memberi respons yang adil sehingga cocok untuk sistem interaktif, walaupun waktu tunggu rata-ratanya bisa lebih besar.',
      'Contoh di bawah menyimulasikan tiga proses dengan burst time 5, 3, dan 2 (semua datang bersamaan) pada FCFS dan Round Robin kuantum 2.',
    ],
    sectionsTitle: 'Algoritma Penjadwalan',
    sections: [
      { title: 'FCFS', body: 'Sederhana dan adil dalam urutan datang, tetapi proses pendek dapat tertahan lama (convoy effect).' },
      { title: 'SJF', body: 'Meminimalkan waktu tunggu rata-rata, tetapi butuh perkiraan panjang proses dan bisa membuat proses panjang kelaparan.' },
      { title: 'Round Robin', body: 'Setiap proses mendapat kuantum waktu bergiliran. Responsif untuk sistem interaktif.' },
      { title: 'Prioritas', body: 'Proses berprioritas tinggi lebih dulu. Perlu mekanisme aging agar proses prioritas rendah tidak kelaparan.' },
    ],
    codeExample: {
      language: 'Python',
      code: String.raw`from collections import deque

proses = [("A", 5), ("B", 3), ("C", 2)]


def fcfs(daftar):
    waktu = 0
    tunggu = {}
    for nama, burst in daftar:
        tunggu[nama] = waktu
        waktu += burst
    return tunggu


def round_robin(daftar, kuantum):
    sisa = dict(daftar)
    antrean = deque(nama for nama, _ in daftar)
    waktu = 0
    selesai = {}
    while antrean:
        nama = antrean.popleft()
        jalan = min(kuantum, sisa[nama])
        waktu += jalan
        sisa[nama] -= jalan
        if sisa[nama] > 0:
            antrean.append(nama)
        else:
            selesai[nama] = waktu
    burst = dict(daftar)
    return {nama: selesai[nama] - burst[nama] for nama in selesai}


def tampilkan(judul, tunggu):
    rata = sum(tunggu.values()) / len(tunggu)
    detail = ", ".join(f"{n}={tunggu[n]}" for n in sorted(tunggu))
    print(f"{judul}: {detail} | rata-rata {rata:.2f}")


tampilkan("FCFS", fcfs(proses))
tampilkan("Round Robin (q=2)", round_robin(proses, 2))`,
      explanation: [
        'FCFS: A menunggu 0, B menunggu 5 (menunggu A selesai), C menunggu 8. Rata-rata 13/3 = 4,33.',
        'Round Robin memberi jatah 2 satuan waktu bergiliran. Proses selesai pada waktu A=10, B=9, C=6.',
        'Waktu tunggu = waktu selesai - burst: A=5, B=6, C=4, rata-rata 5,00.',
        'Round Robin menghasilkan rata-rata tunggu lebih tinggi di sini, tetapi setiap proses mendapat giliran jauh lebih cepat.',
      ],
      output:
        'FCFS: A=0, B=5, C=8 | rata-rata 4.33\nRound Robin (q=2): A=5, B=6, C=4 | rata-rata 5.00',
    },
    notes: [
      'Kuantum yang terlalu kecil membuang waktu untuk berpindah proses (context switch), sedangkan yang terlalu besar membuat Round Robin mirip FCFS.',
      'Simulasi ini mengasumsikan semua proses datang pada waktu 0 dan tidak berhenti untuk I/O.',
    ],
  },
  {
    id: 'f6-concurrency',
    description:
      'Konkurensi adalah menangani banyak tugas yang tumpang tindih dalam waktu, sedangkan paralelisme menjalankannya benar-benar bersamaan di beberapa core.',
    objectives: [
      'Membedakan konkurensi dan paralelisme.',
      'Membuat thread dengan pthread dan menunggunya dengan join.',
      'Membagi pekerjaan ke beberapa thread tanpa berbagi data yang diubah.',
    ],
    explanation: [
      'Konkurensi berarti beberapa tugas sedang berjalan dalam rentang waktu yang tumpang tindih, walaupun mungkin dikerjakan bergiliran di satu core. Paralelisme berarti beberapa tugas benar-benar dikerjakan pada saat yang sama di beberapa core. Program konkuren yang baik bisa berjalan paralel jika perangkat kerasnya mendukung.',
      'Di C, pustaka POSIX Threads (pthread) menyediakan pthread_create untuk membuat thread dan pthread_join untuk menunggunya selesai. Cara paling aman membagi pekerjaan adalah memberi setiap thread bagian datanya sendiri dan tempat hasil sendiri, lalu menggabungkan hasilnya setelah semua selesai.',
      'Contoh berikut membagi penjumlahan 1 sampai 100 menjadi dua bagian yang dikerjakan dua thread. Karena tiap thread menulis ke struct sendiri, tidak ada data yang diubah bersama sehingga tidak butuh kunci.',
    ],
    sectionsTitle: 'Istilah Penting',
    sections: [
      { title: 'Konkurensi', body: 'Struktur program yang menangani banyak tugas yang tumpang tindih. Tidak harus paralel.' },
      { title: 'Paralelisme', body: 'Eksekusi bersamaan di beberapa core. Memerlukan perangkat keras multi-core.' },
      { title: 'Thread', body: 'Alur eksekusi dalam satu proses. Semua thread berbagi memori proses tersebut.' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <pthread.h>
#include <stdio.h>

struct Tugas {
    int awal;
    int akhir;
    long hasil;
};

void *jumlahkan(void *arg) {
    struct Tugas *tugas = arg;
    long total = 0;
    for (int i = tugas->awal; i <= tugas->akhir; i++) {
        total += i;
    }
    tugas->hasil = total;
    return NULL;
}

int main(void) {
    pthread_t thread[2];
    struct Tugas tugas[2] = {{1, 50, 0}, {51, 100, 0}};

    for (int i = 0; i < 2; i++) {
        pthread_create(&thread[i], NULL, jumlahkan, &tugas[i]);
    }
    for (int i = 0; i < 2; i++) {
        pthread_join(thread[i], NULL);
    }

    printf("Thread 1: %ld\n", tugas[0].hasil);
    printf("Thread 2: %ld\n", tugas[1].hasil);
    printf("Total: %ld\n", tugas[0].hasil + tugas[1].hasil);
    return 0;
}`,
      explanation: [
        'Setiap thread menerima pointer ke struct Tugas miliknya sendiri berisi rentang yang harus dijumlahkan.',
        'pthread_create menjalankan fungsi jumlahkan pada thread baru. pthread_join menunggu thread tersebut selesai.',
        'Karena tiap thread hanya menulis ke struct-nya sendiri, tidak ada race condition.',
        'Hasilnya 1275 (1 sampai 50) ditambah 3775 (51 sampai 100) sama dengan 5050.',
      ],
      output: 'Thread 1: 1275\nThread 2: 3775\nTotal: 5050',
    },
    notes: [
      'Kompilasi dengan: clang program.c -o program -pthread',
      'Selalu join thread (atau detach) agar sumber dayanya dibebaskan.',
    ],
  },
  {
    id: 'f6-synchronization',
    description:
      'Sinkronisasi mengatur akses thread ke data bersama agar tidak terjadi race condition.',
    objectives: [
      'Menjelaskan race condition dan critical section.',
      'Melindungi data bersama dengan mutex.',
      'Mengenali deadlock dan cara menghindarinya.',
    ],
    explanation: [
      'Race condition terjadi ketika beberapa thread membaca dan menulis data bersama tanpa koordinasi, sehingga hasilnya bergantung pada urutan eksekusi yang tidak bisa diprediksi. Operasi seperti counter++ sebenarnya tiga langkah (baca, tambah, tulis), sehingga dua thread bisa saling menimpa hasil dan sebagian penambahan hilang.',
      'Bagian kode yang mengakses data bersama disebut critical section. Mutex (mutual exclusion) memastikan hanya satu thread yang berada di critical section pada satu waktu: thread mengunci mutex sebelum masuk dan membukanya setelah keluar.',
      'Penggunaan kunci yang salah dapat menyebabkan deadlock: dua thread saling menunggu kunci yang dipegang lawannya selamanya. Cara menghindarinya: selalu mengunci mutex dengan urutan yang sama, menahan kunci sesingkat mungkin, dan tidak memanggil kode asing saat memegang kunci.',
    ],
    sectionsTitle: 'Konsep',
    sections: [
      { title: 'Race condition', body: 'Hasil bergantung pada waktu eksekusi thread. Sulit direproduksi dan sulit dilacak.' },
      { title: 'Critical section', body: 'Bagian kode yang mengakses data bersama dan harus dijalankan satu thread dalam satu waktu.' },
      { title: 'Deadlock', body: 'Terjadi bila ada saling tunggu melingkar atas sumber daya. Hindari dengan urutan penguncian yang konsisten.' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <pthread.h>
#include <stdio.h>

#define JUMLAH 100000

static long counter = 0;
static pthread_mutex_t kunci = PTHREAD_MUTEX_INITIALIZER;

void *tambah(void *arg) {
    (void)arg;
    for (int i = 0; i < JUMLAH; i++) {
        pthread_mutex_lock(&kunci);
        counter++;
        pthread_mutex_unlock(&kunci);
    }
    return NULL;
}

int main(void) {
    pthread_t a;
    pthread_t b;

    pthread_create(&a, NULL, tambah, NULL);
    pthread_create(&b, NULL, tambah, NULL);
    pthread_join(a, NULL);
    pthread_join(b, NULL);

    printf("Counter: %ld\n", counter);
    return 0;
}`,
      explanation: [
        'Dua thread masing-masing menaikkan counter 100.000 kali.',
        'pthread_mutex_lock dan pthread_mutex_unlock membungkus counter++ sehingga hanya satu thread yang mengubah counter pada satu waktu.',
        'Karena kenaikan dilindungi mutex, tidak ada penambahan yang hilang dan hasil akhirnya selalu tepat 200.000.',
      ],
      output: 'Counter: 200000',
    },
    notes: [
      'Tanpa mutex, hasilnya hampir pasti lebih kecil dari 200000 dan berbeda di setiap eksekusi.',
      'Mengunci terlalu sering membuat program lambat. Kunci hanya critical section yang benar-benar perlu.',
    ],
  },
  {
    id: 'f6-mutex-dan-semaphore',
    description:
      'Mutex dan semaphore adalah dua alat sinkronisasi dengan tujuan berbeda: mutex menjaga kepemilikan, semaphore menghitung dan memberi sinyal.',
    objectives: [
      'Membedakan mutex dan semaphore.',
      'Memakai semaphore untuk memberi sinyal antar-thread.',
      'Memilih alat yang sesuai untuk kebutuhan tertentu.',
    ],
    explanation: [
      'Mutex adalah kunci dengan kepemilikan: thread yang mengunci harus pula yang membukanya. Tujuannya mutual exclusion, yaitu melindungi critical section. Mutex hanya punya dua keadaan: terkunci atau terbuka.',
      'Semaphore adalah penghitung bulat non-negatif dengan dua operasi: wait (sem_wait, kurangi hitungan, tunggu jika nol) dan post (sem_post, tambah hitungan dan bangunkan penunggu). Semaphore tidak punya pemilik, sehingga satu thread boleh melakukan post untuk membangunkan thread lain. Ini cocok untuk memberi sinyal "data siap" atau membatasi jumlah thread yang memakai sumber daya (misalnya maksimal 3 koneksi).',
      'Aturan praktis: pakai mutex untuk melindungi data bersama, dan pakai semaphore untuk koordinasi urutan atau pembatasan jumlah. Pada contoh, thread utama menunggu pekerja menyiapkan data lewat semaphore.',
    ],
    sectionsTitle: 'Perbandingan',
    sections: [
      { title: 'Mutex', body: 'Kunci dua keadaan dengan pemilik. Untuk melindungi critical section.' },
      { title: 'Semaphore penghitung', body: 'Menghitung sumber daya yang tersedia. Cocok untuk membatasi jumlah pemakai bersamaan.' },
      { title: 'Semaphore biner untuk sinyal', body: 'Dimulai dari 0. Satu thread menunggu (wait) hingga thread lain memberi sinyal (post).' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <pthread.h>
#include <semaphore.h>
#include <stdio.h>

static sem_t siap;
static int nilai = 0;

void *pekerja(void *arg) {
    (void)arg;
    nilai = 42;
    printf("Pekerja: data disiapkan\n");
    sem_post(&siap);
    return NULL;
}

int main(void) {
    pthread_t thread;

    sem_init(&siap, 0, 0);
    pthread_create(&thread, NULL, pekerja, NULL);

    sem_wait(&siap);
    printf("Utama: data siap, nilai = %d\n", nilai);

    pthread_join(thread, NULL);
    sem_destroy(&siap);
    return 0;
}`,
      explanation: [
        'sem_init(&siap, 0, 0) membuat semaphore dengan hitungan awal 0, sehingga sem_wait pertama akan menunggu.',
        'Pekerja menyiapkan nilai, mencetak pesan, lalu sem_post menaikkan hitungan menjadi 1.',
        'Thread utama baru lolos dari sem_wait setelah pekerja memberi sinyal, sehingga urutan cetak selalu: pekerja dulu, lalu utama.',
      ],
      output: 'Pekerja: data disiapkan\nUtama: data siap, nilai = 42',
    },
    notes: [
      'Kompilasi dengan: clang program.c -o program -pthread',
      'Semaphore tanpa pemilik lebih fleksibel, tetapi juga lebih mudah disalahgunakan daripada mutex.',
    ],
  },
  {
    id: 'f6-virtual-memory',
    description:
      'Memori virtual memberi setiap proses ruang alamat sendiri yang diterjemahkan oleh OS dan perangkat keras ke memori fisik.',
    objectives: [
      'Menjelaskan alamat virtual, alamat fisik, halaman, dan frame.',
      'Menerjemahkan alamat virtual dengan page table.',
      'Menjelaskan page fault dan manfaat memori virtual.',
    ],
    explanation: [
      'Setiap proses mengira dirinya memiliki seluruh memori. Kenyataannya, alamat yang dipakai program (alamat virtual) diterjemahkan oleh MMU (Memory Management Unit) menjadi alamat fisik di RAM. Ruang alamat dibagi menjadi halaman (page) berukuran tetap, misalnya 4 KB, dan RAM dibagi menjadi frame dengan ukuran sama.',
      'Alamat virtual terdiri dari nomor halaman dan offset dalam halaman. Page table memetakan nomor halaman ke nomor frame. Alamat fisik = nomor frame x ukuran halaman + offset. Jika halaman belum ada di RAM, terjadi page fault dan OS memuatnya (atau menolak akses jika memang tidak sah).',
      'Manfaatnya: isolasi antarproses, program boleh memakai ruang alamat lebih besar daripada RAM, memori fisik bisa tersebar tidak berurutan, dan beberapa proses dapat berbagi halaman yang sama (misalnya pustaka bersama atau copy-on-write setelah fork).',
    ],
    sectionsTitle: 'Istilah Penting',
    sections: [
      { title: 'Page dan frame', body: 'Halaman adalah blok ruang alamat virtual, frame adalah blok memori fisik, dengan ukuran sama.' },
      { title: 'Page table', body: 'Tabel pemetaan nomor halaman ke nomor frame yang dimiliki setiap proses.' },
      { title: 'Page fault', body: 'Terjadi saat halaman yang diakses belum dimuat di RAM atau akses tidak sah. OS menangani dan memuat halaman jika sah.' },
    ],
    codeExample: {
      language: 'Python',
      code: String.raw`UKURAN_HALAMAN = 4096
page_table = {0: 5, 1: 2, 2: 7}


def terjemahkan(alamat):
    halaman = alamat // UKURAN_HALAMAN
    offset = alamat % UKURAN_HALAMAN
    if halaman not in page_table:
        return f"Alamat virtual 0x{alamat:04X} -> halaman {halaman}: page fault"
    fisik = page_table[halaman] * UKURAN_HALAMAN + offset
    return (
        f"Alamat virtual 0x{alamat:04X} -> halaman {halaman}, "
        f"offset 0x{offset:X} -> alamat fisik 0x{fisik:04X}"
    )


for alamat in [0x1A2C, 0x0005, 0x3010]:
    print(terjemahkan(alamat))`,
      explanation: [
        'Alamat 0x1A2C berada di halaman 1 (0x1A2C dibagi 4096) dengan offset 0xA2C.',
        'Halaman 1 dipetakan ke frame 2, sehingga alamat fisiknya 2 x 4096 + 0xA2C = 0x2A2C.',
        'Alamat 0x0005 berada di halaman 0 yang dipetakan ke frame 5, sehingga alamat fisiknya 0x5005.',
        'Halaman 3 tidak ada di page table, sehingga terjadi page fault.',
      ],
      output:
        'Alamat virtual 0x1A2C -> halaman 1, offset 0xA2C -> alamat fisik 0x2A2C\nAlamat virtual 0x0005 -> halaman 0, offset 0x5 -> alamat fisik 0x5005\nAlamat virtual 0x3010 -> halaman 3: page fault',
    },
    notes: [
      'Page table nyata bertingkat dan dibantu cache bernama TLB agar penerjemahan cepat.',
      'Terlalu banyak page fault membuat sistem lambat karena banyak waktu terbuang menunggu penyimpanan.',
    ],
  },
  {
    id: 'f6-file-system',
    description:
      'Sistem berkas mengatur bagaimana data disimpan, dinamai, dan dicari pada penyimpanan lewat berkas dan folder.',
    objectives: [
      'Menjelaskan berkas, folder, path, dan metadata.',
      'Membuat, membaca, dan menghapus berkas dengan pustaka standar C.',
      'Memeriksa kegagalan operasi berkas.',
    ],
    explanation: [
      'Sistem berkas menyembunyikan detail penyimpanan fisik di balik abstraksi berkas (data bernama) dan folder (kumpulan berkas dan folder lain) yang membentuk pohon. Setiap berkas punya metadata, seperti ukuran, waktu, pemilik, dan izin akses. Di sistem Unix, semuanya diakses lewat path seperti /data/data/com.termux/files/home.',
      'Operasi berkas di C: fopen membuka berkas dengan mode ("w" tulis, "r" baca, "a" tambah), fprintf dan fgets menulis dan membaca teks, fseek/ftell mengatur dan membaca posisi, fclose menutup berkas, dan remove menghapusnya. Tutup berkas setelah selesai agar data tertulis dengan benar.',
      'Setiap operasi bisa gagal (berkas tidak ada, izin ditolak, penyimpanan penuh). fopen mengembalikan NULL jika gagal, sehingga hasilnya harus diperiksa.',
    ],
    sectionsTitle: 'Mode fopen',
    sections: [
      { title: '"r"', body: 'Baca. Berkas harus sudah ada.' },
      { title: '"w"', body: 'Tulis. Membuat berkas baru atau mengosongkan yang sudah ada.' },
      { title: '"a"', body: 'Tambah. Menulis di akhir berkas tanpa menghapus isi lama.' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <stdio.h>

int main(void) {
    FILE *berkas = fopen("catatan.txt", "w");
    if (berkas == NULL) {
        perror("fopen (tulis)");
        return 1;
    }
    fprintf(berkas, "Kodein\n");
    fprintf(berkas, "Belajar\n");
    fclose(berkas);

    berkas = fopen("catatan.txt", "r");
    if (berkas == NULL) {
        perror("fopen (baca)");
        return 1;
    }

    fseek(berkas, 0, SEEK_END);
    long ukuran = ftell(berkas);
    rewind(berkas);
    printf("Ukuran file: %ld byte\n", ukuran);

    char baris[64];
    while (fgets(baris, sizeof(baris), berkas) != NULL) {
        printf("Baris: %s", baris);
    }
    fclose(berkas);

    if (remove("catatan.txt") == 0) {
        printf("File dihapus\n");
    }
    return 0;
}`,
      explanation: [
        'Mode "w" membuat berkas catatan.txt. Dua fprintf menulis "Kodein\\n" (7 byte) dan "Belajar\\n" (8 byte), total 15 byte.',
        'fseek ke akhir lalu ftell memberi ukuran berkas, dan rewind mengembalikan posisi baca ke awal.',
        'fgets membaca baris demi baris (baris sudah memuat karakter newline, sehingga printf tidak menambahnya lagi).',
        'remove menghapus berkas dan mengembalikan 0 jika berhasil.',
      ],
      output: 'Ukuran file: 15 byte\nBaris: Kodein\nBaris: Belajar\nFile dihapus',
    },
    notes: [
      'Jalankan di folder yang bisa ditulis (misalnya folder home Termux).',
      'Data yang ditulis dengan fprintf bisa tertahan di buffer. fclose (atau fflush) memastikan data benar-benar dikirim ke penyimpanan.',
    ],
  },
  {
    id: 'f6-system-calls',
    description:
      'System call adalah pintu resmi bagi program di user mode untuk meminta layanan kernel, seperti membuka berkas atau menulis data.',
    objectives: [
      'Menjelaskan alur dari fungsi pustaka hingga system call.',
      'Memakai open, write, read, close, dan unlink secara langsung.',
      'Menyebutkan perbedaan fungsi stdio dan system call.',
    ],
    explanation: [
      'Program di user mode tidak boleh menyentuh perangkat keras langsung. Untuk meminta layanan, ia memanggil system call, yang memindahkan CPU ke kernel mode, menjalankan layanan, lalu kembali. Contohnya: open, read, write, close, fork, exec, dan mmap.',
      'Fungsi pustaka C seperti printf dan fopen membungkus system call dan menambahkan buffering agar lebih efisien. Pada akhirnya printf memanggil write untuk menulis ke file descriptor 1 (stdout). File descriptor adalah bilangan bulat kecil yang mewakili berkas atau aliran terbuka: 0 stdin, 1 stdout, 2 stderr.',
      'System call mengembalikan -1 saat gagal dan mengisi variabel errno dengan penyebabnya. Contoh berikut memakai system call langsung untuk menulis dan membaca sebuah berkas.',
    ],
    sectionsTitle: 'File Descriptor',
    sections: [
      { title: '0, 1, 2', body: 'Dibuka otomatis untuk setiap proses: stdin, stdout, dan stderr.' },
      { title: 'open dan close', body: 'open mengembalikan file descriptor baru (atau -1 jika gagal). close melepaskannya.' },
      { title: 'read dan write', body: 'Memindahkan sejumlah byte dari atau ke file descriptor dan mengembalikan jumlah byte yang diproses.' },
    ],
    codeExample: {
      language: 'C',
      code: String.raw`#include <fcntl.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>

int main(void) {
    const char *pesan = "lewat system call";

    int fd = open("tmp-syscall.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644);
    if (fd < 0) {
        perror("open (tulis)");
        return 1;
    }
    ssize_t tertulis = write(fd, pesan, strlen(pesan));
    close(fd);

    char buffer[64];
    fd = open("tmp-syscall.txt", O_RDONLY);
    if (fd < 0) {
        perror("open (baca)");
        return 1;
    }
    ssize_t terbaca = read(fd, buffer, sizeof(buffer) - 1);
    close(fd);
    if (terbaca < 0) {
        perror("read");
        return 1;
    }
    buffer[terbaca] = '\0';

    printf("Ditulis: %zd byte\n", tertulis);
    printf("Dibaca : %zd byte -> %s\n", terbaca, buffer);

    unlink("tmp-syscall.txt");
    return 0;
}`,
      explanation: [
        'open membuat berkas dengan izin 0644 dan mengembalikan file descriptor. O_TRUNC mengosongkan isi lama.',
        'write dan read mengembalikan jumlah byte yang diproses. Teks "lewat system call" berukuran 17 byte.',
        'buffer[terbaca] = 0 menutup string sebelum dicetak karena read tidak menambahkan karakter null.',
        'unlink menghapus berkas sementara itu.',
      ],
      output: 'Ditulis: 17 byte\nDibaca : 17 byte -> lewat system call',
    },
    notes: [
      'Setiap system call punya biaya perpindahan mode. Karena itu stdio memakai buffer agar tidak memanggil write untuk setiap karakter.',
      'Di Linux kamu bisa melihat system call yang dipakai program dengan alat strace jika tersedia.',
    ],
  },
  {
    id: 'f6-networking-fundamentals',
    description:
      'Jaringan komputer menghubungkan perangkat lewat model berlapis, dengan alamat IP dan port sebagai identitas tujuan data.',
    objectives: [
      'Menyebutkan lapisan model TCP/IP dan fungsinya.',
      'Menjelaskan alamat IP, subnet, dan port.',
      'Menghitung informasi jaringan dari notasi CIDR.',
    ],
    explanation: [
      'Model TCP/IP membagi komunikasi menjadi empat lapisan: link (pengiriman antarperangkat langsung, misalnya Wi-Fi atau Ethernet), internet (alamat dan perutean paket, yaitu IP), transport (pengiriman antaraplikasi: TCP atau UDP), dan aplikasi (protokol seperti HTTP dan DNS). Setiap lapisan membungkus data dari lapisan di atasnya dengan header sendiri.',
      'Alamat IP mengidentifikasi perangkat dalam jaringan. Notasi CIDR seperti 192.168.1.0/24 berarti 24 bit pertama adalah bagian jaringan, sehingga tersisa 8 bit untuk host: 256 alamat, dengan 254 yang bisa dipakai host (alamat pertama adalah alamat jaringan dan yang terakhir adalah broadcast). Port (0-65535) mengidentifikasi aplikasi di dalam sebuah perangkat.',
      'Alamat 192.168.x.x termasuk alamat privat yang dipakai di jaringan lokal dan tidak dirutekan di internet. 127.0.0.1 adalah loopback, yaitu perangkat itu sendiri.',
    ],
    sectionsTitle: 'Lapisan TCP/IP',
    sections: [
      { title: 'Link', body: 'Mengirim frame antarperangkat yang terhubung langsung (Wi-Fi, Ethernet).' },
      { title: 'Internet (IP)', body: 'Memberi alamat dan merutekan paket antar-jaringan.' },
      { title: 'Transport', body: 'Pengiriman antaraplikasi dengan port. TCP andal dan berurutan, UDP cepat tanpa jaminan.' },
      { title: 'Aplikasi', body: 'Protokol yang dipakai aplikasi seperti HTTP, DNS, dan SSH.' },
    ],
    codeExample: {
      language: 'Python',
      code: String.raw`import ipaddress

jaringan = ipaddress.ip_network("192.168.1.0/24")

print("Alamat jaringan :", jaringan.network_address)
print("Broadcast       :", jaringan.broadcast_address)
print("Netmask         :", jaringan.netmask)
print("Jumlah host     :", jaringan.num_addresses - 2)
print("192.168.1.77 di jaringan ini?", ipaddress.ip_address("192.168.1.77") in jaringan)
print("192.168.2.5 di jaringan ini?", ipaddress.ip_address("192.168.2.5") in jaringan)`,
      explanation: [
        'Notasi /24 berarti netmask 255.255.255.0, jadi 8 bit tersisa untuk host dan total 256 alamat.',
        'Alamat pertama (192.168.1.0) adalah alamat jaringan dan yang terakhir (192.168.1.255) adalah broadcast, sehingga host yang bisa dipakai 254.',
        'Operator in memeriksa apakah sebuah alamat berada dalam rentang jaringan tersebut.',
      ],
      output:
        'Alamat jaringan : 192.168.1.0\nBroadcast       : 192.168.1.255\nNetmask         : 255.255.255.0\nJumlah host     : 254\n192.168.1.77 di jaringan ini? True\n192.168.2.5 di jaringan ini? False',
    },
    notes: [
      'Port di bawah 1024 biasanya butuh hak istimewa untuk dibuka pada sistem Unix.',
      'Alamat IPv6 memakai 128 bit dan menggantikan IPv4 secara bertahap karena alamat IPv4 hampir habis.',
    ],
  },
  {
    id: 'f6-tcp-ip',
    description:
      'TCP/IP adalah rangkaian protokol internet: IP merutekan paket, sedangkan TCP menyediakan aliran data yang andal dan berurutan.',
    objectives: [
      'Menjelaskan peran IP dan TCP.',
      'Menjelaskan three-way handshake dan keandalan TCP.',
      'Membuat server dan klien TCP sederhana dengan socket.',
    ],
    explanation: [
      'IP hanya berusaha mengirim paket ke alamat tujuan tanpa jaminan: paket bisa hilang, terduplikasi, atau tiba tidak berurutan. TCP di atas IP menambahkan keandalan: membangun koneksi, menomori byte, meminta kirim ulang yang hilang, mengatur urutan, dan mengendalikan kecepatan agar tidak membanjiri penerima atau jaringan.',
      'Koneksi TCP dibuka dengan three-way handshake: klien mengirim SYN, server membalas SYN-ACK, klien membalas ACK. Setelah itu data mengalir dua arah sebagai aliran byte (stream), yang artinya batas pesan tidak dijaga. Satu pemanggilan send belum tentu sama dengan satu pemanggilan recv di sisi lain. UDP sebaliknya: tanpa koneksi, tanpa jaminan, tetapi lebih ringan.',
      'API socket dipakai untuk membuat server dan klien: server melakukan bind, listen, lalu accept, sedangkan klien melakukan connect. Contoh di bawah menjalankan server dan klien dalam satu program lewat loopback (127.0.0.1) sehingga tidak butuh internet.',
    ],
    sectionsTitle: 'TCP vs UDP',
    sections: [
      { title: 'TCP', body: 'Berorientasi koneksi, andal, berurutan, dengan kontrol aliran. Dipakai HTTP, SSH, dan email.' },
      { title: 'UDP', body: 'Tanpa koneksi dan tanpa jaminan, tetapi latensi rendah. Dipakai DNS, streaming, dan game real-time.' },
      { title: 'Handshake', body: 'SYN, SYN-ACK, ACK: tiga pesan untuk membuka koneksi TCP.' },
    ],
    codeExample: {
      language: 'Python',
      code: String.raw`import socket
import threading


def layani(server):
    koneksi, _ = server.accept()
    with koneksi:
        data = koneksi.recv(1024)
        koneksi.sendall(data.upper())


server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(("127.0.0.1", 0))
server.listen(1)
port = server.getsockname()[1]

thread = threading.Thread(target=layani, args=(server,))
thread.start()

with socket.create_connection(("127.0.0.1", port)) as klien:
    klien.sendall(b"halo kodein")
    balasan = klien.recv(1024)

thread.join()
server.close()

print("Balasan server:", balasan.decode())
print("Protokol: TCP di atas IP, melalui loopback 127.0.0.1")`,
      explanation: [
        'Server membuka socket TCP, bind ke port 0 (OS memilih port bebas), lalu listen. Thread terpisah menjalankan accept dan melayani satu klien.',
        'Klien memakai create_connection untuk melakukan handshake, mengirim "halo kodein", lalu menerima balasan.',
        'Server membalas dengan huruf kapital memakai data.upper(), sehingga klien menerima HALO KODEIN.',
      ],
      output: 'Balasan server: HALO KODEIN\nProtokol: TCP di atas IP, melalui loopback 127.0.0.1',
    },
    notes: [
      'recv bisa mengembalikan sebagian data saja. Pada protokol nyata, tentukan batas pesan (panjang atau pemisah) lalu baca berulang sampai lengkap.',
      'Contoh ini bekerja tanpa internet karena memakai alamat loopback.',
    ],
  },
  {
    id: 'f6-dns',
    description:
      'DNS menerjemahkan nama domain yang mudah diingat menjadi alamat IP lewat sistem basis data terdistribusi berhierarki.',
    objectives: [
      'Menjelaskan hierarki nama domain dan proses resolusi.',
      'Menyebutkan jenis record DNS umum.',
      'Menyusun paket query DNS sederhana secara manual.',
    ],
    explanation: [
      'Manusia mengingat nama seperti example.com, sedangkan komputer memerlukan alamat IP. DNS (Domain Name System) menerjemahkan keduanya. Nama domain dibaca dari kanan ke kiri dalam hierarki: root, lalu TLD (com, id, org), lalu domain (example), lalu subdomain (www).',
      'Saat aplikasi meminta nama, ia bertanya ke resolver (biasanya milik penyedia internet atau jaringan). Jika tidak ada di cache, resolver bertanya ke root server, TLD server, lalu authoritative server milik domain tersebut, kemudian menyimpan jawabannya sesuai TTL (masa berlaku) agar permintaan berikutnya cepat.',
      'Jenis record umum: A (alamat IPv4), AAAA (alamat IPv6), CNAME (alias ke nama lain), MX (server email), dan TXT (teks, sering untuk verifikasi). Query DNS umumnya dikirim lewat UDP ke port 53. Contoh berikut menyusun paket query untuk record A secara manual agar format biner DNS terlihat jelas.',
    ],
    sectionsTitle: 'Record DNS',
    sections: [
      { title: 'A dan AAAA', body: 'Memetakan nama ke alamat IPv4 (A) atau IPv6 (AAAA).' },
      { title: 'CNAME', body: 'Alias: sebuah nama menunjuk ke nama lain.' },
      { title: 'MX dan TXT', body: 'MX menunjuk server email domain. TXT menyimpan teks bebas, misalnya untuk verifikasi kepemilikan.' },
      { title: 'TTL', body: 'Lama jawaban boleh disimpan di cache sebelum harus ditanyakan ulang.' },
    ],
    codeExample: {
      language: 'Python',
      code: String.raw`import socket
import struct


def buat_query(nama, id_transaksi=0x1234):
    header = struct.pack("!HHHHHH", id_transaksi, 0x0100, 1, 0, 0, 0)
    pertanyaan = b"".join(
        bytes([len(label)]) + label.encode() for label in nama.split(".")
    )
    pertanyaan += b"\x00" + struct.pack("!HH", 1, 1)
    return header + pertanyaan


paket = buat_query("example.com")
print("Panjang paket:", len(paket), "byte")
print("Header:", paket[:12].hex())
print("Nama  :", paket[12:25].hex())
print("Tipe/kelas:", paket[25:].hex())
print("localhost ->", socket.gethostbyname("localhost"))`,
      explanation: [
        'Header 12 byte berisi ID transaksi (0x1234), flag (0x0100 = recursion desired), dan jumlah pertanyaan (1).',
        'Nama ditulis sebagai label berawalan panjang: 07 "example" 03 "com" 00. Totalnya 13 byte.',
        'Empat byte terakhir adalah tipe 1 (record A) dan kelas 1 (IN, internet).',
        'gethostbyname meminta sistem menerjemahkan nama. localhost selalu menjadi 127.0.0.1 tanpa perlu internet.',
      ],
      output:
        'Panjang paket: 29 byte\nHeader: 123401000001000000000000\nNama  : 076578616d706c6503636f6d00\nTipe/kelas: 00010001\nlocalhost -> 127.0.0.1',
    },
    notes: [
      'Contoh hanya menyusun paket, tidak mengirimnya. Mengirimnya butuh socket UDP ke server DNS pada port 53.',
      'Gunakan pustaka resolver untuk aplikasi nyata. Pemrosesan balasan DNS lengkap jauh lebih rumit.',
    ],
  },
  {
    id: 'f6-http-dan-https',
    description:
      'HTTP adalah protokol permintaan dan respons untuk web, sedangkan HTTPS adalah HTTP yang dilindungi enkripsi TLS.',
    objectives: [
      'Menjelaskan struktur permintaan dan respons HTTP.',
      'Menyebutkan metode, kode status, dan header umum.',
      'Menjelaskan manfaat HTTPS dan TLS.',
    ],
    explanation: [
      'HTTP bekerja dengan pola klien meminta, server menjawab. Permintaan berisi metode (GET untuk mengambil, POST untuk mengirim data, PUT, DELETE), path, header (misalnya Content-Type), dan opsional body. Respons berisi kode status (200 berhasil, 301 pindah, 404 tidak ditemukan, 500 galat server), header, dan body. HTTP berjalan di atas TCP dan biasanya memakai port 80.',
      'HTTP biasa mengirim data sebagai teks sehingga bisa dibaca atau diubah oleh pihak di tengah jaringan. HTTPS menambahkan lapisan TLS di bawah HTTP (port 443) yang memberi tiga hal: kerahasiaan (data dienkripsi), integritas (data tidak bisa diubah diam-diam), dan autentikasi server (sertifikat yang ditandatangani otoritas tepercaya membuktikan identitas situs).',
      'Contoh berikut menjalankan server HTTP kecil di loopback dan meminta halamannya dengan klien http.client. Contoh ini memakai HTTP biasa karena TLS membutuhkan sertifikat.',
    ],
    sectionsTitle: 'Dasar HTTP',
    sections: [
      { title: 'Metode', body: 'GET mengambil data, POST mengirim data baru, PUT mengubah, DELETE menghapus.' },
      { title: 'Kode status', body: '2xx berhasil, 3xx pengalihan, 4xx kesalahan klien (404), 5xx kesalahan server (500).' },
      { title: 'HTTPS', body: 'HTTP di atas TLS: terenkripsi, terjaga integritasnya, dan server terautentikasi lewat sertifikat.' },
    ],
    codeExample: {
      language: 'Python',
      code: String.raw`import http.client
import threading
from http.server import BaseHTTPRequestHandler, HTTPServer


class Penangan(BaseHTTPRequestHandler):
    def do_GET(self):
        isi = "Halo dari server Kodein".encode()
        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.send_header("Content-Length", str(len(isi)))
        self.end_headers()
        self.wfile.write(isi)

    def log_message(self, format, *args):
        pass


server = HTTPServer(("127.0.0.1", 0), Penangan)
port = server.server_address[1]
thread = threading.Thread(target=server.handle_request)
thread.start()

koneksi = http.client.HTTPConnection("127.0.0.1", port)
koneksi.request("GET", "/")
respons = koneksi.getresponse()
print("Status:", respons.status, respons.reason)
print("Content-Type:", respons.getheader("Content-Type"))
print("Isi:", respons.read().decode())

koneksi.close()
thread.join()
server.server_close()`,
      explanation: [
        'Penangan.do_GET dipanggil untuk setiap permintaan GET. Ia mengirim status 200, dua header, lalu body.',
        'log_message dikosongkan agar server tidak mencetak log permintaan ke layar.',
        'Server berjalan di thread dan menangani tepat satu permintaan (handle_request), lalu thread selesai.',
        'Klien mengirim GET /, lalu membaca status, header Content-Type, dan isi respons.',
      ],
      output:
        'Status: 200 OK\nContent-Type: text/plain; charset=utf-8\nIsi: Halo dari server Kodein',
    },
    notes: [
      'Jangan mengirim data sensitif (kata sandi, token) lewat HTTP biasa. Gunakan HTTPS.',
      'Server bawaan Python ini hanya untuk belajar. Untuk produksi gunakan server web atau kerangka kerja yang matang.',
    ],
  },
];