import { userInterface } from './domCreation.js'
import { format, parseISO, isAfter, add, isToday, isBefore, addDays } from 'date-fns'

class appLogic {

    static start() {
        userInterface.createPageDom();

        const addListBtn = document.querySelector('#addListBtn');
        const addTaskBtn = document.querySelector('#addTaskBtn');
        const test = document.querySelector('.calendarMenuBtn')

        test.addEventListener('click', () => {
            console.log(listsCreator.lists)
            const nodeList = document.querySelector('#taskPreviews').querySelectorAll(`.tasks`);
            console.log(nodeList)

        })
        addListBtn.addEventListener('click', () => { this.showForm('addList') });
        addTaskBtn.addEventListener('click', () => { this.showForm('addTask') });
        listsCreator.createList('All Tasks')
        console.log(new Date())
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

            listsCreator.lists.forEach(list => { if (list.id === listsCreator.selectedListOption) { input.value = list.title } })
        }
    }

    static showAdvertising() {
        const element = userInterface.showAdvertising('All Tasks');
        element[0].addEventListener('click', () => { element[1].remove() });
    }

    static setNewIndex(container, dataAtribute, array, className) {
        const nodeList = container.querySelectorAll(`.${className}`);
        nodeList.forEach((node, index) => {
            node.setAttribute(dataAtribute, index + 1);
            array[index].id = index + 1;
        });
    }
}

class tasksCreator {


    constructor(title, description, date) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.checked = false
        this.domReference;
        this.id;
    }

    static createTask(title, description, date) {
        const newTask = new tasksCreator(title, description, date)
        this.createTaskDom(newTask.title, newTask, date);

        listsCreator.lists.forEach(list => {
            if (list.id === listsCreator.listSelected) {
                list.tasks.push(newTask);
                list.tasksNumber = list.tasks.length;
                listsCreator.refreshDataList(list)
            }
        });

    }

    static createTaskDom(title, task, date) {
        // element 0 = tasks
        // element 1 = deleteBtn
        // element 2 = moreInfoBtn
        // element 3 = inputCheckbox
        if (isToday(new Date(parseISO(date)))) {
            const taskPreviews = document.querySelector('#taskPreviews')
            const categoryDom = document.querySelector('#Today')
            if (!taskPreviews.contains(categoryDom)) { userInterface.createTaskCategory('Today', 2) }
            start('Today')
        } else if (isBefore(new Date(parseISO(date)), new Date())) {
            const taskPreviews = document.querySelector('#taskPreviews')
            const categoryDom = document.querySelector('#Expired')
            if (!taskPreviews.contains(categoryDom)) { userInterface.createTaskCategory('Expired', 1) }
            start('Expired')
        } else if (isAfter(new Date(parseISO(date)), new Date()) && isBefore(new Date(parseISO(date)), addDays(new Date(), 1))) {
            const taskPreviews = document.querySelector('#taskPreviews')
            const categoryDom = document.querySelector('#Tomorrow')
            if (!taskPreviews.contains(categoryDom)) { userInterface.createTaskCategory('Tomorrow', 3) }
            start('Tomorrow')
        } else if (isAfter(new Date(parseISO(date)), addDays(new Date(), 1))) {
            const taskPreviews = document.querySelector('#taskPreviews')
            const categoryDom = document.querySelector('#Upcoming')
            if (!taskPreviews.contains(categoryDom)) { userInterface.createTaskCategory('Upcoming', 4) }
            start('Upcoming')
        }

        function start(category) {
            const domElements = userInterface.createTasksDom(title, task.checked, category);
            const taskIndex = (document.querySelectorAll('.tasks')).length
            task.domReference = domElements[0];
            task.domReference.setAttribute('data-indextask', taskIndex);
            task.id = taskIndex;
            domElements[0].addEventListener('mouseover', () => { domElements[0].querySelector('.taskBtnsGroup').classList.add('show') });
            domElements[0].addEventListener('mouseout', () => { domElements[0].querySelector('.taskBtnsGroup').classList.remove('show') });
            domElements[1].addEventListener('click', () => { tasksCreator.deleteTask(task) });
            domElements[2].addEventListener('click', () => { tasksCreator.showTaskInfo(task) });
            domElements[3].addEventListener('change', () => { task.checked = domElements[3].checked; });
        }



    }

    static deleteTask(task) {
        task.domReference.remove();
        listsCreator.lists.forEach(list => {
            if (list.id === listsCreator.listSelected) {
                list.tasks.forEach(taskOfarray => { if (taskOfarray.id === task.id) { list.tasks.splice(list.tasks.indexOf(taskOfarray), 1); } })
                appLogic.setNewIndex(document.querySelector('#taskPreviews'), 'data-indextask', list.tasks, 'tasks')
            }
        })

    }

    static showTaskInfo(task) {
        // element 0 = background
        // element 1 = closeInfoBtn
        // element 2 = editInfoBtn
        const domElements = userInterface.taskInfoDom(task.title, task.description, format(new Date(parseISO(task.date)), 'PPPP'));
        domElements[1].addEventListener('click', () => {
            console.log(domElements[0]);
            domElements[0].remove();
        })


        domElements[2].addEventListener('click', () => {
            // element 0 = background
            // element 1 = acceptEditInfoBtn
            // element 2 = cancelEditInfoBtn
            // element 3 = dateTitleDescriptionInput
            // element 4 = taskTitleDescriptionInput
            // element 5 = descriptionMoreInfoInput

            const domElementsEdit = userInterface.taskInfoEditForm();
            domElementsEdit[0].querySelector('.infoTask').remove()

            domElementsEdit[3].value = task.date;
            domElementsEdit[4].value = task.title;
            domElementsEdit[5].value = task.description;
            domElementsEdit[5].addEventListener("input", function (e) {
                this.style.height = "auto";
                this.style.height = this.scrollHeight + "px";
            });
            domElementsEdit[4].addEventListener("input", function (e) {
                this.style.height = "auto";
                this.style.height = this.scrollHeight + "px";
            });
            domElementsEdit[4].style.height = domElementsEdit[4].scrollHeight + "px";
            domElementsEdit[5].style.height = domElementsEdit[5].scrollHeight + "px";

            console.log(domElementsEdit[1])

            domElementsEdit[1].addEventListener('click', () => {
                if (domElementsEdit[3].value !== '' && domElementsEdit[4].value !== '') {
                    task.date = domElementsEdit[3].value;
                    task.title = domElementsEdit[4].value;
                    task.description = domElementsEdit[5].value;
                    domElementsEdit[0].remove()
                    this.refreshDataTask(task)
                    this.showTaskInfo(task)
                }
            });

            domElementsEdit[2].addEventListener('click', () => {
                domElementsEdit[0].remove()
                this.showTaskInfo(task)
            });

        });

    };

    static refreshDataTask(task) {
        const taskSelected = task.domReference;
        taskSelected.querySelector('.titleTask').innerText = `${task.title}`;
    }
};

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
            if (this.listSelected > 1) { addTaskBtn.classList.remove('h') } else { addTaskBtn.classList.add('h') };
            this.changeTitleOfViewMenu()
        });

        if (title != 'All Tasks') {
            elements[0].addEventListener('mouseover', () => { elements[1].classList.add('show') });
            elements[0].addEventListener('mouseout', () => { elements[1].classList.remove('show') });
            elements[2].addEventListener('click', (e) => {
                this.selectedListOption = newList.id;
                appLogic.showForm('editList');
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
        appLogic.setNewIndex(document.querySelector('#menuContent'), 'data-indexlist', listsCreator.lists, 'list')
        if (list.id === this.listSelected) {
            const addTaskBtn = document.querySelector('#addTaskBtn');
            document.querySelectorAll('.tasks').forEach(task => { task.remove() })
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
        this.refreshListSelected();
        this.lists.forEach(list => {
            if (list.selected === true) { list.domReference.classList.add('active') }
            else {
                list.domReference.classList.remove('active')
                document.querySelectorAll('.tasks').forEach(task => { task.remove() })
            }
        });

        this.showTaskOfList(list)
    }

    static showTaskOfList(list) {
        if (list.selected === true) { list.tasks.forEach(task => { tasksCreator.createTaskDom(task.title, task) }) }
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
        if (this.lists.length <= 1) {
            const btn = userInterface.createListSuggestion()
            btn.addEventListener('click', () => {
                this.createList('List of test XD')
                const addTaskBtn = document.querySelector('#addTaskBtn');
                this.showSelectList(this.lists[1]);
                this.refreshListSelected();
                if (this.listSelected > 1) { addTaskBtn.classList.remove('h') } else { addTaskBtn.classList.add('h') };
                this.changeTitleOfViewMenu()
                tasksCreator.createTask('dfgsdfgdfgs', 'Contexto', '2022-12-12');
                tasksCreator.createTask('dfgsdfgdfgs', 'Contexto', '2022-12-12');
                tasksCreator.createTask('dfgsdfgdfgs', 'Contexto', '2022-12-12');
                tasksCreator.createTask('dfgsdfgdfgs', 'Contexto', '2022-12-12');

                console.log(this.lists)
            })
        }
        else if (document.querySelector('#noLists') != undefined) {
            const noListsSuggestion = document.querySelector('#noLists');
            noListsSuggestion.remove();
        };
    }
}

export { appLogic }