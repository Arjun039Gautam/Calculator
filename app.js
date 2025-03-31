let currentInput = ''
let previousInput = ''
let operator = undefined

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', (event) => {
    const value = event.target.tagName === 'IMG' ? event.target.alt : event.target.textContent

    switch (true) {
      case (!isNaN(value) || value === '.'):
        appendNumber(value)
        break
      case (value === 'AC'):
        clearDisplay()
        break
      case (value === '<-'):
        deleteLastDigit()
        break
      case (value === '='):
        calculate()
        break
      case (value === '%'):
        calculatePercentage()
        break
      default:
        chooseOperator(value)
        break
    }
  })
})

// Function to append numbers to the current input
function appendNumber(number) {
  if (number === '.' && currentInput.includes('.')) {
    return
  }
  currentInput += number
  updateDisplay()
}

// Function to handle operator selection
function chooseOperator(op) {
  if (currentInput === '') {
    return
  }
  if (previousInput !== '') {
    calculate()
  }
  operator = op
  previousInput = currentInput
  currentInput = ''
  updateDisplay()
}

// Function to perform percentage calculations
function calculatePercentage() {
  if (currentInput === '') return

  // Convert current input to percentage of the previous input if operator is set
  if (previousInput !== '' && operator) {
    currentInput = (parseFloat(currentInput) / 100 * parseFloat(previousInput)).toString()
  } else {
    // Convert current input into percentage of itself (e.g., 20% becomes 0.20)
    currentInput = (parseFloat(currentInput) / 100).toString()
  }
  
  // No need to display the % symbol on the screen
  updateDisplay()
}

// Function to perform calculations
function calculate() {
  let result
  const prev = parseFloat(previousInput)
  const current = parseFloat(currentInput)
  if (isNaN(prev) || isNaN(current)) {
    return
  }

  switch (operator) {
    case '+':
      result = prev + current
      break
    case '-':
      result = prev - current
      break
    case '*':
      result = prev * current
      break
    case '/':
      result = prev / current
      break
    default:
      return
  }

  currentInput = result.toString()
  operator = undefined
  previousInput = ''
  updateDisplay()
}

// Function to clear the display
function clearDisplay() {
  currentInput = ''
  previousInput = ''
  operator = undefined
  updateDisplay()
}

// Function to delete the last digit entered
function deleteLastDigit() {
  currentInput = currentInput.slice(0, -1)
  updateDisplay()
}

// Function to update the calculator display
function updateDisplay() {
  const screen = document.getElementById('screen')
  if (operator) {
    screen.value = `${previousInput} ${operator} ${currentInput}`
  } else {
    screen.value = currentInput
  }
}

// Initialize display on page load
clearDisplay()
