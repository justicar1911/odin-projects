const displayInput = document.querySelector("#display-input")
const numberBtnSection = document.querySelectorAll(".buttons > :not(.operator)")
const operatorBtnSection = document.querySelectorAll('.operator:not([value="="])')
const equalBtn = document.querySelector("#equal")
const clearBtn = document.querySelector("#clear")
const testBtn = document.querySelector("#test")
const dotBtn = document.querySelector("#dot")
let operations = []
let isCalculated = false

displayInput.addEventListener("input", (e) => {
    if ((e.target.value).includes(".")) {
        dotBtn.disabled = true
    } else {
        dotBtn.disabled = false
    };
});

numberBtnSection.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault()
        if (!isCalculated) {
            setDisplay("")
            isCalculated = true
        }
        displayInput.value += e.target.value
    })
})

operatorBtnSection.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault()
        if (operations.length == 2) {
            operations[1] = e.target.value
        }

        operations.push(+displayInput.value)
        operations.push(e.target.value)

        setDisplay("")

        if (operations.length > 3) {
            let result = Number(operate(operations[1], operations[0], operations[2]).toFixed(2))
            setDisplay(result)
            operations = [result, e.target.value]
            isCalculated = false
        }
    })
})

equalBtn.addEventListener("click", (e) => {
    e.preventDefault()
    if (!operations.length) {
        return
    }

    operations.push(+displayInput.value)

    if (operations.length == 3) {
        let result = Number(operate(operations[1], operations[0], operations[2]).toFixed(2))
        setDisplay(result)
        operations = []
        isCalculated = false
    }
})

testBtn.addEventListener("click", (e) => {
    console.log(operations)
})

clearBtn.addEventListener("click", (e) => {
    e.preventDefault()
    setDisplay("")
    operations = []
    isCalculated = false
})

testBtn.addEventListener("click", (e) => {
    e.preventDefault()
    console.log(operations, isCalculated)
})

function setDisplay(message) {
    displayInput.value = message
    displayInput.dispatchEvent(new Event("input", {
        bubbles: true
    }))
}

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    if (b == "0") {
        setDisplay("CANNOT DIVIDED BY 0")
        isCalculated = false
        operations = []
        return
    }

    return a / b
}

function operate(operand, a, b) {
    switch (operand) {
        case "+":
            return add(a, b)
        case "-":
            return subtract(a, b)
        case "*":
            return multiply(a, b)
        case "/":
            return divide(a, b)
        default:
            break
    }
}