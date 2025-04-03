import { useEffect, useReducer } from "react";
import DateCounter from "./DateCounter";
import Header from './Header';
import Loader from './Loader'
import Error from './Error'
import StartScreen from "./StartScreen";
import Question from "./Question"
import Jmain from './Jmain';

const initialState = {
  questions: [],

  // loading, error, ready, active, finished -- possible states that our app can be in.
  status: 'loading',
  index: 0
}

function reducer(state, action) {

  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' }

    case "dataFailed":
      return { ...state, status: 'error' }

    case "start":
      return { ...state, status: 'active' }

    default:
      throw new Error("Action unknown");

  }
}

export default function App() {

  const [{ questions, status, index }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  useEffect(() => {
    fetch("http://localhost:8000/questions").then(res => res.json()).then(data => dispatch({ type: 'dataReceived', payload: data })).catch(err => dispatch({ type: 'dataFailed ' }))
  }, [])

  return (
    <div className="app">
      <Header />

      <Jmain>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'active' && <Question question={questions[index]} />}
      </Jmain>
    </div>
  );
}
