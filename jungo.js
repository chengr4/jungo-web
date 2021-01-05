// 棋盤
let board = new WGo.Board(document.getElementById("board"), {
  width: 500,
  size: 7,
});

// Game
var game = new WGo.Game(7);

var sound = new Howl({
  src: ["./sound/moveSound.mp3"]
});

// 畫座標
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

// 走一手
board.addEventListener("click", function (x, y) {

  // one move
  move = game.play(x, y);
  if (typeof move != "number") {
    board.addObject({
      x: x,
      y: y,
      c: -game.turn,
    });
    
  }
  //console.log(game);
  //game.getPosition().schema.forEach()

  // remove capture stones
  for (let m = 0; m < 7; m++) {
    for (let n = 0; n < 7; n++) {
      if (game.getPosition().get(m, n) == 0) {
        board.removeObjectsAt(m, n);
      }
      //console.log(game.getPosition().get(m, n));
    }
  }
});

sound.play("laser");
