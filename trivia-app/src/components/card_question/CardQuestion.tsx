import { useState, useEffect } from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import * as React from "react";
import { IQuestionProps } from "./interfaces";

function decodeHTML(html: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export default function CardQuestion({ question, onAnswer }: IQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    setSelected(null);
  }, [question]);

  const answers = React.useMemo(() => {
    const allAnswers = [...question.incorrect_answers, question.correct_answer];
    return allAnswers.sort(() => Math.random() - 0.5);
  }, [question]);

  const handleClick = (answer: string) => {
    if (selected) return;
    setSelected(answer);
    onAnswer(answer === question.correct_answer);
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 4,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="subtitle2" color="text.secondary" mb={2}>
        Category: {question.category} | Difficulty:{" "}
        {question.difficulty.toUpperCase()}
      </Typography>
      <Typography variant="h6" mb={3} className="text-black">
        {decodeHTML(question.question)}
      </Typography>

      <Stack spacing={2}>
        {answers.map((answer) => {
          const isCorrect = answer === question.correct_answer;
          const isSelected = answer === selected;

          return (
            <Button
              key={answer}
              variant={selected ? "contained" : "outlined"}
              color={
                selected
                  ? isCorrect
                    ? "success"
                    : isSelected
                    ? "error"
                    : "inherit"
                  : "primary"
              }
              onClick={() => handleClick(answer)}
              disabled={!!selected}
              sx={{ textTransform: "none" }}
            >
              {decodeHTML(answer)}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
}
