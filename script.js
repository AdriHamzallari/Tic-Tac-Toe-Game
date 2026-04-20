const squares = document.querySelectorAll(".square");
const finalResult = document.getElementById("result-message");
const resetBtn = document.getElementById("reset-btn");
const aiBtn = document.getElementById("mode-btn");
const scoreX = document.getElementById("score-x");
const scoreO = document.getElementById("score-o");
const scoreDraw = document.getElementById("score-draws");
const playerTurn = document.getElementById("player-turn");

let X = 0;
let O = 0;
let drawPoint = 0;

let winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

let gameActive = true;
let player = "X";
let arr = ['', '', '', '', '', '', '', '', ''];

// ===VS Computer mode===
let vsComputer = false;

squares.forEach(function(square) {
  const index = square.getAttribute("data-index");
  square.addEventListener("click", function() {
    handelBtn(index);
  });
});

resetBtn.addEventListener("click", function() {
  reset();
});

// ===Toggle VS Computer mode===
aiBtn.addEventListener("click", function() {
  vsComputer = !vsComputer;
  aiBtn.textContent = vsComputer ? "VS Human" : "VS Computer";
  reset();
});

function handelBtn(index) {
  if (!gameActive) return;

  const position = Number(index);

  if (arr[position] !== '') return;

  // Place current player's mark
  placeMove(position, player);

  // Check result after player move
  if (checkAndHandleResult()) return;

  // If VS computer mode and it's O's turn, trigger AI
  if (vsComputer && player === 'O' && gameActive) {
    // Small delay so the player's move renders first
    setTimeout(computerMove, 400);
  }
}

function placeMove(position, mark) {
  arr[position] = mark;
  squares[position].textContent = mark;
  squares[position].classList.add('taken', mark);

  // Switch player
  if (mark === 'X') {
    player = 'O';
    playerTurn.textContent = 'O';
  } else {
    player = 'X';
    playerTurn.textContent = 'X';
  }
}

function computerMove() {
  if (!gameActive) return;

  // 1. Try to win
  const winMove = findBestMove('O');
  if (winMove !== null) {
    placeMove(winMove, 'O');
    checkAndHandleResult();
    return;
  }

  // 2. Block player from winning
  const blockMove = findBestMove('X');
  if (blockMove !== null) {
    placeMove(blockMove, 'O');
    checkAndHandleResult();
    return;
  }

  // 3. Take center if free
  if (arr[4] === '') {
    placeMove(4, 'O');
    checkAndHandleResult();
    return;
  }

  // 4. Take a random empty square
  const emptySquares = arr
    .map((val, idx) => val === '' ? idx : null)
    .filter(idx => idx !== null);

  if (emptySquares.length > 0) {
    const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    placeMove(randomIndex, 'O');
    checkAndHandleResult();
  }
}

// Finds a winning move for the given mark, returns the position or null
function findBestMove(mark) {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    const cells = [arr[a], arr[b], arr[c]];
    const positions = [a, b, c];

    const markCount = cells.filter(v => v === mark).length;
    const emptyCount = cells.filter(v => v === '').length;

    if (markCount === 2 && emptyCount === 1) {
      return positions[cells.indexOf('')];
    }
  }
  return null;
}

function checkAndHandleResult() {
  const winner = checkWinner();
  if (winner) {
    if (winner === 'X') {
      X++;
      scoreX.textContent = X;
    } else if (winner === 'O') {
      O++;
      scoreO.textContent = O;
    }
    gameActive = false;
    finalResult.textContent = vsComputer && winner === 'O'
      ? 'Computer Wins 🤖'
      : `Player ${winner} Wins 🎉`;
    finalResult.classList.remove("hidden");
    finalResult.classList.add("win");
    return true;
  }

  const draw = checkDraw();
  if (draw) {
    gameActive = false;
    finalResult.textContent = "It's a Draw 🤝";
    finalResult.classList.remove("hidden");
    finalResult.classList.add("draw");
    drawPoint++;
    scoreDraw.textContent = drawPoint;
    return true;
  }

  return false;
}

function checkWinner() {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
      return arr[a];
    }
  }
  return null;
}

function checkDraw() {
  return !arr.includes('') && checkWinner() === null;
}


function reset() {
  finalResult.classList.remove("win", "draw");
  finalResult.classList.add("hidden");
  gameActive = true;
  player = 'X';
  playerTurn.textContent = 'X';
  arr.fill('');
  squares.forEach(function(square) {
    square.classList.remove('taken', 'X', 'O');
    square.textContent = '';
  });
}