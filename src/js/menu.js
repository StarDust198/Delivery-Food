import auth from './modules/auth';
import menu from './modules/menu';

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let user;

    auth(user);
    menu();
});