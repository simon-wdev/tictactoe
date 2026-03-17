const gameBoard = (function(){ //Module Pattern
    let playGround = ["","","","","","","","",""] //9 Felder, tictactoe, 3x3, am Anfang leer

    const getPlayGround = () => playGround;

    const setPlayGround = (index, symbol) => //setzt später das Symbol an die Index Stelle
    {
            console.log("Symbol: " + symbol + " Index: " + index);
            playGround[index] = symbol;
            
    }

    return {getPlayGround, setPlayGround}; //gibt die Funktionen für Außen zurück, playGround bleibt privat


})();


const displayController = (function(){

    const renderPlayGround = () =>{
        const board = gameBoard.getPlayGround(); //holt den Array
        const wrapper = document.querySelector(".game");//Div im HTML

        wrapper.innerHTML = ""; //leert den Div, damit er nicht immer länger wird

        board.forEach((element, index) => { //erstellt ein DIV für jedes Element, foreach bietet den Index integriert an
            const square = document.createElement("div");
            square.classList.add("square"); //Klasse für CSS
            square.textContent = element; //wenn sich das Element ändert, ändert sich auch der Text im DIV
            wrapper.appendChild(square); //füg das div in den Wrapper ein

            square.addEventListener('click', () => {
                gameController.playGame(index);  
            }); 
        });     
    }; 

    return {renderPlayGround};
})();

const  createPlayer = (name, symbol) => { //returnt ein Objekt (Name und Symbol)
    return{
            playerName: name,
            playerSymbol: symbol
        }
}


const gameController = (function(){

    const player1 = createPlayer("Player 1", "X"); //neuer Spieler in createPlayer
    const player2 = createPlayer("Player 2", "O");
    const board = gameBoard.getPlayGround();
    let currentPlayer = player1;

    const playGame = (index) => { //index kommt vom Eventlistener, integer aus der foreach Schleife
        if (currentPlayer === player1) {
            gameBoard.setPlayGround(index, player1.playerSymbol)
            displayController.renderPlayGround(); //wird immer neu gerendert, deswegen muss der Div geleert werden
            checkWin();
            announceWinner();
            changePlayer();
        }else if (currentPlayer === player2) {
            gameBoard.setPlayGround(index, player2.playerSymbol)
            displayController.renderPlayGround();
            checkWin();
            announceWinner();
            changePlayer();
        }else{ //debug
            console.log("KEIN SPIELER DEFINIERT");
        }
    }

    const changePlayer = () => { //wechselt den Spieler, erstmal nur funktional

        if (currentPlayer === player1) {
            currentPlayer = player2;
        }else if (currentPlayer === player2) {
            currentPlayer = player1;
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
            return winConditions.some(function(threeInARow) {
                return threeInARow.every(function(square) {
                return board[square] === playerSymbol;
            });
        });

    }

    const announceWinner = () => {
        if(checkWin(currentPlayer.playerSymbol)){
            console.log(`Player: ${currentPlayer.playerName} wins with ${currentPlayer.playerSymbol}`)
        }else{
            return;
        }
    }

        return {playGame, changePlayer, checkWin, announceWinner}
    })();





        /*
        if (board[0] === board[1] && board[1] === board[2] && board[0] !== "") {
            console.log("WINNER: " + currentPlayer.playerName); 
        }else if (board[3] === board[4] && board[4] === board[5] && board[3] !== "") {
            console.log("WINNER: " + currentPlayer.playerName);
        }else if (board[6] === board[7] && board[7] === board[8] && board[6] !== "") {
            console.log("WINNER: " + currentPlayer.playerName);
        }else if (board[0] === board[3] && board[3] === board[6] && board[0] !== "") {
            console.log("WINNER: " + currentPlayer.playerName);
        }else if (board[1] === board[4] && board[4] === board[7] && board[1] !== "") {
            console.log("WINNER: " + currentPlayer.playerName);
        }else if (board[2] === board[5] && board[5] === board[8] && board[2] !== "") {
            console.log("WINNER: " + currentPlayer.playerName);
        }else if (board[0] === board[4] && board[4] === board[8] && board[0] !== "") {
            console.log("WINNER: " + currentPlayer.playerName);
        }else if (board[2] === board[4] && board[4] === board[6] && board[2] !== "") {
            console.log("WINNER: " + currentPlayer.playerName);
        }else{
            return;
        }*/
    
displayController.renderPlayGround();//rendert das Gameboard beim laden der Seite