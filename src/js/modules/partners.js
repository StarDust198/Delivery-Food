const partners = (user) => {
    const cardsRestaurants = document.querySelector('.cards-restaurants');

    const renderItems = (data) => {
        data.forEach(item => {
            const { image, kitchen, name, price, products, stars, time_of_delivery } = item,
                  a = document.createElement('a');

            a.href = 'restaurant.html';
            a.classList.add('card', 'card-restaurant');
            a.dataset.products = products;

            a.innerHTML = `
                <img src="${image}" alt="image" class="card-image" />
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title">${name}</h3>
                        <span class="card-tag tag">${time_of_delivery} мин</span>
                    </div>
                    <div class="card-info">
                        <div class="rating">
                            ${stars}
                        </div>
                        <div class="price">От ${price} ₽</div>
                        <div class="category">${kitchen}</div>
                    </div>
                </div>
            `;

            a.addEventListener('click', (e) => {
                e.preventDefault();

                if (user.login) {
                    localStorage.setItem('restaurant', JSON.stringify(item));

                    window.location.href = '/restaurant.html';
                } else {
                    document.querySelector('.button-auth').click();
                }
            });

            cardsRestaurants.append(a);
        });
    };

    fetch(`https://test-5e265-default-rtdb.firebaseio.com/db/partners.json`)
        .then(res => res.json())
        .then(data => {
            renderItems(data);
        })
        .catch(error => {
            console.log(error);
        });
};

export default partners;