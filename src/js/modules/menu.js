const menu = () => {
    const restaurant = 'food-band';

    const renderItems = (data) => {
        console.log(data);
    };

    fetch(`https://test-5e265-default-rtdb.firebaseio.com/db/${restaurant}.json`)
        .then(res => res.json())
        .then(data => {
            renderItems(data);
        })
        .catch(error => {
            console.log(error);
        });
};

export default menu;