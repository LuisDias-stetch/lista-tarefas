const campoTarefa = document.getElementById('tarefa');
const botaoAdicionar = document.getElementById('adicionar');
const lista = document.getElementById('lista');

function adicionarTarefa() {
    const texto = campoTarefa.value.trim();

    if (texto === '') {
        return;
    }

    const item = document.createElement('li');

    const textoTarefa = document.createElement('span');
    textoTarefa.textContent = texto;

    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'Excluir';

    item.appendChild(textoTarefa);
    item.appendChild(botaoExcluir);

    textoTarefa.addEventListener('click', () => {
        textoTarefa.style.textDecoration = 'line-through';
    });

    botaoExcluir.addEventListener('click', () => {
        item.remove();
    });

    lista.appendChild(item);

    campoTarefa.value = '';
}

botaoAdicionar.addEventListener('click', adicionarTarefa);

campoTarefa.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
        adicionarTarefa();
    }
});