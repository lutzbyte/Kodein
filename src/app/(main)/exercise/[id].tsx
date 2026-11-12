import { useLocalSearchParams, useRouter } from 'expo-router';
import { Check, Search, X } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { Badge, getDifficultyTone } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { EmptyState } from '@/components/ui/EmptyState';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { colors, fontFamily, layout, radius, spacing } from '@/constants/theme';
import { useExerciseResults } from '@/hooks/useExerciseResults';
import type { SubmitOutcome } from '@/store/ExerciseResultsContext';
import { getExerciseById, getExerciseKindLabel, getExercises } from '@/utils/content';
import { DIFFICULTY_POINTS, type ExerciseAnswer } from '@/utils/exercises';

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { results, submit } = useExerciseResults();

  const [selected, setSelected] = useState<number | null>(null);
  const [text, setText] = useState('');
  const [saving, setSaving] = useState(false);
  const [outcome, setOutcome] = useState<SubmitOutcome | null>(null);

  const exercise = getExerciseById(id);

  const reset = useCallback(() => {
    setSelected(null);
    setText('');
    setOutcome(null);
  }, []);

  useEffect(() => {
    reset();
  }, [id, reset]);

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

  const record = results.get(exercise.id);
  const isTextExercise = exercise.kind === 'problem-solving';

  const buildAnswer = (): ExerciseAnswer | null => {
    if (isTextExercise) {
      return text.trim().length > 0 ? { type: 'text', text } : null;
    }
    return selected !== null ? { type: 'choice', index: selected } : null;
  };

  const answer = buildAnswer();

  const handleSubmit = async () => {
    if (!answer || saving) return;
    setSaving(true);
    const result = await submit(exercise, answer);
    setSaving(false);
    if (result) setOutcome(result);
  };

  const siblings = getExercises(exercise.phaseId);
  const position = siblings.findIndex((item) => item.id === exercise.id);
  const nextExercise = position >= 0 ? siblings[position + 1] : undefined;

  const goNext = () => {
    if (nextExercise) {
      router.replace(`/exercise/${nextExercise.id}`);
    } else {
      router.replace({ pathname: '/exercise', params: { phaseId: exercise.phaseId } });
    }
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <ScreenHeader />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={styles.titleBlock}>
            <View style={styles.badges}>
              <Badge label={exercise.difficulty} tone={getDifficultyTone(exercise.difficulty)} />
              <Badge label={getExerciseKindLabel(exercise.kind)} tone="primary" />
              {record?.solved ? <Badge label="Selesai" tone="success" /> : null}
            </View>
            <AppText variant="title">{exercise.title}</AppText>
            <AppText variant="caption" color={colors.textSecondary}>
              Estimasi {exercise.durationMinutes} menit • {DIFFICULTY_POINTS[exercise.difficulty]} poin
              {record ? ` • sudah dicoba ${record.attempts} kali` : ''}
            </AppText>
          </View>

          <AppText variant="body">{exercise.question}</AppText>

          {exercise.code ? (
            <CodeBlock code={exercise.code} language={exercise.language ?? 'C'} />
          ) : null}

          {exercise.kind === 'problem-solving' ? (
            <View style={styles.answerBlock}>
              <TextInput
                value={text}
                onChangeText={setText}
                editable={!outcome}
                placeholder="Ketik jawabanmu"
                placeholderTextColor={colors.textMuted}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                style={[
                  styles.input,
                  outcome && (outcome.correct ? styles.inputCorrect : styles.inputWrong),
                ]}
              />
              {exercise.hint ? (
                <AppText variant="caption" color={colors.textSecondary}>
                  Petunjuk: {exercise.hint}
                </AppText>
              ) : null}
            </View>
          ) : (
            <View style={styles.options}>
              {exercise.options.map((option, index) => {
                const isSelected = selected === index;
                const isAnswer = outcome !== null && index === exercise.correctIndex;
                const isWrongChoice =
                  outcome !== null && isSelected && index !== exercise.correctIndex;

                return (
                  <Pressable
                    key={index}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: isSelected, disabled: outcome !== null }}
                    disabled={outcome !== null}
                    onPress={() => setSelected(index)}
                    style={[
                      styles.option,
                      isSelected && !outcome && styles.optionSelected,
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
          )}

          {outcome ? (
            <View
              style={[styles.feedback, outcome.correct ? styles.feedbackCorrect : styles.feedbackWrong]}
            >
              <AppText variant="heading" color={outcome.correct ? '#15803D' : colors.danger}>
                {outcome.correct ? 'Jawabanmu benar!' : 'Jawabanmu belum tepat'}
              </AppText>
              <AppText variant="bodyStrong">
                {outcome.pointsAwarded > 0
                  ? `+${outcome.pointsAwarded} poin`
                  : outcome.correct
                    ? 'Soal ini sudah pernah kamu selesaikan, poin tidak bertambah.'
                    : 'Belum ada poin. Kamu bisa mencoba lagi.'}
              </AppText>
              <AppText variant="body">{exercise.explanation}</AppText>
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        {outcome ? (
          <>
            <Button
              title={nextExercise ? 'Latihan Berikutnya' : 'Kembali ke Daftar Latihan'}
              onPress={goNext}
            />
            <Button title="Coba Lagi" variant="outline" onPress={reset} />
          </>
        ) : (
          <Button
            title="Periksa Jawaban"
            loading={saving}
            disabled={answer === null}
            onPress={handleSubmit}
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
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
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  answerBlock: {
    gap: spacing.sm,
  },
  input: {
    minHeight: 52,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.textPrimary,
  },
  inputCorrect: {
    borderColor: colors.success,
    backgroundColor: colors.successSoft,
  },
  inputWrong: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerSoft,
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
    gap: spacing.md,
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
});