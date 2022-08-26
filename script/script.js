
// "Recuperando elementos que serão usados"
let novaTarefa = document.querySelector('#novaTarefa');
let btnAdicionar = document.querySelector('#btnAdicionar');
let listaDeTarefa = document.querySelector('#listaDeTarefa');
let popUp = document.querySelector('#popUp');
let janelaEdicaoFundo = document.querySelector('.janelaEdicaoFundo');
let atualizarTarefa = document.querySelector('#atualizarTarefa');
let idTarefaEditar = document.querySelector('#idTarefaEditar');
let inputNomeTarefaEditada = document.querySelector('#inputNomeTarefaEditada');
let btnFecharPopUp = document.querySelector('#btnFecharPopUp');


// eventeo para "ouvir" quando qualquer tecla for pressionada
// paramestro "(e)"tem significado de evento, que no caso é quando uma tecla for pressionada
novaTarefa.addEventListener('keypress', (e) => {
    // keycode == 13 é o code da tecla enter, para quando o usuario clicar em enter
    // a tarefa será adicionada
    if ((e.keyCode == 13)) {
        let task = {
            nome: novaTarefa.value,
            id: gerarIdRandomico()
        }
        if (novaTarefa.value != "") {

            addTarefa(task);
        }
    }
});
// Funcão para gerar numero de ID de forma randomica.
let gerarIdRandomico = () => Math.floor(Math.random() * 2000);

btnFecharPopUp.addEventListener('click', (e)=>{
    abrirEdicao();
})


// evento quando botao de adicionar tarefa é adicionado
btnAdicionar.addEventListener('click', (e) => {

    let task = {
        nome: novaTarefa.value,
        id: gerarIdRandomico()
    }
    if (novaTarefa.value != "") {

        addTarefa(task);
    }
});

// evento quando botao de Salvar tarefa é acionado, na edição de uma tarefa
// evento quando botao de Salvar tarefa é acionado, na edição de uma tarefa
atualizarTarefa.addEventListener('click', (e) => {
   alert("Salvar Acionado");
  // previnindo ação padrao do botão. Para que ao cliclar não seja submetido os dados 
    // para a mesma pagina. 
    e.preventDefault()
    let idTarefaEdit = idTarefaEditar.innerHTML.replace('#', "");
    let objTarefa = {
        nome: inputNomeTarefaEditada.value,
        id: id
    }
    
    let novaTask = document.getElementById(''+id+'');
  

      let li = criarConjuntoDeTagDentroDaLi(objTarefa)
      listaDeTarefa.replaceChild(li, novaTask);
    
      abrirEdicao();
 
});



// função de adicionar tarefa, que recebe como parametro o objeto task
const addTarefa = (task) => {
    let li = criarConjuntoDeTagDentroDaLi(task);
    listaDeTarefa.appendChild(li);
    // limpando campo depois q a tarefa é addicionada
    novaTarefa.value = '';
}

const criarConjuntoDeTagDentroDaLi = (task) => {
    let li = document.createElement('li');
    li.id = task.id; //li recebe o mesmo Id da tarefa
    // adicionar ao elemento criado a classe que ele deve receber (linha 48)
    // inserindo no HTML o nome da tarefa(linha 49)
    let span = document.createElement('span');
    span.classList.add('tarefa');
    span.innerHTML = task.nome;

    // criando div e seus elementos internos
    let div = document.createElement('div');

    let btnEditar = document.createElement('button');
    btnEditar.classList.add('btnAcao');
    btnEditar.innerHTML = ' <i class="fa fa-pencil"></i>';
    btnEditar.setAttribute('onclick', 'editarTarefa(' + task.id + ')');

    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';

    btnExcluir.setAttribute('onclick', 'excluirTarefa(' + task.id + ')');
    // adicionando isso tudo dentro da div
    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);

    // adicionando tudo isso a li

    li.appendChild(span);
    li.appendChild(div);

    return li;
}

function editarTarefa(id) {

    let li = document.getElementById(`${id}`);
    if (li) {
        idTarefaEditar.innerHTML = `# ${id}`;
        inputNomeTarefaEditada.value = li.innerText;
        abrirEdicao()
    }
}
function excluirTarefa(id) {
    // Variavel de confirmação é opcional
    let confirmar = confirm("DESEJA REALMENTE EXCLUIR??");
    if (confirmar) {
        //buscando elemento e se ele existir removo
        let li = document.getElementById(`${id}`);
        if (li) {
            listaDeTarefa.removeChild(li);
        }
    }
}
function abrirEdicao() {
    popUp.classList.toggle('abrir');
    janelaEdicaoFundo.classList.toggle('abrir');

}
