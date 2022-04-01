# Bear and Steady Gene algorithm

the question is [here](Question.html)
this algorithm's core solution (IMO) is,

1. count all the gene's factors
2. find what factor is exceeding, what is not based on the n/4
3. use sliding window algorithm to find only right numbers or more numbers of exceeding factors.
    1. for example, if A and T is exeeding 3 and 2, the sliding window size cannot be smaller than 5.

## filter out invalid length

if the total count is not multiple of 4, it will never be valid. so let's filter it out

```js
const totalLen = gene.length;
// if the number of length % 4 != 0, then return 0 since there is no steady genes.
if (totalLen % 4 != 0) return 0;
```

## count all the gene's factors

```js
const showCounts = { A: 0, C: 0, T: 0, G: 0 };
for (i = 0; i < totalLen; i++) {
    showCounts[gene[i]]++;
}
```

gene is the total gene map looks like AGGGTCC..
so, the loop will increase the total shown count of each factors

## count what factor is exceeding

```js
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
```

## find the substring which contains exceeding factors

now it is fun part. we should find what was exceeding to convert them to the others. But not the opposite way, because when we remove some exceeding factors, then we have empty spaces to fill up, but not otherwise.

ex> A: +1, C: +2, G: -1, T: -2

```txt
AAAACC --> OK. they can be converted to have 1G, 2T
CGGTTAAAA -> not OK. need one more room to convert 2C to G or T
```

so what we have to find is just 1A and 2C.

to find them, we will have a window from the all source, and we will increase end index(j) until find the correct numbers of exceeding factors.

once we find it, then we will reduce the size to find minimum length of samples by increasing starting index(i).

and we keep the minimum size of the window. we don't need to find bigger number of the window since the solution requires the min numbers.

in below logic, I didn't limit the min size of window yet.
(FYI). but it can be optimized even more by limiting the window size.

```js
// count only exceeding factors to be reduced
const factorsToChange = Object.keys(adjCounts).filter(k => adjCounts[k] > 0);
const minGrpLen = factorsToChange.length;

// contains min size of matching substring. if min==0, update min size
// so return 0 if cannot find any
let minSize = 0;
// tolerence is given as end-start%4 since they are extra length

const search = { A: 0, C: 0, T: 0, G: 0 };
let len = factorsToChange;
const isFound = () => {
    // if cannot find any of lower number,
    // it is the candidate
    return !factorsToChange.find(f => search[f] < adjCounts[f]);
};

//pre-process. saving min group
for (i = 0; i < minGrpLen; i++) {
    search[gene[i]]++;
}

consoleLog({ search, factorsToChange });
// with window moving, find num of factorsToChange
for (i = 0, j = minGrpLen; i < totalLen - minGrpLen, j < totalLen; ) {
    if (i + minGrpLen <= j && isFound()) {
        if (minSize === 0) minSize = j - i;
        else minSize = Math.min(minSize, j - i);
        search[gene[i]]--;
        i++;
    } else {
        search[gene[j]]++; //increasing sample
        j++;
    }
}

return minSize;
```
