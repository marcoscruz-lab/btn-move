const btnNao = document.getElementById('btnNao');
const numTentativas = document.getElementById('numTentativas');
const musicaFundo = document.getElementById('musicaFundo');
const musicControl = document.getElementById('musicControl');
let tentativas = 0;
let petalasAtivas = [];
let musicaTocando = false;

const frases = [
    "EXPERIMENTA O SIM? 😊",
    "O SIM É MELHOR! 😄",
    "NÃO? 🥺",
    "POR QUE NÃO? 🤔",
    "ASSISTO CREPÚSCULO COM VOCÊ 🌅",
    "URUCUBADA KKKKKKK",
    "NEM FEZ SENTIDO A ANTERIOR 😅",
    "TÁ BOM... JÁ ENTENDI 😞",
];

// Iniciar com tema dia
document.body.classList.add('dia');

// configura volume da música de fundo
musicaFundo.volume = 0.1;

function toggleMusic() {
    if (musicaTocando) {
        musicaFundo.pause();
        musicControl.textContent = '🔇';
        musicaTocando = false;
    } else {
        musicaFundo.play();
        musicControl.textContent = '🎵';
        musicaTocando = true;
    }
}

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

    if (tentativas <= frases.length) {
        btnNao.textContent = frases[tentativas - 1];
    } else {
        btnNao.textContent = 'COMPREENSIVO, PASSAR BEM';
    }
}

function aceitou() {
    const celebration = document.getElementById('celebration');
    const container = document.querySelector('.container');

    // Esconder o container
    container.classList.add('esconder');

    // Mostrar celebração após a animação
    setTimeout(() => {
        celebration.classList.add('active');
    }, 1000);

    // Transição para noite
    document.body.classList.remove('dia');
    document.body.classList.add('noite');

    // Remover pétalas suaves
    petalasAtivas.forEach(p => p.remove());
    petalasAtivas = [];

    // Criar emojis caindo em celebração
    for (let i = 0; i < 50000; i++) {
        setTimeout(() => criarEmoji(), i * 20);
    }

    // iniciar musica apos clicar em sim
    setTimeout(() => {
        musicaFundo.play().then(() => {
            musicaTocando = true;
            musicControl.style.display = 'flex';
            musicControl.textContent = '🎵';
        }).catch(err => {
            console.log('Erro ao tocar música:', err);
        });
    }, 500);
}

function criarEmoji() {
    const emojis = [...'🩵💙'];

    emojis.forEach(emoji => {
        const girassol = document.createElement('div');
        girassol.className = 'sunflower';
        girassol.textContent = emoji;

        girassol.style.left = Math.random() * window.innerWidth + 'px';
        girassol.style.top = '-50px';

        const duracao = 3000 + Math.random() * 2000;
        girassol.style.animationDuration = duracao + 'ms';

        document.body.appendChild(girassol);

        setTimeout(() => girassol.remove(), duracao);
    });
}

// Easter Egg
let cliquesEmoji = 0;
let easterEggWindow = null;
function easterEgg() {
    cliquesEmoji++;

    if (cliquesEmoji === 3) {
        easterEggWindow = window.open(
            'easter-egg.html',
            'easter-egg',
            'width=700,height=600'
        );

        for (let i = 0; i < 20; i++) {
            setTimeout(() => criarEmoji(), i * 50);
        }

        setTimeout(() => {
            if (easterEggWindow && !easterEggWindow.closed) {
                easterEggWindow.close();
            }
            cliquesEmoji = 0;
        }, 8000);
    }
}

// Função para mostrar texto especial
function mostrarTextoEspecial() {
    const overlay = document.getElementById('textoEspecialOverlay');
    overlay.classList.add('ativo');
}

// Função para fechar texto especial
function fecharTextoEspecial() {
    const overlay = document.getElementById('textoEspecialOverlay');
    overlay.classList.remove('ativo');
}

function baixarCertificado() {
    // Criar um link temporário para download do PDF
    const link = document.createElement('a');
    link.href = '';
    link.download = 'certificado.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Mostrar mensagem de sucesso
    alert('Certificado baixado com sucesso!');
}
