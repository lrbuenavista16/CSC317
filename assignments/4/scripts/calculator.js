document.addEventListener('DOMContentLoaded', () => {

    // setup for screen and buttons
    const display = document.querySelector('.calculator-display');
    const keys = document.querySelector('.calculator-keys');

    // calculator memory
    const calculator = {
        displayValue: '0',
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
    };

    // updating content displayed on screen; 
    function updateDisplay() {
        let value = calculator.displayValue;
        
        // checking for errors
        if (value === 'Infinity' || value === '-Infinity' || value === 'NaN') {
            display.textContent = 'Error';
            calculator.displayValue = 'Error';
        } else {
             // limiting dipslay length to prevent overflow
            display.textContent = parseFloat(value).toLocaleString('en-US', {
                maximumFractionDigits: 9,
                useGrouping: false
            });
        }
    }

    // running in order for "0" to be displayed on the screen
    updateDisplay();

    // waiting for user input
    keys.addEventListener('click', (event) => {
        const { target } = event;
        if (!target.matches('button')) {
            return;
        }

        const { action } = target.dataset;
        const buttonContent = target.textContent.trim();

        handleInput(action, buttonContent);
        updateDisplay();
    });

    // keyboard
    window.addEventListener('keydown', (event) => {
        const { key } = event;
        let action = null;
        let content = key;

        if (key >= '0' && key <= '9') {
            action = null; // It's a number
        } else if (key === '+') {
            action = 'add';
        } else if (key === '-') {
            action = 'subtract';
        } else if (key === '*') {
            action = 'multiply';
        } else if (key === '/') {
            action = 'divide';
        } else if (key === '.') {
            action = 'decimal';
        } else if (key === 'Enter' || key === '=') {
            action = 'calculate';
        } else if (key === 'Escape' || key === 'Delete' || key === 'Backspace') {
            action = 'clear';
        } else if (key === '%') {
            action = 'percentage';
        } else {
            return; // Exit if the key isn't relevant
        }

        // Prevent default browser actions (like '/' opening search)
        event.preventDefault(); 
        
        handleInput(action, content);
        updateDisplay();
    });

    // main input handling
    function handleInput(action, content) {
        // if an error is showing, any button press (except AC) resets
        if (calculator.displayValue === 'Error') {
            if (action !== 'clear') return;
        }
        
        if (!action) {
            inputNumber(content);
        } else if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            handleOperator(action);
        } else if (action === 'decimal') {
            inputDecimal();
        } else if (action === 'clear') {
            resetCalculator();
        } else if (action === 'calculate') {
            handleEquals();
        } else if (action === 'toggle-sign') {
            toggleSign();
        } else if (action === 'percentage') {
            handlePercentage();
        }
    }

    // 0-9 handling 
    function inputNumber(number) {
        const { displayValue, waitingForSecondOperand } = calculator;

        if (waitingForSecondOperand === true) {
            calculator.displayValue = number;
            calculator.waitingForSecondOperand = false;
        } else {

            // limiting display value
            if (displayValue.length >= 15) {
            return;
        }
            calculator.displayValue = 
                displayValue === '0' ? number : displayValue + number;
        }
    }

    // decimal point handling
    function inputDecimal() {
        if (calculator.waitingForSecondOperand) {
            calculator.displayValue = '0.';
            calculator.waitingForSecondOperand = false;
            return;
        }
        if (!calculator.displayValue.includes('.')) {
            calculator.displayValue += '.';
        }
    }

    // core logic handling
    function handleOperator(nextOperator) {
        const { firstOperand, displayValue, operator } = calculator;
        const inputValue = parseFloat(displayValue);

        if (operator && calculator.waitingForSecondOperand) {
            calculator.operator = nextOperator;
            return;
        }

        if (firstOperand === null) {
            calculator.firstOperand = inputValue;
        } else if (operator) {
            const result = performCalculation(firstOperand, inputValue, operator);
            
            calculator.displayValue = String(result);
            calculator.firstOperand = result;
        }

        calculator.waitingForSecondOperand = true;
        calculator.operator = nextOperator;
    }

    // equals operator handling
    function handleEquals() {
        const { firstOperand, displayValue, operator } = calculator;
        
        if (operator === null || calculator.waitingForSecondOperand) {
            return;
        }

        const secondOperand = parseFloat(displayValue);
        const result = performCalculation(firstOperand, secondOperand, operator);

        calculator.displayValue = String(result);
        calculator.firstOperand = null; 
        calculator.operator = null;
        calculator.waitingForSecondOperand = true; 
    }

    // simple calculations
    function performCalculation(first, second, operator) {
        if (operator === 'add') {
            return first + second;
        }
        if (operator === 'subtract') {
            return first - second;
        }
        if (operator === 'multiply') {
            return first * second;
        }
        if (operator === 'divide') {
            return second === 0 ? 'Error' : first / second;
        }
        return second;
    }

    // AC operator handling
    function resetCalculator() {
        calculator.displayValue = '0';
        calculator.firstOperand = null;
        calculator.waitingForSecondOperand = false;
        calculator.operator = null;
    }

    // (+/-) sign operator handling
    function toggleSign() {
        calculator.displayValue = String(parseFloat(calculator.displayValue) * -1);
    }

    // (%) percentage operator handling
    function handlePercentage() {
        calculator.displayValue = String(parseFloat(calculator.displayValue) / 100);
    }
});