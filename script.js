document.getElementById("startGame").addEventListener("click", start);

let curr = "X";
let size = 3;
let streak = 3;
let Board = [];
let movesCount = 0;

// Starting the game with nxn grid size and m streak
function start() {
  size = parseInt(document.getElementById("gridSize").value);
  streak = parseInt(document.getElementById("winStreak").value);
  if (streak > size) {
    alert("Win streak cannot be greater than grid size");
    return;
  }

  Board = Array(size)
    .fill(null)
    .map(() => Array(size).fill(null));
  movesCount = 0;
  curr = "X";
  document.getElementById("result").innerText = "";

  createBoard();
}

//Creating Game Board
function createBoard() {
  const board = document.getElementById("gameBoard");
  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const input = document.createElement("div");
      input.dataset.row = i;
      input.dataset.col = j;
      input.addEventListener("click", handleCellClick);
      board.appendChild(input);
    }
  }
}

function handleCellClick() {
  const row = this.dataset.row;
  const col = this.dataset.col;

  //checking if cell is occupied
  if (!Board[row][col]) {
    Board[row][col] = curr;
    this.innerText = curr;
    movesCount++;

    if (win(row, col)) {
      document.getElementById("result").innerText = `${curr} wins!`;
      end();
    } else if (movesCount === size * size) {
      document.getElementById("result").innerText = "Draw!";
    } else {
      curr = curr === "X" ? "O" : "X";
    }
  }
}

function win(row, col) {
  return (
    direction(row, col, 1, 0) || // Horizontal
    direction(row, col, 0, 1) || // Vertical
    direction(row, col, 1, 1) || // Diagonal down-right
    direction(row, col, 1, -1)
  ); // Diagonal down-left
}

function direction(row, col, rowDir, colDir) {
  let count = 1;
  count += countInDir(row, col, rowDir, colDir);
  count += countInDir(row, col, -rowDir, -colDir);
  return count >= streak;
}

function countInDir(row, col, rowDir, colDir) {
  let count = 0;
  let r = parseInt(row) + rowDir;
  let c = parseInt(col) + colDir;

  while (r >= 0 && r < size && c >= 0 && c < size && Board[r][c] === curr) {
    count++;
    r += rowDir;
    c += colDir;
  }
  return count;
}

function end() {
  const cells = document.querySelectorAll(".game-board div");
  cells.forEach((cell) => cell.removeEventListener("click", handleCellClick));
}
