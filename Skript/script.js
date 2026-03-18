const gameBoard = (function(){ //Module Pattern
    let playGround = ["","","","","","","","",""]; //9 Felder, tictactoe, 3x3, am Anfang leer
    const resetBtn = document.querySelector(".resetBtn");

    const getPlayGround = () => playGround;

    const setPlayGround = (index, symbol) => //setzt später das Symbol an die Index Stelle
    {
            console.log("Symbol: " + symbol + " Index: " + index);
            playGround[index] = symbol;
            
    };

    resetBtn.addEventListener("click", function(e){
            e.preventDefault(); //sonst lädt die seite neu
            resetPlayGround();
        });


    const resetPlayGround = () => 
    {
        playGround = ["","","","","","","","",""] //erstelle ein neues, leeres gameboard
        displayController.renderPlayGround();//gameboard neu rendern
    }

    return {getPlayGround, setPlayGround, resetPlayGround}; //gibt die Funktionen für Außen zurück, playGround bleibt privat


})();


const displayController = (function(){

    const renderPlayGround = () =>{
        const board = gameBoard.getPlayGround(); //holt den Array
        const wrapper = document.querySelector(".game");//Div im HTML

        wrapper.innerHTML = ""; //leert den Div, damit er nicht immer länger wird

        board.forEach((element, index) => { //erstellt ein DIV für jedes Element, foreach bietet den Index integriert an
            const square = document.createElement("div");
            square.classList.add("square");
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
    let currentPlayer = player1;


    //REFACTOR VON DIESER FUNKTION (DRY-Prinzip)
    const playGame = (index) => { //index kommt vom Eventlistener, integer aus der foreach Schleife
        if (currentPlayer === player1) {
            gameBoard.setPlayGround(index, player1.playerSymbol)
            displayController.renderPlayGround(); //wird immer neu gerendert, deswegen muss der Div geleert werden
            checkWin();
            checkTie();
            announceWinner();
            changePlayer();
        }else if (currentPlayer === player2) {
            gameBoard.setPlayGround(index, player2.playerSymbol)
            displayController.renderPlayGround();
            checkWin();
            checkTie();
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
        const currentBoard = gameBoard.getPlayGround(); //holt den aktuellen Array, da das board resettet werden kann, muss immer das aktuelle array vorhanden sein

            return winConditions.some(function(threeInARow) { //some prüft ob eine winCondition erfüllt ist, also ob es drei in einer Reihe gibt
                return threeInARow.every(function(square) { //gleiches Symbol in den drei Feldern der winCondition?
                    return currentBoard[square] === playerSymbol;//ist ein Symbol vorhanden?
            });
        });
    }

    const checkTie = () => {
        const currentBoard = gameBoard.getPlayGround();

        if(currentBoard.every(function(square){
           return square !== ""
        })){
            console.log("TIE, BOARD IS FULL")
        }
    }

    const announceWinner = () => {
        if(checkWin(currentPlayer.playerSymbol)){ //currentPlayer Symbol wird an checkWin übergeben. Hat der aktuelle Spieler gewonnen?
            console.log(`Player: ${currentPlayer.playerName} wins with ${currentPlayer.playerSymbol}`)
        }else{ //wenn nicht, mach weiter
            return;
        }
    }

        return {playGame, changePlayer, checkWin, checkTie, announceWinner}
    })();


    
displayController.renderPlayGround();//rendert das Gameboard beim laden der Seite