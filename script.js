let answerBox = document.getElementById("answer");
let operator = "";
let a = "";
let b = "";
let operatorPressed = false;
let equalsPressed = false;

let buttons = document.querySelectorAll("button");

document.addEventListener("keydown", (event) => {
    const key = event.key;
    console.log(key)
    const button = document.getElementById(key);
    if (button) {
        button.click();
    }
});

buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.id === "clear") {
            clear();
        } 

        else if (button.id === "undo") {
            if (operatorPressed === false) {
                a = a.substring(0,(a.length)-1)
                answerBox.innerHTML = a;
            } else {
                b = b.substring(0, (a.length)-1)
                answerBox.innerHTML = b
            }
        }

        else if (button.id === "dot") {
            if (operatorPressed === false) { // This ensures pressing the dot button won't reset it and seperates A/B
                if (a.includes(".") === false) {
                    a += ".";
                    answerBox.innerHTML = a;
                } 
            } else {
                if (b.includes(".") === false) {
                    b += ".";
                    answerBox.innerHTML = b;
                }
            }
        }
        
        
        else if (button.id === "plus-minus") {
            if (operatorPressed === false) {
                a = -a;
                answerBox.innerHTML = a;
            } else {
                b = -b;
                answerBox.innerHTML = b;
            }
        } else if (button.id === "Enter") {
            equalsPressed = true;
            console.log(operator);
            console.log(a);
            console.log(b);
            b = operate(operator, Number(a), Number(b));
            a = b; // Update 'a' to the result for potential further calculations
            b = ""; // Reset 'b' after calculation
        } else if (button.id === "+" || button.id === "-" || button.id === "*" || button.id === "/" || button.id === "%") {
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
    if (operator === '+') {
        result = add(a, b);
    } else if (operator === '=') {
        result = subtract(a, b);
    } else if (operator === '*') {
        result = multiply(a, b);
    } else if (operator === '/') {
        result = divide(a, b);
    } else if (operator === '%') {
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
