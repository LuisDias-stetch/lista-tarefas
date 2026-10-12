
const campoTarefa = document.getElementById('tarefa');
const botaoAdicionar = document.getElementById('adicionar');
const lista = document.getElementById('lista');
const formulario = document.getElementById('formulario-tarefa');

const botaoTema = document.getElementById('alternar-tema');
const iconeTema = document.getElementById('icone-tema');
const textoTema = document.getElementById('texto-tema');
const contador = document.getElementById('contador');
const estadoVazio = document.getElementById('estado-vazio');

const chaveTema = 'tema';
const temaSalvo = localStorage.getItem(chaveTema);

function aplicarTema(tema) {
    const temaAtual = tema === 'dark' ? 'dark' : 'light';
    const modoEscuroAtivo = temaAtual === 'dark';

    document.body.dataset.theme = temaAtual;

    iconeTema.textContent = modoEscuroAtivo ? '☀' : '☾';
    textoTema.textContent = modoEscuroAtivo ? 'Modo claro' : 'Modo escuro';

    botaoTema.setAttribute(
        'aria-label',
        modoEscuroAtivo ? 'Ativar modo claro' : 'Ativar modo escuro'
    );

    botaoTema.setAttribute('aria-pressed', String(modoEscuroAtivo));

    document.querySelector('meta[name="theme-color"]').content =
        modoEscuroAtivo ? '#11131c' : '#f5f7fc';
}

aplicarTema(temaSalvo || 'light');

botaoTema.addEventListener('click', () => {
    const novoTema =
        document.body.dataset.theme === 'dark' ? 'light' : 'dark';

    aplicarTema(novoTema);
    localStorage.setItem(chaveTema, novoTema);
});

function atualizarResumo() {
    const tarefas = lista.querySelectorAll('li');
    const quantidade = tarefas.length;

    contador.textContent =
        quantidade === 1 ? '1 tarefa' : `${quantidade} tarefas`;

    estadoVazio.hidden = quantidade > 0;
}

function adicionarTarefa() {
    const texto = campoTarefa.value.trim();

    if (texto === '') {
        campoTarefa.focus();
        return;
    }

    const item = document.createElement('li');

    const textoTarefa = document.createElement('span');
    textoTarefa.className = 'tarefa-texto';
    textoTarefa.textContent = texto;
    textoTarefa.tabIndex = 0;
    textoTarefa.setAttribute('role', 'button');
    textoTarefa.setAttribute('aria-label', `Concluir tarefa: ${texto}`);
    textoTarefa.setAttribute('aria-pressed', 'false');

    const botaoExcluir = document.createElement('button');
    botaoExcluir.type = 'button';
    botaoExcluir.className = 'botao-excluir';
    botaoExcluir.textContent = 'Excluir';
    botaoExcluir.setAttribute('aria-label', `Excluir ${texto}`);

    function alternarConclusao() {
        const concluida =
            textoTarefa.style.textDecoration === 'line-through';

        textoTarefa.style.textDecoration = concluida
            ? 'none'
            : 'line-through';

        textoTarefa.setAttribute('aria-pressed', String(!concluida));
    }

    textoTarefa.addEventListener('click', alternarConclusao);

    textoTarefa.addEventListener('keydown', (evento) => {
        if (evento.key === 'Enter' || evento.key === ' ') {
            evento.preventDefault();
            alternarConclusao();
        }
    });

    botaoExcluir.addEventListener('click', () => {
        item.remove();
        atualizarResumo();
    });

    item.appendChild(textoTarefa);
    item.appendChild(botaoExcluir);
    lista.appendChild(item);

    campoTarefa.value = '';
    campoTarefa.focus();

    atualizarResumo();
}

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    adicionarTarefa();
});

atualizarResumo();