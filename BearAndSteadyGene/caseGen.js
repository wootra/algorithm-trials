const { randomInt } = require('crypto');
const fs = require('fs');
function main() {
    if (process.argv.length < 3) {
        console.log('=================');
        console.log(
            'you can create unsteady genes by modifying this gene sets'
        );
        console.log('to create 5 sets of genes(steadyGenes)');
        console.log('=================');
        console.log('');
        console.log('usage: node caseGen.js 5 [caseNo]');
        console.log('');
        console.log(
            'then it will generate 5x4 length of string which contains AGTC randomly with same size(5)'
        );
        return;
    }
    const caseNo = process.argv.length > 3 && process.argv[3];
    const len = process.argv[2];

    let geneSetArr = [];
    const totalLen = len * 4;
    const poolSize = Array(4).fill(len);
    const symbols = 'AGCT';

    let pt = 0;
    while (geneSetArr.length < totalLen) {
        let move = randomInt(3) + 1;

        while (move > 0) {
            pt = (pt + 1) % 4;
            if (poolSize[pt] > 0) {
                move--;
            }
        }
        geneSetArr.push(symbols[pt]);
        poolSize[pt]--;
    }
    const geneSet = geneSetArr.join('');
    //fill index

    console.log('gene is created:');
    console.log(geneSet);
    console.log('');
    console.log('finished');
    console.log('');

    if (caseNo) {
        fs.writeFileSync('./cases/case' + caseNo, totalLen + '\n' + geneSet);
        console.log('./cases/case' + caseNo + ' is created');
    }
}
main();
