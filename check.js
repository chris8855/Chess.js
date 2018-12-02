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
