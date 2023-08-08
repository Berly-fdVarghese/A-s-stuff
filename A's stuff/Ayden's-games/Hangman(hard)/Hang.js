var list = [
	{ word: "abruptly", hint: "Hard word" },
	{ word: "absurd", hint: "Hard word" },
	{ word: "avenue", hint: "Hard word" },
	{ word: "bagpipes", hint: "Musical Instruments" },
	{ word: "banjo", hint: "Musical Instruments" },
	{ word: "bookworm", hint: "Hard word" },
	{ word: "buckaroo", hint: "Hard word" },
	{ word: "buffalo", hint: "Animals" },
	{ word: "cobweb", hint: "Hard word" },
	{ word: "exodus", hint: "Hard word" },
	{ word: "fishhook", hint: "Animals" },
	{ word: "galaxy", hint: "Hard word" },
	{ word: "glowworm", hint: "Animals" },
	{ word: "haiku", hint: "Type of Poetry or Writing" },
	{ word: "hyphen", hint: "Hard word" },
	{ word: "injury", hint: "Hard word" },
	{ word: "jelly", hint: "Animals" },
	{ word: "jigsaw", hint: "Hard word" },
	{ word: "joyful", hint: "Descriptive Adjective" },
	{ word: "juicy", hint: "Descriptive Adjective" },
	{ word: "kazoo", hint: "Musical Instruments" },
	{ word: "klutz", hint: "Descriptive Adjective" },
	{ word: "lucky", hint: "Descriptive Adjective" },
	{ word: "luxury", hint: "Hard word" },
	{ word: "nowadays", hint: "Adverbs or time related words" },
  ];

let answer = '';
let maxWrong = 8;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
	let randomIndex = Math.floor(Math.random() * list.length);
	answer = list[randomIndex].word;
	let hint = list[randomIndex].hint;
	document.getElementById('hint').innerHTML = "Hint: " + hint;
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="🔤"
        id='${letter}'
        onClick="handleMyGuess('${letter}')"
      >
        ${letter}
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleMyGuess(chosenLetter) {
	guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null
	document.getElementById(chosenLetter).setAttribute("disabled", true)
	if (answer.indexOf(chosenLetter) >= 0) {
		blankTheWord()
		checkIfIWon()
	} else if (answer.indexOf(chosenLetter)===-1) {
		mistakes++;
		updateMistakes()
		checkIfILost()
		updateThePicture()
	}
}

function updateThePicture() {
	document.getElementById("hangman").src = "images/hang" + mistakes +".svg"
}
function checkIfIWon() {
	if (wordStatus === answer){
		document.getElementById('keyboard').innerHTML = "You Won!!! The word was " + answer;
	}
}
function checkIfILost() {
	if (mistakes === maxWrong){
		document.getElementById('keyboard').innerHTML = "You lost! The word was " + answer;
	}
}

 function blankTheWord(){
	wordStatus =  answer.split("").map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _")).join("");
	document.getElementById('wordSpotlight').innerHTML = wordStatus;	
}

function updateMistakes() {
	document.getElementById('mistakes').innerHTML = mistakes
}

function reset(){
	mistakes = 0
	guessed = []
	document.getElementById('hangman').src = "images/hang0.svg"
	randomWord()
	blankTheWord()
	updateMistakes()
	generateButtons()
}

document.getElementById('maxWrong').innerHTML = maxWrong;
randomWord();
generateButtons();
blankTheWord(); 