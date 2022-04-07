# Acending Order

given a n x n grid with items of [a-z],
determin if it is acending order both horizontal and vertical direction.
colums are given as string.
when it is ascending order, return "YES", if not return "NO"

ex>
given:

```txt
[
    'aab',
    'abb',
    'bcc'
];
```

above sample should return "YES"

but if below examples are give,

ex>
given:

```txt
[
    'aab',
    'acb',
    'bcc'
];
```

or

```txt
[
    'aab',
    'acc',
    'bbc'
];
```

it should return "NO"

because at the first array, 2nd row's `cb` is not ascending order.
at the second array, `cb` in 2nd column is not ascending order.
