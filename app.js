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

const timeInterval = setInterval(updateTime, 1000);

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Focus text when game start
text.focus();

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

// Update time
function updateTime() {
  time--;
  timeEl.textContent = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

// Game Over
function gameOver() {
  endgameEl.innerHTML = `
    <h2>Time is out</h2>
    <p>Final score: ${score}</p>
    <button onclick='location.reload()'>Reload</button>
  `;

  endgameEl.style.display = 'flex';
}

addWordToDOM();

// Events

// Typing word
text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    e.target.value = '';

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }


    updateTime();
  }
});

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});