import type { LessonContent } from '@/types/content';

export const phase4Lessons: LessonContent[] = [
  {
    id: 'f4-linear-search',
    description:
      'Linear search memeriksa elemen satu per satu dari awal sampai nilai yang dicari ditemukan.',
    objectives: [
      'Mengimplementasikan linear search.',
      'Menjelaskan kompleksitas waktunya.',
      'Menentukan kapan linear search cukup dipakai.',
    ],
    explanation: [
      'Linear search adalah pencarian paling sederhana: periksa setiap elemen dari depan, dan berhenti ketika nilainya cocok atau data habis. Algoritma ini tidak mensyaratkan data terurut dan bekerja pada struktur apa pun yang bisa ditelusuri.',
      'Pada kasus terburuk, nilai berada di akhir atau tidak ada, sehingga seluruh n elemen diperiksa: O(n). Pada kasus terbaik nilai ada di posisi pertama: O(1). Untuk data kecil atau yang hanya dicari sekali, ini sudah cukup baik dan sangat mudah dibuat dengan benar.',
      'Jika pencarian dilakukan berulang kali pada data yang besar, mengurutkan data lebih dulu lalu memakai binary search biasanya jauh lebih efisien.',
    ],
    sectionsTitle: 'Ringkasan',
    sections: [
      { title: 'Syarat data', body: 'Tidak perlu terurut.' },
      { title: 'Kompleksitas', body: 'Terbaik O(1), rata-rata dan terburuk O(n). Memori tambahan O(1).' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <iostream>
#include <vector>

int cariLinear(const std::vector<int> &data, int target) {
    for (int i = 0; i < (int)data.size(); i++) {
        if (data[i] == target) {
            return i;
        }
    }
    return -1;
}

int main() {
    std::vector<int> data = {7, 3, 9, 4, 1};

    std::cout << "Indeks 9: " << cariLinear(data, 9) << "\n";
    std::cout << "Indeks 5: " << cariLinear(data, 5) << "\n";
    return 0;
}`,
      explanation: [
        'Fungsi mengembalikan indeks elemen pertama yang cocok, atau -1 jika tidak ada.',
        'Angka 9 berada di indeks 2, ditemukan setelah memeriksa tiga elemen.',
        'Angka 5 tidak ada, sehingga seluruh lima elemen diperiksa sebelum mengembalikan -1.',
      ],
      output: 'Indeks 9: 2\nIndeks 5: -1',
    },
    notes: [
      'Contoh C++ pada fase ini dikompilasi dengan: clang++ -std=c++17 program.cpp -o program',
      'Nilai -1 sering dipakai sebagai tanda tidak ditemukan karena indeks valid tidak pernah negatif.',
    ],
  },
  {
    id: 'f4-binary-search',
    description:
      'Binary search mencari nilai pada data terurut dengan membuang separuh kemungkinan di setiap langkah.',
    objectives: [
      'Menjelaskan syarat data terurut.',
      'Mengimplementasikan binary search secara iteratif.',
      'Menjelaskan mengapa kompleksitasnya O(log n).',
    ],
    explanation: [
      'Binary search hanya bekerja pada data yang sudah terurut. Ia membandingkan target dengan elemen tengah. Jika sama, selesai. Jika target lebih kecil, cari di separuh kiri. Jika lebih besar, cari di separuh kanan. Setiap langkah membuang separuh data.',
      'Karena ukuran data dibagi dua di setiap langkah, jumlah langkah maksimum sekitar log2(n). Untuk satu juta elemen, cukup sekitar 20 perbandingan. Ini jauh lebih cepat daripada linear search yang butuh sampai satu juta perbandingan.',
      'Waspadai overflow saat menghitung tengah. Gunakan kiri + (kanan - kiri) / 2, bukan (kiri + kanan) / 2, agar aman untuk nilai indeks yang besar.',
    ],
    sectionsTitle: 'Langkah',
    sections: [
      { title: '1. Tentukan batas', body: 'kiri = 0 dan kanan = n - 1.' },
      { title: '2. Ambil tengah', body: 'Bandingkan elemen tengah dengan target.' },
      { title: '3. Perkecil rentang', body: 'Geser kiri atau kanan, ulangi sampai kiri melewati kanan.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <iostream>
#include <vector>

int cariBiner(const std::vector<int> &data, int target) {
    int kiri = 0;
    int kanan = (int)data.size() - 1;

    while (kiri <= kanan) {
        int tengah = kiri + (kanan - kiri) / 2;
        if (data[tengah] == target) {
            return tengah;
        }
        if (data[tengah] < target) {
            kiri = tengah + 1;
        } else {
            kanan = tengah - 1;
        }
    }
    return -1;
}

int main() {
    std::vector<int> data = {2, 5, 8, 12, 16, 23, 38};

    std::cout << "Indeks 23: " << cariBiner(data, 23) << "\n";
    std::cout << "Indeks 7: " << cariBiner(data, 7) << "\n";
    return 0;
}`,
      explanation: [
        'Untuk target 23: tengah pertama bernilai 12 (lebih kecil), geser ke kanan; tengah berikutnya 23, ditemukan di indeks 5.',
        'Untuk target 7: rentang terus menyempit sampai kiri melewati kanan, lalu mengembalikan -1.',
        'tengah dihitung dengan kiri + (kanan - kiri) / 2 untuk menghindari overflow.',
      ],
      output: 'Indeks 23: 5\nIndeks 7: -1',
    },
    notes: [
      'Jika data belum terurut, hasil binary search tidak bisa dipercaya.',
      'Pustaka standar C++ menyediakan std::binary_search dan std::lower_bound.',
    ],
  },
  {
    id: 'f4-interpolation-search',
    description:
      'Interpolation search memperkirakan posisi target berdasarkan nilainya, dan sangat cepat pada data terurut yang tersebar merata.',
    objectives: [
      'Menjelaskan rumus perkiraan posisi.',
      'Mengimplementasikan interpolation search.',
      'Menjelaskan kapan metode ini lebih baik atau lebih buruk dari binary search.',
    ],
    explanation: [
      'Binary search selalu memeriksa titik tengah. Interpolation search lebih cerdas: seperti saat mencari nama di buku telepon, kita membuka lebih dekat ke akhir jika nama diawali huruf W. Posisi perkiraan dihitung dari nilai target relatif terhadap nilai terkecil dan terbesar pada rentang.',
      'Rumusnya: posisi = rendah + (target - data[rendah]) x (tinggi - rendah) / (data[tinggi] - data[rendah]). Jika data tersebar merata, rata-rata kompleksitasnya O(log log n), lebih cepat dari binary search. Jika sebaran sangat tidak merata, kasus terburuknya menjadi O(n).',
      'Pastikan target berada di antara data[rendah] dan data[tinggi], dan tangani kasus ketika kedua ujung bernilai sama agar tidak terjadi pembagian dengan nol.',
    ],
    sectionsTitle: 'Perbandingan',
    sections: [
      { title: 'Syarat', body: 'Data terurut. Paling efektif jika sebaran nilai merata.' },
      { title: 'Rata-rata', body: 'O(log log n) pada data merata.' },
      { title: 'Terburuk', body: 'O(n) pada data dengan sebaran sangat timpang.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <iostream>
#include <vector>

int cariInterpolasi(const std::vector<int> &data, int target) {
    int rendah = 0;
    int tinggi = (int)data.size() - 1;

    while (rendah <= tinggi && target >= data[rendah] && target <= data[tinggi]) {
        if (data[rendah] == data[tinggi]) {
            return data[rendah] == target ? rendah : -1;
        }
        int posisi = rendah + (int)((long long)(target - data[rendah]) * (tinggi - rendah)
                                    / (data[tinggi] - data[rendah]));
        if (data[posisi] == target) {
            return posisi;
        }
        if (data[posisi] < target) {
            rendah = posisi + 1;
        } else {
            tinggi = posisi - 1;
        }
    }
    return -1;
}

int main() {
    std::vector<int> data = {10, 20, 30, 40, 50, 60, 70};

    std::cout << "Indeks 40: " << cariInterpolasi(data, 40) << "\n";
    std::cout << "Indeks 25: " << cariInterpolasi(data, 25) << "\n";
    return 0;
}`,
      explanation: [
        'Untuk target 40: posisi = 0 + (30 x 6) / 60 = 3, dan data[3] memang 40, jadi ditemukan pada tebakan pertama.',
        'Untuk target 25: perkiraan pertama 1 (nilai 20) terlalu kecil, rendah menjadi 2, lalu 25 lebih kecil dari data[2] sehingga loop berhenti.',
        'Perkalian memakai long long agar tidak overflow pada data yang bernilai besar.',
      ],
      output: 'Indeks 40: 3\nIndeks 25: -1',
    },
    notes: [
      'Pada data seperti 1, 2, 3, 100000, perkiraan posisi sering meleset dan metode ini bisa lambat.',
      'Jika ragu dengan sebaran data, binary search adalah pilihan yang lebih aman.',
    ],
  },
  {
    id: 'f4-bubble-sort',
    description:
      'Bubble sort mengurutkan data dengan menukar pasangan elemen bersebelahan yang urutannya salah secara berulang.',
    objectives: [
      'Menelusuri cara kerja bubble sort.',
      'Menambahkan optimasi penghentian dini.',
      'Menyebutkan kompleksitas waktu dan sifat stabilnya.',
    ],
    explanation: [
      'Bubble sort membandingkan dua elemen bersebelahan dan menukarnya jika urutannya salah. Pada satu putaran penuh, elemen terbesar "menggelembung" ke posisi akhirnya. Putaran diulang untuk sisa elemen yang belum terurut.',
      'Algoritma ini sederhana tetapi lambat: dua loop bersarang menghasilkan O(n²) pada kasus rata-rata dan terburuk. Dengan optimasi berhenti jika satu putaran tidak melakukan pertukaran, data yang sudah terurut cukup diproses dalam O(n).',
      'Bubble sort stabil (elemen sama tidak berubah urutan relatifnya) dan tidak butuh memori tambahan. Ia lebih cocok untuk belajar daripada dipakai pada data besar.',
    ],
    sectionsTitle: 'Ringkasan',
    sections: [
      { title: 'Kompleksitas', body: 'Terbaik O(n) dengan optimasi, rata-rata dan terburuk O(n²). Memori O(1).' },
      { title: 'Stabil', body: 'Ya. Elemen bernilai sama tidak saling bertukar.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <algorithm>
#include <iostream>
#include <vector>

void bubbleSort(std::vector<int> &data) {
    int n = (int)data.size();
    for (int i = 0; i < n - 1; i++) {
        bool ditukar = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (data[j] > data[j + 1]) {
                std::swap(data[j], data[j + 1]);
                ditukar = true;
            }
        }
        if (!ditukar) {
            break;
        }
    }
}

void cetak(const std::vector<int> &data) {
    for (int i = 0; i < (int)data.size(); i++) {
        std::cout << data[i] << (i + 1 < (int)data.size() ? " " : "\n");
    }
}

int main() {
    std::vector<int> data = {5, 2, 9, 1, 6};

    std::cout << "Sebelum: ";
    cetak(data);
    bubbleSort(data);
    std::cout << "Sesudah: ";
    cetak(data);
    return 0;
}`,
      explanation: [
        'Loop dalam hanya berjalan sampai n - 1 - i karena i elemen terakhir sudah berada di posisi benar.',
        'std::swap menukar dua elemen yang bersebelahan jika urutannya salah.',
        'Jika satu putaran tidak menukar apa pun, data sudah terurut dan loop dihentikan lebih awal.',
      ],
      output: 'Sebelum: 5 2 9 1 6\nSesudah: 1 2 5 6 9',
    },
    notes: [
      'Hindari bubble sort untuk data besar. Gunakan std::sort atau merge sort.',
      'Optimasi ditukar membuat bubble sort efisien untuk data yang hampir terurut.',
    ],
  },
  {
    id: 'f4-selection-sort',
    description:
      'Selection sort berulang kali memilih elemen terkecil dari bagian yang belum terurut lalu menempatkannya di posisi yang tepat.',
    objectives: [
      'Menelusuri cara kerja selection sort.',
      'Menjelaskan jumlah perbandingan dan pertukarannya.',
      'Menyebutkan bahwa selection sort tidak stabil.',
    ],
    explanation: [
      'Selection sort membagi array menjadi bagian terurut di kiri dan belum terurut di kanan. Pada setiap langkah, ia mencari elemen terkecil di bagian belum terurut, lalu menukarnya dengan elemen pertama bagian tersebut. Bagian terurut pun bertambah satu.',
      'Selalu O(n²) perbandingan, bahkan pada data yang sudah terurut. Keunggulannya adalah hanya melakukan paling banyak n - 1 pertukaran, yang berguna jika penulisan data mahal. Algoritma ini tidak stabil karena pertukaran jarak jauh bisa mengubah urutan relatif elemen yang sama.',
    ],
    sectionsTitle: 'Ringkasan',
    sections: [
      { title: 'Kompleksitas', body: 'O(n²) pada semua kasus. Memori O(1).' },
      { title: 'Pertukaran', body: 'Maksimal n - 1 pertukaran.' },
      { title: 'Stabil', body: 'Tidak.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <algorithm>
#include <iostream>
#include <vector>

void selectionSort(std::vector<int> &data) {
    int n = (int)data.size();
    for (int i = 0; i < n - 1; i++) {
        int terkecil = i;
        for (int j = i + 1; j < n; j++) {
            if (data[j] < data[terkecil]) {
                terkecil = j;
            }
        }
        if (terkecil != i) {
            std::swap(data[i], data[terkecil]);
        }
    }
}

void cetak(const std::vector<int> &data) {
    for (int i = 0; i < (int)data.size(); i++) {
        std::cout << data[i] << (i + 1 < (int)data.size() ? " " : "\n");
    }
}

int main() {
    std::vector<int> data = {64, 25, 12, 22, 11};

    std::cout << "Sebelum: ";
    cetak(data);
    selectionSort(data);
    std::cout << "Sesudah: ";
    cetak(data);
    return 0;
}`,
      explanation: [
        'Untuk setiap posisi i, loop dalam mencari indeks nilai terkecil dari i sampai akhir.',
        'Elemen terkecil ditukar ke posisi i, sehingga bagian kiri selalu terurut.',
        'Pertukaran hanya dilakukan jika perlu, yaitu ketika terkecil berbeda dari i.',
      ],
      output: 'Sebelum: 64 25 12 22 11\nSesudah: 11 12 22 25 64',
    },
    notes: [
      'Jumlah perbandingan tidak bergantung pada kondisi awal data.',
      'Cocok jika jumlah pertukaran harus sesedikit mungkin.',
    ],
  },
  {
    id: 'f4-insertion-sort',
    description:
      'Insertion sort menyisipkan setiap elemen ke posisi yang tepat pada bagian kiri yang sudah terurut, seperti menyusun kartu di tangan.',
    objectives: [
      'Menelusuri cara kerja insertion sort.',
      'Menjelaskan mengapa cepat pada data hampir terurut.',
      'Menyebutkan sifat stabil dan kompleksitasnya.',
    ],
    explanation: [
      'Insertion sort bekerja seperti menyusun kartu: ambil satu kartu, lalu sisipkan ke posisi yang benar di antara kartu yang sudah terurut dengan menggeser kartu yang lebih besar ke kanan. Bagian kiri array selalu terurut.',
      'Pada kasus terburuk (data terbalik) kompleksitasnya O(n²), tetapi pada data yang hampir terurut hanya mendekati O(n) karena sedikit penggeseran. Insertion sort stabil, tidak butuh memori tambahan, dan sering dipakai sebagai tahap akhir pada algoritma hibrida karena cepat untuk data kecil.',
    ],
    sectionsTitle: 'Ringkasan',
    sections: [
      { title: 'Kompleksitas', body: 'Terbaik O(n), rata-rata dan terburuk O(n²). Memori O(1).' },
      { title: 'Stabil', body: 'Ya.' },
      { title: 'Kelebihan', body: 'Cepat untuk data kecil atau hampir terurut, dan bisa mengurutkan data yang datang satu per satu.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <iostream>
#include <vector>

void insertionSort(std::vector<int> &data) {
    for (int i = 1; i < (int)data.size(); i++) {
        int kunci = data[i];
        int j = i - 1;
        while (j >= 0 && data[j] > kunci) {
            data[j + 1] = data[j];
            j--;
        }
        data[j + 1] = kunci;
    }
}

void cetak(const std::vector<int> &data) {
    for (int i = 0; i < (int)data.size(); i++) {
        std::cout << data[i] << (i + 1 < (int)data.size() ? " " : "\n");
    }
}

int main() {
    std::vector<int> data = {12, 11, 13, 5, 6};

    std::cout << "Sebelum: ";
    cetak(data);
    insertionSort(data);
    std::cout << "Sesudah: ";
    cetak(data);
    return 0;
}`,
      explanation: [
        'kunci adalah elemen yang akan disisipkan, dan bagian sebelum indeks i sudah terurut.',
        'Loop while menggeser elemen yang lebih besar dari kunci satu langkah ke kanan.',
        'Setelah ruangnya terbuka, kunci ditaruh di posisi j + 1.',
      ],
      output: 'Sebelum: 12 11 13 5 6\nSesudah: 5 6 11 12 13',
    },
    notes: [
      'Menggeser lebih efisien daripada menukar berulang kali.',
      'Banyak implementasi std::sort memakai insertion sort untuk bagian data yang kecil.',
    ],
  },
  {
    id: 'f4-merge-sort',
    description:
      'Merge sort membagi data menjadi dua, mengurutkan masing-masing secara rekursif, lalu menggabungkan hasilnya.',
    objectives: [
      'Menjelaskan strategi divide and conquer pada merge sort.',
      'Mengimplementasikan penggabungan dua bagian terurut.',
      'Menyebutkan kompleksitas O(n log n) dan kebutuhan memori tambahan.',
    ],
    explanation: [
      'Merge sort membagi array menjadi dua bagian sama besar, mengurutkan keduanya secara rekursif, lalu menggabungkan dua bagian terurut itu menjadi satu. Rekursi berhenti ketika bagian hanya berisi satu elemen, karena satu elemen sudah pasti terurut.',
      'Penggabungan membandingkan elemen terdepan kedua bagian dan mengambil yang lebih kecil, sehingga membutuhkan O(n). Karena tinggi rekursi log n dan setiap tingkat memproses n elemen, total waktunya O(n log n) pada semua kasus.',
      'Kelebihannya waktu yang dapat diprediksi dan stabil. Kekurangannya butuh memori tambahan O(n) untuk penggabungan.',
    ],
    sectionsTitle: 'Ringkasan',
    sections: [
      { title: 'Kompleksitas', body: 'O(n log n) pada kasus terbaik, rata-rata, dan terburuk. Memori O(n).' },
      { title: 'Stabil', body: 'Ya, jika saat nilai sama elemen dari bagian kiri diambil lebih dulu.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <cstddef>
#include <iostream>
#include <vector>

void gabung(std::vector<int> &data, int kiri, int tengah, int kanan) {
    std::vector<int> bagianKiri(data.begin() + kiri, data.begin() + tengah + 1);
    std::vector<int> bagianKanan(data.begin() + tengah + 1, data.begin() + kanan + 1);

    std::size_t i = 0;
    std::size_t j = 0;
    int k = kiri;

    while (i < bagianKiri.size() && j < bagianKanan.size()) {
        if (bagianKiri[i] <= bagianKanan[j]) {
            data[k++] = bagianKiri[i++];
        } else {
            data[k++] = bagianKanan[j++];
        }
    }
    while (i < bagianKiri.size()) {
        data[k++] = bagianKiri[i++];
    }
    while (j < bagianKanan.size()) {
        data[k++] = bagianKanan[j++];
    }
}

void mergeSort(std::vector<int> &data, int kiri, int kanan) {
    if (kiri >= kanan) {
        return;
    }
    int tengah = kiri + (kanan - kiri) / 2;
    mergeSort(data, kiri, tengah);
    mergeSort(data, tengah + 1, kanan);
    gabung(data, kiri, tengah, kanan);
}

int main() {
    std::vector<int> data = {38, 27, 43, 3, 9, 82, 10};

    mergeSort(data, 0, (int)data.size() - 1);

    for (int i = 0; i < (int)data.size(); i++) {
        std::cout << data[i] << (i + 1 < (int)data.size() ? " " : "\n");
    }
    return 0;
}`,
      explanation: [
        'mergeSort membagi rentang [kiri, kanan] menjadi dua dan memanggil dirinya sendiri untuk masing-masing.',
        'gabung menyalin dua bagian ke vector sementara, lalu menulis kembali elemen terkecil terlebih dahulu.',
        'Dua loop terakhir menyalin sisa elemen dari bagian yang belum habis.',
      ],
      output: '3 9 10 27 38 43 82',
    },
    notes: [
      'Merge sort sangat cocok untuk mengurutkan data besar yang disimpan di berkas karena akses berurutan.',
      'Gunakan <= saat membandingkan agar elemen sama dari bagian kiri tetap lebih dulu (stabil).',
    ],
  },
  {
    id: 'f4-quick-sort',
    description:
      'Quick sort memilih elemen pivot, memisahkan elemen yang lebih kecil dan lebih besar, lalu mengurutkan kedua bagian secara rekursif.',
    objectives: [
      'Menjelaskan proses partisi dengan pivot.',
      'Mengimplementasikan quick sort dengan skema Lomuto.',
      'Menjelaskan kasus terburuk O(n²) dan cara menghindarinya.',
    ],
    explanation: [
      'Quick sort memilih satu elemen sebagai pivot, lalu menyusun ulang array sehingga semua elemen yang lebih kecil berada di kiri pivot dan yang lebih besar di kanan. Setelah partisi, pivot sudah berada di posisi akhirnya. Kedua sisi lalu diurutkan secara rekursif.',
      'Rata-rata O(n log n) dan dalam praktik sangat cepat karena bekerja langsung pada array tanpa memori tambahan yang besar. Namun jika pivot selalu elemen terkecil atau terbesar (misalnya data sudah terurut dengan pivot elemen terakhir), partisi menjadi sangat timpang dan waktunya turun ke O(n²).',
      'Cara menghindarinya: pilih pivot acak atau median-dari-tiga. Quick sort tidak stabil.',
    ],
    sectionsTitle: 'Ringkasan',
    sections: [
      { title: 'Kompleksitas', body: 'Rata-rata dan terbaik O(n log n), terburuk O(n²). Memori rekursi rata-rata O(log n).' },
      { title: 'Stabil', body: 'Tidak.' },
      { title: 'Pemilihan pivot', body: 'Pivot elemen terakhir sederhana, tetapi pivot acak atau median-dari-tiga lebih tahan terhadap data terurut.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <algorithm>
#include <iostream>
#include <vector>

int partisi(std::vector<int> &data, int rendah, int tinggi) {
    int pivot = data[tinggi];
    int i = rendah - 1;

    for (int j = rendah; j < tinggi; j++) {
        if (data[j] < pivot) {
            i++;
            std::swap(data[i], data[j]);
        }
    }
    std::swap(data[i + 1], data[tinggi]);
    return i + 1;
}

void quickSort(std::vector<int> &data, int rendah, int tinggi) {
    if (rendah < tinggi) {
        int posisiPivot = partisi(data, rendah, tinggi);
        quickSort(data, rendah, posisiPivot - 1);
        quickSort(data, posisiPivot + 1, tinggi);
    }
}

int main() {
    std::vector<int> data = {10, 80, 30, 90, 40, 50, 70};

    quickSort(data, 0, (int)data.size() - 1);

    for (int i = 0; i < (int)data.size(); i++) {
        std::cout << data[i] << (i + 1 < (int)data.size() ? " " : "\n");
    }
    return 0;
}`,
      explanation: [
        'partisi memakai elemen terakhir sebagai pivot, lalu memindahkan semua elemen yang lebih kecil ke bagian kiri.',
        'Setelah loop, pivot ditukar ke posisi i + 1 dan posisinya dikembalikan sebagai posisi final.',
        'quickSort memanggil dirinya untuk bagian kiri dan kanan pivot, tanpa menyertakan pivot yang sudah final.',
      ],
      output: '10 30 40 50 70 80 90',
    },
    notes: [
      'Hindari pivot elemen pertama atau terakhir jika data sering sudah terurut.',
      'std::sort pada C++ memakai varian hibrida (introsort) yang menggabungkan quick sort, heap sort, dan insertion sort.',
    ],
  },
  {
    id: 'f4-heap-sort',
    description:
      'Heap sort membangun max-heap dari data, lalu berulang kali memindahkan elemen terbesar ke akhir array.',
    objectives: [
      'Membangun max-heap dari array.',
      'Mengimplementasikan heapify.',
      'Menjelaskan kompleksitas O(n log n) tanpa memori tambahan.',
    ],
    explanation: [
      'Heap sort memanfaatkan max-heap. Pertama, ubah array menjadi max-heap sehingga elemen terbesar berada di indeks 0. Lalu tukar elemen terbesar dengan elemen terakhir, kurangi ukuran heap, dan perbaiki heap dengan heapify. Ulangi sampai seluruh array terurut menaik.',
      'Membangun heap membutuhkan O(n), dan setiap pengambilan membutuhkan O(log n), sehingga totalnya O(n log n) pada semua kasus. Heap sort bekerja di tempat (O(1) memori tambahan), tetapi tidak stabil dan biasanya sedikit lebih lambat dari quick sort pada praktik.',
    ],
    sectionsTitle: 'Ringkasan',
    sections: [
      { title: 'Kompleksitas', body: 'O(n log n) pada semua kasus. Memori O(1).' },
      { title: 'Stabil', body: 'Tidak.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <algorithm>
#include <iostream>
#include <vector>

void heapify(std::vector<int> &data, int n, int i) {
    int terbesar = i;
    int kiri = 2 * i + 1;
    int kanan = 2 * i + 2;

    if (kiri < n && data[kiri] > data[terbesar]) {
        terbesar = kiri;
    }
    if (kanan < n && data[kanan] > data[terbesar]) {
        terbesar = kanan;
    }
    if (terbesar != i) {
        std::swap(data[i], data[terbesar]);
        heapify(data, n, terbesar);
    }
}

void heapSort(std::vector<int> &data) {
    int n = (int)data.size();

    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(data, n, i);
    }
    for (int i = n - 1; i > 0; i--) {
        std::swap(data[0], data[i]);
        heapify(data, i, 0);
    }
}

int main() {
    std::vector<int> data = {12, 11, 13, 5, 6, 7};

    heapSort(data);

    for (int i = 0; i < (int)data.size(); i++) {
        std::cout << data[i] << (i + 1 < (int)data.size() ? " " : "\n");
    }
    return 0;
}`,
      explanation: [
        'Loop pertama memanggil heapify dari node induk terakhir ke akar untuk membangun max-heap.',
        'Loop kedua menukar akar (terbesar) dengan elemen di posisi i, lalu memperbaiki heap pada ukuran yang lebih kecil.',
        'heapify menurunkan elemen ke posisi yang benar dengan menukarnya dengan anak yang lebih besar.',
      ],
      output: '5 6 7 11 12 13',
    },
    notes: [
      'Elemen di belakang indeks i sudah berada di posisi final dan tidak ikut diproses lagi.',
      'Heap sort menjamin O(n log n) bahkan pada kasus terburuk.',
    ],
  },
  {
    id: 'f4-counting-sort',
    description:
      'Counting sort mengurutkan bilangan bulat dengan menghitung kemunculan setiap nilai, tanpa membandingkan antar-elemen.',
    objectives: [
      'Menjelaskan cara kerja penghitungan frekuensi.',
      'Mengimplementasikan counting sort untuk bilangan bulat tak negatif.',
      'Menyebutkan syarat dan kompleksitas O(n + k).',
    ],
    explanation: [
      'Counting sort tidak membandingkan elemen. Ia membuat array penghitung berukuran k + 1 (k adalah nilai maksimum), menghitung berapa kali setiap nilai muncul, lalu menuliskan nilai-nilai itu kembali sesuai urutan dan jumlah kemunculannya.',
      'Waktunya O(n + k) dan memori O(k). Algoritma ini sangat cepat jika rentang nilai k kecil dibandingkan jumlah data n, misalnya mengurutkan umur atau nilai ujian. Jika k sangat besar (misalnya nilai sampai miliaran), memorinya tidak praktis.',
      'Versi sederhana di sini cukup untuk bilangan bulat. Untuk mengurutkan objek berdasarkan kunci secara stabil, dibutuhkan versi dengan penjumlahan kumulatif.',
    ],
    sectionsTitle: 'Ringkasan',
    sections: [
      { title: 'Syarat', body: 'Data berupa bilangan bulat dalam rentang yang terbatas dan diketahui.' },
      { title: 'Kompleksitas', body: 'Waktu O(n + k), memori O(k).' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <iostream>
#include <vector>

std::vector<int> countingSort(const std::vector<int> &data, int maks) {
    std::vector<int> hitung(maks + 1, 0);
    for (int x : data) {
        hitung[x]++;
    }

    std::vector<int> hasil;
    for (int nilai = 0; nilai <= maks; nilai++) {
        for (int k = 0; k < hitung[nilai]; k++) {
            hasil.push_back(nilai);
        }
    }
    return hasil;
}

int main() {
    std::vector<int> data = {4, 2, 2, 8, 3, 3, 1};
    std::vector<int> terurut = countingSort(data, 8);

    for (int i = 0; i < (int)terurut.size(); i++) {
        std::cout << terurut[i] << (i + 1 < (int)terurut.size() ? " " : "\n");
    }
    return 0;
}`,
      explanation: [
        'hitung[x] menyimpan berapa kali nilai x muncul. Misalnya hitung[2] bernilai 2.',
        'Loop kedua menulis setiap nilai sebanyak jumlah kemunculannya, dari nilai terkecil ke terbesar.',
        'Tidak ada perbandingan antar-elemen sama sekali. Karena itu counting sort bisa lebih cepat dari batas O(n log n) algoritma berbasis perbandingan.',
      ],
      output: '1 2 2 3 3 4 8',
    },
    notes: [
      'Nilai negatif tidak bisa dipakai langsung sebagai indeks. Geser semua nilai dengan menambahkan nilai minimumnya.',
      'Pastikan maks benar-benar sama atau lebih besar dari nilai terbesar pada data.',
    ],
  },
  {
    id: 'f4-divide-and-conquer',
    description:
      'Divide and conquer memecah masalah menjadi sub-masalah yang lebih kecil, menyelesaikannya, lalu menggabungkan hasilnya.',
    objectives: [
      'Menjelaskan tiga langkah: divide, conquer, dan combine.',
      'Mengenali contoh divide and conquer.',
      'Menerapkannya pada perhitungan pangkat yang cepat.',
    ],
    explanation: [
      'Strategi ini terdiri dari tiga langkah: bagi masalah menjadi sub-masalah yang lebih kecil dan serupa (divide), selesaikan setiap sub-masalah secara rekursif (conquer), lalu gabungkan hasilnya (combine). Rekursi berhenti pada sub-masalah yang cukup kecil untuk langsung dijawab.',
      'Contohnya: binary search (membuang separuh data), merge sort (membagi dua lalu menggabungkan), quick sort, dan perhitungan pangkat cepat. Pada pangkat cepat, a^n dihitung dari a^(n/2) yang dikuadratkan, sehingga hanya butuh O(log n) perkalian, bukan n perkalian.',
      'Kompleksitas biasanya dianalisis lewat persamaan rekurens, misalnya T(n) = 2T(n/2) + n untuk merge sort yang menghasilkan O(n log n).',
    ],
    sectionsTitle: 'Tiga Langkah',
    sections: [
      { title: 'Divide', body: 'Pecah masalah menjadi bagian yang lebih kecil.' },
      { title: 'Conquer', body: 'Selesaikan setiap bagian, biasanya dengan rekursi.' },
      { title: 'Combine', body: 'Gabungkan jawaban bagian-bagian menjadi jawaban akhir.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <iostream>

long long pangkat(long long dasar, int eksponen) {
    if (eksponen == 0) {
        return 1;
    }
    long long setengah = pangkat(dasar, eksponen / 2);
    if (eksponen % 2 == 0) {
        return setengah * setengah;
    }
    return setengah * setengah * dasar;
}

int main() {
    std::cout << "2^10 = " << pangkat(2, 10) << "\n";
    std::cout << "3^5 = " << pangkat(3, 5) << "\n";
    return 0;
}`,
      explanation: [
        'Divide: a^n dipecah menjadi a^(n/2). Base case: a^0 = 1.',
        'Combine: jika n genap hasilnya setengah x setengah, jika ganjil dikalikan satu dasar lagi.',
        '2^10 hanya butuh sekitar 4 pemanggilan rekursif, bukan 10 perkalian.',
      ],
      output: '2^10 = 1024\n3^5 = 243',
    },
    notes: [
      'Pastikan sub-masalah benar-benar lebih kecil di setiap langkah.',
      'Hasil pangkat tumbuh sangat cepat. Waspadai overflow pada tipe long long.',
    ],
  },
  {
    id: 'f4-greedy-algorithm',
    description:
      'Algoritma greedy selalu memilih pilihan terbaik saat ini dengan harapan menghasilkan solusi terbaik secara keseluruhan.',
    objectives: [
      'Menjelaskan ide pilihan lokal terbaik.',
      'Menerapkan greedy pada masalah penukaran koin.',
      'Mengenali bahwa greedy tidak selalu menghasilkan solusi optimal.',
    ],
    explanation: [
      'Algoritma greedy membangun solusi langkah demi langkah dengan selalu mengambil pilihan yang terlihat paling menguntungkan saat itu, tanpa menyesalinya kemudian. Hasilnya cepat dan sederhana, tetapi tidak selalu optimal.',
      'Greedy bekerja jika masalahnya memiliki sifat pilihan greedy dan substruktur optimal. Contoh yang terbukti benar: penjadwalan aktivitas, kode Huffman, dan algoritma Kruskal serta Prim untuk pohon rentang minimum. Pada penukaran koin dengan pecahan 50, 20, 10, 5, 1, greedy memberikan jumlah koin terkecil.',
      'Namun dengan pecahan {1, 3, 4} dan nilai 6, greedy memilih 4 + 1 + 1 (tiga koin), padahal 3 + 3 (dua koin) lebih baik. Untuk kasus seperti ini dibutuhkan dynamic programming.',
    ],
    sectionsTitle: 'Kapan Greedy Benar',
    sections: [
      { title: 'Sifat pilihan greedy', body: 'Pilihan lokal terbaik dapat menjadi bagian dari solusi optimal global.' },
      { title: 'Substruktur optimal', body: 'Solusi optimal berisi solusi optimal untuk sub-masalahnya.' },
      { title: 'Peringatan', body: 'Buktikan atau uji dulu. Greedy yang salah menghasilkan jawaban yang tampak masuk akal tetapi tidak optimal.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <iostream>
#include <vector>

int main() {
    std::vector<int> koin = {50, 20, 10, 5, 1};
    int sisa = 87;
    int total = 0;

    for (int nilai : koin) {
        int jumlah = sisa / nilai;
        sisa %= nilai;
        if (jumlah > 0) {
            std::cout << "Koin " << nilai << ": " << jumlah << "\n";
            total += jumlah;
        }
    }
    std::cout << "Total koin: " << total << "\n";
    return 0;
}`,
      explanation: [
        'Koin diurutkan dari terbesar. Pada setiap langkah, ambil sebanyak mungkin koin terbesar yang masih muat.',
        '87 = 50 + 20 + 10 + 5 + 1 + 1, sehingga totalnya 6 koin.',
        'Pilihan terbesar yang tersedia dipilih lebih dulu dan tidak pernah dibatalkan, itulah ciri greedy.',
      ],
      output: 'Koin 50: 1\nKoin 20: 1\nKoin 10: 1\nKoin 5: 1\nKoin 1: 2\nTotal koin: 6',
    },
    notes: [
      'Daftar koin harus terurut menurun agar algoritma bekerja seperti di atas.',
      'Untuk pecahan acak seperti {1, 3, 4}, gunakan dynamic programming.',
    ],
  },
  {
    id: 'f4-dynamic-programming',
    description:
      'Dynamic programming menyelesaikan masalah dengan menyimpan hasil sub-masalah yang tumpang tindih agar tidak dihitung berulang.',
    objectives: [
      'Mengenali sub-masalah yang tumpang tindih dan substruktur optimal.',
      'Menerapkan pendekatan tabulasi (bottom-up).',
      'Membandingkan efisiensinya dengan rekursi naif.',
    ],
    explanation: [
      'Rekursi naif untuk Fibonacci menghitung nilai yang sama berkali-kali sehingga waktunya eksponensial. Dynamic programming (DP) menyimpan hasil setiap sub-masalah sekali saja lalu memakainya kembali. Dua syarat utama: sub-masalah yang tumpang tindih, dan substruktur optimal.',
      'Ada dua gaya. Memoization (top-down) tetap memakai rekursi tetapi menyimpan hasil di tabel. Tabulasi (bottom-up) mengisi tabel dari sub-masalah terkecil menuju yang dicari, tanpa rekursi. Fibonacci ke-n dengan tabulasi hanya butuh O(n) waktu.',
      'Langkah umum menyusun DP: definisikan arti setiap sel tabel, tentukan hubungan antar-sel (rekurens), tentukan nilai awal, lalu isi tabel dengan urutan yang benar.',
    ],
    sectionsTitle: 'Langkah Menyusun DP',
    sections: [
      { title: '1. Definisikan keadaan', body: 'Apa arti tabel[i]? Pada Fibonacci, tabel[i] adalah bilangan Fibonacci ke-i.' },
      { title: '2. Tentukan hubungan', body: 'tabel[i] = tabel[i - 1] + tabel[i - 2].' },
      { title: '3. Nilai awal dan urutan', body: 'tabel[0] = 0 dan tabel[1] = 1, lalu isi dari i = 2 sampai n.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <iostream>
#include <vector>

long long fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    std::vector<long long> tabel(n + 1);
    tabel[0] = 0;
    tabel[1] = 1;
    for (int i = 2; i <= n; i++) {
        tabel[i] = tabel[i - 1] + tabel[i - 2];
    }
    return tabel[n];
}

int main() {
    std::cout << "fib(10) = " << fibonacci(10) << "\n";
    std::cout << "fib(50) = " << fibonacci(50) << "\n";
    return 0;
}`,
      explanation: [
        'tabel[i] menyimpan bilangan Fibonacci ke-i, dihitung sekali dari dua nilai sebelumnya.',
        'Total hanya n langkah, sedangkan rekursi naif untuk n = 50 membutuhkan puluhan miliar pemanggilan.',
        'Tipe long long dipakai karena fib(50) sudah berukuran 12 miliar lebih.',
      ],
      output: 'fib(10) = 55\nfib(50) = 12586269025',
    },
    notes: [
      'Memori bisa dihemat menjadi O(1) dengan hanya menyimpan dua nilai terakhir.',
      'Kesulitan utama DP adalah merumuskan keadaan dan hubungannya, bukan menulis kodenya.',
    ],
  },
  {
    id: 'f4-backtracking',
    description:
      'Backtracking mencoba solusi secara bertahap dan mundur (backtrack) ketika pilihan saat ini tidak mungkin mengarah ke solusi.',
    objectives: [
      'Menjelaskan pola pilih, jelajahi, dan batalkan.',
      'Menulis algoritma pembangkit permutasi dengan backtracking.',
      'Menjelaskan manfaat pemangkasan (pruning).',
    ],
    explanation: [
      'Backtracking menjelajahi ruang solusi seperti pohon keputusan. Pada setiap langkah kita membuat satu pilihan, melanjutkan ke langkah berikutnya, dan jika buntu atau sudah selesai, kita membatalkan pilihan itu lalu mencoba pilihan lain. Polanya: pilih, jelajahi, batalkan.',
      'Berbeda dari brute force murni, backtracking dapat memangkas cabang yang sudah pasti tidak valid sehingga banyak kemungkinan tidak perlu diperiksa. Contoh klasik: N-Queens, Sudoku, mencari jalan di labirin, dan membangkitkan permutasi atau kombinasi.',
      'Pada pembangkit permutasi berikut, kita menukar elemen ke posisi saat ini (pilih), memanggil rekursi untuk posisi berikutnya (jelajahi), lalu menukar kembali (batalkan) agar keadaan array pulih untuk percobaan berikutnya.',
    ],
    sectionsTitle: 'Pola Backtracking',
    sections: [
      { title: 'Pilih', body: 'Buat satu pilihan yang valid untuk langkah saat ini.' },
      { title: 'Jelajahi', body: 'Lanjutkan ke langkah berikutnya secara rekursif.' },
      { title: 'Batalkan', body: 'Kembalikan keadaan seperti semula agar pilihan lain bisa dicoba.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <algorithm>
#include <iostream>
#include <vector>

void permutasi(std::vector<int> &data, int mulai) {
    if (mulai == (int)data.size()) {
        for (int i = 0; i < (int)data.size(); i++) {
            std::cout << data[i] << (i + 1 < (int)data.size() ? " " : "\n");
        }
        return;
    }
    for (int i = mulai; i < (int)data.size(); i++) {
        std::swap(data[mulai], data[i]);
        permutasi(data, mulai + 1);
        std::swap(data[mulai], data[i]);
    }
}

int main() {
    std::vector<int> data = {1, 2, 3};
    permutasi(data, 0);
    return 0;
}`,
      explanation: [
        'Base case: jika semua posisi sudah terisi, cetak satu permutasi.',
        'Pilih: tukar elemen i ke posisi mulai. Jelajahi: panggil permutasi untuk posisi berikutnya.',
        'Batalkan: tukar kembali sehingga array kembali seperti sebelum percobaan.',
        'Untuk 3 elemen terdapat 3! = 6 permutasi.',
      ],
      output: '1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 2 1\n3 1 2',
    },
    notes: [
      'Tanpa langkah batalkan, array tidak pulih dan hasilnya salah.',
      'Semakin awal sebuah cabang bisa dipangkas, semakin besar penghematan waktunya.',
    ],
  },
  {
    id: 'f4-branch-and-bound',
    description:
      'Branch and bound menjelajahi ruang solusi dan memangkas cabang yang batas terbaiknya tidak mungkin mengalahkan solusi terbaik yang sudah ditemukan.',
    objectives: [
      'Menjelaskan konsep branching dan bounding.',
      'Menghitung batas atas dengan relaksasi sederhana.',
      'Menerapkannya pada masalah knapsack 0/1.',
    ],
    explanation: [
      'Branch and bound dipakai untuk masalah optimasi. Branching memecah masalah menjadi kemungkinan-kemungkinan lebih kecil (misalnya "ambil barang ini" atau "lewati"). Bounding menghitung perkiraan hasil terbaik yang masih mungkin dicapai dari cabang tersebut. Jika perkiraan itu tidak lebih baik dari solusi terbaik saat ini, cabang dipangkas.',
      'Pada knapsack 0/1, batas atas didapat dengan relaksasi: boleh mengambil sebagian barang terakhir secara pecahan. Nilai ini tidak pernah lebih kecil dari nilai sebenarnya, sehingga aman dipakai untuk memangkas. Barang diurutkan menurun berdasarkan nilai per berat agar batasnya ketat.',
      'Efektivitas pemangkasan sangat bergantung pada kualitas batas. Pada kasus terburuk tetap eksponensial, tetapi pada banyak kasus nyata jauh lebih cepat daripada backtracking tanpa batas.',
    ],
    sectionsTitle: 'Komponen',
    sections: [
      { title: 'Branching', body: 'Membagi masalah: ambil barang atau lewati barang.' },
      { title: 'Bounding', body: 'Menghitung batas atas nilai yang mungkin dicapai pada cabang tersebut.' },
      { title: 'Pemangkasan', body: 'Jika batas atas kurang dari atau sama dengan solusi terbaik, hentikan cabang.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <iostream>
#include <vector>

struct Barang {
    int berat;
    int nilai;
};

double batasAtas(const std::vector<Barang> &b, int indeks, int sisa, int nilaiSekarang) {
    double batas = nilaiSekarang;
    for (int i = indeks; i < (int)b.size(); i++) {
        if (b[i].berat <= sisa) {
            sisa -= b[i].berat;
            batas += b[i].nilai;
        } else {
            batas += (double)b[i].nilai * sisa / b[i].berat;
            break;
        }
    }
    return batas;
}

void cari(const std::vector<Barang> &b, int indeks, int sisa, int nilaiSekarang, int &terbaik) {
    if (nilaiSekarang > terbaik) {
        terbaik = nilaiSekarang;
    }
    if (indeks == (int)b.size()) {
        return;
    }
    if (batasAtas(b, indeks, sisa, nilaiSekarang) <= terbaik) {
        return;
    }
    if (b[indeks].berat <= sisa) {
        cari(b, indeks + 1, sisa - b[indeks].berat, nilaiSekarang + b[indeks].nilai, terbaik);
    }
    cari(b, indeks + 1, sisa, nilaiSekarang, terbaik);
}

int main() {
    std::vector<Barang> barang = {{10, 60}, {20, 100}, {30, 120}};
    int terbaik = 0;

    cari(barang, 0, 50, 0, terbaik);
    std::cout << "Nilai terbaik: " << terbaik << "\n";
    return 0;
}`,
      explanation: [
        'Barang sudah diurutkan menurun berdasarkan nilai per berat (6, 5, 4).',
        'batasAtas menghitung nilai maksimum yang mungkin, dengan mengizinkan barang terakhir diambil sebagian.',
        'Jika batas atas tidak lebih baik dari terbaik, cabang dipangkas dengan return.',
        'Solusi optimal mengambil barang kedua dan ketiga (berat 50), bernilai 100 + 120 = 220.',
      ],
      output: 'Nilai terbaik: 220',
    },
    notes: [
      'Barang harus terurut menurun berdasarkan nilai per berat agar batas atas valid dan ketat.',
      'Batas yang terlalu longgar tidak salah, tetapi pemangkasannya menjadi kurang efektif.',
    ],
  },
  {
    id: 'f4-bfs',
    description:
      'Breadth-First Search (BFS) menelusuri graph level demi level memakai queue, dan menemukan jalur terpendek pada graph tak berbobot.',
    objectives: [
      'Menjelaskan urutan kunjungan BFS.',
      'Mengimplementasikan BFS dengan queue dan penanda kunjungan.',
      'Menghitung jarak terpendek (jumlah sisi) dari simpul awal.',
    ],
    explanation: [
      'BFS mengunjungi simpul berdasarkan jaraknya dari simpul awal: semua tetangga langsung lebih dulu, lalu tetangga dari tetangga, dan seterusnya. Alat utamanya adalah queue: masukkan simpul awal, lalu berulang kali keluarkan simpul terdepan dan masukkan tetangganya yang belum dikunjungi.',
      'Karena simpul dikunjungi per tingkat, BFS menemukan jalur dengan jumlah sisi paling sedikit pada graph tak berbobot. Kita cukup menyimpan array jarak: jarak tetangga baru adalah jarak simpul saat ini ditambah 1, dan nilai -1 berarti belum dikunjungi.',
      'Kompleksitas O(V + E) dengan adjacency list, dengan V jumlah simpul dan E jumlah sisi. Penanda kunjungan mencegah simpul diproses berulang dan loop tak berhingga pada graph bersiklus.',
    ],
    sectionsTitle: 'Ringkasan',
    sections: [
      { title: 'Struktur data', body: 'Queue untuk antrean simpul dan array jarak sebagai penanda kunjungan.' },
      { title: 'Kompleksitas', body: 'O(V + E) waktu, O(V) memori.' },
      { title: 'Kegunaan', body: 'Jalur terpendek tak berbobot, level pada tree, dan menemukan komponen terhubung.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <iostream>
#include <queue>
#include <vector>

int main() {
    int n = 6;
    std::vector<std::vector<int>> graf(n);
    int sisi[][2] = {{0, 1}, {0, 2}, {1, 3}, {2, 4}, {3, 5}, {4, 5}};
    for (auto &s : sisi) {
        graf[s[0]].push_back(s[1]);
        graf[s[1]].push_back(s[0]);
    }

    std::vector<int> jarak(n, -1);
    std::queue<int> antrean;
    jarak[0] = 0;
    antrean.push(0);

    std::cout << "BFS:";
    while (!antrean.empty()) {
        int u = antrean.front();
        antrean.pop();
        std::cout << " " << u;
        for (int v : graf[u]) {
            if (jarak[v] == -1) {
                jarak[v] = jarak[u] + 1;
                antrean.push(v);
            }
        }
    }
    std::cout << "\n";
    std::cout << "Jarak ke 5: " << jarak[5] << "\n";
    return 0;
}`,
      explanation: [
        'Graph tak berarah dengan 6 simpul disimpan sebagai adjacency list, dengan setiap sisi ditambahkan dua arah.',
        'jarak bernilai -1 berarti belum dikunjungi. Simpul awal berjarak 0.',
        'Simpul dikunjungi per tingkat: 0, lalu 1 dan 2, lalu 3 dan 4, terakhir 5.',
        'Jarak ke simpul 5 adalah 3 sisi, yaitu melalui 0 - 1 - 3 - 5.',
      ],
      output: 'BFS: 0 1 2 3 4 5\nJarak ke 5: 3',
    },
    notes: [
      'Tandai simpul sebagai dikunjungi saat dimasukkan ke queue, bukan saat dikeluarkan, agar tidak masuk dua kali.',
      'BFS tidak cocok untuk graph berbobot. Gunakan Dijkstra.',
    ],
  },
  {
    id: 'f4-dfs',
    description:
      'Depth-First Search (DFS) menelusuri graph sedalam mungkin sebelum kembali, dan secara alami ditulis dengan rekursi.',
    objectives: [
      'Menjelaskan urutan kunjungan DFS.',
      'Mengimplementasikan DFS rekursif dengan penanda kunjungan.',
      'Membedakan DFS dan BFS beserta kegunaannya.',
    ],
    explanation: [
      'DFS memilih satu tetangga, lalu terus masuk lebih dalam ke tetangga berikutnya sampai buntu, baru kembali (backtrack) dan mencoba cabang lain. Secara rekursif, ini berarti: tandai simpul, lalu panggil DFS untuk setiap tetangga yang belum dikunjungi.',
      'Kompleksitasnya sama dengan BFS, yaitu O(V + E), tetapi hasil penelusurannya berbeda. DFS tidak menjamin jalur terpendek. DFS cocok untuk mendeteksi siklus, mencari komponen terhubung, pengurutan topologis, dan menyelesaikan labirin.',
      'Rekursi yang terlalu dalam pada graph besar bisa menyebabkan stack overflow. Dalam kasus itu, DFS dapat ditulis iteratif dengan stack eksplisit.',
    ],
    sectionsTitle: 'BFS vs DFS',
    sections: [
      { title: 'BFS', body: 'Memakai queue, bergerak per tingkat, menemukan jalur terpendek tak berbobot.' },
      { title: 'DFS', body: 'Memakai rekursi atau stack, bergerak sedalam mungkin, cocok untuk siklus dan eksplorasi.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <iostream>
#include <vector>

void dfs(const std::vector<std::vector<int>> &graf, int u, std::vector<bool> &dikunjungi) {
    dikunjungi[u] = true;
    std::cout << " " << u;
    for (int v : graf[u]) {
        if (!dikunjungi[v]) {
            dfs(graf, v, dikunjungi);
        }
    }
}

int main() {
    int n = 6;
    std::vector<std::vector<int>> graf(n);
    int sisi[][2] = {{0, 1}, {0, 2}, {1, 3}, {2, 4}, {3, 5}, {4, 5}};
    for (auto &s : sisi) {
        graf[s[0]].push_back(s[1]);
        graf[s[1]].push_back(s[0]);
    }

    std::vector<bool> dikunjungi(n, false);
    std::cout << "DFS:";
    dfs(graf, 0, dikunjungi);
    std::cout << "\n";
    return 0;
}`,
      explanation: [
        'Graph yang sama dengan contoh BFS dipakai agar perbedaan urutannya terlihat.',
        'Dari 0, DFS masuk ke 1, lalu 3, lalu 5, lalu 4, lalu 2 sebelum kembali.',
        'dikunjungi mencegah simpul diproses ulang pada graph yang memiliki siklus.',
      ],
      output: 'DFS: 0 1 3 5 4 2',
    },
    notes: [
      'Urutan kunjungan bergantung pada urutan tetangga di adjacency list.',
      'DFS bukan algoritma jalur terpendek.',
    ],
  },
  {
    id: 'f4-dijkstra',
    description:
      'Algoritma Dijkstra mencari jarak terpendek dari satu simpul ke semua simpul lain pada graph berbobot non-negatif.',
    objectives: [
      'Menjelaskan relaksasi sisi dan peran priority queue.',
      'Mengimplementasikan Dijkstra dengan priority queue.',
      'Menyebutkan syarat bobot tidak negatif dan kompleksitasnya.',
    ],
    explanation: [
      'Dijkstra bersifat greedy: ia selalu memproses simpul yang jaraknya paling kecil dari simpul awal yang belum final. Untuk setiap tetangga, ia melakukan relaksasi: jika melewati simpul saat ini memberi jarak lebih pendek, perbarui jaraknya.',
      'Priority queue (min-heap) membuat pengambilan simpul berjarak terkecil efisien. Dengan adjacency list dan priority queue, kompleksitasnya O((V + E) log V). Karena memakai pilihan greedy, algoritma ini hanya benar jika semua bobot sisi tidak negatif.',
      'Jika ada bobot negatif, gunakan algoritma Bellman-Ford. Untuk graph tak berbobot, BFS sudah cukup.',
    ],
    sectionsTitle: 'Ringkasan',
    sections: [
      { title: 'Relaksasi', body: 'Jika jarak[u] + bobot < jarak[v], perbarui jarak[v] dan masukkan ke priority queue.' },
      { title: 'Syarat', body: 'Bobot sisi tidak boleh negatif.' },
      { title: 'Kompleksitas', body: 'O((V + E) log V) dengan priority queue.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <functional>
#include <iostream>
#include <queue>
#include <utility>
#include <vector>

using Sisi = std::pair<int, int>;
using Graf = std::vector<std::vector<Sisi>>;

void tambahSisi(Graf &graf, int a, int b, int bobot) {
    graf[a].push_back({b, bobot});
    graf[b].push_back({a, bobot});
}

std::vector<int> dijkstra(const Graf &graf, int awal) {
    const int TAK_HINGGA = 1000000000;
    std::vector<int> jarak(graf.size(), TAK_HINGGA);
    std::priority_queue<Sisi, std::vector<Sisi>, std::greater<Sisi>> antrean;

    jarak[awal] = 0;
    antrean.push({0, awal});

    while (!antrean.empty()) {
        auto [d, u] = antrean.top();
        antrean.pop();
        if (d > jarak[u]) {
            continue;
        }
        for (const auto &[v, bobot] : graf[u]) {
            if (jarak[u] + bobot < jarak[v]) {
                jarak[v] = jarak[u] + bobot;
                antrean.push({jarak[v], v});
            }
        }
    }
    return jarak;
}

int main() {
    Graf graf(5);
    tambahSisi(graf, 0, 1, 4);
    tambahSisi(graf, 0, 2, 1);
    tambahSisi(graf, 2, 1, 2);
    tambahSisi(graf, 1, 3, 1);
    tambahSisi(graf, 2, 3, 5);
    tambahSisi(graf, 3, 4, 3);

    std::vector<int> jarak = dijkstra(graf, 0);
    for (int i = 0; i < (int)jarak.size(); i++) {
        std::cout << "Jarak ke " << i << ": " << jarak[i] << "\n";
    }
    return 0;
}`,
      explanation: [
        'Antrean prioritas dengan std::greater membuat pasangan (jarak, simpul) dengan jarak terkecil keluar lebih dulu.',
        'Jika d > jarak[u], entri itu usang (sudah ada jarak yang lebih baik) sehingga dilewati.',
        'Jarak ke 1 adalah 3 lewat 0 - 2 - 1 (1 + 2), bukan langsung 4. Jarak ke 3 adalah 4 (3 + 1), dan ke 4 adalah 7.',
        'Kode memakai structured bindings, sehingga perlu dikompilasi dengan -std=c++17.',
      ],
      output: 'Jarak ke 0: 0\nJarak ke 1: 3\nJarak ke 2: 1\nJarak ke 3: 4\nJarak ke 4: 7',
    },
    notes: [
      'Pada graph yang bobotnya negatif, Dijkstra bisa memberi hasil salah.',
      'Untuk merekonstruksi jalurnya, simpan simpul pendahulu saat relaksasi.',
    ],
  },
  {
    id: 'f4-floyd-warshall',
    description:
      'Floyd-Warshall menghitung jarak terpendek antara semua pasangan simpul dengan dynamic programming.',
    objectives: [
      'Menjelaskan ide memakai simpul perantara k.',
      'Mengimplementasikan tiga loop bersarang Floyd-Warshall.',
      'Menyebutkan kompleksitas O(V³) dan kapan algoritma ini cocok.',
    ],
    explanation: [
      'Floyd-Warshall menjawab pertanyaan: berapa jarak terpendek antara setiap pasangan simpul? Idenya, untuk setiap simpul k sebagai kemungkinan perantara, periksa apakah jalur i ke k lalu k ke j lebih pendek daripada jarak i ke j yang sudah diketahui.',
      'Tiga loop bersarang (k paling luar, lalu i dan j) menghasilkan kompleksitas O(V³) dan memori O(V²). Algoritma ini sederhana dan dapat menangani bobot negatif (asal tidak ada siklus negatif), sehingga cocok untuk graph kecil sampai menengah ketika kita butuh semua pasangan.',
      'Gunakan nilai tak hingga yang cukup besar tetapi aman dari overflow saat dijumlahkan. Pada contoh dipakai 1.000.000, dan penjumlahan dilewati jika salah satu sisi tak hingga.',
    ],
    sectionsTitle: 'Ringkasan',
    sections: [
      { title: 'Kompleksitas', body: 'Waktu O(V³), memori O(V²).' },
      { title: 'Kelebihan', body: 'Sederhana, menghasilkan semua pasangan, dan mendukung bobot negatif tanpa siklus negatif.' },
      { title: 'Urutan loop', body: 'Loop perantara k harus berada paling luar agar benar.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <iomanip>
#include <iostream>

const int N = 4;
const int INF = 1000000;

int main() {
    int jarak[N][N] = {
        {0, 3, INF, 7},
        {8, 0, 2, INF},
        {5, INF, 0, 1},
        {2, INF, INF, 0},
    };

    for (int k = 0; k < N; k++) {
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                if (jarak[i][k] < INF && jarak[k][j] < INF &&
                    jarak[i][k] + jarak[k][j] < jarak[i][j]) {
                    jarak[i][j] = jarak[i][k] + jarak[k][j];
                }
            }
        }
    }

    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            std::cout << std::setw(4) << jarak[i][j];
        }
        std::cout << "\n";
    }
    return 0;
}`,
      explanation: [
        'jarak[i][j] awalnya berisi bobot sisi langsung, atau INF jika tidak ada sisi.',
        'Untuk setiap perantara k, jarak i ke j diperbarui jika lewat k lebih pendek.',
        'Misalnya jarak 1 ke 0 awalnya 8, tetapi lewat 3 menjadi 3 + 2 = 5.',
        'std::setw(4) membuat kolom sejajar.',
      ],
      output: '   0   3   5   6\n   5   0   2   3\n   3   6   0   1\n   2   5   7   0',
    },
    notes: [
      'Jika setelah selesai ada jarak[i][i] negatif, berarti graph memiliki siklus negatif.',
      'Untuk graph besar dan hanya butuh satu sumber, Dijkstra jauh lebih efisien.',
    ],
  },
  {
    id: 'f4-minimum-spanning-tree',
    description:
      'Minimum Spanning Tree (MST) adalah himpunan sisi yang menghubungkan semua simpul dengan total bobot terkecil tanpa membentuk siklus.',
    objectives: [
      'Menjelaskan pengertian spanning tree dan MST.',
      'Mengimplementasikan algoritma Kruskal dengan union-find.',
      'Menjelaskan mengapa pendekatan greedy benar untuk MST.',
    ],
    explanation: [
      'Spanning tree dari graph terhubung adalah pohon yang mencakup semua simpul memakai V - 1 sisi. Minimum spanning tree adalah spanning tree dengan total bobot terkecil. Contoh penggunaannya: merancang jaringan kabel atau pipa dengan biaya minimum.',
      'Algoritma Kruskal bersifat greedy: urutkan semua sisi menaik berdasarkan bobot, lalu tambahkan satu per satu selama tidak membentuk siklus. Untuk mendeteksi siklus dengan cepat dipakai struktur union-find (disjoint set), yang menyimpan himpunan simpul yang sudah terhubung.',
      'Kompleksitas Kruskal O(E log E), didominasi oleh pengurutan sisi. Algoritma Prim adalah alternatif yang tumbuh dari satu simpul dan cocok untuk graph padat.',
    ],
    sectionsTitle: 'Langkah Kruskal',
    sections: [
      { title: '1. Urutkan sisi', body: 'Dari bobot terkecil ke terbesar.' },
      { title: '2. Periksa siklus', body: 'Jika kedua ujung sisi sudah berada pada himpunan yang sama, sisi dilewati.' },
      { title: '3. Gabungkan', body: 'Jika berbeda, tambahkan sisi ke MST dan gabungkan kedua himpunan.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <algorithm>
#include <iostream>
#include <vector>

struct Sisi {
    int a;
    int b;
    int bobot;
};

int cariInduk(std::vector<int> &induk, int x) {
    while (induk[x] != x) {
        induk[x] = induk[induk[x]];
        x = induk[x];
    }
    return x;
}

int main() {
    std::vector<Sisi> sisi = {{0, 1, 10}, {0, 2, 6}, {0, 3, 5}, {1, 3, 15}, {2, 3, 4}};
    std::sort(sisi.begin(), sisi.end(),
              [](const Sisi &x, const Sisi &y) { return x.bobot < y.bobot; });

    std::vector<int> induk(4);
    for (int i = 0; i < 4; i++) {
        induk[i] = i;
    }

    int total = 0;
    for (const Sisi &s : sisi) {
        int ra = cariInduk(induk, s.a);
        int rb = cariInduk(induk, s.b);
        if (ra != rb) {
            induk[ra] = rb;
            total += s.bobot;
            std::cout << "Sisi: " << s.a << " - " << s.b << " (" << s.bobot << ")\n";
        }
    }
    std::cout << "Total bobot: " << total << "\n";
    return 0;
}`,
      explanation: [
        'Sisi diurutkan menaik berdasarkan bobot: 4, 5, 6, 10, 15.',
        'cariInduk menemukan wakil himpunan sebuah simpul. Jika kedua ujung punya wakil sama, menambah sisi akan membuat siklus.',
        'Sisi 2-3 dan 0-3 diambil, sisi 0-2 dilewati karena akan membentuk siklus, lalu 0-1 diambil.',
        'Total bobot: 4 + 5 + 10 = 19 dengan 3 sisi (V - 1).',
      ],
      output: 'Sisi: 2 - 3 (4)\nSisi: 0 - 3 (5)\nSisi: 0 - 1 (10)\nTotal bobot: 19',
    },
    notes: [
      'MST hanya ada pada graph tak berarah yang terhubung.',
      'Jika bobot ada yang sama, MST bisa lebih dari satu, tetapi total bobotnya tetap sama.',
    ],
  },
  {
    id: 'f4-big-o',
    description:
      'Big O adalah batas atas laju pertumbuhan waktu atau memori algoritma, dan sering dipakai untuk menggambarkan kasus terburuk.',
    objectives: [
      'Menjelaskan definisi Big O sebagai batas atas.',
      'Membandingkan pertumbuhan O(n) dan O(log n) pada input besar.',
      'Membaca kompleksitas dari struktur loop.',
    ],
    explanation: [
      'Secara informal, f(n) adalah O(g(n)) jika untuk n yang cukup besar, f(n) tidak akan melebihi suatu kelipatan konstan dari g(n). Big O memberi jaminan: algoritma tidak akan lebih lambat dari laju pertumbuhan ini. Itulah sebabnya Big O identik dengan analisis kasus terburuk.',
      'Cara praktis membaca Big O dari kode: loop tunggal sebanyak n kali adalah O(n), dua loop bersarang adalah O(n²), dan loop yang menggandakan atau membagi dua variabelnya setiap putaran adalah O(log n). Jika beberapa bagian dijalankan berurutan, ambil bagian yang paling besar pertumbuhannya.',
      'Pada contoh berikut, untuk n = 1000 linear butuh 1000 langkah sedangkan logaritmik hanya 9. Untuk n = 1.000.000 bedanya 1.000.000 berbanding 19. Perbedaan sebesar inilah yang membuat pemilihan algoritma sangat penting.',
    ],
    sectionsTitle: 'Membaca Big O',
    sections: [
      { title: 'Loop tunggal', body: 'for (i = 0; i < n; i++) menghasilkan O(n).' },
      { title: 'Loop bersarang', body: 'Dua loop masing-masing n putaran menghasilkan O(n²).' },
      { title: 'Membagi dua', body: 'while (n > 1) { n /= 2; } menghasilkan O(log n).' },
      { title: 'Berurutan', body: 'Dua bagian berurutan dijumlah, lalu ambil yang dominan: O(n) + O(n²) menjadi O(n²).' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <iostream>

int langkahLinear(int n) {
    int langkah = 0;
    for (int i = 0; i < n; i++) {
        langkah++;
    }
    return langkah;
}

int langkahLogaritmik(int n) {
    int langkah = 0;
    while (n > 1) {
        n /= 2;
        langkah++;
    }
    return langkah;
}

int main() {
    int ukuran[] = {1000, 1000000};
    for (int n : ukuran) {
        std::cout << "n = " << n << ": O(n) = " << langkahLinear(n)
                  << " langkah, O(log n) = " << langkahLogaritmik(n) << " langkah\n";
    }
    return 0;
}`,
      explanation: [
        'langkahLinear menghitung putaran satu loop sebanyak n kali.',
        'langkahLogaritmik membagi n dengan 2 sampai tersisa 1, yaitu sekitar log2(n) langkah.',
        'Untuk n = 1000 hasilnya 9, dan untuk n = 1.000.000 hasilnya 19.',
      ],
      output:
        'n = 1000: O(n) = 1000 langkah, O(log n) = 9 langkah\nn = 1000000: O(n) = 1000000 langkah, O(log n) = 19 langkah',
    },
    notes: [
      'Big O membuang konstanta dan suku yang lebih kecil, sehingga 3n + 10 cukup ditulis O(n).',
      'Big O adalah batas atas. Secara teknis algoritma O(n) juga O(n²), tetapi kita selalu menyebut batas terketat.',
    ],
  },
  {
    id: 'f4-big-omega',
    description:
      'Big Omega adalah batas bawah laju pertumbuhan, yaitu seberapa sedikit pun langkah yang pasti dibutuhkan algoritma.',
    objectives: [
      'Menjelaskan definisi Big Omega sebagai batas bawah.',
      'Menghubungkan Big Omega dengan kasus terbaik.',
      'Membedakan Big O dan Big Omega.',
    ],
    explanation: [
      'Jika Big O adalah batas atas, Big Omega (Ω) adalah batas bawah: f(n) adalah Ω(g(n)) jika untuk n yang cukup besar, f(n) setidaknya sebesar suatu kelipatan konstan dari g(n). Ia menyatakan jumlah langkah minimal yang pasti dibutuhkan.',
      'Big Omega sering dikaitkan dengan kasus terbaik. Linear search pada kasus terbaik menemukan target di posisi pertama, sehingga Ω(1). Namun Big Omega juga bisa menggambarkan batas minimum untuk sebuah masalah: setiap algoritma pengurutan berbasis perbandingan membutuhkan Ω(n log n) perbandingan.',
      'Dengan keduanya kita bisa menjepit laju pertumbuhan: algoritma tidak lebih lambat dari batas atas dan tidak lebih cepat dari batas bawah.',
    ],
    sectionsTitle: 'Perbandingan',
    sections: [
      { title: 'Big O', body: 'Batas atas: tidak akan lebih lambat dari ini. Dipakai untuk kasus terburuk.' },
      { title: 'Big Omega', body: 'Batas bawah: tidak akan lebih cepat dari ini. Sering dikaitkan dengan kasus terbaik.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <iostream>
#include <vector>

int hitungPerbandingan(const std::vector<int> &data, int target) {
    int perbandingan = 0;
    for (int x : data) {
        perbandingan++;
        if (x == target) {
            break;
        }
    }
    return perbandingan;
}

int main() {
    std::vector<int> data = {4, 8, 15, 16, 23, 42};

    std::cout << "Terbaik (target di depan): " << hitungPerbandingan(data, 4) << " perbandingan\n";
    std::cout << "Terburuk (target di belakang): " << hitungPerbandingan(data, 42)
              << " perbandingan\n";
    return 0;
}`,
      explanation: [
        'Jika target berada di posisi pertama, hanya 1 perbandingan yang dibutuhkan: batas bawah Ω(1).',
        'Jika target berada di posisi terakhir, seluruh 6 elemen diperiksa: batas atas O(n).',
        'Linear search dengan demikian Ω(1) dan O(n).',
      ],
      output:
        'Terbaik (target di depan): 1 perbandingan\nTerburuk (target di belakang): 6 perbandingan',
    },
    notes: [
      'Ω tidak sama dengan "kasus terbaik" secara otomatis, tetapi dalam praktik keduanya sering dipakai berdampingan.',
      'Batas bawah untuk sebuah masalah berlaku bagi semua algoritma yang mungkin, bukan satu algoritma saja.',
    ],
  },
  {
    id: 'f4-big-theta',
    description:
      'Big Theta adalah batas ketat: laju pertumbuhan yang terjepit dari atas dan dari bawah oleh fungsi yang sama.',
    objectives: [
      'Menjelaskan definisi Big Theta.',
      'Menentukan kapan sebuah algoritma Θ(n).',
      'Menghubungkan Big O, Omega, dan Theta.',
    ],
    explanation: [
      'Big Theta (Θ) menyatakan bahwa f(n) tumbuh sama cepatnya dengan g(n): f(n) adalah Θ(g(n)) jika f(n) adalah O(g(n)) sekaligus Ω(g(n)). Dengan kata lain, g(n) adalah batas atas dan batas bawah sekaligus, sehingga memberi gambaran laju pertumbuhan yang sebenarnya.',
      'Menjumlahkan semua elemen sebuah array selalu mengunjungi tepat n elemen, apa pun isinya. Tidak ada kasus terbaik atau terburuk yang berbeda, sehingga algoritma ini Θ(n). Sebaliknya, linear search tidak bisa dinyatakan Θ(n) secara umum karena kasus terbaiknya Ω(1) sementara kasus terburuknya O(n).',
      'Ketika orang awam menyebut "O(n)", sering yang dimaksud sebenarnya adalah Θ(n). Memahami perbedaannya membantu berbicara tentang kompleksitas secara tepat.',
    ],
    sectionsTitle: 'Hubungan',
    sections: [
      { title: 'Definisi', body: 'Θ(g) berlaku jika O(g) dan Ω(g) sama-sama berlaku.' },
      { title: 'Contoh Θ(n)', body: 'Menjumlahkan semua elemen, mencari nilai maksimum dengan satu kali penelusuran.' },
      { title: 'Bukan Θ tunggal', body: 'Linear search: Ω(1) dan O(n), sehingga tidak ada satu Θ yang berlaku untuk semua kasus.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <iostream>
#include <vector>

int jumlahkan(const std::vector<int> &data, int &langkah) {
    int total = 0;
    for (int x : data) {
        total += x;
        langkah++;
    }
    return total;
}

int main() {
    std::vector<int> a = {1, 2, 3, 4};
    std::vector<int> b;
    for (int i = 1; i <= 8; i++) {
        b.push_back(i);
    }

    int langkahA = 0;
    int langkahB = 0;
    int totalA = jumlahkan(a, langkahA);
    int totalB = jumlahkan(b, langkahB);

    std::cout << "n = 4: jumlah = " << totalA << ", langkah = " << langkahA << "\n";
    std::cout << "n = 8: jumlah = " << totalB << ", langkah = " << langkahB << "\n";
    return 0;
}`,
      explanation: [
        'Untuk n = 4 langkahnya 4, dan untuk n = 8 langkahnya 8, tepat sebesar n.',
        'Jumlah langkah tidak bergantung pada isi data, hanya pada ukurannya.',
        'Karena batas atas dan batas bawahnya sama (n), fungsi ini Θ(n).',
      ],
      output: 'n = 4: jumlah = 10, langkah = 4\nn = 8: jumlah = 36, langkah = 8',
    },
    notes: [
      'Θ memberi informasi paling lengkap, tetapi tidak semua algoritma memilikinya untuk seluruh kasus.',
      'Konstanta tidak ikut dituliskan: 5n dan n/2 sama-sama Θ(n).',
    ],
  },
  {
    id: 'f4-time-complexity',
    description:
      'Analisis time complexity menghitung bagaimana jumlah langkah algoritma bertumbuh terhadap ukuran input, termasuk pada algoritma rekursif.',
    objectives: [
      'Menghitung jumlah langkah pada loop bersarang.',
      'Mengenali bentuk n(n - 1) / 2 sebagai O(n²).',
      'Menjelaskan persamaan rekurens untuk algoritma divide and conquer.',
    ],
    explanation: [
      'Untuk menganalisis kode iteratif, hitung berapa kali operasi dasar dijalankan sebagai fungsi n. Pada dua loop bersarang di mana loop dalam mulai dari i + 1 (membandingkan setiap pasangan sekali), jumlahnya n(n - 1) / 2. Setelah membuang konstanta dan suku lebih kecil, hasilnya O(n²).',
      'Untuk algoritma rekursif, kita menulis persamaan rekurens. Merge sort: T(n) = 2T(n/2) + n, yaitu dua sub-masalah setengah ukuran ditambah penggabungan linear, yang menghasilkan O(n log n). Binary search: T(n) = T(n/2) + 1 yang menghasilkan O(log n).',
      'Kebiasaan yang baik: tentukan operasi dasar, hitung berapa kali dijalankan pada kasus terburuk, lalu sederhanakan. Selalu bandingkan dengan beberapa nilai n kecil untuk memastikan rumusmu benar.',
    ],
    sectionsTitle: 'Rekurens Umum',
    sections: [
      { title: 'T(n) = T(n/2) + 1', body: 'Membuang separuh data dengan kerja konstan. Hasil: O(log n). Contoh: binary search.' },
      { title: 'T(n) = 2T(n/2) + n', body: 'Dua sub-masalah dan penggabungan linear. Hasil: O(n log n). Contoh: merge sort.' },
      { title: 'T(n) = T(n - 1) + 1', body: 'Mengurangi masalah satu per satu. Hasil: O(n). Contoh: faktorial rekursif.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <iostream>

int hitungPasangan(int n) {
    int langkah = 0;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            langkah++;
        }
    }
    return langkah;
}

int main() {
    std::cout << "n = 10: " << hitungPasangan(10) << " perbandingan\n";
    std::cout << "n = 100: " << hitungPasangan(100) << " perbandingan\n";
    return 0;
}`,
      explanation: [
        'Setiap pasangan (i, j) dengan j > i diperiksa tepat satu kali.',
        'Jumlahnya n(n - 1) / 2: untuk n = 10 adalah 45, dan untuk n = 100 adalah 4950.',
        'Ketika n dikali 10, jumlah langkah naik sekitar 100 kali, ciri khas O(n²).',
      ],
      output: 'n = 10: 45 perbandingan\nn = 100: 4950 perbandingan',
    },
    notes: [
      'Konstanta 1/2 pada n(n - 1) / 2 dibuang pada notasi Big O.',
      'Analisis kasus terburuk memberi jaminan yang paling aman untuk perencanaan.',
    ],
  },
  {
    id: 'f4-space-complexity',
    description:
      'Space complexity mengukur memori tambahan yang dibutuhkan algoritma sebagai fungsi ukuran input, termasuk memori call stack rekursi.',
    objectives: [
      'Membedakan memori input dan memori tambahan.',
      'Menghitung kedalaman rekursi sebagai memori stack.',
      'Membandingkan solusi rekursif dan iteratif dari sisi memori.',
    ],
    explanation: [
      'Space complexity dihitung dari memori tambahan di luar input: variabel bantu, array sementara, dan ruang di call stack saat rekursi. Algoritma yang hanya memakai beberapa variabel termasuk O(1), sedangkan yang membuat salinan data sebesar n adalah O(n).',
      'Setiap pemanggilan fungsi rekursif menempati satu frame di call stack sampai ia selesai. Fungsi jumlahRekursif(n) memanggil dirinya sampai n = 0, sehingga kedalaman stack-nya n + 1 dan memorinya O(n). Versi iteratif dengan satu loop hanya butuh O(1).',
      'Sering terjadi pertukaran antara waktu dan memori: merge sort cepat (O(n log n)) tetapi butuh O(n) memori tambahan, sedangkan heap sort memakai O(1) tetapi sedikit lebih lambat dalam praktik.',
    ],
    sectionsTitle: 'Contoh',
    sections: [
      { title: 'O(1)', body: 'Menjumlahkan elemen dengan loop dan satu variabel total.' },
      { title: 'O(n)', body: 'Membuat array salinan atau rekursi sedalam n.' },
      { title: 'O(log n)', body: 'Rekursi yang membagi dua masalah, seperti binary search rekursif.' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <iostream>

int jumlahRekursif(int n, int kedalaman, int &maksKedalaman) {
    if (kedalaman > maksKedalaman) {
        maksKedalaman = kedalaman;
    }
    if (n == 0) {
        return 0;
    }
    return n + jumlahRekursif(n - 1, kedalaman + 1, maksKedalaman);
}

int jumlahIteratif(int n) {
    int total = 0;
    for (int i = 1; i <= n; i++) {
        total += i;
    }
    return total;
}

int main() {
    int maksKedalaman = 0;
    int hasil = jumlahRekursif(5, 1, maksKedalaman);

    std::cout << "Rekursif: " << hasil << ", kedalaman maksimum: " << maksKedalaman << "\n";
    std::cout << "Iteratif: " << jumlahIteratif(5) << " (memori tambahan konstan)\n";
    return 0;
}`,
      explanation: [
        'jumlahRekursif(5) memanggil dirinya untuk n = 5, 4, 3, 2, 1, lalu 0, sehingga ada 6 frame aktif di puncak rekursi.',
        'Kedalaman tumbuh seiring n, jadi memori stack O(n).',
        'Versi iteratif memakai satu variabel total dan satu penghitung, yaitu O(1).',
      ],
      output: 'Rekursif: 15, kedalaman maksimum: 6\nIteratif: 15 (memori tambahan konstan)',
    },
    notes: [
      'Rekursi yang terlalu dalam menyebabkan stack overflow, sedangkan loop tidak.',
      'Memori input tidak dihitung sebagai memori tambahan.',
    ],
  },
  {
    id: 'f4-best-average-worst-case',
    description:
      'Kasus terbaik, rata-rata, dan terburuk menggambarkan performa algoritma pada kondisi input yang berbeda.',
    objectives: [
      'Membedakan kasus terbaik, rata-rata, dan terburuk.',
      'Menghitung rata-rata perbandingan pada linear search.',
      'Memilih kasus yang tepat untuk menilai sebuah algoritma.',
    ],
    explanation: [
      'Performa algoritma bisa berbeda untuk input berbeda dengan ukuran yang sama. Kasus terbaik adalah input yang membuat algoritma paling cepat, kasus terburuk adalah yang paling lambat, dan kasus rata-rata adalah rata-rata semua kemungkinan input (biasanya dengan asumsi setiap kemungkinan sama mungkin).',
      'Pada linear search dengan n elemen, kasus terbaik 1 perbandingan, kasus terburuk n perbandingan, dan jika target pasti ada pada posisi yang sama kemungkinannya, rata-ratanya (1 + 2 + ... + n) / n = (n + 1) / 2, yaitu sekitar separuh data.',
      'Quick sort adalah contoh klasik: terbaik dan rata-rata O(n log n), tetapi terburuk O(n²). Kasus terburuk memberi jaminan, sedangkan kasus rata-rata menjelaskan perilaku yang biasa kita lihat.',
    ],
    sectionsTitle: 'Contoh Algoritma',
    sections: [
      { title: 'Linear search', body: 'Terbaik O(1), rata-rata O(n), terburuk O(n).' },
      { title: 'Quick sort', body: 'Terbaik dan rata-rata O(n log n), terburuk O(n²).' },
      { title: 'Insertion sort', body: 'Terbaik O(n) pada data terurut, rata-rata dan terburuk O(n²).' },
    ],
    codeExample: {
      language: 'C++',
      code: String.raw`#include <iostream>
#include <vector>

int hitungPerbandingan(const std::vector<int> &data, int target) {
    int perbandingan = 0;
    for (int x : data) {
        perbandingan++;
        if (x == target) {
            break;
        }
    }
    return perbandingan;
}

int main() {
    std::vector<int> data = {9, 4, 7, 1, 6};

    int terbaik = hitungPerbandingan(data, data.front());
    int terburuk = hitungPerbandingan(data, data.back());

    int total = 0;
    for (int x : data) {
        total += hitungPerbandingan(data, x);
    }

    std::cout << "Terbaik: " << terbaik << "\n";
    std::cout << "Terburuk: " << terburuk << "\n";
    std::cout << "Rata-rata: " << (double)total / data.size() << "\n";
    return 0;
}`,
      explanation: [
        'Target di posisi pertama membutuhkan 1 perbandingan (terbaik), dan di posisi terakhir 5 perbandingan (terburuk).',
        'Rata-rata dihitung dengan mencari setiap elemen sekali: (1 + 2 + 3 + 4 + 5) / 5 = 3.',
        'Hasilnya sesuai rumus (n + 1) / 2 = 3, yaitu sekitar separuh data.',
      ],
      output: 'Terbaik: 1\nTerburuk: 5\nRata-rata: 3',
    },
    notes: [
      'Kasus rata-rata bergantung pada asumsi distribusi input. Pastikan asumsinya masuk akal.',
      'Untuk sistem yang menuntut jaminan waktu, gunakan kasus terburuk.',
    ],
  },
];