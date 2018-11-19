function getLegalMoves(piece) {
  let moves = [];
  let pX = piece.x;
  let pY = piece.y;
  let bX = Math.floor(pX / res);
  let bY = Math.floor(pY / res);

  if (piece instanceof Pawn) {
    if (piece.color == "b") {
      if (bX != 0) if ((board[bY + 1][bX - 1] != 0) && (board[bY + 1][bX - 1].color != "b")) moves.push([bY + 1, bX  - 1]);
      if ((board[bY + 1][bX] == 0)) moves.push([bY + 1, bX]);
      if (bX != 7) if ((board[bY + 1][bX + 1] != 0) && (board[bY + 1][bX + 1].color != "b")) moves.push([bY + 1, bX  + 1]);
      if (bY == 1 && board[bY + 2][bX] == 0) moves.push([bY + 2, bX]);
    }
    else {
      if (bX != 0) if ((board[bY - 1][bX - 1] != 0) && (board[bY - 1][bX - 1].color != "w")) moves.push([bY - 1, bX  - 1]);
      if ((board[bY - 1][bX] == 0)) moves.push([bY - 1, bX]);
      if (bX != 7) if ((board[bY - 1][bX + 1] != 0) && (board[bY - 1][bX + 1].color != "w")) moves.push([bY - 1, bX  + 1]);
      if (bY == 6 && board[bY - 2][bX] == 0) moves.push([bY - 2, bX]);
    }
  }
  else if (piece instanceof Rook) {
    if (piece.color == "b") {
      if (bX < 7) { //Sjekker alle felter til høyre
        for (let i = 1; i < (8 - bX); i++) {
          if (board[bY][bX + i].color == "b") break;
          if (board[bY][bX + i] == 0) moves.push([bY, bX + i]);
          if (board[bY][bX + i].color == "w") {
            moves.push([bY, bX + i]);
            break;
          }
        }
      }
      if (bX != 0) { //Sjekker alle felter til venstre
        for (let i = 1; i <= bX; i++) {
          if (board[bY][bX - i].color == "b") break;
          if (board[bY][bX - i] == 0) moves.push([bY, bX - i]);
          if (board[bY][bX - i].color == "w") {
            moves.push([bY, bX - i]);
            break;
          }
        }
      }
      if (bY < 7) { //Sjekker alle felter under
        for (let i = 1; i < (8 - bY); i++) {
          if (board[bY + i][bX].color == "b") break;
          if (board[bY + i][bX] == 0) moves.push([bY + i, bX]);
          if (board[bY + i][bX].color == "w") {
            moves.push([bY + i, bX]);
            break;
          }
        }
      }
      if (bY != 0) { //Sjekker alle felter over
        for (let i = 1; i <= bY; i++) {
          if (board[bY - i][bX].color == "b") break;
          if (board[bY - i][bX] == 0) moves.push([bY - i, bX]);
          if (board[bY - i][bX].color == "w") {
            moves.push([bY - i, bX]);
            break;
          }
        }
      }
    }
    else {
      if (bX < 7) { //Sjekker alle felter til høyre
        for (let i = 1; i < (8 - bX); i++) {
          if (board[bY][bX + i].color == "w") break;
          if (board[bY][bX + i] == 0) moves.push([bY, bX + i]);
          if (board[bY][bX + i].color == "b") {
            moves.push([bY, bX + i]);
            break;
          }
        }
      }
      if (bX != 0) { //Sjekker alle felter til venstre
        for (let i = 1; i <= bX; i++) {
          if (board[bY][bX - i].color == "w") break;
          if (board[bY][bX - i] == 0) moves.push([bY, bX - i]);
          if (board[bY][bX - i].color == "b") {
            moves.push([bY, bX - i]);
            break;
          }
        }
      }
      if (bY < 7) { //Sjekker alle felter under
        for (let i = 1; i < (8 - bY); i++) {
          if (board[bY + i][bX].color == "w") break;
          if (board[bY + i][bX] == 0) moves.push([bY + i, bX]);
          if (board[bY + i][bX].color == "b") {
            moves.push([bY + i, bX]);
            break;
          }
        }
      }
      if (bY != 0) { //Sjekker alle felter over
        for (let i = 1; i <= bY; i++) {
          if (board[bY - i][bX].color == "w") break;
          if (board[bY - i][bX] == 0) moves.push([bY - i, bX]);
          if (board[bY - i][bX].color == "b") {
            moves.push([bY - i, bX]);
            break;
          }
        }
      }
    }
  }
  else if (piece instanceof Bishop) {
    if (piece.color == "b") {
      if (bY < 7 && bX != 0) { //alle felter under til venstre
        for (let i = 1; i < 8; i++) {
          if ((bY + i > 7) || (bX - i < 0)) break;
          if (board[bY + i][bX - i].color == "b") break;
          if (board[bY + i][bX - i] == 0) moves.push([bY + i, bX - i]);
          if (board[bY + i][bX - i].color == "w") {
            moves.push([bY + i, bX - i]);
            break;
          }
        }
      }
      if (bY < 7 && bX < 7) { //alle felter under til høyre
        for (let i = 1; i < 8; i++) {
          if ((bY + i > 7) || (bX + i > 7)) break;
          if (board[bY + i][bX + i].color == "b") break;
          if (board[bY + i][bX + i] == 0) moves.push([bY + i, bX + i]);
          if (board[bY + i][bX + i].color == "w") {
            moves.push([bY + i, bX + i]);
            break;
          }
        }
      }
      if (bY > 0 && bX > 0) { //alle felter over til venstre
        for (let i = 1; i < 8; i++) {
          if ((bY - i < 0) || (bX - i < 0)) break;
          if (board[bY - i][bX - i].color == "b") break;
          if (board[bY - i][bX - i] == 0) moves.push([bY - i, bX - i]);
          if (board[bY - i][bX - i].color == "w") {
            moves.push([bY - i, bX - i]);
            break;
          }
        }
      }
      if (bY > 0 && bX < 7) { //alle felter over til høyre
        for (let i = 1; i < 8; i++) {
          if ((bY - i < 0) || (bX + i > 7)) break;
          if (board[bY - i][bX + i].color == "b") break;
          if (board[bY - i][bX + i] == 0) moves.push([bY - i, bX + i]);
          if (board[bY - i][bX + i].color == "w") {
            moves.push([bY - i, bX + i]);
            break;
          }
        }
      }
    }
    else {
      if (bY < 7 && bX != 0) { //alle felter under til venstre
        for (let i = 1; i < 8; i++) {
          if ((bY + i > 7) || (bX - i < 0)) break;
          if (board[bY + i][bX - i].color == "w") break;
          if (board[bY + i][bX - i] == 0) moves.push([bY + i, bX - i]);
          if (board[bY + i][bX - i].color == "b") {
            moves.push([bY + i, bX - i]);
            break;
          }
        }
      }
      if (bY < 7 && bX < 7) { //alle felter under til høyre
        for (let i = 1; i < 8; i++) {
          if ((bY + i > 7) || (bX + i > 7)) break;
          if (board[bY + i][bX + i].color == "w") break;
          if (board[bY + i][bX + i] == 0) moves.push([bY + i, bX + i]);
          if (board[bY + i][bX + i].color == "b") {
            moves.push([bY + i, bX + i]);
            break;
          }
        }
      }
      if (bY > 0 && bX > 0) { //alle felter over til venstre
        for (let i = 1; i < 8; i++) {
          if ((bY - i < 0) || (bX - i < 0)) break;
          if (board[bY - i][bX - i].color == "w") break;
          if (board[bY - i][bX - i] == 0) moves.push([bY - i, bX - i]);
          if (board[bY - i][bX - i].color == "b") {
            moves.push([bY - i, bX - i]);
            break;
          }
        }
      }
      if (bY > 0 && bX < 7) { //alle felter over til høyre
        for (let i = 1; i < 8; i++) {
          if ((bY - i < 0) || (bX + i > 7)) break;
          if (board[bY - i][bX + i].color == "w") break;
          if (board[bY - i][bX + i] == 0) moves.push([bY - i, bX + i]);
          if (board[bY - i][bX + i].color == "b") {
            moves.push([bY - i, bX + i]);
            break;
          }
        }
      }
    }
  }
  else if (piece instanceof King) {
    if (piece.color == "b") {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if ((i == 0) && (j == 0)) continue;
          if ((bY + i < 0) || (bY + i > 7)) continue;
          if ((bX + j < 0) || (bX + j > 7)) continue;
          if (board[bY + i][bX + j] == 0) moves.push([bY + i, bX + j]);
          if (board[bY + i][bX + j].color == "w") moves.push([bY + i, bX + j]);
        }
      }
    }
    if (piece.color == "w") {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if ((i == 0) && (j == 0)) continue;
          if ((bY + i < 0) || (bY + i > 7)) continue;
          if ((bX + j < 0) || (bX + j > 7)) continue;
          if (board[bY + i][bX + j] == 0) moves.push([bY + i, bX + j]);
          if (board[bY + i][bX + j].color == "b") moves.push([bY + i, bX + j]);
        }
      }
    }
  }
  else if (piece instanceof Queen) {
    if (piece.color == "b") {
      if (bY < 7 && bX != 0) { //alle felter under til venstre
        for (let i = 1; i < 8; i++) {
          if ((bY + i > 7) || (bX - i < 0)) break;
          if (board[bY + i][bX - i].color == "b") break;
          if (board[bY + i][bX - i] == 0) moves.push([bY + i, bX - i]);
          if (board[bY + i][bX - i].color == "w") {
            moves.push([bY + i, bX - i]);
            break;
          }
        }
      }
      if (bY < 7 && bX < 7) { //alle felter under til høyre
        for (let i = 1; i < 8; i++) {
          if ((bY + i > 7) || (bX + i > 7)) break;
          if (board[bY + i][bX + i].color == "b") break;
          if (board[bY + i][bX + i] == 0) moves.push([bY + i, bX + i]);
          if (board[bY + i][bX + i].color == "w") {
            moves.push([bY + i, bX + i]);
            break;
          }
        }
      }
      if (bY > 0 && bX > 0) { //alle felter over til venstre
        for (let i = 1; i < 8; i++) {
          if ((bY - i < 0) || (bX - i < 0)) break;
          if (board[bY - i][bX - i].color == "b") break;
          if (board[bY - i][bX - i] == 0) moves.push([bY - i, bX - i]);
          if (board[bY - i][bX - i].color == "w") {
            moves.push([bY - i, bX - i]);
            break;
          }
        }
      }
      if (bY > 0 && bX < 7) { //alle felter over til høyre
        for (let i = 1; i < 8; i++) {
          if ((bY - i < 0) || (bX + i > 7)) break;
          if (board[bY - i][bX + i].color == "b") break;
          if (board[bY - i][bX + i] == 0) moves.push([bY - i, bX + i]);
          if (board[bY - i][bX + i].color == "w") {
            moves.push([bY - i, bX + i]);
            break;
          }
        }
      }
      if (bX < 7) { //Sjekker alle felter til høyre
        for (let i = 1; i < (8 - bX); i++) {
          if (board[bY][bX + i].color == "b") break;
          if (board[bY][bX + i] == 0) moves.push([bY, bX + i]);
          if (board[bY][bX + i].color == "w") {
            moves.push([bY, bX + i]);
            break;
          }
        }
      }
      if (bX != 0) { //Sjekker alle felter til venstre
        for (let i = 1; i <= bX; i++) {
          if (board[bY][bX - i].color == "b") break;
          if (board[bY][bX - i] == 0) moves.push([bY, bX - i]);
          if (board[bY][bX - i].color == "w") {
            moves.push([bY, bX - i]);
            break;
          }
        }
      }
      if (bY < 7) { //Sjekker alle felter under
        for (let i = 1; i < (8 - bY); i++) {
          if (board[bY + i][bX].color == "b") break;
          if (board[bY + i][bX] == 0) moves.push([bY + i, bX]);
          if (board[bY + i][bX].color == "w") {
            moves.push([bY + i, bX]);
            break;
          }
        }
      }
      if (bY != 0) { //Sjekker alle felter over
        for (let i = 1; i <= bY; i++) {
          if (board[bY - i][bX].color == "b") break;
          if (board[bY - i][bX] == 0) moves.push([bY - i, bX]);
          if (board[bY - i][bX].color == "w") {
            moves.push([bY - i, bX]);
            break;
          }
        }
      }
    }
    else {
      if (bY < 7 && bX != 0) { //alle felter under til venstre
        for (let i = 1; i < 8; i++) {
          if ((bY + i > 7) || (bX - i < 0)) break;
          if (board[bY + i][bX - i].color == "w") break;
          if (board[bY + i][bX - i] == 0) moves.push([bY + i, bX - i]);
          if (board[bY + i][bX - i].color == "b") {
            moves.push([bY + i, bX - i]);
            break;
          }
        }
      }
      if (bY < 7 && bX < 7) { //alle felter under til høyre
        for (let i = 1; i < 8; i++) {
          if ((bY + i > 7) || (bX + i > 7)) break;
          if (board[bY + i][bX + i].color == "w") break;
          if (board[bY + i][bX + i] == 0) moves.push([bY + i, bX + i]);
          if (board[bY + i][bX + i].color == "b") {
            moves.push([bY + i, bX + i]);
            break;
          }
        }
      }
      if (bY > 0 && bX > 0) { //alle felter over til venstre
        for (let i = 1; i < 8; i++) {
          if ((bY - i < 0) || (bX - i < 0)) break;
          if (board[bY - i][bX - i].color == "w") break;
          if (board[bY - i][bX - i] == 0) moves.push([bY - i, bX - i]);
          if (board[bY - i][bX - i].color == "b") {
            moves.push([bY - i, bX - i]);
            break;
          }
        }
      }
      if (bY > 0 && bX < 7) { //alle felter over til høyre
        for (let i = 1; i < 8; i++) {
          if ((bY - i < 0) || (bX + i > 7)) break;
          if (board[bY - i][bX + i].color == "w") break;
          if (board[bY - i][bX + i] == 0) moves.push([bY - i, bX + i]);
          if (board[bY - i][bX + i].color == "b") {
            moves.push([bY - i, bX + i]);
            break;
          }
        }
      }
      if (bX < 7) { //Sjekker alle felter til høyre
        for (let i = 1; i < (8 - bX); i++) {
          if (board[bY][bX + i].color == "w") break;
          if (board[bY][bX + i] == 0) moves.push([bY, bX + i]);
          if (board[bY][bX + i].color == "b") {
            moves.push([bY, bX + i]);
            break;
          }
        }
      }
      if (bX != 0) { //Sjekker alle felter til venstre
        for (let i = 1; i <= bX; i++) {
          if (board[bY][bX - i].color == "w") break;
          if (board[bY][bX - i] == 0) moves.push([bY, bX - i]);
          if (board[bY][bX - i].color == "b") {
            moves.push([bY, bX - i]);
            break;
          }
        }
      }
      if (bY < 7) { //Sjekker alle felter under
        for (let i = 1; i < (8 - bY); i++) {
          if (board[bY + i][bX].color == "w") break;
          if (board[bY + i][bX] == 0) moves.push([bY + i, bX]);
          if (board[bY + i][bX].color == "b") {
            moves.push([bY + i, bX]);
            break;
          }
        }
      }
      if (bY != 0) { //Sjekker alle felter over
        for (let i = 1; i <= bY; i++) {
          if (board[bY - i][bX].color == "w") break;
          if (board[bY - i][bX] == 0) moves.push([bY - i, bX]);
          if (board[bY - i][bX].color == "b") {
            moves.push([bY - i, bX]);
            break;
          }
        }
      }
    }
  }
  else if (piece instanceof Knight) {
    if (piece.color == "b") {
      if (bY - 2 >= 0 && bX - 1 >= 0) if (board[bY - 2][bX - 1] == 0 || board[bY - 2][bX - 1].color == "w") moves.push([bY - 2, bX - 1]);
      if (bY - 2 >= 0 && bX + 1 <= 7) if (board[bY - 2][bX + 1] == 0 || board[bY - 2][bX + 1].color == "w") moves.push([bY - 2, bX + 1]);
      if (bY - 1 >= 0 && bX - 2 >= 0) if (board[bY - 1][bX - 2] == 0 || board[bY - 1][bX - 2].color == "w") moves.push([bY - 1, bX - 2]);
      if (bY - 1 >= 0 && bX + 2 <= 7) if (board[bY - 1][bX + 2] == 0 || board[bY - 1][bX + 2].color == "w") moves.push([bY - 1, bX + 2]);
      if (bY + 2 <= 7 && bX - 1 >= 0) if (board[bY + 2][bX - 1] == 0 || board[bY + 2][bX - 1].color == "w") moves.push([bY + 2, bX - 1]);
      if (bY + 2 <= 7 && bX + 1 <= 7) if (board[bY + 2][bX + 1] == 0 || board[bY + 2][bX + 1].color == "w") moves.push([bY + 2, bX + 1]);
      if (bY + 1 <= 7 && bX - 2 >= 0) if (board[bY + 1][bX - 2] == 0 || board[bY + 1][bX - 2].color == "w") moves.push([bY + 1, bX - 2]);
      if (bY + 1 <= 7 && bX + 2 <= 7) if (board[bY + 1][bX + 2] == 0 || board[bY + 1][bX + 2].color == "w") moves.push([bY + 1, bX + 2]);
    }
    else {
      if (bY - 2 >= 0 && bX - 1 >= 0) if (board[bY - 2][bX - 1] == 0 || board[bY - 2][bX - 1].color == "b") moves.push([bY - 2, bX - 1]);
      if (bY - 2 >= 0 && bX + 1 <= 7) if (board[bY - 2][bX + 1] == 0 || board[bY - 2][bX + 1].color == "b") moves.push([bY - 2, bX + 1]);
      if (bY - 1 >= 0 && bX - 2 >= 0) if (board[bY - 1][bX - 2] == 0 || board[bY - 1][bX - 2].color == "b") moves.push([bY - 1, bX - 2]);
      if (bY - 1 >= 0 && bX + 2 <= 7) if (board[bY - 1][bX + 2] == 0 || board[bY - 1][bX + 2].color == "b") moves.push([bY - 1, bX + 2]);
      if (bY + 2 <= 7 && bX - 1 >= 0) if (board[bY + 2][bX - 1] == 0 || board[bY + 2][bX - 1].color == "b") moves.push([bY + 2, bX - 1]);
      if (bY + 2 <= 7 && bX + 1 <= 7) if (board[bY + 2][bX + 1] == 0 || board[bY + 2][bX + 1].color == "b") moves.push([bY + 2, bX + 1]);
      if (bY + 1 <= 7 && bX - 2 >= 0) if (board[bY + 1][bX - 2] == 0 || board[bY + 1][bX - 2].color == "b") moves.push([bY + 1, bX - 2]);
      if (bY + 1 <= 7 && bX + 2 <= 7) if (board[bY + 1][bX + 2] == 0 || board[bY + 1][bX + 2].color == "b") moves.push([bY + 1, bX + 2]);
    }
  }
  else moves = [];
  return moves;
}
