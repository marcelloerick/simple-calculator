import { add, subtract, multiply, divide } from "./utils/math.js";

const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let operator = null;
let previousInput = "";

function updateDisplay() {
    display.innerText = currentInput || '0';
}

function appendNumber(number) {
    if (currentInput === '0') currentInput = '';
    currentInput += number;
    updateDisplay();
}

function setOperator(op) {
    if (currentInput === '') return;
    if (previousInput === '') calculate();
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function clearDisplay() {
    currentInput: '0';
    previousInput: '';
    operator: null;
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = add(prev, current);
            break;
        case '-':
            result = subtract(prev, current);
            break;
        case '*':
            result = multiply(prev, current);
            break;
        case '/':
            result = divide(prev, current);
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay();
}

// Event Listeners for Mouse clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.dataset.number) appendNumber(button.dataset.number);
        if (button.dataset.action === 'operator') setOperator(button.dataset.value);
        if (button.dataset.action === 'clear') clearDisplay();
        if (button.dataset.action === 'calculate') calculate();
    });
});

// Event Listeners for Keyboard presses
window.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') appendNumber(event.key);
    if (event.key === '+') setOperator('+');
    if (event.key === '-') setOperator('-');
    if (event.key === '*') setOperator('*');
    if (event.key === '/') setOperator('/');
    if (event.key === 'Enter' || event.key === '=') calculate();
    if (event.key === 'Escape') clearDisplay();
    if (event.key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }
});