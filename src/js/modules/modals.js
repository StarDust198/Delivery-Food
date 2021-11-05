const modals = (triggerSelector, modalSelector, closeSelector) => {
    const btn = document.querySelector(triggerSelector),
          modal = document.querySelector(modalSelector),
          closeBtn = document.querySelector(closeSelector);

    btn.addEventListener('click', function () {
        modal.style.display = 'flex';
    });

    modal.addEventListener('click', function(e) {
        let tgt = e.target;
        
        if (tgt === closeBtn || tgt === modal) {
            modal.style.display = 'none';
        }
    });
};

export default modals;