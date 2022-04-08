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

function findMaxSum(arr, i, maxVals) {
    if (i >= arr.length) return 0;
    if (maxVals[i] != null) return maxVals[i];
    let myVal = arr[i] > 0 ? arr[i] : 0;
    // if myVal <0, maxSum will be smaller.
    // so, only add it when it is positive.
    const max1 = myVal + findMaxSum(arr, i + 2, maxVals);
    const max2 = findMaxSum(arr, i + 1, maxVals);
    const maxVal = Math.max(0, Math.max(max1, max2));
    maxVals[i] = maxVal;

    return maxVal;
}

function sumNotConsequence1(arr) {
    // I'll use the saved value for the maxSum of partial area.
    // ex> maxSum when from 4, 3, 2, 1
    // when the smaller index should see the maxSum of later index,
    // it can take the saved value instead of calculating it again.

    const maxVals = {};

    // s is starting index
    let sum,
        maxSum = arr[arr.length - 1];
    maxVals[arr.length - 1] = arr[arr.length - 1] > 0 ? arr[arr.length - 1] : 0;
    for (let s = arr.length - 2; s >= 0; s--) {
        sum = findMaxSum(arr, s, maxVals);
        if (sum > maxSum) maxSum = sum;
    }
    const maxVal = Math.max(...arr);
    if (maxVal < 0) return maxVal;
    return maxSum;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);
    const arr = Array(n).fill(null);
    for (let i = 0; i < n; i++) {
        arr[i] = parseInt(readLine().trim(), 10);
    }
    console.time('time-elapsed');
    const result = sumNotConsequence1(arr);
    console.timeEnd('time-elapsed');
    ws.write(result + '\n');

    ws.end();
}
