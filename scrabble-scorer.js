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

// score userInputWord & log result
function oldScrabbleScorer(word) {
	let letterPoints = "";
   word = word.toUpperCase();
   // for each letter in word
	for (let i = 0; i < word.length; i++) {
      // for each array item in object
      for (const pointValue in oldPointStructure) {
         // if array item includes letter
         if (oldPointStructure[pointValue].includes(word[i])) {
            // add this string line to letterPoints
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         }
      }
	}
   console.log(letterPoints);
	return letterPoints;
 }

// complete these funcs & vars without changing their names

let userInputWord; // global variable

function initialPrompt() {
   userInputWord = input.question("Let's play some scrabble! Enter a word: ");
};

let scrabbleScorer = function(word) {

};

const vowelBonusScorer = function(word) {
   console.log(word);
   // each letter = 1 point
   // each vowel = 2 extra points
   const vowels = word.match(/[aeiou]/gi).length;
   const score = word.length + (vowels * 2);
   
   console.log('vowels', vowels);
   console.log('score', score);
   
   return score;
};

const simpleScorer = function(word) {
   // score = 1 point per letter
   let score = word.length;
   // `Score for ${word}: ${score}`
   return score;
};

// retrieve info from scoringAlgorithms:
//    score user word via scoring object that scorerPrompt() returns
//    user their word score

// contains info about each scoring option
const scoringAlgorithms = [
   {name: "Simple Score", description: "Each letter is worth 1 point.", scoringFunction: simpleScorer},
   {name: "Bonus Vowels	", description: "Vowels are 3 pts, consonants are 1 pt.", scoringFunction: vowelBonusScorer},
   {name: "Scrabble", description: "The traditional scoring algorithm.", scoringFunction: scrabbleScorer}
];

// have user select a scoring algorithm to score their word:
//    if user enters 0, simpleScorer()
//    if user enters 1, vowelBonuScorer()
//    if user enters 2, scrabbleScorer()

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
   else { // chunk this to clarify parts
      // scoringAlgorithms[userScoringIndex].scoringFunction(userInputWord);
      console.log(`Score for ${userInputWord}: ${scoringAlgorithms[userScoringIndex].scoringFunction(userInputWord)}`);
   }
   // console.log(scoringAlgorithms[userScoringIndex]);
   return scoringAlgorithms[userScoringIndex];
}

function transform() {};

let newPointStructure;

function runProgram() {
   initialPrompt();
   // oldScrabbleScorer(userInputWord);
   // scrabbleScorer(userInputWord);
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
