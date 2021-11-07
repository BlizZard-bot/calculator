// TODO: Add keyboard support

//Global variables and DOM Elements
// NOTE: Throughout the code calculationDisplay refers to the top part of the display while resultDisplay refers to its bottom part
const date = new Date();
let operator = null;
const time = document.querySelector(".time");
const main = document.querySelector(".main");
const audio = document.querySelector("audio");
const calculationDisplay = document.querySelector(".calculation");
const resultDisplay = document.querySelector(".result");
const equalsBtn = document.querySelector(".equals");
const operations = ["÷", "-", "+", "x"];
const decimalBtn = document.querySelector(".decimal-btn");
const darkThemeBtn = document.querySelector(".dark-toggle");
const lightThemeBtn = document.querySelector(".light-toggle");

// Adding click event listener to darkThemeBtn(moon icon)
darkThemeBtn.addEventListener("click", () => {
  // Removing light-theme class and adding dark-theme class to body
  document.body.classList.add("dark-theme");
  document.body.classList.remove("light-theme");
});

// Adding click event listener to lightThemeBtn(sun icon)
lightThemeBtn.addEventListener("click", () => {
  // Removing dark-theme class and adding light-theme class to body
  document.body.classList.add("light-theme");
  document.body.classList.remove("dark-theme");
});

// Displaying time on the calculator
time.textContent = getTime();

// Function to display the local time
function getTime() {
  //   If the minutes are less than 10 i.e. 9,8 etc
  if (date.getMinutes() <= 10) {
    //   Then make the time display a 0 before them i.e. 09,08 etc
    return `${date.getHours()}:0${date.getMinutes()}`;
    // Otherwise display the time normally
  } else {
    return `${date.getHours()}:${date.getMinutes()}`;
  }
}
// Adding onclick event listener to the calculator
main.addEventListener("click", (e) => {
  // Playing click sound if button is clicked
  if (e.target.classList.contains("btn")) {
    audio.play();
  }
  // If negate button(+/-) is clicked, then return the negative of the displayed number
  if (e.target.classList.contains("negate-btn")) {
    if (!isNaN(Number(resultDisplay.textContent))) {
      resultDisplay.textContent = negate(resultDisplay.textContent);
    }
  }
  // If event is fired on btn which is not a function(AC,C etc), not the equals button, not an operation or a decimal
  if (
    e.target.classList.contains("btn") &&
    !e.target.classList.contains("function") &&
    !e.target.classList.contains("operation") &&
    !e.target.classList.contains("equals") &&
    !e.target.classList.contains("decimal-btn")
  ) {
    // Add the value of button to the value of resultDisplay
    resultDisplay.textContent += e.target.textContent;
  }
  // If decimal button is clicked, call addDecimal()
  if (e.target.classList.contains("decimal-btn")) {
    addDecimal();
  }

  // If an operation is clicked
  if (e.target.classList.contains("operation")) {
    // Call setOperation on its value and pass in the value of the target(the operator)
    setOperation(e.target.textContent);
    // Set the value of resultDisplay to blank
    resultDisplay.textContent = "";
  }
  // If equals is clicked, call displayResult()
  if (e.target.classList.contains("equals")) {
    displayResult();
  }
});

// Fetching clearAll from the DOM
const clearAll = document.querySelector(".clear-all");
// Adding onclick event listener to clearAll and setting the value of both displays to blank
clearAll.addEventListener("click", () => {
  calculationDisplay.textContent = "";
  resultDisplay.textContent = "";
});

// Fetching clearLast from the DOM
const clearLast = document.querySelector(".clear-last");
// Adding onclick event listener to clearLast
clearLast.addEventListener("click", () => {
  // Storing the value of resultDisplay in a variable
  let value = resultDisplay.textContent;
  // Removing the last character from value
  value = value.slice(0, -1);
  // Reassigning value to resultDisplay's value
  resultDisplay.textContent = value;
});

// Function to set resultDisplay's value to the answer of the expression
function displayResult() {
  // Adding resultDisplay's value to calculationDisplay
  calculationDisplay.textContent += resultDisplay.textContent;
  // Storing calculationDisplay's value in a variable
  let value = calculationDisplay.textContent;
  // Removing all whitespaces
  value = value.replace(/\s+/g, "");
  // Converting into character array named valueArray
  let valueArray = value.split("");
  // For each instance of valueArray
  for (let i in valueArray) {
    // If Number(that instance) is NAN(i.e. its a string(referring to an operator)) and its index isn't 0
    if (isNaN(Number(valueArray[i])) && value.indexOf(valueArray[i]) !== 0) {
      // Storing the value of that instance(the operator) in a variable
      operator = valueArray[i];
      // Getting its index
      let operatorIndex = valueArray.indexOf(operator);
      // Slicing array from start to its index to get  firstNumber
      let firstNumber = value.slice(0, operatorIndex);
      // Slicing array from operatorIndex + 1  to the end to get  secondNumber
      let secondNumber = value.slice(operatorIndex + 1, value.length);
      // Setting resultDisplay's value to the result
      resultDisplay.textContent = operate(operator, firstNumber, secondNumber);
      // If resultDisplay isn't zero
      if (+resultDisplay.textContent !== 0) {
        // Rounding resultDisplay's value to 0, and then converting it to Number so that for non-decimal numbers, the decimals don't show
        resultDisplay.textContent = +parseFloat(
          resultDisplay.textContent
        ).toFixed(4);
      }
      // Setting calculationDisplay's value to an appropriate one
      calculationDisplay.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
      // Setting global variable operator to null
      operator = null;
    }
  }
}

// Function to evaluate expression
function operate(operator, a, b) {
  // Checking if operator is division and we are dividing by 0
  if (operator === "÷" && +b === 0) {
    // If so displaying an appropriate error message
    alert("Can't divide by 0");
    // If statements to return the value of various operations
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

// Function to add decimals
function addDecimal() {
  // If resultDisplay already contains a decimal then return
  if (resultDisplay.textContent.includes(".")) return;
  else {
    // Otherwise add a decimal to it
    resultDisplay.textContent += ".";
  }
}

// Function to display proper content when an operator is clicked
function setOperation(operation) {
  // If operator isn't null, then call displayResult
  if (operator !== null) displayResult();
  // Getting firstNumber from resultDisplay's value
  firstNumber = resultDisplay.textContent;
  // Setting the value of operator to the function argument
  operator = operation;
  // Setting calulationDisplay to firstNumber + the operator
  calculationDisplay.textContent = `${firstNumber} ${operator}`;
}
