const menu = () => {
    const cardsMenu = document.querySelector('.cards-menu');

    const changeTitle = (restaurant) => {
        const heading = document.querySelector('.section-heading'),
              title = heading.querySelector('.restaurant-title'),
              rating = heading.querySelector('.rating'),
              price = heading.querySelector('.price'),
              category = heading.querySelector('.category');

        title.textContent = restaurant.name;
        rating.textContent = restaurant.stars;
        price.textContent = `От ${restaurant.price} ₽`;
        category.textContent = restaurant.kitchen;
    };

    const addToCart = (cartItem) => {
        const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

        if (cartArray.some(item => item.id === cartItem.id)) {
            cartArray.map(item => {
                if (item.id === cartItem.id) {
                    item.count++;
                }

                return item;
            });
        } else {
            cartArray.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(cartArray));
    };

    const renderItems = (data) => {
        data.forEach(({ description, id, image, name, price }) => {
            const card = document.createElement('div');

            card.classList.add('card');
            card.dataset.id = id;

            card.innerHTML = `
                <img src="${image}" alt="image" class="card-image" />
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title card-title-reg">${name}</h3>
                    </div>
                    <div class="card-info">
                        <div class="ingredients">${description}
                        </div>
                    </div>
                    <div class="card-buttons">
                        <button class="button button-primary button-add-cart">
                            <span class="button-card-text">В корзину</span>
                            <span class="button-cart-svg"></span>
                        </button>
                        <strong class="card-price-bold">${price} ₽</strong>
                    </div>
                </div>
            `;

            card.querySelector('.button-add-cart').addEventListener('click', () => {
                addToCart({ name, price, id, count: 1 });
            });            

            cardsMenu.append(card);
        });
    };

    if (localStorage.getItem('restaurant')) {
        const restaurant = JSON.parse(localStorage.getItem('restaurant'));

        changeTitle(restaurant);

        fetch(`https://test-5e265-default-rtdb.firebaseio.com/db/${restaurant.products}`)
            .then(res => res.json())
            .then(data => {
                renderItems(data);
            })
            .catch(e => {
                console.error(e);
            });
    } else {
        window.location.href = '/';
    }
};

export default menu;