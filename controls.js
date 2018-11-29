function mousePressed() {
  if (!pauseState && !term) {
    getPosData();
    p = findPiece(currentCell);
    if ((order == 0 && p != 0) && ((p.color != "b" && tur == "white") || (p.color != "w" && tur == "black"))) newPiece();
    else if ((order == 1 && p != 0) && ((p.color == "w" && tur == "white") || (p.color == "b" && tur == "black"))){
      if ((prevP instanceof King && p instanceof Rook) || (prevP instanceof Rook && p instanceof King)) castle(prevP, p);
      else newPiece();
    }
    else if ((order == 1) && (p == 0)) move();
    else if ((order == 1) && (p != 0)) {
      deadList.push(p);
      move();
    }
  }
}
