const btnNao = document.getElementById('btnNao');
let tentativas = 0;

const frases = [
    "EXPERIMENTA O SIM? 😊",
    "NÃO? 🥺",
    "POR QUE NÃO? 🤔",
    "ASSISTO CREPÚSCULO COM VOCÊ 🌅",
    "URUCUBADA KKKKKKK",
    "NEM FEZ SENTIDO A ANTERIOR 😅",
    "O SIM É MELHOR! 😄",
    "TÁ BOM... JÁ ENTENDI 😞",
]

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
    celebration.classList.add('active');

    // Criar girassóis caindo
    for (let i = 0; i < 50; i++) {
        setTimeout(() => criarGirassol(), i * 100);
    }

    setTimeout(() => {
        window.location.href = 'https://youtu.be/Af7ieNv0wXY?t=93';
    }, 4000);
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
        }, 6000);
    }
}
