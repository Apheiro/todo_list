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

        const listsContentPreview = createElement('div', document.body, { class: 'listsContentPreview', id: 'listsContentPreview' });
        createElement('h2', listsContentPreview, { class: 'titleOptions', id: 'titleOfSelection' }, 'View');

        // createElement('div', listsContentPreview, { class: 'listsContentPreviewTasksContainerAllTask', 'data-indexListTasksContainer': '1' }, 'ALL TASKS');

        const taskPreview = createElement('div', listsContentPreview, { class: 'taskPreviews', id: 'taskPreviews' });

        // const today = createElement('div', taskPreview, { class: 'today categoryStyle h', id: 'today' });
        // createElement('h2', today, { class: 'todayTitle', id: 'todayTitle' }, 'Today');
        // createElement('div', today, { class: 'todayTasks', id: 'todayTasks' });

        // const Tomorrow = createElement('div', taskPreview, { class: 'tomorrow categoryStyle h', id: 'tomorrow' });
        // createElement('h2', Tomorrow, { class: 'tomorrowTitle', id: 'tomorrowTitle' }, 'Tomorrow');
        // createElement('div', Tomorrow, { class: 'tomorrowTasks', id: 'tomorrowTasks' });

        // const Upcoming = createElement('div', taskPreview, { class: 'upcoming categoryStyle h', id: 'upcoming' });
        // createElement('h2', Upcoming, { class: 'upcomingTitle', id: 'upcomingTitle' }, 'Upcoming');
        // createElement('div', Upcoming, { class: 'upcomingTasks', id: 'upcomingTasks' });

        // const Someday = createElement('div', taskPreview, { class: 'someday categoryStyle h', id: 'Someday' });
        // createElement('h2', Someday, { class: 'somedayTitle', id: 'somedayTitle' }, 'Someday');
        // createElement('div', Someday, { class: 'somedayTasks', id: 'somedayTasks' });

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

        if (title != 'All Tasks') {
            const buttonSettings = createElement('div', list, { class: 'buttonSettings' });
            const editButton = createElement('button', buttonSettings, { class: 'editButton', id: 'editButton' }, 'edit');
            const deleteButton = createElement('button', buttonSettings, { class: 'deleteButton', id: 'deleteButton' }, 'delete');
            const elements = [list, buttonSettings, editButton, deleteButton, initialIndex]
            return elements
        }

        const elements = [list, null, null, null, initialIndex]
        return elements
    }

    static showAdvertising(situation) {
        if (situation === 'All Tasks') {
            const advertising = createElement('div', document.querySelector('body'), { class: 'advertising' });
            const background = createElement('div', advertising, { class: 'background' });
            const advertisingContainer = createElement('div', background, { class: 'advertisingContainer' });
            createElement('p', advertisingContainer, null, 'You can\'t create a List named \"All Tasks\" try other name 😓');
            const acceptBtn = createElement('button', advertisingContainer, {}, 'Accept');
            const elements = [acceptBtn, advertising]
            return elements
        }
    }

    static createForm(form) {
        const backgroundOfForms = createElement('div', document.body, { class: 'background', id: 'backgroundOfForms' });
        if (form === 'addList') {
            const addListForm = createElement('form', backgroundOfForms, { class: 'addListForm', id: 'addListForm' });
            createElement('h2', addListForm, { class: 'addListTitle' }, 'Add a new list! 🎉');
            createElement('input', addListForm, { class: 'input', id: 'addListInput', type: 'text', placeholder: 'List name', required: '' });
            const addListOptions = createElement('div', addListForm, { class: 'addListOptions' });
            const addListSubmitBtn = createElement('button', addListOptions, { class: 'submitFormBtn', id: 'addListSubmitBtn', type: 'Submit' }, 'Add');
            const addListCancelBtn = createElement('button', addListOptions, { class: 'cancelFormBtn', id: 'addListCancelBtn' }, 'Cancel');
            const elements = [addListSubmitBtn, addListCancelBtn, backgroundOfForms]
            return elements
        } else if (form === 'addTask') {
            const addTaskForm = createElement('form', backgroundOfForms, { class: 'addTaskForm', id: 'addTaskForm' });
            createElement('h2', addTaskForm, { class: 'addTaskTitle' }, 'Add a new Task! 😺');
            createElement('input', addTaskForm, { class: 'input', id: 'addTaskInput', type: 'text', placeholder: 'Task', required: '' });
            createElement('textarea', addTaskForm, { class: 'inputTextArea', id: 'descriptionTaskInput', placeholder: 'Description' });
            createElement('input', addTaskForm, { class: 'input', id: 'addTaskDateInput', type: 'date', required: '' });
            const addTaskOptions = createElement('div', addTaskForm, { class: 'addTaskOptions' });
            const addTaskSubmitBtn = createElement('button', addTaskOptions, { class: 'submitFormBtn ', id: 'addTaskSubmitBtn', type: 'Submit' }, 'Add');
            const addTaskCancelBtn = createElement('button', addTaskOptions, { class: 'cancelFormBtn', id: 'addTaskCancelBtn' }, 'Cancel');
            const elements = [addTaskSubmitBtn, addTaskCancelBtn, backgroundOfForms];
            return elements;
        } else if (form === 'editList') {
            const editListNameForm = createElement('form', backgroundOfForms, { class: 'editListNameForm', id: 'editListNameForm' });
            createElement('h2', editListNameForm, { class: 'editListTitle' }, 'Edit your name list! 👀');
            createElement('input', editListNameForm, { class: 'input', id: 'editListInput', type: 'text', placeholder: 'List name', required: '' });
            const editListOptions = createElement('div', editListNameForm, { class: 'editListOptions' });
            const editListSubmitBtn = createElement('button', editListOptions, { class: 'submitFormBtn', id: 'editListSubmitBtn', type: 'Edit' }, 'Accept');
            const editListCancelBtn = createElement('button', editListOptions, { class: 'cancelFormBtn', id: 'editListCancelBtn' }, 'Cancel');
            const elements = [editListSubmitBtn, editListCancelBtn, backgroundOfForms]
            return elements
        }

    }

    static createListSuggestion() {
        const taskPreview = document.querySelector('#taskPreviews')
        const noLists = createElement('div', taskPreview, { class: 'noLists', id: 'noLists' }, 'Create a new List!⚡');
        const btn = createElement('button', noLists, { class: 'createExampleBtn', id: 'createExampleBtn' }, 'Example');
        return btn
    }

    static createTaskSuggestion() {
        const noTask = createElement('span', taskPreview, { class: 'noTask', id: 'noTask' }, 'Create a new task!✨');
    }

    static createTasksDom(title, checked, categoryName) {
        function inputCheckboxFunction() {
            if (checked === true) {
                const inputCheckbox = createElement('input', checkboxCustom, { class: 'inputCheckbox', id: 'inputCheckbox', checked: '', type: 'checkbox' });
                return inputCheckbox;
            } else {
                const inputCheckbox = createElement('input', checkboxCustom, { class: 'inputCheckbox', id: 'inputCheckbox', type: 'checkbox' });
                return inputCheckbox
            }
        }
        const category = document.querySelector(`#${categoryName}`);
        const tasks = createElement('div', category, { class: 'tasks' });
        const checkboxCustom = createElement('label', tasks, { class: 'checkboxCustom' });
        const inputCheckbox = inputCheckboxFunction()
        createElement('span', checkboxCustom, { class: 'checkbox' });
        createElement('h3', tasks, { class: 'titleTask' }, `${title}`);
        const btns = createElement('div', tasks, { class: 'taskBtnsGroup' });
        const deleteBtn = createElement('button', btns, { class: 'taskBtns', id: 'deleteTaskBtn' }, null, `<svg class="btnOfTask" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.75 7.75L12.25 12.25M12.25 7.75L7.75 12.25M19 10C19 11.1819 18.7672 12.3522 18.3149 13.4442C17.8626 14.5361 17.1997 15.5282 16.364 16.364C15.5282 17.1997 14.5361 17.8626 13.4442 18.3149C12.3522 18.7672 11.1819 19 10 19C8.8181 19 7.64778 18.7672 6.55585 18.3149C5.46392 17.8626 4.47177 17.1997 3.63604 16.364C2.80031 15.5282 2.13738 14.5361 1.68508 13.4442C1.23279 12.3522 1 11.1819 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
        const moreInfoBtn = createElement('button', btns, { class: 'taskBtns', id: 'moreInfoTaskBtn' }, null, `<svg class="btnOfTask" width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.625 10H6.25M10.375 10H10M14.125 10H13.75M6.625 10C6.625 10.0995 6.58549 10.1948 6.51517 10.2652C6.44484 10.3355 6.34946 10.375 6.25 10.375C6.15054 10.375 6.05516 10.3355 5.98484 10.2652C5.91451 10.1948 5.875 10.0995 5.875 10C5.875 9.90054 5.91451 9.80516 5.98484 9.73483C6.05516 9.66451 6.15054 9.625 6.25 9.625C6.34946 9.625 6.44484 9.66451 6.51517 9.73483C6.58549 9.80516 6.625 9.90054 6.625 10V10ZM10.375 10C10.375 10.0995 10.3355 10.1948 10.2652 10.2652C10.1948 10.3355 10.0995 10.375 10 10.375C9.90054 10.375 9.80516 10.3355 9.73483 10.2652C9.66451 10.1948 9.625 10.0995 9.625 10C9.625 9.90054 9.66451 9.80516 9.73483 9.73483C9.80516 9.66451 9.90054 9.625 10 9.625C10.0995 9.625 10.1948 9.66451 10.2652 9.73483C10.3355 9.80516 10.375 9.90054 10.375 10V10ZM14.125 10C14.125 10.0995 14.0855 10.1948 14.0152 10.2652C13.9448 10.3355 13.8495 10.375 13.75 10.375C13.6505 10.375 13.5552 10.3355 13.4848 10.2652C13.4145 10.1948 13.375 10.0995 13.375 10C13.375 9.90054 13.4145 9.80516 13.4848 9.73483C13.5552 9.66451 13.6505 9.625 13.75 9.625C13.8495 9.625 13.9448 9.66451 14.0152 9.73483C14.0855 9.80516 14.125 9.90054 14.125 10V10ZM19 10C19 11.1819 18.7672 12.3522 18.3149 13.4442C17.8626 14.5361 17.1997 15.5282 16.364 16.364C15.5282 17.1997 14.5361 17.8626 13.4442 18.3149C12.3522 18.7672 11.1819 19 10 19C8.8181 19 7.64778 18.7672 6.55585 18.3149C5.46392 17.8626 4.47177 17.1997 3.63604 16.364C2.80031 15.5282 2.13738 14.5361 1.68508 13.4442C1.23279 12.3522 1 11.1819 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
        const elements = [tasks, deleteBtn, moreInfoBtn, inputCheckbox];
        return elements;
    }

    static createTaskCategory(categoryName, order) {
        const taskPreviews = document.querySelector('#taskPreviews');
        const category = createElement('div', taskPreviews, { class: 'category', id: 'category', style: `order: ${order}` });
        const categoryHeader = createElement('div', category, { class: 'categoryHeader' });
        const categoryTitle = createElement('h2', categoryHeader, { class: 'categoryTitle' }, categoryName);
        const openBtn = createElement('button', categoryHeader, { class: 'moreInfoBtns' }, null, `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>`);
        const taskContainer = createElement('div', category, { class: 'taskContainer', id: categoryName });
    }

    static taskInfoDom(title, description, date) {
        const background = createElement('div', document.body, { class: 'background', id: 'backgroundOfinfo' });
        const info = createElement('div', background, { class: 'infoTask' });
        const headOfInfo = createElement('div', info, { class: 'headOfInfo' });
        const closeInfoBtn = createElement('button', headOfInfo, { class: 'moreInfoBtns', id: 'closeInfoBtn' }, null, `<svg width="22" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 21L1 11L11 1" stroke="#FF9A73" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`)
        createElement('h3', headOfInfo, { class: 'titleOfWindowDescription' }, 'Description');
        const editInfoBtn = createElement('button', headOfInfo, { class: 'moreInfoBtns', id: 'editInfoBtn' }, null, `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.7859 3.38637L18.5998 6.20019M16.9998 13.5334V18.6C16.9998 19.2365 16.7469 19.847 16.2969 20.2971C15.8468 20.7471 15.2363 21 14.5998 21H3.39997C2.76346 21 2.15302 20.7471 1.70293 20.2971C1.25285 19.847 1 19.2365 1 18.6V7.40018C1 6.76367 1.25285 6.15323 1.70293 5.70315C2.15302 5.25306 2.76346 5.00021 3.39997 5.00021H8.46657M15.7859 3.38637L17.5854 1.58586C17.9605 1.21074 18.4693 1 18.9998 1C19.5303 1 20.039 1.21074 20.4141 1.58586C20.7893 1.96097 21 2.46974 21 3.00024C21 3.53073 20.7893 4.0395 20.4141 4.41462L9.08736 15.7414C8.52345 16.305 7.82803 16.7192 7.06392 16.9467L4.19996 17.8L5.05328 14.9361C5.28077 14.172 5.69501 13.4766 6.2586 12.9126L15.7859 3.38637V3.38637Z" stroke="#FF9A73" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
        const titleOfInfoTask = createElement('div', info, { class: 'titleOfInfoTask' });
        createElement('h4', titleOfInfoTask, { class: 'dateTitleDescription' }, `${date}`);
        createElement('h2', titleOfInfoTask, { class: 'taskTitleDescription' }, `${title}`);
        createElement('p', info, { class: 'descriptionMoreInfo' }, `${description}`);
        const elements = [background, closeInfoBtn, editInfoBtn];
        return elements;
    }

    static taskInfoEditForm() {
        const background = document.querySelector('#backgroundOfinfo')
        const info = createElement('form', background, { class: 'infoTask' });
        const headOfInfo = createElement('div', info, { class: 'headOfInfo' });
        const acceptEditInfoBtn = createElement('button', headOfInfo, { class: 'moreInfoBtns', id: 'acceptEditInfoBtn' }, null, `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>`)
        createElement('h3', headOfInfo, { class: 'titleOfWindowDescription' }, 'Description');
        const cancelEditInfoBtn = createElement('button', headOfInfo, { class: 'moreInfoBtns', id: 'cancelEditInfoBtn' }, null, `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`);
        const titleOfInfoTask = createElement('div', info, { class: 'titleOfInfoTask' });
        const dateTitleDescriptionInput = createElement('input', titleOfInfoTask, { class: 'dateTitleDescriptionInput', type: 'date', id: 'dateTitleDescriptionInput', required: '' });
        const taskTitleDescriptionInput = createElement('textarea', titleOfInfoTask, { class: 'taskTitleDescriptionInput', id: 'taskTitleDescriptionInput', required: '', placeholder: 'Title' });
        const descriptionMoreInfoInput = createElement('textarea', info, { class: 'descriptionMoreInfoInput', id: 'descriptionMoreInfoInput', placeholder: 'Description' });

        const elements = [background, acceptEditInfoBtn, cancelEditInfoBtn, dateTitleDescriptionInput, taskTitleDescriptionInput, descriptionMoreInfoInput];
        return elements;
    }

}

export { userInterface }