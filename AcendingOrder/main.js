'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'gridChallenge' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING_ARRAY grid as parameter.
 */
const charMap = 'abcdefghijklmnopqrstuvwxyz';
const charToIndex = charMap
    .split('')
    .reduce((obj, c, index) => ((obj[c] = index), obj), {});

const consoleLog = (...args) => {
    // console.log(...args);
};

function gridChallenge(grid) {
    // Write your code here
    const queue = []; //[y,x]
    const handled = new Set();

    consoleLog(grid);
    if (grid.length === 1) return 'YES';

    queue.push([0, 0]);
    let lastPt, beforeChar, afterChar;
    while (queue.length > 0) {
        lastPt = queue.shift();
        consoleLog({ lastPt });
        beforeChar = grid[lastPt[0]][lastPt[1]];
        if (
            lastPt[0] < grid.length - 1 &&
            !handled.has(`${lastPt[0]}+1,${lastPt[1]}`)
        ) {
            afterChar = grid[lastPt[0] + 1][lastPt[1]];
            consoleLog(
                { beforeChar, afterChar },
                { lastPt, currPt: [lastPt[0] + 1, lastPt[1]] }
            );
            if (charToIndex[beforeChar] > charToIndex[afterChar]) return 'NO';
            queue.push([lastPt[0] + 1, lastPt[1]]);
            handled.add(`${lastPt[0]}+1,${lastPt[1]}`);
        }
        if (
            lastPt[1] < grid.length - 1 &&
            !handled.has(`${lastPt[0]},${lastPt[1] + 1}`)
        ) {
            afterChar = grid[lastPt[0]][lastPt[1] + 1];
            consoleLog(
                { beforeChar, afterChar },
                { lastPt, currPt: [lastPt[0], lastPt[1] + 1] }
            );
            if (charToIndex[beforeChar] > charToIndex[afterChar]) return 'NO';
            queue.push([lastPt[0], lastPt[1] + 1]);
            handled.add(`${lastPt[0]},${lastPt[1] + 1}`);
        }
    }
    return 'YES';
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        let grid = [];

        for (let i = 0; i < n; i++) {
            const gridItem = readLine();
            grid.push(gridItem);
        }

        const result = gridChallenge(grid);

        ws.write(result + '\n');
    }

    ws.end();
}
