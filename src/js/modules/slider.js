import Swiper, { Autoplay, Navigation, Pagination } from 'swiper';

Swiper.use([Autoplay, Navigation, Pagination]);

const slider = () => {
    const swiper = new Swiper('.swiper', {
        loop: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 10000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    });
};

export default slider;