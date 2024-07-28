const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");
contentBox = document.querySelector(".container .content");
startArea = document.querySelector(".startArea");
scoreArea = document.querySelector(".score");
modalContent = document.querySelector(".modal-content");

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn")
var span = document.getElementsByClassName("close")[0];
var modalText = document.getElementById("modalText");

let correctWord, timer
let score = 0


const initTimer = maxTime => {
    clearInterval(timer)
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--
            return timeText.innerText = maxTime
        }
        modal.style.display = "block"
        modalContent.classList.add("modal-wrong")
        modalText.innerHTML = `<br>Time off! <b>${correctWord.toUpperCase()}</b> was the correct word.`
        endGame()
    }, 1000)
}

const start = () => {
    contentBox.style.display = "block"
    startArea.style.display = "none"
    initGame()
}

const endGame = () => {
    clearInterval(timer)
    contentBox.style.display = "none"
    startArea.style.display = "block"
    modal.style.display = "block"
    modalContent.classList.remove("modal-correct")
    modalContent.classList.add("modal-wrong")
    modalText.innerHTML = `
    <center><br>Time off <b>${correctWord.toUpperCase()}</b> was the correct word.
    <br>You lost the Game! :(</center><br>
    </center>
    `
}

const winGame = () => {
    clearInterval(timer);
    contentBox.style.display = "none";
    startArea.style.display = "block";
    modal.style.display = "block";
    modalContent.classList.add("modal-correct");
    modalText.innerHTML = `<br><center>Congrats You WIN THE GAME!!!!!!`
}

const initGame = () => {
    initTimer(30)
    let randomObj = words[Math.floor(Math.random()*words.length)]
    let wordArray = randomObj.word.split("")
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Declare j inside the loop
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
      }
      
    wordText.innerText = wordArray.join("")
    hintText.innerText = randomObj.hint
    correctWord = randomObj.word.toLowerCase()
    inputField.value = ""
    inputField.setAttribute("max-length", correctWord.length)
    scoreArea.innerHTML = score

    if (score > 9) {
        winGame()
    }
}

const checkWord = () => {
    let userWord = inputField.value.toLowerCase()
    if (!userWord) {
        modal.style.display = "block"
        modalContent.classList.remove("modal-wrong")
        modalContent.classList.add("modal-correct")
        return modalText.innerHTML = `<br>Please enter a word to check!`
    }
    if (userWord !== correctWord) {
        if (score >= 1) {
            score--
            scoreArea.innerHTML =  score
        }
        modal.style.display = "block"
        modalContent.classList.add("modal-wrong")
        return modalText.innerHTML = `<br>Oops! <b>${userWord}is not a correct word.`
    } else {
        modal.style.display = "block"
        modalContent.classList.remove("modal-wrong")
        modalContent.classList.add("modal-correct")
        if (modalText) {
            modalText.innerHTML = `<br> Congrats! <b>${correctWord.toUpperCase()}</b> is the correct word.`
          } else {
            console.error("modalText element not found");
          }
          
        score++
    }
    initGame()
}

refreshBtn.addEventListener("click", initGame)
checkBtn.addEventListener("click", checkWord)

span.onclick = function(){
    modal.style.display = "none"
}

window.onclick = function(event){
    if(event.target == modal){
        modal.style.display = "none"
    }
}