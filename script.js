let level = "easy";

function startGame() {
    document.getElementById("gameSection").classList.remove("hidden");
}

function setLevel(lvl) {
    level = lvl;
    loadQuestion();
}

async function loadQuestion() {
    const response = await fetch("/.netlify/functions/generate-questions");
    const data = await response.json();

    document.getElementById("questionBox").classList.remove("hidden");
    document.getElementById("questionText").innerText = data.question;

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    data.options.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = () => checkAnswer(option, data.correct);
        answersDiv.appendChild(btn);
    });
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        alert("Acertou! 🎉");
        loadQuestion();
    } else {
        alert("Errou! ❌ Tente novamente.");
    }
}
