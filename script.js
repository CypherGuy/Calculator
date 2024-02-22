let answerBox = document.getElementById("answer");
let currentOperator = "";
let operandA = "";
let operandB = "";
let operatorPressed = false;
let equalsPressed = false;
let operation = "";

let buttons = document.querySelectorAll("button");

document.addEventListener("keydown", (event) => {
    const key = event.key;
    console.log(key);
    const button = document.getElementById(key);
    if (button) {
        button.click();
    }
});

buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.id === "clear") {
            clear();
        } else if (button.id === "undo") {
            if (operatorPressed === false) {
                operandA = operandA.substring(0, (operandA.length) - 1);
                answerBox.innerHTML = operandA;
            } else {
                operandB = operandB.substring(0, (operandB.length) - 1);
                answerBox.innerHTML = operandB;
            }
        } else if (button.id === "dot") {
            if (operatorPressed === false) {
                if (operandA.includes(".") === false) {
                    operandA += ".";
                    answerBox.innerHTML = operandA;
                }
            } else {
                if (operandB.includes(".") === false) {
                    operandB += ".";
                    answerBox.innerHTML = operandB;
                }
            }
        } else if (button.id === "plus-minus") {
            if (operatorPressed === false) {
                operandA = -operandA;
                answerBox.innerHTML = operandA;
            } else {
                operandB = -operandB;
                answerBox.innerHTML = operandB;
            }
        } else if (button.id === "√") {
            if (operatorPressed === false) {
                operandA = Math.round((Math.sqrt(operandA) + Number.EPSILON) * 100) / 100;
                answerBox.innerHTML = operandA;
            } else {
                operandB = Math.round((Math.sqrt(operandB) + Number.EPSILON) * 100) / 100;
                answerBox.innerHTML = operandB;
            }
        } else if (button.id === "1/x") {
            if (operatorPressed === false) {
                operandA = Math.round((1 / operandA + Number.EPSILON) * 100) / 100;
                answerBox.innerHTML = operandA;
            } else {
                operandB = Math.round((1 / operandB + Number.EPSILON) * 100) / 100;
                answerBox.innerHTML = operandB;
            }
        } else if (button.id === "Enter") {
            equalsPressed = true;
            console.log(currentOperator);
            console.log(operandA);
            console.log(operandB);
            operandB = operate(currentOperator, Number(operandA), Number(operandB));
            operandA = operandB;
            operandB = "";
        } else if (button.id === "+" || button.id === "-" || button.id === "*" || button.id === "/" || button.id === "%" || button.id === "^" || button.id === "Log") {
            console.log(operandA);
            console.log(operandB);

            if (operandB.length === 0) {
                currentOperator = button.id;
                operatorPressed = true;
            } else {
                operandA = operate(currentOperator, Number(operandA), Number(operandB));
                currentOperator = button.id;
                operatorPressed = true;
                operandB = "";
            }
        } else {
            if (operatorPressed === false) {
                operandA += button.id;
                answerBox.innerHTML = operandA;
            } else {
                operandB += button.id;
                answerBox.innerHTML = operandB;
            }
        }
    });
});

function clear() {
    currentOperator = "";
    operandA = "";
    operandB = "";
    operatorPressed = false;
    equalsPressed = false;
    answerBox.innerHTML = "0";
}

function operate(operator, a, b) {
    let result;
    if (operator === '+') {
        result = add(a, b);
    } else if (operator === '-') {
        result = subtract(a, b);
    } else if (operator === '*') {
        result = multiply(a, b);
    } else if (operator === '/') {
        result = divide(a, b);
    } else if (operator === '%') {
        result = Math.round(((a % b) + Number.EPSILON) * 100) / 100;
    } else if (operator === "^") {
        result = Math.round(((a ** b) + Number.EPSILON) * 100) / 100;
    } else if (operator === "Log") {
        result = Math.round(((Math.log(a) / Math.log(b)) + Number.EPSILON) * 100) / 100;
    }
    answerBox.innerHTML = result;
    console.log(`After calculation, operandA = ${a} and operandB = ${b}`);
    operatorPressed = false;
    equalsPressed = false;
    return result;
}

function add(a, b) {
    let num = a + b;
    if (isNaN(num)) {
        return "SyntaxError";
    }
    return num;
}

function subtract(a, b) {
    let num = a - b;
    if (isNaN(num)) {
        return "SyntaxError";
    }
    return num;
}

function multiply(a, b) {
    let num = a * b;
    if (isNaN(num)) {
        return "SyntaxError";
    }
    return num;
}

function divide(a, b) {
    if (b != 0) {
        let num = a / b;
        if (isNaN(num)) {
            return "SyntaxError";
        }
        return Math.round((num + Number.EPSILON) * 100) / 100;
    } else {
        return "Tut tut.";
    }
}
