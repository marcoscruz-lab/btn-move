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

// Iniciar com tema dia
document.body.classList.add('dia');

// Tentar tocar música automaticamente
window.addEventListener('load', () => {
    // Navegadores modernos bloqueiam autoplay, então tentamos tocar com interação
    document.body.addEventListener('click', iniciarMusica, { once: true });
    document.body.addEventListener('touchstart', iniciarMusica, { once: true });
});

function iniciarMusica() {
    if (!musicaTocando) {
        musicaFundo.play().then(() => {
            musicaTocando = true;
            musicControl.textContent = '🎵';
        }).catch(err => {
            console.log('Autoplay bloqueado:', err);
        });
    }
}

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

    // Mostrar contador
    contador.classList.add('ativo');
    numTentativas.textContent = tentativas;

    // Adicionar classe para mudar para position fixed
    btnNao.classList.add('fugindo');

    const maxX = window.innerWidth - btnNao.offsetWidth - 20;
    const maxY = window.innerHeight - btnNao.offsetHeight - 20;

    const novoX = Math.random() * maxX;
    const novoY = Math.random() * maxY;

    btnNao.style.left = novoX + 'px';
    btnNao.style.top = novoY + 'px';

    // Mudar o texto do botão com frases engraçadas
    if (tentativas <= frasesEngracadas.length) {
        btnNao.textContent = frasesEngracadas[tentativas - 1];
    } else {
        btnNao.textContent = 'DESISTE! CLICA NO SIM! 😭';
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
    }, 500);

    // Transição para noite
    document.body.classList.remove('dia');
    document.body.classList.add('noite');

    // Esconder contador
    contador.style.display = 'none';

    // Remover pétalas suaves
    petalasAtivas.forEach(p => p.remove());
    petalasAtivas = [];

    // Criar girassóis caindo em celebração
    for (let i = 0; i < 50; i++) {
        setTimeout(() => criarGirassol(), i * 100);
    }
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
        }, 4000);
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

// Função para baixar certificado de namoro
function baixarCertificado() {
    // Criar um link temporário para download do PDF
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL1Jlc291cmNlczw8L0ZvbnQ8PC9GMSAx' +
        'IDAgUj4+Pj4vTWVkaWFCb3hbMCAwIDYxMiA3OTJdL0NvbnRlbnRzIDQgMCBSPj4KZW5kb2JqCjQgMCBvYmoKPDwvRmls' +
        'dGVyL0ZsYXRlRGVjb2RlL0xlbmd0aCAyODU+PgpzdHJlYW0KeJx9kU1uwzAMhPc+Ba9TQJYoSpZ3bYG0aJEWRZEe' +
        'oO9vnNQB0qJdGZQ+kZqRyZ1fq/V2Xb/Xn8vX/ev6sX5dv65f16/r1/Xr+nX9un5dv65f16/r1/Xr+nX9un5dv65f' +
        '16/r1/Xr+nX9un5dv65f16/r1/Xr+nX9un5dv65f16/r1/Xr+nX9un5dv65f16/r1/Xr+nX9un5dv65f16/r1/Xr' +
        '+nX9un5dv65f16/r1/Xr+nX9un5dv65f16/r1/XrVK3XzbIMgoKSoqKioqKioqKioqKioqKioqKioqKioqKioqKi' +
        'oqKioqKioqKiCmVuZHN0cmVhbQplbmRvYmoKMSAwIG9iago8PC9UeXBlL0ZvbnQvU3VidHlwZS9UeXBlMS9CYXNl' +
        'Rm9udC9IZWx2ZXRpY2E+PgplbmRvYmoKMiAwIG9iago8PC9UeXBlL1BhZ2VzL0NvdW50IDEvS2lkc1szIDAgUl0+' +
        'PgplbmRvYmoKNSAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFI+PgplbmRvYmoKNiAwIG9iago8PC9Q' +
        'cm9kdWNlcihQREZLaXQpL0NyZWF0b3IoUERGS2l0KT4+CmVuZG9iagp4cmVmCjAgNwowMDAwMDAwMDAwIDY1NTM1' +
        'IGYgCjAwMDAwMDA0MzEgMDAwMDAgbiAKMDAwMDAwMDUwMCAwMDAwMCBuIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAw' +
        'MDAwMDAxMjUgMDAwMDAgbiAKMDAwMDAwMDU1NyAwMDAwMCBuIAowMDAwMDAwNjA2IDAwMDAwIG4gCnRyYWlsZXIK' +
        'PDwvU2l6ZSA3L1Jvb3QgNSAwIFIvSW5mbyA2IDAgUj4+CnN0YXJ0eHJlZgo2NTgKJSVFT0Y=';
    link.download = 'certificado.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Mostrar mensagem de sucesso
    alert('Certificado baixado com sucesso!');
}
