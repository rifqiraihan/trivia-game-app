import { Typography, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import { ICategory, IQuestion } from "./interfaces";
import CardQuestion from "./components/card_question/CardQuestion";
import ScoreSummary from "./components/score_summary/ScoreSummary";
import CategoryDifficulty from "./components/category_difficulty/CategoryDifficulty";

function App() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [difficulty, setDifficulty] = useState("");
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showScore, setShowScore] = useState(false);

  const fetchQuestions = async () => {
    setLoading(true);
    setShowScore(false);
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);

    let url = `https://opentdb.com/api.php?amount=10&type=multiple`;
    if (category) url += `&category=${category}`;
    if (difficulty) url += `&difficulty=${difficulty}`;

    try {
      const res = await axios.get(url);
      setQuestions(res.data.results);
    } catch (error) {
      alert("Failed to fetch questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);

    let url = `https://opentdb.com/api_category.php`;

    try {
      const res = await axios.get(url);
      setCategories(res.data.trivia_categories);
      console.log(res.data.trivia_categories);
    } catch (error) {
      alert("Failed to fetch categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleAnswer = (correct: boolean) => {
  //   if (correct) setScore((prev) => prev + 1);

  //   if (currentIndex + 1 < questions.length) {
  //     setCurrentIndex((prev) => prev + 1);
  //   } else {
  //     setShowScore(true);
  //   }
  // };

  const handleAnswer = (correct: boolean) => {
    if (correct) setScore((prev) => prev + 1);

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setShowScore(true);
      }
    }, 5000);
  };

  const handleRestart = () => {
    setQuestions([]);
    setShowScore(false);
    setScore(0);
    setCurrentIndex(0);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="w-full md:w-[76vh] h-screen">
        <Typography
          variant="h3"
          fontWeight="bold"
          mb={4}
          mt={8}
          textAlign="center"
        >
          Trivia Game App
        </Typography>
        {!questions.length && !loading && !showScore && (
          <CategoryDifficulty
            categoryOptions={categories}
            category={category}
            difficulty={difficulty}
            onCategoryChange={setCategory}
            onDifficultyChange={setDifficulty}
            onStart={fetchQuestions}
          />
        )}

        {loading && (
          <>
            <Skeleton variant="text" width="60%" height={40} sx={{ mb: 3 }} />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={120}
              sx={{ mb: 1 }}
            />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={40}
              sx={{ mb: 1 }}
            />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={40}
              sx={{ mb: 1 }}
            />
            <Skeleton variant="rectangular" width="100%" height={40} />
          </>
        )}

        {!loading && questions.length > 0 && !showScore && (
          <CardQuestion
            currentIndex={currentIndex}
            question={questions[currentIndex]}
            onAnswer={handleAnswer}
            score={score}
          />
        )}

        {showScore && (
          <ScoreSummary
            score={score}
            total={questions.length}
            onRestart={handleRestart}
          />
        )}
      </div>
    </>
  );
}

export default App;
