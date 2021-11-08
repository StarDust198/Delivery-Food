const cart = () => {
    const buttonCart = document.getElementById('cart-button'),
          modalCart = document.querySelector('.modal-cart'),
          closeBtn = modalCart.querySelector('.close'),
          cartList = modalCart.querySelector('.modal-body'),
          cartPrice = modalCart.querySelector('.modal-pricetag'),
          cartOrder = modalCart.querySelector('.button-primary'),
          cartClear = modalCart.querySelector('.clear-cart');
    
    const resetCart = () => {
        cartList.innerHTML = '';
        localStorage.removeItem('cart');
        modalCart.classList.remove('is-open');
        cartPrice.textContent = '0 ₽';
    };

    const decCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'));

        cartArray.map(item => {
            if (item.id === id) {
                item.count = item.count > 0 ? item.count - 1 : 0;            
            }

            return item;
        });

        localStorage.setItem('cart', JSON.stringify(cartArray));
        renderItems(cartArray);
    };
          
    const incCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'));

        cartArray.map(item => {
            if (item.id === id) {
                item.count++;
            }

            return item;
        });

        localStorage.setItem('cart', JSON.stringify(cartArray));
        renderItems(cartArray);
    };


    const renderItems = (data) => {
        cartList.innerHTML = '';        

        data.forEach(({ name, price, id, count }) => {
            const cartElem = document.createElement('div');
            cartElem.classList.add('food-row');

            cartElem.innerHTML = `
                <span class="food-name">${name}</span>
                <strong class="food-price">${price} ₽</strong>
                <div class="food-counter">
                    <button class="counter-button btn-dec" data-index="${id}">-</button>
                    <span class="counter">${count}</span>
                    <button class="counter-button btn-inc" data-index="${id}">+</button>
                </div>
            `;

            cartList.append(cartElem);
        });

        const price = data.reduce((sum, current) => sum + current.price * current.count, 0);

        cartPrice.textContent = `${price} ₽`;
    };

    cartList.addEventListener('click', (e) => {
        e.preventDefault();

        if (e.target.classList.contains('btn-inc')) {
            incCount(e.target.dataset.index);
        } else if (e.target.classList.contains('btn-dec')) {
            decCount(e.target.dataset.index);
        }
    });

    cartOrder.addEventListener('click', () => {
        const cartArray = localStorage.getItem('cart');

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: cartArray
        })
        .then(res => {
            if (res.ok) {
                resetCart();
            }            
        })
        .catch(e => {
            console.error(e);
        });            
    });

    buttonCart.addEventListener('click', () => {
        if (localStorage.getItem('cart')) {
            renderItems(JSON.parse(localStorage.getItem('cart')));
        }

        modalCart.classList.add('is-open');
    });

    closeBtn.addEventListener('click', () => {
        modalCart.classList.remove('is-open');
    });

    cartClear.addEventListener('click', resetCart);
};

export default cart;