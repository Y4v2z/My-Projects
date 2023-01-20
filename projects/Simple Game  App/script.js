const wordElement = document.getElementById("word");
const popup = document.getElementById("popup-container");
const message = document.getElementById("success-message");
const items = document.querySelectorAll(".item");
const wrongLettersElement = document.getElementById("wrong-letters");
const warning = document.getElementById("message");
const PlayAgainBtn = document.getElementById("play-again");
let correctLetters = ["a", "j", "g", "t", "i", "c", "u"];
const wrongLetters = [];
const startGameButton = document.getElementById("startGameButton");
const welcomeContainer = document.getElementById("welcome-container");
const Duration = 60;
let countdownDuration = Duration;
let selectedWord = getRandomWord();
function getRandomWord() {
    const words = ["javascript", "galatasaray", "paris", "nadal", "playstation", "software", "friday", "computer", "ferrari"];
    return words[Math.floor(Math.random() * words.length)];
};
function displayWord() {
    wordElement.innerHTML = `
    ${selectedWord.split("").map(letter => `
    <div class="letter">
       ${correctLetters.includes(letter) ? letter : ""}
    </div>
    `).join("")}   
    `;
    const w = wordElement.innerText.replace(/\n/g, "");
    let points = parseInt(100 - ((100 / items.length) * wrongLetters.length));
    if (w === selectedWord) {
        showPopup(`Congratulations. You Won :) Your score is ${points})`)
    }
}
function updateWrongLetters() {
    wrongLettersElement.innerHTML = `
    ${wrongLetters.length > 0 ? `<h3>Wrong Letters</h3>` : ""}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}    
    `;
    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;
        if (index < errorCount) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    })

    if (wrongLetters.length === items.length) {
        showPopup(`You Lost :( Your score is 0`);
    }
};
function showPopup(popupMessage) {
    popup.style.display = 'flex';
    message.innerText = popupMessage
}
function hidePopup() {
    popup.style.display = "none";
}
function displayWarning() {
    warning.classList.add("show");
    setTimeout(() => {
        warning.classList.remove("show");
    }, 2000);
}
function addEventListeners() {
    PlayAgainBtn.addEventListener("click", function () {
        correctLetters = ["a", "j", "g", "t", "i", "c", "u"];
        wrongLetters.splice("");
        selectedWord = getRandomWord();
        displayWord();
        updateWrongLetters();
        countdownDuration = Duration;
        hidePopup()
    })
    window.addEventListener("keydown", function (e) {
        if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode = 222)) {
            const letter = e.key;
            if (selectedWord.includes(letter)) {
                if (!correctLetters.includes(letter)) {
                    correctLetters.push(letter);
                    displayWord();
                } else {
                    displayWarning();
                }
            } else {
                if (!wrongLetters.includes(letter)) {
                    wrongLetters.push(letter);
                    updateWrongLetters();
                } else {
                    displayWarning();
                }
            }
        }
    })
    startGameButton.addEventListener("click", () => {
        displayWord();

        welcomeContainer.style.display = "none";
        const intervalId = setInterval(updateCountdown, 1000);
    })
}
addEventListeners();
function updateCountdown() {
    const countdownEl = document.getElementById('countdown');
    countdownEl.textContent = countdownDuration;
    if (countdownDuration <= 0) {
        showPopup("You Lost :(");
        clearInterval(intervalId);
        return;
    }
    countdownDuration -= 1;
    countdownEl.textContent = countdownDuration;
}