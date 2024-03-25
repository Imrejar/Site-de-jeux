// game.js

let score = 0;
let history = [];
let gameCounter = 0;
function makeChoice(playerChoice) {
    if (gameCounter < 10) {
        const choices = ['rock', 'paper', 'scissors'];
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];

        const result = determineWinner(playerChoice, computerChoice);
        updateScore(result);
        updateHistory(playerChoice, computerChoice, result);
        displayResult(playerChoice, computerChoice, result);
        displayHistory();

        gameCounter++;

        if (gameCounter === 10) {
            document.getElementById('reset-button').style.display = 'block';
        }
    } else {
        // Afficher le bouton de relance
        document.getElementById('reset-button').style.display = 'block';
    }
}
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw';
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'win';
    } else {
        return 'lose';
    }
}
function resetGame() {
    // Réinitialiser les variables
    score = 0;
    history = [];
    gameCounter = 0;

    // Masquer le bouton de relance
    document.getElementById('reset-button').style.display = 'none';

    // Réinitialiser l'affichage
    displayHistory();
    updateScore(score);

}

function updateScore(result) {
    if (result === 'win') {
        score++;
    } else if (result === 'lose') {
        score--;
    }
    document.getElementById('score').innerText = 'Score: ' + score;
}

function updateHistory(playerChoice, computerChoice, result) {
    history.unshift({ player: playerChoice, computer: computerChoice, result: result });
}

function displayResult(playerChoice, computerChoice, result) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <img src="../assets/${playerChoice}.png" width="100" height="100">
        <img src="../assets/versus.png" width="80" height="80">
        <img src="../assets/${computerChoice}.png" width="100" height="100">
        <img src="../assets/${result}.png" width="100" height="100">
    `;
}


function displayHistory() {
    const historyDiv = document.getElementById('history-content');
    const historyModal = document.getElementById('history-modal');
    historyDiv.innerHTML = '<h2>Historique des matchs</h2>';
    
    if (history.length === 0) {
        historyDiv.innerHTML += '<p>Aucun match joué.</p>';
    } else {
        history.forEach((match, index) => {
            const playerImg =`<img src="../assets/${match.player}.png" alt="Player" width="30" height="30">` ;
            const computerImg =`<img src="../assets/${match.computer}.png" alt="Computer" width="30" height="30">`;
            const resultImg = `<img src="../assets/${match.result}.png" alt="Result" width="30" height="30">`;
            const versusImg = `<img src="../assets/versus.png" alt="Result" width="30" height="30"></img>`;
            historyDiv.innerHTML += `<p>Match ${index + 1}:  ${playerImg}   ${versusImg}    ${computerImg}. Résultat: ${resultImg}</p>`;
        });
    }
    const closeButton = document.createElement('span');
    closeButton.innerHTML = '&times;';
    closeButton.id = 'close-btn';
    closeButton.onclick = closeHistory;

    historyModal.innerHTML = '';
    historyModal.appendChild(closeButton);
    historyModal.appendChild(historyDiv);
}

function openHistory() {
    const historyModal = document.getElementById('history-modal');
    historyModal.style.display = 'block';
    displayHistory();
}

function closeHistory() {
    const historyModal = document.getElementById('history-modal');
    historyModal.style.display = 'none';
}
