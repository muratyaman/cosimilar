const fs = require('fs');
const path = require('path');

// TODO exclude common words
// const excludeWords = ['_', 'a', 'are', 'be', 'i', 'in', 'is', 'me', 'to', 'you'];

function getFileContent(file) {
  return fs.readFileSync(path.resolve(file), 'utf8');
}


function getWordList(text) {
  const ltext = text.toLowerCase();
  const words = ltext.match(/\w+/g);
  return words.sort();
}


function wordList(countedWords) {
  return Object.keys(countedWords);
}


function countWords(words) {
  const counted = {};
  for (const word of words) {
    counted[word] = 1 + (counted[word] ?? 0);
  }
  return counted;
}


function makeAllWordsVector(allUniqueWords, countedWords) {
  const allWordsVector = [];
  for (const word of allUniqueWords) {
    count = countedWords[word] ?? 0;
    allWordsVector.push(count);
  }
  return allWordsVector;
}


function sumProduct(vector1, vector2) {
  let sum = 0;
  const len1 = vector1.length;
  const len2 = vector2.length;
  if (len1 !== len2) throw new Error('vectors must have equal length');
  for (let i = 0; i < len1; i++) {
    sum += vector1[i] * vector2[i];
  }
  return sum;
}


function sumSquare(vector) {
  let sum = 0;
  for (const vi of vector) {
    sum += vi * vi;
  }
  return sum;
}


// see https://en.wikipedia.org/wiki/Cosine_similarity
// cosine similarity returns a value between -1 and 1
function calcSimilarity(countedWords1, countedWords2) {
  allUniqueWords = [...wordList(countedWords1), ...wordList(countedWords2)];
  allUniqueWords.sort();

  allWordsVector1 = makeAllWordsVector(allUniqueWords, countedWords1);
  allWordsVector2 = makeAllWordsVector(allUniqueWords, countedWords2);

  norm1 = Math.sqrt(sumSquare(allWordsVector1));
  norm2 = Math.sqrt(sumSquare(allWordsVector2));
  sim = sumProduct(allWordsVector1, allWordsVector2) / (norm1 * norm2)
  // sim in [-1 .. 1]
  return Math.round(100.0 * sim) / 100.0;
}



function main(argv) {
  const argc = argv.length;
  if (argc < 2) throw new Error('2 or more files must be given');

  const matrix = [];

  const row0 = ['-'];
  for (let c = 0; c < argc; c++) {
    console.info(String.fromCharCode(65 + c) + ': ' + argv[c]);
    row0.push(String.fromCharCode(65 + c) + ' ');
  }
  matrix.push(row0);

  console.info('');
  console.info('Similarity Matrix');
  console.info('');

  const countedWords = {};
  let text = '', words = [];

  for (let x = 0; x <= argc - 1; x++) {
    const row = [String.fromCharCode(65 + x)];
    const fileX = argv[x];

    if (!(fileX in countedWords)) {
      text = getFileContent(fileX);
      words = getWordList(text);
      countedWords[fileX] = countWords(words);
    }

    row.push('--');
    for (let z = 0; z <= x; z++) {
      row.push('--');
    }

    for (let y = x + 1; y < argc; y++) {
      fileY = argv[y];

      if (!(fileY in countedWords)) {
        text = getFileContent(fileY);
        words = getWordList(text);
        countedWords[fileY] = countWords(words);
      }

      simX_Y = calcSimilarity(countedWords[fileX], countedWords[fileY])
      // console.info('{} vs {} is {}'.format(fileX, fileY, simX_Y))
      row.push(simX_Y);
    }

    matrix.push(row);
  }

  console.info(matrix);
}

const [_node, _thisFile, ...argv] = process.argv;
main(argv);
