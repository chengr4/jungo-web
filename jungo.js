let checkBox = document.getElementById("myCheck");
let showTable = document.getElementById("showTable");

// init game over
let isGameOver = false;
let gameOverCounter = 0;

// init Game
let game = new WGo.Game(7);
let numberOfBlack;
let numberOfWhite;

// sound
/*let soundsURL = [
  "sound/moveSound.mp3",
  "sound/capture0.mp3",
  "sound/pass.mp3",
];
let sounds = new Array(soundsURL.length);

soundsURL.forEach((url, i) => {
  sounds[i] = new Howl({
    src: [url],
  });
});*/

// init current step
let currentStep = 0;
let step_template = "";

/**
 * show steps
 */
let showSteps = (currentStep) => {
  step_template = `<p>現在手數： ${currentStep}</p>`;
  document.querySelector("#current-step").innerHTML = step_template;
};
showSteps(currentStep);

/**
 * show numbers of stones
 */
let showStones = (black, white) => {
  let numberOfBlack = black;
  let numberOfWhite = white;
  document.querySelector("#black-stones").innerHTML = numberOfBlack;
  document.querySelector("#white-stones").innerHTML = numberOfWhite;
};

// move one step
board.addEventListener("click", function (x, y) {
  if (isGameOver) return;
  if (!game.isValid(x, y)) return;

  game.play(x, y);
  gameOverCounter = 0;
  board.addObject({
    x: x,
    y: y,
    c: -game.turn,
  });

  sounds[0].play();
  currentStep++;
  showSteps(currentStep);
  removeCapturedStones();
});

let removeCapturedStones = () => {
  numberOfBlack = 0;
  numberOfWhite = 0;

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
};

/**
 * Toggle table
 */
let toggleTable = () => {
  // If the checkbox is checked, display the output text
  if (checkBox.checked == true) {
    showTable.style.display = "table";
  } else {
    showTable.style.display = "none";
  }
};

/**
 * pass (虛手)
 */
let passGame = () => {
  if (isGameOver) return;
  sounds[2].play();
  if (gameOverCounter == 1) {
    currentStep++;
    showSteps(currentStep);
    gameOver();
  } else {
    game.pass();
    gameOverCounter++;
    currentStep++;
    showSteps(currentStep);
  }
};

/**
 * resign (認輸)
 */
let resignGame = () => {
  location.reload();
};

/**
 * game over (結束遊戲)
 */
let gameOver = () => {
  isGameOver = true;
  showTable.style.display = "table";
  checkBox.checked = true;
  if (numberOfBlack > numberOfWhite) {
    document.querySelector("#winner").innerHTML = "黑勝";
  } else if (numberOfBlack < numberOfWhite) {
    document.querySelector("#winner").innerHTML = "白勝";
  } else {
    document.querySelector("#winner").innerHTML = "平手";
  }
};
