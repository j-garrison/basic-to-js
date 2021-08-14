const displayElem = document.getElementById('display')

const gameElem = document.getElementById('game')
const tab = cnt => " ".repeat(cnt)
function print(str) { displayElem.textContent += (str) + '\n' }

function ln_1570(A) {
    //1570 LET Z=0
    let Z = 0
    //1580 FOR I=1 TO N
    for (let I = 1; I <= A.length -1; I++) {
        //1590 IF A(I)=0 THEN 1610
        if (A[I] = 0) {
            continue
        }
        return false
        //1600 RETURN
        //1610 NEXT I
    }
    return true
    //1620 LET Z=1
    //1630 RETURN
}

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

function lower(x) {
    return x.toLowerCase()
}

async function yesNoInput() {
    let Z$
    do {
        print(`Please answer yes or no`)
        Z$ = lower(await readInput())
    } while (Z$ != 'yes' && Z$ != 'no')
    return Z$ == 'yes'
}

async function intro() {
    print(`${tab(33)}"NIM"
${tab(15)}"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"\n\n\n
"THIS IS THE GAME OF NIM."
"DO YOU WANT INSTRUCTIONS"`)
    if (await yesNoInput()) {
        print(`THE GAME IS PLAYED WITH A NUMBER OF PILES OF OBJECTS.
ANY NUMBER OF OBJECTS ARE REMOVED FROM ONE PILE BY YOU AND
THE MACHINE ALTERNATELY.  ON YOUR TURN, YOU MAY TAKE
ALL THE OBJECTS THAT REMAIN IN ANY PILE, BUT YOU MUST
TAKE AT LEAST ONE OBJECT, AND YOU MAY TAKE OBJECTS FROM
ONLY ONE PILE ON A SINGLE TURN.  YOU MUST SPECIFY WHETHER
WINNING IS DEFINED AS TAKING OR NOT TAKING THE LAST OBJECT,
THE NUMBER OF PILES IN THE GAME, AND HOW MANY OBJECTS ARE
ORIGINALLY IN EACH PILE.  EACH PILE MAY CONTAIN A
DIFFERENT NUMBER OF OBJECTS.
THE MACHINE WILL SHOW ITS MOVE BY LISTING EACH PILE AND THE
NUMBER OF OBJECTS REMAINING IN THE PILES AFTER  EACH OF ITS
MOVES.\n`)
    }
}

async function readValidInput(S, fn) {
    let W
    do {
        print(S)
        W = parseInt(await readInput())
    } while (fn(W))
    return W
}

async function boardSetup(N) {
    let A = []
    for (let i = 1; i <= N; i++) {
        let C$ = `Enter pile ${i} size`
        A[i] = await readValidInput(C$, w => w > 2000 || w < 1)

    } return A
}

async function setOrder(A) {
    print(`Do you want to move first`)
    if (await yesNoInput()) {
        await playerMove(A)
    }
}

function compMove(W, N, A) {
    let B = []
    let D = []

    function ln_1190(G){
        // 1190 LET A(G)=0
        A[G] = 0
        // 1200 FOR J=0 TO 10
        let
        for (let J = 0; J <= 10; J++) {
            // 1210 LET B(G,J)=0
            // 1220 LET C=0
            B[G][J] = 0
            C = 0
            // 1230 FOR I=1 TO N
            for (let i = 1; i <= N; i++) {//1230
                // 1240 IF B(I,J)=0 THEN 1260
                if (B[i][J] = 0) {
                    continue
                }
                // 1250 LET C=C+1
                C += 1
                // 1260 NEXT I
            }
            // 1270 LET A(G)=A(G)+2*(C/2-INT(C/2))*2^J
            A[G] = A[G] + 2 * (C / 2 - (Math.floor(C / 2)) * Math.pow(2, J))
            // 1280 NEXT J
        }
        // 1290 IF W=1 THEN 1380
        if (W == 1) {//1290

        }
        ln_1300(G)
        // 1420 IF W=2 THEN 1450
        if (W == 2) {
            // 1430 GOSUB 1570
            if (ln_1570(A)) {
                print(`Machine Wins`)
            }
        }
        // 1440 IF Z=1 THEN 820
    }

    function ln_1380() {
        // 1380 PRINT "PILE  SIZE"
        print(`Pile size`)
        // 1390 FOR I=1 TO N
        for (let i = 1; i <= N; i++) {
            // 1400 PRINT I;A(I)
            print(`${i}; ${A[i]}`)
            // 1410 NEXT I
        }
    }
    function ln_1300(G) {
        // 1300 LET C=0
        let C = 0
        // 1310 FOR I=1 TO N
        for (let I = 1; I <= N; I++) {
            // 1320 IF A(I)>1 THEN 1380
            if (A[I] > 1) {

                ln_1380()

                return
            }
            // 1330 IF A(I)=0 THEN 1350
            if (A[I] = 0) {
                continue
            }
            // 1340 LET C=C+1
            C += 1
            // 1350 NEXT I
        }
        // 1360 IF C/2<>INT(C/2) THEN 1380
        if (C / 2 != (Math.floor(C / 2))) {
            ln_1380()
        }
        // 1370 LET A(G)=1-A(G)
        A[G] = 1 - A[G]
    }
    // 700 IF W=1 THEN 940
    if (W != 1) {
        // 710 LET C = 0
        // 720 FOR I = 1 TO N
        // 730 IF A(I) = 0 THEN 770
        // 740 LET C = C + 1
        // 750 IF C = 3 THEN 840
        // 760 LET D(C) = I
        // 770 NEXT I

        // 780 IF C = 2 THEN 920
        // 790 IF A(D(1)) > 1 THEN 820

        // 800 PRINT "MACHINE LOSES"
        // 810 GOTO 1640

        // 820 PRINT "MACHINE WINS"
        // 830 GOTO 1640

        // 840 LET C = 0
        // 850 FOR I = 1 TO N
        // 860 IF A(I) > 1 THEN 940
        // 870 IF A(I) = 0 THEN 890
        // 880 LET C = C + 1
        // 890 NEXT I
        // 900 IF C / 2 <> INT(C / 2) THEN 800
        // 910 GOTO 940

        // 920 IF A(D(1)) = 1 THEN 820
        // 930 IF A(D(2)) = 1 THEN 820
    }

    // 940 FOR I=1 TO N
    for (let i = 1; i <= N; i++) {
        // 950 LET E=A(I)
        let E = A[i]
        B[i] = []
        // 960 FOR J=0 TO 10
        for (let J = 0; J <= 10; J++) {
            // 970 LET F=E/2
            // 980 LET B(I,J)=2*(F-INT(F))
            // 990 LET E=INT(F)
            let F = E / 2
            B[i][J] = 2 * (F - Math.floor(F))
            E = Math.floor(F)
            // 1000 NEXT J
            // 1010 NEXT I
        }
    }
    // 1020 FOR J=10 TO 0 STEP -1
    for (let J = 10; J >= 0; J--) {
        // 1030 LET C=0
        // 1040 LET H=0
        let C = 0
        let H = 0
        let G
        // 1050 FOR I=1 TO N
        for (let i = 1; i <= N; i++) {
            // 1060 IF B(I,J)=0 THEN 1110
            if (typeof B[i] != 'undefined') {
                if (B[i][J] = 0) {
                    continue
                }
            }
            // 1070 LET C=C+1
            C += 1
            // 1080 IF A(I)<=H THEN 1110
            if (A[i] <= H) {
                continue
            }
            // 1090 LET H=A(I)
            // 1100 LET G=I
            H = A[i]
            G = i
            // 1110 NEXT I
        }

        // 1120 IF C/2<>INT(C/2) THEN 1190
        if (C / 2 != (Math.floor(C / 2))) {return ln_1190(G)}
        // 1130 NEXT J
    }

    // 1140 LET E=INT(N*RND(1)+1)
    // 1150 IF A(E)=0 THEN 1140
    let E
    do E = Math.floor(N * Math.random() + 1)
    while (A[E] = 0) 
    // 1160 LET F=INT(A(E)*RND(1)+1)
    let F = Math.floor(A[E] * Math.random() + 1)
    // 1170 LET A(E)=A(E)-F
    A[E] = A[E] - F
    // 1180 GOTO 1380

    return W == 1 && ln_1570(A)
}

async function playerMove(A) {
    // 1450 PRINT "YOUR MOVE - PILE, NUMBER TO BE REMOVED";
    let D$ = `Your move - What pile do you want to take from`
    let E$ = `How many would you like to take?`
    // 1460 INPUT X, Y
    // 1470 IF X > N THEN 1450
    // 1480 IF X < 1 THEN 1450
    // 1490 IF X <> INT(X) THEN 1450
    // 1500 IF Y > A(X) THEN 1450
    // 1510 IF Y < 1 THEN 1450
    // 1520 IF Y <> INT(Y) THEN 1450
    X = await readValidInput(D$, w => w > A.length-1 || w < 1)
    console.log('me')
    Y = await readValidInput(E$, w => w > A[X] || w < 1)
    // 1530 LET A(X) = A(X) - Y
    A[X] -= Y
    return ln_1570(A)
    // 1540 GOSUB 1570
    // 1550 IF Z = 1 THEN 800
    // 1560 GOTO 700
    // 1570 LET Z = 0
    // 1580 FOR I = 1 TO N
    // 1590 IF A(I) = 0 THEN 1610
    // 1600 RETURN
    // 1610 NEXT I
    // 1620 LET Z = 1
    // 1630 RETURN
}
// 1640 PRINT "do you want to play another game";
// 1650 INPUT Q9$
// 1660 IF Q9$ = "YES" THEN 1720
// 1670 IF Q9$ = "yes" THEN 1720
// 1680 IF Q9$ = "NO" THEN 1730
// 1690 IF Q9$ = "no" THEN 1730
// 1700 PRINT "PLEASE.  YES OR NO."
// 1710 GOTO 1650
// 1720 GOTO 440
// 1730 END

async function game() {
    await intro()
    let A$ = "Enter win option 1 to take last, 2 to avoid last"
    let B$ = "Enter number of piles"
    //let C$ = "Enter pile sizes"
    let winCondition = await readValidInput(A$, w => w != 1 && w != 2)
    let numberOfPiles = await readValidInput(B$, w => w < 1 || w > 100)
    //let X = await readValidInput(C$, w => w > 2000 || w < 1)
    let board = await boardSetup(numberOfPiles)
    await setOrder(board)
    while (true) {
        compMove(winCondition, numberOfPiles, board)
        await playerMove(board)
    }
}
game()
