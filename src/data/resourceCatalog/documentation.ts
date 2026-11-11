import type { Resource } from '@/types/content';

export const documentationResources: Resource[] = [
  {
    id: 'doc-cppreference',
    title: 'cppreference.com',
    publisher: 'cppreference',
    type: 'Dokumentasi',
    language: 'Inggris',
    difficulty: 'Hard',
    url: 'https://en.cppreference.com/',
    phaseIds: ['f3', 'f4', 'f5', 'f7'],
    lessonIds: ['f3-set-dan-map', 'f4-quick-sort', 'f5-memory-alignment'],
    description: 'Referensi bahasa C dan C++ beserta pustaka standarnya.',
  },
  {
    id: 'doc-python-tutorial',
    title: 'The Python Tutorial',
    publisher: 'Python Software Foundation',
    type: 'Dokumentasi',
    language: 'Inggris',
    difficulty: 'Medium',
    url: 'https://docs.python.org/3/tutorial/',
    phaseIds: ['f6', 'f7', 'f8'],
    lessonIds: ['f7-functional-programming'],
    description:
      'Tutorial resmi Python. Dirancang untuk programmer yang baru mengenal Python, bukan untuk pemula pemrograman.',
  },
  {
    id: 'doc-mdn-http',
    title: 'Overview of HTTP',
    publisher: 'Mozilla (MDN)',
    type: 'Dokumentasi',
    language: 'Inggris',
    difficulty: 'Medium',
    url: 'https://developer.mozilla.org/docs/Web/HTTP/Guides/Overview',
    phaseIds: ['f6', 'f8'],
    lessonIds: ['f6-http-dan-https', 'f6-tcp-ip'],
    description:
      'Penjelasan HTTP sebagai protokol klien-server di atas TCP: komponen, sifat stateless, dan koneksi.',
  },
  {
    id: 'doc-go-tour',
    title: 'A Tour of Go',
    publisher: 'Tim Go',
    type: 'Dokumentasi',
    language: 'Inggris',
    difficulty: 'Easy',
    url: 'https://go.dev/tour/',
    phaseIds: ['f8'],
    lessonIds: ['f8-backend-engineering'],
    description:
      'Tur interaktif resmi bahasa Go: sintaks dasar, struktur data, method, interface, dan konkurensi, bisa dijalankan di browser.',
  },
  {
    id: 'doc-owasp-top10',
    title: 'OWASP Top Ten 2025',
    publisher: 'OWASP',
    type: 'Dokumentasi',
    language: 'Inggris',
    difficulty: 'Medium',
    url: 'https://owasp.org/Top10/2025/0x00_2025-Introduction/',
    phaseIds: ['f8'],
    lessonIds: ['f8-cybersecurity'],
    description:
      'Daftar risiko keamanan aplikasi web paling kritis yang menjadi acuan global bagi developer.',
  },
];