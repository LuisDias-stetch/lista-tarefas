const campoTarefa = document.getElementById('tarefa');
const botaoAdicionar = document.getElementById('adicionar');
const lista = document.getElementById('lista');

botaoAdicionar.addEventListener('click', () => {
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
});