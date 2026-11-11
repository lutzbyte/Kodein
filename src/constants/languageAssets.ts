import type { ImageSourcePropType } from 'react-native';

import type { LanguageKey } from '@/utils/language';

/**
 * Daftarkan berkas ikon bahasa milikmu sendiri (PNG atau JPG) di sini.
 * Contoh, setelah berkasnya ada di assets/languages/python.png:
 *
 *   python: require('../../assets/languages/python.png'),
 *
 * Bahasa yang tidak terdaftar memakai ikon vektor bawaan Kodein.
 * Pastikan kamu punya hak atau lisensi untuk memakai berkas yang kamu tambahkan.
 */
export const LANGUAGE_IMAGES: Partial<Record<LanguageKey, ImageSourcePropType>> = {};