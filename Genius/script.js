let order = [];
let clickedOrder = [];
let score = 0;

//0 = verde
//1 = vermelho
//2 = amarelo
//3 = azul

const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');

let shuffle = () => {
    let sortedNumber = Math.floor(Math.random() * 4);
    order.push(sortedNumber);
    clickedOrder = [];

    for(let i in order)
    {
        lightUp(createColorElement(order[i]), Number(i) + 1);
    }
}

let lightUp = (elementColor, number) => {
    number = number * 650;
    setTimeout(() => {
        elementColor.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        elementColor.classList.remove('selected');
    }, number);
}

let orderCheck = () => {
    for(let i in clickedOrder)
    {
        if(clickedOrder[i] != order[i])
        {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length)
    {
        score++;
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        nextLevel();
    }
}

let click = (color) => {
    clickedOrder.push(color);
    elementColor = createColorElement(color);
    elementColor.classList.add('selected');

    setTimeout(() => {
        elementColor.classList.remove('selected');
        orderCheck();
    }, 250);
}

let createColorElement = (color) => {
    let colorElement;
    switch(color)
    {
        case 0:
            colorElement = green;
            break;
        case 1:
            colorElement = red;
            break;
        case 2:
            colorElement = yellow;
            break;
        case 3:
            colorElement = blue;
            break;
    }

    return colorElement;
}

let nextLevel = () => {
    shuffle();
}

let gameOver = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];
    score = 0;
    playGame();
}

let playGame = () => {
    alert("Bem vindo ao Gênio!\n Iniciando novo jogo!")
    nextLevel();
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();

