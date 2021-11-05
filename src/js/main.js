import modals from './modules/modals';
import forms from './modules/forms';
import { login, logout } from './services/login';
import checkInputs from './modules/checkInputs';

window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    let user;

    if (localStorage.getItem('user')) {
        user = JSON.parse(localStorage.getItem('user'));
        login(user);
    } else {
        user = {};
    }

    document.querySelector('.button-out').addEventListener('click', () => logout(user));

    modals('.button-auth', '.modal-auth', '.close-auth');
    forms('#logInForm', user);
    checkInputs('#logInForm input', '.button-primary.button-login');

    
});