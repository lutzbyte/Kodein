import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { colors, spacing } from '@/constants/theme';
import { phases } from '@/data/phases';
import {
  type DifficultyFilter,
  type LanguageFilter,
  type ResourceFilters,
} from '@/utils/resources';
import { getPhaseById } from '@/utils/content';

const LANGUAGES: LanguageFilter[] = ['Semua', 'Indonesia', 'Inggris'];
const DIFFICULTIES: DifficultyFilter[] = ['Semua', 'Easy', 'Medium', 'Hard'];

interface ResourceFilterSheetProps {
  visible: boolean;
  value: ResourceFilters;
  onClose: () => void;
  onApply: (filters: ResourceFilters) => void;
}

interface OptionRowProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

function OptionRow({ label, selected, onPress }: OptionRowProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={styles.option}
    >
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected ? <View style={styles.radioDot} /> : null}
      </View>
      <AppText variant="body" style={styles.optionLabel}>
        {label}
      </AppText>
    </Pressable>
  );
}

export function ResourceFilterSheet({ visible, value, onClose, onApply }: ResourceFilterSheetProps) {
  const [draft, setDraft] = useState<ResourceFilters>(value);

  useEffect(() => {
    if (visible) setDraft(value);
  }, [visible, value]);

  const selectedPhase = draft.phaseId ? getPhaseById(draft.phaseId) : undefined;

  const reset = () =>
    setDraft((previous) => ({
      ...previous,
      language: 'Semua',
      difficulty: 'Semua',
      phaseId: null,
      lessonId: null,
    }));

  const apply = () => {
    onApply(draft);
    onClose();
  };

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <AppText variant="heading">Filter Resource</AppText>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.section}>
            <AppText variant="label" color={colors.textSecondary}>
              BAHASA
            </AppText>
            <View style={styles.chips}>
              {LANGUAGES.map((language) => (
                <Chip
                  key={language}
                  label={language === 'Semua' ? 'Semua' : language}
                  selected={draft.language === language}
                  onPress={() => setDraft((previous) => ({ ...previous, language }))}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <AppText variant="label" color={colors.textSecondary}>
              TINGKAT KESULITAN
            </AppText>
            <View style={styles.chips}>
              {DIFFICULTIES.map((difficulty) => (
                <Chip
                  key={difficulty}
                  label={difficulty}
                  selected={draft.difficulty === difficulty}
                  onPress={() => setDraft((previous) => ({ ...previous, difficulty }))}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <AppText variant="label" color={colors.textSecondary}>
              FASE
            </AppText>
            <OptionRow
              label="Semua fase"
              selected={draft.phaseId === null}
              onPress={() => setDraft((previous) => ({ ...previous, phaseId: null, lessonId: null }))}
            />
            {phases.map((phase) => (
              <OptionRow
                key={phase.id}
                label={`${phase.order}. ${phase.title}`}
                selected={draft.phaseId === phase.id}
                onPress={() =>
                  setDraft((previous) => ({ ...previous, phaseId: phase.id, lessonId: null }))
                }
              />
            ))}
          </View>

          {selectedPhase ? (
            <View style={styles.section}>
              <AppText variant="label" color={colors.textSecondary}>
                MATERI
              </AppText>
              <OptionRow
                label="Semua materi"
                selected={draft.lessonId === null}
                onPress={() => setDraft((previous) => ({ ...previous, lessonId: null }))}
              />
              {selectedPhase.lessons.map((lesson) => (
                <OptionRow
                  key={lesson.id}
                  label={lesson.title}
                  selected={draft.lessonId === lesson.id}
                  onPress={() => setDraft((previous) => ({ ...previous, lessonId: lesson.id }))}
                />
              ))}
            </View>
          ) : null}
        </ScrollView>

        <View style={styles.footer}>
          <Button title="Reset" variant="ghost" onPress={reset} style={styles.footerButton} />
          <Button title="Terapkan" onPress={apply} style={styles.footerButton} />
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    gap: spacing.md,
  },
  scroll: {
    flexShrink: 1,
  },
  scrollContent: {
    gap: spacing.xl,
    paddingBottom: spacing.md,
  },
  section: {
    gap: spacing.sm,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: 10,
  },
  optionLabel: {
    flex: 1,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.disabled,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  footer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  footerButton: {
    flex: 1,
  },
});