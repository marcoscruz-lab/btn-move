const btnNao = document.getElementById('btnNao');
const numTentativas = document.getElementById('numTentativas');
const musicaFundo = document.getElementById('musicaFundo');
const musicControl = document.getElementById('musicControl');
let tentativas = 0;
let petalasAtivas = [];
let musicaTocando = false;

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

// CONFIGURAÇÃO DE ÁUDIO / FADE
const FADE_DURATION = 5000; // ms
const MAX_VOLUME = 0.3;     // volume máximo padrão
const NIGHT_VOLUME = 0.2;   // volume desejado na transição dia->noite

// garantir volume inicial 0 (evita som antes do fade-in)
musicaFundo.volume = 0;

// controle do fade atual (para permitir cancelar/evitar sobreposição)
let currentFadeAnimation = null;
let currentFadeCancel = null;

/**
 * Faz fade para volume alvo usando requestAnimationFrame.
 * Retorna Promise que resolve quando o fade termina (ou é cancelado).
 */
function fadeToVolume(audio, targetVolume, duration) {
    // cancelar fade anterior, se houver
    if (currentFadeCancel) {
        currentFadeCancel(); // sinaliza cancelamento para a promise anterior
        currentFadeCancel = null;
    }
    if (currentFadeAnimation) {
        cancelAnimationFrame(currentFadeAnimation);
        currentFadeAnimation = null;
    }

    const startVolume = audio.volume;
    const startTime = performance.now();

    let cancelled = false;
    currentFadeCancel = () => { cancelled = true; };

    // se vamos subir volume, garantir play (catch para autoplay errors)
    if (targetVolume > 0 && audio.paused) {
        audio.play().catch(() => { /* autoplay pode falhar, mas tentamos */ });
    }

    return new Promise(resolve => {
        function step(now) {
            if (cancelled) {
                currentFadeAnimation = null;
                currentFadeCancel = null;
                resolve(); // promise resolve mesmo em cancelamento
                return;
            }
            const elapsed = now - startTime;
            const t = Math.min(1, elapsed / duration);
            // interpolação linear
            audio.volume = startVolume + (targetVolume - startVolume) * t;
            audio.volume = Math.min(1, Math.max(0, audio.volume)); // clamp

            if (t < 1) {
                currentFadeAnimation = requestAnimationFrame(step);
            } else {
                // finalizado
                currentFadeAnimation = null;
                currentFadeCancel = null;
                // se targetVolume = 0, pausar ao terminar
                if (targetVolume === 0) {
                    try { audio.pause(); } catch (e) { /* ignore */ }
                }
                resolve();
            }
        }

        currentFadeAnimation = requestAnimationFrame(step);
    });
}

function fadeIn(audio, duracao = 30000) {
    // garante que maxVolume esteja no intervalo [0,1]
    maxVolume = Math.min(1, Math.max(0, maxVolume));
    return fadeToVolume(audio, maxVolume, duration);
}

function fadeOut(audio, duracao = 30000) {
    return fadeToVolume(audio, 0, duration);
}

// Iniciar com tema dia
document.body.classList.add('dia');

// Função para alternar música de fundo
window.addEventListener('load', () => {
    document.body.addEventListener('click', iniciarMusica, { once: true });
    document.body.addEventListener('touchstart', iniciarMusica, { once: true });
});

function iniciarMusica() {
    if (!musicaTocando) {
        // fade-in até MAX_VOLUME
        fadeIn(musicaFundo, FADE_DURATION, MAX_VOLUME).then(() => {
            // garante estado correto após o fade (pode deixar true desde o início)
        });
        musicaTocando = true;
        musicControl.textContent = '🔊';
    }
}

function toggleMusic() {
    if (musicaTocando) {
        // fade-out e atualizar estado quando terminar
        fadeOut(musicaFundo, FADE_DURATION).then(() => {
            // já pausado dentro de fadeToVolume
        });
        musicControl.textContent = '🔈';
        musicaTocando = false;
    } else {
        fadeIn(musicaFundo, FADE_DURATION, MAX_VOLUME).then(() => {
            // nada extra necessário
        });
        musicControl.textContent = '🔊';
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

    // Mudar o texto do botão com frases engraçadas
    if (tentativas <= frases.length) {
        btnNao.textContent = frases[tentativas - 1];
    } else {
        btnNao.textContent = 'NÃO SOBROU NADA PRO BETA';
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

    // SINCRONIZAR O AUDIO COM A TRANSIÇÃO:
    // Faz um fade até NIGHT_VOLUME durante FADE_DURATION (sincronizado com a transição visual).
    // Se preferir pausar totalmente, use fadeOut(musicaFundo, FADE_DURATION).
    fadeToVolume(musicaFundo, Math.min(1, Math.max(0, NIGHT_VOLUME)), FADE_DURATION);

    // Criar girassóis caindo
    for (let i = 0; i < 50000; i++) {
        setTimeout(() => criarGirassol(), i * 20);
    }
}

function criarGirassol() {
    const girassol = document.createElement('div');
    girassol.className = 'sunflower';
    girassol.textContent = '💕';

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
