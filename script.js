let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let count = 0;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    context.fillStyle = "lightgreen" // context da cor da area do jogo
    context.fillRect(0, 0, 16 * box, 16 * box)
}

function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}


function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

/*
Os eventos abaixo direciona a cobrinha se o evento apertar a tecla 37 (seta para esquerda), 
por exemplo, ela vai na direção da esquerda, se não vai para direita.
Se o evento for 38 a direção será para baixo, se não vai para cima.

*/

document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";

}

// Criar uma função que faça a cobrinha se mexer e parar depois de um periodo.
function iniciarJogo() {
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    /*
    O fim do jogo tem um for que representa o loop do snake. O if da execução ao for
    onde se a posição snake[0].x for igual ao let snake[i].y e snake[0].y for igual
    snake[i] ele tem que limpar/parar o jogo e informar um alerta de "Game Over"
    */
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert("Game Over :( !!! Clique em Atualizar");
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x; // posição da cobrinha do inicio do jogo no caso a snakeX ira começar na posição 0 de X e a snakey sera a 0 de Y
    let snakeY = snake[0].y;
    // abaixo tem varias condicionais que informa a direções que a cobrinha vai seguir

    if (direction == "right") snakeX += box; //se a cobrinha for para o lado direito acrescentar uma box a mais
    if (direction == "left") snakeX -= box; // mesmo caso que a de cima porem ela miminui uma box dando a ilusão de ir para esquerda
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
        document.getElementById("score").innerHTML = snake.length;
    }
    else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}

let jogo = setInterval(iniciarJogo, 100); //passando para o intervalo de 100 milesegundos a cada 100 milesegundo ela vai ser renovada

