export type PhaseLevel =
  | 'Beginner'
  | 'Beginner - Intermediate'
  | 'Intermediate'
  | 'Intermediate - Advanced'
  | 'Advanced';

export type LevelFilter = 'Semua' | 'Beginner' | 'Intermediate' | 'Advanced';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type LessonStatus = 'not_started' | 'in_progress' | 'completed';

export interface LessonSummary {
  id: string;
  title: string;
}

export interface Phase {
  id: string;
  order: number;
  title: string;
  description: string;
  level: PhaseLevel;
  languages: string[];
  estimatedTime: string;
  lessons: LessonSummary[];
}

export interface CodeExample {
  language: string;
  code: string;
  explanation: string[];
  output?: string;
}

export interface LessonSection {
  title: string;
  body: string;
}

export interface LessonContent {
  id: string;
  description: string;
  objectives: string[];
  explanation: string[];
  sectionsTitle?: string;
  sections?: LessonSection[];
  codeExample?: CodeExample;
  notes: string[];
}

export type ChoiceExerciseKind =
  | 'multiple-choice'
  | 'true-false'
  | 'predict-output'
  | 'debugging';

export type ExerciseKind = ChoiceExerciseKind | 'problem-solving';

interface ExerciseBase {
  id: string;
  phaseId: string;
  title: string;
  difficulty: Difficulty;
  durationMinutes: number;
  question: string;
  code?: string;
  /** Bahasa untuk penyorotan kode. Bawaan: C. */
  language?: string;
  explanation: string;
}

export interface ChoiceExercise extends ExerciseBase {
  kind: ChoiceExerciseKind;
  options: string[];
  correctIndex: number;
}

export interface ProblemExercise extends ExerciseBase {
  kind: 'problem-solving';
  /** Jawaban yang diterima, dibandingkan tanpa memperhatikan huruf besar-kecil dan spasi. */
  acceptedAnswers: string[];
  hint?: string;
}

export type Exercise = ChoiceExercise | ProblemExercise;

export interface Project {
  id: string;
  phaseId: string;
  title: string;
  description: string;
  goals: string[];
  technologies: string[];
  difficulty: Difficulty;
  requirements: string[];
  checklist: string[];
}

export type ResourceType = 'YouTube' | 'Artikel' | 'Dokumentasi' | 'Buku' | 'Kursus';
export type ResourceLanguage = 'Indonesia' | 'Inggris';

export interface Resource {
  id: string;
  title: string;
  publisher: string;
  type: ResourceType;
  language: ResourceLanguage;
  description: string;
  phaseIds: string[];
  lessonIds: string[];
  url: string;
  difficulty: Difficulty;
}