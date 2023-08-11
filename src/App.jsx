import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PasswordStrengthChecker from "./PasswordStrengthChecker";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <PasswordStrengthChecker />
    </>
  );
}

export default App;
