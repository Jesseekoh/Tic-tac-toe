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
    const scoreSheet = [0, 0]
    const gameStatus = document.querySelector('.status');
    const playAgainBtn = document.querySelector('.play-again');
    const resetBtn = document.querySelector('.reset');
    const board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    let currentPlayer = humanPlayer;
    let isGameActive = true;

    const checkWinner = () => {
        let winner = null;
        let winningIndex = null;

        // horizontal
        if (board[0] == board[1] && board[1] == board[2] && board[0] != "") {
            winner = board[0];
            winningIndex = 0;
        }
        if (board[3] == board[4] && board[4] == board[5] && board[3] != "") {
            winner = board[3];
            winningIndex = 1;
        }
        if (board[6] == board[7] && board[7] == board[8] && board[6] != "") {
            winner = board[6];
            winningIndex = 2;
        }

        // Vertical
        if (board[0] == board[3] && board[3] == board[6] && board[0] != "") {
            winner = board[0];
            winningIndex = 5;
        }
        if (board[1] == board[4] && board[4] == board[7] && board[1] != "") {
            winner = board[1];
            winningIndex = 6;
        }
        if (board[2] == board[5] && board[5] == board[8] && board[2] != "") {
            winner = board[2];
            winningIndex = 7;
        }

        // Diagonal
        if (board[0] == board[4] && board[4] == board[8] && board[0] != "") {
            winner = board[0];
            winningIndex = 3;
        }
        if (board[2] == board[4] && board[4] == board[6] && board[2] != "") {
            winner = board[2];
            winningIndex = 4;
        }

        if (winner == null && !board.includes("")) {
            winner = "tie";
            return {
                winner,
            };
        } else {
            return {
                winner,
                winningIndex,
            };
        }
    };

    const handleWinner = (checkWinner) => {
        if (checkWinner.winner === "X" || checkWinner.winner === "O") {
            isGameActive = false;
            gameStatus.innerText = `${checkWinner.winner} wins this round`;
            winningCombinations[checkWinner.winningIndex].forEach((item) => {
                tiles[item].classList.add("win");
            });
            if (checkWinner.winner === "X") {
                scoreSheet[0]++;
                playerXCounter.innerText = scoreSheet[0];
            } else {
                scoreSheet[1]++;
                playerOCounter.innerText = scoreSheet[1];
            }
        } else if (checkWinner.winner === "tie") {
            isGameActive = false;
            gameStatus.innerText = "It's a tie";
        }
        if (checkWinner === null) {
            return;
        }
    };



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
            checkWinner();
            handleWinner(checkWinner());
            if (isGameActive) {
                changePlayer();
                computerMove();
            }
        }
    };

    const minimax = (board, depth, isMaximizing) => {
        let result = checkWinner();
        // if (result.winner !== null) {
        //     let score = scores[result.winner]
        //     return score;
        // }

        if (result.winner == "X") {
            return 10;
        } else if (result.winner == "O") {
            return -10;
        } else if (result.winner == "tie") {
            return 0;
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i in board) {
                // See is slot is empty
                if (board[i] == "") {
                    board[i] = humanPlayer;
                    let score = minimax(board, depth + 1, false);
                    board[i] = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i in board) {
                // See is slot is empty
                if (board[i] == "") {
                    board[i] = computer;
                    let score = minimax(board, depth + 1, true);
                    board[i] = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
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
    const bestSpot = (board) => {
        let bestVal = Infinity;
        let bestMove;
        for (let i in board) {
            if (board[i] == "") {
                board[i] = computer;
                let moveVal = minimax(board, 0, true); // 10, -10, 0
                board[i] = "";
                if (moveVal < bestVal) {
                    bestVal = moveVal;
                    bestMove = i;
                }
            }
        }
        return bestMove;
    };

    const computerMove = () => {
        setTimeout(() => {
            // const move = emptyCells()[Math.floor(Math.random() * emptyCells().length)];
            const move = bestSpot(board);
            board[move] = computer;
            tiles[move].innerText = computer;
            checkWinner();
            handleWinner(checkWinner());
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

    resetBtn.addEventListener("click", () => {
        isGameActive = true;
        currentPlayer = humanPlayer;

        tiles.forEach((tile) => {
            tile.innerText = "";
            tile.classList.remove("win");
        });
        board.forEach((element, index) => {
            board[index] = "";
        });
        gameStatus.innerHTML = `It's ${currentPlayer}'s turn`;
        scoreSheet[0] = 0;
        scoreSheet[1] = 0;
        playerXCounter.innerText = 0;
        playerOCounter.innerText = 0;
    });

    playAgainBtn.addEventListener("click", () => {
        isGameActive = true;
        currentPlayer = humanPlayer;
        tiles.forEach((tile) => {
            tile.innerText = "";
            tile.classList.remove("win");
        });
        board.forEach((element, index) => {
            board[index] = "";
        });
        gameStatus.innerHTML = `It's ${currentPlayer}'s turn`;
    });




};

app();