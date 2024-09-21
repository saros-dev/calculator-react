import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState(""); 
  const [result, setResult] = useState(""); 

  
  const handleClick = (value) => {
    if (/[+\-*/]/.test(value) && /[+\-*/]$/.test(input)) {
      return;
    }
    setInput((prev) => prev + value);
  };


  const handleClear = () => {
    setInput("");
    setResult("");
  };


  const calculateResult = () => {
    try {
      const calcResult = eval(input);
      setResult(calcResult.toString());
    } catch (error) {
      setResult("Error");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (/[0-9]/.test(key)) {
        handleClick(key);
      } else if (["+", "-", "*", "/"].includes(key)) {
        handleClick(key);
      } else if (key === "Enter") {
        calculateResult();
      } else if (key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      } else if (key === "Escape") {
        handleClear();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [input]);

  return (
    <div className="calculator">
      <div className="display">
        <div className="input">{input || "0"}</div>
        <div className="result">{result}</div>
      </div>
      <div className="buttons">
        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("/")}>/</button>

        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button onClick={() => handleClick("*")}>*</button>

        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button onClick={() => handleClick("-")}>-</button>

        <button onClick={() => handleClick("0")}>0</button>
        <button onClick={() => handleClick(".")}>.</button>
        <button onClick={calculateResult}>=</button>
        <button onClick={() => handleClick("+")}>+</button>

        <button className="clear" onClick={handleClear}>
          C
        </button>
      </div>
    </div>
  );
};

export default App;

