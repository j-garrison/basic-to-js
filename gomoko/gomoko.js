
const displayElem = document.getElementById('display')

const gameElem = document.getElementById('game')

function readInput() {
    return new Promise((resolve, reject) => {
        const inputElem = document.createElement('input')
        inputElem.setAttribute('type', 'text')
        gameElem.appendChild(inputElem)
        inputElem.focus()
        inputElem.addEventListener('keydown', event => {
            if (event.key == 'Enter') {
                let userInput = inputElem.value
                print(userInput)
                gameElem.removeChild(inputElem)
                resolve(userInput)
            }
        })
    })
}

function print(str) {
    displayElem.textContent += (str) + '\n'
}

function intro() {
    print(`\n\n\n\n\n\n\n\n\n\nGomoko`)
    print(`\n\n\n\n\nCreative Computing  Morristown, New Jersey\n\n\n`)
    print(`Welcome to the oriental game of Gomoko\n\n`)
    print(`The game is played on an N by N grid of a size
that you specify. During your play, you may cover one grid
intersection with a marker. The object of the game is to get 
5 adjacent markers in a row -- horizontally, vertically, or
diagonally. On the board diagram, your moves are marked
with a '1' and the computer moves with a '2'.\n\n
The computer does not keep track of who has won.
To end the game, type -1, 1- for your move.\n `)
}

async function boardInput() {
    let M;
    while (true) {
        print('What is your board size (min 7 / max 19)')
        M = await readInput()
        if (M < 7 || M > 19) {
            print('I said, the minimum is 7, the maximum is 19.')
            continue
        } return boardBuild(M)
    }
}

function boardBuild(x) {
    let A = []
    for (let i = 1; i <= x; i++) {
        A[i] = []
        for (let y = 1; y <= x; y++) {
            A[i][y] = 0
        }
    } return A
}

async function playerMove(board) {
    print('\n, We alternate moves. You go first...\n Your play (I,J)')
    let x = await readInput()
    let y = x.split(',')
    let I = parseInt(y[0])
    let J = parseInt(y[1])
    if (I == -1) {
        return [I, J]
    } else {
        while (!validation([I, J], board) || board[I][J] !== 0) {
            print('Illegal move. Try again...')
            x = await readInput()
            y = x.split(',')
            I = parseInt(y[0])
            J = parseInt(y[1])
        } return [I, J]

    }
}

//410 IF A(I, J) = 0 THEN 440
//420 PRINT "SQUARE OCCUPIED.  TRY AGAIN...": GOTO 310
//440 A(I, J) = 1


function computerMove(board, move) {
    for (let E = -1; E < 2; E++) {
        for (let F = -1; F < 2; F++) {
            if (E + F - (E * F) == 0) {
                continue
            }
            else {
                let X = move[0] + F
                let Y = move[1] + F
                if (!validation([X, Y], board)) {
                    continue
                }
                if (board[X][Y] == 1) {
                    X = move[0] - E
                    Y = move[1] - F
                    if (!validation([X, Y], board) || board[X][Y != 0]) {
                        return randomMove(board)
                    }
                    return [X, Y]
                }
            }
        }
    }
    return randomMove(board)
}

function randomMove(board) {
    let X, Y
    do {
        X = Math.floor(board.length * Math.random()) + 1
        Y = Math.floor(board.length * Math.random()) + 1
    } while (!validation([X, Y], board) || board[X][Y] != 0)
    return [X,Y]
}

//500 REM *** COMPUTER TRIES AN INTELLIGENT MOVE ***
//510 FOR E = -1 TO 1: FOR F = -1 TO 1: IF E + F - E * F=0 THEN 590
//540 X = I + F: Y = J + F: GOSUB 910
//570 IF L = 0 THEN 590
//580 IF A(X, Y) = 1 THEN 710
//590 NEXT F: NEXT E
//600 REM *** COMPUTER TRIES A RANDOM MOVE ***
//610 X = INT(N * RND(1) + 1): Y = INT(N * RND(1) + 1): GOSUB 910: IF L = 0 THEN 610
//650 IF A(X, Y) <> 0 THEN 610
//660 A(X, Y) = 2: GOSUB 810: GOTO 310
//710 X = I - E: Y = J - F: GOSUB 910
//750 IF L = 0 THEN 610
//760 GOTO 650


function boardprint(board) {
    let boardString = ''
    for (let I = 1; I < board.length; I++) {
        boardString += ('\n')
        for (let J = 1; J < board.length; J++) {
            boardString += (`${board[I][J]}`)
        }
    } print(`${boardString}`)
}


function validation(move, board) {
    let X = move[0]
    let Y = move[1]
    return !(X < 1 || X >= board.length || Y < 1 || Y >= board.length)
}


async function game() {
    intro()
    let boardGame = await boardInput()

    while (true) {
        let moveValue = await playerMove(boardGame)
        if (moveValue[0] == -1) {
            break
        }
        boardGame[moveValue[0]][moveValue[1]] = 1
        let compMove = computerMove(boardGame, moveValue)
        boardGame[compMove[0]][compMove[1]] = 2
        boardprint(boardGame)
    }
}
game()