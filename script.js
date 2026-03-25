import { add, subtract, multiply, divide } from "./src/utils/math.js";

const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

const MAX_DIGITS = 12;

let currentInput = "";
let operator = null;
let previousInput = "";
let justCalculated = false; // flag: result was just shown after '='

// ── Display ──────────────────────────────────────────────────────────────────

function updateDisplay(value) {
    display.innerText = value !== "" ? value : "0";
}

// ── Number Formatting ─────────────────────────────────────────────────────────

function formatResult(num) {
    if (num === "Error") return "Error";

    const n = parseFloat(num);
    if (isNaN(n)) return "Error";

    const abs = Math.abs(n);

    // Scientific notation for very large or very small non-zero values
    if (abs !== 0 && (abs >= 1e12 || abs < 1e-6)) {
        return n.toExponential(6);
    }

    // If the plain string is already short enough, use it
    const plain = String(n);
    if (plain.replace("-", "").replace(".", "").length <= MAX_DIGITS) {
        return plain;
    }

    // Too many significant digits — round to fit
    return parseFloat(n.toPrecision(9)).toString();
}

// ── Core Operations ───────────────────────────────────────────────────────────

function appendNumber(number) {
    if (justCalculated) {
        // After pressing '=', start fresh number entry
        currentInput = "";
        justCalculated = false;
    }

    // Prevent multiple decimal points
    if (number === "." && currentInput.includes(".")) return;

    // Enforce digit limit (don't count the decimal point)
    const digits = currentInput.replace(".", "").replace("-", "");
    if (digits.length >= MAX_DIGITS) return;

    // Replace leading zero only for digits (not for ".")
    if (currentInput === "0" && number !== ".") currentInput = "";

    currentInput += number;
    updateDisplay(currentInput);
}

function setOperator(op) {
    if (currentInput === "" && previousInput === "") return;

    if (currentInput === "" && previousInput !== "") {
        // Just change the pending operator without recalculating
        operator = op;
        return;
    }

    if (previousInput !== "" && currentInput !== "") {
        // Chain calculation: evaluate what we have, then continue
        const result = evaluate();
        if (result === "Error") {
            currentInput = "Error";
            previousInput = "";
            operator = null;
            updateDisplay("Error");
            return;
        }
        const formatted = formatResult(result);
        currentInput = "";
        previousInput = formatted;
        operator = op;
        updateDisplay(formatted);
        return;
    }

    // First operator press
    operator = op;
    previousInput = currentInput;
    currentInput = "";
}

function clearDisplay() {
    currentInput = "";
    previousInput = "";
    operator = null;
    justCalculated = false;
    updateDisplay("0");
}

function evaluate() {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return null;

    switch (operator) {
        case "+": return add(prev, current);
        case "-": return subtract(prev, current);
        case "*": return multiply(prev, current);
        case "/": return divide(prev, current);
        default:  return null;
    }
}

function calculate() {
    if (previousInput === "" || currentInput === "" || operator === null) return;

    const result = evaluate();
    if (result === null) return;

    const formatted = result === "Error" ? "Error" : formatResult(result);

    currentInput = formatted;
    previousInput = "";
    operator = null;
    justCalculated = true;
    updateDisplay(formatted);
}

// ── Event Listeners: Mouse ────────────────────────────────────────────────────

buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.dataset.number !== undefined) appendNumber(button.dataset.number);
        if (button.dataset.action === "operator")  setOperator(button.dataset.value);
        if (button.dataset.action === "clear")     clearDisplay();
        if (button.dataset.action === "calculate") calculate();
    });
});

// ── Event Listeners: Keyboard ─────────────────────────────────────────────────

window.addEventListener("keydown", (event) => {
    if (event.key >= "0" && event.key <= "9") appendNumber(event.key);
    if (event.key === ".")                     appendNumber(".");
    if (event.key === "+")                     setOperator("+");
    if (event.key === "-")                     setOperator("-");
    if (event.key === "*")                     setOperator("*");
    if (event.key === "/") { event.preventDefault(); setOperator("/"); }
    if (event.key === "Enter" || event.key === "=") calculate();
    if (event.key === "Escape")                clearDisplay();
    if (event.key === "Backspace") {
        if (justCalculated) { clearDisplay(); return; }
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput);
    }
});

// ── Init ──────────────────────────────────────────────────────────────────────

updateDisplay("0");