import auth from './modules/auth';
import partners from './modules/partners';
import slider from './modules/slider';
import cart from './modules/cart';

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

    auth(user);
    partners(user);
    slider();
    cart();
});