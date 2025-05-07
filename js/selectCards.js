

const eniSet =[1,2,3,4,5,6];
let button = document.getElementById("submitQuantity");



button.addEventListener("click", (event) => {
  event.preventDefault();
   let numPairs = document.getElementById("quantity").value;
  console.log("test" + numPairs);
  for (let i = 1; i <= numPairs; i++) {
    addcard(i);
    addcard(i)
  }
 
});

function addcard(i){
const gamePlacement = document.getElementById("gamePlacement");
let card = gamePlacement.cloneNode(true);
console.log("test" + i);
card.name = "card" + i;
card.classList.remove("memory-game");
card.classList.add("memory-card");
card.innerHTML =
  '<img class="front-face" src="assets/images/' +
  i +
  '.webp" alt="' +
  i +
  '" />\n<img class="back-face" src="assets/images/back.webp" alt="back" />';
gamePlacement.appendChild(card);
}
