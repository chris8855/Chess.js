function checkCastling(thisPiece, movePiece) {
  if (thisPiece.moved || movePiece.moved) return;
  let thisX = Math.floor(thisPiece.x / res);
  let y = Math.floor(thisPiece.y / res);
  let moveX = Math.floor(movePiece.x / res);

  if (thisPiece instanceof King) {
    if (thisX > moveX) {
      for (let i = thisX - 1; i > 0; i--) {
        if (board[y][i] != 0){
          return;
        }
      }
    }
    else {
      for (let i = thisX + 1; i < 7; i++) {
        if (board[y][i] != 0){
          return;
        }
      }
    }
    return true;
  }
  else {
    if (thisX > moveX) {
      for (let i = thisX - 1; i > moveX; i--) {
        if (board[y][i] != 0){
          return;
        }
      }
    }
    else {
      for (let i = 1; i < moveX; i++) {
        if (board[y][i] != 0){
          return;
        }
      }
    }
    return true;
  }
}

function castle(thisPiece, movePiece) {
  if (!checkCastling(thisPiece, movePiece)) return;
  let thisX = Math.floor(thisPiece.x / res);
  let y = Math.floor(thisPiece.y / res);
  let moveX = Math.floor(movePiece.x / res);
  if (thisPiece instanceof King) {
    if (thisX > moveX) {
      board[Math.floor(thisPiece.y / res)][Math.floor(thisPiece.x / res)] = 0;
      board[Math.floor(thisPiece.y / res)][Math.floor(thisPiece.x / res) - 2] = thisPiece;
      thisPiece.x -= 2 * res;
      board[Math.floor(thisPiece.y / res)][Math.floor(thisPiece.x / res) + 1] = movePiece;
      movePiece.x = thisPiece.x + res;
    }
    else {
      board[Math.floor(thisPiece.y / res)][Math.floor(thisPiece.x / res)] = 0;
      board[Math.floor(thisPiece.y / res)][Math.floor(thisPiece.x / res) + 2] = thisPiece;
      thisPiece.x += 2 * res;
      board[Math.floor(thisPiece.y / res)][Math.floor(thisPiece.x / res) - 1] = movePiece;
      movePiece.x = thisPiece.x - res;
    }
  }
  else {
    if (thisX > moveX) {
      board[Math.floor(movePiece.y / res)][Math.floor(movePiece.x / res)] = 0;
      board[Math.floor(movePiece.y / res)][Math.floor(movePiece.x / res) + 2] = movePiece;
      movePiece.x += 2 * res;
      board[Math.floor(movePiece.y / res)][Math.floor(movePiece.x / res) - 1] = thisPiece;
      thisPiece.x = movePiece.x - res;
    }
    else {
      board[Math.floor(movePiece.y / res)][Math.floor(movePiece.x / res)] = 0;
      board[Math.floor(movePiece.y / res)][Math.floor(movePiece.x / res) - 2] = movePiece;
      movePiece.x -= 2 * res;
      board[Math.floor(movePiece.y / res)][Math.floor(movePiece.x / res) + 1] = thisPiece;
      thisPiece.x = movePiece.x + res;
    }
  }

  audio.play();
  nextTurn();
  drawBoard();
  drawPieces();
  p = 0;
  prevP = 0;
  moves = [];
  thisMove = 0;
}
