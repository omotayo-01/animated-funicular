import React, { useState } from 'react';
import ReactDom from 'react-dom/client'
import App from './App.jsx' ;
import './index.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [operator, setOperator] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);

  const handleNumberClick = (num) => {
    if (display === '0' || currentValue === '') {
      setDisplay(num);
      setCurrentValue(num);
    } else {
      setDisplay(display + num);
      setCurrentValue(currentValue + num);
    }
  };

  const handleOperatorClick = (op) => {
    if (previousValue === null) {
      setPreviousValue(parseFloat(currentValue));
    } else if (currentValue !== '') {
      calculate();
    }
    setOperator(op);
    setCurrentValue('');
  };

  const handleEqualsClick = () => {
    if (operator && currentValue !== '') {
      calculate();
      setOperator(null);
      setPreviousValue(null);
      setCurrentValue('');
    }
  };

  const calculate = () => {
    const curr = parseFloat(currentValue);
    let result;
    switch (operator) {
      case '+':
        result = previousValue + curr;
        break;
      case '-':
        result = previousValue - curr;
        break;
      case '*':
        result = previousValue * curr;
        break;
      case '/':
        result = previousValue / curr;
        break;
      default:
        return;
    }
    setDisplay(result.toString());
    setPreviousValue(result);
  };

  const handleClearClick = () => {
    setDisplay('0');
    setCurrentValue('');
    setOperator(null);
    setPreviousValue(null);
  };

  const handleDecimalClick = () => {
    if (!currentValue.includes('.')) {
      setDisplay(display + '.');
      setCurrentValue(currentValue + '.');
    }
  };

  const buttons = [
    { label: '7', onClick: () => handleNumberClick('7') },
    { label: '8', onClick: () => handleNumberClick('8') },
    { label: '9', onClick: () => handleNumberClick('9') },
    { label: '/', onClick: () => handleOperatorClick('/') },
    { label: '4', onClick: () => handleNumberClick('4') },
    { label: '5', onClick: () => handleNumberClick('5') },
    { label: '6', onClick: () => handleNumberClick('6') },
    { label: '', onClick: () => handleOperatorClick('') },
    { label: '1', onClick: () => handleNumberClick('1') },
    { label: '2', onClick: () => handleNumberClick('2') },
    { label: '3', onClick: () => handleNumberClick('3') },
    { label: '-', onClick: () => handleOperatorClick('-') },
    { label: '0', onClick: () => handleNumberClick('0') },
    { label: '.', onClick: handleDecimalClick },
    { label: '=', onClick: handleEqualsClick },
    { label: '+', onClick: () => handleOperatorClick('+') },
    { label: 'C', onClick: handleClearClick, className: 'clear' },
  ];

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={btn.onClick}
            className={btn.className || ''}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;