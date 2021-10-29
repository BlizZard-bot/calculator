const time = document.querySelector(".time");
const date = new Date();
time.textContent = `${date.getHours()}:${date.getMinutes()}`;
const main = document.querySelector(".main");
const audio = document.querySelector("audio");
const calculationDisplay = document.querySelector(".calculation");
const resultDisplay = document.querySelector(".result");
const equalsBtn = document.querySelector(".equals");
const operations = ["+", "-", "÷", "x"];
main.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    audio.play();
  }
  if (e.target.classList.contains("negate-btn")) {
    if (!isNaN(Number(resultDisplay.textContent))) {
      calculationDisplay.textContent = negate(calculationDisplay.textContent);
      resultDisplay.textContent = negate(resultDisplay.textContent);
    }
  }
  if (
    e.target.classList.contains("btn") &&
    !e.target.classList.contains("function") &&
    !e.target.classList.contains("equals")
  ) {
    calculationDisplay.textContent += e.target.textContent;
    resultDisplay.textContent += e.target.textContent;
  }

  if (e.target.classList.contains("equals")) {
    displayResult();
  }
  if (e.target.classList.contains("operation")) {
    let count = 0;
    for (let i = 0; i < calculationDisplay.textContent.length; i++) {
      for (let j = 0; j < operations.length; j++) {
        if (
          calculationDisplay.textContent.charAt(i) === operations[j] &&
          calculationDisplay.textContent.charAt(0) != operations[j]
        ) {
          count += 1;
        }
      }
    }
    if (count >= 2) {
      let value = calculationDisplay.textContent;
      value = value.split("").pop();
      calculationDisplay.textContent = calculationDisplay.textContent.slice(
        0,
        calculationDisplay.textContent.length - 1
      );
      displayResult();
      calculationDisplay.textContent += value;
      resultDisplay.textContent += value;
    }
  }
});

const clearAll = document.querySelector(".clear-all");
clearAll.addEventListener("click", () => {
  calculationDisplay.textContent = "";
  resultDisplay.textContent = "";
});

const clearLast = document.querySelector(".clear-last");
clearLast.addEventListener("click", () => {
  let value = calculationDisplay.textContent;
  newValue = value.slice(0, -1);
  calculationDisplay.textContent = newValue;
  resultDisplay.textContent = newValue;
});

// Calculation Functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function negate(a) {
  return -a;
}

function operate(operator, a, b) {
  if (operator === "÷" && +b === 0) {
    return "Can't divide by 0";
  } else {
    if (operator === "+") {
      return add(+a, +b);
    } else if (operator === "-") {
      return subtract(+a, +b);
    } else if (operator === "÷") {
      return divide(+a, +b);
    } else if (operator === "x") {
      return multiply(+a, +b);
    }
  }
}

function displayResult() {
  let value = calculationDisplay.textContent;
  value = value.replace(/\s+/g, "");
  let stuff = value.split("");
  for (let i in stuff) {
    if (isNaN(Number(stuff[i])) && value.indexOf(stuff[i]) != 0) {
      let operator = stuff[i];
      let operatorIndex = stuff.indexOf(operator);
      let firstNumber = value.slice(0, operatorIndex);
      let secondNumber = value.slice(operatorIndex + 1, value.length);
      resultDisplay.textContent = operate(operator, firstNumber, secondNumber);

      resultDisplay.textContent = +parseFloat(
        resultDisplay.textContent
      ).toFixed(4);
      calculationDisplay.textContent = resultDisplay.textContent;
    }
  }
}

// TODO: 1) Restrict from adding more than 1 decimal
// TODO: 2) Add keyboard support
// TODO: 3) Display error message if dividing by 0
