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
