const f1Drivers = [
  "Verstappen", "Norris", "Leclerc", "Piastri", "Sainz", "Russell", "Hamilton", "Perez", "Alonso",
  "Hulkenberg", "Gasly", "Tsunoda", "Stroll", "Ocon", "Magnussen", "Albon", "Ricciardo", "Bearman", "Colapinto",
  "Zhou", "Lawson", "Bottas", "Sargeant"
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
  selectedDriver = f1Drivers[Math.floor(Math.random() * f1Drivers.length)].toUpperCase()
  wordLength = selectedDriver.length

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

  document.getElementById('guess-input').value = ''
  document.getElementById('guess-input').focus()
  document.getElementById('attempts-left').textContent = 6
  attemptsLeft = 6
}

function handleGuess() {
  const guess = currentGuess.trim().toUpperCase()

  if (guess.length < 4 || guess.length > 10) {
    alert("Please enter a valid F1 driver's last name between 4 and 10 letters.")
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
      showModal('win-modal')
      startNewGame()
    }, 1000)
  } else if (attemptsLeft === 0) {
    setTimeout(() => {
      showModal('lose-modal')
      document.getElementById('lose-modal-message').textContent = `Sorry! The correct driver was: ${selectedDriver}.`
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

function showModal(modalId) {
  const modal = document.getElementById(modalId)
  modal.style.display = "block"
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  modal.style.display = "none"
}

document.getElementById('win-modal-close').addEventListener('click', () => closeModal('win-modal'))
document.getElementById('lose-modal-close').addEventListener('click', () => closeModal('lose-modal'))
