let isMarked = false;
let currentX
let currentY;
let currentCell, prevCell;
let placeX;
let placeY;
let moves;
let p, prevP;
let thisMove;
function mousePressed() {
  currentX = Math.floor(mouseX / res);
  currentY = Math.floor(mouseY / res);
  currentCell = [currentY, currentX];
  placeX = currentX * res;
  placeY = currentY * res;
  p = findPiece(currentCell);
  if (p.color == "b" && tur == "white") return;
  if (p.color == "w" && tur == "black") return;

  if (isMarked && board[currentY][currentX] == 0) {
    noFill();
    stroke(0);
    strokeWeight(2);
    rect(placeX, placeY, res, res);
    for (let i in moves) {
      let currentMove = moves[i];
      rect(currentMove[1] * res, currentMove[0] * res, res, res);
      if ((currentCell[0] == currentMove[0]) && (currentCell[1] == currentMove[1])) thisMove = currentMove;
    }
    movePiece(prevP, thisMove);
    isMarked = false;
  }
  if (isMarked && board[currentY][currentX] != 0) {
    noFill();
    stroke(0);
    strokeWeight(2);
    for (let c = 0; c < ruter; c++) {
      for (let r = 0; r < ruter; r++) {
        rect(c * res, r * res, res - 1, res - 1);
      }
    }
    isMarked = false;
  }

  if (p != 0) {
    noFill();
    stroke(255,255,0);
    strokeWeight(2);
    rect(placeX, placeY, res, res);
    isMarked = true;
    moves = getLegalMoves(p);
    for (let i in moves) {
      let currentMove = moves[i];
      rect(currentMove[1] * res, currentMove[0] * res, res, res);
    }
  }
  prevP = p;
  prevCell = currentCell;
}

function findPiece(cord) {
  let piece = board[cord[0]][cord[1]];
  return piece;
}


function movePiece(piece, move) {
  board[Math.floor(piece.y / res)][Math.floor(piece.x / res)] = 0;
  piece.x = move[1] * res;
  piece.y = move[0] * res;
  board[move[0]][move[1]] = piece;
  drawBoard();
  drawPieces();
  nextTurn();
}
