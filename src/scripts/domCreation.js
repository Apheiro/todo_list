// import '../styles/style.css';
import { createElement, createElementNS, createImg } from './createElements.js';
// createElement(elementType, appendChild, atribute, innerText, innerHtml, elementInsertion, elementBefore);
// createElementNS(elementType, appendChild, atribute, innerText, innerHtml,);
// createImg(path, appendChild, atribute, width, height);

class userInterface {
    static createPageDom() {
        const menu = createElement('div', document.body, { class: 'menu' });
        createElement('h2', menu, { class: 'titleOptions' }, 'My Lists');
        const menuContent = createElement('div', menu, { class: 'menuContent', id: 'menuContent' });
        const menuSelector = createElement('div', menu, { class: 'menuOptions' });
        createElement('button', menuSelector, { class: 'taskMenuBtn menusBtn' }, null, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 icons">
        <path class="icons" d="M6 3a3 3 0 00-3 3v2.25a3 3 0 003 3h2.25a3 3 0 003-3V6a3 3 0 00-3-3H6zM15.75 3a3 3 0 00-3 3v2.25a3 3 0 003 3H18a3 3 0 003-3V6a3 3 0 00-3-3h-2.25zM6 12.75a3 3 0 00-3 3V18a3 3 0 003 3h2.25a3 3 0 003-3v-2.25a3 3 0 00-3-3H6zM17.625 13.5a.75.75 0 00-1.5 0v2.625H13.5a.75.75 0 000 1.5h2.625v2.625a.75.75 0 001.5 0v-2.625h2.625a.75.75 0 000-1.5h-2.625V13.5z" />
        </svg>Tasks`);
        createElement('button', menuSelector, { class: 'calendarMenuBtn menusBtn' }, null, `<svg xmlns="http://www.w3.org/2000/svg"  class="icons" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
        <path class="icons" d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
        <path class="icons" fill-rule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clip-rule="evenodd" />
        </svg>Calendar`);
        createElement('button', menuSelector, { class: 'ConfigBtn menusBtn' }, null, `<svg xmlns="http://www.w3.org/2000/svg" class="icons" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
        <path class="icons" fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clip-rule="evenodd" />
        </svg>Settings`);

        const addListBtnContainer = createElement('div', menuContent, { class: 'addListBtnContainer' });
        createElement('button', addListBtnContainer, { class: 'addListBtn', id: 'addListBtn' }, '+');

        const backgroundOfForms = createElement('div', document.body, { class: 'backgroundOfForms h', id: 'backgroundOfForms' });

        //add list form
        const addListForm = createElement('form', backgroundOfForms, { class: 'addListForm h', id: 'addListForm' });
        createElement('h2', addListForm, { class: 'addListTitle' }, 'Add a new list! 🎉');
        createElement('input', addListForm, { class: 'addListInput', id: 'addListInput', type: 'text', placeholder: 'List name', required: true });
        const addListOptions = createElement('div', addListForm, { class: 'addListOptions' });
        createElement('button', addListOptions, { class: 'addListSubmit', id: 'addListSubmitBtn', type: 'Submit' }, 'Add');
        createElement('button', addListOptions, { class: 'addListCancel', id: 'addListCancelBtn' }, 'Cancel');
        //add list form

        //add Task form
        const addTaskForm = createElement('form', backgroundOfForms, { class: 'addTaskForm h', id: 'addTaskForm' });
        createElement('h2', addTaskForm, { class: 'addTaskTitle' }, 'Add a new Task! 😺');
        createElement('input', addTaskForm, { class: 'addTaskInput', id: 'addTaskInput', type: 'text', placeholder: 'Task', required: true });
        const addTaskOptions = createElement('div', addTaskForm, { class: 'addTaskOptions' });
        createElement('button', addTaskOptions, { class: 'addTaskSubmit', id: 'addTaskSubmitBtn', type: 'Submit' }, 'Add');
        createElement('button', addTaskOptions, { class: 'addTaskCancel', id: 'addTaskCancelBtn' }, 'Cancel');
        //add Task form

        //edit list form
        const editListNameForm = createElement('form', backgroundOfForms, { class: 'editListNameForm h', id: 'editListNameForm' });
        createElement('h2', editListNameForm, { class: 'editListTitle' }, 'Edit your name list! 👀');
        createElement('input', editListNameForm, { class: 'addTaskInput', id: 'editListInput', type: 'text', placeholder: 'List name', required: true });
        const editListOptions = createElement('div', editListNameForm, { class: 'editListOptions' });
        createElement('button', editListOptions, { class: 'editListSubmit', id: 'editListSubmitBtn', type: 'Edit' }, 'Add');
        createElement('button', editListOptions, { class: 'editListCancel', id: 'editListCancelBtn' }, 'Cancel');
        //edit list form

        const listsContentPreview = createElement('div', document.body, { class: 'listsContentPreview', id: 'listsContentPreview' });
        createElement('h2', listsContentPreview, { class: 'titleOptions' }, 'My Lists');



        const list = createElement('div', menuContent, { class: 'list', 'data-indexList': '1' });
        const firstLine = createElement('div', list, { class: 'firstLine' });
        const titleAndTasksContainer = createElement('div', firstLine, { class: 'titleAndTasksContainer' });
        createElement('h2', titleAndTasksContainer, { class: 'titleOfList' }, 'All Tasks');
        createElement('p', titleAndTasksContainer, { class: 'TasksOfList' }, 'Tasks');
        createElement('p', firstLine, { class: 'TasksCompletedOfList' }, 'Completed');
        // createElement('div', listsContentPreview, { class: 'listsContentPreviewTasksContainerAllTask', 'data-indexListTasksContainer': '1' }, 'ALL TASKS');

        const taskPreview = createElement('div', listsContentPreview, { class: 'taskPreviews', id: 'taskPreviews' });


        const noLists = createElement('div', taskPreview, { class: 'noLists h', id: 'noLists' }, 'Create a new List!⚡');
        createElement('button', noLists, { class: 'createExampleBtn', id: 'createExampleBtn' }, 'Example')

        const noTask = createElement('span', taskPreview, { class: 'noTask h', id: 'noTask' }, 'Create a new task!✨');

        const today = createElement('div', taskPreview, { class: 'today categoryStyle h', id: 'today' });
        createElement('h2', today, { class: 'todayTitle', id: 'todayTitle' }, 'Today')
        createElement('div', today, { class: 'todayTasks', id: 'todayTasks' })

        const Tomorrow = createElement('div', taskPreview, { class: 'tomorrow categoryStyle h', id: 'tomorrow' });
        createElement('h2', Tomorrow, { class: 'tomorrowTitle', id: 'tomorrowTitle' }, 'Tomorrow')
        createElement('div', Tomorrow, { class: 'tomorrowTasks', id: 'tomorrowTasks' })

        const Upcoming = createElement('div', taskPreview, { class: 'upcoming categoryStyle h', id: 'upcoming' });
        createElement('h2', Upcoming, { class: 'upcomingTitle', id: 'upcomingTitle' }, 'Upcoming')
        createElement('div', Upcoming, { class: 'upcomingTasks', id: 'upcomingTasks' })

        const Someday = createElement('div', taskPreview, { class: 'someday categoryStyle h', id: 'Someday' });
        createElement('h2', Someday, { class: 'somedayTitle', id: 'somedayTitle' }, 'Someday')
        createElement('div', Someday, { class: 'somedayTasks', id: 'somedayTasks' })



        // add task button
        const addTaskBtnContainer = createElement('div', taskPreview, { class: 'addTaskBtnContainer' });
        createElement('button', addTaskBtnContainer, { class: 'addTaskBtn h', id: 'addTaskBtn' }, 'Add Task +');
        // add task button
    }

    static createListDom(title, tasksNumber, tasksCompleted) {
        const menuContent = document.querySelector('#menuContent')
        const initialIndex = menuContent.childElementCount;
        const list = createElement('div', menuContent, { class: 'list', 'data-indexList': `${initialIndex}` });
        const firstLine = createElement('div', list, { class: 'firstLine' });
        const titleAndTasksContainer = createElement('div', firstLine, { class: 'titleAndTasksContainer' });
        createElement('h2', titleAndTasksContainer, { class: 'titleOfList' }, `${title}`);
        createElement('p', titleAndTasksContainer, { class: 'TasksOfList' }, `${tasksNumber} Tasks`);
        createElement('p', firstLine, { class: 'TasksCompletedOfList' }, `${tasksCompleted} Completed`);

        // const listsContentPreviewTasksContainerAllTask = createElement('div', listsContentPreview, { class: 'listsContentPreviewTasksContainerAllTask', 'data-indexListTasksContainer': `${initialIndex}` }, `ALL TASKS ${initialIndex}`);
        // const addTaskBtnContainer = createElement('div', listsContentPreviewTasksContainerAllTask, { class: 'addTaskBtnContainer' });
        // const addTaskBtn = createElement('button', addTaskBtnContainer, { class: 'addTaskBtn', id: 'addTaskBtn' }, 'Add Task +');

        const buttonSettings = createElement('div', list, { class: 'buttonSettings' });
        const editButton = createElement('button', buttonSettings, { class: 'editButton', id: 'editButton' }, 'edit');
        const deleteButton = createElement('button', buttonSettings, { class: 'deleteButton', id: 'deleteButton' }, 'delete');

        const elements = [list, buttonSettings, editButton, deleteButton, addTaskBtn, initialIndex]
        return elements
    }
}


export { userInterface }