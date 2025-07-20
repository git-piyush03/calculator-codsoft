const display = document.getElementById('display');
let expression = '0';

// Function to update the display panel
function updateDisplay() {
    display.textContent = expression;
}

// Function to append a number to the expression
function appendNumber(number) {
    // If the current expression is '0' or 'Error', start a new expression
    if (expression === '0' || expression === 'Error') {
        expression = number;
    } else {
        expression += number;
    }
    updateDisplay();
}

// Function to append an operator
function appendOperator(op) {
    if (expression === 'Error') return;

    const lastChar = expression[expression.length - 1];

    // Prevent adding multiple operators in a row by replacing the last one
    if (['+', '-', '*', '/'].includes(lastChar)) {
        expression = expression.slice(0, -1) + op;
    } else {
        expression += op;
    }
    updateDisplay();
}

// Function to clear the display and reset the expression
function clearDisplay() {
    expression = '0';
    updateDisplay();
}

// --- NEW BACKSPACE FUNCTION ---
function backspace() {
    // Return if there's an error on screen
    if (expression === 'Error') return;

    // Remove the last character
    expression = expression.slice(0, -1);

    // If the expression becomes empty, set it back to '0'
    if (expression === '') {
        expression = '0';
    }
    updateDisplay();
}

// Function to calculate the final result
function calculate() {
    if (expression === 'Error') return;
    
    try {
        const result = eval(expression);

        // Check if the result is a number and not infinite
        if (isNaN(result) || !isFinite(result)) {
            expression = 'Error';
        } else {
            // Round the result to a safe number of decimal places (e.g., 10)
            // This is the standard and correct way to fix floating-point issues.
            const roundedResult = Math.round(result * 1e10) / 1e10;
            expression = String(roundedResult);
        }
    } catch (error) {
        // If the expression is invalid (e.g., "5+"), display an error
        expression = 'Error';
    }
    updateDisplay();
}