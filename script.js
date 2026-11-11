

const screens = document.querySelectorAll('.screen');
const chooseFruitBtns = document.querySelectorAll('.choose-fruit-btn');
const startBtn = document.getElementById('start-btn');
const gameContainer = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');

let seconds = 0;
let score = 0;
let selectedFruit = {};

startBtn.addEventListener('click', () => screens[0].classList.add('up'));

chooseFruitBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        selectedFruit = { src, alt };
        screens[1].classList.add('up');
        setTimeout(createFruit, 1000);
        startGame();
    });
});

function startGame() {
    setInterval(increaseTime, 1000);
}

function increaseTime() {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    timeEl.innerHTML = `Time: ${m}:${s}`;
    seconds++;
}

function createFruit() {
    const fruit = document.createElement('div');
    fruit.classList.add('fruit');
    const { x, y } = getRandomLocation();
    fruit.style.top = `${y}px`;
    fruit.style.left = `${x}px`;
    fruit.innerHTML = `<img src="${selectedFruit.src}" alt="${selectedFruit.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`;

    fruit.addEventListener('click', catchFruit);

    gameContainer.appendChild(fruit);
}

function getRandomLocation() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;
    return { x, y };
}

function catchFruit() {
    increaseScore();
    this.classList.add('caught');
    setTimeout(() => this.remove(), 2000);
    addFruits();
}

function addFruits() {
    setTimeout(createFruit, 1000);
    setTimeout(createFruit, 1500);
}

function increaseScore() {
    score++;

    if (score > 19) {
        message.classList.add('visible');
    }
    scoreEl.innerHTML = `Score: ${score}`;
}