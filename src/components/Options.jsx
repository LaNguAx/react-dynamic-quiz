function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          className={`btn btn-option ${i === answer ? "answer" : ""} ${
            hasAnswered
              ? question.correctOption === i
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() =>
            dispatch({ type: "newAnswer", payload: i, points: question.points })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
