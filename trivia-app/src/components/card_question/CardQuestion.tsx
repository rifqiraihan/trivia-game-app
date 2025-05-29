import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  Snackbar,
  Alert,
  LinearProgress,
  Paper,
} from "@mui/material";
import { IQuestionProps } from "./interfaces";
import { useLocation } from "react-router-dom";

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

  const location = useLocation();

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location]);

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
        const next = prev + 5;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
      setBuffer((prev) => {
        const next = prev + 6.25;
        if (next >= 100) return 100;
        return next;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [selected]);

  return (
    <>
      <Paper
        elevation={4}
        className="w-full md:min-w-[800px] mx-auto p-6 bg-white"
        sx={{ borderRadius: 8 }}
      >
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            borderBottom={2}
            pb={1}
            mb={1}
          >
            <Box>
              <Typography sx={{ color: "black", textAlign: "left", mb: 1 }}>
                CATEGORY <br />
                <b>{decodeHTML(question.category)}</b>
              </Typography>
              <Typography sx={{ color: "black", textAlign: "left" }}>
                DIFFICULTY <br />
                <b>{question.difficulty.toUpperCase()}</b>
              </Typography>
            </Box>
            <Typography
              sx={{ color: "green", textAlign: "center", fontWeight: "bold" }}
            >
              SCORE
              <br />
              {score}
            </Typography>
          </Stack>
          <Typography
            sx={{ color: "black", textAlign: "left", fontSize: "1.5rem" }}
          >
            {`${currentIndex + 1}. `} {decodeHTML(question.question)}
          </Typography>

          {selected && (
            <Box>
              <LinearProgress
                variant="buffer"
                value={progress}
                valueBuffer={buffer}
                sx={{ height: 10, borderRadius: 5 }}
              />
            </Box>
          )}

          <Stack spacing={2}>
            {answers.map((answer) => {
              const isCorrectAnswer = answer === question.correct_answer;
              const isSelectedAnswer = answer === selected;

              let color: "primary" | "success" | "error" | "inherit" =
                "primary";
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
                  sx={{
                    textTransform: "none",
                    textAlign: "left",
                    color: "black",
                    justifyContent: "flex-start",
                    borderRadius: 2,
                    px: 2,
                    py: 1.5,
                    fontWeight: "bold",
                    borderColor: "#ccc",
                    ":hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
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
              sx={{ width: "100%", fontWeight: "bold" }}
            >
              {isCorrect ? "Correct answer! 🎉" : "Incorrect answer. 😢"}
            </Alert>
          </Snackbar>
        </Stack>
      </Paper>
    </>
  );
}
