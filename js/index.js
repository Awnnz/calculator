// Variables
let firstNum,
    secondNum,
    operator,
    displayValue = '0',
    secondaryDisplay,
    ogSecondNum,
    buffer;

// Selectors
let numberDisplaySelector = document.querySelector('.numberDisplay');
let secondDisplaySelector = document.querySelector('.second-display');
let buttonsSelector = document.querySelectorAll('.button');
let nummberButtons = document.querySelectorAll('.number');
let operatorButtons = document.querySelectorAll('.operator');
let equalButton = document.querySelector('.equal');
let deleteButton = document.querySelector('.del-btn');
let clearButton = document.querySelector('.clear-btn');


// Main
nummberButtons.forEach(button => {
    button.addEventListener('click', populateDisplay)
});

operatorButtons.forEach(button => {
    button.addEventListener('click', populateSecondDisplay)
    button.addEventListener('click', storeValue)
});

equalButton.addEventListener('click', calculate)
equalButton.addEventListener('click', populateSecondDisplay)
deleteButton.addEventListener('click', deleteLastChar)
clearButton.addEventListener('click', clear)

buttonsSelector.forEach(button => {
    button.addEventListener('mousedown', () => {
        button.style.backgroundColor = 'darkgrey'
    })

    button.addEventListener('mouseup', () => {
        button.style.backgroundColor = 'white'
    })

    button.addEventListener('mouseover', () => {
        button.style.backgroundColor = 'grey'
    })

    button.addEventListener('mouseout', () => {
        button.style.backgroundColor = 'white'
    })
})
// Functions

function add(num1, num2) {
    return num1 + num2;
};

function subtract(num1, num2) {
    return num1 - num2;
};

function multiply(num1, num2) {
    return num1 * num2;
};

function divide(num1, num2) {
    return num1 / num2;
};

function operate(num1, num2, operator) {
    switch (operator) {
        case '+': return add(num1, num2);
        case '-': return subtract(num1, num2);
        case '*': return multiply(num1, num2);
        case '/': return divide(num1, num2);
    }
};

function populateDisplay() {
    numberDisplaySelector = document.querySelector('.numberDisplay');
    displayValue = String(displayValue)
    
    let strArr = displayValue.split('');
    if (strArr.length > 15) return
    
    // Allows for only one use of decimal char
    let decimalChecker = strArr.some(char => char === '.');
    if (this.textContent == '.' && decimalChecker) return;
        
    if (this.textContent == 'Del') {
        numberDisplaySelector = displayValue;
        secondDisplaySelector = secondaryDisplay;
    }

    // Replaces 0 at the start
    if (displayValue === '0') {
        numberDisplaySelector.textContent = this.textContent;
        displayValue = this.textContent
        return;
    }

    displayValue += this.textContent;
    numberDisplaySelector.textContent = displayValue;
    
}

function populateSecondDisplay() {
    

    if (this.textContent === '=') {
        secondDisplaySelector.textContent = `${firstNum} ${operator} ${secondNum} ${this.textContent}`;
        return;
    }

    secondDisplaySelector.textContent = `${displayValue} ${this.textContent}`;
    console.log(`first num is ${firstNum} second num is ${secondNum}, op = ${operator}`)
}

function storeValue() {
    operator = this.textContent;  
    if (operator === 'X') operator = '*';
    else if (operator === '÷') operator = '/';
    firstNum = +displayValue;
    displayValue = '';
    console.log(`first num is ${firstNum} second num is ${secondNum}, op = ${operator}`)
}

function calculate() {
    // store current display value into second num
    // update secondary display with the equation
    // do the actual calculation and put the result in display
    if (!secondNum) {
        secondNum = +displayValue;
        ogSecondNum  = secondNum;
    }
    let result = operate(firstNum, secondNum, operator);
    numberDisplaySelector.textContent = result;
    displayValue = result;
    firstNum = result;
    secondNum = ogSecondNum;
    
};

function deleteLastChar() {
    if (typeof displayValue === 'number') return;
    if (displayValue === '0') return;
    displayValue = displayValue.split('').slice(0, -1).join('');
    if (displayValue === '') displayValue = '0'
    numberDisplaySelector.textContent = displayValue;
}

function clear() {
    firstNum = undefined,
    secondNum = undefined,
    operator = undefined,
    displayValue = '0',
    secondaryDisplay = '';

    numberDisplaySelector.textContent = displayValue;
    secondDisplaySelector.textContent = secondaryDisplay;
}

function setSecondNum() {
    buffer = true;
};

