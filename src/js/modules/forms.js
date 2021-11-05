import { login } from '../services/login';

const forms = (formSelector, obj) => {
    const form = document.querySelector(formSelector),
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
            formData.forEach((value, key) => obj[key] = value);

            login(obj);

            form.parentElement.parentElement.style.display = 'none';
            form.reset();
        }
    });    
};

export default forms;