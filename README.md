# About this project

I'll keep the algorithm solution that are worth to be kept with my solutions.

below is giving the executor script a permission.

## get ready

```bash
chmod 777 ./validate.sh
chmod 777 ./validateSingle.sh
```

## to run all the test cases

```bash
./validate.sh {folderName} [verbose]
```

### example

```bash
./validate.sh FormingMagicSquares verbose
```

### result when verbose

```sh
$ ./validate.sh FormingMagicSquares verbose
testing  FormingMagicSquares
---------------------------
==> (O) case1 passed!
==============
case1 output:
1
==============
case1 answer:
1
==============
---------------------------
==> (O) case2 passed!
==============
case2 output:
21
==============
case2 answer:
21
==============
---------------------------
==> (O) case3 passed!
==============
case3 output:
16
==============
case3 answer:
16
==============
---------------------------
```

### reset when not verbose

```sh
$ ./validate.sh FormingMagicSquares
testing  FormingMagicSquares
---------------------------
==> (O) case1 passed!
---------------------------
==> (O) case2 passed!
---------------------------
==> (O) case3 passed!
---------------------------
```

## Bear And Steady Gene

Interesting algorithm which find unbalance factor.
It uses window moving algorithm and unbalance factor extract algorithm [here](./BearAndSteadyGene/README.md)

## Zigzag Conversion

Also interesting zigzag pattern algorithm.
it handles 2D arrays. [here](./ZigzagConversion/README.md)

## FormingMagicSquares

Forming Magic square with minimum changes.
Simply create magic square, and make 8 variants.
And Compare with test cases suming all the difference to find minimum differences.
