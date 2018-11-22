const turn       = document.getElementById("turn");
const blackTimer = document.getElementById("blackTimer");
const whiteTimer = document.getElementById("whiteTimer");
const start      = document.getElementById("StartGame");
const pause      = document.getElementById("PauseGame");
const audio      = new Audio("./sources/swoosh.mp3");
const ruter      = 8;
const res        = 75;
const nPawns     = 8;
const width      = 2000;
const height     = 667;
const pW         = 6;
const pH         = 2;
const wIndex     = width / pW;
const hIndex     = height/pH;

let pauseState    = true;
let tur           = "white";
let terminalState = "none";
let order         = 0;
let deadList      = [];

let term       = false, midTerm    = false;
let turnCount  = 0,     turns      = 0;
let prevX      = 0,     prevY      = 0;
let blackState = false, whiteState = false;

let whiteSec = 0, whiteMin = 0, whiteHour = 0;
let blackSec = 0, blackMin = 0, blackHour = 0;

let img;
let interval;
let currentX, currentY;
let currentCell, prevCell;
let placeX, placeY;
let p, prevP;
let moves, thisMove;
