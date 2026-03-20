const terminal = document.getElementById("terminal");
const roundsLeft = document.getElementById("roundsLeft");
const button = document.getElementById("checkButton");
const selects = document.querySelectorAll(".digit-select");
//amb aquesta comanda busquem els 4 espais de digits

const MAX_INTENTS = 5;
let rondes = MAX_INTENTS;
let secret = generarCodi();
function logTerminal(misatge) {
  terminal.innerHTML += "> " + misatge + "<br>";
}


function actualizarRondes() {
  roundsLeft.textContent = rondes;
}

function generarCodi() {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 10));
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

function validateAttempt(intento) {
  let pistes = Array(4).fill("×");
  let usatSecret = Array(4).fill(false);
  let intentTemporal = [...intento];

  // primera passada: numero correcte i posicio correcta
  for (let i = 0; i < 4; i++) {
    if (intentTemporal[i] === secret[i]) {
      pistes[i] = "1";
      usatSecret[i] = true;
      intentTemporal[i] = null;
    }
  }

  // segona passada: numero correcte pero en posicio incorrecta
  for (let i = 0; i < 4; i++) {
    if (intentTemporal[i] !== null) {
      let posicio = secret.findIndex((numero, idx) => numero === intentTemporal[i] && !usatSecret[idx]);

      if (posicio !== -1) {
        pistes[i] = "Ø";
        usatSecret[posicio] = true;
      }
    }
  }

  return pistes;
}

button.addEventListener("click", () => {

    //aquesta funcio es per a que el contador no passi per sota del 0 ya que es posa negatiu en les proves
    if (rondes <= 0) {
        logTerminal("No queden més intents");
        return;
}

    const intento = Array.from(selects).map(select => Number(select.value));
    // guardem els valors  en la array, per a mes endevant fer que si els valor guardats no coincideixin es restin intents

  logTerminal("Intent: " + intento.join(", "));
  // mostrem l'intent a la terminal

    const pistes = validateAttempt(intento);
    logTerminal("Pistes: " + pistes.join(", "));

    if (pistes.every(pista => pista === "1")) {
        logTerminal("Has guanyat!");
        button.disabled = true;
        return;
}

  rondes--;
  actualizarRondes();

  if (rondes === 0) {
    logTerminal("Has perdut! El codi era: " + secret.join(""));
    button.disabled = true;
  }
});

// missatges inicials
logTerminal("joc iniciat");
logTerminal("Introdueix un codi de 4 dígits");
actualizarRondes();