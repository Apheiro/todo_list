import { userInterface } from './domCreation.js'

class appLogic {

    static start() {
        userInterface.createPageDom();

        const addListBtn = document.querySelector('#addListBtn');
        const addTaskBtn = document.querySelector('#addTaskBtn');
        const test = document.querySelector('.calendarMenuBtn')
        test.addEventListener('click', () => { console.log(listsCreator.lists) })
        addListBtn.addEventListener('click', () => { this.showForm('addList') });
        addTaskBtn.addEventListener('click', () => { this.showForm('addTask') });
        listsCreator.createList('All Tasks')
    }

    static showForm(form) {
        const item = userInterface.createForm(form)
        //item 0 = accept btn
        //item 1 = cancel btn
        //item 2 = background contains form
        if (form === 'addList') {
            const input = item[2].querySelector('#addListInput')
            const form = item[2].querySelector('#addListForm')
            item[0].addEventListener('click', (e) => {
                if (input.value === 'All Tasks') {
                    this.showAdvertising()
                    e.preventDefault();
                    form.reset();
                } else if (input.value !== '') {
                    listsCreator.createList(input.value);
                    e.preventDefault();
                    item[2].remove();
                }
            });
            item[1].addEventListener('click', (e) => {
                e.preventDefault();
                item[2].remove();
            });

        } else if (form === 'addTask') {
            const input = item[2].querySelector('#addTaskInput')
            const inputDescription = item[2].querySelector('#descriptionTaskInput')
            const inputDate = item[2].querySelector('#addTaskDateInput')
            item[0].addEventListener('click', (e) => {
                if (input.value !== '' && inputDate.value !== '') {
                    tasksCreator.createTask(input.value, inputDescription.value, inputDate.value)
                    e.preventDefault();
                    item[2].remove();
                }
            });
            item[1].addEventListener('click', (e) => {
                console.log('cancel')
                e.preventDefault();
                item[2].remove()
            });

        } else if (form === 'editList') {
            const input = item[2].querySelector('#editListInput')
            const form = item[2].querySelector('#editListNameForm')
            item[0].addEventListener('click', (e) => {
                if (input.value === 'All Tasks') {
                    this.showAdvertising()
                    e.preventDefault();
                    form.reset();
                } else if (input.value !== '') {
                    listsCreator.lists.forEach(element => {
                        if (element.id === listsCreator.selectedListOption) {
                            element.title = input.value
                            listsCreator.refreshDataList(element)
                        }
                    })
                    e.preventDefault();
                    listsCreator.changeTitleOfViewMenu()
                    item[2].remove()
                }
            });
            item[1].addEventListener('click', (e) => {
                e.preventDefault();
                item[2].remove()
            });

        }
    }

    static showAdvertising() {
        const element = userInterface.showAdvertising('All Tasks');
        element[0].addEventListener('click', () => { element[1].remove() });
    }

    static setNewIndex(container, dataAtribute) {
        const nodeList = container.childNodes;
        nodeList.forEach(node => {
            listsCreator.lists.forEach(element => {
                if (element.id == node.getAttribute('data-indexlist')) {
                    element.id = this.matchingIndex(container, node)
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
class tasksCreator {


    constructor(title, description, date) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.checked = false
    }

    static createTask(title, description, date) {
        const newTask = new tasksCreator(title, description, date)
        listsCreator.lists.forEach(list => {
            if (list.id === listsCreator.listSelected) {
                list.tasks.push(newTask);
                list.tasksNumber = list.tasks.length;
                listsCreator.refreshDataList(list)
            }
        });
    }
}

class listsCreator {
    static lists = [];
    static selectedListOption;
    static listSelected;

    constructor(title, taskCompleted) {
        this.id;
        this.title = title;
        this.tasks = [];
        this.tasksNumber = this.tasks.length;
        this.taskCompleted = taskCompleted;
        this.domReference;
        this.domReferenceTitle;
        this.selected = false;
    }

    static createList(title) {
        //element 0 = List
        //element 1 = buttons menus
        //element 2 = edit Btn
        //element 3 = delete Btn
        //element 4 = index
        const newList = new listsCreator(title, 0);
        const elements = userInterface.createListDom(newList.title, newList.tasksNumber, newList.taskCompleted);
        newList.domReference = elements[0];
        newList.domReferenceTitle = document.querySelector('#titleOfSelection');
        newList.id = elements[4];
        this.lists.push(newList);
        elements[0].addEventListener('click', () => {
            const addTaskBtn = document.querySelector('#addTaskBtn');
            this.showSelectList(newList);
            this.refreshListSelected();
            if (this.listSelected > 1) { addTaskBtn.classList.remove('h') } else { addTaskBtn.classList.add('h') };
            this.changeTitleOfViewMenu()
        });

        if (title != 'All Tasks') {
            elements[0].addEventListener('mouseover', () => { elements[1].classList.add('buttonSettingsShow') });
            elements[0].addEventListener('mouseout', () => { elements[1].classList.remove('buttonSettingsShow') });
            elements[2].addEventListener('click', (e) => {
                appLogic.showForm('editList');
                this.selectedListOption = newList.id;
                e.stopPropagation();
            });
            elements[3].addEventListener('click', (e) => {
                this.deleteList(newList);
                this.refreshListSelected();
                e.stopPropagation();
            });
        }
        this.checkLists()
    }

    static deleteList(list) {
        list.domReference.remove();
        this.lists.forEach(element => { if (element.id === list.id) { this.lists.splice(this.lists.indexOf(element), 1); } })
        appLogic.setNewIndex(document.querySelector('#menuContent'), 'data-indexlist')
        if (list.id === this.listSelected) {
            const addTaskBtn = document.querySelector('#addTaskBtn');
            addTaskBtn.classList.add('h');
            this.listSelected = null;
        }
        this.checkLists()
        this.changeTitleOfViewMenu()
    }

    static refreshDataList(list) {
        const ListSelected = list.domReference;
        ListSelected.querySelector('.titleOfList').innerText = `${list.title}`;
        ListSelected.querySelector('.TasksOfList').innerText = `${list.tasksNumber} Tasks`;
        ListSelected.querySelector('.TasksCompletedOfList').innerText = `${list.taskCompleted} Completed`;
    }

    static showSelectList(list) {
        this.lists.forEach(list => { if (list.selected === true) { list.selected = false } });
        if (list.selected === false) { list.selected = true; };
        this.lists.forEach(list => { if (list.selected === true) { list.domReference.classList.add('active') } else { list.domReference.classList.remove('active') } });
    }

    static changeTitleOfViewMenu() {
        if (this.listSelected != undefined || this.listSelected != null) {
            this.lists.forEach(element => { if (element.id === this.listSelected) { element.domReferenceTitle.innerText = element.title } })
        }
        else { this.lists[0].domReferenceTitle.innerText = 'View' }
    }

    static refreshListSelected() {
        this.lists.forEach(list => { if (list.selected === true) { this.listSelected = list.id } else { return } })
    }

    static checkLists() {
        if (this.lists.length <= 1) { userInterface.createListSuggestion() }
        else if (document.querySelector('#noLists') != undefined) {
            const noListsSuggestion = document.querySelector('#noLists');
            noListsSuggestion.remove();
        };
    }
}

export { appLogic }