const gameBoard = (function(){ //Module Pattern
    let playGround = ["","","","","","","","",""] //9 Felder, tictactoe, 3x3, am Anfang leer

    const getPlayGround = () => playGround;

    const setPlayGround = (index, symbol) => //setzt später das Symbol an die Index Stelle
    {
            console.log("Symbol: " + symbol + " Index: " + index);
            playGround[index] = symbol;
            
    }

    return {getPlayGround, setPlayGround};


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
    let currentPlayer = player1;

    const playGame = (index, symbol) => { //index kommt vom Eventlistener, integer aus der foreach Schleife
        if (currentPlayer === player1) {
            gameBoard.setPlayGround(index, player1.playerSymbol)
            displayController.renderPlayGround(); //wird immer neu gerendert, deswegen muss der Div geleert werden
            console.log("Player 1 spielt mit " + symbol);
            changePlayer();
        }else if (currentPlayer === player2) {
            gameBoard.setPlayGround(index, player2.playerSymbol)
            displayController.renderPlayGround();
            console.log("Player 2 spielt mit " + symbol);
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
    return {playGame, changePlayer};
})();

displayController.renderPlayGround();//rendert das Gameboard beim laden der Seite