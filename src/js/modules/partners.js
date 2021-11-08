const partners = () => {
    const renderItems = (data) => {
        console.log(data);
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