const a = document.querySelector('.app__button--add-task');
const b = document.querySelector('.app__form-add-task');

// const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
// const formAdicionarTarefa = document.querySelector('.app__form-add-task')



a.addEventListener('click', function (){
    b.classList.toggle('hidden');
}
 )

//  btnAdicionarTarefa.addEventListener('click', () => {
//     formAdicionarTarefa.classList.toggle('hidden')
// })
