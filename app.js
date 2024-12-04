const f1Drivers = [
  "verst", "hamil"
];

let selectedDriver = '';
let attemptsLeft = 6;
let guessedLetters = [];

document.addEventListener('DOMContentLoaded', () => {
  startNewGame();
  
  document.getElementById('submit-btn').addEventListener('click', handleGuess);
});

function startNewGame() {
  selectedDriver = f1Drivers[Math.floor(Math.random() * f1Drivers.length)].toLowerCase();
  guessedLetters = [];
  attemptsLeft = 6;
  
  document.getElementById('feedback').innerHTML = '';
  document.getElementById('attempts-left').textContent = attemptsLeft;
  document.getElementById('guess-input').value = '';
}

function handleGuess() {
  const guess = document.getElementById('guess-input').value.toLowerCase();

  attemptsLeft--;
  document.getElementById('attempts-left').textContent = attemptsLeft;
  guessedLetters.push(guess);
  
  let feedback = '';

  for (let i = 0; i < 5; i++) {
    const letter = guess[i];
    if (selectedDriver[i] === letter) {
      feedback += `<span class="feedback-correct">${letter}</span> `;
    } else if (selectedDriver.includes(letter)) {
      feedback += `<span class="feedback-close">${letter}</span> `;
    } else {
      feedback += `<span class="feedback-wrong">${letter}</span> `;
    }
  }

  document.getElementById('feedback').innerHTML = feedback;
  
  if (guess === selectedDriver) {
    alert("thats right");
    startNewGame();
  } else if (attemptsLeft === 0) {
    alert(`correct driver was ${selectedDriver}.`);
    startNewGame();
  }
}
