import type { Exercise } from '@/types/content';

export const exercises: Exercise[] = [
  {
    id: 'f1-ex-modulus',
    phaseId: 'f1',
    title: 'Operator Modulus',
    kind: 'multiple-choice',
    difficulty: 'Easy',
    durationMinutes: 5,
    question: 'Operator manakah di bahasa C yang menghasilkan sisa pembagian?',
    options: ['/', '%', '&', '//'],
    correctIndex: 1,
    explanation:
      'Operator % (modulus) menghasilkan sisa pembagian, misalnya 10 % 3 bernilai 1. Operator / menghasilkan hasil bagi, sedangkan // bukan operator di C.',
  },
  {
    id: 'f1-ex-pembagian-integer',
    phaseId: 'f1',
    title: 'Pembagian Integer',
    kind: 'predict-output',
    difficulty: 'Easy',
    durationMinutes: 5,
    question: 'Apa output dari potongan kode berikut?',
    code: ['int a = 7, b = 2;', 'printf("%d", a / b);'].join('\n'),
    options: ['3.5', '3', '4', '2'],
    correctIndex: 1,
    explanation:
      'Karena a dan b bertipe int, hasil pembagian juga int sehingga bagian desimalnya dibuang. 7 / 2 menghasilkan 3.',
  },
  {
    id: 'f1-ex-assignment-vs-perbandingan',
    phaseId: 'f1',
    title: 'Assignment vs Perbandingan',
    kind: 'true-false',
    difficulty: 'Easy',
    durationMinutes: 5,
    question: 'Ekspresi if (x = 5) pada bahasa C membandingkan nilai x dengan 5.',
    options: ['Benar', 'Salah'],
    correctIndex: 1,
    explanation:
      'Tanda = adalah assignment: ia mengisi x dengan 5, lalu nilai ekspresinya (5) dianggap benar. Untuk membandingkan, gunakan ==.',
  },
  {
    id: 'f1-ex-prioritas-operator',
    phaseId: 'f1',
    title: 'Prioritas Operator',
    kind: 'predict-output',
    difficulty: 'Medium',
    durationMinutes: 10,
    question: 'Apa output dari potongan kode berikut?',
    code: ['int x = 2 + 3 * 4;', 'printf("%d", x);'].join('\n'),
    options: ['14', '20', '24', '9'],
    correctIndex: 0,
    explanation:
      'Operator * memiliki prioritas lebih tinggi daripada +. Jadi 3 * 4 dihitung lebih dulu (12), lalu ditambah 2 menjadi 14.',
  },
  {
    id: 'f1-ex-operator-logika',
    phaseId: 'f1',
    title: 'Operator Logika',
    kind: 'multiple-choice',
    difficulty: 'Medium',
    durationMinutes: 10,
    question: 'Berapakah nilai ekspresi (5 > 3) && (2 > 4) di bahasa C?',
    options: ['1', '0', 'true', 'Error kompilasi'],
    correctIndex: 1,
    explanation:
      '(5 > 3) bernilai 1, tetapi (2 > 4) bernilai 0. Operator && hanya menghasilkan 1 jika kedua sisi benar, sehingga hasilnya 0.',
  },
];