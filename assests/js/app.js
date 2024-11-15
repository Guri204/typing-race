'use strict';

// DOM elements
const wordDisplay = document.getElementById("wordDisplay");
const wordInput = document.getElementById("wordInput");
const timeDisplay = document.getElementById("timeLeft");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
const backgroundMusic = document.getElementById("backgroundMusic");

// Word bank with 200+ words
const wordBank = [
    'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building',
    'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money',
    'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow',
    'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer',
    'philosophy', 'database', 'periodic', 'capitalism', 'abominable', 'phone',
    'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada',
    'velvet', 'potion', 'treasure', 'beacon', 'labyrinth', 'whisper', 'breeze',
    'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology',
    'alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake',
    'baseball', 'beyond', 'evolution', 'banana', 'perfume', 'computer',
    'butterfly', 'discovery', 'ambition', 'music', 'eagle', 'crown',
    'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'door', 'bird',
    'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
    'beach', 'economy', 'interview', 'awesome', 'challenge', 'science',
    'mystery', 'famous', 'league', 'memory', 'leather', 'planet', 'software',
    'update', 'yellow', 'keyboard', 'window', 'beans', 'truck', 'sheep',
    'blossom', 'secret', 'wonder', 'enchantment', 'destiny', 'quest', 'sanctuary',
    'download', 'blue', 'actor', 'desk', 'watch', 'giraffe', 'brazil',
    'audio', 'school', 'detective', 'hero', 'progress', 'winter', 'passion',
    'rebel', 'amber', 'jacket', 'article', 'paradox', 'social', 'resort',
    'mask', 'escape', 'promise', 'band', 'level', 'hope', 'moonlight', 'media',
    'orchestra', 'volcano', 'guitar', 'raindrop', 'inspiration', 'diamond',
    'illusion', 'firefly', 'ocean', 'cascade', 'journey', 'laughter', 'horizon',
    'exploration', 'serendipity', 'infinity', 'silhouette', 'wanderlust',
    'marvel', 'nostalgia', 'serenity', 'reflection', 'twilight', 'harmony',
    'symphony', 'solitude', 'essence', 'melancholy', 'melody', 'vision',
    'silence', 'whimsical', 'eternity', 'cathedral', 'embrace', 'poet', 'ricochet',
    'mountain', 'dance', 'sunrise', 'dragon', 'adventure', 'galaxy', 'echo',
    'fantasy', 'radiant', 'serene', 'legend', 'starlight', 'light', 'pressure',
    'bread', 'cake', 'caramel', 'juice', 'mouse', 'charger', 'pillow', 'candle',
    'film', 'jupiter'
    ];

// Shuffle array utility function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Score class definition
class Score {
    #date;
    #hits;
    #percentage;

    constructor(hits, totalWords) {
        this.#date = new Date();
        this.#hits = hits;
        this.#percentage = ((hits / totalWords) * 100).toFixed(2);
    }

    getDate() {
        return this.#date;
    }

    getHits() {
        return this.#hits;
    }

    getPercentage() {
        return this.#percentage;
    }
}

let gameWords = shuffle([...wordBank]); // Shuffled words for the game
let currentWordIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;
let isGameActive = false;
let scoresArray = [];



// Start the game
function startGame() {
    if (isGameActive) return;
    isGameActive = true;

    score = 0;
    timeLeft = 15;
    currentWordIndex = 0;
    gameWords = shuffle([...wordBank]);

    wordDisplay.textContent = gameWords[currentWordIndex];
    wordInput.disabled = false;
    wordInput.value = "";
    wordInput.focus();

    backgroundMusic.play('./');

    startBtn.style.display = "none";


    timer = setInterval(updateTimer, 1000);
}

// Update timer and end game when time runs out
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
    } else {
        endGame();
    }
}

// Check input on each keystroke
wordInput.addEventListener("input", () => {
    if (wordInput.value.trim() === gameWords[currentWordIndex]) {
        score++;
        scoreDisplay.textContent = score;
        currentWordIndex++;

        if (currentWordIndex >= gameWords.length) {
            endGame(); // All words completed
        } else {
            wordDisplay.textContent = gameWords[currentWordIndex];
            wordInput.value = "";
        }
    }
});

// End the game
function endGame() {
    isGameActive = false;
    clearInterval(timer);
    backgroundMusic.pause();
    wordInput.disabled = true;
    startBtn.style.display = "inline";
    // restartBtn.style.display = "inline"; // Show restart button

    const newScore = new Score(score, currentWordIndex + 1);
    scoresArray.push(newScore);

    // // Update the score summary message
    // const scoreSummary = document.getElementById("scoreSummary");
    // scoreSummary.innerHTML = `
    //     <p>Game Over! Your final score is: ${score} words.</p>
    //     <p>Date: ${newScore.getDate().toLocaleString()}</p>
    //     <p>Accuracy: ${newScore.getPercentage()}%</p>
    // `;
    // scoreSummary.style.display = "block"; // Show the score summary

    console.log("Scores:", scoresArray); // For debugging
}


// // Restart the game
// restartBtn.addEventListener("click", () => {
//     wordBank.push(...[
//         'star', 'forest', 'journey', 'mirror', 'shadow', 
//         'rose', 'fire', 'ocean', 'field', 'cloud'
//     ]);
//     startGame();
// });

// Start button event
startBtn.addEventListener("click", startGame);

// Pause game with ESC key
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !isGameActive) {
        startGame();
    }
});
