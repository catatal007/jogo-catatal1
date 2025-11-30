let xp = 0;

function mudarTela(id) {
    document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativo"));
    document.getElementById(id).classList.add("ativo");
}

function iniciar() {
    mudarTela("menu");
}

function voltarMenu() {
    mudarTela("menu");
}

function abrirModulo(m) {
    mudarTela(m);

    if (m === "matematica") gerarMat();
    if (m === "programacao") gerarProg();
    if (m === "htmlcss") gerarWeb();
}

/* -------- MATEMÁTICA -------- */
let a, b;

function gerarMat() {
    a = Math.floor(Math.random() * 20) + 1;
    b = Math.floor(Math.random() * 20) + 1;

    document.getElementById("pergunta-mat").innerText = `Quanto é ${a} + ${b}?`;
}

function verificarMat() {
    let resp = Number(document.getElementById("resposta-mat").value);
    if (resp === a + b) ganharXP("feedback-mat");
    else perder("feedback-mat");

    gerarMat();
}

/* -------- PROGRAMAÇÃO -------- */

let listaProg = [
    { p: "Qual comando imprime no console?", r: "console.log" },
    { p: "Como declarar variável?", r: "let" },
    { p: "2 + '2' resulta em?", r: "22" }
];

let atualProg;

function gerarProg() {
    atualProg = listaProg[Math.floor(Math.random() * listaProg.length)];
    document.getElementById("pergunta-prog").innerText = atualProg.p;
}

function verificarProg() {
    let resp = document.getElementById("resposta-prog").value.toLowerCase();
    if (resp.includes(atualProg.r)) ganharXP("feedback-prog");
    else perder("feedback-prog");

    gerarProg();
}

/* -------- HTML/CSS -------- */

let listaWeb = [
    { p: "Qual tag insere uma imagem?", op: ["<img>", "<h1>", "<p>"], r: "<img>" },
    { p: "Qual CSS muda a cor do texto?", op: ["color", "margin", "border"], r: "color" },
];

let atualWeb;

function gerarWeb() {
    let area = document.getElementById("opcoes-web");
    area.innerHTML = "";

    atualWeb = listaWeb[Math.floor(Math.random() * listaWeb.length)];

    document.getElementById("pergunta-web").innerText = atualWeb.p;

    atualWeb.op.forEach(o => {
        let btn = document.createElement("button");
        btn.className = "btn neon";
        btn.innerText = o;
        btn.onclick = () => verificarWeb(o);
        area.appendChild(btn);
    });
}

function verificarWeb(op) {
    if (op === atualWeb.r) ganharXP("feedback-web");
    else perder("feedback-web");

    gerarWeb();
}

/* -------- SISTEMA DE XP -------- */
function ganharXP(id) {
    xp++;
    document.getElementById(id).innerText = "✔ CORRETO! +1 XP";
    document.getElementById("xp-total").innerText = xp;
}

function perder(id) {
    document.getElementById(id).innerText = "✘ Resposta incorreta.";
}
