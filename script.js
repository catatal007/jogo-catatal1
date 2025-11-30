let pontos = 0;

// Alternar telas
function mostrar(tela) {
    document.querySelectorAll(".tela").forEach(t => t.classList.add("escondido"));
    document.getElementById(tela).classList.remove("escondido");
}

function iniciarJogo() {
    mostrar("menu");
}

function voltarMenu() {
    mostrar("menu");
}

// ------------------ MATEMÁTICA ------------------------

let n1, n2;

function abrirModulo(modulo) {
    mostrar(modulo);

    if (modulo === "matematica") gerarPerguntaMatematica();
    if (modulo === "programacao") gerarPerguntaProgramacao();
    if (modulo === "htmlcss") gerarPerguntaWeb();
}

// Matemática
function gerarPerguntaMatematica() {
    n1 = Math.floor(Math.random() * 10) + 1;
    n2 = Math.floor(Math.random() * 10) + 1;

    document.getElementById("pergunta-mat").innerText =
        `Quanto é ${n1} + ${n2}?`;
}

function verificarMatematica() {
    let resp = Number(document.getElementById("resposta-mat").value);
    let feedback = document.getElementById("feedback-mat");

    if (resp === n1 + n2) {
        feedback.innerText = "Acertou! +1 ponto";
        pontos++;
    } else {
        feedback.innerText = "Errou! Tente outra.";
    }

    document.getElementById("pontos-total").innerText = pontos;

    gerarPerguntaMatematica();
}

// ------------------ PROGRAMAÇÃO ------------------------

let perguntasProg = [
    { p: "Qual é a saída de: console.log(2 + 2)?", r: "4" },
    { p: "Como se declara uma variável em JavaScript?", r: "let" },
    { p: "Qual comando imprime algo no console?", r: "console.log" }
];

let atualProg;

function gerarPerguntaProgramacao() {
    atualProg = perguntasProg[Math.floor(Math.random() * perguntasProg.length)];
    document.getElementById("pergunta-prog").innerText = atualProg.p;
}

function verificarProgramacao() {
    let resp = document.getElementById("resposta-prog").value.toLowerCase();
    let feedback = document.getElementById("feedback-prog");

    if (resp.includes(atualProg.r)) {
        feedback.innerText = "Acertou! +1 ponto";
        pontos++;
    } else {
        feedback.innerText = "Errou! Resposta correta: " + atualProg.r;
    }

    document.getElementById("pontos-total").innerText = pontos;
    gerarPerguntaProgramacao();
}

// ------------------ HTML e CSS -------------------------

let perguntasWeb = [
    { p: "Qual tag cria um título?", op: ["<img>", "<h1>", "<p>"], r: "<h1>" },
    { p: "Qual CSS muda a cor do texto?", op: ["color", "background", "border"], r: "color" },
    { p: "Qual tag cria uma imagem?", op: ["<div>", "<section>", "<img>"], r: "<img>" }
];

let atualWeb;

function gerarPerguntaWeb() {
    let c = document.getElementById("opcoes-web");
    c.innerHTML = "";

    atualWeb = perguntasWeb[Math.floor(Math.random() * perguntasWeb.length)];

    document.getElementById("pergunta-web").innerText = atualWeb.p;

    atualWeb.op.forEach(op => {
        let btn = document.createElement("button");
        btn.className = "botao";
        btn.innerText = op;
        btn.onclick = () => verificarWeb(op);
        c.appendChild(btn);
    });
}

function verificarWeb(opSelecionada) {
    let feedback = document.getElementById("feedback-web");

    if (opSelecionada === atualWeb.r) {
        feedback.innerText = "Acertou! +1 ponto";
        pontos++;
    } else {
        feedback.innerText = "Errou! Resposta correta: " + atualWeb.r;
    }

    document.getElementById("pontos-total").innerText = pontos;
    gerarPerguntaWeb();
}
