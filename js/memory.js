/* lance le jeu au click du bouton qui va bien*/
button.addEventListener("click", (event) => {
  event.preventDefault();
  setTimeout(() => {
    jeu();
  }, 100);
});
/* fonction du jeu*/
function jeu() {
  const cards = document.querySelectorAll(".memory-card");

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let score = 0;
  const scoreMessage = document.getElementById("score");
  let numPairs = document.getElementById("quantity").value;

  scoreMessage.innerText = "score : " + score;
  /*returne les cartes*/
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
  /*check si les deux cardes sont identiques */
  function checkForMatch() {
    let isMatch = firstCard.innerHTML === secondCard.innerHTML;

    isMatch ? disableCards() : unflipCards();
  }
  /*check si c'est bon et vérifie si c'est gagné et enleve la clikabilité des bonnes cartes*/
  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    checkVictory();

    resetBoard();
  }
  /*unflip */
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
  /*enlève une paire à chqu bon résultat et check si ça gagne */
  function checkVictory() {
    numPairs--;
    if (numPairs == 0) {
      setTimeout(() => {
        alert("Tu as gagné ! Ton score : " + score);
      }, 1000);
    }
  }
  /*rend clickable à nouveau les non découvertes*/
  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }
  /*mélange en fonction du nombre de cartes*/
  (function shuffle() {
    cards.forEach((card) => {
      let randomPos = Math.floor(Math.random() * (numPairs * 2));
      card.style.order = randomPos;
    });
  })();
  /*rend les cartes clickables*/
  cards.forEach((card) => card.addEventListener("click", flipCard));
}
