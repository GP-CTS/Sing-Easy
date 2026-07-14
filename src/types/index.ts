export interface CourseDay {
  day: number;
  title: string;
}

export interface WarmupCategory {
  key: string;
  name: string;
}

export type LibraryCategoryName =
  | "Carnatic Basics"
  | "Singing Tips"
  | "Film Song Tutorials"
  | "Vocal Exercises"
  | "Ear Training"
  | "Time Signature Lessons"
  | "Gamaka & Briga"
  | "10-Day Shruti Challenge";

export interface VideoLink {
  id: string;
  url: string;
  addedAt: string; // ISO date
}

export interface Badge {
  id: string;
  name: string;
  isUnlocked: (progress: AppProgress) => boolean;
}

/** The full shape of persisted app state. */
export interface AppProgress {
  streak: number;
  daysPracticed: number;
  completedDays: number[];
  lastPracticeDate: string | null; // toDateString()
  warmupLinks: Record<string, string>; // key -> youtube url
  courseLinks: Record<number, string>; // day -> youtube url
  libraryLinks: Record<string, VideoLink[]>; // category -> videos
}

export const DEFAULT_PROGRESS: AppProgress = {
  streak: 0,
  daysPracticed: 0,
  completedDays: [],
  lastPracticeDate: null,
  warmupLinks: {},
  courseLinks: {},
  libraryLinks: {},
};
