import './styles/style.css';
import { createElement, createElementNS, createImg } from './scripts/createElements.js';
function component() {
    createElement('div', document.body, { class: 'container' }, 'Hello webpack');
}
component()