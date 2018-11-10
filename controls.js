let isMarked = false;
let currentX
let currentY;
let currentCell;
let placeX;
let placeY;

function mousePressed() {
  if (isMarked) {
    noFill();
    stroke(0);
    strokeWeight(2);
    rect(placeX, placeY, res, res);
    isMarked = false;
  }

  currentX = Math.floor(mouseX / res);
  currentY = Math.floor(mouseY / res);
  currentCell = [currentX, currentY];
  placeX = currentX * res;
  placeY = currentY * res;
  let p = findPiece(currentCell);
  if (p != 0) {
    noFill();
    stroke(255,0,0);
    strokeWeight(2);
    rect(placeX, placeY, res, res);
    isMarked = true;
    getLegalMoves(p);
  }

}

function findPiece(cord) {
  let piece = board[cord[1]][cord[0]];
  return piece;
}
