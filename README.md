# tt-carousel
Carousel. Responsive. Webpack compatibility. Support touch screen.

## Getting started

1. Using npm.
    * `npm install tt-carousel`.
    * If you are using webpack, then `import {Carousel} from 'tt-carousel'`.
    * Include `tt.min.css` in your bundle.
    * Instantiate new Carousel with options. 
    ```js
        let carouselInstance = new Carousel({
            slidesToShow:5,
            container: document.querySelector('.carousel'),
            responsive: [
                {
                    breakpoint: 1200,
                    slidesToShow:4,
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
    ```
    * Carousel waite until DOMContentLoaded event. If you miss event you can call `carouselInstance.init()` manually.

2. Include tag `script`
    * Include tag `script` before closed `</body>` (`<script type="text/javascript" src="tt.min.js"></script>`).
    * Include `tt.min.css` in head of page (`<link href="tt.min.css" rel="stylesheet">`).
    * 
    ```js
        let carouselInstance = new tt.Carousel({
            slidesToShow:5,
            container: document.querySelector('.carousel'),
            responsive: [
                {
                    breakpoint: 1200,
                    slidesToShow:4,
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
    ```
    * Carousel waite until DOMContentLoaded event. If you miss event you can call `carouselInstance.init()` manually.
3 html structure. Use any class name as you want. You have to pass class name of container to options. In this particular case { container: document.querySelector('.carousel') }
    ```html
        <div class="carousel">
            <div class="carousel__item">1</div>
            <div class="carousel__item">2</div>
            <div class="carousel__item">3</div>
            <div class="carousel__item">4</div>
            <div class="carousel__item">5</div>
            <div class="carousel__item">6</div>
        </div>
    ```


## Responsive

Carousel can change options based on responsive array. It can be destroed and rebuilded by boolean option `initiate`.
Here on wide screen carousel is not builded. Between 1200px and 991px it is builded and less then 991px destroed.
```js
        let carouselInstance = new tt.Carousel({
            initiate:false,
            container: document.querySelector('.carousel'),
            responsive: [
                {
                    breakpoint: 1200,
                    initiate:true
                },
                {
                    breakpoint: 991,
                    initiate:false
                }
            ]
        });
    ```