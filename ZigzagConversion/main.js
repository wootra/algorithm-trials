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

function zigzagConversion(text, rows) {
    const mat = [];
    for (let i = 0; i < rows; i++) {
        mat.push(Array(text.length).fill(''));
    }
    let x = 0,
        y = 0;
    let dir = 0; //0: down, 1: up-right
    for (let i = 0; i < text.length; i++) {
        mat[y][x] = text[i];
        // console.log('-->', text[i]);
        if (dir === 0) {
            if (y + 1 === rows) {
                dir = 1;
                y--;
                x++;
            } else {
                y++;
            }
        } else if (dir === 1) {
            if (y - 1 < 0) {
                dir = 0;
                y++;
            } else {
                y--;
                x++;
            }
        }
    }
    let txt = '';

    for (let i = 0; i < mat.length; i++) {
        consoleLog(mat[i].join(' '));
        txt += mat[i].join('');
    }
    return txt;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const fullText = readLine();

    const result = zigzagConversion(fullText, n);

    ws.write(result + '\n');

    ws.end();
}
