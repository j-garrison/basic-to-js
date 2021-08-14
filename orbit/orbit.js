const displayElem = document.getElementById('display')

const gameElem = document.getElementById('game')

const tab = cnt => " ".repeat(cnt)

function print(str) { displayElem.textContent += (str) + '\n' }

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

async function readValidInput(S, fn) {
    let W
    do {
        print(S)
        W = parseInt(await readInput())
    } while (fn(W))
    return W
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

function intro() {
    print(`${tab(33)}Orbit
${tab(15)}CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY \n\n\n
SOMEWHERE ABOVE YOUR PLANET IS A ROMULAN SHIP.\n
THE SHIP IS IN A CONSTANT POLAR ORBIT.  ITS
DISTANCE FROM THE CENTER OF YOUR PLANET IS FROM
10,000 TO 30,000 MILES AND AT ITS PRESENT VELOCITY CAN
CIRCLE YOUR PLANET ONCE EVERY 12 TO 36 HOURS.\n
UNFORTUNATELY, THEY ARE USING A CLOAKING DEVICE SO
YOU ARE UNABLE TO SEE THEM, BUT WITH A SPECIAL
INSTRUMENT YOU CAN TELL HOW NEAR THEIR SHIP YOUR
PHOTON BOMB EXPLODED.  YOU HAVE SEVEN HOURS UNTIL THEY
HAVE BUILT UP SUFFICIENT POWER IN ORDER TO ESCAPE
YOUR PLANET'S GRAVITY.\n
YOUR PLANET HAS ENOUGH POWER TO FIRE ONE BOMB AN HOUR.\n
AT THE BEGINNING OF EACH HOUR YOU WILL BE ASKED TO GIVE AN
ANGLE (BETWEEN 0 AND 360) AND A DISTANCE IN UNITS OF
100 MILES (BETWEEN 100 AND 300), AFTER WHICH YOUR BOMB'S
DISTANCE FROM THE ENEMY SHIP WILL BE GIVEN.\n
AN EXPLOSION WITHIN 5,000 MILES OF THE ROMULAN SHIP
WILL DESTROY IT.\n
BELOW IS A DIAGRAM TO HELP YOU VISUALIZE YOUR PLIGHT.\n\n
                          90
                    0000000000000
                 0000000000000000000
               000000           000000
             00000                 00000
            00000    XXXXXXXXXXX    00000
           00000    XXXXXXXXXXXXX    00000
          0000     XXXXXXXXXXXXXXX     0000
         0000     XXXXXXXXXXXXXXXXX     0000
        0000     XXXXXXXXXXXXXXXXXXX     0000
180<== 00000     XXXXXXXXXXXXXXXXXXX     00000 ==>0
        0000     XXXXXXXXXXXXXXXXXXX     0000
         0000     XXXXXXXXXXXXXXXXX     0000
          0000     XXXXXXXXXXXXXXX     0000
           00000    XXXXXXXXXXXXX    00000
            00000    XXXXXXXXXXX    00000
             00000                 00000
               000000           000000
                 0000000000000000000
                    0000000000000
                         270\n
X - YOUR PLANET
O - THE ORBIT OF THE ROMULAN SHIP\n
ON THE ABOVE DIAGRAM, THE ROMULAN SHIP IS CIRCLING
COUNTERCLOCKWISE AROUND YOUR PLANET.  DON'T FORGET THAT
WITHOUT SUFFICIENT POWER THE ROMULAN SHIP'S ALTITUDE
AND ORBITAL RATE WILL REMAIN CONSTANT.\n
GOOD LUCK.  THE FEDERATION IS COUNTING ON YOU.`)
}

async function gameLoop() {
    let A = Math.floor(360 * Math.random())
    let D = Math.floor(200 * Math.random() + 200)
    let R = Math.floor(20 * Math.random() + 10)
    console.log(`A ${A} R ${R} Angle ${A + R} Distance${D}`)
    for (let H = 1; H < 7; H++) {
        let A1 = await readValidInput(`\n\nTHIS IS HOUR ${H}, AT WHAT ANGLE DO YOU WISH TO SEND \nYOUR PHOTON BOMB`, O => !(typeof O == 'number' && isFinite(O)))
        let D1 = await readValidInput(`HOW FAR OUT DO YOU WISH TO DETONATE IT`, P => !(typeof P == 'number' && isFinite(P)))
        print(`\n\n`)
        A = A + R
        if (A >= 360) {
            A -= 360
        }
        let T = Math.abs(A - A1)
        if (T >= 180) {
            T = 360 - T
        }
        let C = Math.sqrt(D * D + D1 * D1 - 2 * D * D1 * Math.cos(T * Math.PI / 180))
        print(`YOUR PHOTON BOMB EXPLODED ${C} *10^2 MILES FROM THE ROMULAN SHIP.`)
        if (C <= 50) {
            print('YOU HAVE SUCCESFULLY COMPLETED YOUR MISSION.')
            return
        }
    }
    print(`YOU HAVE ALLOWED THE ROMULANS TO ESCAPE.`)
}

async function game() {
    await intro()
    while (true) {
        await gameLoop()
        print(`ANOTHER ROMULAN SHIP HAS GONE INTO ORBIT.\nDO YOU WISH TO TRY TO DESTROY IT\n`)
        if (!(await yesNoInput())) {
            print(`Good bye.`)
            break
        }
    }
}

game()
