import { useState, useEffect } from "react";
import { Box, Button, Typography, Stack, Alert } from "@mui/material";
import * as React from "react";
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

  useEffect(() => {
    setSelected(null);
    setIsCorrect(null);
  }, [question]);

  const answers = React.useMemo(() => {
    console.log(question.incorrect_answers);
    const allAnswers = [...question.incorrect_answers, question.correct_answer];
    return allAnswers.sort(() => Math.random() - 0.5);
  }, [question]);

  const handleClick = (answer: string) => {
    if (selected) return;

    const correct = answer === question.correct_answer;
    setSelected(answer);
    setIsCorrect(correct);
    onAnswer(correct);
  };

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
              // disabled={!!selected}
              sx={{ textTransform: "none", textAlign: "left" }}
            >
              {decodeHTML(answer)}
            </Button>
          );
        })}
      </Stack>

      {isCorrect !== null && (
        <Alert variant="filled" severity={isCorrect ? "success" : "error"}>
          {isCorrect ? "Correct answer! 🎉" : "Incorrect answer. 😢"}
        </Alert>
      )}
    </Box>
  );
}
