button.addEventListener("click", (event) => {
  event.preventDefault();
  setTimeout(() => {
    jeu();
  }, 100);
  console.log("testazdazdazd");
});

function jeu() {
  const cards = document.querySelectorAll(".memory-card");

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let score = 0;
  const scoreMessage = document.getElementById("score");
  let numPairs = 6;

  scoreMessage.innerText = "score : " + score;

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;

      return;
    }

    secondCard = this;
    checkForMatch();
  }

  function checkForMatch() {
    let isMatch =
      firstCard.innerHTML ===
      secondCard.innerHTML;

    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    checkVictory();

    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;
    score++;
    scoreMessage.innerText = "score : " + score;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");

      resetBoard();
    }, 1500);
  }

  function checkVictory() {
    numPairs--;
    if (numPairs == 0) {
      setTimeout(() => {
        alert("Tu as gagné ! Ton score : " + score);
      }, 1500);
    }
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  (function shuffle() {
    cards.forEach((card) => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  })();

  cards.forEach((card) => card.addEventListener("click", flipCard));
}
