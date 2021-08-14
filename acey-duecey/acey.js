
const displayElem = document.getElementById('display')
const gameElem = document.getElementById('game')
let N = 100

let Q = 100

let A = 0

let B = 0

let A$ = ''

function print(str) { displayElem.textContent+=(str)+'\n' }

function convert(card) {
    switch (card) {
        case 11:
            return 'JACK';
        case 12:
            return 'QUEEN'
        case 13:
            return 'KING'
        case 14:
            return 'ACE'
        default:
            return "" + card;
    }
}

function ln260() {
    let x = Math.floor(Math.random() * 13) + 2
    return x
}
function intro(){
    print(`\t\t\t\t\tACEY DUCEY CARD GAME
\t\t\tCREATIVE COMPUTING  MORRISTOWN, NEW JERSEY\n\n
ACEY-DUCEY IS PLAYED IN THE FOLLOWING MANNER
THE DEALER (COMPUTER) DEALS TWO CARDS FACE UP
YOU HAVE AN OPTION TO BET OR NOT BET DEPENDING
ON WHETHER OR NOT YOU FEEL THE NEXT CARD WILL HAVE
A VALUE BETWEEN THE FIRST TWO.
IF YOU DO NOT WANT TO BET, INPUT A '0`)
}
function start() {


    print(`YOU NOW HAVE ${Q} DOLLARS.\n`)
    print('HERE ARE YOUR NEXT TWO CARDS:')
}

function readInput() { 
    return new Promise((resolve, reject) => {
        const inputElem = document.createElement('input')
        inputElem.setAttribute('type','text')
        gameElem.appendChild(inputElem)
        inputElem.focus()
        inputElem.addEventListener('keydown',event =>{
            if(event.key == 'Enter'){
                let userInput = inputElem.value
                print(userInput)
                gameElem.removeChild(inputElem)
                resolve(userInput)
            }
        })
    })
}

async function input() {
    let M;
    while (true) {
        print('WHAT IS YOUR BET')
        M = await readInput()
        if (M <= 0) {
            print('CHICKEN')
            return 0
        } else if (M > Q) {
            print(`'SORRY MY FRIEND, BUT YOU BET TOO MUCH'\n'YOU HAVE ONLY ${Q} DOLLARS TO BET.'`)
            continue
        } return M
    }
}

function turn(M) {
    let C = ln260()
    print(`The next card is: ${convert(C)}`)
    let x = parseInt(M)
    //console.log(M)
    //console.log(x)
    if (C <= A || C >= B) {
        print('SORRY, YOU LOSE')
        return Q - x
    } else {
        print('YOU WIN!!!')
        return Q + x
    }
}

function generateCards() {
    let x = ln260()
    let y = ln260()

    if (x > y) {
        A = y
        B = x
    } else {
        A = x
        B = y
    }

    print(convert(A))
    print(convert(B))
}

async function game() {
    intro()
    while (true) {
        start()
        generateCards()
        Q = turn(await input())
        if (Q <= 0) {
            print('SORRY, FRIEND, BUT YOU BLEW YOUR WAD.')
            print('TRY AGAIN (YES OR NO)')
            A$ = await readInput()
            if (A$ == 'YES') {
                Q = 100
                continue
            }
            print('O.K., HOPE YOU HAD FUN!')
            break
        }
    }
}
game()