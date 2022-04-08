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

const consoleLog = (...args) => {
    // console.log(...args);
};

class Node {
    constructor(fileSize, parent) {
        this.fileSize = fileSize;
        this.parent = parent; //index
        this.children = []; //save children's index
        this.totalSize = fileSize;
    }
}

function fillParentTotal(nodes, parentIndex, fileSize) {
    if (parentIndex < 0) return;
    const parent = nodes[parentIndex];
    parent.totalSize += fileSize;
    fillParentTotal(nodes, parent.parent, fileSize);
}

function findMinDiff(nodes, topNodeIndex, minDiff, addOn) {
    const topNode = nodes[topNodeIndex];
    let diff, left, right, child;
    for (let i = 0; i < topNode.children.length; i++) {
        child = nodes[topNode.children[i]];
        left = child.totalSize;
        right = topNode.totalSize - left + addOn;
        diff = Math.abs(left - right);
        consoleLog({ left, right, diff, child });
        if (minDiff > diff) minDiff = diff;
        if (left > right) {
            diff = findMinDiff(nodes, topNode.children[i], minDiff, right);
            if (minDiff > diff) minDiff = diff;
        }
    }
    return minDiff;
}

function balancedPartition(parents, fileSize) {
    // make parents to Node Array
    // fill up totalSize of each node including children's size
    const nodes = [];
    let parentNode;
    for (let i = 0; i < parents.length; i++) {
        const node = new Node(fileSize[i], parents[i]);
        nodes.push(node);
        if (parents[i] >= 0) {
            parentNode = nodes[parents[i]];
            parentNode.children.push(i);
        }

        fillParentTotal(nodes, parents[i], fileSize[i]); //fill up parents recurrsively
    }
    consoleLog(nodes);
    // find the best cut giving current minDiff (top node's totalSize)
    // return minDiff
    let minDiff = nodes[0].totalSize;

    minDiff = findMinDiff(nodes, 0, minDiff, 0);
    return minDiff;
}

function main() {
    const t = parseInt(readLine().trim(), 10);
    const linesToRead = t * 2;

    const parents = [];
    const fileSize = [];

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);
        parents.push(n);
    }
    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);
        fileSize.push(n);
    }
    const result = balancedPartition(parents, fileSize);
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    ws.write(result + '\n');
    ws.end();
}
