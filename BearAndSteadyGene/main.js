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
 * Complete the 'steadyGene' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING gene as parameter.
 */

const consoleLog = (...args) => {
    // console.log(...args);
};

function steadyGene(gene) {
    let i, j, f;
    const totalLen = gene.length;
    // if the number of length % 4 != 0, then return 0 since there is no steady genes.
    if (totalLen % 4 != 0) return 0;

    // count all symbols' show count
    // count each symbols, and save it in 2D arr ex> [[0,1,0,0], [0, 1, 1, 0], [0, 2, 1, 0]] .. => countArr
    const showCounts = { A: 0, C: 0, T: 0, G: 0 };
    for (i = 0; i < totalLen; i++) {
        showCounts[gene[i]]++;
    }

    // each symbols should be shown gene.length/4 times => avgCount
    const avgCount = totalLen / 4;

    // make adjust count for each symbols comparing to avgCount
    // find substring which has +1A, +2C, -1G, -2T. -> adjCount
    // ex> A: +1, C: +2, G: -1, T: -2
    const adjCounts = {
        A: showCounts.A - avgCount,
        C: showCounts.C - avgCount,
        T: showCounts.T - avgCount,
        G: showCounts.G - avgCount,
    };
    consoleLog({ adjCounts, avgCount });

    // count only exceeding factors to be reduced
    const factorsToChange = Object.keys(adjCounts).filter(
        k => adjCounts[k] > 0
    );
    const minGrpLen = factorsToChange.reduce((t, v) => t + adjCounts[v], 0);

    // contains min size of matching substring. if min==0, update min size
    // so return 0 if cannot find any
    let minSize = 0;
    // tolerence is given as end-start%4 since they are extra length

    const search = { A: 0, C: 0, T: 0, G: 0 };
    const isFound = () => {
        // if cannot find any of lower number,
        // it is the candidate
        return !factorsToChange.find(f => search[f] < adjCounts[f]);
    };

    //pre-process. saving min group
    for (i = 0; i < minGrpLen; i++) {
        search[gene[i]]++;
    }
    if (isFound()) {
        return minGrpLen;
    }

    // with window moving, find num of factorsToChange
    // when finding the right condition, make the sample size smaller.
    // when not finding the right condition, increase the sample size.
    i = 0;
    j = i + minGrpLen - 1;
    while (true) {
        if (!isFound()) {
            j++;
            if (j >= totalLen) break;

            search[gene[j]]++; //increasing sample
            if (minSize !== 0 && j - i + 1 > minSize) {
                i++;
                //if minSize is already smaller than this boundary,
                //do not need to find another bigger answer
            }
        } else {
            if (minSize === 0) minSize = j - i + 1;
            else minSize = Math.min(minSize, j - i + 1);
            if (minSize === minGrpLen) return minGrpLen;
            search[gene[i]]--;
            i++;
        }
    }

    return minSize;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const gene = readLine();

    const result = steadyGene(gene);

    ws.write(result + '\n');

    ws.end();
}
