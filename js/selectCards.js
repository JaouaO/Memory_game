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

initSet(eniSet, eniSetNum, eniName);
initSet(cultureSet, cultureSetNum, cultureName);
initSet(cuteSet, cuteSetNum, cuteName);
initRandom();

const radioButton = document.getElementById("radioSelect");
const quantitySelector = document.getElementById("quantity");

let selectedSet = eniSet;
document.getElementById("radioEni").checked = true;



radioButton.addEventListener("change", function (event) {
  let ele = document.getElementsByName("test");

  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      let maxValue;
      console.log("alors ?" + ele[i].value);

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

button.addEventListener("click", (event) => {
  event.preventDefault();
  const gamePlacement = document.getElementById("gamePlacement");
  gamePlacement.innerHTML = "<div></div>";
  let numPairs = document.getElementById("quantity").value;
  console.log("test" + numPairs);
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

function addcard(i, j, selectedSet) {
  let nameFront = selectedSet[j][1];
  let nameBack = "";
  let numCard = j;
    if (selectedSet != randomSet) {
    nameBack = selectedSet[j][1];
  } else {
    nameBack = "random";
    numCard = selectedSet[j][0];
    console.log(selectedSet[j][0]);
  }

  const gamePlacement = document.getElementById("gamePlacement");
  let card = gamePlacement.cloneNode(true);
  console.log("test" + i);
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
  console.log(setName);
}

function addSetToRandom(setName, setNum, i) {
  for (let j = 0; j <= setNum - 1; j++) {
    randomSet[i] = setName[j];
    i++;
  }
  console.log(randomSet);
}

function initRandom() {
  let i = 0;
  addSetToRandom(eniSet, eniSetNum, i);
  i += eniSetNum;
  addSetToRandom(cultureSet, cultureSetNum, i);
  i += cultureSetNum;
  addSetToRandom(cuteSet, cuteSetNum, i);
}
