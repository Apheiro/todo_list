import { userInterface } from './domCreation.js';
import { tasksCreator } from './tasksCreator.js';
import { appLogic } from './appLogic';
import { animate } from './animations';
import anime from 'animejs/lib/anime.es.js';
import { parseISO, format } from 'date-fns';
import autoAnimate from '@formkit/auto-animate'
import { parse, stringify, toJSON, fromJSON } from 'flatted';
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
        autoAnimate(elements[0], { duration: 200 })
        elements[0].addEventListener('click', () => {
            this.showSelectList(newList);
            appLogic.taskBtnCreator();
            this.changeTitleOfViewMenu();
        });

        if (title != 'All Tasks') {
            elements[0].addEventListener('mouseenter', (e) => {
                const btnsElements = userInterface.createListBtnsDom(elements[0])
                btnsElements[1].addEventListener('click', (e) => {
                    this.selectedListOption = newList.id;
                    appLogic.showForm('editList');
                    e.stopPropagation();
                });
                btnsElements[2].addEventListener('click', (e) => {
                    this.deleteListAdvertising(newList)
                    e.stopPropagation();
                });
            });
            elements[0].addEventListener('mouseleave', (e) => {
                elements[0].querySelectorAll('.buttonSettings').forEach(element => element.remove())
            });

            localStorage.setItem('lists', stringify(this.lists))
            // ERROR 
        }
        this.createListSuggestion()
    }

    static deleteListAdvertising(list) {
        if (list.tasks.length > 0) {
            const elements = userInterface.showAdvertising('delete')
            animate.advertisingsIn(elements[3], elements[2])
            elements[0].addEventListener('click', () => {
                animate.advertisingsOut(elements[3], elements[2], () => {
                    animate.deleteList(list.domReference, () => {
                        this.deleteList(list)
                        this.refreshListSelected();
                    })
                    elements[2].remove()
                })
            });
            elements[1].addEventListener('click', () => {
                animate.advertisingsOut(elements[3], elements[2], () => {
                    elements[2].remove()
                })
            })
        } else {
            animate.deleteList(list.domReference, () => {
                this.deleteList(list)
                this.refreshListSelected();
            })
        }
    }

    static deleteList(list) {
        list.domReference.remove();
        this.lists.forEach(element => { if (element.id === list.id) { this.lists.splice(this.lists.indexOf(element), 1); } })
        appLogic.setNewIndex(document.querySelector('#menuContent'), 'data-indexlist', this.lists, 'list')
        const allTasks = this.lists[0]
        allTasks.taskCompleted = allTasks.taskCompleted - list.taskCompleted;
        allTasks.tasksNumber = allTasks.tasksNumber - list.tasksNumber;

        if (list.id === this.listSelected) {
            document.querySelector('.addTaskBtnContainer').remove()
            this.removePreviewElements('tasks')
            this.removePreviewElements('category')
            this.refreshDataList();
            this.listSelected = null;
        }

        this.changeTitleOfViewMenu();
        this.refreshDataList();
        this.createListSuggestion();
        localStorage.setItem('lists', stringify(this.lists))
    }

    static refreshDataList() {
        this.lists.forEach(list => {
            const ListSelected = list.domReference;
            ListSelected.querySelector('.titleOfList').innerText = `${list.title}`;
            ListSelected.querySelector('.TasksOfList').innerText = `${list.tasksNumber} Tasks`;
            ListSelected.querySelector('.TasksCompletedOfList').innerText = `${list.taskCompleted} Completed`;
        })

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
        animate.contentOut(() => {
            this.removePreviewElements('task')
            this.removePreviewElements('category')
            this.removePreviewElements('calendarContainer')
            this.removePreviewElements('settingsContainer')

            const tasks = document.querySelector('#taskMenuInput');
            const calendar = document.querySelector('#calendarMenuInput');
            const settings = document.querySelector('#settingsMenuInput');
            appLogic.taskBtnCreator();
            if (tasks.checked) {
                list.calendar.clear()
                this.changeTitleOfViewMenu()
                if (list.title != 'All Tasks') {
                    list.tasks.forEach(task => { tasksCreator.createTaskDom(task.title, task, task.date) })
                } else {
                    this.lists.forEach(list => list.tasks.forEach(task => { tasksCreator.createTaskDom(task.title, task, task.date) }))
                }
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
                    setTimeout(() => {
                        animate.calendarIn()
                    }, 0);
                }
            } else if (settings.checked) {
                appLogic.showSettings()
                animate.settingsIn()
            }
        })
    }

    static changeTitleOfViewMenu() {
        this.lists[0].domReferenceTitle.innerText = 'View'
        this.lists.forEach(list => { if (list.id === this.listSelected) { if (this.listSelected != undefined || this.listSelected != null) { list.domReferenceTitle.innerText = list.title } } })
    }

    static refreshListSelected() {
        this.lists.forEach(list => { if (list.selected === true) { this.listSelected = list.id } else { return } })
    }

    static createListSuggestion() {
        this.removePreviewElements('noLists')
        const settingsMenuInput = document.querySelector('#settingsMenuInput');
        if (this.lists.length <= 1 && !settingsMenuInput.checked && document.querySelector('#noLists') == undefined) {
            this.removePreviewElements('tasks')
            this.removePreviewElements('category')
            const btn = userInterface.createListSuggestion()
            btn.addEventListener('click', () => {
                this.createList('You new List!')
                this.listSelected = 1
                this.lists[1].selected = true;
                appLogic.taskBtnCreator();
                this.lists.forEach(list => {
                    if (list.selected === true) { list.domReference.classList.add('active') }
                    else { list.domReference.classList.remove('active') }
                })

                this.refreshListSelected();
                this.changeTitleOfViewMenu();
                tasksCreator.createTask('Create your first list of tasks! Click to see more ------>', 'Create a new list clicking on "+" btn in the list menu.', format(new Date(), 'yyyy-MM-dd'));
                tasksCreator.createTask('Add your first task!', 'Click on "Add task" in the bottom right corner, set the name, a description and the due date.', format(new Date(), 'yyyy-MM-dd'));
                tasksCreator.createTask('Change the style of your app!', 'Click on "settings" in bottom rigth corner of lists menus', format(new Date(), 'yyyy-MM-dd'));
                tasksCreator.createTask('And check my github for more funny projects of this principiant', 'Go to "settings" and just click in the github button!', format(new Date(), 'yyyy-MM-dd'));

                this.removePreviewElements('task')
                this.removePreviewElements('category')
                this.showSelectList(this.lists[1]);
                localStorage.setItem('lists', stringify(this.lists))
            });
        }
    }

    static removePreviewElements(type) {
        if (type === 'task') { document.querySelectorAll('.tasks').forEach(task => task.remove()) }
        else if (type === 'category') { document.querySelectorAll('.category').forEach(category => category.remove()) }
        else if (type === 'calendarContainer') { document.querySelectorAll('.calendarContainer').forEach(calendar => calendar.remove()) }
        else if (type === 'settingsContainer') { if (document.querySelector('.settingsContainer') != undefined) { document.querySelector('.settingsContainer').remove() } }
        else if (type === 'noLists') { document.querySelectorAll('#noLists').forEach(noLists => noLists.remove()) }
    }
}

export { listsCreator }