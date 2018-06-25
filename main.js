$(document).ready(function () {
    const connect4 = new Connect('#connect4');
    connect4.createBoard();
    connect4.addEventListeners();
})

class Connect {
    constructor(selector) {
        this.selector = selector;
        this.ROWS = 6;
        this.COLS = 7;
        this.player = 'red';
        // this.createGrid();
    }
    createBoard() { // creating a 6 X 7 grid
        const $board = $(this.selector); // grabbing in variable $board the #connect4 html element
        //creating the $board html dinamically
        for (let row = 0; row < this.ROWS; row++) {
            const $row = $('<div>'); // create a div element and assign it to the $row variable
            $row.addClass('row'); //adding the class .row
            for (let col = 0; col < this.COLS; col++) {
                const $col = $('<div>'); //create a div element and assign it to the $col variable
                $col.addClass('col empty') //adding the class .col .empty
                    .attr('data-col', col) //adding attributes to keep track of the indexes of the cell
                    .attr('data-row', row)
                $row.append($col); // apending the child $col to the parrent $row
            }
            $board.append($row); // apending the child $row to the parrent $board
        }
    }
    addEventListeners() {
        const $board = $(this.selector);
        const that = this; // keeping track of the original this
        function getLastEmptyCell(col) { //getting the last empty cell from the specified column
            const cells = $(`.col[data-col='${col}']`); //getting the cells from the specified column
            for (let i = cells.length - 1; i >= 0; i--) { //looping backwards through the cells because we need the last one
                let cell = $(cells[i]);
                if (cell.hasClass('empty')) {
                    return cell;
                }
            }
            return null;
        }

        //adding on mouse enter event listener
        $board.on('mouseenter', '.col.empty', function () {
            const col = $(this).data('col'); //grab the index of the col (0,1,2,3,4,5,6,7)
            const $lastemptyCell = getLastEmptyCell(col); //find last empty cell on the column we hover on
            $lastemptyCell.addClass(`next-${that.player}`);
        })

        //adding on mouse leave event listener
        $board.on('mouseleave', '.col.empty', function () {
            const col = $(this).data('col') //grab the index of the col (0,1,2,3,4,5,6,7)
            const $lastemptyCell = getLastEmptyCell(col); //find last empty cell on the column we hover on
            $lastemptyCell.removeClass(`next-${that.player}`);
        })
    }
}