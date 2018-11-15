class Pawn {
  constructor(color,x,y) {
    this.color = color;
    this.value = 1;
    this.x = x * res;
    this.y = y * res;
    this.xSprite = wIndex * 5;
    if (this.color === "b") this.ySprite = hIndex * 1;
    else this.ySprite = 0;
  }
}

class Bishop {
  constructor(color,x,y) {
    this.color = color;
    this.value = 3;
    this.x = x * res;
    this.y = y * res;
    this.xSprite = wIndex * 2;
    if (this.color === "b") this.ySprite = hIndex * 1;
    else this.ySprite = 0;
  }
}

class Knight {
  constructor(color,x,y) {
    this.color = color;
    this.value = 3;
    this.x = x * res;
    this.y = y * res;
    this.xSprite = wIndex * 3;
    if (this.color === "b") this.ySprite = hIndex * 1;
    else this.ySprite = 0;
  }
}

class Rook {
  constructor(color,x,y) {
    this.moved = false;
    this.color = color;
    this.value = 5;
    this.x = x * res;
    this.y = y * res;
    this.xSprite = wIndex * 4;
    if (this.color === "b") this.ySprite = hIndex * 1;
    else this.ySprite = 0;
  }
}

class Queen {
  constructor(color,x,y) {
    this.color = color;
    this.value = 9;
    this.x = x * res;
    this.y = y * res;
    this.xSprite = wIndex * 1;
    if (this.color === "b") this.ySprite = hIndex * 1;
    else this.ySprite = 0;
  }
}

class King {
  constructor(color,x,y) {
    this.moved = false;
    this.color = color;
    this.value = Infinity;
    this.x = x * res;
    this.y = y * res;
    this.xSprite = 0;
    if (this.color === "b") this.ySprite = hIndex * 1;
    else this.ySprite = 0;
  }
}

function drawPieces() {
  let currentPiece;
  for (let i = 0; i < ruter; i++) {
    for (let j = 0; j < ruter; j++) {
      currentPiece = board[i][j];
      if(currentPiece != 0) image(img, currentPiece.x, currentPiece.y,res,res,currentPiece.xSprite,currentPiece.ySprite,wIndex,wIndex);
    }
  }
}
