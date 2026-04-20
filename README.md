# ⭕ Tic-Tac-Toe ❌

A classic **Tic-Tac-Toe game** built with vanilla JavaScript — play against a friend or challenge the **built-in AI**. Take turns placing X and O, track your score across multiple rounds, and battle it out until someone wins — or it's a draw.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## 🚀 Live Demo

> 🔗 [Play Now →](https://adrihamzallari.github.io/Tic-Tac-Toe-Game) *(deploy to GitHub Pages and update this link)*

---

## 🎮 How to Play

**VS Human (default):**
1. The game starts with **Player X**
2. Players take turns clicking any empty square
3. First to get **3 in a row** (horizontally, vertically, or diagonally) wins
4. If all 9 squares fill up with no winner — it's a **draw**
5. Click **Reset Game** to play again — scores carry over between rounds

**VS Computer:**
1. Click the **VS Computer** button to switch modes
2. You play as **X**, the computer plays as **O**
3. The AI will automatically make its move after yours
4. Click **VS Human** to switch back to 2-player mode

---

## ✨ Features

- 👥 **2-player mode** — local multiplayer, take turns on the same device
- 🤖 **VS Computer mode** — toggle to play against a smart AI opponent
- 🏆 **Persistent scoreboard** — X wins, O wins, and draws tracked across rounds
- 🔄 **Live turn indicator** — always shows whose turn it is
- 🎨 **Color-coded players** — X appears in blue, O in purple
- 🔒 **Click protection** — already-taken squares are blocked from being overwritten
- ✅ **Full win detection** — checks all 8 winning patterns after every move
- 🤝 **Draw detection** — triggers when the board is full and no winner exists
- 📱 **Responsive** — works on mobile and desktop

---

## 🛠️ Built With

| Technology | Purpose |
|------------|---------|
| HTML5 | Board structure, scoreboard, UI layout |
| CSS3 | Styling, hover effects, color-coded results, responsive design |
| JavaScript (ES6) | Game logic, win/draw detection, state management |

No libraries. No frameworks. Zero dependencies.

---

## 📂 Project Structure

```
Tic-Tac-Toe-Game/
├── index.html    # 3x3 grid, scoreboard, turn indicator, styles
└── script.js     # All game logic — move handling, win/draw checks, reset
```

---

## 🧠 How It Works

```
Player clicks a square
  → handelBtn(index) is called
  → checks if game is active and square is empty
  → placeMove() marks arr[position] and updates the UI
  → checkAndHandleResult() runs — checks win then draw
  → if VS Computer mode and game still active → computerMove() fires after 400ms

computerMove() AI strategy (in order):
  1. Win   — if computer can win this turn, take it
  2. Block — if player is about to win, block them
  3. Center — take square 4 (center) if free
  4. Random — pick any remaining empty square

findBestMove(mark) — scans all 8 win patterns looking for
  2 marks + 1 empty slot → returns the empty position

Reset:
  → clears board, removes CSS classes
  → arr.fill('') resets state in one operation
  → scores carry over between rounds
```

Key functions in `script.js`:

| Function | What it does |
|----------|-------------|
| `handelBtn(index)` | Handles square clicks — validates, places move, triggers AI |
| `placeMove(position, mark)` | Marks the board array, updates UI, switches player |
| `computerMove()` | AI: tries to win → block → center → random |
| `findBestMove(mark)` | Scans win patterns for a 2+empty opportunity |
| `checkAndHandleResult()` | Checks win/draw after every move, updates scores |
| `checkWinner()` | Loops all 8 patterns, returns `'X'`, `'O'`, or `null` |
| `checkDraw()` | Returns `true` if board is full and no winner |
| `reset()` | Clears board and resets game state (scores persist) |

---

## 🏃 Getting Started

No installation needed.

```bash
# Clone the repo
git clone https://github.com/AdriHamzallari/Tic-Tac-Toe-Game.git

# Open in your browser
cd Tic-Tac-Toe-Game
open index.html
```

Or [download the ZIP](https://github.com/AdriHamzallari/Tic-Tac-Toe-Game/archive/refs/heads/main.zip) and open `index.html` directly.

---

## 💡 What I Learned

- Managing **game state** with an array (`arr[]`) that mirrors the visual board
- Checking all **8 win conditions** programmatically using pattern arrays
- Building a **rule-based AI** with win, block, and fallback strategies
- Using **`data-index` attributes** to link DOM elements to game state
- Preventing invalid moves with **early return guard clauses**
- Using `setTimeout` to **delay the AI move** so the UI renders first
- Separating **round reset** (board only) from **full reset** (scores too)
- Dynamically toggling **CSS classes** for player colors and result styles

---

## 🗺️ Possible Improvements

- [ ] Highlight the **winning squares** when the game ends
- [ ] Upgrade AI to use the **Minimax algorithm** for an unbeatable opponent
- [ ] Add a **full score reset** button separate from round reset
- [ ] Animate the X and O when placed
- [ ] Add keyboard support for accessibility

---

## 👤 Author

**Adri Hamzallari**
- GitHub: [@AdriHamzallari](https://github.com/AdriHamzallari)
- LinkedIn: [your-linkedin-url](https://linkedin.com)
- Location: Tirana, Albania 🇦🇱

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> *Part of my frontend development portfolio — built with pure HTML, CSS, and JavaScript.*
