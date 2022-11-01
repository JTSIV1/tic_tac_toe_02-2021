let numRows = 3;
let numCols = 3;
let boxSize = 100;
let board = new Array(numRows * numCols);
let isGameOver = false;
let isP1Turn = true;
let gameResult = 0; // who has won / is there no winner
let subTurnIsX = true; // will X or O be placed
let c; // background color

function setup() {
  createCanvas(numCols * boxSize, numRows * boxSize + 25);
  for(i = 0; i < board.length; i++){
    board[i] = ' ';
  }
  reset = createButton('Reset');
  reset.position(2, numRows * boxSize + 2);
  reset.mousePressed(resetGame);
}

function draw() {
  if(isP1Turn){
    c = color("blue");
  }else{
    c = color("red");
  }
  background(c);
  for(i = 0; i < numRows - 1; i++){
    rect(0, ((i + 1) * boxSize) - 1, numCols * boxSize, 2);
  }
  for(i = 0; i < numCols - 1; i++){
    rect(((i + 1) * boxSize) - 1, 0, 2, numRows * boxSize);
  }
  drawBoard();
}

function drawBoard(){
  for(i = 0; i < board.length; i++){
    if(board[i] != ' '){
      if(board[i] == 'X'){
        let x1 = 0.1 * boxSize + (i % numCols) * boxSize;
        let x2 = 0.9 * boxSize + (i % numCols) * boxSize;
        let y1 = 0.1 * boxSize + floor(i / numCols) * boxSize;
        let y2 = 0.9 * boxSize + floor(i / numCols) * boxSize;
        line(x1, y1, x2, y2);
        line(x1, y2, x2, y1);
      }else{
        fill(c);
        circle(0.5 * boxSize + (i % numCols) * boxSize, 0.5 * boxSize + floor(i / numCols) * boxSize, 0.9 * boxSize);
      }
    }
  }
  fill(220);
  strokeWeight(0);
  rect(0, numRows * boxSize, numCols * boxSize, numRows * boxSize +25);
  fill(50);
  strokeWeight(1);
  textSize(15);
  if(gameResult == 1){
    text("Blue Wins!", 70, numRows * boxSize + 18); 
  }else if(gameResult == -1){
    text("Red Wins!", 70, numRows * boxSize + 18); 
  }else if(isGameOver){
    text("Draw", 70, numRows * boxSize + 18); 
  }
}

function mouseClicked() {
  if(!isGameOver){
    col = floor(mouseX/boxSize);
    row = floor(mouseY/boxSize);
    if(board[col + numCols * row] == ' '){
      if(subTurnIsX){
        board[col + numCols * row] = 'X';
      }else{
        board[col + numCols * row] = 'O';
      }
      checkWin();
      if(!isGameOver){
        if(subTurnIsX){
          subTurnIsX = false;
        }else{
          subTurnIsX = true;
          isP1Turn = !isP1Turn;
        }
      }
    }
  }
}

function checkWin(){
  let hasWin = false;
  // check horizontal wins
  for(i = 0; i < numRows; i++){
    for(j = 0; j <= numCols - 3; j++){
      p1 = numCols * i + j;
      if(board[p1] != ' '){
        if(board[p1] == board[p1 + 1] && board[p1] == board[p1 + 2]){
          hasWin = true;
        }
      }
    }
  }
  // check vertical wins
  for(i = 0; i < numCols; i++){
    for(j = 0; j <= numRows - 3; j++){
      p1 = numCols * j + i;
      if(board[p1] != ' '){
        if(board[p1] == board[p1 + numCols] && board[p1] == board[p1 + 2 * numCols]){
          hasWin = true;
        }
      }
    }
  }
  // check diagonal wins
  for(i = 0; i <= numCols - 3; i++){
    for(j = 0; j <= numRows - 3; j++){
      p1 = numCols * j + i;
      if(board[p1] != ' '){
        if(board[p1] == board[p1 + numCols + 1] && board[p1] == board[p1 + 2 * numCols + 2]){
          hasWin = true;
        }
      }
      if(board[p1 + 2] != ' '){
        if(board[p1 + 2] == board[p1 + numCols + 1] && board[p1 + 2] == board[p1 + 2 * numCols]){
          hasWin = true;
        }
      }
    }
  }
  
  if(hasWin){
    fill(50);
    if(isP1Turn){
      gameResult = 1;
    }else{
      gameResult = -1;
    }
    isGameOver = true;
  }
  if(!isGameOver){
    let boardFull = true;
    for(i = 0; i < board.length; i++){
      if(board[i] == ' '){
        boardFull = false;
      }
    }
    if(boardFull){
      isGameOver = true;
    }
  }
}

function resetGame(){
  for(i = 0; i < board.length; i++){
    board[i] = ' ';
  }
  isGameOver = false;
  isP1Turn = true;
  gameResult = 0;
  subTurnIsX = true;
}