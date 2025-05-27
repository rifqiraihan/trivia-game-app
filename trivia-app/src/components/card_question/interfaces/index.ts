import { IQuestion } from "../../../interfaces";

export interface IQuestionProps {
  question: IQuestion;
  onAnswer: (correct: boolean) => void;
  currentIndex: number;
  score: number;
}
