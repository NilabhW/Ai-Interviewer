import { useState } from "react";
import { useInterviewContext } from "../context/InterviewContext";
import { generateQuestions, getFeedback } from "../services/claude";

export function useInterview() {
  const {
    session,
    setQuestions,
    saveAnswer,
    saveFeedback,
    nextQuestion,
    resetSession,
  } = useInterviewContext();

  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [error, setError] = useState(null);

  async function startSession() {
    setLoadingQuestions(true);
    setError(null);
    try {
      const qs = await generateQuestions(
        session.role,
        session.domain,
        session.difficulty,
        session.count
      );
      setQuestions(qs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingQuestions(false);
    }
  }

  async function submitAnswer(answer) {
    setLoadingFeedback(true);
    setError(null);
    const currentQuestion = session.questions[session.currentIndex];
    try {
      saveAnswer(answer);
      const feedback = await getFeedback(
        currentQuestion.question,
        answer,
        session.role,
        session.difficulty
      );
      saveFeedback(feedback);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingFeedback(false);
    }
  }

  const isLastQuestion =
    session.currentIndex === session.questions.length - 1;

  const averageScore =
    session.feedbacks.length > 0
      ? Math.round(
          session.feedbacks.reduce((sum, f) => sum + f.score, 0) /
            session.feedbacks.length
        )
      : 0;

  return {
    session,
    loadingQuestions,
    loadingFeedback,
    error,
    isLastQuestion,
    averageScore,
    startSession,
    submitAnswer,
    nextQuestion,
    resetSession,
  };
}