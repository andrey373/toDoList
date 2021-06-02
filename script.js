const toDoList = document.querySelector('.toDoList'),
      list = toDoList.querySelector('.list_task'),
      listDone = toDoList.querySelector('.list_done'),
      cleanDone = toDoList.querySelector('.cleanDone'),
      cleanTask = toDoList.querySelector('.cleanTask'),
      taskTemplate = document.querySelector('#task_temp').content,
      taskItem = taskTemplate.querySelector('.task_item'),
      doneTemplate = document.querySelector('#done_temp').content,
      taskDone = doneTemplate.querySelector('.done_item'),
      form = document.forms.formTask;

let createItem = function(itemValue){
    let item = taskItem.cloneNode(true);
    let textSpan = item.querySelector('.item_text');
        textSpan.textContent = itemValue;
    return item;
};

form.addEventListener('submit', function(evt){
    evt.preventDefault();
    if(form.textTask.value != ''){
        list.appendChild(createItem(form.textTask.value));
        removeElement();
        doneElement();
        form.textTask.value = '';
    }
})

function removeElement (){
    let btnRemove = list.querySelectorAll('.btn_remove');
    btnRemove.forEach((el) => {
        el.addEventListener('click', function(){
            this.parentElement.parentElement.remove();
        })
    })
}
removeElement();

function doneElement (){
    let btnDone = toDoList.querySelectorAll('.btn_done');
    btnDone.forEach(element => {
        element.onclick = () => {
            if(element.parentElement.previousElementSibling.querySelector('input[type="checkbox"]').checked){
                let textForItemDone = element.parentElement.previousElementSibling.querySelector('.item_text').innerText;
                let doneItem = taskDone.cloneNode(false);
                    doneItem.textContent = textForItemDone;
        
                    listDone.appendChild(doneItem);
                    element.parentElement.parentElement.remove();
            }
        }
    });
}
doneElement();

cleanTask.onclick = function(){
    list.innerHTML = '';
}
cleanDone.onclick = function(){
    listDone.innerHTML = '';
}