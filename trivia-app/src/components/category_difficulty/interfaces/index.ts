import { ICategory } from "../../../interfaces";

export interface ICategoryProps {
  category: number | "";
  difficulty: string;
  categoryOptions: ICategory[];
  onCategoryChange: (value: number | "") => void;
  onDifficultyChange: (value: string) => void;
  onStart: () => void;
}
