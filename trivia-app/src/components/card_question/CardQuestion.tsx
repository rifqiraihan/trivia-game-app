import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  Snackbar,
  Alert,
  LinearProgress,
} from "@mui/material";
import { IQuestionProps } from "./interfaces";

function decodeHTML(html: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export default function CardQuestion({
  question,
  onAnswer,
  currentIndex,
  score,
}: IQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);

  useEffect(() => {
    setSelected(null);
    setIsCorrect(null);
    setSnackbarOpen(false);
    setProgress(0);
    setBuffer(10);
  }, [question]);

  const answers = useMemo(() => {
    const allAnswers = [...question.incorrect_answers, question.correct_answer];
    return allAnswers.sort(() => Math.random() - 0.5);
  }, [question]);

  const handleClick = (answer: string) => {
    if (selected) return;

    const correct = answer === question.correct_answer;
    setSelected(answer);
    setIsCorrect(correct);
    setSnackbarOpen(true);
    onAnswer(correct);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (!selected) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });

      setBuffer((prev) => {
        if (prev >= 100) return 100;
        return prev + 2.5;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [selected]);

  return (
    <Box
      sx={{
        mx: "auto",
        width: "100%",
        p: 4,
        bgcolor: "background.paper",
        borderRadius: 8,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="subtitle2"
        color="text.secondary"
        mb={2}
        textAlign="left"
      >
        Category: {question.category} | Difficulty:{" "}
        {question.difficulty.toUpperCase()}
      </Typography>

      <Typography variant="h6" mb={3} className="text-black text-left">
        Score: {score}
      </Typography>

      <Typography variant="h6" mb={3} className="text-black text-left">
        {`${currentIndex + 1}. `} {decodeHTML(question.question)}
      </Typography>

      {selected && (
        <Box sx={{ mb: 2 }}>
          <LinearProgress
            variant="buffer"
            value={progress}
            valueBuffer={buffer}
          />
        </Box>
      )}

      <Stack spacing={2} mb={2}>
        {answers.map((answer) => {
          const isCorrectAnswer = answer === question.correct_answer;
          const isSelectedAnswer = answer === selected;

          let color: "primary" | "success" | "error" | "inherit" = "primary";
          let variant: "outlined" | "contained" = "outlined";

          if (selected) {
            variant = "contained";
            if (isCorrectAnswer) {
              color = "success";
            } else if (isSelectedAnswer && !isCorrectAnswer) {
              color = "error";
            } else {
              color = "inherit";
            }
          }

          return (
            <Button
              key={answer}
              variant={variant}
              color={color}
              onClick={() => handleClick(answer)}
              sx={{ textTransform: "none", textAlign: "left" }}
            >
              {decodeHTML(answer)}
            </Button>
          );
        })}
      </Stack>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={isCorrect ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {isCorrect ? "Correct answer! 🎉" : "Incorrect answer. 😢"}
        </Alert>
      </Snackbar>
    </Box>
  );
}
