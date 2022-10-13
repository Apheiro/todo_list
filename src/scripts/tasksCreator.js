import { userInterface } from './domCreation.js'
import { listsCreator } from './listsCreator'
import { appLogic } from './appLogic'
import { animate } from './animations'
import { format, parseISO, isAfter, isToday, isBefore, addDays } from 'date-fns'
import { parse, stringify, toJSON, fromJSON } from 'flatted';
import autoAnimate from '@formkit/auto-animate'

class tasksCreator {

    constructor(title, description, date) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.checked = false
        this.domReference;
        // this.listObjReference;
        this.id;
    }

    static createTask(title, description, date) {
        const newTask = new tasksCreator(title, description, date)
        this.createTaskDom(newTask.title, newTask, date);

        listsCreator.lists.forEach(list => {
            if (list.id === listsCreator.listSelected) {
                list.tasks.push(newTask);
                list.tasksNumber = list.tasks.length;
                // listsCreator.refreshDataList(list)
                listsCreator.refreshDataList()
                // newTask.listObjReference = list;
                this.refreshAllTasksValues()
            }
        });
        localStorage.setItem('lists', stringify(listsCreator.lists))
        return newTask
    }

    static createTaskDom(title, task, date) {
        // element 0 = tasks
        // element 1 = deleteBtn
        // element 2 = moreInfoBtn
        // element 3 = inputCheckbox
        // element 4 = checkboxCustom
        // element 5 = titleTsk
        if (isToday(new Date(parseISO(date)))) {
            const taskPreviews = document.querySelector('#taskPreviews')
            const categoryDom = document.querySelector('#Today')
            if (!taskPreviews.contains(categoryDom)) {
                const elementsCategory = userInterface.createTaskCategory('Today', 2)
                autoAnimate(elementsCategory[2], { duration: 300 })
                animate.categoryIn(elementsCategory[0]);
                elementsCategory[1].addEventListener('click', () => {
                    elementsCategory[1].classList.toggle('up')
                    elementsCategory[2].classList.toggle('h')
                })
            }
            start('Today')
        } else if (isBefore(new Date(parseISO(date)), new Date())) {
            const taskPreviews = document.querySelector('#taskPreviews')
            const categoryDom = document.querySelector('#Expired')
            if (!taskPreviews.contains(categoryDom)) {
                const elementsCategory = userInterface.createTaskCategory('Expired', 1)
                autoAnimate(elementsCategory[2], { duration: 300 })
                animate.categoryIn(elementsCategory[0]);
                elementsCategory[1].addEventListener('click', () => {
                    elementsCategory[1].classList.toggle('up')
                    elementsCategory[2].classList.toggle('h')
                })
            }
            start('Expired')
        } else if (isAfter(new Date(parseISO(date)), new Date()) && isBefore(new Date(parseISO(date)), addDays(new Date(), 1))) {
            const taskPreviews = document.querySelector('#taskPreviews')
            const categoryDom = document.querySelector('#Tomorrow')
            if (!taskPreviews.contains(categoryDom)) {
                const elementsCategory = userInterface.createTaskCategory('Tomorrow', 3)
                autoAnimate(elementsCategory[2], { duration: 300 })
                animate.categoryIn(elementsCategory[0]);
                elementsCategory[1].addEventListener('click', () => {
                    elementsCategory[1].classList.toggle('up')
                    elementsCategory[2].classList.toggle('h')
                })
            }
            start('Tomorrow')
        } else if (isAfter(new Date(parseISO(date)), addDays(new Date(), 1))) {
            const taskPreviews = document.querySelector('#taskPreviews')
            const categoryDom = document.querySelector('#Upcoming')
            if (!taskPreviews.contains(categoryDom)) {
                const elementsCategory = userInterface.createTaskCategory('Upcoming', 4)
                autoAnimate(elementsCategory[2], { duration: 300 })
                animate.categoryIn(elementsCategory[0]);
                elementsCategory[1].addEventListener('click', () => {
                    elementsCategory[1].classList.toggle('up')
                    elementsCategory[2].classList.toggle('h')
                })
            }
            start('Upcoming')
        }

        function start(category) {
            const domElements = userInterface.createTasksDom(title, task.checked, category);
            const taskIndex = (document.querySelectorAll('.tasks')).length;
            task.domReference = domElements[0];
            task.domReference.setAttribute('data-indextask', taskIndex);
            task.id = taskIndex;
            domElements[0].addEventListener('mouseenter', () => { domElements[0].querySelector('.taskBtnsGroup').classList.add('show') });
            domElements[0].addEventListener('mouseleave', () => { domElements[0].querySelector('.taskBtnsGroup').classList.remove('show') });
            domElements[2].addEventListener('click', () => { tasksCreator.showTaskInfo(task) });
            domElements[3].addEventListener('change', () => {
                tasksCreator.refreshListValues(task, domElements[3]);
                localStorage.setItem('lists', stringify(listsCreator.lists));
            });
            domElements[1].addEventListener('click', () => {
                tasksCreator.deleteTask(task);
                tasksCreator.refreshListValues(task, domElements[3]);
            });
        }



    }

    static listSelect() {
        let listSel;
        listsCreator.lists.forEach(list => {
            if (list.id == listsCreator.listSelected) {
                listSel = list
            }
        })
        return listSel
    }

    static refreshListValues(task, input) {
        task.checked = input.checked;
        const listObj = this.listSelect()

        function countChecked(list) {
            let checked = 0
            list.tasks.forEach(task => { if (task.checked === true) { checked++ } })
            return checked
        }

        if (listObj.id == 1) {
            listsCreator.lists.forEach(list => {
                list.taskCompleted = countChecked(list)
                list.tasksNumber = list.tasks.length;
            });
        } else {
            listObj.taskCompleted = countChecked(listObj)
            listObj.tasksNumber = listObj.tasks.length;
        }

        this.refreshAllTasksValues()
        listsCreator.refreshDataList();
    }

    static refreshAllTasksValues() {
        let allTasksCount = 0
        let allTasksCheckedCount = 0
        listsCreator.lists.forEach(list => {
            list.tasks.forEach(tasks => {
                if (tasks.checked === true) { allTasksCheckedCount++ }
                allTasksCount++
            })
        })
        listsCreator.lists[0].taskCompleted = allTasksCheckedCount;
        listsCreator.lists[0].tasksNumber = allTasksCount;
        listsCreator.refreshDataList();
    }

    static deleteTask(task) {
        const parent = task.domReference.parentElement
        const listSelected = this.listSelect()
        if (listSelected.id == 1) {
            task.domReference.remove();
            listsCreator.lists.forEach(list => { list.tasks.forEach(taskOfArray => { if (task === taskOfArray) { list.tasks.splice(list.tasks.indexOf(taskOfArray), 1) } }) })
            appLogic.setNewIndex(document.querySelector('#taskPreviews'), 'data-indextask', listSelected.tasks, 'tasks')
            if (parent.childNodes.length === 0) { parent.parentElement.remove() }
            localStorage.setItem('lists', stringify(listsCreator.lists))
        } else {
            task.domReference.remove();
            listSelected.tasks.forEach(taskOfArray => { if (taskOfArray.id === task.id) { listSelected.tasks.splice(listSelected.tasks.indexOf(taskOfArray), 1); } })
            appLogic.setNewIndex(document.querySelector('#taskPreviews'), 'data-indextask', listSelected.tasks, 'tasks')
            if (parent.childNodes.length === 0) { parent.parentElement.remove() }
            localStorage.setItem('lists', stringify(listsCreator.lists))
        }
    }

    static showTaskInfo(task) {
        // element 0 = background
        // element 1 = closeInfoBtn
        // element 2 = editInfoBtn
        // element 3 = infoTask
        const domElements = userInterface.taskInfoDom(task.title, task.description, format(new Date(parseISO(task.date)), 'PPPP'));
        animate.formsIn(domElements[3], domElements[0]);
        domElements[1].addEventListener('click', () => {
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
            domElementsEdit[1].addEventListener('click', (e) => {
                if (domElementsEdit[3].value !== '' && domElementsEdit[4].value !== '') {
                    const listSelected = this.listSelect()
                    task.date = domElementsEdit[3].value;
                    task.title = domElementsEdit[4].value;
                    task.description = domElementsEdit[5].value;
                    this.refreshDataTask(task)
                    this.showTaskInfo(task)
                    listsCreator.showSelectList(listSelected)
                    domElementsEdit[0].remove()
                    e.preventDefault();
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

export { tasksCreator }