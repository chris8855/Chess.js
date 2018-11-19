function nextTurn() {
  if (tur == "white") tur = "black";
  else tur = "white";
  turns++;
  turnCount = Math.floor(turns / 2);
  turn.innerText = tur + " player turnCount: " + turnCount;
}

function checkTerminalState() {
  let black = 0, white = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let piece = board[i][j];
      if(piece != 0) {
        if (piece.color == "b") black ++;
        if (piece.color == "w") white ++;
      }
    }
  }
  if (black == 0){
    terminalState = "white";
    return true;
  }
  else if (white == 0){
    terminalState = "black";
    return true;
  }
  else return false;
}

function checkRokkade() {
  if (p.color == prevP.color) {
    if ((p instanceof King && prevP instanceof Rook) || (p instanceof Rook && prevP instanceof King)) {
      if (!p.moved && !p.moved) return true;
      else return false;
    }
    else return false;
  }
  else return false;
}

async function updateClock() {
  if (tur == "white") {
    whiteSec++;
    if (whiteSec == 60){
      whiteMin++;
      whiteSec = 0;
    }
    if (whiteMin == 60){
      whiteHour++;
      whiteMin = 0;
    }
    whiteTimer.innerText = `${whiteHour}:${whiteMin}:${whiteSec}`;
  }
  else {
    blackSec++;
    if (blackSec == 60){
      blackMin++;
      blackSec = 0;
    }
    if (blackMin == 60){
      blackHour++;
      blackMin = 0;
    }
    blackTimer.innerText = `${blackHour}:${blackMin}:${blackSec}`;
  }
}

function getCheck() {
  let kingList = [];
  let currentP, leg;
  let returnList = [false];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      currentP = board[i][j];
      if (currentP == 0) continue;
      if (currentP instanceof King) kingList.push(currentP);
    }
  }
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      currentP = board[i][j];
      if (currentP == 0) continue;
      else {
        leg = getLegalMoves(currentP);
        for (let k = 0; k < leg.length; k++) {
          for (let n = 0; n < kingList.length; n++) {
            if((leg[k][1] == Math.floor(kingList[n].x / res)) && (leg[k][0] == Math.floor(kingList[n].y / res))){
              returnList = [true,kingList[n]];
            }
          }
        }
      }
    }
  }
  return returnList;
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
      //checkMate(prevP, moves);
      alert("Trying to move into check");
      moveBack(prevP);
      p = 0;
      prevP = 0;
      moves = [];
      thisMove = 0;
      grid();
      return;
    }

    if ((whiteState && tur == "white" && re[1].color == "w" || blackState && tur == "black" && re[1].color == "b")) {
      moveBack(prevP);
      p = 0;
      prevP = 0;
      moves = [];
      thisMove = 0;
      fill(255,0,0,75);
      noStroke();
      rect(re[1].x,re[1].y, res, res);
      alert("Move still puts you in chess");
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
