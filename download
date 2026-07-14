import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppProgress, DEFAULT_PROGRESS, VideoLink } from "@/types";
import { TOTAL_COURSE_DAYS } from "@/data/courseContent";

interface AppState extends AppProgress {
  // Practice / streak
  markPracticedToday: () => void;

  // Course
  completeDay: (day: number) => void;
  setCourseLink: (day: number, url: string) => void;
  isDayUnlocked: (day: number) => boolean;

  // Warmups
  setWarmupLink: (key: string, url: string) => void;

  // Library
  addLibraryVideo: (category: string, url: string) => void;
  removeLibraryVideo: (category: string, videoId: string) => void;

  // Derived
  currentSwaraStageIndex: () => number;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_PROGRESS,

      markPracticedToday: () => {
        const today = new Date().toDateString();
        const { lastPracticeDate, streak, daysPracticed } = get();
        if (lastPracticeDate === today) return; // already counted today

        const yesterday = new Date(Date.now() - 86400000).toDateString();
        const nextStreak = lastPracticeDate === yesterday ? streak + 1 : 1;

        set({
          streak: nextStreak,
          daysPracticed: daysPracticed + 1,
          lastPracticeDate: today,
        });
      },

      completeDay: (day: number) => {
        const { completedDays } = get();
        if (completedDays.includes(day)) return;
        set({ completedDays: [...completedDays, day].sort((a, b) => a - b) });
        get().markPracticedToday();
      },

      setCourseLink: (day: number, url: string) => {
        set((state) => ({
          courseLinks: { ...state.courseLinks, [day]: url },
        }));
      },

      isDayUnlocked: (day: number) => {
        const { completedDays } = get();
        if (day === 1) return true;
        return completedDays.includes(day - 1) || completedDays.includes(day);
      },

      setWarmupLink: (key: string, url: string) => {
        set((state) => ({
          warmupLinks: { ...state.warmupLinks, [key]: url },
        }));
      },

      addLibraryVideo: (category: string, url: string) => {
        const video: VideoLink = {
          id: `${Date.now()}`,
          url,
          addedAt: new Date().toISOString(),
        };
        set((state) => ({
          libraryLinks: {
            ...state.libraryLinks,
            [category]: [...(state.libraryLinks[category] ?? []), video],
          },
        }));
      },

      removeLibraryVideo: (category: string, videoId: string) => {
        set((state) => ({
          libraryLinks: {
            ...state.libraryLinks,
            [category]: (state.libraryLinks[category] ?? []).filter(
              (v) => v.id !== videoId
            ),
          },
        }));
      },

      currentSwaraStageIndex: () => {
        const { completedDays } = get();
        const perStage = TOTAL_COURSE_DAYS / 7;
        return Math.min(Math.floor(completedDays.length / perStage), 6);
      },
    }),
    {
      name: "sing-easy-progress",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
