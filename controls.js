let currentX, currentY;
let currentCell, prevCell;
let placeX, placeY;
let p, prevP;
let moves, thisMove;
let order = 0;
let deadList = [];
let blackState = false, whiteState = false;
let prevX = 0, prevY = 0;

function mousePressed() {
  if (!pauseState) {
    getPosData();
    p = findPiece(currentCell);
    if ((order == 0 && p != 0) && ((p.color != "b" && tur == "white") || (p.color != "w" && tur == "black"))) newPiece();
    else if ((order == 1 && p != 0) && ((p.color != "b" && tur == "white") || (p.color != "w" && tur == "black"))) newPiece();
    else if ((order == 1) && (p == 0)) move();
    else if ((order == 1) && (p != 0)) {
      if ((p.color == "b" && tur == "black") || (p.color == "w" && tur == "white")){
      }
      else {
        deadList.push(p);
        move();
      }
    }
  }
}

function newPiece() {
  order = 1;
  grid();
  fill(245, 252, 35, 75);
  noStroke();
  rect(placeX, placeY, res, res);
  moves = getLegalMoves(p);
  for (let i in moves) {
    let currentMove = moves[i];
    rect(currentMove[1] * res, currentMove[0] * res, res, res);
  }
  prevP = p;
  prevCell = currentCell;
}

function move() {
  order = 0;
  grid();
  if (moves == []) return;
  for (let i in moves) {
    let currentMove = moves[i];
    if ((currentCell[0] == currentMove[0]) && (currentCell[1] == currentMove[1])){
      thisMove = currentMove;
      break;
    }
    else thisMove = 0;
  }

  if (thisMove == 0) return;
  let re = testMove(prevP, thisMove);
  if (re[0]) {
    if (prevP instanceof King){
      alert("Trying to move into check");
      moveBack(prevP);
      p = 0;
      prevP = 0;
      moves = [];
      thisMove = 0;
      return;
    }
    movePiece(prevP, thisMove)
    checkCheck(re);
  }
  else movePiece(prevP, thisMove);
}

function checkCheck(state) {
  let i = state;
  if (i[0]) {
    if (i[1].color == "b") blackState = true;
    else whiteState = true;

    fill(255,0,0,75);
    noStroke();
    rect(i[1].x,i[1].y, res, res);
  }
  else {
    blackState = false;
    whiteState = false;
  }
}


function getPosData() {
  currentX = Math.floor(mouseX / res);
  currentY = Math.floor(mouseY / res);
  currentCell = [currentY, currentX];
  placeX = currentX * res;
  placeY = currentY * res;
}

function findPiece(cord) {
  let piece = board[cord[0]][cord[1]];
  return piece;
}

function movePiece(piece, move) {
  if (!term) {
    if (piece instanceof King || piece instanceof Rook){
      piece.moved = true;
    }

    board[Math.floor(piece.y / res)][Math.floor(piece.x / res)] = 0;
    piece.x = move[1] * res;
    piece.y = move[0] * res;
    board[move[0]][move[1]] = 0;
    board[move[0]][move[1]] = piece;
    audio.play();
    nextTurn();
    drawBoard();
    drawPieces();
    p = 0;
    prevP = 0;
    moves = [];
    thisMove = 0;
    term = checkTerminalState();
    if (term) turn.innerText = (`${terminalState} is the winner!`);
  }
}

function testMove(piece, move) {
  if (!term) {
    board[Math.floor(piece.y / res)][Math.floor(piece.x / res)] = 0;
    prevX = piece.x;
    prevY = piece.y;
    piece.x = move[1] * res;
    piece.y = move[0] * res;
    board[move[0]][move[1]] = 0;
    board[move[0]][move[1]] = piece;
  }
  return getCheck();
}

function moveBack(piece) {
  board[Math.floor(piece.y / res)][Math.floor(piece.x / res)] = 0;
  piece.x = prevX;
  piece.y = prevY;
  board[Math.floor(piece.y / res)][Math.floor(piece.x / res)] = piece;
}

function grid() {
  drawBoard();
  drawPieces();
  noFill();
  stroke(0);
  strokeWeight(2);
  for (let c = 0; c < ruter; c++) {
    for (let r = 0; r < ruter; r++) {
      rect(c * res, r * res, res - 1, res - 1);
    }
  }
}
