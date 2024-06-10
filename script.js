document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');
    let currentValue = '0';
    let operator = null;
    let firstOperand = null;

    function updateDisplay() {
        display.value = currentValue;
    }

    function handleDigit(digit) {
        currentValue = currentValue === '0' ? digit : currentValue + digit;
    }

    function handleOperator(nextOperator) {
        if (firstOperand === null) {
            firstOperand = parseFloat(currentValue);
        } else if (operator) {
            const result = performCalculation();
            currentValue = String(result);
            firstOperand = result;
        }
        operator = nextOperator;
        currentValue = '0';
    }

    function performCalculation() {
        const secondOperand = parseFloat(currentValue);
        if (operator === '+') return firstOperand + secondOperand;
        if (operator === '-') return firstOperand - secondOperand;
        if (operator === '*') return firstOperand * secondOperand;
        if (operator === '/') return firstOperand / secondOperand;
        return secondOperand;
    }

    function clear() {
        currentValue = '0';
        operator = null;
        firstOperand = null;
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('operator')) {
                handleOperator(button.textContent);
            } else if (button.classList.contains('equal')) {
                if (operator) {
                    currentValue = String(performCalculation());
                    operator = null;
                }
            } else if (button.classList.contains('clear')) {
                clear();
            } else {
                handleDigit(button.textContent);
            }
            updateDisplay();
        });
    });

    updateDisplay();
});
