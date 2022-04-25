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

function countTriplets(arr, r) {
    // the array is not sorted,
    // so counting total numbers doesn't work.
    // but when it find its *r and *r^2, then it means it has triplets.
    // the count will be added of countOfRTimes * countOfRSqTimes
    const map = {};
    const pairMap = {};
    let numOfTriplets = 0;
    for (let i = arr.length - 1; i >= 0; i--) {
        const num = arr[i];
        const rTimes = num * r;

        if (pairMap[rTimes]) {
            numOfTriplets += pairMap[rTimes];
        }

        if (map[rTimes]) {
            if (!pairMap[num]) {
                pairMap[num] = 0;
            }
            pairMap[num] += map[rTimes];
        }
        if (!map[num]) {
            map[num] = 0;
        }
        map[num]++;

        // console.log(map, numOfTriplets);
    }
    return numOfTriplets;
}

// Complete the countTriplets function below.
function countTriplets2(arr, r) {
    // iterate from arr until the first number which's mod r ===0
    const hashMap = {};
    let baseNums = new Set();
    let i;
    for (i = 0; i < arr.length; i++) {
        const num = arr[i];
        // if (num % r !== 0 || r === 1) {
        //     baseNums.add(num);
        // }
        baseNums.add(num);
        if (!hashMap[num]) hashMap[num] = 1;
        else hashMap[num]++;
    }
    const maxNum = Math.max(...baseNums);
    baseNums = [...baseNums]
        .filter(num => Math.pow(num, 2) <= maxNum)
        .sort((a, b) => a - b);

    // console.log({ maxNum });
    console.log({
        baseNums: baseNums,
        maxNum,
        arr,
        r,
        hashMap,
    });
    let countOfTriple = 0;
    const getCount = (tripleArr, index) => {
        return hashMap[tripleArr[index]] || 0;
    };
    // save count of the numbers. in hashMap.
    // contain maxNumber of the all numbers.
    // from all base numbers, create 3 numbers until finding max numbers,
    const handled = new Set();
    for (let baseNum of baseNums) {
        let pow = 0;
        let triples = [];
        if (handled.has(baseNum)) continue;
        console.log('baseNUm to handle:', baseNum);
        triples.push(baseNum * Math.pow(r, pow++));
        triples.push(baseNum * Math.pow(r, pow++));
        triples.push(baseNum * Math.pow(r, pow++));
        triples.forEach(val => handled.add(val));
        if (triples[0] === triples[2]) {
            const count = getCount(triples, 0);
            countOfTriple += (count * (count - 1) * (count - 2)) / (3 * 2);
        } else {
            if (triples[2] > maxNum)
                console.log('triple2 is bigger than maxNum', triples[2]);
            while (triples[2] <= maxNum) {
                countOfTriple +=
                    getCount(triples, 0) *
                    getCount(triples, 1) *
                    getCount(triples, 2);
                console.log(
                    triples[0],
                    triples[1],
                    triples[2],
                    '/',
                    getCount(triples, 0),
                    getCount(triples, 1),
                    getCount(triples, 2)
                );
                triples.shift(); //remove first
                triples.push(baseNum * Math.pow(r, pow++)); //new third
                handled.add(triples[2]);
            }
        }
    }
    return countOfTriple;
    // calculate total numbers based on numCount[0],numCount[1],numCount[2]
    // sum up all the possible triplets
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nr = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(nr[0], 10);

    const r = parseInt(nr[1], 10);

    const arr = readLine()
        .replace(/\s+$/g, '')
        .split(' ')
        .map(arrTemp => parseInt(arrTemp, 10));

    const ans = countTriplets(arr, r);

    ws.write(ans + '\n');

    ws.end();
}
