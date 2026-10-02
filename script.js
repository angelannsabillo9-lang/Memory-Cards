let words = [
    "🌸",
    "🎀",
    "💗",
    "🦋",
    "🌙",
    "⭐",
    "🌸",
    "🎀",
    "💗",
    "🦋",
    "🌙",
    "⭐"
];

const cards = document.querySelectorAll(".card");
const movesDisplay = document.getElementById("moves");
const restartButton = document.getElementById("restart");
const winMessage = document.getElementById("winMessage");
const pairsDisplay = document.getElementById("pairs");
const timerDisplay = document.getElementById("timer");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let pairs = 0;
let time = 0;
let timer = null;

function shuffleWords() {
    words.sort(() => Math.random() - 0.5);
}

function startTimer() {
    if (timer !== null) return;

    timer = setInterval(function() {
        time++;
        timerDisplay.textContent = time;
    }, 1000);
}

function resetGame() {
    clearInterval(timer);
    location.reload();
}

shuffleWords();

cards.forEach(function(card, index) {

    card.addEventListener("click", function() {

        if (lockBoard) return;
        if (card.textContent !== "?") return;

        card.textContent = words[index];

        // Start timer when the first card is clicked
        if (firstCard === null) {

            firstCard = card;

            if (timer === null) {
                startTimer();
            }

        } else {

            secondCard = card;
            lockBoard = true;

            moves++;
            movesDisplay.textContent = moves;

            if (firstCard.textContent === secondCard.textContent) {

                firstCard.style.backgroundColor = "#ff69b4";
                secondCard.style.backgroundColor = "#ff69b4";

                pairs++;
                pairsDisplay.textContent = pairs;

                firstCard = null;
                secondCard = null;
                lockBoard = false;

                if (pairs === 6) {
                    winMessage.textContent = "🎉 You Win!";
                    clearInterval(timer);
                }

            } else {

                setTimeout(function() {

                    firstCard.textContent = "?";
                    secondCard.textContent = "?";

                    firstCard = null;
                    secondCard = null;
                    lockBoard = false;

                }, 1000);
            }
        }
    });
});

restartButton.addEventListener("click", resetGame);