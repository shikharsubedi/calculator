let  result = 0
let prevOperation = undefined
let numericArray = []
let prevValue = undefined

const container = document.querySelector('.calculator')

container.addEventListener('click',function(event) {
    if(!event.target.matches('.button')) {
        return
    }
    event.preventDefault()
    const displayOutput = handleClick(event.target.textContent)
    render(displayOutput)
    return
    
})
/**
 * check if the button pressed is an operation
 * @param {String} value the value of the button pressed
 * @returns {Boolean}
 */
function isOperation(value) {
    const operations = ['x','÷','+', '-']
    return operations.includes(value)
}
/**
 * This method checks whether the value is a numeric character
 * @param {String} value A single character representing the value of the button pressed
 * @returns {Boolean}
 */
function isNumber(value) {
    const numericStrings = [1,2,3,4,5,6,7,8,9,0].map(number => number.toString())
    return numericStrings.includes(value)
} 

/**
 * check if the button pressed is the equal sign
 * @param {String} value the value of the button pressed
 * @returns {Boolean}
 */
function isEqualSign(value) {
    return value === '='
}

/**
 * check if the button pressed is the clear button
 * @param {String} value the value of the button pressed
 * @returns {Boolean}
 */
function isClear(value) {
    return value === 'C'
}
/**
 * This method is triggered when any of the buttons is pressed
 * @param {String} value The value of the button pressed
 */
function handleClick(value) {
    
    if(isClear(value)) {
      return processClear()
    }
    if(isOperation(value)) {
        return processOperation(value)
    }
    if(isNumber(value)) {
       return processNumber(value)
    }
    if(isEqualSign(value)) {
        return processEqualSign(value)
    }
}
/**
 * The method processes the '=' (equals) button
 * @param {String} value The value of the button that is pressed
 * @returns {Number}
 */
function processEqualSign(value) {
    let operandString = numericArray.join("") || '0'
    let operand =  Number(operandString)
    if(!prevOperation) {
        result = operand
        prevValue = value
        numericArray = []
        return result
    }
    prevValue = value
    result = executeOperation(prevOperation, result, operand)
    numericArray = []
    return result
}
/**
 * This method handles the 'C' button
 *@returns {Number}
 */
function processClear() {
    reset()
    return result
}
/**
 *resets all the global variables
 */
function reset() {
    prevValue = undefined
    prevOperation = undefined
    numericArray = []
    result = 0
}
/**
 * This method handles when a button is pressed
 * @param {String} value the value of the button pressed
 * @returns {Number}
 */
function  processNumber(value) {
    numericArray.push(value)
    prevValue = value
    return numericArray.join("")
}

/**
 * This method handles the arithmetic operators
 * @param {String} operator The value of the button pressed
 * @returns {Number}
 */
function processOperation(operator) {
    
    let operandString = numericArray.join("") || '0'
    let operand =  Number(operandString)
    numericArray = []
    
    if(isEqualSign(prevValue)) {
        prevValue = operator
        return result
    }
    if(isOperation(prevValue)) {
        prevOperation = operator
        return result
    }
    if(!prevOperation) {
        prevValue = operator
        prevOperation = operator
        result = operand
        return result
    }
    prevValue = operator
    result = executeOperation(prevOperation,result,operand)
    prevOperation = operator
    return result   
}

/**
 * This method performs the operation on the two operands
 * @param {String} operator 
 * @param {Number} operand1 
 * @param {Number} operand2 
 *@returns {Number}
 */
function executeOperation(operator, operand1, operand2) {
    switch(operator) {
        case '-':
        return operand1 - operand2
        case '+':
            return operand1 + operand2
        case '÷':
            return operand1 / operand2
        case 'x':
            return operand1 * operand2
    }
}

function createDisplayObject(content,clear) {
    return {content, clear}
}
/**
 * This method renders the result of processing
 * @param {Number} output The output after processing
 */
function render(output) {
    const display = document.querySelector('.display')
    display.textContent = ""
    if(Number.isNaN(output)){
        reset()
        display.textContent = 'Not a number'
        
    }
    display.textContent= output
}



