import { ICategory } from '../../../interfaces';

export interface ICategoryProps {
  category: string;
  difficulty: string;
  categoryOptions: ICategory[];
  onCategoryChange: (value: string) => void;
  onDifficultyChange: (value: string) => void;
  onStart: () => void;
}
