const auth = (user) => {

    //login & logout
    const loginElem = document.querySelector('.button-auth'),
          logoutElem = document.querySelector('.button-out'),
          usernameElem = document.querySelector('.user-name');

    const login = () => {        
        loginElem.style.display = 'none';
        logoutElem.style.display = 'flex';
        usernameElem.style.display = 'flex';
        usernameElem.textContent = user.login;

        localStorage.setItem('user', JSON.stringify(user));
    };

    const logout = () => {        
        loginElem.style.display = 'flex';
        logoutElem.style.display = 'none';
        usernameElem.style.display = 'none';
        usernameElem.textContent = '';

        localStorage.removeItem('user');
    };

    if (localStorage.getItem('user')) {
        user = JSON.parse(localStorage.getItem('user'));
        login(user);
    } else {
        user = {};
    }

    logoutElem.addEventListener('click', () => logout(user));

    // auth modal
    const btn = document.querySelector('.button-auth'),
          modal = document.querySelector('.modal-auth'),
          closeBtn = document.querySelector('.close-auth');

    btn.addEventListener('click', function () {
        modal.style.display = 'flex';
    });

    modal.addEventListener('click', function(e) {
        let tgt = e.target;
    
        if (tgt === closeBtn || tgt === modal) {
            modal.style.display = 'none';
        }
    });

    // auth form
    const form = document.querySelector('#logInForm'),
          inputs = form.querySelectorAll('input'),
          warningArr = [];

    inputs.forEach(input => {
        const warning = document.createElement('div');
        warning.style.textAlign = 'center';
        warning.style.color = 'red';
        warning.style.fontSize = '10px';
        input.insertAdjacentElement('afterend', warning);
        warningArr.push(warning);
        input.addEventListener('input', function () {
            this.value = this.value.replace(/[^a-z0-9\_]/ig, '');
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let moreLetters = 0;

        inputs.forEach((input, i) => {
            if (input.value.length < 5) {
                moreLetters = 1;
                warningArr[i].style.marginTop = '10px';
                warningArr[i].textContent = 'Не менее 5 символов';
                setTimeout(function() {
                    warningArr[i].style.marginTop = '0';
                    warningArr[i].textContent = '';
                }, 2000);
            }
        });

        if (!moreLetters) {
            const formData = new FormData(form);
            formData.forEach((value, key) => user[key] = value);

            login(user);

            form.parentElement.parentElement.style.display = 'none';
            form.reset();
        }
    });
};

export default auth;