
const campoTarefa = document.getElementById('tarefa');
const formulario = document.getElementById('formulario-tarefa');
const lista = document.getElementById('lista');

const botaoTema = document.getElementById('alternar-tema');
const iconeTema = document.getElementById('icone-tema');
const textoTema = document.getElementById('texto-tema');
const contador = document.getElementById('contador');
const estadoVazio = document.getElementById('estado-vazio');
const botoesFiltro = document.querySelectorAll('[data-filtro]');

const chaveTema = 'tema';
const chaveTarefas = 'lista-tarefas';

let tarefas = carregarTarefas();
let filtroAtual = 'todas';

function carregarTarefas() {
    try {
        const dados = JSON.parse(localStorage.getItem(chaveTarefas) || '[]');

        if (!Array.isArray(dados)) {
            return [];
        }

        return dados.filter(
            (tarefa) =>
                tarefa &&
                typeof tarefa.texto === 'string' &&
                typeof tarefa.concluida === 'boolean'
        );
    } catch {
        return [];
    }
}

function salvarTarefas() {
    localStorage.setItem(chaveTarefas, JSON.stringify(tarefas));
}

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

aplicarTema(localStorage.getItem(chaveTema) || 'light');

botaoTema.addEventListener('click', () => {
    const novoTema =
        document.body.dataset.theme === 'dark' ? 'light' : 'dark';

    aplicarTema(novoTema);
    localStorage.setItem(chaveTema, novoTema);
});

function atualizarResumo() {
    const quantidade = tarefas.length;

    contador.textContent =
        quantidade === 1 ? '1 tarefa' : `${quantidade} tarefas`;

    estadoVazio.hidden = tarefasVisiveis().length > 0;

    if (tarefas.length > 0 && tarefasVisiveis().length === 0) {
        estadoVazio.textContent =
            filtroAtual === 'pendentes'
                ? '🎉 Não há tarefas pendentes!'
                : '✨ Nenhuma tarefa concluída ainda.';
    } else if (tarefas.length === 0) {
        estadoVazio.innerHTML =
            '✨ Nenhuma tarefa por aqui ainda.<br>Que tal adicionar a primeira?';
    }
}

function tarefasVisiveis() {
    if (filtroAtual === 'pendentes') {
        return tarefas
            .map((tarefa, indice) => ({ tarefa, indice }))
            .filter(({ tarefa }) => !tarefa.concluida);
    }

    if (filtroAtual === 'concluidas') {
        return tarefas
            .map((tarefa, indice) => ({ tarefa, indice }))
            .filter(({ tarefa }) => tarefa.concluida);
    }

    return tarefas.map((tarefa, indice) => ({ tarefa, indice }));
}

function renderizarTarefas() {
    lista.replaceChildren();

    tarefasVisiveis().forEach(({ tarefa, indice }) => {
        const item = document.createElement('li');

        const textoTarefa = document.createElement('span');
        textoTarefa.className = 'tarefa-texto';
        textoTarefa.textContent = tarefa.texto;
        textoTarefa.tabIndex = 0;
        textoTarefa.setAttribute('role', 'button');
        textoTarefa.setAttribute(
            'aria-label',
            `Concluir tarefa: ${tarefa.texto}`
        );
        textoTarefa.setAttribute(
            'aria-pressed',
            String(tarefa.concluida)
        );

        if (tarefa.concluida) {
            textoTarefa.style.textDecoration = 'line-through';
        }

        function alternarConclusao() {
            tarefas[indice].concluida = !tarefas[indice].concluida;
            salvarTarefas();
            renderizarTarefas();
        }

        textoTarefa.addEventListener('click', alternarConclusao);

        textoTarefa.addEventListener('keydown', (evento) => {
            if (evento.key === 'Enter' || evento.key === ' ') {
                evento.preventDefault();
                alternarConclusao();
            }
        });

        const botaoExcluir = document.createElement('button');
        botaoExcluir.type = 'button';
        botaoExcluir.className = 'botao-excluir';
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.setAttribute('aria-label', `Excluir ${tarefa.texto}`);

        botaoExcluir.addEventListener('click', () => {
            tarefas.splice(indice, 1);
            salvarTarefas();
            renderizarTarefas();
        });

        item.appendChild(textoTarefa);
        item.appendChild(botaoExcluir);
        lista.appendChild(item);
    });

    atualizarResumo();
}

botoesFiltro.forEach((botao) => {
    botao.addEventListener('click', () => {
        filtroAtual = botao.dataset.filtro;

        botoesFiltro.forEach((outroBotao) => {
            const ativo = outroBotao === botao;
            outroBotao.classList.toggle('ativo', ativo);
            outroBotao.setAttribute('aria-pressed', String(ativo));
        });

        renderizarTarefas();
    });
});

function adicionarTarefa() {
    const texto = campoTarefa.value.trim();

    if (texto === '') {
        campoTarefa.focus();
        return;
    }

    tarefas.push({
        texto,
        concluida: false
    });

    salvarTarefas();
    renderizarTarefas();

    campoTarefa.value = '';
    campoTarefa.focus();
}

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    adicionarTarefa();
});

renderizarTarefas();