import { Typography, Button, Paper } from "@mui/material";
import { IScoreProps } from "./interfaces";

export default function ScoreSummary({ score, total, onRestart }: IScoreProps) {
  const percentage = (score / total) * 100;

  const getScoreColor = () => {
    if (percentage === 100) return "success.main";
    if (percentage >= 70) return "primary.main";
    return "error.main";
  };

  return (
    <Paper
      elevation={4}
      className="w-full md:min-w-[800px] min-h-[400px] justify-center mx-auto p-8 bg-white flex flex-col gap-4"
      sx={{ borderRadius: 8 }}
    >
      <Typography
        fontSize="2rem"
        fontWeight="bold"
        gutterBottom
        color="secondary"
      >
        🎉 Quiz Complete! 🎉
      </Typography>

      <Typography
        variant="h5"
        fontWeight={600}
        gutterBottom
        color={getScoreColor()}
      >
        You scored {score} out of {total}
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        {percentage === 100
          ? "Perfect! You nailed every question! 🔥"
          : percentage >= 70
          ? "Great job! Keep it up! 💪"
          : "Don’t worry, try again and improve your score! 🚀"}
      </Typography>

      <Button
        variant="contained"
        size="large"
        onClick={onRestart}
        sx={{ textTransform: "none", borderRadius: 2, fontWeight: "bold" }}
      >
        🔄 Play Again
      </Button>
    </Paper>
  );
}
