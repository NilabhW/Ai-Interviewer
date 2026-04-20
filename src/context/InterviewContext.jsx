import { createContext, useContext, useState } from "react";

const InterviewContext = createContext(null);

const initialState = {
  role: "",
  domain: "",
  difficulty: "",
  count: 5,
  questions: [],
  currentIndex: 0,
  answers: [],
  feedbacks: [],
};

export function InterviewProvider({ children }) {
  const [session, setSession] = useState(initialState);

  function setupSession(role, domain, difficulty, count) {
    setSession({ ...initialState, role, domain, difficulty, count });
  }

  function setQuestions(questions) {
    setSession((prev) => ({ ...prev, questions }));
  }

  function saveAnswer(answer) {
    setSession((prev) => ({
      ...prev,
      answers: [...prev.answers, answer],
    }));
  }

  function saveFeedback(feedback) {
    setSession((prev) => ({
      ...prev,
      feedbacks: [...prev.feedbacks, feedback],
    }));
  }

  function nextQuestion() {
    setSession((prev) => ({ ...prev, currentIndex: prev.currentIndex + 1 }));
  }

  function resetSession() {
    setSession(initialState);
  }

  return (
    <InterviewContext.Provider
      value={{
        session,
        setupSession,
        setQuestions,
        saveAnswer,
        saveFeedback,
        nextQuestion,
        resetSession,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterviewContext() {
  return useContext(InterviewContext);
}