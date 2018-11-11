let tur = "white";
let turnCount = 0, turns = 0;

 function nextTurn() {
   if (tur == "white") tur = "black";
   else tur = "white";
   turns++;
   turnCount = Math.floor(turns / 2);
   turn.innerText = tur + " player turnCount: " + turnCount;
 }
