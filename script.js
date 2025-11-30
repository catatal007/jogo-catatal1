body {
    margin: 0;
    background: #0d0d0d;
    font-family: Arial;
    color: white;
}

header {
    background: #111;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #444;
}

h1 {
    color: #00aaff;
}

nav button {
    background: #00aaff;
    color: black;
    border: none;
    padding: 10px 20px;
    margin-left: 10px;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s;
}

nav button:hover {
    background: #0088cc;
}

.screen {
    display: none;
    padding: 40px;
}

.visible {
    display: block;
}

.catatal-home {
    width: 250px;
    display: block;
    margin: 30px auto;
    animation: bounce 2s infinite;
}

.catatal-side {
    width: 180px;
    position: absolute;
    right: 20px;
    bottom: 20px;
    animation: float 4s infinite;
}

@keyframes bounce {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-18px); }
    100% { transform: translateY(0px); }
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
}

.question-box {
    background: #222;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 20px;
}

.question-box button {
    display: block;
    background: #00aaff;
    border: none;
    padding: 10px;
    margin: 10px 0;
    width: 100%;
    border-radius: 8px;
    cursor: pointer;
}

.result {
    font-size: 20px;
    margin-top: 10px;
}
