import React, { useState } from "react";
import NumberPad from "./components/numberPad";
import Signs from "./components/Signs";

const App = () => {
  const [displayValue, setDisplayValue] = useState<any | null>(0);
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);

  const handleNumberClick = (number: number) => {
    if (operator === null) {
      setDisplayValue(
        currentValue !== null ? currentValue * 10 + number : number
      );
    } else {
      // If there's an operator, update the second operand
      setCurrentValue(
        currentValue !== null ? currentValue * 10 + number : number
      );
    }
  };

  const handleOperatorClick = (selectedOperator: string) => {
    if (currentValue !== null) {
      // If there's a current value, perform the previous operation
      calculateResult();
    }
    setOperator(selectedOperator);
  };

  const calculateResult = () => {
    if (currentValue !== null && operator !== null) {
      switch (operator) {
        case "+":
          setDisplayValue(
            displayValue !== null ? displayValue + currentValue : null
          );
          break;
        case "-":
          setDisplayValue(
            displayValue !== null ? displayValue - currentValue : null
          );
          break;
        case "/":
          if (currentValue === 0) {
            console.log("cant divide by zero");
            setDisplayValue("cant divde by zero");
          } else {
            setDisplayValue(
              displayValue !== null ? displayValue / currentValue : null
            );
          }
        default:
          break;
      }
    }
    setCurrentValue(null);
    setOperator(null);
  };

  return (
    <div>
      <div>{displayValue !== null ? displayValue : 0}</div>
      <NumberPad>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <button key={number} onClick={() => handleNumberClick(number)}>
            {number}
          </button>
        ))}
        <button onClick={calculateResult}>=</button>
      </NumberPad>
      <Signs
        children1="+"
        children2="-"
        children3="/" // You can add more operators here
        handleOperatorClick={handleOperatorClick}
      />
    </div>
  );
};

export default App;
