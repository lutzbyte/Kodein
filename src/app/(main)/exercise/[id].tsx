import { useLocalSearchParams } from 'expo-router';
import { Check, Search, X } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { Badge, getDifficultyTone } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { EmptyState } from '@/components/ui/EmptyState';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { colors, layout, radius, spacing } from '@/constants/theme';
import { getExerciseById, getExerciseKindLabel } from '@/utils/content';

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  const exercise = getExerciseById(id);

  if (!exercise) {
    return (
      <Screen>
        <ScreenHeader />
        <EmptyState
          icon={<Search color={colors.primary} size={30} strokeWidth={2} />}
          title="Latihan tidak ditemukan"
          description="Latihan yang kamu cari tidak tersedia. Kembali dan pilih latihan lain."
        />
      </Screen>
    );
  }

  const isCorrect = checked && selected === exercise.correctIndex;

  const reset = () => {
    setSelected(null);
    setChecked(false);
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <ScreenHeader />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.titleBlock}>
          <View style={styles.badges}>
            <Badge label={exercise.difficulty} tone={getDifficultyTone(exercise.difficulty)} />
            <Badge label={getExerciseKindLabel(exercise.kind)} tone="primary" />
          </View>
          <AppText variant="title">{exercise.title}</AppText>
          <AppText variant="caption" color={colors.textSecondary}>
            Estimasi {exercise.durationMinutes} menit
          </AppText>
        </View>

        <AppText variant="body">{exercise.question}</AppText>

        {exercise.code ? <CodeBlock code={exercise.code} language="C" /> : null}

        <View style={styles.options}>
          {exercise.options.map((option, index) => {
            const isSelected = selected === index;
            const isAnswer = checked && index === exercise.correctIndex;
            const isWrongChoice = checked && isSelected && index !== exercise.correctIndex;

            return (
              <Pressable
                key={index}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected, disabled: checked }}
                disabled={checked}
                onPress={() => setSelected(index)}
                style={[
                  styles.option,
                  isSelected && !checked && styles.optionSelected,
                  isAnswer && styles.optionCorrect,
                  isWrongChoice && styles.optionWrong,
                ]}
              >
                <AppText variant="body" style={styles.optionText}>
                  {option}
                </AppText>
                {isAnswer ? <Check color={colors.success} size={20} strokeWidth={3} /> : null}
                {isWrongChoice ? <X color={colors.danger} size={20} strokeWidth={3} /> : null}
              </Pressable>
            );
          })}
        </View>

        {checked ? (
          <View style={[styles.feedback, isCorrect ? styles.feedbackCorrect : styles.feedbackWrong]}>
            <AppText variant="heading" color={isCorrect ? '#15803D' : colors.danger}>
              {isCorrect ? 'Jawabanmu benar!' : 'Jawabanmu belum tepat'}
            </AppText>
            <AppText variant="body">{exercise.explanation}</AppText>
          </View>
        ) : null}
      </ScrollView>

      <View style={styles.footer}>
        {checked ? (
          <Button title="Coba Lagi" variant="outline" onPress={reset} />
        ) : (
          <Button
            title="Periksa Jawaban"
            disabled={selected === null}
            onPress={() => setChecked(true)}
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: layout.screenPadding,
    paddingBottom: spacing.xxxl,
    gap: spacing.xl,
  },
  titleBlock: {
    gap: spacing.sm,
  },
  badges: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  options: {
    gap: spacing.md,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  optionCorrect: {
    borderColor: colors.success,
    backgroundColor: colors.successSoft,
  },
  optionWrong: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerSoft,
  },
  optionText: {
    flex: 1,
  },
  feedback: {
    padding: spacing.lg,
    borderRadius: radius.lg,
    gap: spacing.sm,
  },
  feedbackCorrect: {
    backgroundColor: colors.successSoft,
  },
  feedbackWrong: {
    backgroundColor: colors.dangerSoft,
  },
  footer: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
});