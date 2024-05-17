// document.querySelector('.app__card-button--curto')

// document.querySelectorAll('button')

// document.getElementsByClassName('app__card-button--curto')

// document.getElementById('start-pause')

// O DOM, que significa Modelo de Objeto de Documentos, não se resume ao documento em si. Ele é uma estrutura em forma de nós de árvore que combina diversos elementos, como arquivos HTML, CSS, JavaScript e outras APIs inseridas no projeto.
// O DOM captura todos esses elementos, os organiza em uma hierarquia de nós e cria uma representação visual do conteúdo na tela do navegador.
// O que é apresentado no navegador é uma representação do DOM. O objeto global "document" é uma referência ao HTML e pode ser visto como um nível imediatamente abaixo do DOM, ajudando a interagir com o conteúdo e os elementos da página.


const html = document.querySelector('html');

const focoBT = document.querySelector('.app__card-button--foco');

const longoBT = document.querySelector('.app__card-button--longo');

const curtoBT = document.querySelector('.app__card-button--curto');

const startPauseButton = document.getElementById('start-pause');
const buttonIcon = document.querySelector('.app__card-primary-butto-icon');
const buttonText = startPauseButton.querySelector('span');
const botoes = document.querySelectorAll('.app__card-button');







const displayTempo = document.querySelector('#timer');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const tituloStrong = document.querySelector('.app__title-strong');


const duracaoFoco = 1500; 
const duracaoDescansoCurto = 300; 
const duracaoDescansoLongo = 900; 


focoBT.addEventListener('click', function() {
    alterarContexto('foco');
    focoBT.classList.add('active')
});

curtoBT.addEventListener('click', function() {
    alterarContexto('descanso-curto');
    curtoBT.classList.add('active')
});

longoBT.addEventListener('click', function() {
    alterarContexto('descanso-longo');
    longoBT.classList.add('active')
});

// Alterando Contexto

function alterarContexto (contexto){
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);

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

// Alterando Icone e Texto do Botão Play/Pause

startPauseButton.addEventListener('click', function(){
    if (buttonIcon.getAttribute('src') === '/imagens/play_arrow.png') {
        buttonIcon.setAttribute('src', '/imagens/pause.png');
        buttonText.innerText = 'Pausar';
    } 
    
    else {
        buttonIcon.setAttribute('src', '/imagens/play_arrow.png');
        buttonText.innerText = 'Começar';
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
