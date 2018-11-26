function nextTurn() {
  if (tur == "white") tur = "black";
  else tur = "white";
  turns++;
  turnCount = Math.floor(turns / 2);
  turn.innerText = tur + " player turnCount: " + turnCount;
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

    if (checkMate(prevP.color)) finishGame();

    if (prevP instanceof King){
      alert("Trying to move into check");
      moveBack(prevP);
      p = 0;
      prevP = 0;
      moves = [];
      thisMove = 0;
      grid();
      return;
    }

    if ((!whiteState && tur == "white" && re[1].color == "w" || !blackState && tur == "black" && re[1].color == "b")) {
      moveBack(prevP);
      p = 0;
      prevP = 0;
      moves = [];
      thisMove = 0;
      alert("Move puts you in chess");
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
    if (midTerm) term = true;
  }
  else movePiece(prevP, thisMove);
  if (midTerm) term = true;
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
    if (piece instanceof Pawn) pawnEdge(piece);
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

function checkMate(color) {
  let legalMoves = [];
  let returnVal = true;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let currentPiece = board[i][j];
      if (currentPiece == 0) continue;
      if (currentPiece.color == color) continue;
      else {
        let mvs = getLegalMoves(currentPiece);
        for (let n = 0; n < mvs.length; n++) {
          let mv = mvs[n];

          board[Math.floor(currentPiece.y / res)][Math.floor(currentPiece.x / res)] = 0;
          let otherPiece = board[mv[0]][mv[1]];
          let preX = currentPiece.x;
          let preY = currentPiece.y;
          currentPiece.x = mv[1] * res;
          currentPiece.y = mv[0] * res;
          board[mv[0]][mv[1]] = currentPiece;

          let h = getCheck();

          board[Math.floor(currentPiece.y / res)][Math.floor(currentPiece.x / res)] = otherPiece;
          currentPiece.x = preX;
          currentPiece.y = preY;
          board[Math.floor(currentPiece.y / res)][Math.floor(currentPiece.x / res)] = currentPiece;
          if (!h[0]) {
            returnVal = false;
            return returnVal;
          }
        }
      }
    }
  }
  midTerm = true;
  return returnVal;
}


function finishGame() {
  clearInterval(interval);
  alert(`${tur} player won the game`);
}

function pawnEdge(piece) {
  if (piece.color == "b" && Math.floor(piece.y / res) == 7) switchPawn(piece);
  else if (piece.color == "w" && Math.floor(piece.y / res) == 0) switchPawn(piece);
  else return false;
}

function switchPawn(piece) {
  console.log("switch");
  let bX = Math.floor(piece.x / res);
  let bY = Math.floor(piece.y / res);
  board[bY][bX] = 0;
  if (piece.color == "b") board[bY][bX] =  new Queen("b", bX, bY);
  if (piece.color == "w") board[bY][bX] = new Queen("w", bX, bY);
  drawBoard();
  drawPieces();
}
