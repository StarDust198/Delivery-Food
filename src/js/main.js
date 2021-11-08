import auth from './modules/auth';
import partners from './modules/partners';

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

    auth(user);
    partners(user);
});