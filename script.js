const numbers = document.querySelectorAll('.number');
const operators = ['+', '-', '*', '/'];
let expression = '';

const display = document.getElementById('display');

function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function resetCalculator() {
  expression = '';
  clearDisplay();
}

function evaluateExpression() {
  let operator;
  
  if (expression.includes('+')) {
    operator = '+';
  } else if (expression.includes('-')) {
    operator = '-';
  } else if (expression.includes('*')) {
    operator = '*';
  } else if (expression.includes('/')) {
    operator = '/';
  } else {
    window.alert('Invalid expression. You need two numbers and an operator.');
    return;
  }

  const parts = expression.split(operator);

  if (parts.length !== 2) {
    window.alert('Invalid expression. You need two numbers.');
    return;
  }

  const firstNum = parseFloat(parts[0]);
  const secondNum = parseFloat(parts[1]);

  if (isNaN(firstNum) || isNaN(secondNum)) {
    window.alert('Invalid numbers.');
    return;
  }

  const result = operate(operator, firstNum, secondNum);
  display.value = result;
  expression = result.toString();
}


function operate(operator, num1, num2) {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
    default:
      return 0;
  }
}

numbers.forEach(button => {
  button.addEventListener('click', function() {
    appendToDisplay(this.value);
    expression += this.value;
  });
});

document.querySelector('#decimal').addEventListener('click', function() {
  if (display.value.includes('.')) {
    window.alert('Only one decimal is allowed in a single number.');
    return;
  }
  appendToDisplay(this.value);
  expression += this.value;
});

document.querySelectorAll('input[type="button"]').forEach(button => {
  if (operators.includes(button.value)) {
    button.addEventListener('click', function() {
      appendToDisplay(this.value);
      expression += this.value;
    });
  }
});

document.querySelector('input[value="="]').addEventListener('click', function() {
  evaluateExpression();
});

document.querySelector('input[value="C"]').addEventListener('click', function() {
  resetCalculator();
});
