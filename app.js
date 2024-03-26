const player1 = {
    score: 0,
    button: document.querySelector('#player1Button'),
    display: document.querySelector('#player1Display')
}
const player2 = {
    score: 0,
    button: document.querySelector('#player2Button'),
    display: document.querySelector('#player2Display')
}

const resetButton = document.querySelector('#reset');
const playToSelect = document.querySelector('#playto');
let winningScore = 5;
let isGameOver = false;


let previousSelectedIndex = playToSelect.selectedIndex;


function updateScore(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        if (player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add("has-text-primary");
            opponent.display.classList.add("has-text-danger");
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        player.display.innerText = player.score;
    }
}

function winBy2(player, opponent) {
    if (player.score === opponent.score && player.score === winningScore - 1) {
        winningScore++;
        playToSelect.classList.add("overtime");
        playToSelect.selectedOptions[0].innerText = `TieBreaker: Playing to ${winningScore}`
    }
}

function reset() {
    isGameOver = false
    playToSelect.classList.remove('overtime')

    previousSelectedIndex = playToSelect.selectedIndex;

    for (let player of [player1, player2]) {
        player.score = 0;
        player.display.innerText = 0
        player.display.classList.remove("has-text-primary", "has-text-danger")
        player.button.disabled = false
    }
    playToSelect.innerHTML = "";
    for (let i = 0; i <= 5; i++) {
        const optionValue = 5 + i;
        const optionText = optionValue.toString();
        playToSelect.appendChild(new Option(optionText, optionValue));
    }
    
    // Set the selected index back to the previous selected index
    playToSelect.selectedIndex = previousSelectedIndex;

    // Update winningScore to match the selected value in the playToSelect select box
    winningScore = parseInt(playToSelect.value);
}

playToSelect.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    reset()
})

player1.button.addEventListener('click', function () {
    updateScore(player1, player2);
    winBy2(player1, player2);
    console.log(winningScore)
    console.log(`Player1 ${player1.score}`)
})

player2.button.addEventListener('click', function () {
    updateScore(player2, player1)
    winBy2(player2, player1)
})

resetButton.addEventListener('click', reset)



