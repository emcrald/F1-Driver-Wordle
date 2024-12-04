const f1Drivers = [
  "Verstappen", "Hamilton", "Leclerc", "Norris", "Ricciardo", "Alonso", "Sainz", "Russell", "Perez",
  "Gasly", "Schumacher", "Stroll", "Latifi", "Tictum", "Zhou", "Mick", "Albon", "Magnussen", "Vettel",
  "Schumacher", "Kvyat", "Bottas", "Zhou"
]

let selectedDriver = ''
let attemptsLeft = 6
let currentGuess = ''
let guessedLetters = []
let wordLength = 0

document.addEventListener('DOMContentLoaded', () => {
  startNewGame()

  document.getElementById('submit-btn').addEventListener('click', handleGuess)
  document.getElementById('guess-input').addEventListener('input', (e) => {
    currentGuess = e.target.value.toUpperCase()
  })
})

function startNewGame() {
  // select random driver
  selectedDriver = f1Drivers[Math.floor(Math.random() * f1Drivers.length)].toUpperCase()
  wordLength = selectedDriver.length
  guessedLetters = []
  attemptsLeft = 6

  document.getElementById('attempts-left').textContent = attemptsLeft
  document.getElementById('guess-input').value = ''
  document.getElementById('guess-input').focus()

  const board = document.getElementById('board')
  board.innerHTML = ''

  for (let i = 0; i < 6; i++) {
    const row = document.createElement('div')
    row.classList.add('guess-row')
    for (let j = 0; j < wordLength; j++) {
      const tile = document.createElement('div')
      tile.classList.add('tile')
      row.appendChild(tile)
    }
    board.appendChild(row)
  }
}

function handleGuess() {
  const guess = currentGuess.trim().toUpperCase()

  if (guess.length < 3 || guess.length > 10) {
    alert("Please enter a valid F1 driver's last name between 3 and 10 letters.")
    return
  }

  const adjustedGuess = adjustGuessLength(guess)

  if (adjustedGuess.length !== wordLength) {
    alert(`Please enter a guess that matches the length of the word (${wordLength} letters).`)
    return
  }

  if (attemptsLeft <= 0) {
    alert("No attempts left! Reload the page to play again.")
    return
  }

  attemptsLeft--
  document.getElementById('attempts-left').textContent = attemptsLeft

  // guess processing
  const row = document.querySelectorAll('.guess-row')[6 - attemptsLeft - 1]
  const tiles = row.querySelectorAll('.tile')

  const feedback = checkGuess(adjustedGuess)

  feedback.forEach((status, idx) => {
    const tile = tiles[idx]
    tile.textContent = adjustedGuess[idx]
    tile.classList.add(status)

    setTimeout(() => {
      tile.style.transform = 'scale(1.2)'
      setTimeout(() => tile.style.transform = 'scale(1)', 150)
    }, 100)
  })

  if (adjustedGuess === selectedDriver) {
    setTimeout(() => {
      alert("Congratulations! You guessed the right driver!")
      startNewGame()
    }, 1000)
  } else if (attemptsLeft === 0) {
    setTimeout(() => {
      alert(`Sorry! The correct driver was: ${selectedDriver}.`)
      startNewGame()
    }, 1000)
  }
}

function adjustGuessLength(guess) {
  if (guess.length < wordLength) {
    return guess + ' '.repeat(wordLength - guess.length)
  }

  return guess.substring(0, wordLength)
}

function checkGuess(guess) {
  const feedback = []

  const selectedDriverArr = selectedDriver.split('')
  const guessArr = guess.split('')

  for (let i = 0; i < wordLength; i++) {
    if (guessArr[i] === selectedDriverArr[i]) {
      feedback.push('correct')
      selectedDriverArr[i] = null
    } else {
      feedback.push('absent')
    }
  }

  for (let i = 0; i < wordLength; i++) {
    if (feedback[i] === 'absent' && selectedDriverArr.includes(guessArr[i])) {
      feedback[i] = 'present'
      selectedDriverArr[selectedDriverArr.indexOf(guessArr[i])] = null
    }
  }

  return feedback
}
