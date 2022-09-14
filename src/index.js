import './styles/style.css';
import { userInterface } from './scripts/domCreation.js';
import { appLogic } from './scripts/appLogic.js';

userInterface.createPageDom();
appLogic.logic();
