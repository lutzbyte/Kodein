import type { LessonContent } from '@/types/content';

export const lessonContents: Record<string, LessonContent> = {
  'f1-operators': {
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
};