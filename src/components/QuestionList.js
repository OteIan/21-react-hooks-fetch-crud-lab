import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(r => r.json())
      .then(questionsData => setQuestions(questionsData));
  }, [])

  function handleDeleteClick(deletedQuestion) {
    const updatedItems = questions.filter((q) => q.id !== deletedQuestion.id)
    setQuestions(updatedItems);
  }

  function handleUpdateAnswer(newQuestion) {
    const updatedItems = questions.map((q) => q.id === newQuestion.id ? newQuestion : q);
    setQuestions(updatedItems);
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((q) => (
          <QuestionItem
            key={q.id}
            question={q}
            onDeleteQuestion={handleDeleteClick}
            onUpdateAnswer={handleUpdateAnswer}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
