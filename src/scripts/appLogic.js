import { userInterface } from './domCreation.js'
import { listsCreator } from './listsCreator'
import { tasksCreator } from './tasksCreator'



class appLogic {

    static start() {
        userInterface.createPageDom();
        const addListBtn = document.querySelector('#addListBtn')
        const addTaskBtn = document.querySelector('#addTaskBtn');
        const menuOptionsBtns = document.querySelectorAll('.menusBtn')

        addListBtn.addEventListener('click', () => { this.showForm('addList') });
        addTaskBtn.addEventListener('click', () => { this.showForm('addTask') });
        menuOptionsBtns.forEach(btn => btn.addEventListener('click', () => {
            setTimeout(() => {
                if (btn.id == 'settingsMenuBtn') {
                    listsCreator.removePreviewElements()
                    this.showSettings()
                } else {
                    listsCreator.createListSuggestion()
                    listsCreator.changeTitleOfViewMenu()
                    const list = listsCreator.lists[listsCreator.listSelected - 1];
                    if (list != null || list != undefined) { listsCreator.showListContent(list) };

                }
            }, 0);
        }))

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

    static showSettings() {
        const titleOfSelection = document.querySelector('#titleOfSelection');
        titleOfSelection.innerText = 'Settings';
        const root = document.querySelector(':root');
        if (document.querySelector('.settingsContainer') == undefined) {
            const themeBtns = userInterface.settingsDom();
            themeBtns.forEach(btn => {
                if (btn.id === 'theme1') { btn.addEventListener('click', () => { root.style = '--background-color: #D4D4D4;--module-color: #F0F0F0;--module-color-secondary: #ffffff;--module-color-secondary-2: #ffffff;--selected-option: #CDCAFF;--details-color: 119, 110, 255;--text-color: #717171;'; }) }
                else if (btn.id === 'theme2') { btn.addEventListener('click', () => { root.style = '--background-color: #202329;--module-color: #262c33;--module-color-secondary: #2b3138;--module-color-secondary-2: #323a43;--selected-option: #343068;--details-color: 119, 110, 255;--text-color: #C4BDF0;'; }) }
                else if (btn.id === 'theme3') { btn.addEventListener('click', () => { root.style = '--background-color: #202329;--module-color: #262c33;--module-color-secondary: #2b3138;--module-color-secondary-2: #323a43;--selected-option: #553629;--details-color: 255, 154, 115;--text-color: #f0dabd;'; }) }
                else if (btn.id === 'theme4') { btn.addEventListener('click', () => { root.style = '--background-color: #202329;--module-color: #262c33;--module-color-secondary: #2b3138;--module-color-secondary-2: #323a43;--selected-option: #425529;--details-color: 218, 255, 115;--text-color: #daf0bd;'; }) }
            })

        }

    }
}

export { appLogic }