let  result = 0
let operation = undefined
let numericArray = []
let prevValue = undefined

const container = document.querySelector('.calculator')

container.addEventListener('click',function(event) {
    if(!event.target.matches('.button')) {
        return
    }
    event.preventDefault()
    const displayObject = getOutput(event.target.textContent)
    render(displayObject)
    return
    
})

function isOperation(value) {
    const operations = ['x','÷','+', '-']
    return operations.includes(value)
} 
function isNumber(value) {
    const numericStrings = [1,2,3,4,5,6,7,8,9,0].map(number => number.toString())
    return numericStrings.includes(value)
} 

function isEqualSign(value) {
    return value === '='
}

function isClear(value) {
    return value === 'C'
}

function getOutput(value) {
    
    if(isClear(value)) {
      return processClear()
    }
    if(isOperation(value)) {
        return processOperation(value)
    }
    if(isNumber(value)) {
       return processNumber(value)
    }
    if(isEqual(value)) {
        return processEqualSign()
    }
}

function processClear() {
    return '';
}

function processNumber(value) {
    if(isNumber(prevValue) || prevValue === undefined) {
        numericArray.push(value)
        prevValue = value
        return numericArray.join("")
    }
    if(isOperation(prevValue)) {

    }

}

function processOperation(operator) {
}

function createDisplayObject(content,clear) {
    return {content, clear}
}

function render(output) {
    const display = document.querySelector('.display')
    display.textContent = ""
    
    display.textContent= output
}



