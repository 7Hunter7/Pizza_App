import { useState, MouseEvent } from "react";
import Button from "./components/Button/Button";

function App() {
  const [counter, setCounter] = useState<number>(0);

  const addCounter = (e: MouseEvent) => {
    console.log(e.target);
    setCounter(counter + 1);
  };

  return (
    <>
      <Button onClick={addCounter}>{counter ? counter : "Счетичик"}</Button>
    </>
  );
}

export default App;
