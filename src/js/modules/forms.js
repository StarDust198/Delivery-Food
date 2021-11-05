import { login } from '../services/login';

const forms = (formSelector, obj) => {
    const form = document.querySelector(formSelector);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        formData.forEach((value, key) => obj[key] = value);

        login(obj);

        form.parentElement.parentElement.style.display = 'none';
        form.reset();
    });
};

export default forms;