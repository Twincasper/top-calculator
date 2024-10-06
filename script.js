const numbers = document.querySelectorAll('.number');
const operators = ['+', '-', '*', '/'];
let firstNum = '';
let secondNum = '';
let currentOperator = '';
let isSecondNumber = false;

const display = document.getElementById('display');

function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function resetCalculator() {
  firstNum = '';
  secondNum = '';
  currentOperator = '';
  isSecondNumber = false;
  clearDisplay();
}

function evaluateExpression() {
  const num1 = parseFloat(firstNum);
  const num2 = parseFloat(secondNum);

  if (isNaN(num1) || isNaN(num2)) {
    window.alert('Invalid numbers.');
    return;
  }

  const result = operate(currentOperator, num1, num2);
  display.value = result;
  firstNum = result.toString();
  secondNum = '';
  isSecondNumber = false;
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
    if (!isSecondNumber) {
      firstNum += this.value;
      appendToDisplay(this.value);
    } else {
      secondNum += this.value;
      appendToDisplay(this.value);
    }
  });
});

document.querySelector('#decimal').addEventListener('click', function() {
  if (!isSecondNumber) {
    if (!firstNum.includes('.')) {
      firstNum += '.';
      appendToDisplay('.');
    } else {
      window.alert('Only one decimal is allowed in the first number.');
    }
  } else {
    if (!secondNum.includes('.')) {
      secondNum += '.';
      appendToDisplay('.');
    } else {
      window.alert('Only one decimal is allowed in the second number.');
    }
  }
});

document.querySelectorAll('input[type="button"]').forEach(button => {
  if (operators.includes(button.value)) {
    button.addEventListener('click', function() {
      if (currentOperator && !secondNum) {
        window.alert('ONLY ONE OPERATOR PLEASE');
        return;
      }

      if (currentOperator && secondNum) {
        evaluateExpression();
      }

      currentOperator = this.value;
      appendToDisplay(this.value);
      isSecondNumber = true;
    });
  }
});

document.querySelector('input[value="="]').addEventListener('click', function() {
  if (firstNum && currentOperator && secondNum) {
    evaluateExpression();
  } else {
    window.alert('Incomplete expression.');
  }
});

document.querySelector('input[value="C"]').addEventListener('click', function() {
  resetCalculator();
});
