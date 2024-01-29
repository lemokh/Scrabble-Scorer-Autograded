// inspired by (https://exercism.org/tracks/javascript/exercises/etl)
// demonstrating Extract-Transform-Load via Scrabble's scoring system 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

// logs points per letter & returns word score
function oldScrabbleScorer(word) {
   word = word.toUpperCase();
	let letterPoints = "";
   let score = 0; 
   // for each letter in word
	for (let i = 0; i < word.length; i++) {
      // for each key in object
      for (const pointValue in oldPointStructure) {
         // if obj key includes letter
         if (oldPointStructure[pointValue].includes(word[i])) {
            // add string line to letterPoints
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
            // add points scored to score
            score += Number(pointValue);
         }
      }
	}
   console.log(letterPoints);
   return score;
 }

// complete these funcs & vars without changing their names

let userInputWord;

function initialPrompt() {
   userInputWord = input.question("Let's play some scrabble! Enter a word: ");
};

const simpleScorer = function(word) {
   // score = 1 point per letter
   let score = word.length;
   return score;
};

const vowelBonusScorer = function(word) {
   console.log(word);
   // each letter scores 1 point
   // each vowel scores 2 extra points
   const vowels = word.match(/[aeiou]/gi).length;
   const score = word.length + (vowels * 2);
   // console.log('vowels', vowels);
   // console.log('score', score);
   return score;
};

const scrabbleScorer = function(word) {

};

// retrieve info from scoringAlgorithms array:
//    score userInputWord using the scoringAlgorithm object that scorerPrompt() returns
//    tell user their word score

// contains info about each scoring option
const scoringAlgorithms = [
   {name: "Simple Score", description: "Each letter is worth 1 point.", scoringFunction: simpleScorer},
   {name: "Bonus Vowels	", description: "Vowels are 3 pts, consonants are 1 pt.", scoringFunction: vowelBonusScorer},
   {name: "Scrabble", description: "The traditional scoring algorithm.", scoringFunction: oldScrabbleScorer}
];

/* prompt user to select a scoring algorithm for their word:
      if user enters: 0, simpleScorer()
                      1, vowelBonuScorer()
                      2, scrabbleScorer()
*/

function scorerPrompt() {
   userScoringIndex = Number(input.question(
      `Which scoring algorithm would you like to use?
   
      0 - Simple: One point per character
      1 - Vowel Bonus: Vowels are worth 3 points
      2 - Scrabble: Uses scrabble point system
      Enter 0, 1, or 2: `
   ));
   if (userScoringIndex > 2) {
      console.log(`Must choose # 0-2: Select again!`)
      scorerPrompt();
   } 
   // scoringAlgorithms is an array of objects
   // userScoringIndex is the user input index # (0-2)... for selecting an object in array
   // .scoringFunction is an object key name
   // (userInputWord) calls .scoringFunction value with an argument userInputWord
   console.log(`Score for ${userInputWord}: ${scoringAlgorithms[userScoringIndex].scoringFunction(userInputWord)}`);

   // return the user's scoring object
   // console.log(scoringAlgorithms[userScoringIndex]);
   return scoringAlgorithms[userScoringIndex];
}

function transform() {};

let newPointStructure;

function runProgram() {
   initialPrompt();
   scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
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
	scorerPrompt: scorerPrompt
};
