const words = ["HANGMAN", "COMPUTER", "JAVASCRIPT", "PROGRAMMING", "OPENAI", "GAME"];
let selectedWord = "";
let guessedLetters = [];
let remainingAttempts = 6;

let hints = [
  "This is the first hint",
  "You might find this letter in the word",
  "The word is related to programming",
  // Add more hints here
];

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function getRandomHint() {
  return hints[Math.floor(Math.random() * hints.length)];
}

function updateWordDisplay() {
  const wordDisplay = document.getElementById("word-display");
  let displayText = "";

  for (const letter of selectedWord) {
    if (guessedLetters.includes(letter)) {
      displayText += letter;
    } else {
      displayText += "_";
    }
  }

  wordDisplay.textContent = displayText;
}

function updateHangmanImage() {
  const hangmanImage = document.getElementById("hangman-image");
  hangmanImage.src = `images/hang${6 - remainingAttempts}.svg`;
}

function showWinMessage() {
  alert("Congratulations! You won! The word was " + selectedWord);
  resetGame();
}

function showLoseMessage() {
  alert(`Sorry, you lost! The word was "${selectedWord}".`);
  resetGame();
}

function showHint() {
  const hintMessage = getRandomHint();
  alert(hintMessage);
}

function handleLetterClick(event) {
  const letter = event.target.textContent;
  event.target.disabled = true;

  if (selectedWord.includes(letter)) {
    guessedLetters.push(letter);
    updateWordDisplay();

    if (!document.getElementById("word-display").textContent.includes("_")) {
      showWinMessage();
    }
  } else {
    remainingAttempts--;

    if (remainingAttempts === 0) {
      showLoseMessage();
    } else {
      updateHangmanImage();
    }
  }
}

function resetGame() {
  selectedWord = getRandomWord();
  guessedLetters = [];
  remainingAttempts = 6;

  const letterButtons = document.querySelectorAll(".letter");
  letterButtons.forEach((button) => (button.disabled = false));

  updateWordDisplay();
  updateHangmanImage();
}

document.addEventListener("DOMContentLoaded", () => {
  const lettersContainer = document.getElementById("letters");

  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const letterButton = document.createElement("button");
    letterButton.textContent = letter;
    letterButton.classList.add("letter");
    letterButton.addEventListener("click", handleLetterClick);
    lettersContainer.appendChild(letterButton);
  }

  const hintButton = document.getElementById("hint-button");
  hintButton.addEventListener("click", showHint);

  resetGame();
});
