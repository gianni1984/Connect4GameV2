$(document).ready(function () {
    const connect4 = new Connect('#connect4');
    $('#restart').on('click', function () {
        connect4.restart();
    })
})

class Connect {
    constructor(selector) {
        this.selector = selector;
        this.ROWS = 6;
        this.COLS = 7;
        this.player = 'red';
        this.isGameOver = false;
        this.createBoard();
        this.addEventListeners();
        // this.restart();
    }
    createBoard() { // creating a 6 X 7 grid
        const $board = $(this.selector); // grabbing in variable $board the #connect4 html element
        $board.empty(); //removing the last board when creating a new one
        this.player = 'red';
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
        const $board = $(this.selector); // grabbing in variable $board the #connect4 html element
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
            const $lastEmptyCell = getLastEmptyCell(col); //find last empty cell on the column we hover on
            $lastEmptyCell.addClass(`next-${that.player}`);
        })

        //adding on mouse leave event listener
        $board.on('mouseleave', '.col.empty', function () {
            const col = $(this).data('col') //grab the index of the col (0,1,2,3,4,5,6,7)
            const $lastEmptyCell = getLastEmptyCell(col); //find last empty cell on the column we hover on
            $lastEmptyCell.removeClass(`next-${that.player}`);
        })

        //adding the click event

        $board.on('click', '.col.empty', function () {
            const col = $(this).data('col') //grab the index of the col (0,1,2,3,4,5,6,7)
            const $lastEmptyCell = getLastEmptyCell(col); //find last empty cell on the column we hover on

            $lastEmptyCell.removeClass(`empty next-${that.player}`);
            $lastEmptyCell.addClass(that.player);
            $lastEmptyCell.data('player', that.player);

            const winner = that.checkForWinner(
                $lastEmptyCell.data('row'),
                $lastEmptyCell.data('col'));
            if (winner) {
                that.isGameOver = true;
                alert(`Game Over!Player ${that.player} has won!`);
                $('.col.empty').removeClass('empty'); // remove cursor pointer
            }

            that.player = that.player === 'red' ? 'black' : 'red'; // switch beetween players (red and black);
            $('#player').text(that.player);
            $(this).trigger('mouseenter'); //trigger the mouseenter event

        })
    }

    checkForWinner(row, col) {
        //the game is won if we have 4 pieces of the same color in a row
        //horizontaly, verticaly or diagonaly
        const that = this;

        function $getCell(i, j) {
            return $(`.col[data-row='${i}'][data-col='${j}']`);
        }

        function checkDirection(direction) {
            let total = 0;
            let i = row + direction.i;
            let j = col + direction.j;
            let $next = $getCell(i, j);
            while (i >= 0 &&
                i < that.ROWS &&
                j >= 0 &&
                j < that.COLS &&
                $next.data('player') === that.player
            ) {
                total++;
                i += direction.i;
                j += direction.j;
                $next = $getCell(i, j);
            }
            return total;
        }

        function checkWin(directionA, directionB) {
            const total = 1 + // 1 because we start from the last piece we put on the board
                checkDirection(directionA) +
                checkDirection(directionB);
            if (total >= 4) {
                return that.player;
            } else {
                return null;
            }
        }

        function checkDiagonalBLtoTR() {
            return checkWin({
                i: 1,
                j: -1
            }, {
                i: 1,
                j: 1
            });
        }

        function checkDiagonalTLtoBR() {
            return checkWin({
                i: 1,
                j: 1
            }, {
                i: -1,
                j: -1
            });
        }

        function checkVerticals() {
            return checkWin({
                i: -1,
                j: 0
            }, {
                i: 1,
                j: 0
            })
        }

        function checkHorizontals() {
            return checkWin({
                i: 0,
                j: -1
            }, {
                i: 0,
                j: 1
            })
        }

        return checkVerticals() || checkHorizontals() || checkDiagonalBLtoTR() || checkDiagonalTLtoBR();
    }

    restart() {
        this.createBoard();
        $('#player').text(this.player);
    }
}