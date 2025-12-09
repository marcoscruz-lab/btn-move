const btnNao = document.getElementById('btnNao');
let tentativas = 0;

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

    if (tentativas === 3) {
        btnNao.textContent = 'NÃO? 🥺';
    } else if (tentativas === 5) {
        btnNao.textContent = 'EXPERIMENTA O SIM? 😊';
    } else if (tentativas === 8) {
        btnNao.textContent = 'O SIM É MELHOR! 😄';
    } else if (tentativas === 10) {
        btnNao.textContent = 'TÁ BOM... JÁ ENTENDI 😞';
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
    }, 3000);
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