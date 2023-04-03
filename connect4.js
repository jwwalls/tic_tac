const game_board = [];
for (let i = 0; i < 7; i++) {
  game_board.push([]);
}

let turn = {
  symbol: "X",
  name: "Player :",
};
const player = document.getElementById("player");
const symbol = document.getElementById("symbol");
const nodes = document.getElementsByClassName("node");
const gameBoard = document.getElementsByClassName("node");
let turn_count = 0;

document.getElementById("gameBoard").addEventListener("click", function (e) {
  clickBox(e);
});

function clickBox(event) {
    const parentChildren = Array.from(event.target.parentNode.childNodes).filter(
      (node) => node.nodeType === Node.ELEMENT_NODE && !node.innerHTML
    );
    
    if (parentChildren.length === 0) {
      return;
    }else{
        parentChildren[parentChildren.length - 1].innerHTML = turn.symbol;
        insertBoard(parentChildren[parentChildren.length - 1].id);
        checkWin(parentChildren[parentChildren.length - 1].id);
        
    }

  }
  function insertBoard(symbol) {
    let symbols = symbol.split("");
    
    game_board[symbols[0]][symbols[1]] = turn.symbol;
    
  }

  function checkWin(target_id) {
    let symbols = target_id.split("");
    symbols[0] = parseInt(symbols[0]);
    symbols[1] = parseInt(symbols[1]);
    
    
    let win = 0;
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        if (game_board[i][j] === turn.symbol) {
          win++;
        }else{
            win = 0;
        }        
        if (win === 4) {
          symbol.innerHTML = "Wins";
          return 0;
        }
      }
      win = 0;
    }
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          if (game_board[j][i] === turn.symbol) {
            win++;
          }else{
              win = 0;
          }        
          if (win === 4) {
            symbol.innerHTML = "Wins";
            return 0;
          }
        }
        win = 0;
      }
      let zig = 0;
      let zig_x_value = symbols[0];
      let zig_y_value = symbols[1];
      
      while(zig_x_value > 0 && zig_y_value > 0){
        zig_x_value--;
        zig_y_value--;
        zig++;
      }

      for (let i = 0; i < 7 - zig ; i++) {
       if(zig_x_value +i < 7 && zig_y_value + i < 7){
            if(game_board[zig_x_value+i][zig_y_value+i] === turn.symbol){
                console.log(game_board[zig_x_value+i][zig_y_value+i]);
                win++;
            }
            
            if (win === 4) {
            symbol.innerHTML = "Wins";
            return 0;
            }
    }

      }
        // let zag = 0;
        // let zag_x_value = symbols[0];
        // let zag_y_value = symbols[1];

        // while (zag_x_value > 0 && zag_y_value < 6) {
        // zag_x_value--;
        // zag_y_value++;
        // zag++;
        // }

        // for (let i = 0; i < 7 - zag; i++) {
        // const row = zag_x_value + i;
        // const col = zag_y_value - i;

        // if (game_board[row][col] === turn.symbol) {
        //     win++;
        // }

        // if (win === 4) {
        //     symbol.innerHTML = "Wins";
        //     return 0;
        // }
        // }

    turnOrder();
}


function turnOrder() {   
  if (turn.symbol === "X") {
    turn.symbol = "O";
    turn.name = "Computer :";
    player.innerHTML = turn.name;
    symbol.innerHTML = turn.symbol;
    turn_count++;

    //   //computer move
    //   setTimeout(() => {
    //     const emptyNodes = Array.from(nodes).filter((node) => !node.innerHTML);
    //     const randomNode =
    //       emptyNodes[Math.floor(Math.random() * emptyNodes.length)];
    //     randomNode.innerHTML = turn.symbol;
    //     insertBoard(randomNode.id);
    //     checkWin();
    //   }, 1000);
  } else {
    turn.symbol = "X";
    turn.name = "Player :";
    player.innerHTML = turn.name;
    symbol.innerHTML = turn.symbol;
    turn_count++;
  }
}
