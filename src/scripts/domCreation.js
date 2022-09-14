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
        createElement('button', menuSelector, { class: 'taskMenuBtn menusBtn' }, 'Tasks');
        createElement('button', menuSelector, { class: 'calendarMenuBtn menusBtn' }, 'Calendar');
        createElement('button', menuSelector, { class: 'ConfigBtn menusBtn' }, 'Settings');

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

        //add item form
        const addItemForm = createElement('form', backgroundOfForms, { class: 'addItemForm h', id: 'addItemForm' });
        createElement('h2', addItemForm, { class: 'addItemTitle' }, 'Add a new Task! 😺');
        createElement('input', addItemForm, { class: 'addItemInput', id: 'addItemInput', type: 'text', placeholder: 'Task', required: true });
        const addItemOptions = createElement('div', addItemForm, { class: 'addItemOptions' });
        createElement('button', addItemOptions, { class: 'addItemSubmit', id: 'addItemSubmitBtn', type: 'Submit' }, 'Add');
        createElement('button', addItemOptions, { class: 'addItemCancel', id: 'addItemCancelBtn' }, 'Cancel');
        //add item form

        //edit list form
        const editListNameForm = createElement('form', backgroundOfForms, { class: 'editListNameForm h', id: 'editListNameForm' });
        createElement('h2', editListNameForm, { class: 'editListTitle' }, 'Edit your name list! 👀');
        createElement('input', editListNameForm, { class: 'addItemInput', id: 'editListInput', type: 'text', placeholder: 'List name', required: true });
        const editListOptions = createElement('div', editListNameForm, { class: 'editListOptions' });
        createElement('button', editListOptions, { class: 'editListSubmit', id: 'editListSubmitBtn', type: 'Edit' }, 'Add');
        createElement('button', editListOptions, { class: 'editListCancel', id: 'editListCancelBtn' }, 'Cancel');
        //edit list form

        const optionsContent = createElement('div', document.body, { class: 'optionsContent', id: 'optionsContent' });
        createElement('h2', optionsContent, { class: 'titleOptions' }, 'My Lists');



        const list = createElement('div', menuContent, { class: 'list', 'data-indexList': '1' });
        const firstLine = createElement('div', list, { class: 'firstLine' });
        const titleAndItemsContainer = createElement('div', firstLine, { class: 'titleAndItemsContainer' });
        createElement('h2', titleAndItemsContainer, { class: 'titleOfList' }, 'All Tasks');
        createElement('p', titleAndItemsContainer, { class: 'itemsOfList' }, 'Items');
        createElement('p', firstLine, { class: 'itemsCompletedOfList' }, 'Completed');
        const optionsContentItemsContainerAllTask = createElement('div', optionsContent, { class: 'optionsContentitemsContainerAllTask', 'data-indexListItemsContainer': '1' }, 'ALL TASKS');

        // const addItemBtnContainer = createElement('div', optionsContentItemsContainerAllTask, { class: 'addItemBtnContainer' });
        // createElement('button', addItemBtnContainer, { class: 'addItemBtn', id: 'addItemBtn' }, 'Add Task +');

    }

    static createListDom(menuContent, optionsContent, title) {
        console.log('createListDom');
        const initialIndex = menuContent.childElementCount;
        const list = createElement('div', menuContent, { class: 'list', 'data-indexList': `${initialIndex}` });
        const firstLine = createElement('div', list, { class: 'firstLine' });
        const titleAndItemsContainer = createElement('div', firstLine, { class: 'titleAndItemsContainer' });
        createElement('h2', titleAndItemsContainer, { class: 'titleOfList' }, `${title}`);
        createElement('p', titleAndItemsContainer, { class: 'itemsOfList' }, 'Items');
        createElement('p', firstLine, { class: 'itemsCompletedOfList' }, 'Completed');

        const optionsContentItemsContainerAllTask = createElement('div', optionsContent, { class: 'optionsContentitemsContainerAllTask', 'data-indexListItemsContainer': `${initialIndex}` }, `ALL TASKS ${initialIndex}`);
        const addItemBtnContainer = createElement('div', optionsContentItemsContainerAllTask, { class: 'addItemBtnContainer' });
        const addItemBtn = createElement('button', addItemBtnContainer, { class: 'addItemBtn', id: 'addItemBtn' }, 'Add Task +');

        const buttonSettings = createElement('div', list, { class: 'buttonSettings' });
        const editButton = createElement('button', buttonSettings, { class: 'editButton', id: 'editButton' }, 'edit');
        const deleteButton = createElement('button', buttonSettings, { class: 'deleteButton', id: 'deleteButton' }, 'delete');
        const elements = [list, buttonSettings, editButton, deleteButton, addItemBtn]
        return elements

    }
}

class task {
    constructor(title, description, status, date, priority) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.date = date;
        this.priority = priority;
    }
}

export { userInterface }