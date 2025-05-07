const eniSet = [];
const cuteSet = [];
const cultureSet = [];
let randomSet = [];

const eniSetNum = 6;
const cultureSetNum = 12;
const cuteSetNum = 24;
const randomSetNum = cultureSetNum + cuteSetNum + eniSetNum;

const eniName = "eni";
const cuteName = "cute";
const cultureName = "culture";
const randomName = "random";


/* initialisation des sets en fonction du nom, et du nombre de possibilités*/
initSet(eniSet, eniSetNum, eniName);
initSet(cultureSet, cultureSetNum, cultureName);
initSet(cuteSet, cuteSetNum, cuteName);
initRandom();

const radioButton = document.getElementById("radioSelect");
const quantitySelector = document.getElementById("quantity");

/* préselectionne le set Eni de base*/
let selectedSet = eniSet;
document.getElementById("radioEni").checked = true;


/*permet de changer de set, et d'empecher de mettre plus de paires que le nombre dispo */
radioButton.addEventListener("change", function (event) {
  let ele = document.getElementsByName("test");

  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      let maxValue;

      switch (ele[i].value) {
        case "eni":
          maxValue = eniSetNum;
          selectedSet = eniSet;
          break;
        case "culture":
          maxValue = cultureSetNum;
          selectedSet = cultureSet;
          break;
        case "cute":
          maxValue = cuteSetNum;
          selectedSet = cuteSet;
          break;
        case "random":
          maxValue = randomSetNum;
          selectedSet = randomSet;
          break;
      }
      quantitySelector.max = maxValue;
      if (quantitySelector.value > maxValue) {
        quantitySelector.value = maxValue;
      }
    }
  }
});

let button = document.getElementById("submitQuantity");

/*idem globalement, double check au cas où */
button.addEventListener("click", (event) => {
  event.preventDefault();

function f(){
  let ele = document.getElementsByName("test");

  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      let maxValue;

      switch (ele[i].value) {
        case "eni":
          maxValue = eniSetNum;
          selectedSet = eniSet;
          break;
        case "culture":
          maxValue = cultureSetNum;
          selectedSet = cultureSet;
          break;
        case "cute":
          maxValue = cuteSetNum;
          selectedSet = cuteSet;
          break;
        case "random":
          maxValue = randomSetNum;
          selectedSet = randomSet;
          break;
      }
      quantitySelector.max = maxValue;
      if (quantitySelector.value > maxValue) {
        quantitySelector.value = maxValue;
      }
    }
  }
}

/* initialise le jeu en fonction du set et du nbre de cartes*/
f();

  const gamePlacement = document.getElementById("gamePlacement");
  gamePlacement.innerHTML = "<div></div>";
  let numPairs = document.getElementById("quantity").value;
  const randomizedNumberSet = new Set();
  while (randomizedNumberSet.size < numPairs) {
    randomizedNumberSet.add(Math.floor(Math.random() * selectedSet.length));

  }
  const randomizedNumberArray = [...randomizedNumberSet];
  for (let i = 1; i <= numPairs; i++) {
    let j = randomizedNumberArray[i - 1];
    addcard(i, j, selectedSet);
    addcard(i, j, selectedSet);
  }
});


/* idem*/
function addcard(i, j, selectedSet) {
  let nameFront = selectedSet[j][1];
  let nameBack = "";
  let numCard = j+1;
    if (selectedSet != randomSet) {
    nameBack = selectedSet[j][1];
  } else {
    nameBack = "random";
    numCard = selectedSet[j][0];
  }

  const gamePlacement = document.getElementById("gamePlacement");
  let card = gamePlacement.cloneNode(true);
  card.name = "card" + i;
  card.classList.remove("memory-game");
  card.classList.add("memory-card");
  card.innerHTML =
    `<img class="front-face" src="assets/images/${nameFront}/` +
    `${numCard}.webp" alt="${i}" />\n<img class="back-face" src="assets/images/${nameBack}/back.webp" alt="back" />`;
  gamePlacement.appendChild(card);
}

function initSet(setName, setNum, name) {
  for (let i = 1; i <= setNum; i++) {
    setName[i - 1] = [i, name];
  }
}

function addSetToRandom(setName, setNum, i) {
  for (let j = 0; j <= setNum - 1; j++) {
    randomSet[i] = setName[j];
    i++;
  }
}

function initRandom() {
  let i = 0;
  addSetToRandom(eniSet, eniSetNum, i);
  i += eniSetNum;
  addSetToRandom(cultureSet, cultureSetNum, i);
  i += cultureSetNum;
  addSetToRandom(cuteSet, cuteSetNum, i);
}
