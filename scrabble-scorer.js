// inspired by https://exercism.org/tracks/javascript/exercises/etl
// demonstrating Extract-Transform-Load via Scrabble's scoring system

// NOTE: do NOT change any func & var names

const input = require("readline-sync");
let userInputWord;

function initialPrompt() {
  userInputWord = input.question("Let's play some scrabble! Enter a word: ");
}

const simpleScorer = function (word) {
  // word score = 1 point per letter
  return word.length;
};

const vowelBonusScorer = function (word) {
  console.log(word);
  // each letter scores 1 point
  // each vowel scores 2 extra points
  const vowels = word.match(/[aeiou]/gi).length;
  const wordScore = word.length + vowels * 2;
  // console.log('vowels', vowels);
  // console.log('wordScore', wordScore);
  return wordScore;
};

// returns word score using oldPointStructure scoring object
// logs each point total increase
function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";
  let wordScore = 0;
  // for each letter in word
  for (let i = 0; i < word.length; i++) {
    // for each key in object
    for (const pointValue in oldPointStructure) {
      // if obj key includes letter
      if (oldPointStructure[pointValue].includes(word[i])) {
        // add string line to letterPoints string
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
        // add points for that letter to wordScore
        // convert pointValue from string to number
        wordScore += Number(pointValue);
      }
    }
  }
  console.log(letterPoints);
  return wordScore;
}

// returns word score using newPointStructure scoring object
// logs each point total increase
const scrabbleScorer = function (word) {
  let wordScore = 0;
  // for each letter in word
  for (let i = 0; i < word.length; i++) {
    // for each key in object
    for (let letterKey in newPointStructure) {
      // letterKey is 'a' key
      // newPointStructure[letterKey] is '#' value
      if (letterKey === word[i]) {
        // convert '#' point value from string to number
        // add points for that letter to wordScore
        wordScore += Number(newPointStructure[letterKey]);
      }
    }
    console.log("wordScore increases to:", wordScore);
  }
  return wordScore;
};

// INSTRUCTIONS:
//    retrieve scoringFunction from the object in scoringAlgorithms array that user chooses in scorerPrompt()
//    tell user their userInputWord score

// array of objects containing each scoring option's info
const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScorer,
  },
  {
    name: "Bonus Vowels	",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScorer,
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scorerFunction: scrabbleScorer,
  },
];

/* asks user to select a method to score their word & validates it:
      if user enters: 0, simpleScorer()
                      1, vowelBonuScorer()
                      2, scrabbleScorer()

  then logs userInputWord score
  & returns user input scoring method -- as array of objects index #  */
function scorerPrompt() {
  userScoringIndex = Number(
    input.question(
      `Which scoring algorithm would you like to use?

      0 - Simple: One point per character
      1 - Vowel Bonus: Vowels are worth 3 points
      2 - Scrabble: Uses scrabble point system
      Enter 0, 1, or 2: `
    )
  );
  // validates user's # choice
  if (userScoringIndex > 2) {
    console.log(`Must choose # 0-2: Select again!`);
    scorerPrompt();
  }
  // userScoringIndex is user input index 0-2...
  // selects scoring object from scoringAlgoriths array of objects
  console.log(
    `Score for ${userInputWord}: ${scoringAlgorithms[
      userScoringIndex
    ].scorerFunction(userInputWord)}`
  );
  // logs & returns user's scoring object
  // console.log(scoringAlgorithms[userScoringIndex]);
  return scoringAlgorithms[userScoringIndex];
}

// initial word scoring object
const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

// transforms initial scoring object into new scoring object
// returns new object with lowercase letter keys & point values
function transform(obj) {
  // obj is oldPointStructure
  let newObj = {}; // obj['key'][index]
  // iterate over obj keys
  for (const key in obj) {
    // 1: ['a'] ---> 'a': 1
    // iterate over each key's letter array value
    for (let i = 0; i < obj[key].length; i++) {
      // add new key/value pair {letter: point,...} to newObj
      let newKey = obj[key][i].toLowerCase();
      newObj[newKey] = Number(key); // WORKS!
    }
  }

  // sort newObj keys
  const sortedKeysObj = Object.keys(newObj)
    .sort()
    .reduce((obj, key) => {
      obj[key] = newObj[key];
      return obj;
    }, {});

  console.log("sortedKeysObj =", sortedKeysObj); // WORKS!
  return sortedKeysObj;
}

// new scoring object
let newPointStructure = transform(oldPointStructure);

function runProgram() {
  initialPrompt();
  scorerPrompt();
}

// Don't write any code below this line or your program won't run as expected
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};
