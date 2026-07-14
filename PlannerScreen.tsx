import { AppProgress, Badge } from "@/types";

export const BADGES: Badge[] = [
  {
    id: "first-note",
    name: "First Note",
    isUnlocked: (p: AppProgress) => p.completedDays.length >= 1,
  },
  {
    id: "seven-day-streak",
    name: "7-Day Streak",
    isUnlocked: (p: AppProgress) => p.streak >= 7,
  },
  {
    id: "sarali-starter",
    name: "Sarali Starter",
    isUnlocked: (p: AppProgress) => p.completedDays.length >= 10,
  },
  {
    id: "halfway-voice",
    name: "Halfway Voice",
    isUnlocked: (p: AppProgress) => p.completedDays.length >= 15,
  },
  {
    id: "course-complete",
    name: "Course Complete",
    isUnlocked: (p: AppProgress) => p.completedDays.length >= 30,
  },
];
