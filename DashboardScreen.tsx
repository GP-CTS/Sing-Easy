import { CourseDay } from "@/types";

export const TOTAL_COURSE_DAYS = 30;

export const SWARAS = ["Sa", "Ri", "Ga", "Ma", "Pa", "Da", "Ni"] as const;

const TOPICS: string[] = [
  "Posture & Breathing Basics",
  "Finding Your Natural Pitch",
  "Sa — The Home Note",
  "Simple Sa-Pa Drone Singing",
  "Sarali Varisai — Line 1",
  "Sarali Varisai — Line 2",
  "Breath Control Drill",
  "Head vs Chest Voice",
  "Sarali Varisai — Full Round",
  "Review & Recording Day",
  "Jantai Varisai Intro",
  "Jantai Varisai Practice",
  "Gamaka Basics",
  "Simple Alankaram",
  "Alankaram Practice",
  "Ear Training — Match the Sa",
  "Upper Octave Stretch",
  "Lower Octave Grounding",
  "Rhythm Basics (Talam)",
  "Review & Recording Day",
  "First Beginner Song — Line 1",
  "First Beginner Song — Line 2",
  "Devotional Song Warm-up",
  "Full Song Practice",
  "Briga Basics",
  "Speed Practice Drill",
  "Combining Gamaka & Briga",
  "Song Polishing",
  "Full Recording Session",
  "Course Wrap-up & Next Steps",
];

export const COURSE_CONTENT: CourseDay[] = TOPICS.map((title, i) => ({
  day: i + 1,
  title,
}));
