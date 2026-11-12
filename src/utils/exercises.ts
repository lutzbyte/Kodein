import type { Difficulty, Exercise } from '@/types/content';
import type { ExerciseResultRecord } from '@/types/progress';

export const DIFFICULTY_POINTS: Record<Difficulty, number> = {
  Easy: 10,
  Medium: 20,
  Hard: 30,
};

export type ExerciseAnswer =
  | { type: 'choice'; index: number }
  | { type: 'text'; text: string };

export type ExerciseStatus = 'new' | 'attempted' | 'solved';

export interface ExerciseSummary {
  total: number;
  solved: number;
  score: number;
  maxScore: number;
}

export function normalizeText(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ').replace(/\.$/, '');
}

export function isAnswerCorrect(exercise: Exercise, answer: ExerciseAnswer): boolean {
  if (exercise.kind === 'problem-solving') {
    if (answer.type !== 'text') return false;
    const given = normalizeText(answer.text);
    return exercise.acceptedAnswers.some((accepted) => normalizeText(accepted) === given);
  }
  return answer.type === 'choice' && answer.index === exercise.correctIndex;
}

/** Teks jawaban yang disimpan ke Firestore (maksimal 200 karakter). */
export function describeAnswer(exercise: Exercise, answer: ExerciseAnswer): string {
  if (exercise.kind === 'problem-solving') {
    return answer.type === 'text' ? answer.text.trim().slice(0, 200) : '';
  }
  return answer.type === 'choice' ? (exercise.options[answer.index] ?? '').slice(0, 200) : '';
}

export function getExerciseStatus(
  results: ReadonlyMap<string, ExerciseResultRecord>,
  exerciseId: string,
): ExerciseStatus {
  const record = results.get(exerciseId);
  if (!record) return 'new';
  return record.solved ? 'solved' : 'attempted';
}

export function summarizeExercises(
  list: Exercise[],
  results: ReadonlyMap<string, ExerciseResultRecord>,
): ExerciseSummary {
  let solved = 0;
  let score = 0;
  let maxScore = 0;

  for (const exercise of list) {
    const points = DIFFICULTY_POINTS[exercise.difficulty];
    maxScore += points;
    if (results.get(exercise.id)?.solved) {
      solved += 1;
      score += points;
    }
  }

  return { total: list.length, solved, score, maxScore };
}