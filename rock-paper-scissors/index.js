function playGame(round = 5) {
    let humanScore = 0;
    let computerScore = 0;

    for (let i = 0; i < round; i++) {
        playRound(getHumanChoice(), getComputerChoice())
    }

    let message = humanScore > computerScore ? 'Human win!' : humanScore < computerScore ? 'Computer win!' : 'Draw!'

    console.log(`${message}\nHuman score: ${humanScore}\nComputer Score: ${computerScore}`)

    function playRound(humanChoice, computerChoice) {
        if (humanChoice == 'rock' && computerChoice == 'scissors'
            || humanChoice == 'paper' && computerChoice == 'rock'
            || humanChoice == 'scissors' && computerChoice == 'paper') {
            console.log(`You win! ${humanChoice} beats ${computerChoice}`)
            humanScore += 1
        } else if (humanChoice == computerChoice) {
            console.log(`Draw!, both are ${humanChoice}`)
        } else {
            console.log(`You lose! ${computerChoice} beats ${humanChoice}`)
            computerScore += 1
        }
    }
}


function getHumanChoice() {
    let choice = ''
    let validAnswers = ['rock', 'paper', 'scissors']

    while (!validAnswers.includes(choice)) {
        choice = prompt('Input your choice').toLowerCase()
    }

    return choice
}

function getComputerChoice() {
    let choices = ['rock', 'paper', 'scissors']
    let random = getRandomInt(3)

    return choices[random]
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

playGame()