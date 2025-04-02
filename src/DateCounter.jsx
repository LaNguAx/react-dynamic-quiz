import { useReducer } from "react";

const DEFAULT_START = 0;
const DEFAULT_STEP = 1;
const initialState = { count: DEFAULT_START, step: DEFAULT_STEP };

// useReducer is advanced way to handle state.
function reducer(state, action) {
  console.log(state, action);
  // if (action.type === "inc") return state + 1;
  // if (action.type === "dec") return state - 1;
  // if (action.type === "setCount") return action.payload;

  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + state.step };
    case "dec":
      return { ...state, count: state.count - state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    const action = { type: "dec" };
    dispatch(action);
  };

  const inc = function () {
    const action = { type: "inc" };
    dispatch(action);
  };

  const defineCount = function (e) {
    const action = { type: "setCount", payload: Number(e.target.value) };
    dispatch(action);
  };

  const defineStep = function (e) {
    const action = { type: "setStep", payload: Number(e.target.value) };
    dispatch(action);
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
