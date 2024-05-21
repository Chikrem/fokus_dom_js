
// Aqui começamos por selecionar os elementos que vamos precisar interagir no nosso código.
// Esta linha pega o botão de adicionar tarefa baseado na classe CSS.
const btnAdicionarTarefa = document.querySelector('.app__button--add-task')

// Selecione o botão de Cancelar que adicionamos ao formulário
const btnCancelar = document.querySelector('.app__form-footer__button--cancel');


// Da mesma forma, esta linha seleciona nosso formulário de adicionar tarefa.
const formAdicionarTarefa = document.querySelector('.app__form-add-task')

// E aqui, pegamos a área de texto onde o usuário digita a descrição da tarefa.
const textArea = document.querySelector('.app__form-textarea')

// Elemento <ul> no qual serão adicionados os elementos <li> criados.
const ulTarefas = document.querySelector('.app__section-task-list')

// Esta é a nossa lista (ou array) de tarefas. Ela começa vazia porque ainda não adicionamos nenhuma tarefa.
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []

function atualizarTarefas () {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

// Agora, adicionamos um ouvinte de eventos ao botão. Quando o botão for clicado, esta função será executada.
btnAdicionarTarefa.addEventListener('click', () => {
    // Esta linha vai alternar a visibilidade do nosso formulário. Lembra da classe 'hidden' que esconde elementos?
    formAdicionarTarefa.classList.toggle('hidden')
})

// SelecionA o botão de Cancelar que adicionamos ao formulário
btnCancelar.addEventListener('click', () => {
    limparFormulario()});

// CriA uma função para limpar o conteúdo do textarea e esconder o formulário
const limparFormulario = () => {
    textArea.value = '';  // LimpA o conteúdo do textarea
    formAdicionarTarefa.classList.add('hidden');  // AdicionA a classe 'hidden' ao formulário para escondê-lo
} 


// Aqui, estamos ouvindo o evento de 'submit' do nosso formulário. 
// Esse evento ocorre quando tentamos enviar o formulário (geralmente, apertando o botão 'Enter' ou clicando em um botão de submit).

formAdicionarTarefa.addEventListener('submit', (evento) => {
    // Esta linha evita que a página recarregue (comportamento padrão de um formulário). Nós não queremos isso!
    evento.preventDefault();

    // Aqui, criamos um objeto tarefa com a descrição vinda da nossa textarea.
    const tarefa = {
        descricao: textArea.value
    }

    // Depois, adicionamos essa tarefa ao nosso array de tarefas.
    tarefas.push(tarefa)

    // Criando nova tarefa em tempo de execução.
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)


    // E, finalmente, armazenamos nossa lista de tarefas no localStorage. 
    // Convertendo o array para uma string em formato JSON para poder armazenar.
    atualizarTarefas ()
    textArea.value = ''
    formAdicionarTarefa.classList.add('hidden')

    // Sempre que adicionar nova tarefa, limpar o 'textarea' e ocultar o campo.

})





// Percorre o Array 'tarefas' e cria um elemento <li> para cada elemento do array com 'criarElementoTarefa' e adiciona cada elemento à lista <ul> 'ulTarefas'

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
});


// Criar HTML via JavaScript.

function criarElementoTarefa(tarefa) { 

    // Um elemento <li> que tem uma classe CSS. Dentro desse elemento, temos a tag <svg>, um parágrafo <p> e um botão <button>, sendo que o <button> contém uma imagem <img>.

    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    // Tag <svg>

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E"></path>
        </svg>
    `

    // Elemento <p> cujo valor vai ser a descrição da tarefa

    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')


    // Elemento <button>

    const botaoEditar = document.createElement('button');
    botaoEditar.classList.add('app_button-edit');
    botaoEditar.innerHTML = 'Editar'; // Ou use um ícone de edição
    botaoEditar.onclick = function() {
        editarTarefa(tarefa, li);
    };
    li.append(botaoEditar);




    // Elemento <image>

    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', '/imagens/edit.png')

    // Adicionar a Imagen dentro do elemento Botão

    botaoEditar.append(imagemBotao)

    // Adicionar todos os elementos dentro do elemento Lista

    li.append(svg)
    li.append(paragrafo)
    li.append(botaoEditar)

    return li
}

function editarTarefa(tarefa, elementoTarefa) {
    const descricaoEditada = prompt("Edite a tarefa", tarefa.descricao); // Simples implementação de edição
    if (descricaoEditada !== null && descricaoEditada.trim() !== '') {
        tarefa.descricao = descricaoEditada;
        // Atualizar a interface do usuário aqui e o localStorage
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        // Atualizar a visualização da tarefa na lista
        elementoTarefa.querySelector('p').textContent = descricaoEditada;
    }
}




