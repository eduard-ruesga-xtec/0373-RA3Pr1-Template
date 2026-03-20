const terminal = document.getElementById("terminal");
const roundsLeft = document.getElementById("roundsLeft");
const button = document.getElementById("checkButton");
const selects = document.querySelectorAll(".digit-select");
//amb aquesta comanda busquem els 4 espais de digits

let rondes = 5;

function logTerminal(misatge) {
  terminal.innerHTML += "> " + misatge + "<br>";
}


function actualizarRondes() {
  roundsLeft.textContent = rondes;
}

selects.forEach(select => {
  for (let i = 0; i <= 9; i++) {
//aixo crea els numeros que utilitzarem en el desplegable
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    select.appendChild(option);
  }
});

button.addEventListener("click", () => {

    const intento = Array.from(selects).map(select => Number(select.value));
    // guardem els valors  en la array, per a mes endevant fer que si els valor guardats no coincideixin es restin intents

  logTerminal("Intent: " + intento.join(", "));
  // mostrem l'intent a la terminal

  rondes--;
  // restem una ronda
  actualizarRondes();
  //actualitzem el comptador

  if (typeof validateAttempt === "function") {
    const pistes = validateAttempt(intento);
    logTerminal("Pistes: " + pistes.join(", "));
  }
});

// missatges inicials
logTerminal("Sistema iniciat");
logTerminal("Introdueix un codi de 4 dígits");
actualizarRondes();