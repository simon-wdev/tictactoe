const gameBoard = (function(){ //Module Pattern
    let playGround = ["","","","","","","","",""]

    const getPlayGround = () => playGround;

    const setPlayGround = (index, symbol) =>
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

        wrapper.innerHTML = "";

        board.forEach((element, index) => { 
            const square = document.createElement("div");
            square.classList.add("square");
            square.textContent = element;
            wrapper.appendChild(square);

            square.addEventListener('click', () => {
                gameController.playGame(index);  
            }); 
        });     
    }; 

    return {renderPlayGround};
})();

const  createPlayer = (name, symbol) => {
    return{
            playerName: name,
            playerSymbol: symbol
        }
}


const gameController = (function(){

    const player1 = createPlayer("Player 1", "X");
    const player2 = createPlayer("Player 2", "O");
    let currentPlayer = player1;

    const playGame = (index, symbol) => {
        if (currentPlayer === player1) {
            gameBoard.setPlayGround(index, symbol)
            displayController.renderPlayGround();
            console.log("Player 1 spielt mit " + symbol);
            changePlayer();
        }else if (currentPlayer === player2) {
            gameBoard.setPlayGround(index, symbol)
            displayController.renderPlayGround();
            console.log("Player 2 spielt mit " + symbol);
            changePlayer();
        }else{
            console.log("KEIN SPIELER DEFINIERT");
        }
    }

    const changePlayer = () => {

        if (currentPlayer === player1) {
            currentPlayer = player2;
        }else if (currentPlayer === player2) {
            currentPlayer = player1;
        }
    }
    return {playGame, changePlayer};
})();

displayController.renderPlayGround();