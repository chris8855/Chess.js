function drawBoard() {
  let whitefield = false;
  background(0);
  stroke(0);
  strokeWeight(2);
  noFill();
  for (let c = 0; c < ruter; c++) {
    if (whitefield) whitefield = false;
    else whitefield = true;
    for (let r = 0; r < ruter; r++) {
      if (whitefield) {
        fill(255);
        whitefield = false;
      }
      else{
        fill(102, 51, 0);
        whitefield = true;
      }
      rect(c * res, r * res, res - 1, res - 1);
    }
  }
}

function getImage(piece,i,j) {
  let x, y;
  switch (piece) {
    case "wp":
      x = wIndex * 5;
      y = hIndex * 0;
      break;
    case "bp":
      x = wIndex * 5;
      y = hIndex * 1;
      break;
    default:
      break;
  }

  let k = image(img,i*res,j*res,res,res,x,y,333,333);
  return k;

}
