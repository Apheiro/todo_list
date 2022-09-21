import { userInterface } from './domCreation.js'

class appLogic {
    static lists = [];
    static listSelected;

    static logic() {
        const addListBtn = document.querySelector('#addListBtn');
        const addListForm = document.querySelector('#addListForm');
        const addListSubmitBtn = document.querySelector('#addListSubmitBtn');
        const addListCancelBtn = document.querySelector('#addListCancelBtn');
        const addListInput = document.querySelector('#addListInput');

        const addTaskBtn = document.querySelector('#addTaskBtn');
        const addTaskForm = document.querySelector('#addTaskForm');
        const addTaskCancelBtn = document.querySelector('#addTaskCancelBtn');

        const editListInput = document.querySelector('#editListInput');
        const editListNameForm = document.querySelector('#editListNameForm');
        const editListCancelBtn = document.querySelector('#editListCancelBtn');
        const editListSubmitBtn = document.querySelector('#editListSubmitBtn');

        const backgroundOfForms = document.querySelector('#backgroundOfForms');
        const menuContent = document.querySelector('#menuContent');

        const list = document.querySelector('.list');

        addListBtn.addEventListener('click', () => { appLogic.showForm(addListForm, backgroundOfForms) });

        list.addEventListener('click', () => { appLogic.showSelectListContent(list) });

        addListSubmitBtn.addEventListener('click', (e) => {
            if (addListInput.value !== '') {
                appLogic.createList(addListInput.value);
                backgroundOfForms.classList.toggle('h');
                addListForm.classList.toggle('h');
                e.preventDefault();
                addListForm.reset();
            }
        });

        addListCancelBtn.addEventListener('click', (e) => {
            backgroundOfForms.classList.toggle('h');
            addListForm.classList.toggle('h');
            e.preventDefault();
            addListForm.reset();
        });

        addTaskCancelBtn.addEventListener('click', (e) => {
            backgroundOfForms.classList.toggle('h');
            addTaskForm.classList.toggle('h');
            e.preventDefault();
            addTaskForm.reset();
        });

        editListSubmitBtn.addEventListener('click', (e) => {
            if (editListInput.value !== '') {
                this.lists.forEach(element => {
                    if (element.id === this.listSelected) {
                        element.title = editListInput.value
                        this.refreshDataList(element)
                    }
                })
                backgroundOfForms.classList.toggle('h');
                editListNameForm.classList.toggle('h');
                e.preventDefault();
                editListNameForm.reset();
            }
        });

        editListCancelBtn.addEventListener('click', (e) => {
            backgroundOfForms.classList.toggle('h');
            editListNameForm.classList.toggle('h');
            e.preventDefault();
            editListNameForm.reset();
        });

    }

    static refreshDataList(list) {
        const ListSelected = list.domReference;
        ListSelected.querySelector('.titleOfList').innerText = `${list.title}`;
        ListSelected.querySelector('.TasksOfList').innerText = `${list.tasksNumber} Tasks`;
        ListSelected.querySelector('.TasksCompletedOfList').innerText = `${list.taskCompleted} Completed`;
    }

    static createList(title) {
        const newList = new list(title, 0);
        const elements = userInterface.createListDom(newList.title, newList.tasksNumber, newList.taskCompleted);
        newList.domReference = elements[0];
        newList.id = elements[5];
        this.lists.push(newList)

        elements[0].addEventListener('click', () => { appLogic.showSelectListContent(elements[0]) });
        elements[0].addEventListener('mouseover', () => { elements[1].classList.add('buttonSettingsShow') });
        elements[0].addEventListener('mouseout', () => { elements[1].classList.remove('buttonSettingsShow') });
        elements[2].addEventListener('click', (e) => {
            appLogic.showForm(editListNameForm, backgroundOfForms);
            appLogic.listSelected = newList.id;
            e.stopPropagation();
        });
        elements[3].addEventListener('click', (e) => {
            appLogic.deleteList(newList);
            console.log(this.lists)
            e.stopPropagation();
        });
        elements[4].addEventListener('click', () => { appLogic.showForm(addTaskForm, backgroundOfForms) });


    }

    static showSelectListContent(list) {
        const menuContent = list.parentElement.childNodes;
        menuContent.forEach(task => { if (task.classList.contains('active')) { task.classList.remove('active'); }; });
        if (!list.classList.contains('active')) { list.classList.add('active'); };
    }

    static deleteList(list) {
        list.domReference.remove();
        this.lists.forEach(element => { if (element.id === list.id) { this.lists.splice(this.lists.indexOf(element), 1); } })
        appLogic.setNewIndex(document.querySelector('#menuContent'), 'data-indexlist')
    }

    static showForm(form, background) {
        background.classList.toggle('h');
        form.classList.toggle('h');
    }

    static setNewIndex(container, dataAtribute) {
        const nodeList = container.childNodes;
        nodeList.forEach(node => {
            this.lists.forEach(element => {
                if (element.id == node.getAttribute('data-indexlist')) {
                    element.id = appLogic.matchingIndex(container, node)
                    node.setAttribute(`${dataAtribute}`, element.id);
                }
            })
        });
    }

    static matchingIndex(parent, child) {
        const index = Array.prototype.indexOf.call(parent.children, child);
        return index;
    }

}
class task {
    constructor(status, description, date, priority) {
        this.status = status;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.checked = false
    }
}

class list {
    constructor(title, taskCompleted) {
        this.id;
        this.title = title;
        this.tasks = []
        this.tasksNumber = this.tasks.length;
        this.taskCompleted = taskCompleted;
        this.domReference;
    }
}

export { appLogic }