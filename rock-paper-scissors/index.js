const playBtn = document.querySelector("#playBtn")
const controller = document.querySelector("#controller")
const result = document.querySelector("#result")

let playerSelection = ''
let humanScore = 0;
let computerScore = 0;

controller.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        playerSelection = event.target.innerText
    }
})
playBtn.addEventListener("click", playGame)

function playGame() {
    if (!playerSelection) {
        showMessage(result, "p", "You must select an option first!", false)
        return
    }

    playRound(getHumanChoice(), getComputerChoice())

    if (humanScore === 5 || computerScore === 5) {
        const msg = humanScore > computerScore ? 'Human wins!' : 'Computer wins!'
        showMessage(result, "p", msg)
        resetGame()
    }

}
function playRound(humanChoice, computerChoice) {
    resetPlayerSelection()
    clearOutputMsg()
    let msg = ''

    if (humanChoice === 'Rock' && computerChoice === 'Scissors'
        || humanChoice === 'Paper' && computerChoice === 'Rock'
        || humanChoice === 'Scissors' && computerChoice === 'Paper') {
        msg = `You win!\n${humanChoice} beats ${computerChoice}`
        humanScore++
    } else if (humanChoice === computerChoice) {
        msg = `Draw! Both are ${humanChoice}`
    } else {
        msg = `You lose! ${computerChoice} beats ${humanChoice}`
        computerScore++
    }

    msg += `\nHuman score: ${humanScore}\nComputer Score: ${computerScore}`

    showMessage(result, "p", msg)
}


function getHumanChoice() {
    return playerSelection
}

function getComputerChoice() {
    const choices = ['Rock', 'Paper', 'Scissors']
    const random = getRandomInt(choices.length)

    return choices[random]
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

function resetGame() {
    humanScore = 0
    computerScore = 0
}

function clearOutputMsg() {
    result.innerHTML = ''
}

function resetPlayerSelection() {
    playerSelection = ''
}

function showMessage(parentNode, tagName, text, isAppend = true) {
    const element = document.createElement(tagName)
    element.innerText = text
    isAppend ? parentNode.appendChild(element) : parentNode.innerHTML = element
}