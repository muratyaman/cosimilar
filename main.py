import math
import pprint
import re
import string
import sys
import time

pp = pprint.PrettyPrinter()

# TODO exclude common words
# excludeWords = ['_', 'a', 'are', 'be', 'i', 'in', 'is', 'me', 'to', 'you']

def getFileContent(file):
  with open(file, 'r') as f:
    return f.read()
  return '_'
#end func


def getWordList(text):
  ltext = text.lower()
  words = re.findall('\w+', ltext)
  if words is None:
    raise Exception('no words found')
    return []
  #end if
  words.sort()
  return words
#end func


def wordList(countedWords):
  return countedWords.keys()
#end func


def countWords(words):
  # NOTE each word cannot be dict method name like 'update'
  counted = {}
  for word in words:
    counted[word] = 1 + (counted[word] if word in counted else 0)
  #end for
  return counted
#end func


def makeAllWordsVector(allUniqueWords, countedWords):
  allWordsVector = []
  for word in allUniqueWords:
    count = countedWords[word] if word in countedWords else 0
    allWordsVector.append(count)
  #end for
  return allWordsVector
#end func


def sumProduct(vector1, vector2):
  sum = 0
  len1 = len(vector1)
  len2 = len(vector2)
  # TODO verify len1 == len2
  for i in range(len1):
    sum += vector1[i] * vector2[i]
  #end for
  return sum
#end func


def sumSquare(vector):
  sum = 0
  for vi in vector:
    sum += vi * vi
  #end for
  return sum
#end func


# see https://en.wikipedia.org/wiki/Cosine_similarity
# cosine similarity returns a value between -1 and 1
def calcSimilarity(countedWords1, countedWords2):
  allUniqueWords = wordList(countedWords1) + wordList(countedWords2)
  allUniqueWords.sort()

  allWordsVector1 = makeAllWordsVector(allUniqueWords, countedWords1)
  allWordsVector2 = makeAllWordsVector(allUniqueWords, countedWords2)

  norm1 = math.sqrt(sumSquare(allWordsVector1))
  norm2 = math.sqrt(sumSquare(allWordsVector2))
  sim = sumProduct(allWordsVector1, allWordsVector2) / (norm1 * norm2)
  #sim in [-1 .. 1]
  return math.ceil(100.0 * sim) / 100.0
#end func



def main(argv):
  argc = len(argv)
  matrix = []

  row0 = ['-']
  for c in range(0, argc):
    print(chr(65 + c) + ': ' + argv[c])
    row0.append(chr(65 + c) + ' ')
  #end for
  matrix.append(row0)

  print('')
  print('Similarity Matrix')
  print('')

  countedWords = {}

  for x in range(0, argc - 1):
    row = [chr(65 + x)]
    fileX = argv[x]

    if not (fileX in countedWords):
      text = getFileContent(fileX)
      words = getWordList(text)
      countedWords[fileX] = countWords(words)
    #end if

    row.append('--')
    for z in range(0, x):
      row.append('--')
    #end for

    for y in range(x + 1, argc):
      fileY = argv[y]

      if not (fileY in countedWords):
        text = getFileContent(fileY)
        words = getWordList(text)
        countedWords[fileY] = countWords(words)
      #end if

      simX_Y = calcSimilarity(countedWords[fileX], countedWords[fileY])
      #print('{} vs {} is {}'.format(fileX, fileY, simX_Y))
      row.append(simX_Y)
    #end for y

    matrix.append(row)

  #end for x

  pp.pprint(matrix)

#end func

if __name__ == "__main__":
  main(sys.argv[1:])

#else included as lib
