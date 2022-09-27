const app = () => {
    const humanPlayer = 'x';
    const computer = 'o';
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ];


    const tiles = document.querySelectorAll('.tile');
    const playerOneCounter = document.querySelector('.player-1 span');
    const playerTwoCounter = document.querySelector('.player-2 span');
    const scores = [0, 0]
    const status = document.querySelector('.status');
    const playAgainBtn = document.querySelector('.play-again');
    const resetBtn = document.querySelector('.reset');
    const board = [
        "", "", "", "", "", "", "", "", ""
    ];

    let currentPlayer = humanPlayer;
    let isGameActive = true;
    let roundwon = false;

    const checkBoard = () => {
        const topLeft = board[0];
        const topMiddle = board[1];
        const topRight = board[2];
        const midLeft = board[3];
        const midMiddle = board[4];
        const midRight = board[5];
        const bottomLeft = board[6];
        const bottomMiddle = board[7];
        const bottomRight = board[8];
        if (topLeft && topLeft === topMiddle && topLeft === topRight) {
            isGameActive = false;
            console.log(`${topLeft} wins this round`);
            status.innerText = `${topLeft} wins`;
            tiles[0].classList.add('win');
            tiles[1].classList.add('win');
            tiles[2].classList.add('win');
        } if (midLeft && midLeft === midMiddle && midLeft === midRight) {
            isGameActive = false
            console.log(`${midLeft} wins this round`)
            status.innerText = `${midLeft} wins`;
            tiles[3].classList.add('win');
            tiles[4].classList.add('win');
            tiles[5].classList.add('win');
        }  if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
            isGameActive = false;
            console.log(`${bottomLeft} wins this round`);
            status.innerText = `${bottomLeft} wins`;
            tiles[6].classList.add('win');
            tiles[7].classList.add('win');
            tiles[8].classList.add('win');
        }  if (topLeft && topLeft === midLeft && topLeft === bottomLeft) {
            isGameActive = false;
            console.log(`${topLeft} wins this round`);
            status.innerText = `${topLeft} wins`;
            tiles[0].classList.add('win');
            tiles[3].classList.add('win');
            tiles[6].classList.add('win');
        }  if (topMiddle && topMiddle === midMiddle && topMiddle === bottomMiddle) {
            isGameActive = false;
            console.log(`${topMiddle} wins this round`);
            status.innerText = `${topMiddle} wins`;
            tiles[1].classList.add('win');
            tiles[4].classList.add('win');
            tiles[7].classList.add('win');
        }  if (topRight && topRight === midRight && topRight === bottomRight) {
            isGameActive = false;
            console.log(`${topRight} wins this round`);
            status.innerText = `${topRight} wins`;
            tiles[2].classList.add('win');
            tiles[5].classList.add('win');
            tiles[8].classList.add('win');
        }  if (topLeft && topLeft === midMiddle && topLeft === bottomRight) {
            isGameActive = false;
            console.log(`${topLeft} wins this round`);
            status.innerText = `${topLeft} wins`;
            tiles[0].classList.add('win');
            tiles[4].classList.add('win');
            tiles[8].classList.add('win');
        }  if (topRight && topRight === midMiddle && topRight === bottomLeft) {
            isGameActive = false;
            console.log(`${topRight} wins this round`);
            status.innerText = `${topRight} wins`;
            tiles[2].classList.add('win');
            tiles[4].classList.add('win');
            tiles[6].classList.add('win');
        }  if (topLeft && topMiddle && topRight && midLeft && midMiddle && midRight && bottomLeft && bottomMiddle && bottomRight) {
            isGameActive = false;
            // alert(`It's a tie`)
            status.innerText = "its a tie"
        }
    }

    const changePlayer = () => {
        if (currentPlayer === humanPlayer) {
            currentPlayer = computer;
            status.innerText = `It's O's turn`;
        } else {
            currentPlayer = humanPlayer;
            status.innerText = `It's X's turn`;
        }

    };

    const isValidMove = (tile) => {
        if (tile.innerText === 'x' || tile.innerText === "o") {
            return false;
        }
        return true;
    };

    const handleHumanMove = (tile, index) => {
        if (isValidMove(tile) && isGameActive) {
            board[index] = currentPlayer;
            tile.innerText = board[index];
            checkBoard();
            if (isGameActive) {

                changePlayer();

                computerMove();
            }
        };
    };

    const emptyCells = () => {
        let cells = []
        tiles.forEach((tile, index) => {
            if (tile.textContent === "") {
                cells.push(index)
            }
        })
        return cells;
    }
    const bestspot = () => {
        return emptyCells()[0]
    }

    const computerMove = () => {
        // if (emptyCells().length !== 0) {
        // console.log('black')
        // console.log(emptyCells().length)


        const move = emptyCells()[Math.floor(Math.random() * emptyCells().length)];
        board[move] = currentPlayer;
        tiles[move].innerText = currentPlayer;
        checkBoard();
        if (isGameActive) {
            changePlayer();
        }

        // }
    }

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => {
            if (currentPlayer === humanPlayer) {

                handleHumanMove(tile, index);
            }
        });
    });

    resetBtn.addEventListener('click', () => {
        isGameActive = true;
        currentPlayer = humanPlayer;

        tiles.forEach((tile) => {
            tile.innerText = "";
            tile.classList.remove('win');
        })
        board.forEach((element, index) => {
            board[index] = ''
        });
        status.innerHTML = `It's ${currentPlayer}'s turn`
        console.log(board)
    })

    playAgainBtn.addEventListener('click', () => {
        isGameActive = true;
        currentPlayer = humanPlayer;
        tiles.forEach((tile) => {
            tile.innerText = "";
            tile.classList.remove('win')
        });
        board.forEach((element, index) => {
            board[index] = "";
        });
        console.log(board);
    })




};

app();