const checkInputs = (inputsSelector, submitSelector) => {
    const inputs = document.querySelectorAll(inputsSelector),
          submitBtn = document.querySelector(submitSelector);

    inputs.forEach(input => {
        
        const warning = document.createElement('div');
        warning.style.textAlign = 'center';
        warning.style.color = 'red';
        warning.style.fontSize = '10px';
        input.insertAdjacentElement('afterend', warning);
        input.addEventListener('input', function () {
            this.value = this.value.replace(/[^a-z0-9\_]/ig, '');
            if (input.value.length < 5) {
                warning.style.marginTop = '10px';
                warning.textContent = 'Не менее 5 символов';            
                submitBtn.disabled = true;
            } else {
                warning.style.marginTop = '0';
                warning.textContent = '';
                submitBtn.disabled = false;
            }
        });
    });
};

export default checkInputs;