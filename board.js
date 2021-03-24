// set the board
let board = new WGo.Board(document.getElementById("board"), {
  width: 700,
  height: 700,
  size: 7,
});

// coordiates
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

export default board;