const turn = document.getElementById("turn");
turn.innerText = tur + " player turnCount: " + turnCount;
const ruter = 8;
const res   = 75;
let img;
const nPawns = 8;
let width = 2000, height = 667;
let pW = 6, pH = 2;
let wIndex = width / pW;
let hIndex = height/pH;

let board =
[[new Rook("b",0,0),new Knight("b",1,0),new Bishop("b",2,0),new Queen("b",3,0),new King("b",4,0),new Bishop("b",5,0),new Knight("b",6,0),new Rook("b",7,0)],
 [new Pawn("b",0,1),new Pawn("b",1,1),new Pawn("b",2,1),new Pawn("b",3,1),new Pawn("b",4,1),new Pawn("b",5,1),new Pawn("b",6,1),new Pawn("b",7,1)],
 [0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0],
 [new Pawn("w",0,6),new Pawn("w",1,6),new Pawn("w",2,6),new Pawn("w",3,6),new Pawn("w",4,6),new Pawn("w",5,6),new Pawn("w",6,6),new Pawn("w",7,6)],
 [new Rook("w",0,7),new Knight("w",1,7),new Bishop("w",2,7),new Queen("w",3,7),new King("w",4,7),new Bishop("w",5,7),new Knight("w",6,7),new Rook("w",7,7)]];




function preload() {
  img = loadImage('./sources/brikker.png');
}

function setup() {
  createCanvas(ruter * res, ruter * res);
  drawBoard();
  drawPieces();
}
