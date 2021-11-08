import auth from './modules/auth';
import partners from './modules/partners';

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let user;

    auth(user);
    partners();
});