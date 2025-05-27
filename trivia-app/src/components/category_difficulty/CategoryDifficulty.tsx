import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import { ICategoryProps } from "./interfaces";

const difficulties = ["", "easy", "medium", "hard"];

export default function CategoryDifficulty({
  category,
  difficulty,
  categoryOptions,
  onCategoryChange,
  onDifficultyChange,
  onStart,
}: ICategoryProps) {
  return (
    <Box
      sx={{
        // maxWidth: 400,
        width: "100%",
        mx: "auto",
        mt: 6,
        display: "flex",
        padding: 10,
        flexDirection: "column",
        gap: 3,
        backgroundColor: "white",
        borderRadius: 8,
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          value={category}
          label="Category"
          onChange={(e: SelectChangeEvent) => onCategoryChange(e.target.value)}
        >
          {categoryOptions.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="difficulty-label">Difficulty</InputLabel>
        <Select
          labelId="difficulty-label"
          value={difficulty}
          label="Difficulty"
          onChange={(e: SelectChangeEvent) =>
            onDifficultyChange(e.target.value)
          }
        >
          {difficulties.map((diff) => (
            <MenuItem key={diff} value={diff}>
              {diff === ""
                ? "Any Difficulty"
                : diff.charAt(0).toUpperCase() + diff.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" size="large" onClick={onStart}>
        Start Trivia
      </Button>
    </Box>
  );
}
