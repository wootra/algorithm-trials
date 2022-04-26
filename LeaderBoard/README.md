# Climing Leaderboard

the original question was acending / descening ordered data.
So, it could pass with a simple binary search algorithm.

But I wanted to challenge more,
so I made my own tree - called TensTree/TensNode.

Which have log10(n) complexity to find a value.

this TensTree can be used when the values are integer.
It shows pretty good performance when the value is bigger.

My algorithm using TensNode is assuming every digits of the number belongs to an array of size 10.
if value is 1000, then it has 4 digits, so I make 4 arrays of size 10.

the value will be contained in arr[1], arr[0], arr[0], arr[0], and the last array will increase count.
like this question, it should keep just number of rankings, not how many people is in the rankings.
But this algorithm also support how many same score exists.

if the ranking is very big number, this algorithm will find the ranking very fast as well as saving a new ranking very fast.

the time complexity of writing in the worst case will be:

O(n) where n is number of digits for the new value. (ex> 1234 -> O(4))

the time complexity of find a ranking in the worst case will be:

O(n) where n is number of digits for the value which wants to know what ranking

Space complexity is:

O(10m) where m is number of saved values. it uses extra spaces(10) for 1 number, but it is reused.
if all values has different digits, it will have the worst space complexity.

ex> 1234, 2234, 3234, 4234 -> 4\*(10+10+10)

This tree can be changed to use binary values (0/1) instead of 10,
in that way, we will calculate the numbers with bit operator.

Not like binary search tree, it will be distributed well if the sample value has a good distribution.
ex> 1...10000

but it will not require any of balancing process since it is using pre-made array.

ex> 10001010101110011001010

so, its level will not be more than 64levels since it is the maximum value even though the number is unsigned int64.
