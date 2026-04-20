import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../hooks/useInterview";
import { useSessions } from "../hooks/useSessions";
import { useAuth } from "../hooks/useAuth";
import ProgressBar from "../components/interview/ProgressBar";
import QuestionCard from "../components/interview/QuestionCard";
import AnswerBox from "../components/interview/AnswerBox";
import FeedbackCard from "../components/interview/FeedbackCard";

export default function Interview() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { save } = useSessions();
  const {
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
  } = useInterview();

  const { questions, currentIndex, feedbacks, role, domain, difficulty, answers } = session;
  const currentQuestion = questions[currentIndex];
  const currentFeedback = feedbacks[currentIndex];
  const sessionStarted = questions.length > 0;

  useEffect(() => {
    if (!session.role) {
      navigate("/setup");
      return;
    }
    startSession();
  }, []);

  async function handleFinish() {
    const sessionData = {
      uid: currentUser.uid,
      role,
      domain,
      difficulty,
      score: averageScore,
      questions,
      answers,
      feedbacks,
      weakTopics: feedbacks
        .map((f, i) => ({ topic: questions[i]?.topic, score: f.score }))
        .filter((t) => t.score < 6)
        .map((t) => t.topic),
    };
    await save(sessionData);
    resetSession();
    navigate("/dashboard");
  }

  if (loadingQuestions) return (
    <div style={{ minHeight: "calc(100vh - 60px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", color: "#888" }}>
      <div style={{ width: "40px", height: "40px", border: "3px solid #e5e7eb", borderTop: "3px solid #6366f1", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <p>Generating your questions...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (error) return (
    <div style={{ padding: "3rem", textAlign: "center", color: "#dc2626" }}>
      <p style={{ marginBottom: "1rem" }}>Something went wrong: {error}</p>
      <button onClick={() => navigate("/setup")} style={{ padding: "10px 20px", background: "#6366f1", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>
        Go back to setup
      </button>
    </div>
  );

  if (!sessionStarted) return null;

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "2rem 1.5rem" }}>
      <ProgressBar current={currentIndex} total={questions.length} />
      <QuestionCard question={currentQuestion} index={currentIndex} />

      {!currentFeedback && (
        <AnswerBox onSubmit={submitAnswer} loading={loadingFeedback} />
      )}

      {currentFeedback && (
        <FeedbackCard
          feedback={currentFeedback}
          isLast={isLastQuestion}
          onNext={isLastQuestion ? handleFinish : nextQuestion}
        />
      )}
    </div>
  );
}