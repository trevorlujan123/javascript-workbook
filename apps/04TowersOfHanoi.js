'use strict';

var assert = require('assert');
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var stacks = {
    a: [4, 3, 2, 1],
    b: [],
    c: []
};

function printStacks() {
    console.log("a: " + stacks.a);
    console.log("b: " + stacks.b);
    console.log("c: " + stacks.c);
}

function movePiece(startStack, endStack) {
    var block = stacks[startStack].pop();
    stacks[endStack].push(block);

}

function isLegal(startStack, endStack) {
    var startStackArray = stacks[startStack];
    var endStackArray = stacks[endStack];

    if (startStackArray.length === 0) {
        return false;
    } else if (endStackArray.length === 0) {
        return true;
    } else {
        return startStackArray[startStackArray.length - 1] < endStackArray[endStackArray.length - 1];
    }

}

function checkForWin() {
    // Your code here
    if (stacks.b.length === 4 || stacks.c.length === 4) {
        return true;
    }
    return false;
}

function towersOfHanoi(startStack, endStack) {
    // Your code here
    if ((startStack == 'b' || startStack == 'a' || startStack == 'c') && (endStack == 'a' || endStack == 'b' || endStack == 'c')){
        if (isLegal(startStack, endStack)) {
            movePiece(startStack, endStack);
        } else {
            console.log('Not Legal');
        }

        if (checkForWin()) {
            console.log("You Won!!!");
            process.exit();
        }

    } else {
        console.log("Wrong input!!!!");
    }



}

function getPrompt() {
    printStacks();
    rl.question('What tower would you like to remove a block from? "a", "b" or "c": ', (startStack) => {
        rl.question('What tower would you like to add a block to? "a", "b" or "c": ', (endStack) => {
            towersOfHanoi(startStack, endStack);
            getPrompt();
        });
    });
}

// Tests

if (typeof describe === 'function') {

    describe('#towersOfHanoi()', function() {
        it('should be able to move a block', function() {
            towersOfHanoi('a', 'b');
            assert.deepEqual(stacks, {
                a: [4, 3, 2],
                b: [1],
                c: []
            });
        });
    });

    describe('#isLegal()', function() {
        it('should not allow an illegal move', function() {
            stacks = {
                a: [4, 3, 2],
                b: [1],
                c: []
            };
            assert.equal(isLegal('a', 'b'), false);
        });
        it('should allow a legal move', function() {
            stacks = {
                a: [4, 3, 2, 1],
                b: [],
                c: []
            };
            assert.equal(isLegal('a', 'c'), true);
        });
    });
    describe('#checkForWin()', function() {
        it('should detect a win', function() {
            stacks = {
                a: [],
                b: [4, 3, 2, 1],
                c: []
            };
            assert.equal(checkForWin(), true);
            stacks = {
                a: [1],
                b: [4, 3, 2],
                c: []
            };
            assert.equal(checkForWin(), false);
        });
    });
} else {

    getPrompt();

}
