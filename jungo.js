// set board
let board = new WGo.Board(document.getElementById("board"), {
  width: 500,
  size: 7,
});

var checkBox = document.getElementById("myCheck");
var showTable = document.getElementById("showTable");

// init game over
let isGameOver = false;
let gameOverCounter = 0;

// init Game
var game = new WGo.Game(7);
let numberOfBlack;
let numberOfWhite;


const sound = new Howl({
  src: ["sound/moveSound.mp3"]
});

// init current step
let currentStep = 0;
let step_template;

/**
 * show steps
 */
showSteps = (currentStep) => {
  step_template = `<p>現在手數： ${currentStep}</p>`;
  document.querySelector('#current-step').innerHTML = step_template;
}
showSteps(currentStep);

// coordiate
var coordinates = {
  // draw on grid layer
  grid: {
    draw: function (args, board) {
      var ch, t, xright, xleft, ytop, ybottom;

      this.fillStyle = "rgba(0,0,0,0.7)";
      this.textBaseline = "middle";
      this.textAlign = "center";
      this.font = board.stoneRadius + "px " + (board.font || "");

      xright = board.getX(-0.5);
      xleft = board.getX(board.size - 0.5);
      ytop = board.getY(-0.5);
      ybottom = board.getY(board.size - 0.5);

      for (var i = 0; i < board.size; i++) {
        ch = i + "A".charCodeAt(0);
        if (ch >= "I".charCodeAt(0)) ch++;

        t = board.getY(i);
        this.fillText(board.size - i, xright, t);
        this.fillText(board.size - i, xleft, t);

        t = board.getX(i);
        this.fillText(String.fromCharCode(ch), t, ytop);
        this.fillText(String.fromCharCode(ch), t, ybottom);
      }

      this.fillStyle = "black";
    },
  },
};
board.addCustomObject(coordinates);

/**
 * show numbers of stones
 */
showStones = (black, white) => {
  let numberOfBlack = black;
  let numberOfWhite = white;
  document.querySelector('#black-stones').innerHTML = numberOfBlack;
  document.querySelector('#white-stones').innerHTML = numberOfWhite;
}


// move one step
board.addEventListener("click", function (x, y) {

  if (isGameOver) return;

  move = game.play(x, y);
  if (typeof move != "number") {
    gameOverCounter = 0;
    board.addObject({
      x: x,
      y: y,
      c: -game.turn,
    });
    sound.play();
    currentStep++;
    showSteps(currentStep);
  }

   numberOfBlack = 0;
   numberOfWhite = 0;

  // remove capture stones
  for (let m = 0; m < 7; m++) {
    for (let n = 0; n < 7; n++) {
      if (game.getPosition().get(m, n) == 0) {
        board.removeObjectsAt(m, n);
      } else if (game.getPosition().get(m, n) == 1) {
        numberOfBlack++;
      } else {
        numberOfWhite++;
      }
    }
  }
  showStones(numberOfBlack, numberOfWhite);
});

/**
 * Toggle table
 */
let toggleTable = () => {

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    showTable.style.display = "table";
  } else {
    showTable.style.display = "none";
  }
}

/**
 * pass (虛手)
 */
let passGame = () => {
  if (isGameOver) return;
  if (gameOverCounter==1) {
    gameOver();
  } else {
  game.pass();
  gameOverCounter++;
  currentStep++;
  showSteps(currentStep);
  }
}

/**
 * resign (認輸)
 */
let resignGame = () => {
  location.reload();
}

let gameOver = () => {
  isGameOver = true;
  showTable.style.display = "table";
  checkBox.checked = true;
  if(numberOfBlack > numberOfWhite) {
    document.querySelector('#winner').innerHTML = '黑勝';
  } else if (numberOfBlack < numberOfWhite) {
    document.querySelector('#winner').innerHTML = '白勝';
  } else {
    document.querySelector('#winner').innerHTML = '平手';
  }
  
}
  
