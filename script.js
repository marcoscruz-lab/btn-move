const btnNao = document.getElementById('btnNao');
const contador = document.getElementById('contador');
const numTentativas = document.getElementById('numTentativas');
let tentativas = 0;
let petalasAtivas = [];

const frases = [
    "EXPERIMENTA O SIM? 😊",
    "NÃO? 🥺",
    "POR QUE NÃO? 🤔",
    "ASSISTO CREPÚSCULO COM VOCÊ 🌅",
    "URUCUBADA KKKKKKK",
    "NEM FEZ SENTIDO A ANTERIOR 😅",
    "O SIM É MELHOR! 😄",
    "TÁ BOM... JÁ ENTENDI 😞",
];

// Iniciar com tema dia
document.body.classList.add('dia');

// Iniciar pétalas caindo suavemente
function criarPetala() {
    const petala = document.createElement('div');
    petala.className = 'petala';
    petala.textContent = '🌻';

    petala.style.left = Math.random() * 100 + '%';
    petala.style.fontSize = (Math.random() * 1 + 0.5) + 'rem';

    const duracao = (Math.random() * 15 + 10) + 's';
    const delay = Math.random() * 5 + 's';

    petala.style.animationDuration = duracao;
    petala.style.animationDelay = delay;

    document.body.appendChild(petala);
    petalasAtivas.push(petala);

    // Remover após a animação
    setTimeout(() => {
        petala.remove();
        petalasAtivas = petalasAtivas.filter(p => p !== petala);
    }, (parseFloat(duracao) + parseFloat(delay)) * 1000);
}

// Criar pétalas continuamente
function iniciarPetalas() {
    for (let i = 0; i < 15; i++) {
        criarPetala();
    }
    setInterval(() => {
        if (petalasAtivas.length < 15) {
            criarPetala();
        }
    }, 2000);
}

iniciarPetalas();

function fugir(e) {
    e.preventDefault();
    tentativas++;

    btnNao.classList.add('fugindo');

    const maxX = window.innerWidth - btnNao.offsetWidth - 20;
    const maxY = window.innerHeight - btnNao.offsetHeight - 20;

    const novoX = Math.random() * maxX;
    const novoY = Math.random() * maxY;

    btnNao.style.left = novoX + 'px';
    btnNao.style.top = novoY + 'px';

    // Mudar o texto do botão com frases engraçadas
    if (tentativas <= frases.length) {
        btnNao.textContent = frases[tentativas - 1];
    } else {
        btnNao.textContent = 'F NÃO SOBROU NADA PRO BETA';
    }
}

function aceitou() {
    const celebration = document.getElementById('celebration');
    const container = document.querySelector('.container');

    container.classList.add('esconder');

    setTimeout(() => {
        celebration.classList.add('active');
    }, 500);

    // transição para noite
    document.body.classList.remove('dia');
    document.body.classList.add('noite');

    petalasAtivas.forEach(p => p.remove());
    petalasAtivas = [];

    // Criar girassóis caindo
    for (let i = 0; i < 500; i++) {
        setTimeout(() => criarGirassol(), i * 100);
    }
    // setTimeout(() => {
    //     window.location.href = 'https://youtu.be/Af7ieNv0wXY?t=93';
    // }, 5000);
}

function criarGirassol() {
    const girassol = document.createElement('div');
    girassol.className = 'sunflower';
    girassol.textContent = '🌻';

    girassol.style.left = Math.random() * window.innerWidth + 'px';
    girassol.style.top = '-50px';

    const duracao = 3000 + Math.random() * 2000;
    girassol.style.animationDuration = duracao + 'ms';

    document.body.appendChild(girassol);

    setTimeout(() => girassol.remove(), duracao);
}

// Easter Egg - Clicar no girassol
let cliquesGirassol = 0;
function easterEgg() {
    cliquesGirassol++;

    if (cliquesGirassol === 3) {
        const easterEggMsg = document.getElementById('easterEgg');
        easterEggMsg.classList.add('ativo');

        // Criar explosão de girassóis
        for (let i = 0; i < 20; i++) {
            setTimeout(() => criarGirassol(), i * 50);
        }

        setTimeout(() => {
            easterEggMsg.classList.remove('ativo');
            cliquesGirassol = 0;
        }, 7000);
    }
}
