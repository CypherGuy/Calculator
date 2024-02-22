let answerBox = document.getElementById("answer");
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
        } else if (button.id === "plus-minus") {
            if (operatorPressed === false) {
                a = -a;
                answerBox.innerHTML = a;
            } else {
                b = -b;
                answerBox.innerHTML = b;
            }
        } else if (button.id === "equals") {
            equalsPressed = true;
            console.log(operator);
            console.log(a);
            console.log(b);
            b = operate(operator, Number(a), Number(b));
            a = b; // Update 'a' to the result for potential further calculations
            b = ""; // Reset 'b' after calculation
        } else if (button.id === "add" || button.id === "subtract" || button.id === "multiply" || button.id === "divide" || button.id === "modulo") {
            console.log(a)
            console.log(b)
            
            if (b.length === 0) {
                operator = button.id;
                operatorPressed = true;
            } else {
                a = operate(operator, Number(a), Number(b));
                // Update 'a' to the result for potential further calculations
                operator = button.id;
                operatorPressed = true;
                b = ""; // Reset 'b' after calculation
            }
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
    answerBox.innerHTML = "0";
}

function operate(operator, a, b) {
    let result;
    if (operator === 'add') {
        result = add(a, b);
    } else if (operator === 'subtract') {
        result = subtract(a, b);
    } else if (operator === 'multiply') {
        result = multiply(a, b);
    } else if (operator === 'divide') {
        result = divide(a, b);
    } else if (operator === 'modulo') {
        result = a % b;
    }
    answerBox.innerHTML = result;
    console.log(`After calculation, a = ${a} and b = ${b}`);
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
    if(b != 0){
        let num = a / b;
        if (isNaN(num)) {
            return "SyntaxError";
        }
        return Math.round((num + Number.EPSILON) * 100) / 100
    } else {
        return "Tut tut.";
    }
}
