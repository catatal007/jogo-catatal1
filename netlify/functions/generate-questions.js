exports.handler = async () => {
    const questions = [
        {
            question: "O que é uma variável?",
            options: ["Uma caixinha que guarda dados", "Um erro", "Um botão", "Um site"],
            correct: "Uma caixinha que guarda dados"
        },
        {
            question: "O que significa IF?",
            options: ["Enquanto", "Se", "Quando", "Depois"],
            correct: "Se"
        },
        {
            question: "O que é um loop?",
            options: ["Repetição", "Imagem", "Número", "Condição"],
            correct: "Repetição"
        },
        {
            question: "O que é um algoritmo?",
            options: ["Um conjunto de passos", "Uma música", "Um vírus", "Um robô"],
            correct: "Um conjunto de passos"
        },
        {
            question: "O que é lógica de programação?",
            options: ["Pensar passo a passo", "Criar artes", "Acelerar o PC", "Aumentar FPS"],
            correct: "Pensar passo a passo"
        }
    ];

    const random = questions[Math.floor(Math.random() * questions.length)];

    return {
        statusCode: 200,
        body: JSON.stringify(random)
    };
};
