const app = () => {
    const humanPlayer = 'X';
    const computer = 'O';
    const winningCombinations = [
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
    const playerXCounter = document.querySelector('.player-1 span');
    const playerOCounter = document.querySelector('.player-2 span');
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

/*
    This checkBoardOld function is the previous checkboard function. I'm just keeping it around incase I encounter a bug sometime in the future
*/
    const checkBoardOld = () => {
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
        }
        if (midLeft && midLeft === midMiddle && midLeft === midRight) {
            isGameActive = false
            console.log(`${midLeft} wins this round`)
            status.innerText = `${midLeft} wins`;
            tiles[3].classList.add('win');
            tiles[4].classList.add('win');
            tiles[5].classList.add('win');
        }
        if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
            isGameActive = false;
            console.log(`${bottomLeft} wins this round`);
            status.innerText = `${bottomLeft} wins`;
            tiles[6].classList.add('win');
            tiles[7].classList.add('win');
            tiles[8].classList.add('win');
        }
        if (topLeft && topLeft === midLeft && topLeft === bottomLeft) {
            isGameActive = false;
            console.log(`${topLeft} wins this round`);
            status.innerText = `${topLeft} wins`;
            tiles[0].classList.add('win');
            tiles[3].classList.add('win');
            tiles[6].classList.add('win');
        }
        if (topMiddle && topMiddle === midMiddle && topMiddle === bottomMiddle) {
            isGameActive = false;
            console.log(`${topMiddle} wins this round`);
            status.innerText = `${topMiddle} wins`;
            tiles[1].classList.add('win');
            tiles[4].classList.add('win');
            tiles[7].classList.add('win');
        }
        if (topRight && topRight === midRight && topRight === bottomRight) {
            isGameActive = false;
            console.log(`${topRight} wins this round`);
            status.innerText = `${topRight} wins`;
            tiles[2].classList.add('win');
            tiles[5].classList.add('win');
            tiles[8].classList.add('win');
        }
        if (topLeft && topLeft === midMiddle && topLeft === bottomRight) {
            isGameActive = false;
            console.log(`${topLeft} wins this round`);
            status.innerText = `${topLeft} wins`;
            tiles[0].classList.add('win');
            tiles[4].classList.add('win');
            tiles[8].classList.add('win');
        }
        if (topRight && topRight === midMiddle && topRight === bottomLeft) {
            isGameActive = false;
            console.log(`${topRight} wins this round`);
            status.innerText = `${topRight} wins`;
            tiles[2].classList.add('win');
            tiles[4].classList.add('win');
            tiles[6].classList.add('win');
        }
        if (topLeft && topMiddle && topRight && midLeft && midMiddle && midRight && bottomLeft && bottomMiddle && bottomRight) {
            isGameActive = false;
            // alert(`It's a tie`)
            status.innerText = "its a tie"
        }
    }
    const handleWin = (gameWon) => {
        isGameActive = false;
        // console.log(winningCombinations[gameWon.index][0])
        status.innerText = `${currentPlayer} wins this round`
        winningCombinations[gameWon.index].forEach((item) => {
            tiles[item].classList.add('win')
        })
        if (board[winningCombinations[gameWon.index][0]] === "X") {
            scores[0]++;
            playerXCounter.innerText = scores[0]
        } else {
            scores[1]++;
            playerOCounter.innerText = scores[1]
        }
    }
    const checkBoard = () => {
        let gameWon = null;
        for (let [index, win] of winningCombinations.entries()) {
            if (board[win[0]] === '' || board[win[0]] === '' || board[win[0]] === '') {
                continue
            }
            if (board[win[0]] === board[win[1]] && board[win[0]] === board[win[2]]) {
                gameWon = {
                    'index': index,
                    'player': currentPlayer
                };
                handleWin(gameWon)
                // gameWon = true;
                // console.log(tiles[win[0]])
                break
            } else if (!board.includes("")) {
                isGameActive = false;
                // alert(`It's a tie`)
                status.innerText = "It's a tie";
            }
        }
        if (gameWon) {
            // isGameActive = false;
        }
        return gameWon
    }

    const gameOver = (gameWon) => {
        for (let index of winningCombinations[gameWon.index]) {
            console.log('hello')
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
        if (tile.innerText === 'X' || tile.innerText === "O") {
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
        setTimeout(() => {
            const move = emptyCells()[Math.floor(Math.random() * emptyCells().length)];
            board[move] = currentPlayer;
            tiles[move].innerText = currentPlayer;
            checkBoard();
            if (isGameActive) {
                changePlayer();
            }

        }, 300);


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
        status.innerHTML = `It's ${currentPlayer}'s turn`;
        scores[0] = 0;
        scores[1] = 0;
        playerXCounter.innerText = 0;
        playerOCounter.innerText = 0;
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
        status.innerHTML = `It's ${currentPlayer}'s turn`;
    })




};

app();