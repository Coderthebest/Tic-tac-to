const cells = document.querySelectorAll("[data-cell]");
const message = document.querySelector(".game-message");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "X";

function startGame() {
  cells.forEach(cell => {
    cell.classList.remove("taken");
    cell.textContent = "";
    cell.addEventListener("click", handleClick, { once: true });
  });
  message.textContent = `Player ${currentPlayer}'s turn`;
}

function handleClick(e) {
  const cell = e.target;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  if (checkWin(currentPlayer)) {
    message.textContent = `Player ${currentPlayer} wins!`;
    endGame();
  } else if (Array.from(cells).every(cell => cell.textContent !== "")) {
    message.textContent = "It's a draw!";
    endGame();
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin(player) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombinations.some(combination => {
    return combination.every(index => cells[index].textContent === player);
  });
}

function endGame() {
  cells.forEach(cell => cell.removeEventListener("click", handleClick));
}

restartButton.addEventListener("click", () => {
  currentPlayer = "X";
  startGame();
});

startGame();
