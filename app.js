//Internal Game Board
const game_board = [
  [[null], [null], [null]],
  [[null], [null], [null]],
  [[null], [null], [null]],
];
let turn = {
  symbol: "X",
  name: "Player :",
};

//Game Variables
const player = document.getElementById("player");
const symbol = document.getElementById("symbol");
const nodes = document.getElementsByClassName("node");
const gameBoard = document.getElementsByClassName("gameBoard");

//Event Listeners
document.getElementById("gameBoard").addEventListener("click", function (e) {
  clickBox(e);
});

document.getElementById("restart").addEventListener("click", function (e) {
  turn = {
    symbol: "X",
    name: "Player :",
  };
  player.innerHTML = turn.name;
  symbol.innerHTML = turn.symbol;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      game_board[i][j] = null;
    }
  }
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].innerHTML = "";
  }
});

function clickBox(event) {
  if (event.target.innerHTML === "") {
    event.target.innerHTML = turn.symbol;
    insertBoard(event.target.id);
    checkWin();
  }
}

function checkWin() {
  let win = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (game_board[j][i] === turn.symbol) {
        win++;
      }
      if (win === 3) {
        symbol.innerHTML = "Wins";
        return 0;
      }
    }
    win = 0;
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (game_board[i][j] === turn.symbol) {
        win++;
      }
      if (win === 3) {
        symbol.innerHTML = "Wins";
        return 0;
      }
    }
    win = 0;
  }

  if (
    game_board[0][0] === turn.symbol &&
    game_board[1][1] === turn.symbol &&
    game_board[2][2] === turn.symbol
  ) {
    symbol.innerHTML = "Wins";
    return 0;
  }
  if (
    game_board[2][0] === turn.symbol &&
    game_board[1][1] === turn.symbol &&
    game_board[0][2] === turn.symbol
  ) {
    symbol.innerHTML = "Wins";
    return 0;
  }

  turnOrder();
}
function insertBoard(symbol) {
  let symbols = symbol.split("");
  game_board[symbols[0]][symbols[1]] = turn.symbol;
}

function turnOrder() {
  if (turn.symbol === "X") {
    turn.symbol = "O";
    turn.name = "Computer :";
    player.innerHTML = turn.name;
    symbol.innerHTML = turn.symbol;
    
    //computer move
    setTimeout(() => {
      const emptyNodes = Array.from(nodes).filter((node) => !node.innerHTML);
      const randomNode =
        emptyNodes[Math.floor(Math.random() * emptyNodes.length)];
      randomNode.innerHTML = turn.symbol;
      insertBoard(randomNode.id);
      checkWin();
    }, 1000);
  } else {
    turn.symbol = "X";
    turn.name = "Player :";
    player.innerHTML = turn.name;
    symbol.innerHTML = turn.symbol;
  }
}
