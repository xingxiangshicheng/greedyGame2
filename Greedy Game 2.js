var input = require('readline-sync');

class Player {
    constructor(number) {
        this.number = number;
        this.wallet = 0;
    }

    poolMoney(amt) {
        this.wallet -= amt;
    }

    receivePool(amt) {
        this.wallet += amt;
    }
}

var P1 = new Player(1);
var P2 = new Player(2);
var P3 = new Player(3);
var P4 = new Player(4);
var playerList = [P1, P2, P3, P4];

function giveMoney(amt) {
    for (var i = 0; i < playerList.length; i++) {
        playerList[i].receivePool(amt);
    }
}

function splitMoneyBack(amt) {
    amt *= 2;
    for (var i = 0; i < playerList.length; i++) {
        playerList[i].receivePool(amt / playerList.length);
    }
}

function getPoolAmount() {
    var poolAmount = 0;
    for (i = 0; i < playerList.length; i++) {
        do {
            playerInput = input.question(`Player ${playerList[i].number}, how much do you wish to pool: `);
            var intInput = parseInt(playerInput);
            var playerLeftover = playerList[i].wallet;

        } while (isNaN(parseInt(playerInput)) || intInput < 0 || intInput > playerLeftover);
        playerList[i].poolMoney(intInput);
        poolAmount += intInput;
    }
    return poolAmount;
}

var round = 1;
giveMoney(100);
do {
    console.log(`Round ${round}`);
    var getPoolAmt = getPoolAmount();
    splitMoneyBack(getPoolAmt);
    round++;
    console.log(`\nCurrent money level of all the player:`)
    for (i = 0; i < playerList.length; i++) {
        console.log(`Player ${i + 1} has $${playerList[i].wallet}`);
    }
    console.log('\n');
} while (round <= 3);