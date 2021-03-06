# cosimilar

calculate similarity matrix for multiple files/documents/text using [cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity)

main algorithm:

* create a word list
* count words
* when comparing 2 word counters, combine word lists and create a word counter map based on larger list
* calculate cosine similarity using number vectors for each file (ignore words but the order is important)


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
