//screen
const historyScreen = document.querySelector(".history");
const displayScreen = document.querySelector(".display");
//buttons-- num/ops
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");

//special buttons
const equal = document.querySelector(".btn-eq");
const clearAll = document.querySelector(".all-clear");
const entityClear = document.querySelector(".entity-clear");

let history = "";
let display = "";
//initializizing the result to null ;
let result = null;

let lastOperation = "";
let Dot = false;

//testig if the dot exists,append the element to the display screen
numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    if (event.target.textContent === "." && !Dot) {
      Dot = true;
    } else if (event.target.textContent === "." && Dot) {
      return "";
    }
    display += event.target.textContent;
    displayScreen.textContent = display;
    //historyScreen.textContent = display;
  });
});

//test if we have a number to the display screen
//and apply the operation
operations.forEach((operation) => {
  operation.addEventListener("click", (event) => {
    if (!display) {
      return;
    }
    Dot = false;
    const operationName = event.target.innerText;
    if (history && display && lastOperation) {
      calculateOperation();
    } else {
      result = parseFloat(display);
      // history = result;
      // historyScreen.innerText = history;
    }
    clearVar(operationName);
    lastOperation = operationName;
    console.log(result);
  });
});

function clearVar(name = "") {
  history += display + "" + name + "";
  historyScreen.innerText = history;
  displayScreen.innerText = "";
  display = "";
  console.log(result);
}
function calculateOperation() {
  if (lastOperation === "*") {
    result = parseFloat(result) * parseFloat(display);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(display);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(display);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(display);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(display);
  }
}

//we need 2 numbers
equal.addEventListener("click", (event) => {
  console.log(event);
  if (!display || !history) {
    return;
  }
  Dot = false;
  calculateOperation();
  //update the screen
  clearVar();
  displayScreen.innerText = result;
  display = result;
  history = "";
});

clearAll.addEventListener("click", (event) => {
  historyScreen.innerText = "0";
  displayScreen.innerText = "0";
  history = "";
  display = "";
  result = "";
});

entityClear.addEventListener("click", (event) => {
  displayScreen.innerText = "";
  display = "";
});
//keys
window.addEventListener("keydown", (event) => {
  if (
    event.key === "0" ||
    event.key === "1" ||
    event.key === "2" ||
    event.key === "3" ||
    event.key === "4" ||
    event.key === "5" ||
    event.key === "6" ||
    event.key === "7" ||
    event.key === "8" ||
    event.key === "9" ||
    event.key === "."
  ) {
    clickButtonElement(event.key);
  } else if (
    event.key === "*" ||
    event.key === "/" ||
    event.key === "-" ||
    event.key === "+" ||
    event.key === "%"
  ) {
    clickButtonOperation(event.key);
  } else if (event.key === "=") {
    clickButtonEqual(event.key);
  }
});

function clickButtonElement(key) {
  numbers.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}
function clickButtonOperation(key) {
  operations.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}
function clickButtonEqual(key) {
  equal.click();
}
