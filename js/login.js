const loginMail = document.getElementById("loginMail"),
  loginPsw = document.getElementById("loginPsw"),
  loginSubmit = document.getElementById("loginSubmit"),
  loginForm = document.getElementById("loginForm");

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
let dataUsers = JSON.parse(dataUsers1);

loginSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  if (loginForm.checkValidity()) {
    for (const j of dataUsers) {
      if (loginMail.value === j.email && loginPsw.value === j.password) {
        alert("Vous êtes connecté");
        return;
      }
    }
    loginPsw.setCustomValidity("Le mot de passe est incorrect");
  }
});

function checkThisMail() {
  loginMail.setCustomValidity(!
    checkSubmitMatch(loginMail.value.trim(), dataUsers)
      ? "Cet email ne possède pas de compte"
      : ""
  );
}

loginMail.addEventListener("change", function (event) {
  checkThisMail();
});
window.addEventListener("click", (event) => {
  checkThisMail();
});
function checkSubmitMatch(item1, item2) {
  for (const j of item2) {
    if (item1 === j.email) {
      return true;
    }
  }
  return false;
}