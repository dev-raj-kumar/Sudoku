var arr = [[], [], [], [], [], [], [], [], []]
var temp = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);

    }
}

function initializeTemp(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            temp[i][j] = false;

        }
    }
}


function setTemp(board, temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                temp[i][j] = true;
            }

        }
    }
}


function setColor(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (temp[i][j] == true) {
                arr[i][j].style.color = "#DC3545";
                arr[i][j].contentEditable = false;
            }
            else{
                arr[i][j].contentEditable = true;
            }

        }
    }
}

function resetColor() {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {

            arr[i][j].style.color = "green";


        }
    }
}

var board = [[], [], [], [], [], [], [], [], []]


let buttonEasy = document.getElementById('generate-sudoku-easy');
let buttonMedium = document.getElementById('generate-sudoku-medium');
let buttonHard = document.getElementById('generate-sudoku-hard');
let buttonRandom = document.getElementById('generate-sudoku-random');

let solve = document.getElementById('solve');
let check = document.getElementById('check');
solve.disabled = true;
check.disabled = true;

let mdiv = document.getElementById('container');
let checkDiv = document.getElementById('checkDiv');

console.log(arr);

function changeBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {

                arr[i][j].innerText = board[i][j]
            }

            else
                arr[i][j].innerText = ''
        }
    }
}

// for easy
buttonEasy.onclick = function () {
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function () {
        var response = JSON.parse(xhrRequest.response)
        console.log(response)
        initializeTemp(temp)
        resetColor()

        board = response.board
        setTemp(board, temp)
        setColor(temp)
        changeBoard(board)
        check.disabled = false;
        solve.disabled = false;
        checkDiv.innerText = "UNSOLVED";
        checkDiv.style.backgroundColor = "yellow";
    }
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
    // can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
    xhrRequest.send()
}

// for medium

buttonMedium.onclick = function () {
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function () {
        var response = JSON.parse(xhrRequest.response)
        console.log(response)
        initializeTemp(temp)
        resetColor()

        board = response.board
        setTemp(board, temp)
        setColor(temp)
        changeBoard(board)
        check.disabled = false;
        solve.disabled = false;
        checkDiv.innerText = "UNSOLVED";
        checkDiv.style.backgroundColor = "yellow";
    }
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=medium')
    // can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
    xhrRequest.send()
}

// for hard

buttonHard.onclick = function () {
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function () {
        var response = JSON.parse(xhrRequest.response)
        console.log(response)
        initializeTemp(temp)
        resetColor()

        board = response.board
        setTemp(board, temp)
        setColor(temp)
        changeBoard(board)
        check.disabled = false;
        solve.disabled = false;
        checkDiv.innerText = "UNSOLVED";
        checkDiv.style.backgroundColor = "yellow";
    }
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=hard')
    // can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
    xhrRequest.send()
}

// For random

buttonRandom.onclick = function () {
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function () {
        var response = JSON.parse(xhrRequest.response)
        console.log(response)
        initializeTemp(temp)
        resetColor()

        board = response.board
        setTemp(board, temp)
        setColor(temp)
        changeBoard(board)
        check.disabled = false;
        solve.disabled = false;
        checkDiv.innerText = "UNSOLVED";
        checkDiv.style.backgroundColor = "yellow";
    }
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=random')
    // can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
    xhrRequest.send()
}


// can make a call to changeboard(board) function to update the state on the screen


function isSafe(r,c,val){
    var i,j;
    for(i=0;i<9;i++){
        if(board[r][i] == val || board[i][c] == val){
            return false;
        }
    }

    var sgr = r - (r%3);
    var sgc = c - (c%3);

    for(i=0;i<3;i++){
        for(j=0;j<3;j++){
            if(board[sgr+i][sgc+j] == val)
            return false;
        }
    }

    return true;
}

flag = false;

function solveSudokuHelper(r,c){

    if(flag)
    return;

    if(r == 9){
        changeBoard(board);
        //console.log(board);
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                arr[i][j].contentEditable = false;
            }
        }
        flag=true;
        return;
    }

    if(c == 9){
        solveSudokuHelper(r+1,0);
        return;
    }

    if(board[r][c] != 0){
        solveSudokuHelper(r,c+1);
        return;
    }

    for(var val=1;val<=9;val++){
        if(isSafe(r,c,val)){
            board[r][c]=val;
            solveSudokuHelper(r,c+1);
            if(flag)
                return;
            board[r][c]=0;
        }
    }

}


solve.onclick = function () {
    flag = false;
    console.log("clicked");
    solveSudokuHelper(0,0);
    console.log(flag);
    check.disabled = true;
    
}


var grid = [[], [], [], [], [], [], [], [], []];

function correct(){
    checkDiv.innerText = "CORRECT";
    checkDiv.style.backgroundColor = "green";
}

function wrong(){
    checkDiv.innerText = "WRONG";
    checkDiv.style.backgroundColor = "red";
}

function isCorrect(r,c,val){
    var i,j;
    for(i=0;i<9;i++){
       
        if((grid[r][i] == val && i!==c) || ( grid[i][c] == val && i !==r)){
            console.log(i);
            return false;
        }
    }

    var sgr = r - (r%3);
    var sgc = c - (c%3);

    for(i=0;i<3;i++){
        for(j=0;j<3;j++){
            if(((i+sgr) == r) && ((j+sgc) == c))
            continue;
            if(grid[sgr+i][sgc+j] == val)
            return false;
        }
    }

    return true;
}


function checkHandler(){
    var i,j;

    for(i=0;i<9;i++){
        for(j=0;j<9;j++){
            console.log(arr[i][j].innerText,i,j);
            if(isNaN(arr[i][j].innerText)){
                wrong();
                return;
            }
            grid[i][j] = Number(arr[i][j].innerText);
            if(grid[i][j] < 1 || grid[i][j] > 9){
                wrong();
                return;
            }
        }
    }
    console.log(grid);

// **** This can be done much efficintely using map or set but for simplicity purpose, it's done naviely *****
    for(i=0;i<9;i++){
        for(j=0;j<9;j++){
            if(!(isCorrect(i,j,grid[i][j]))){
                console.log(i,j)
                wrong();
                return;
            }
        }
    }
    correct();
}

check.onclick = function(){
    console.log("check button clicked");
    checkHandler();

}
