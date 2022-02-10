# cosimilar
calculate similarity matrix for multiple files using cosine similarity

```sh
node index.js lorem1.txt lorem2.txt lorem3.txt
```

sample output:

```
A: lorem1.txt
B: lorem2.txt
C: lorem3.txt

Similarity Matrix

[
  [ '-', 'A ', 'B ', 'C ' ],
  [ 'A', '--', '--', 0.5, 0.57 ],
  [ 'B', '--', '--', '--', 0.57 ],
  [ 'C', '--', '--', '--', '--' ]
]
```


```sh
python main.py lorem1.txt lorem2.txt lorem3.txt lorem4.txt
```

sample output:

```
A: lorem1.txt
B: lorem2.txt
C: lorem3.txt
D: lorem4.txt

Similarity Matrix

[['-', 'A ', 'B ', 'C ', 'D '],
 ['A', '--', 0.51, 0.58, 0.52],
 ['B', '--', '--', 0.57, 0.51],
 ['C', '--', '--', '--', 0.55]]
```
