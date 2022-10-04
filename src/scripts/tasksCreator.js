import { userInterface } from './domCreation.js'
import { listsCreator } from './listsCreator'
import { appLogic } from './appLogic'
import { format, parseISO, isAfter, isToday, isBefore, addDays } from 'date-fns'

class tasksCreator {

    constructor(title, description, date) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.checked = false
        this.domReference;
        this.listObjReference;
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
                newTask.listObjReference = list;
                this.refreshAllTasksValues()
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
            domElements[2].addEventListener('click', () => { tasksCreator.showTaskInfo(task) });
            domElements[3].addEventListener('change', () => { tasksCreator.refreshListValues(task, domElements[3]) });
            domElements[1].addEventListener('click', () => {
                tasksCreator.deleteTask(task)
                tasksCreator.refreshListValues(task, domElements[3])
            });
        }



    }

    static refreshListValues(task, input) {
        task.checked = input.checked;
        const listObj = task.listObjReference
        function countChecked() {
            let checked = 0
            listObj.tasks.forEach(task => { if (task.checked === true) { checked++ } })
            return checked
        }
        listObj.taskCompleted = countChecked()
        listObj.tasksNumber = listObj.tasks.length;
        listsCreator.refreshDataList(listObj);
        this.refreshAllTasksValues()
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
        listsCreator.refreshDataList(listsCreator.lists[0]);
    }

    static deleteTask(task) {
        const parent = task.domReference.parentElement
        task.domReference.remove();
        listsCreator.lists.forEach(list => {
            if (list.id === listsCreator.listSelected) {
                list.tasks.forEach(taskOfarray => { if (taskOfarray.id === task.id) { list.tasks.splice(list.tasks.indexOf(taskOfarray), 1); } })
                appLogic.setNewIndex(document.querySelector('#taskPreviews'), 'data-indextask', list.tasks, 'tasks')
            }
        })
        if (parent.childNodes.length === 0) { parent.parentElement.remove() }
    }

    static showTaskInfo(task) {
        // element 0 = background
        // element 1 = closeInfoBtn
        // element 2 = editInfoBtn
        const domElements = userInterface.taskInfoDom(task.title, task.description, format(new Date(parseISO(task.date)), 'PPPP'));
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
                    task.date = domElementsEdit[3].value;
                    task.title = domElementsEdit[4].value;
                    task.description = domElementsEdit[5].value;
                    this.refreshDataTask(task)
                    this.showTaskInfo(task)
                    listsCreator.showSelectList(task.listObjReference)
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