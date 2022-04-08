# Balanced Partition

Given 2 arrays as 2 parameters:
parents: index of the parent for the node
file_size: file size of the each node

if you cut once between node,
return the minimum difference of total file sizes between 2 partitions.

the parent's index of the first item will be -1

below is sample inputs

```txt
5 <--number of nodes
-1 <-- each node's parent's index
0
1
1
3
10
20
20
50
30
```

then the structure of the node will be like below
node: (index/file-size)

```txt
      (0/10)
      /
   (1/20)
  /     \
(2/20) (3/50)
        /
    (4/30)
```

the minimum difference of the cut will be between 1 and 3,
so it will be 30

explan:
total fileSize of left partition(0,1,2) = 0:10 + 1:20 + 2: 20 = 50
total size of right partition(3,4) = 3:50 + 4:30 = 80

difference is |50-80| = 30
