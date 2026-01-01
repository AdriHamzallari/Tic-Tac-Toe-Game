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
squares.forEach(function(square){
   const index = square.getAttribute("data-index");
   square.addEventListener("click", function (){
   handelBtn(index);
   })
});
   resetBtn.addEventListener("click", function (){
    reset();
})
let  winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                      [0, 3, 6], [1, 4, 7], [2, 5, 8],
                      [0, 4, 8], [2, 4, 6]];
 let gameActive = true;
 let player = "X";
 let arr = ['', '', '', '', '', '', '', '', ''];
function handelBtn(index){
    /*===Kontrol nese loja eshte e hapur===*/
    if(!gameActive){
        return;
    }
    //index vjen si string sepse data-index e a te tille
    const position =Number(index);
    console.log("Butoni i shtypur", position);
   /*====Kontrollo nese ka vlere brenda ne nje kuti====*/
    if(arr[position] !== ''){
    console.log("Gabim");
    return;
   };
    arr[position] = player;
    console.log("fmwelm: ", arr[position]);
    squares[position].textContent = player;
    squares[position].classList.add('taken', player);
      /*====Ndrysho Lojtaret====*/
    if(player === 'X'){
        player = 'O';
        playerTurn.textContent = 'O';
    }
    else{
        player = 'X';
        playerTurn.textContent = 'X';
    }

    /*====WINNER====*/
    const winner = checkWinner();
    if(winner){
        if(winner === 'X'){
            X++;
            scoreX.textContent = X;
        }
        else if(winner === 'O'){
           O++;
           scoreO.textContent = O;
        }
        gameActive = false;
        finalResult.textContent = `Player ${winner} Wins 🎉`;
        finalResult.classList.remove("hidden");
        finalResult.classList.add("win");
        return;
    };
    /*====DRAW====*/
    const draw = checkDraw();
    if(draw){
  gameActive = false;
  finalResult.textContent = "It's a Draw";
  finalResult.classList.remove("hidden");
  finalResult.classList.add("draw");
  drawPoint++;
  scoreDraw.textContent = drawPoint;
  return;   
    };
    
 
}
function checkWinner(){
    for(const pattern of winPatterns){
        const [a, b, c] = pattern;
        if(arr[a] && arr[a] === arr[b] && arr[a] === arr[c]){
            return arr[a];
        }
    }
    return null;
}
function checkDraw() {
    if (!arr.includes('') && checkWinner() === null) {
        return true;
    }
    return false;
}
function reset(){
        finalResult.classList.remove("win", "draw");
        finalResult.classList.add("hidden");
         gameActive = true;
         player = 'X';
    squares.forEach(function(square){
        square.classList.remove('taken', 'X', 'O');
        square.textContent = '';
        const arr2 = ['', '', '', '', '', '', '', '', ''];
        arr.splice(0, arr.length, ...arr2);
    })
}



