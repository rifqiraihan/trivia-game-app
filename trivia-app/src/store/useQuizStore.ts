import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IQuestion } from "../interfaces";

interface QuizState {
  category: number | "";
  difficulty: string;
  questions: IQuestion[];
  currentIndex: number;
  score: number;
  setCategory: (value: number | "") => void;
  setDifficulty: (value: string) => void;
  setQuestions: (questions: IQuestion[]) => void;
  setCurrentIndex: (index: number) => void;
  incrementScore: () => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      category: "",
      difficulty: "",
      questions: [],
      currentIndex: 0,
      score: 0,
      setCategory: (value) => set({ category: value }),
      setDifficulty: (value) => set({ difficulty: value }),
      setQuestions: (questions) => set({ questions }),
      setCurrentIndex: (index) => set({ currentIndex: index }),
      incrementScore: () => set((state) => ({ score: state.score + 1 })),
      reset: () =>
        set({
          category: "",
          difficulty: "",
          questions: [],
          currentIndex: 0,
          score: 0,
        }),
    }),
    {
      name: "quiz-storage",
    }
  )
);
