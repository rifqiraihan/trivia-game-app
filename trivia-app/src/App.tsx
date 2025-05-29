import { CircularProgress, Box } from "@mui/material";
import { useEffect, useState, lazy, Suspense, useCallback } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import { ICategory } from "./interfaces";
import { useQuizStore } from "./store/useQuizStore";

const CardQuestion = lazy(
  () => import("./components/card_question/CardQuestion")
);
const ScoreSummary = lazy(
  () => import("./components/score_summary/ScoreSummary")
);
const CategoryDifficulty = lazy(
  () => import("./components/category_difficulty/CategoryDifficulty")
);

function App() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    category,
    difficulty,
    questions,
    currentIndex,
    score,
    setCategory,
    setDifficulty,
    setQuestions,
    setCurrentIndex,
    incrementScore,
    reset,
  } = useQuizStore();

  const navigate = useNavigate();

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setQuestions([]);
    setCurrentIndex(0);
    reset();

    let url = `https://opentdb.com/api.php?amount=10&type=multiple`;
    if (category) url += `&category=${category}`;
    if (difficulty) url += `&difficulty=${difficulty}`;
    try {
      const res = await axios.get(url);
      setQuestions(res.data.results);
      navigate("/quiz");
    } catch (error) {
      alert("Failed to fetch questions. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [category, difficulty, reset, setCurrentIndex, setQuestions, navigate]);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://opentdb.com/api_category.php");
      setCategories(res.data.trivia_categories);
    } catch (error) {
      alert("Failed to fetch categories. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAnswer = useCallback(
    (correct: boolean) => {
      if (correct) incrementScore();
      setTimeout(() => {
        if (currentIndex + 1 < questions.length) {
          setCurrentIndex(currentIndex + 1);
        } else {
          navigate("/result");
        }
      }, 2000);
    },
    [currentIndex, questions.length, incrementScore, setCurrentIndex, navigate]
  );

  const handleRestart = useCallback(() => {
    reset();
    navigate("/");
  }, [reset, navigate]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const renderLoader = (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
    >
      <CircularProgress />
    </Box>
  );

  return (
    <>
      <Suspense fallback={renderLoader}>
        <Routes>
          <Route
            path="/"
            element={
              !loading ? (
                <CategoryDifficulty
                  categoryOptions={categories}
                  category={category}
                  difficulty={difficulty}
                  onCategoryChange={setCategory}
                  onDifficultyChange={setDifficulty}
                  onStart={fetchQuestions}
                />
              ) : (
                renderLoader
              )
            }
          />
          <Route
            path="/quiz"
            element={
              loading ? (
                renderLoader
              ) : (
                <CardQuestion
                  key={currentIndex}
                  currentIndex={currentIndex}
                  question={questions[currentIndex]}
                  onAnswer={handleAnswer}
                  score={score}
                />
              )
            }
          />
          <Route
            path="/result"
            element={
              <ScoreSummary
                score={score}
                total={questions.length}
                onRestart={handleRestart}
              />
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
