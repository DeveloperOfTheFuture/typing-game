const word = document.querySelector('#word');
const text = document.querySelector('#text');
const scoreEl = document.querySelector('#score');
const timeEl = document.querySelector('#time');
const endgameEl = document.querySelector('#endgame-container');
const settingsBtn = document.querySelector('#settings-btn');
const settings = document.querySelector('#settings');
const settingsForm = document.querySelector('#settings-form');
const difficultySelect = document.querySelector('#difficulty');

const words = ['instance', 'phone', 'hardware', 'language', 'headphones'];

let randomWord;
let score = 0;
let time = 10;

// Generate random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)]
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.textContent = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.textContent = score;
}

addWordToDOM();

// Events
text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    e.target.value = '';
  }
});