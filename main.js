$(document).ready(function() {
    const connect4 = new Connect('#connect4');
    connect4.createBoard();
})

class Connect {
    constructor(selector) {
        this.selector = selector;
        this.ROWS = 6;
        this.COLS = 7;
        // this.createGrid();
    }
    createBoard() { // creating a 6 X 7 grid
        const $board = $(this.selector); // grabbing in variable $board the #connect4 html element
        //creating the $board html dinamically
        for (let row = 0; row < this.ROWS; row++) { 
            const $row = $('<div>'); // create a div element and assign it to the $row variable
            $row.addClass('row'); //adding the class .row
            for (let col = 0; col < this.COLS; col++) {
                const $col = $('<div>');//create a div element and assign it to the $col variable
                $col.addClass('col') //adding the class .col
                    .addClass('empty'); //adding the class .row
                $row.append($col); // apending the child $col to the parrent $row
            }
            $board.append($row); // apending the child $row to the parrent $board
        }
    }
    addEventListeners() {
        const $board = $(this.selector);
    }
}