let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let gameActive = false; // Initially set to false

window.onload = function() {
    setTimeout(() => {
        document.getElementById('introScreen').style.display = 'none';
        document.getElementById('gameScreen').style.display = 'block';
        gameActive = true; // Set gameActive to true after 5 seconds
    }, 6000);
}

function cellClicked(index) {
    if (gameActive && board[index] === '') {
        board[index] = currentPlayer;
        document.getElementsByClassName('cell')[index].innerText = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('playerTurn').innerText = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    for (let i = 0; i < winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i];
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            showWinnerModal(board[a]);
            return;
        }
    }
    if (!board.includes('')) {
        gameActive = false;
        showDrawModal();
    }
}

function showWinnerModal(winner) {
    document.getElementById('winner').innerText = winner;
    document.getElementById('winModal').style.display = 'flex';
}

function showDrawModal() {
    document.getElementById('drawModal').style.display = 'flex';
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
    }
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    document.getElementById('gameScreen').style.display = 'block';
    document.getElementById('playerTurn').innerText = `Player ${currentPlayer}'s turn`;
}
