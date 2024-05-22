// document.querySelector('.app__card-button--curto')

// document.querySelectorAll('button')

// document.getElementsByClassName('app__card-button--curto')

// document.getElementById('start-pause')

// O DOM, que significa Modelo de Objeto de Documentos, não se resume ao documento em si. Ele é uma estrutura em forma de nós de árvore que combina diversos elementos, como arquivos HTML, CSS, JavaScript e outras APIs inseridas no projeto.
// O DOM captura todos esses elementos, os organiza em uma hierarquia de nós e cria uma representação visual do conteúdo na tela do navegador.
// O que é apresentado no navegador é uma representação do DOM. O objeto global "document" é uma referência ao HTML e pode ser visto como um nível imediatamente abaixo do DOM, ajudando a interagir com o conteúdo e os elementos da página.


//Página

const html = document.querySelector('html');

const focoBT = document.querySelector('.app__card-button--foco');
const longoBT = document.querySelector('.app__card-button--longo');
const curtoBT = document.querySelector('.app__card-button--curto');

//Botões

const startPauseButton = document.getElementById('start-pause');
const buttonIcon = document.querySelector('.app__card-primary-butto-icon');
const buttonText = startPauseButton.querySelector('span');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.getElementById('alternar-musica');

//Música

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const musicaPause = new Audio('/sons/pause.mp3');
const musicaPlay = new Audio('/sons/play.wav');
const musicaAlert = new Audio('/sons/beep.mp3');
musica.loop = true;

//Banner

const displayTempo = document.querySelector('#timer');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const tituloStrong = document.querySelector('.app__title-strong');

//Tempo do Timer

const duracaoFoco = 1500; 
const duracaoDescansoCurto = 300; 
const duracaoDescansoLongo = 900;
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

//Tempo na Tela

const tempoNaTela = document.getElementById('timer');




//Alterar Elementos da Página ao Click do Botão

focoBT.addEventListener('click', function() {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBT.classList.add('active')
});

curtoBT.addEventListener('click', function() {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBT.classList.add('active')
});

longoBT.addEventListener('click', function() {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBT.classList.add('active')
});

// Alterando Contexto

function alterarContexto (contexto){
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    mostrarTempo();

    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')})
    
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = 'Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>'
            break;
    
        case 'descanso-curto':
            titulo.innerHTML = 'Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>'
            break;

        case 'descanso-longo':
            titulo.innerHTML = 'Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>'
            break;
    
        default:
            break;
    }
}


// Play Musica

musicaFocoInput.addEventListener('change', function () {
        if (musica.paused) {
            musica.play();
        } else {
            musica.pause();
        }
    });


//Timer

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        musicaAlert.play()
        alert('Tempo finalizado!')

        const focoAtivo = html.getAttribute('data-contexto') == 'foco'

        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')  // Se o meu foco está ativo, pegamos o atributo do HTML e vemos se é "foco", criamos um novo evento customizado, CustomEvent, e o nome desse evento customizado é FocoFinalizado. 
            document.dispatchEvent(evento) // Dispatch desse evento. Agora, outras partes da aplicação Fokus podem ouvir e reagir a esse evento.
        }

        zerar()
        return

    }

    tempoDecorridoEmSegundos -= 1
    mostrarTempo();
}

function iniciar() {

    if(intervaloId){  
        musicaPause.play()
        zerar()
        return
    }
    musicaPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000) // Executa o contagemRegressiva varias vezes a cada 1s até tempoDecorridoEmSegundos for igual a 0
}

function zerar() {
    clearInterval(intervaloId) 
    intervaloId = null
}


function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'}) //toLocaleTimeString nativo do obj Date.
    tempoNaTela.innerHTML = `${tempoFormatado}`
}


mostrarTempo() //Exibir sempre o tempo na tela



// startPauseButton.addEventListener('click', iniciar)

// Alterando Icone e Texto do Botão Play/Pause do Timer - Inicia/Pausa Timer

startPauseButton.addEventListener('click', function(){

    iniciar()

    if (buttonIcon.getAttribute('src') === '/imagens/play_arrow.png') {
        buttonIcon.setAttribute('src', '/imagens/pause.png');
        buttonText.innerText = 'Pausar';
        //buttonText.textContent = 'Pausar';
    } 
    
    else {
        buttonIcon.setAttribute('src', '/imagens/play_arrow.png');
        buttonText.innerText = 'Começar';
        //buttonText.textContent = 'Começar';
    }
});
















// focoBT.addEventListener('click', function(){
//     html.setAttribute('data-contexto', 'foco');
//     banner.setAttribute('src', '/imagens/foco.png' );
//     });

// curtoBT.addEventListener('click', function(){
//     html.setAttribute('data-contexto', 'descanso-curto');
//     banner.setAttribute('src', '/imagens/descanso-curto.png' );
// });
    
// longoBT.addEventListener('click', function(){
//     html.setAttribute('data-contexto', 'descanso-longo');
//     banner.setAttribute('src', '/imagens/descanso-longo.png' );
//     });
