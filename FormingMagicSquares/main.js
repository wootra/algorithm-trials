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
 * Complete the 'formingMagicSquare' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY s as parameter.
 */

function consoleLog(...args) {
    // console.log(...args);
}
const rot90 = (x, y) => ({ x: y * 1, y: x * -1 });

function rotate(mat, multiple90) {
    const matLen = mat.length;
    let newMat = [];
    for (let x = 0; x < matLen; x++) {
        newMat.push(Array(matLen).fill(0));
    }
    const center = Math.floor(mat.length / 2);
    let nx, ny, nx1, ny1, ca;
    for (let y = 0; y <= 2; y++) {
        for (let x = 0; x <= 2; x++) {
            nx = x - center;
            ny = y - center;

            const { x: xo, y: yo } = rot90(nx, ny);
            nx1 = xo + center;
            ny1 = yo + center;
            // consoleLog({x,y,nx1,ny1, center,angle, ca});
            newMat[ny1][nx1] = mat[y][x];
        }
    }
    newMat[center][center] = mat[center][center];
    if (multiple90 > 1) newMat = rotate(newMat, multiple90 - 1);
    return newMat;
}

function flip(mat, xFlip, yFlip) {
    const matLen = mat.length;
    const newMat = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
    // for (let x = 0; x < matLen; x++) {
    //     newMat.push(Array(matLen).fill(0));
    // }
    const center = Math.floor(mat.length / 2);
    let nx, ny;
    for (let y = 0; y <= 2; y++) {
        for (let x = 0; x <= 2; x++) {
            nx = x - center;
            ny = y - center;
            // consoleLog({x,y,nx,ny, center, xFlip, yFlip});
            if (xFlip) {
                nx = -nx;
            }
            if (yFlip) {
                ny = -ny;
            }
            nx += center;
            ny += center;
            // consoleLog({x,y,nx,ny, center, xFlip, yFlip});
            newMat[ny][nx] = mat[y][x];
        }
    }
    return newMat;
}

function swap(mat, x, y, x1, y1) {
    const org = mat[y][x];
    mat[y][x] = mat[y1][x1];
    mat[y1][x1] = org;
}

function flipDiag(mat, leftTop) {
    const matLen = mat.length;
    const newMat = [[...mat[0]], [...mat[1]], [...mat[2]]];

    if (leftTop) {
        swap(newMat, 0, 0, 2, 2);
        swap(newMat, 1, 0, 2, 1);
        swap(newMat, 0, 1, 1, 2);
    } else {
        swap(newMat, 2, 0, 0, 2);
        swap(newMat, 1, 0, 0, 1);
        swap(newMat, 2, 1, 1, 2);
    }

    return newMat;
}

function getDiff(m1, m2) {
    const matLen = m1.length;
    let diffSize = 0;
    for (let y = 0; y <= 2; y++) {
        for (let x = 0; x <= 2; x++) {
            if (m1[y][x] !== m2[y][x])
                diffSize += Math.abs(m1[y][x] - m2[y][x]);
        }
    }
    return diffSize;
}

const magicSquares = [];
const magicSquare = [
    [6, 1, 8],
    [7, 5, 3],
    [2, 9, 4],
];

function formingMagicSquare(s) {
    let minDiff = 45;
    for (let m of magicSquares) {
        const diff = getDiff(m, s);
        if (diff < minDiff) minDiff = diff;
        consoleLog('===== diff:' + diff);
        for (let y = 0; y < 3; y++) {
            consoleLog(m[y]);
        }
        consoleLog('======');
    }
    return minDiff;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let s = Array(3);

    for (let i = 0; i < 3; i++) {
        s[i] = readLine()
            .replace(/\s+$/g, '')
            .split(' ')
            .map(sTemp => parseInt(sTemp, 10));
    }

    const angles = [1, 2, 3];
    magicSquares.push(magicSquare);
    for (let a of angles) {
        magicSquares.push(rotate(magicSquare, a));
    }
    magicSquares.push(flip(magicSquare, true, false));
    magicSquares.push(flip(magicSquare, false, true));
    // magicSquares.push(flip(magicSquare, true, true));
    magicSquares.push(flipDiag(magicSquare, true));
    magicSquares.push(flipDiag(magicSquare, false));

    const result = formingMagicSquare(s);

    ws.write(result + '\n');

    ws.end();
}
