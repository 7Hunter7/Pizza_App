import "./App.css";
import Button from "./components/Button/Button";

function App() {
  return (
    <>
      <Button
        onClick={() => {
          console.log("Клик по кнопке");
        }}
      >
        Вход
      </Button>
    </>
  );
}

export default App;
