document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetBtn = document.getElementById('resetBtn');
    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Create the game board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }

    // Event listener for cell clicks
    function handleCellClick(event) {
        const index = event.target.dataset.index;
        if (boardState[index] === '' && gameActive) {
            boardState[index] = currentPlayer;
            event.target.textContent = currentPlayer;
            if (checkWinner()) {
                status.textContent = `Player ${currentPlayer} wins!`;
                gameActive = false;
            } else if (boardState.every(cell => cell !== '')) {
                status.textContent = 'It\'s a draw!';
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Current player: ${currentPlayer}`;
            }
        }
    }

    // Event listener for reset button
    resetBtn.addEventListener('click', resetGame);

    // Check for a winner
    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return boardState[a] !== '' && boardState[a] === boardState[b] && boardState[a] === boardState[c];
        });
    }

    // Reset the game
    function resetGame() {
        boardState = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        status.textContent = 'Current player: X';
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
        });
    }
});
