const password = document.getElementById("password"),
  confirm_password = document.getElementById("confirm_password"),
  pswrdStrength = document.getElementById("pswrdStrength");

const regEx = /(?=.*\d)(?=.*[a-z])(?=.*[^\w\s]).{6,}/;


/* vérifie la validité et la force du mdp, si c'est pas bon met le petit message qui va bien*/
function validatePassword() {
  confirm_password.setCustomValidity(
    password.value != confirm_password.value
      ? "Les mots de passe ne correspondent pas"
      : ""
  );
  if(regEx.test(password.value)){
  if (password.value.length < 8) {
    pswrdStrength.innerHTML = "<span>faible</span>";
  } else if (password.value.length < 10) {
    pswrdStrength.innerHTML = "<span>faible</span> <span>moyen</span>";
  } else {
    pswrdStrength.innerHTML = "<span>faible</span> <span>moyen</span> <span>fort</span>";
  }
  }else{
    pswrdStrength.innerHTML = "";
  }
}


/* check si c'est bon*/
password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;
