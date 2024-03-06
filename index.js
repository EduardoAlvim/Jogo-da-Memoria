window.onload = criarJogo;

const cartas = [
    {
        nome: "1",
        img: "img/1.png"
    },
    {
        nome: "1",
        img: "img/1.png"
    },
    {
        nome: "2",
        img: "img/2.png"
    },
    {
        nome: "2",
        img: "img/2.png"
    },
    {
        nome: "3",
        img: "img/3.png"
    },
    {
        nome: "3",
        img: "img/3.png"
    },
    {
        nome: "4",
        img: "img/4.png"
    },
    {
        nome: "4",
        img: "img/4.png"
    },
    {
        nome: "5",
        img: "img/5.png"
    },
    {
        nome: "5",
        img: "img/5.png"
    },
    {
        nome: "6",
        img: "img/6.png"
    },
    {
        nome: "6",
        img: "img/6.png"
    }
];  //vetor de cartas que serão adicionadas à div.

const jogo = document.getElementById("jogo");   //div que mostrará o jogo.
const bt = document.getElementById("reiniciarJogo");    //botão de reinício.
const pontuacao = document.getElementById("pontuacao"); //span da pontuação.
const audio = document.querySelector('audio');

let contador=0; //contador de acertos, para apresentar mensagem de fim de jogo ao acertar todas as cartas.
let pts=0;  //contador de pontos
let escolhidas = [];    //coleta as cartas selecionadas pelo jogador.

bt.addEventListener("click",reiniciar); //atribuição de evento no botão.

//função para a criação do grid de cartas.
function criarJogo() {
    //embaralhamento das cartas.
    cartas.sort(()=>{
        return 0.5 - Math.random();
    });

    //mostrando pontuação no começo do jogo (zero).
    pontuacao.textContent = pts;

    //criação dos elementos img que serão inseridos na div 'jogo'.
    for(let i=0; i<cartas.length; i++){
        let carta = document.createElement("img");
        carta.id = i;
        carta.name = cartas[i].nome;
        carta.src = "img/padrao.png";  //atribui uma imagem padrão para todos, que representa a parte traseira das cartas.
        carta.addEventListener("click", selecionarCarta) //atribuição de evento nas cartas, que ao serem clicados chamarão a função selecionarCarta.
        jogo.appendChild(carta); //adição dos elementos criados (carta) para a div (jogo).
    }
}

//função para selecionar e checar as cartas
function selecionarCarta() {
    let carta = this;
    carta.src = cartas[carta.id].img;
    escolhidas.push(carta); //a carta selecionada é inserida no vetor 'escolhidas'.

    //ao selecionar duas cartas, entramos na primeira condição.
    if(escolhidas.length == 2){ 
        let primeiraCarta = escolhidas[0];
        let segundaCarta = escolhidas[1];

        //na verificação abaixo, vemos se o usuário clicou duas vezes na mesma carta ou em cartas distintas, 
        //pois os nomes são iguais mas os IDs são diferentes.
        if(primeiraCarta.id != segundaCarta.id){
            if(primeiraCarta.name == segundaCarta.name){
                setTimeout(()=>{
                    primeiraCarta.src = "img/acerto.png";
                    segundaCarta.src = "img/acerto.png";
                },1000);
                primeiraCarta.removeEventListener("click",selecionarCarta);
                segundaCarta.removeEventListener("click",selecionarCarta);
                pts+=10;
                pontuacao.textContent = pts;
                contador++;
            }else{
                setTimeout(()=>{
                    primeiraCarta.src = "img/padrao.png";
                    segundaCarta.src = "img/padrao.png";
                },1000);
                pts-=5;
                pontuacao.textContent = pts;
            }
    
            //inserimos 6 pares de imagens, portanto ao chegar em 6 acertos, o jogo estará finalizado.
            if(contador == (cartas.length/2)){
                audio.currentTime=0;
                audio.play();
                setTimeout(()=>{
                    alert("PARABÉNS! Você completou o jogo!");
                },1000);  
            }
        //caso a condição da linha 97 não seja atendida, informamos ao usuário o motivo e retornamos as cartas para a imagem padrão.
        }else{
            primeiraCarta.src = "img/padrao.png";
            segundaCarta.src = "img/padrao.png";
            alert("Aí não né parça! Selecione cartas distintas...");
        }

        //zeramos o vetor de cartas escolhidas para que o mesmo 'colete' mais um par de cartas.
        escolhidas = [];
    }
}

// função atribuída ao botão de reinício, onde a mesma zera o contador de pares, os pontos, 
// as cartas escolhidas (caso o jogador selecione uma carta e clique em reiniciar antes de selecionar a próxima), 
// e por fim 'limpa' a div jogo.
function reiniciar() {
    audio.pause();
    contador=0
    pts=0;
    pontuacao.textContent = pts;
    jogo.innerHTML = "";
    criarJogo();
    escolhidas = [];
}