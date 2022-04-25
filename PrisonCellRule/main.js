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
 * Complete the 'zigzagConversion' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING gene as parameter.
 */

const consoleLog = (...args) => {
    // console.log(...args);
};
/**
 * @param {number[]} cells
 * @param {number} n
 * @return {number[]}
 */

const convertBitsToArray = bits => {
    const rooms = Array(8).fill(0);
    for (let i = 0; i < 8; i++) {
        rooms[i] = (bits >> (8 - i - 1)) & 1;
    }
    return rooms;
};

const prisonAfterNDays = function (cells, n) {
    let bits = 0;
    for (let i = 0; i < 8; i++) {
        bits = (bits << 1) | cells[i];
    }
    let dayPassed = 0;
    // console.log('start',  JSON.stringify(rooms[0]));
    let today = bits;
    const saved = {};
    saved[bits] = 0;
    const savedOrder = [bits];
    let timetraveled = false;
    while (dayPassed < n) {
        // console.log((today << 1).toString(2), '^',  (today >>> 1).toString(2))
        today = ~((today << 1) ^ (today >>> 1)) & 126;

        dayPassed++;
        if (timetraveled === false) {
            if (saved[today] === undefined) {
                saved[today] = dayPassed;
                savedOrder.push(today);
            } else {
                const cycleSize = dayPassed - saved[today];
                n = (n - saved[today]) % cycleSize;
                return convertBitsToArray(
                    savedOrder[savedOrder.length - cycleSize + n]
                );
            }
        }

        // console.log(dayPassed, 'day', today.toString(2));//.toString(2))
    }

    return convertBitsToArray(today);
};

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const cellsStr = readLine().trim();
    const days = parseInt(readLine().trim());
    const cells = cellsStr.split(',').map(s => parseInt(s.trim()));

    console.time('time-elapsed');
    const result = prisonAfterNDays(cells, days);
    console.timeEnd('time-elapsed');
    ws.write(result + '\n');

    ws.end();
}
