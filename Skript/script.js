const gameBoard = (function(){ //Module Pattern
    let playGround = ["","","","","","","","",""]

    const getPlayGround = () => playGround;

    const setPlayGround = (index, symbol) =>
    {
        if (index>playGround.length) return; //wenn index länger Array, dann nichts
            playGround[index]=symbol; //Index des Quadrats, ersetzt mit dem symbol (O, X), eventuell später nützlich
    }

    return {getPlayGround, setPlayGround};


})();


const displayController = (function(){
    const renderPlayGround = () =>{
        const board = gameBoard.getPlayGround(); //holt den Array
        const wrapper = document.querySelector(".game");//Div im HTML

        board.forEach(element => { //erstelle ein div für jedes ELement im Array
            const square = document.createElement("div");
            square.classList.add("square");
            wrapper.appendChild(square);
        });

        
    }
        return {renderPlayGround};
})();


displayController.renderPlayGround();