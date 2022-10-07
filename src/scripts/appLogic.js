import { userInterface } from './domCreation.js'
import { listsCreator } from './listsCreator'
import { tasksCreator } from './tasksCreator'
import { animate } from './animations'



class appLogic {

    static start() {
        userInterface.createPageDom();

        const addListBtn = document.querySelector('#addListBtn')
        const menuOptionsBtns = document.querySelectorAll('.menusBtn')
        const showListObject = document.querySelector('.titleOptions')
        const menuContainer = document.querySelector('.menuContainer')

        showListObject.addEventListener('click', () => {
            console.log(listsCreator.lists)
            console.log(listsCreator.listSelected)
        })

        addListBtn.addEventListener('click', () => { this.showForm('addList') });

        menuOptionsBtns.forEach(btn => btn.addEventListener('click', () => {
            setTimeout(() => {
                if (btn.id == 'settingsMenuBtn') {
                    menuContainer.classList.remove('open')
                    animate.contentOut(() => {
                        listsCreator.removePreviewElements('task');
                        listsCreator.removePreviewElements('category');
                        listsCreator.removePreviewElements('calendarContainer');
                        listsCreator.removePreviewElements('noLists');
                        listsCreator.showListContent(listsCreator.lists[0]);

                        animate.settingsIn();
                    })

                } else {
                    menuContainer.classList.remove('open')
                    animate.contentOut(() => {
                        listsCreator.removePreviewElements('task')
                        listsCreator.removePreviewElements('category')
                        listsCreator.removePreviewElements('calendarContainer')
                        listsCreator.removePreviewElements('settingsContainer')
                        listsCreator.createListSuggestion()
                        listsCreator.changeTitleOfViewMenu()
                        const list = listsCreator.lists[listsCreator.listSelected - 1];
                        if (list != null || list != undefined) { listsCreator.showListContent(list) };


                    })
                }
            }, 0);
        }))

        this.addBurgerMenu()
        listsCreator.createList('All Tasks')
        animate.interface()
    }

    static taskBtnCreator() {
        if (listsCreator.listSelected > 1 && document.querySelector('#taskMenuInput').checked) {
            if (document.querySelector('.addTaskBtnContainer') == undefined) {
                const addTaskBtn = userInterface.taskBtn()
                animate.addTaskIn()
                addTaskBtn.addEventListener('click', () => { this.showForm('addTask') });
            }
        } else {
            if (document.querySelector('.addTaskBtnContainer') != undefined) {
                console.log('test')
                animate.addTaskOut(() => {
                    document.querySelector('.addTaskBtnContainer').remove()
                })

            }

        }
    }

    static showForm(form) {
        const item = userInterface.createForm(form)
        animate.formsIn(item[3], item[2])

        //item 0 = accept btn
        //item 1 = cancel btn
        //item 2 = background contains form
        //item 3 = form
        if (form === 'addList') {
            const input = item[2].querySelector('#addListInput')
            const form = item[2].querySelector('#addListForm')
            item[0].addEventListener('click', (e) => {
                if (input.value === 'All Tasks') {
                    this.showAdvertising()
                    e.preventDefault();
                    form.reset();
                } else if (input.value !== '') {
                    animate.formsOut(item[3], item[2], () => {
                        listsCreator.createList(input.value);
                        item[2].remove();
                    })
                    e.preventDefault();
                }
            });
            item[1].addEventListener('click', (e) => {
                animate.formsOut(item[3], item[2], () => {
                    item[2].remove();
                })
                e.preventDefault();
            });

        } else if (form === 'addTask') {
            const input = item[2].querySelector('#addTaskInput')
            const inputDescription = item[2].querySelector('#descriptionTaskInput')
            const inputDate = item[2].querySelector('#addTaskDateInput')
            item[0].addEventListener('click', (e) => {
                if (input.value !== '' && inputDate.value !== '') {
                    animate.formsOut(item[3], item[2], () => {
                        tasksCreator.createTask(input.value, inputDescription.value, inputDate.value)
                        item[2].remove();
                    })
                    e.preventDefault();
                }
            });
            item[1].addEventListener('click', (e) => {
                animate.formsOut(item[3], item[2], () => {
                    item[2].remove();
                })
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
                    animate.formsOut(item[3], item[2], () => {
                        listsCreator.lists.forEach(element => {
                            if (element.id === listsCreator.selectedListOption) {
                                element.title = input.value
                                listsCreator.refreshDataList(element)
                            }
                        })
                        listsCreator.changeTitleOfViewMenu()
                        item[2].remove()
                    })
                    e.preventDefault();

                }
            });
            item[1].addEventListener('click', (e) => {
                animate.formsOut(item[3], item[2], () => {
                    item[2].remove()
                })
                e.preventDefault();

            });

            listsCreator.lists.forEach(list => { if (list.id === listsCreator.selectedListOption) { input.value = list.title } })
        }
    }

    static showAdvertising() {
        const element = userInterface.showAdvertising('All Tasks');
        animate.advertisingsIn(element[2], element[1]);
        element[0].addEventListener('click', () => {
            animate.advertisingsOut(element[2], element[1], () => { element[1].remove() });
        });
    }

    static setNewIndex(container, dataAtribute, array, className) {
        if (listsCreator.listSelected === 1) {
            array.forEach((task, index) => {
                task.id = index + 1;
            })
            const nodeList = container.querySelectorAll(`.${className}`);
            nodeList.forEach((node, index) => {
                node.setAttribute(dataAtribute, index + 1);
            });
        } else {
            const nodeList = container.querySelectorAll(`.${className}`);
            nodeList.forEach((node, index) => {
                node.setAttribute(dataAtribute, index + 1);
                array[index].id = index + 1;
            });
        }

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

    static addBurgerMenu() {
        const page = document.querySelector('html');
        const menu = document.querySelector('.menuContainer');
        function add() {
            const size = page.scrollWidth
            if (size <= 1050 && document.querySelector('#listViewBtn') == undefined) {
                console.log('in')
                const btns = userInterface.navigationBtns()
                btns[0].addEventListener('click', () => {
                    menu.classList.add('open')
                })
                btns[1].addEventListener('click', () => {
                    menu.classList.remove('open')
                })
            } else if (size > 1050 && document.querySelector('.listViewBtnContainer') != undefined) {
                console.log('out')
                document.querySelector('.listViewBtnContainer').remove()
                document.querySelector('.previewOfListBtnContainer').remove()
            }
        }
        add()
        window.addEventListener('resize', add)
    }
}

export { appLogic }