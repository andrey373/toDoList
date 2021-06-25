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
        sclInit();
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
                list.querySelectorAll('.task_item').forEach((elt) => {
                    if(elt.querySelector('input[type="checkbox"]').checked){
                        let textForItemDone = elt.querySelector('.item_text').innerText;
                        let doneItem = taskDone.cloneNode(false);
                        doneItem.textContent = textForItemDone;
            
                        listDone.appendChild(doneItem);
                        elt.remove();
                    }
                });
                sclInit();
            }
        }
        
    });
}
doneElement();

cleanTask.onclick = function(){
    list.innerHTML = '';
    sclInit();
}
cleanDone.onclick = function(){
    listDone.innerHTML = '';
    sclInit();
}


function sclInit() {

	class ScrollBox {
		static SCROLLER_HEIGHT_MIN = 25;

		constructor(container) {
			this.viewport = container.querySelector('.viewport');
			this.contentBox = container.querySelector('.content-box');
			this.contentList = container.querySelector('.content-list');
            this.scrollbar = container.querySelector('.scrollbar');
			this.pressed = false;
			this.init();
		}

		init() {
			this.viewportHeight = this.viewport.offsetHeight;
			this.contentHeight = this.contentList.scrollHeight;
			if (this.viewportHeight >= this.contentHeight){
                this.scrollbar.classList.remove('scrollbar--active');
                return;
            };
			this.max = this.viewport.clientHeight - this.contentHeight;
			this.ratio = this.viewportHeight / this.contentHeight;
			this.createScrollbar();
			this.registerEventsHandler();
		}

		createScrollbar() {
			this.scrollbar.classList.add('scrollbar--active');
			this.scroller = this.viewport.querySelector('.scroller');
			this.scrollerHeight = parseInt(this.ratio * this.viewportHeight);
			this.scrollerHeight = (this.scrollerHeight <= ScrollBox.SCROLLER_HEIGHT_MIN) ? ScrollBox.SCROLLER_HEIGHT_MIN : this.scrollerHeight;
			this.scroller.style.height = this.scrollerHeight + 'px';
		}

		registerEventsHandler(e) {
			this.contentBox.addEventListener('scroll', () => {
				this.scroller.style.top = (this.contentBox.scrollTop * this.ratio) + 'px';
			});

			this.scroller.addEventListener('mousedown', e => {
				this.start = e.clientY;
				this.pressed = true;
			});

			document.addEventListener('mousemove', this.drop.bind(this));
			document.addEventListener('mouseup', () => this.pressed = false);
		}

		drop(e) {
			e.preventDefault();
			if (this.pressed === false) return;
			let shiftScroller = this.start - e.clientY;
			this.scroller.style.top = (this.scroller.offsetTop - shiftScroller) + 'px';
			let shiftContent = this.scroller.offsetTop / this.ratio;
			const totalheightScroller = this.scroller.offsetHeight + this.scroller.offsetTop;
			const maxOffsetScroller = this.viewportHeight - this.scroller.offsetHeight;
			if (this.scroller.offsetTop < 0) this.scroller.style.top = '0px';
			if (totalheightScroller >= this.viewportHeight) this.scroller.style.top = maxOffsetScroller + 'px';
			this.contentBox.scrollTo(0, shiftContent);
			this.start = e.clientY;
		}
	}

	const containers = document.querySelectorAll('.container');
	for (let container of containers) {
		const scrollbox = new ScrollBox(container);
	}
};
sclInit();
