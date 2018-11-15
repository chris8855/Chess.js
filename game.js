let tur = "white";
let turnCount = 0, turns = 0;
let terminalState = "none";
let term = false;


 function nextTurn() {
   if (tur == "white") tur = "black";
   else tur = "white";
   turns++;
   turnCount = Math.floor(turns / 2);
   turn.innerText = tur + " player turnCount: " + turnCount;
 }


 function checkTerminalState() {
   let black = 0, white = 0;
   for (let i = 0; i < 8; i++) {
     for (let j = 0; j < 8; j++) {
       let piece = board[i][j];
       if(piece != 0) {
         if (piece.color == "b") black ++;
         if (piece.color == "w") white ++;
       }
     }
   }
   if (black == 0){
     terminalState = "white";
     return true;
   }
   else if (white == 0){
     terminalState = "black";
     return true;
   }
   else return false;
 }


 function checkRokkade() {
   if (p.color == prevP.color) {
     if ((p instanceof King && prevP instanceof Rook) || (p instanceof Rook && prevP instanceof King)) {
       if (!p.moved && !p.moved) return true;
       else return false;
     }
     else return false;
   }
   else return false;
 }

 async function updateClock() {
   if (tur == "white") {
     whiteSec++;
     if (whiteSec == 60){
       whiteMin++;
       whiteSec = 0;
     }
     if (whiteMin == 60){
       whiteHour++;
       whiteMin = 0;
     }
     whiteTimer.innerText = `${whiteHour}:${whiteMin}:${whiteSec}`;
   }
   else {
     blackSec++;
     if (blackSec == 60){
       blackMin++;
       blackSec = 0;
     }
     if (blackMin == 60){
       blackHour++;
       blackMin = 0;
     }
     blackTimer.innerText = `${blackHour}:${blackMin}:${blackSec}`;
   }
 }
