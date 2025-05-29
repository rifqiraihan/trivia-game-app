import {
  Paper,
  Autocomplete,
  TextField,
  Button,
  Typography,
  FormControl,
} from "@mui/material";
import { ICategoryProps } from "./interfaces";

const difficulties = ["easy", "medium", "hard"];

export default function CategoryDifficulty({
  category,
  difficulty,
  categoryOptions,
  onCategoryChange,
  onDifficultyChange,
  onStart,
}: ICategoryProps) {
  const selectedCategory =
    categoryOptions.find((c) => c.id === category) || null;
  const selectedDifficulty = difficulty || "";

  const isFormValid = !!selectedCategory && !!selectedDifficulty;

  return (
    <Paper
      elevation={6}
      className="w-full md:min-w-[800px] max-w-[800px] min-h-[420px] justify-center mx-auto p-8 bg-white flex flex-col gap-6"
      sx={{ borderRadius: 6 }}
    >
      <Typography
        sx={{
          color: "primary.main",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "1.5rem",
        }}
      >
        🎯 Get Ready for Trivia!
      </Typography>

      <Typography
        sx={{
          color: "text.secondary",
          textAlign: "center",
          mb: 2,
        }}
      >
        Choose your favorite category and difficulty to start the challenge!
      </Typography>

      <FormControl>
        <Typography
          sx={{
            mb: 1,
            textAlign: "left",
            fontWeight: "medium",
            color: "black",
          }}
        >
          🗂 Category *
        </Typography>
        <Autocomplete
          fullWidth
          options={categoryOptions}
          getOptionLabel={(option) => option.name}
          value={selectedCategory}
          onChange={(_, newValue) => {
            onCategoryChange(newValue ? newValue.id : "");
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Select a trivia category..."
              required
              sx={{ borderRadius: 2 }}
            />
          )}
          sx={{ borderRadius: 2 }}
        />
      </FormControl>

      <FormControl>
        <Typography
          sx={{
            mb: 1,
            textAlign: "left",
            fontWeight: "medium",
            color: "black",
          }}
        >
          🧠 Difficulty *
        </Typography>
        <Autocomplete
          fullWidth
          options={difficulties}
          getOptionLabel={(option) =>
            option.charAt(0).toUpperCase() + option.slice(1)
          }
          value={selectedDifficulty}
          onChange={(_, newValue) => {
            onDifficultyChange(newValue || "");
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Choose your challenge level..."
              required
              sx={{ borderRadius: 2 }}
            />
          )}
          sx={{ borderRadius: 2 }}
        />
      </FormControl>

      <Button
        variant="contained"
        size="large"
        onClick={onStart}
        disabled={!isFormValid}
        sx={{
          textTransform: "none",
          borderRadius: 2,
          mt: 2,
          fontWeight: "bold",
        }}
      >
        🚀 Start Trivia
      </Button>
    </Paper>
  );
}
