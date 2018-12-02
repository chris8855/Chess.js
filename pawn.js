function pawnEdge(piece) {
  if (piece.color == "b" && Math.floor(piece.y / res) == 7) switchPawn(piece);
  else if (piece.color == "w" && Math.floor(piece.y / res) == 0) switchPawn(piece);
  else return false;
}

function switchPawn(piece) {
  let bX = Math.floor(piece.x / res);
  let bY = Math.floor(piece.y / res);
  board[bY][bX] = 0;
  if (piece.color == "b") board[bY][bX] =  new Queen("b", bX, bY);
  if (piece.color == "w") board[bY][bX] = new Queen("w", bX, bY);
  drawBoard();
  drawPieces();
}
