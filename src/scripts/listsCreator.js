import { userInterface } from './domCreation.js'
import { tasksCreator } from './tasksCreator.js'
import { appLogic } from './appLogic'
import { parseISO } from 'date-fns'


import Calendar from '@toast-ui/calendar';
class listsCreator {
    static lists = [];
    static selectedListOption;
    static listSelected;

    constructor(title) {
        this.id;
        this.title = title;
        this.tasks = [];
        this.tasksNumber = 0;
        this.taskCompleted = 0;
        this.domReference;
        this.domReferenceTitle;
        this.selected = false;
        this.calendar;
    }

    static createList(title) {
        //element 0 = List
        //element 1 = buttons menus
        //element 2 = edit Btn
        //element 3 = delete Btn
        //element 4 = index
        const newList = new listsCreator(title);
        const elements = userInterface.createListDom(newList.title, newList.tasksNumber, newList.taskCompleted);

        newList.calendar = new Calendar(null, {
            defaultView: 'month',
            isReadOnly: true,
            month: {
                visibleWeeksCount: 3,
            }

        });
        newList.domReference = elements[0];
        newList.domReferenceTitle = document.querySelector('#titleOfSelection');
        newList.id = elements[4];
        this.lists.push(newList);
        elements[0].addEventListener('click', () => {
            const addTaskBtn = document.querySelector('#addTaskBtn');
            this.showSelectList(newList);
            if (this.listSelected > 1 && document.querySelector('#taskMenuInput').checked) { addTaskBtn.classList.remove('h') } else { addTaskBtn.classList.add('h') };
            this.changeTitleOfViewMenu();
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
        this.createListSuggestion()
    }

    static deleteList(list) {
        if (list.tasks.length > 0) {
            const elements = userInterface.showAdvertising('delete')
            elements[0].addEventListener('click', () => {
                list.domReference.remove();
                this.lists.forEach(element => { if (element.id === list.id) { this.lists.splice(this.lists.indexOf(element), 1); } })
                appLogic.setNewIndex(document.querySelector('#menuContent'), 'data-indexlist', this.lists, 'list')
                const allTasks = this.lists[0]
                allTasks.taskCompleted = allTasks.taskCompleted - list.taskCompleted;
                allTasks.tasksNumber = allTasks.tasksNumber - list.tasksNumber;
                if (list.id === this.listSelected) {
                    const addTaskBtn = document.querySelector('#addTaskBtn');
                    this.removePreviewElements()
                    addTaskBtn.classList.add('h');
                    this.refreshDataList(allTasks);
                    this.listSelected = null;
                }
                this.createListSuggestion()
                this.changeTitleOfViewMenu()
                this.showListContent(this.lists[0])
                this.refreshDataList(this.lists[0])
                elements[2].remove()
            })
            elements[1].addEventListener('click', () => {
                elements[2].remove()
            })
        } else {
            list.domReference.remove();
            this.lists.forEach(element => { if (element.id === list.id) { this.lists.splice(this.lists.indexOf(element), 1); } })
            appLogic.setNewIndex(document.querySelector('#menuContent'), 'data-indexlist', this.lists, 'list')
            const allTasks = this.lists[0]
            allTasks.taskCompleted = allTasks.taskCompleted - list.taskCompleted;
            allTasks.tasksNumber = allTasks.tasksNumber - list.tasksNumber;
            if (list.id === this.listSelected) {
                const addTaskBtn = document.querySelector('#addTaskBtn');
                this.removePreviewElements()
                addTaskBtn.classList.add('h');
                this.refreshDataList(allTasks);
                this.listSelected = null;
            }
            this.createListSuggestion();
            this.changeTitleOfViewMenu();
            this.showListContent(this.lists[0]);
            this.refreshDataList(this.lists[0]);
        }
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

        this.lists.forEach(list => {
            if (list.selected === true) { list.domReference.classList.add('active') }
            else { list.domReference.classList.remove('active') }
        });
        this.refreshListSelected();
        this.showListContent(list);
    }

    static showListContent(list) {
        this.removePreviewElements()
        const tasks = document.querySelector('#taskMenuInput');
        const calendar = document.querySelector('#calendarMenuInput');
        if (this.listSelected > 1 && document.querySelector('#taskMenuInput').checked) { addTaskBtn.classList.remove('h') } else { addTaskBtn.classList.add('h') };
        if (tasks.checked) {
            list.calendar.clear()
            this.changeTitleOfViewMenu()
            if (list.title != 'All Tasks') {
                list.tasks.forEach(task => { tasksCreator.createTaskDom(task.title, task, task.date) })
            } else { this.lists.forEach(list => list.tasks.forEach(task => { tasksCreator.createTaskDom(task.title, task, task.date) })) }
        } else if (calendar.checked) {
            this.changeTitleOfViewMenu()
            if (this.lists.length > 1) {
                userInterface.calendarContainer();
                list.calendar.clear()
                list.calendar.container = document.querySelector('.calendarContainer');
                if (list.title != 'All Tasks') {
                    list.tasks.forEach(task => {
                        list.calendar.createEvents([{
                            id: `${task.id}`,
                            calendarId: `cal${task.id}`,
                            category: 'milestone',
                            title: `${task.title}`,
                            start: new Date(parseISO(task.date)),
                            end: new Date(parseISO(task.date)),

                        }])
                    })
                } else {
                    this.lists.forEach(list => list.tasks.forEach(task => {
                        this.lists[0].calendar.createEvents([{
                            id: `${task.id}`,
                            calendarId: `cal${task.id}`,
                            category: 'milestone',
                            title: `${task.title}`,
                            start: new Date(parseISO(task.date)),
                            end: new Date(parseISO(task.date)),

                        }])
                    }))
                }
                list.calendar.render();
            }
        }

    }

    static changeTitleOfViewMenu() {
        this.lists[0].domReferenceTitle.innerText = 'View'
        this.lists.forEach(list => { if (list.id === this.listSelected) { if (this.listSelected != undefined || this.listSelected != null) { list.domReferenceTitle.innerText = list.title } } })
    }

    static refreshListSelected() {
        this.lists.forEach(list => { if (list.selected === true) { this.listSelected = list.id } else { return } })
    }

    static createListSuggestion() {
        this.removePreviewElements()
        const settingsMenuInput = document.querySelector('#settingsMenuInput');
        if (this.lists.length <= 1 && !settingsMenuInput.checked && document.querySelector('#noLists') == undefined) {
            const btn = userInterface.createListSuggestion()
            btn.addEventListener('click', () => {
                this.createList('You new List!')
                const addTaskBtn = document.querySelector('#addTaskBtn');
                if (this.listSelected > 1) { addTaskBtn.classList.remove('h') } else { addTaskBtn.classList.add('h') };
                this.showSelectList(this.lists[1]);
                this.refreshListSelected();
                this.changeTitleOfViewMenu();
                tasksCreator.createTask('dfgsdfgdfgs', 'Contexto', '2022-10-05');
                tasksCreator.createTask('dfgsdfgdfgs', 'Contexto', '2022-10-01');
                tasksCreator.createTask('dfgsdfgdfgs', 'Contexto', '2022-09-28');
                tasksCreator.createTask('dfgsdfgdfgs', 'Contexto', '2022-10-02');
                this.showListContent(this.lists[1]);
            });
        }
        // else if (document.querySelector('#noLists') != undefined) {
        //     const noListsSuggestion = document.querySelector('#noLists');
        //     noListsSuggestion.remove();
        // };
    }

    static removePreviewElements() {
        document.querySelectorAll('.tasks').forEach(task => task.remove())
        document.querySelectorAll('.category').forEach(category => category.remove())
        document.querySelectorAll('.calendarContainer').forEach(calendar => calendar.remove())
        document.querySelectorAll('.settingsContainer').forEach(settings => settings.remove())
        document.querySelectorAll('#noLists').forEach(noLists => noLists.remove())
    }
}

export { listsCreator }