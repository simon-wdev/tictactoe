
const gameBoard = (function(){ //Module Pattern
    let playGround = ["","","","","","","","",""]; //9 Felder, tictactoe, 3x3, am Anfang leer
    const resetBtn = document.querySelector(".resetBtn");

    const getPlayGround = () => playGround;

    const setPlayGround = (index, symbol) => //setzt später das Symbol an die Index Stelle
    {
            playGround[index] = symbol;
            
    };

    resetBtn.addEventListener("click", function(e){
            e.preventDefault(); //sonst lädt die seite neu
            resetPlayGround();
        });


    const resetPlayGround = () => 
    {
        playGround = ["","","","","","","","",""] //erstelle ein neues, leeres gameboard
        gameController.resetGame();
        displayController.changeText("top", "TIC-TAC-TOE")
        displayController.changeText("bottom", "START BY CLICKING A SQUARE OR ENTER NEW NAMES")
        displayController.renderPlayGround();//gameboard neu rendern
    }

    return {getPlayGround, setPlayGround, resetPlayGround}; //gibt die Funktionen für Außen zurück, playGround bleibt privat


})();


const displayController = (function(){

    const renderPlayGround = (winnerSquares, isTie) =>{ //winnerSquares kommt von playGame
        const board = gameBoard.getPlayGround(); //holt den Array
        const wrapper = document.querySelector(".game");//Div im HTML

        wrapper.innerHTML = ""; //leert den Div, damit er nicht immer länger wird

        board.forEach((element, index) => { //erstellt ein DIV für jedes Element, foreach bietet den Index integriert an
            const square = document.createElement("div");
            square.classList.add("square");
            square.textContent = element; //wenn sich das Element ändert, ändert sich auch der Text im DIV

            if (element !== ""){
                square.classList.add(element === "X" ? "x-color" : "o-color")//wenn element "X" dann Klasse x-color ansonsten o-color
            }

            if (winnerSquares && winnerSquares.includes(index)){ //sind überhaupt Daten vorhanden und wenn ja auf welchem index der for each schleife?
                square.classList.add("winnerHighlight")
            }

            if (isTie){
                square.classList.add("tieHighlight")
                displayController.changeText("top", "TIE!")
                displayController.changeText("bottom", "CLICK RESET TO START AGAIN")
            }

            wrapper.appendChild(square); //fügt das div in den Wrapper ein

            square.addEventListener('click', () => {
                gameController.playGame(index);  
            }); 
        });     
    };
    
    const changeText = (position, text) => {
        const winTextTop = document.querySelector(".winTextTop")
        const winTextBottom = document.querySelector(".winTextBottom")
            if (position == "top"){
                winTextTop.innerHTML = `${text}`
            }else if(position == "bottom"){
                winTextBottom.innerHTML = `${text}`
            }else{
                console.log("TEXT POSITION NOT FOUND")
            }
    };

    return {renderPlayGround, changeText};
})();

const  createPlayer = (name, symbol) => { //returnt ein Objekt (Name und Symbol)
    return{
            playerName: name,
            playerSymbol: symbol
        }
}


const gameController = (function(){

    let player1;
    let player2;
    let currentPlayer
    let gameOver = false;
    let isTie = false;
    const startBtn = document.querySelector(".startBtn")

    const tieCheck = () => isTie;

    const noPlayer = () => gameOver = true;

    const resetGame = () => {
        gameOver = false;
        isTie = false;
        currentPlayer = player1;
    }
        

        startBtn.addEventListener("click", function(e){
            e.preventDefault();
            const player1Name = document.querySelector('[name="p1"]').value
            const player2Name = document.querySelector('[name="p2"]').value
            const nameBox = document.getElementById("player")

            if(!player1Name||!player2Name == null){
                return;
            }
                player1 = createPlayer(player1Name, "X")
                player2 = createPlayer(player2Name, "O")
                currentPlayer = player1;
                gameOver = false;
        });


    const playGame = (index) => {  //index kommt vom Eventlistener, integer aus der foreach Schleife
    const isEmpty = gameBoard.getPlayGround();

        if (isEmpty[index] !== "" || gameOver){
            return;
        } else {
            gameBoard.setPlayGround(index, currentPlayer.playerSymbol)
            const winnerSquares = gameController.checkWin(currentPlayer.playerSymbol);
            checkTie();
            displayController.renderPlayGround(winnerSquares, tieCheck())
            checkWin();
            announceWinner();
            changePlayer();
        }
    }

    const changePlayer = () => { //wechselt den Spieler, erstmal nur funktional

        if (isTie || gameOver){
            return;
        }

        if (currentPlayer === player1) {
            currentPlayer = player2;
            displayController.changeText("bottom", `${currentPlayer.playerName}'s TURN!`)
        }else if (currentPlayer === player2) {
            currentPlayer = player1;
            displayController.changeText("bottom", `${currentPlayer.playerName}'s TURN!`)
        }
    }

//Alle Kombinationen: 0,1,2, 3,4,5, 6,7,8, 0,3,6, 1,4,7, 2,5,8, 0,4,8, 2,4,6
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

    const checkWin = (playerSymbol) => {
        const currentBoard = gameBoard.getPlayGround(); //holt den aktuellen Array, da das board resettet werden kann, muss immer das aktuelle array vorhanden sein

            return winConditions.find(function(threeInARow) { //find findet die zutreffende win conditions und gibt die indices zurück
                return threeInARow.every(function(square) { //gleiches Symbol in den drei Feldern der winCondition?
                    return currentBoard[square] === playerSymbol;//ist ein Symbol vorhanden?
            });
        });
    }

    const checkTie = () => {
        const currentBoard = gameBoard.getPlayGround();

        if(checkWin(currentPlayer.playerSymbol)){
            return;
        }

        if(currentBoard.every(function(square){
           return square !== ""
        })){
            isTie = true;
            gameOver = true;
        }
    }

    const announceWinner = () => {
        if(checkWin(currentPlayer.playerSymbol)){ //currentPlayer Symbol wird an checkWin übergeben. Hat der aktuelle Spieler gewonnen?
            gameOver = true;
            displayController.changeText("top", "WIN!");
            displayController.changeText("bottom", "CLICK RESET TO START AGAIN")
            console.log(`Player: ${currentPlayer.playerName} wins with ${currentPlayer.playerSymbol}`)
        }else{ //wenn nicht, mach weiter
            return;
        }
    }

        return {playGame, changePlayer, checkWin, checkTie, announceWinner, resetGame, noPlayer}
    })();


    
displayController.renderPlayGround();//rendert das Gameboard beim laden der Seite
gameController.noPlayer();

//NAMEN
//Forms + Start Button, Text ändern
//gamecontroller getPlayer function()
