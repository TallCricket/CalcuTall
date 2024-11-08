let currentInput = '';
let equation = '';
let history = [];

function updateDisplay() {
  document.getElementById('equation').innerText = equation || '0';
  document.getElementById('result').innerText = currentInput || '0';
  document.getElementById('history').innerText = history.join('\n');
}

function appendNumber(number) {
  currentInput += number;
  equation += number;
  updateDisplay();
}

function appendOperator(operator) {
  if (currentInput === '') return;
  equation += operator === '/' ? ' ÷ ' : operator === '*' ? ' × ' : ' ' + operator + ' ';
  currentInput = '';
  updateDisplay();
}

function appendDecimal() {
  if (!currentInput.includes('.')) {
    currentInput += '.';
    equation += '.';
    updateDisplay();
  }
}

function clearDisplay() {
  currentInput = '';
  equation = '';
  history = [];
  updateDisplay();
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  equation = equation.slice(0, -1);
  updateDisplay();
}

function calculateResult() {
  if (currentInput === '') return;

  try {
    const result = eval(equation.replace(/×/g, '*').replace(/÷/g, '/'));
    history.push(equation + ' = ' + result);
    currentInput = result.toString();
    equation = '';
  } catch (error) {
    currentInput = 'Error';
  }
  updateDisplay();
}
// Existing JavaScript code remains here

function openHelp() {
  document.getElementById('helpModal').style.display = 'flex';
}

function closeHelp() {
  document.getElementById('helpModal').style.display = 'none';
}

// Close modal if clicked outside of it
window.onclick = function(event) {
  const modal = document.getElementById('helpModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}
