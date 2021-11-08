import auth from './modules/auth';
import menu from './modules/menu';

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

    auth(user);
    menu(user);
});