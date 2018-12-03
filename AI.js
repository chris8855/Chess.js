let prevScore = 78;
let mvs = [];
function evalBoard(gameBoard) {
  let totalScore = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let cc = gameBoard[i][j];
      if (cc == 0) continue;
      if (cc instanceof King) continue;
      totalScore += cc.value;
    }
  }
  return totalScore;
}


function findBestMove(playerC) {
  let bestScore = Infinity, newScore = Infinity;
  let bestMove;
  mvs = getAllLegalMoves(playerC);
  for (let i = 0; i < mvs.length; i++) {
    let mv = decompose(mvs[i]);
    for (let j = 0; j < mv.length; j++) {
      testMove(mvs[i][0], mv[j]);
      newScore = evalBoard(board);
      if (newScore < bestScore){
        bestScore = newScore;
        bestMove = [mvs[i][0], mv[j]]
      }
      moveBack(mvs[i][0]);
    }
  }
  if(bestScore == prevScore) {
    let randomIndex = Math.floor(Math.random() * mvs.length);
    let m = decompose(mvs[randomIndex]);
    let randomIndex2 = Math.floor(Math.random() * m.length)
    bestMove = [mvs[randomIndex][0], m[randomIndex2]];
  }
  else prevScore = bestScore;
  return [bestMove, bestScore];
}


function decompose(moveArr) {
  let mvs = [];
  for (let i = 0; i < moveArr[1].length; i++) {
    mvs.push(moveArr[1][i]);
  }
  return mvs;
}

function moveAI() {
  if (!term) {
    let mv = findBestMove("b");
    let ai = mv[0][0];
    let m = mv[0][1];
    if (ai instanceof King || ai instanceof Rook){
      ai.moved = true;
    }
    board[Math.floor(ai.y / res)][Math.floor(ai.x / res)] = 0;
    ai.x = m[1] * res;
    ai.y = m[0] * res;
    board[m[0]][m[1]] = 0;
    board[m[0]][m[1]] = ai;
    audio.play();
    drawBoard();
    drawPieces();
    if (ai instanceof Pawn) pawnEdge(ai);
    nextTurn();
  }
}

function testCheckForAi() {
  let re = testMove(prevP, thisMove);
  if (re[0]) {
    if (prevP instanceof King){
      moveBack(prevP);
      return false;
    }
    if ((!whiteState && tur == "white" && re[1].color == "w" || !blackState && tur == "black" && re[1].color == "b")) {
      moveBack(prevP);
      return false;
    }
    if ((whiteState && tur == "white" && re[1].color == "w" || blackState && tur == "black" && re[1].color == "b")) {
      moveBack(prevP);
      return false;
    }
  }
}
