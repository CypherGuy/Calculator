let answerBox = document.getElementById("answer")
let operator = "";
let a = "";
let b = "";
let operatorPressed = false;
let equalsPressed = false;

let buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.id === "clear") {
            clear();
        } else if (button.id === "equals") {
            equalsPressed = true;
            console.log(operator);
            console.log(a);
            console.log(b);
            operate(operator, Number(a), Number(b));
        } else if (button.id === "add" || button.id === "subtract" || button.id === "multiply" || button.id === "divide") {
            operator = button.id;
            operatorPressed = true;
        } else {
            if (operatorPressed === false) {
                a += button.id;
                answerBox.innerHTML = a;
            } else {
                b += button.id;
                answerBox.innerHTML = b;
            }
        }
    });
});

function clear() {
    operator = "";
    a = "";
    b = "";
    operatorPressed = false;
    equalsPressed = false;
    answerBox.innerHTML = "";
}

function operate(operator, a, b) {
    if (operator === 'add') {
        answerBox.innerHTML = add(a, b);
    } else if (operator === 'subtract') {
        answerBox.innerHTML = subtract(a, b);
    } else if (operator === 'multiply') {
        answerBox.innerHTML = multiply(a, b);
    } else if (operator === 'divide') {
        answerBox.innerHTML = divide(a, b);
    }
}

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
    if(b != 0){
        return a / b;
    } else {
        return "Cannot divide by zero";
    }
}