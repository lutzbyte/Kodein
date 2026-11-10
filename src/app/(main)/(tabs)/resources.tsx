import { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

import { ResourceCard } from '@/components/cards/ResourceCard';
import { AppText } from '@/components/ui/AppText';
import { Chip } from '@/components/ui/Chip';
import { Screen } from '@/components/ui/Screen';
import { SearchInput } from '@/components/ui/SearchInput';
import { colors, layout, spacing } from '@/constants/theme';
import { resources } from '@/data/resources';
import { useOpenResource } from '@/hooks/useOpenResource';
import type { ResourceLanguage, ResourceType } from '@/types/content';

type TypeFilter = 'Semua' | ResourceType;
type LanguageFilter = 'Semua' | ResourceLanguage;

const TYPE_FILTERS: TypeFilter[] = ['Semua', 'YouTube', 'Artikel', 'Dokumentasi', 'Buku', 'Kursus'];
const LANGUAGE_FILTERS: LanguageFilter[] = ['Semua', 'Indonesia', 'Inggris'];

export default function ResourcesScreen() {
  const openResource = useOpenResource();
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('Semua');
  const [languageFilter, setLanguageFilter] = useState<LanguageFilter>('Semua');

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return resources.filter((resource) => {
      if (typeFilter !== 'Semua' && resource.type !== typeFilter) return false;
      if (languageFilter !== 'Semua' && resource.language !== languageFilter) return false;
      if (keyword.length === 0) return true;
      return `${resource.title} ${resource.publisher} ${resource.description}`
        .toLowerCase()
        .includes(keyword);
    });
  }, [query, typeFilter, languageFilter]);

  const emptyMessage =
    typeFilter === 'YouTube'
      ? 'Resource YouTube ditambahkan setelah tautannya diverifikasi di Fase 4.'
      : 'Tidak ada resource yang cocok dengan pencarian atau filter ini.';

  const header = (
    <View style={styles.header}>
      <View style={styles.titles}>
        <AppText variant="title">Resource</AppText>
        <AppText variant="body" color={colors.textSecondary}>
          Kumpulan sumber belajar terbaik untuk mendukung belajarmu.
        </AppText>
      </View>

      <SearchInput value={query} onChangeText={setQuery} placeholder="Cari resource..." />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {TYPE_FILTERS.map((type) => (
          <Chip key={type} label={type} selected={typeFilter === type} onPress={() => setTypeFilter(type)} />
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {LANGUAGE_FILTERS.map((language) => (
          <Chip
            key={language}
            label={language === 'Semua' ? 'Semua bahasa' : language}
            selected={languageFilter === language}
            onPress={() => setLanguageFilter(language)}
          />
        ))}
      </ScrollView>

      <AppText variant="heading">Sumber Belajar ({filtered.length})</AppText>
    </View>
  );

  return (
    <Screen edges={['top']}>
      <FlatList
        data={filtered}
        keyExtractor={(resource) => resource.id}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={header}
        ListEmptyComponent={
          <AppText variant="body" color={colors.textSecondary} align="center" style={styles.empty}>
            {emptyMessage}
          </AppText>
        }
        renderItem={({ item }) => <ResourceCard resource={item} onPress={() => openResource(item)} />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: layout.screenPadding,
    paddingBottom: spacing.xxxl,
  },
  header: {
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  titles: {
    gap: 4,
  },
  chips: {
    gap: spacing.sm,
  },
  separator: {
    height: spacing.md,
  },
  empty: {
    paddingTop: spacing.xxl,
  },
});