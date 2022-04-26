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
 * Complete the 'climbingLeaderboard' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY ranked
 *  2. INTEGER_ARRAY player
 */

const condConsole = (cond, ...args) => {
    if (cond) {
        // console.log(...args);
    }
};

/**
 * @param {{score: number, higherRanks:number, lower: object, higher: object}} rootNode
 * @param {[number]} player
 */
function addRanks(rootNode, player) {
    const ranksArr = new Array(player.length).fill(0);
    // comparing with rootNode,
    // only when player's score is higher,
    // it should have feedback
    // if not, just save new rank
    let node;
    for (let index = 0; index < player.length; index++) {
        const score = player[index];
        const possibleIncrease = [];
        let newNodeAdded = false;
        let prevHigherRank = 0;
        node = rootNode;
        // console.log('player:', player[index]);
        while (true) {
            if (node.score === score) {
                ranksArr[index] = prevHigherRank + node.higherRanks + 1;

                break; // since the value is the same, no need to update the other nodes
            } else if (node.score < score) {
                if (node.higher) {
                    possibleIncrease.push(node);
                    node = node.higher;
                } else {
                    node.higher = {
                        score,
                        higherRanks: 0,
                        lower: null,
                        higher: null,
                    };
                    ranksArr[index] = prevHigherRank + 1;
                    node.higherRanks = 1;
                    newNodeAdded = true;
                    break;
                }
            } else {
                //(node.score > score)
                if (node.lower) {
                    prevHigherRank = prevHigherRank + 1 + node.higherRanks;
                    node = node.lower;
                    condConsole(score === 5, '==after change', prevHigherRank);
                } else {
                    node.lower = {
                        score,
                        higherRanks: 0,
                        parent: node,
                        lower: null,
                        higher: null,
                    };
                    ranksArr[index] = prevHigherRank + 1 + 1;
                    newNodeAdded = true;
                    break;
                }
            }
        }
        condConsole(score === 5, '======= end ======');
        // condConsole(possibleIncrease.length > 0, possibleIncrease.length);
        while (newNodeAdded && possibleIncrease.length > 0) {
            node = possibleIncrease.pop();
            node.higherRanks++;
        }
    }
    return ranksArr;
}

function climbingLeaderboard1(ranked, player) {
    // Write your code here

    //having binary tree,
    // from root,
    // if bigger than root,
    // have right node.
    // when right node is saved, give feedback
    // if there is already saved
    // if there is already same score, don't increase num of higher rank
    // when smaller than curr node
    // save numOfHigherRank + 1
    // go left node
    // if same as curr Node, rhe rank is numOfHigherRank + prevHigher + 1

    // starting from 0,
    const firstRank = ranked.shift();
    const rankNode = {
        score: firstRank,
        higherRanks: 0,
        parent: null,
        lower: null,
        higher: null,
    };
    addRanks(rankNode, ranked);
    const newRanks = addRanks(rankNode, player);

    return newRanks;

    //
}

class TensNode {
    /**
     *
     * @param {number} powerOfTen cannot be smaller than 1
     */
    constructor(powerOfTen) {
        this.mod = Math.pow(10, powerOfTen);
        this.nodes = powerOfTen === 1 ? null : Array(10).fill(null); //if powerOfTen is 1, value is 0~9
        this.counts = Array(10).fill(0); //if powerOfTen is 1, value is 0~9
        this.nodeCounts = Array(10).fill(0); //if powerOfTen is 1, value is 0~9
        this.powerOfTen = powerOfTen;
        this.totalCount = 0; // all children's node
        this.totalNodeCount = 0;
    }

    findBiggerNode(val) {
        const valStr = String(val % this.mod);
        let pos = valStr.length < this.powerOfTen ? 0 : parseInt(valStr[0]); // if valStr is 12 when powerOfTem is 2, it is 1
        let totalBigger = 0;

        if (this.powerOfTen === 1) {
            for (let i = 9; i > pos; i--) {
                totalBigger += this.counts[i] > 0 ? 1 : 0;
            }
            return totalBigger + 1;
        } else {
            for (let i = 9; i > pos; i--) {
                totalBigger += this.nodeCounts[i];
            }
            if (this.nodeCounts[pos]) {
                return totalBigger + this.nodes[pos].findBiggerNode(val);
            } else {
                return totalBigger + 1;
            }
        }
    }

    add(val) {
        const valStr = String(val % this.mod);
        let pos = valStr.length < this.powerOfTen ? 0 : parseInt(valStr[0]); // if valStr is 12 when powerOfTem is 2, it is 1
        // console.log({ val, power: this.powerOfTen, valStr, pos });
        let added = { nodes: false, count: false };

        if (this.powerOfTen === 1) {
            if (this.counts[pos] === 0) added.nodes = true;
            this.counts[pos]++;
            this.totalCount++;
            added.count = true;
        } else {
            if (this.nodes[pos] === null) {
                this.nodes[pos] = new TensNode(this.powerOfTen - 1);
            }
            try {
                added = this.nodes[pos].add(val);
            } catch (e) {
                console.log({ pos, val }, this.powerOfTen);
                // console.log('====> error!', this.nodes, { pos, val });
                throw e;
            }

            // console.log('val is added from child:', added);
            if (added.count) {
                this.counts[pos]++;
            }
            if (added.nodes) {
                this.nodeCounts[pos]++;
                this.totalNodeCount++;
            }
        }
        return added;
    }
}

class TensTree {
    constructor() {
        this.maxPower = 1;
        this.root = new TensNode(1);
    }

    addVal(val) {
        const valStr = String(val);
        while (this.maxPower < valStr.length) {
            this.maxPower++;
            const newRoot = new TensNode(this.maxPower);
            newRoot.nodes[0] = this.root;
            newRoot.counts[0] = this.root.totalCount;
            newRoot.nodeCounts[0] = this.root.totalNodeCount;
            this.root = newRoot;
        }
        this.root.add(val);
    }

    findRank(val) {
        const valStr = String(val);
        if (valStr.length > this.root.powerOfTen) {
            return 1; // bigger than the biggest
        } else return this.root.findBiggerNode(val);
    }
}

function climbingLeaderboard(ranked, player) {
    const tree = new TensTree();
    // console.log({ ranked });
    const arr = new Array(player.length).fill(0);
    for (let i = 0; i < ranked.length; i++) {
        tree.addVal(ranked[i]);
    }

    for (let i = 0; i < player.length; i++) {
        arr[i] = tree.findRank(player[i]);
        tree.addVal(player[i]);
    }
    // console.log('root', tree.root);
    // console.log('root>0', tree.root.nodes[0]);
    // console.log('root>0>0', tree.root.nodes[0].nodes[0]);
    // // console.log('root>0>0>0', tree.root.nodes[0].nodes[0].counts);
    // console.log(
    //     'root>0>0',
    //     tree.root.nodes[0].nodes[0].nodes[0].nodes[0].nodes[0].nodes[0].nodes[0]
    //         .nodes[0].counts
    // );

    return arr;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const rankedCount = parseInt(readLine().trim(), 10);

    let ranked = readLine()
        .replace(/\s+$/g, '')
        .split(' ')
        .map(rankedTemp => parseInt(rankedTemp, 10));

    const playerCount = parseInt(readLine().trim(), 10);
    // const aLine = readLine();
    const player = readLine()
        .replace(/\s+$/g, '')
        .split(' ')
        .map(playerTemp => parseInt(playerTemp, 10));
    // console.log({ playerCount, player });
    // ranked = [123, 4567];
    const result = climbingLeaderboard(ranked, player);
    // console.log({ result });
    ws.write(result.join('\n') + '\n');

    ws.end();
}
