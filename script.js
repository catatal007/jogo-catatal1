function openScreen(screenId) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("visible"));
    document.getElementById(screenId).classList.add("visible");
}

/* ------------------ MATEMÁTICA ------------------ */
let n1 = Math.floor(Math.random() * 10);
let n2 = Math.floor(Math.random() * 10);

document.getElementById("math-question").innerHTML =
    `Quanto é <strong>${n1} + ${n2}</strong>?`;

function checkMath() {
    const answer = document.getElementById("math-answer").value;
    const result = document.getElementById("math-result");

    if (answer == n1 + n2) {
        result.textContent = "✔️ Muito bem! Você acertou!";
        result.style.color = "lime";
    } else {
        result.textContent = "❌ Resposta incorreta. Tente novamente!";
        result.style.color = "red";
    }
}

/* ------------------ PROGRAMAÇÃO ------------------ */
function checkProg(option) {
    const result = document.getElementById("prog-result");

    if (option === "b") {
        result.textContent = "✔️ Correto! document.write() mostra algo na tela.";
        result.style.color = "lime";
    } else {
        result.textContent = "❌ Errado. Tente novamente.";
        result.style.color = "red";
    }
}

/* ------------------ HTML/CSS ------------------ */
function checkHtml(option) {
    const result = document.getElementById("html-result");

    if (option === "b") {
        result.textContent = "✔️ Isso aí! A tag <p> cria parágrafos.";
        result.style.color = "lime";
    } else {
        result.textContent = "❌ Não é essa. Tente outra.";
        result.style.color = "red";
    }
}
