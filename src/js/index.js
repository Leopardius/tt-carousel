import './tt-carousel/tt-carousel.scss';
import '../scss/style.scss';

import Slider from './tt-carousel/indexCarousel';

new Slider({
    slidesToShow:5,
    container: document.querySelector('.carousel'),
    responsive: [
        {
            breakpoint: 1200,
            slidesToShow:4,
        },
        {
            breakpoint: 768,
            slidesToShow:1,
        }
    ]
});