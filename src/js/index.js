import { Carousel } from './tt-carousel/index.js';

import '../scss/style.scss';

new Carousel({
    slidesToShow:5,
    container: document.querySelector('.carousel'),
    responsive: [
        {
            breakpoint: 1200,
            slidesToShow:4
        },
        {
            breakpoint: 991,
            slidesToShow:3,
        },
        {
            breakpoint: 768,
            slidesToShow:2,
        },
        {
            breakpoint: 450,
            slidesToShow:1
        }
    ]
});