const display = document.getElementById('display');
const buttons = document.querySelectorAll('.number, .operator, .clear, .calculate, .decimal');

let currentInput = '';
let currentOperator = '';
let firstOperand = '';
let waitingForSecondOperand = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function handleNumberButtonClick(number) {
    if (waitingForSecondOperand) {
        currentInput = number;
        waitingForSecondOperand = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function handleOperatorButtonClick(operator) {
    if (currentOperator !== '') {
        calculate();
    }
    firstOperand = currentInput;
    currentOperator = operator;
    currentInput = '';
}

function calculate() {
    if (currentInput !== '') {
        const operand1 = parseFloat(firstOperand);
        const operand2 = parseFloat(currentInput);
        switch (currentOperator) {
            case '+':
                currentInput = operand1 + operand2;
                break;
            case '-':
                currentInput = operand1 - operand2;
                break;
            case '*':
                currentInput = operand1 * operand2;
                break;
            case '/':
                if (operand2 !== 0) {
                    currentInput = operand1 / operand2;
                } else {
                    currentInput = 'Error';
                }
                break;
        }
        currentOperator = '';
        waitingForSecondOperand = true;
        updateDisplay();
    }
}

function clear() {
    currentInput = '';
    currentOperator = '';
    firstOperand = '';
    waitingForSecondOperand = false;
    updateDisplay();
}

function handleDecimalButtonClick() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

for (let button of buttons) {
    button.addEventListener('click', function () {
        const buttonText = button.textContent;
        
        if (button.classList.contains('number')) {
            handleNumberButtonClick(buttonText);
        } else if (button.classList.contains('operator')) {
            handleOperatorButtonClick(buttonText);
        } else if (button.classList.contains('calculate')) {
            calculate();
        } else if (button.classList.contains('clear')) {
            clear();
        } else if (button.classList.contains('decimal')) {
            handleDecimalButtonClick();
        }
    });
}
