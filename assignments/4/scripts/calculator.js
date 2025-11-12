document.addEventListener('DOMContentLoaded', () => {

    // setup for screen and buttons
    const display = document.querySelector('.calculator-display');
    const keys = document.querySelector('.calculator-keys');

    // calculator memory
    const calculator = {
        expression: '0',
        isResult: false,
    };

    // updating content displayed on screen
    function updateDisplay() {
        let value = calculator.expression;

        // error handling
        if (value === 'Infinity' || value === '-Infinity' || value === 'NaN') {
            value = 'Error';
            calculator.expression = 'Error';
        }
        
        display.textContent = value;

        // dynamic font sizing
        const displayLength = value.length;
        
        if (displayLength > 18) {
            display.classList.add('text-xsmall');
            display.classList.remove('text-small');
        } else if (displayLength > 10) {
            display.classList.add('text-small');
            display.classList.remove('text-xsmall');
        } else {
            display.classList.remove('text-small', 'text-xsmall');
        }
    }
    // run once to display 0
    updateDisplay();

    // waiting for user input (mouse click)
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

    // waiting for user input (keyboard)
    window.addEventListener('keydown', (event) => {
        const { key } = event;
        let action = null;
        let content = key;

        // key mapping
        if (key >= '0' && key <= '9') {
            action = null;
        } else if (key === '+') {
            action = 'add'; content = '+';
        } else if (key === '-') {
            action = 'subtract'; content = '-';
        } else if (key === '*') {
            action = 'multiply'; content = '×';
        } else if (key === '/') {
            action = 'divide'; content = '÷';
        } else if (key === '.') {
            action = 'decimal'; content = '.';
        } else if (key === 'Enter' || key === '=') {
            action = 'calculate';
        } else if (key === 'Escape' || key === 'Delete' || key === 'Backspace') {
            action = 'clear';
        } else if (key === '%') {
            action = 'modulo'; content = '%';
        } else {
            return;
        }
        
        event.preventDefault();
        handleInput(action, content);
        updateDisplay();
    });

    // main input handling
    function handleInput(action, content) {
        // if error, only 'clear' works
        if (calculator.expression === 'Error') {
            if (action === 'clear') {
                resetCalculator();
            }
            return;
        }
        
        // check if result is showing AND user typing new number
        if (calculator.isResult === true && !action) {
            // inputNumber() will handle reset.
        } else {
            // otherwise, check for hard cap
            const isAtLimit = calculator.expression.length >= 15;
            
            const isAddingAction = !action ||
                                   action === 'decimal' ||
                                   action === 'add' ||
                                   action === 'subtract' ||
                                   action === 'multiply' ||
                                   action === 'divide' ||
                                   action === 'modulo';

            // if at limit AND trying to add, block
            if (isAtLimit && isAddingAction) {
                return;
            }
        }
        
        if (!action) {
            inputNumber(content);
        } else if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide' ||
            action === 'modulo'
        ) {
            handleOperator(content);
        } else if (action === 'decimal') {
            inputDecimal();
        } else if (action === 'clear') {
            resetCalculator();
        } else if (action === 'calculate') {
            handleEquals();
        } else if (action === 'toggle-sign') {
            toggleSign();
        }
    }

    // 0-9 handling
    function inputNumber(number) {
        if (calculator.isResult === true) {
            calculator.expression = number;
            calculator.isResult = false;
        } else {
            if (calculator.expression === '0') {
                calculator.expression = number;
            } else {
                calculator.expression += number;
            }
        }
    }
    
    // decimal point handling
    function inputDecimal() {
        if (calculator.isResult === true) {
            calculator.expression = '0.';
            calculator.isResult = false;
            return;
        }

        const lastOperatorIndex = Math.max(
            calculator.expression.lastIndexOf('+'),
            calculator.expression.lastIndexOf('-'),
            calculator.expression.lastIndexOf('×'),
            calculator.expression.lastIndexOf('÷'),
            calculator.expression.lastIndexOf('%')
        );
        
        const lastNumber = calculator.expression.slice(lastOperatorIndex + 1);

        if (!lastNumber.includes('.')) {
            calculator.expression += '.';
        }
    }

    // operator handling (+, -, ×, ÷, %)
    function handleOperator(symbol) {
        calculator.isResult = false;
        const lastChar = calculator.expression.slice(-1);
        
        if (['+', '-', '×', '÷', '%'].includes(lastChar)) {
            calculator.expression = calculator.expression.slice(0, -1) + symbol;
        } else {
            calculator.expression += symbol;
        }
    }

    // equals operator handling
    function handleEquals() {
        try {
            let finalExpression = calculator.expression
                .replace(/×/g, '*')
                .replace(/÷/g, '/');

            // result as string
            let resultString = String(eval(finalExpression));

            if (resultString.length > 15) {
                resultString = resultString.slice(0, 15);
                if (resultString.endsWith('.')) {
                    resultString = resultString.slice(0, -1);
                }
            }

            calculator.expression = resultString;
            calculator.isResult = true;
        } catch (e) {
            calculator.expression = 'Error';
            calculator.isResult = true;
        }
    }

    // AC operator handling
    function resetCalculator() {
        calculator.expression = '0';
        calculator.isResult = false;
    }

    // (+/-) sign operator handling
    function toggleSign() {
        try {
            let finalExpression = calculator.expression
                .replace(/×/g, '*')
                .replace(/÷/g, '/');
            
            // result as string
            let resultString = String(eval(finalExpression) * -1);

            if (resultString.length > 15) {
                resultString = resultString.slice(0, 15);
                if (resultString.endsWith('.')) {
                    resultString = resultString.slice(0, -1);
                }
            }
            
            calculator.expression = resultString;
            calculator.isResult = true;
        } catch (e) {
            calculator.expression = 'Error';
            calculator.isResult = true;
        }
    }
});