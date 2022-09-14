import { userInterface } from './domCreation.js'

class appLogic {
    static logic() {
        const addListBtn = document.querySelector('#addListBtn');
        const addListForm = document.querySelector('#addListForm');
        const addListSubmitBtn = document.querySelector('#addListSubmitBtn');
        const addListCancelBtn = document.querySelector('#addListCancelBtn');
        const addListInput = document.querySelector('#addListInput');

        const addItemBtn = document.querySelector('#addItemBtn');
        const addItemForm = document.querySelector('#addItemForm');
        const addItemCancelBtn = document.querySelector('#addItemCancelBtn');

        const editListNameForm = document.querySelector('#editListNameForm')
        const editListCancelBtn = document.querySelector('#editListCancelBtn')

        const backgroundOfForms = document.querySelector('#backgroundOfForms');
        const optionsContent = document.querySelector('#optionsContent');
        const menuContent = document.querySelector('#menuContent');
        const list = document.querySelector('.list')


        addListBtn.addEventListener('click', () => { appLogic.showForm(addListForm, backgroundOfForms) });


        list.addEventListener('click', () => { listOfTasks.showSelectListContent(list, optionsContent) });
        addListSubmitBtn.addEventListener('click', (e) => {
            if (addListInput.value !== '') {
                listOfTasks.createList(menuContent, optionsContent, addListInput.value);
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

        addItemCancelBtn.addEventListener('click', (e) => {
            backgroundOfForms.classList.toggle('h');
            addItemForm.classList.toggle('h');
            e.preventDefault();
            addItemForm.reset();
        });

        editListCancelBtn.addEventListener('click', (e) => {
            backgroundOfForms.classList.toggle('h');
            editListNameForm.classList.toggle('h');
            e.preventDefault();
            editListNameForm.reset();
        });
    }

    static showForm(form, background) {
        background.classList.toggle('h');
        form.classList.toggle('h');
    }

    static matchingIndex(container, dataAtribute) {
        const nodeList = container.childNodes;
        console.log(nodeList)
        nodeList.forEach(node => { node.setAttribute(`${dataAtribute}`, appLogic.nodeIndexItem(container, node)); });
    }

    static nodeIndexItem(parent, child) {
        const index = Array.prototype.indexOf.call(parent.children, child);
        return index;
    }
}

class listOfTasks {
    static createList(menuContent, optionsContent, title) {
        const elements = userInterface.createListDom(menuContent, optionsContent, title)
        elements[0].addEventListener('click', () => { listOfTasks.showSelectListContent(elements[0], optionsContent) });
        elements[0].addEventListener('mouseover', () => { elements[1].classList.add('buttonSettingsShow') })
        elements[0].addEventListener('mouseout', () => { elements[1].classList.remove('buttonSettingsShow') })
        elements[2].addEventListener('click', (e) => {
            listOfTasks.editList(elements[2])
            e.stopPropagation();
        })
        elements[3].addEventListener('click', (e) => {
            listOfTasks.deleteList(elements[3])
            e.stopPropagation();
        })
        elements[4].addEventListener('click', () => { appLogic.showForm(addItemForm, backgroundOfForms) });
    }

    static showSelectListContent(list, optionsContent) {
        const menuContent = list.parentElement.childNodes;
        const optionsContentChilds = optionsContent.childNodes;
        menuContent.forEach(item => {
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                optionsContentChilds.forEach(items => { items.classList.remove('activeItemsContainer'); })
            }
        })
        if (!list.classList.contains('active')) {
            list.classList.add('active');
            optionsContentChilds.forEach(items => {
                if (list.classList.contains('active') && list.getAttribute('data-indexlist') == items.getAttribute('data-indexlistitemscontainer')) {
                    items.classList.add('activeItemsContainer');
                }
            })
        }
    }
    static deleteList(element) {
        const list = element.parentElement.parentElement
        const index = list.getAttribute('data-indexlist')
        const items = document.querySelector(`[data-indexlistitemscontainer="${index}"]`)
        const menuContent = document.querySelector('#menuContent');
        const optionsContent = document.querySelector('#optionsContent')

        list.remove()
        items.remove()
        appLogic.matchingIndex(menuContent, 'data-indexlist')
        appLogic.matchingIndex(optionsContent, 'data-indexlistitemscontainer')
        console.log(list)
        console.log(items)
    }

    static editList(element) {
        const editListNameForm = document.querySelector('#editListNameForm');
        console.log(element)
        appLogic.showForm(editListNameForm, backgroundOfForms)
    }
}

export { appLogic }