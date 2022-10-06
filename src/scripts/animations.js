import anime from 'animejs/lib/anime.es.js';

// /home/eyen_pc / the_odin_project / todo_list / node_modules / animejs / lib / anime.es.js

class animate {
    static interface() {
        anime({
            targets: ['.menu', '.listsContentPreview'],
            easing: 'easeInOutExpo',
            opacity: [0, 1],
            scale: [0.95, 1],
            duration: 1000
        });

        anime({
            targets: '.menuOptions',
            easing: 'easeInOutExpo',
            opacity: [0, 1],
            scale: [1.1, 1],
            duration: 1000,
            delay: 300
        });

        anime({
            targets: '.titleOptions',
            easing: 'easeInOutExpo',
            opacity: [0, 1],
            scale: [0.9, 1],
            duration: 1000,
            delay: 300
        });

        anime({
            targets: '.addListBtn',
            easing: 'easeInOutExpo',
            opacity: [0, 1],
            scale: [1.1, 1],
            duration: 1000,
            delay: 400
        });

        anime({
            targets: '.menusBtn',
            easing: 'easeInOutExpo',
            opacity: [0, 1],
            scale: [1.1, 1],
            duration: 1000,
            delay: anime.stagger(100, { start: 800 }),
        });

        anime({
            targets: '.list',
            easing: 'easeInOutExpo',
            opacity: [0, 1],
            scale: [1.2, 1],
            delay: anime.stagger(100, { start: 800 }),
        });



    }

    static addList(dom) {
        anime({
            targets: dom,
            easing: 'easeInOutExpo',
            opacity: [0, 1],
            scale: [1.2, 1],
            duration: 300
        });
    }

    static deleteList(dom, fn) {
        const animation = anime({
            targets: dom,
            easing: 'easeInOutExpo',
            opacity: [1, 0],
            scale: [1, 0.8],
            duration: 500
        });
        animation.finished.then(fn)
    }

    static formsIn(domForm, domBackground) {
        anime({
            targets: domForm,
            easing: 'easeInOutExpo',
            opacity: [0, 1],
            scale: [0.95, 1],
            duration: 300,
            delay: 300
        });

        anime({
            targets: domBackground,
            easing: 'easeInOutExpo',
            opacity: [0, 1],
            duration: 400
        });
    }

    static formsOut(domForm, domBackground, fn) {
        anime({
            targets: domForm,
            easing: 'easeInOutExpo',
            opacity: [1, 0],
            scale: [1, 1.05],
            duration: 300,
        });
        const animation = anime({
            targets: domBackground,
            easing: 'easeInOutExpo',
            opacity: [1, 0],
            duration: 400,
            delay: 100
        });
        animation.finished.then(fn);
    }

    static advertisingsIn(dom, domBackground) {
        anime({
            targets: dom,
            easing: 'easeInOutExpo',
            opacity: [0, 1],
            scale: [0.95, 1],
            duration: 300,
            delay: 300
        });

        anime({
            targets: domBackground,
            easing: 'easeInOutExpo',
            opacity: [0, 1],
            duration: 400
        });
    }

    static advertisingsOut(dom, domBackground, fn) {
        anime({
            targets: dom,
            easing: 'easeInOutExpo',
            opacity: [1, 0],
            scale: [1, 1.05],
            duration: 300,
        });
        const animation = anime({
            targets: domBackground,
            easing: 'easeInOutExpo',
            opacity: [1, 0],
            duration: 400,
            delay: 100
        });
        animation.finished.then(fn);
    }

    static taskIn(domh3, domLabel) {
        anime({
            targets: domh3,
            easing: 'easeInOutExpo',
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 200,

        });
        anime({
            targets: domLabel,
            easing: 'easeInOutExpo',
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 200,

        });
    }

    static categoryIn(dom) {
        anime({
            targets: dom,
            easing: 'easeInOutExpo',
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 200,
        });
    }

    // static tasksIn() {
    //     anime({
    //         targets: '.tasks h3',
    //         easing: 'easeInOutExpo',
    //         opacity: [0, 1],
    //         scale: [0.8, 1],
    //         duration: 600,

    //     });
    //     anime({
    //         targets: '.tasks label',
    //         easing: 'easeInOutExpo',
    //         opacity: [0, 1],
    //         scale: [0.8, 1],
    //         duration: 400,

    //     });

    //     anime({
    //         targets: '.categoryHeader h2',
    //         easing: 'easeInOutExpo',
    //         opacity: [0, 1],
    //         scale: [0.8, 1],
    //         duration: 400,
    //     });
    // }

    static calendarIn() {
        anime({
            targets: '.toastui-calendar-daygrid-cell',
            easing: 'easeInOutExpo',
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 600,
            delay: anime.stagger(10),
        });
        anime({
            targets: '.toastui-calendar-template-monthDayName',
            easing: 'easeInOutExpo',
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 600,
            delay: anime.stagger(10),
        });
        anime({
            targets: '.toastui-calendar-weekday-event-block',
            easing: 'easeInOutExpo',
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 600,
            delay: anime.stagger(10, { start: 200 }),
        });
    }
    static settingsIn() {
        anime({
            targets: '.settingsContainer',
            easing: 'easeInOutExpo',
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 400,
        });
    }

    static contentOut(fn) {
        anime({
            targets: '.tasks h3',
            easing: 'easeInOutExpo',
            opacity: [1, 0],
            scale: [1, 0.8],
            duration: 200,

        });
        anime({
            targets: '.tasks label',
            easing: 'easeInOutExpo',
            opacity: [1, 0],
            scale: [1, 0.8],
            duration: 200,
        });

        anime({
            targets: '.categoryHeader h2',
            easing: 'easeInOutExpo',
            opacity: [1, 0],
            scale: [1, 0.8],
            duration: 200,
        });

        var animation = anime({
            targets: '.toastui-calendar-daygrid-cell',
            easing: 'easeInOutExpo',
            opacity: [1, 0],
            scale: [1, 0.8],
            duration: 200,
            delay: anime.stagger(10),
        });
        anime({
            targets: '.toastui-calendar-template-monthDayName',
            easing: 'easeInOutExpo',
            opacity: [1, 0],
            scale: [1, 0.8],
            duration: 300,
            delay: anime.stagger(10),
        });
        anime({
            targets: '.toastui-calendar-weekday-event-block',
            easing: 'easeInOutExpo',
            opacity: [1, 0],
            scale: [1, 0.8],
            duration: 300,
            delay: anime.stagger(10),
        });

        anime({
            targets: '.settingsContainer',
            easing: 'easeInOutExpo',
            opacity: [1, 0],
            scale: [1, 0.8],
            duration: 400,
        });

        animation.finished.then(fn);
    }
    static addTaskIn() {
        anime({
            targets: '.addTaskBtnContainer',
            easing: 'easeInOutExpo',
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 400,
        });
    }
    static addTaskOut(fn) {
        const animation = anime({
            targets: '.addTaskBtnContainer',
            easing: 'easeInOutExpo',
            opacity: [1, 0],
            scale: [1, 0.8],
            duration: 100,
        });

        animation.finished.then(fn);
    }

    static showBtnsListIn(dom, fn, resize) {
        const animation = anime({
            targets: dom,
            easing: 'easeInOutExpo',
            height: resize,
            duration: 250,
        });
        animation.finished.then(fn);
    }
    static showBtnsListOut(dom, fn, resize) {
        const animation = anime({
            targets: dom,
            easing: 'easeInOutExpo',
            height: resize,
            duration: 150,
        });
        animation.finished.then(fn);
    }
}


export { animate }