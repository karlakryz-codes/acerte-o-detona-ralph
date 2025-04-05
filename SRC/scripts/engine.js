const state ={
    //Crie um grupo de variáveis relacionadas à interface visual (view) do jogo.”
    view: {
        //Pegue todos os elementos do HTML que têm a classe square e guarde dentro da variável squares."
        squares: document.querySelectorAll(".square"),
        //Pegue o primeiro elemento do HTML que tem a classe enemy e guarde na variável enemy.”
        enemy: document.querySelector(".enemy"),
        //“Pegue o elemento do HTML que tem o id time-left e guarde na variável timeLeft.”
        timeLeft:document.querySelector("#time-left"),
        //“Pegue o elemento do HTML que tem o id score e guarde na variável score.”
        score:document.querySelector("#score"),
     },
     //“Cria um grupo de variáveis internas que vão guardar os valores do jogo, como pontuação, tempo, e IDs de temporizadores.”
    values: {
        //“Cria uma variável chamada timerId e começa ela com valor vazio.”
        timerId:null,
        //countDownTimerId → guarda o "ID" desse intervalo, pra você poder parar ele depois com clearInterval()
        //setInterval(countDown, 1000) → executa a função countDown() a cada 1 segundo
        countDownTimerId: setInterval(countDown, 1000),
        //Define a velocidade do jogo em milissegundos (1000 ms = 1 segundo).
        gameVelocity:1000,
        //guarda a posição do quadrado que o jogador deve acertar.
        hitPosition:0,
        //pontuação do jogador começa em zero
        result:0,
        //tempo total do jogo vai ser de 60 segundos
        currentTime:60,
    },
};
//diminui o tempo do jogo a cada segundo e, quando o tempo acaba, para tudo e mostra o resultado final.
function countDown(){
    //diminuindo 1 segundo do tempo restante do jogo a cada vez que essa linha é executada
    state.values.currentTime--;
    //atualizar na tela o tempo restante do jogo, segundo por segundo.
    state.view.timeLeft.textContent = state.values.currentTime;
    //Se o tempo acabar (ou for menor ou igual a zero), então encerra o jogo
     if(state.values.currentTime <= 0){
        //Para de rodar a função countDown() a cada segundo.
        clearInterval(state.values.countDownTimerId);
        //parando outro intervalo, o que faz os quadrados mudarem no jogo
        clearInterval(state.values.timerId);
        //mostra uma janela de alerta pro jogador quando o tempo acaba
        // Mostrar modal em vez de alert
        document.querySelector("#final-score").textContent = state.values.result;
        document.querySelector("#game-over-modal").classList.remove("hidden");

    }
}
//função criada pra tocar um som quando o jogador acerta o alvo
function playSound(){
    //cria um novo objeto de áudio
    let audio = new Audio("./src/audios/hit.m4a")
    //define o volume do áudio em 20% do volume máximo
    audio.volume =0.2;
    //toca o som que você carregou com new Audio
    audio.play();

}
//quem escolhe um quadrado aleatório pra virar o alvo
function randomSquare(){
    //"Para cada quadrado da tela (com a classe .square), execute essa função."
    state.view.squares.forEach((square)=>{
        //“Remova a classe enemy desse quadrado.”
        square.classList.remove("enemy");
    });
     //"Crie um número inteiro aleatório entre 0 e o número total de quadrados (squares) - 1, e guarde ele na variável randomNumber."
    let randomNumber = Math.floor(Math.random() * state.view.squares.length); 
    //Ela pega um quadrado aleatório da tela (com a classe .square) e guarda na variável randomSquare.
    let randomSquare= state.view.squares[randomNumber];
    //“Adicione a classe enemy ao elemento armazenado na variável randomSquare.”
    randomSquare.classList.add("enemy");
    //state.values.hitPosition É a variável que armazena a posição correta que o jogador precisa acertar
    //randomSquare.id É o ID do quadrado aleatório escolhido pelo jogo 
    state.values.hitPosition= randomSquare.id;

}
//função que muda a posição do inimigo dentro do jogo, colocando ele em lugares aleatórios em intervalos de tempo
function moveEnemy(){
//“A cada 1 segundo, execute a função randomSquare, e guarde o identificador desse intervalo na variável timerId,
//  para que possamos parar ele depois se quisermos.
    state.values.timerId=setInterval(randomSquare, state.values.gameVelocity);

}
//função que adiciona ouvintes de evento (event listeners) em cada quadradinho do jogo, pra detectar quando o jogador clica neles
function addListenerHitBox(){
    //Aqui você está percorrendo cada quadrado 
    //squares contém todos os quadrados do jogo
    state.view.squares.forEach((square)=>{
        //Para cada quadrado, você está adicionando um ouvinte de evento 
        //"mousedown" significa que o código dentro da função será executado quando o botão do mouse for pressionado 
        square.addEventListener("mousedown", ()=>{
            //Verifica se o quadrado que o jogador clicou (square.id) é o mesmo que o quadrado correto (o alvo),
            //  armazenado em hitPostion.
            if(square.id === state.values.hitPosition){
                //Se acertar, aumenta a pontuação em 1.
                state.values.result++
                //Atualiza o texto do placar na tela, mostrando a pontuação atualizada.
                state.view.score.textContent = state.values.result;
                //Depois de acertar, ele zera a posição do alvo para garantir que o 
                // jogador não continue ganhando ponto se clicar no mesmo quadrado de novo antes de um novo ser sorteado.
                state.values.hitPosition = null;
                 //tocar o som no jogo
                playSound();

            }
        });
    } );

}

//Declar uma função chamada initialize, que será usada para iniciar o jogo ou o funcionamento do sistema.”
function initialize(){
    //Começa a movimentar o inimigo de forma aleatória
    moveEnemy();
    //Adiciona os eventos de clique pra saber se o jogador acertou o inimigo
    addListenerHitBox();
}
//Executa tudo acima assim que o jogo é carregado
initialize();
//Executa tudo acima assim que o jogo é carregado
initialize();

// Função para reiniciar o jogo
function restartGame() {
    //Interrompe o timer que move o inimigo.
    clearInterval(state.values.timerId);
    //Interrompe o contador regressivo 
    clearInterval(state.values.countDownTimerId);
    //Zera a pontuação do jogador para começar do zero.
    state.values.result = 0;
    //reinicia o tempo do jogo para 60 segundos 
    state.values.currentTime = 60;
    //Atualiza na tela o placar (pontuação) para mostrar zero novamente.
    state.view.score.textContent = 0;
    //tualiza na tela o tempo restante para 60.
    state.view.timeLeft.textContent = 60;
    //impa o campo antes de recomeçar, tirando o inimigo da tela.
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
     //reinicia o cronômetro do jogo
    state.values.countDownTimerId = setInterval(countDown, 1000);
    //faz o inimigo voltar a se mover aleatoriamente pelos quadrados
    moveEnemy();
}

// Evento de clique no botão de reinício
document.querySelector("#restart-button").addEventListener("click", () => {
    restartGame();

    const btn = document.querySelector("#restart-button");
    btn.classList.add("rotate");

    setTimeout(() => {
        btn.classList.remove("rotate");
    }, 1000);
});
// Evento para botão "Jogar Novamente" dentro do modal
document.querySelector("#restart-button-modal").addEventListener("click", () => {
    document.querySelector("#game-over-modal").classList.add("hidden");
    restartGame();
});


