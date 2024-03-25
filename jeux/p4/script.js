document.addEventListener("DOMContentLoaded", function() {
    const board = document.querySelector('.board');
    const rows = 6;
    const cols = 7;
    let currentPlayer = 'Red';
    let gameEnded = false;

    function createCell(row, col) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.col = col;
        return cell;
    }

    function createBoard() {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const cell = createCell(row, col);
                board.appendChild(cell);
            }
        }
    }

    function dropToken(col) {
        if (gameEnded) return null;
        
        const cells = document.querySelectorAll(`.cell[data-col="${col}"]`);
        for (let i = cells.length - 1; i >= 0; i--) {
            const cell = cells[i];
            if (!cell.classList.contains('red') && !cell.classList.contains('yellow')) {
                cell.classList.add(currentPlayer);
                return { row: parseInt(cell.dataset.row), col: parseInt(cell.dataset.col) };
            }
        }
        return null;
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
    }

    function checkWinner(row, col) {
        const directions = [
            [-1, 0], // up
            [-1, 1], // up-right
            [0, 1],  // right
            [1, 1]   // down-right
        ];

        for (let [dx, dy] of directions) {
            let count = 1;
            let x = row + dx;
            let y = col + dy;
            while (x >= 0 && x < rows && y >= 0 && y < cols && document.querySelector(`.cell[data-row="${x}"][data-col="${y}"]`).classList.contains(currentPlayer)) {
                count++;
                x += dx;
                y += dy;
            }

            x = row - dx;
            y = col - dy;
            while (x >= 0 && x < rows && y >= 0 && y < cols && document.querySelector(`.cell[data-row="${x}"][data-col="${y}"]`).classList.contains(currentPlayer)) {
                count++;
                x -= dx;
                y -= dy;
            }

            if (count >= 4) {
                displayWinner(currentPlayer);
                gameEnded = true;
                return;
            }
        }
    }

    function resetBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.classList.remove('red', 'yellow');
        });
        gameEnded = false;
        const messages = document.querySelectorAll('.message');
        messages.forEach(message => {
            message.remove();
        });
    }
    const resetButton = document.getElementById('reset-button');

    // Ajouter un gestionnaire d'événements pour l'événement "click" sur le bouton
    resetButton.addEventListener('click', function() {
        resetBoard(); // Appeler la fonction resetBoard() lorsque le bouton est cliqué
    });

    function displayWinner(player) {
        const message = document.createElement('div');
        message.textContent = `${player} a gagné !`;
        message.classList.add('message', 'slide-in'); // Ajoute la classe 'slide-in'
        document.body.appendChild(message);
        document.querySelector('.reset-button').style.display = 'block';
    }
    

    function handleClick(event) {
        if (gameEnded) return;
        
        const col = parseInt(event.target.dataset.col);
        const { row } = dropToken(col);
        if (row !== null) {
            checkWinner(row, col);
            switchPlayer();
        }
    }

    createBoard();
    board.addEventListener('click', handleClick);
});
