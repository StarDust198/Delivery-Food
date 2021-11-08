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

    const renderItems = (data) => {
        data.forEach(({ description, id, image, name, price }) => {
            const div = document.createElement('div');

            div.classList.add('card');
            div.dataset.id = id;

            div.innerHTML = `
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

            cardsMenu.append(div);
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
            .catch(error => {
                console.log(error);
            });
    } else {
        window.location.href = '/';
    }
};

export default menu;