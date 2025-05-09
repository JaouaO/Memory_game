const username = document.getElementById("username"),
  email = document.getElementById("email"),
  registerButton = document.getElementById("registerButton"),
  registerForm = document.getElementById("registerForm"),
  loginMail = document.getElementById(loginMail),
  loginPsw = document.getElementById(loginPsw),
  loginSubmit = document.getElementById("loginSubmit");

//confirm_password, password
let currProfile, newProfile;

fetch("js/data.json")
  .then((reponse) => reponse.json())
  .then((data) => {
    try {
      if (data.users) {
        localStorage.setItem("users", JSON.stringify(data.users));
      } else {
        throw new Error("Errors : Corruption de fichier");
      }
    } catch (error) {
      console.warn(error);
    }
  });

let dataUsers1 = localStorage.getItem("users");
console.log(dataUsers1);
let dataUsers = JSON.parse(dataUsers1);
console.log(dataUsers);

let score = [],
  bestScores = [
    ["Jaures", 40, 10, "culture", "08/05/1980"],
    ["Marie-France Gourmelon", 400, 20, "cute", "01/05/1970"],
    ["Micheline", 3, 4, "eni", "08/05/1990"],
    ["Michel", 10, 10, "culture", "08/05/1980"],
    ["Windows", 1, 1, "random", "08/05/1980"],
  ];

registerButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (registerForm.checkValidity()) {
    newProfile = {
      email: email.value.trim(),
      username: username.value.trim(),
      password: password.value,
    };
    dataUsers.push(newProfile);
    localStorage.setItem("users", JSON.stringify(dataUsers));
    console.log(dataUsers);
    alert("Profil bien créé, vous pouvez vous connecter");
  }
});

loginSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  if (registerForm.checkValidity()) {
    for (const j of dataUsers) {
      if (loginMail === j.email && loginPsw === j.password) {      
    alert("Vous êtes connecté");
      }
    }

  }
});



updateScores(score, bestScores);

function updateScores(score, bestScores) {
  bestScores.push(score);
  bestScores.sort(function (a, b) {
    return a[1] - b[1];
  });
  if (bestScores.length > 6) {
    bestScores.splice(0, 1);
  }
}

function checkSubmitMatch(item1, item2) {
  for (const j of item2) {
    console.log(j.email);
    if (item1 === j.email || item1 === j.username) {
      return true;
    }
  }
  return false;
}
function checkMail() {
  console.log("test");
  email.setCustomValidity(
    checkSubmitMatch(email.value.trim(), dataUsers)
      ? "Cet email est déjà utilisé"
      : ""
  );
}
function checkUsername() {
  username.setCustomValidity(
    checkSubmitMatch(username.value.trim(), dataUsers)
      ? "Ce nom d'utilisateur est déjà utilisé"
      : ""
  );
}

email.addEventListener("change", function (event) {
  checkMail();
  checkUsername();
});
window.addEventListener("click", (event) => {
  checkMail();
  checkUsername();
});
