const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let timerElement = document.getElementById('timer');
let time = 0;
let timerInterval;

function startTimer() {
  timerInterval = setInterval(() => {
    time++;
    timerElement.textContent = `Tiempo: ${time} segundos`;
  }, 1000);
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flipped');

  if (!hasFlippedCard) {
    // Primer clic
    hasFlippedCard = true;
    firstCard = this;

    if (time === 0) {
      startTimer(); // Empieza el temporizador con el primer clic
    }

    return;
  }

  // Segundo clic
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  firstCard.classList.add('match');
  secondCard.classList.add('match');

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

cards.forEach(card => card.addEventListener('click', flipCard));
