export default class Dots{
    /**
     * Create dots for navigation (need to be inserted).
     * @param {Object} options 
     * @param {Function} options.getState get state of carousel
     * @param {Function} options.setState set state of carousel
     * @param {number} options.slidesToShow quantity slides in view
     */
    constructor(options){
        this._carousel = {
            getState: options.getState,
            setState: options.setState,
            slidesToShow: options.slidesToShow
        }

        this.styleDots = this._styleDots.bind(this);

        this._render();
    }

    _render(){
        this.dots = document.createElement('div');
        this.dots.className = 'tt-carousel__dots';
        let slidesQuantity = this._carousel.getState('slidesQuantity');
        let slidesToShow = this._carousel.slidesToShow;
        let dotsQuantity = ( slidesToShow-1 > 0) 
                            ? slidesQuantity - slidesToShow + 1
                            : slidesQuantity;
        for(var i=0; i<dotsQuantity; i++){
            let dot = document.createElement('div');
            dot.className = 'tt-carousel__dots-item';
            dot.setAttribute('data-index', i);
            this.dots.appendChild(dot);
        }
    
        this._addListeners();
    }

    _addListeners(){
        this._bindedHandlerClick = this._handlerClick.bind(this);
        this.dots.addEventListener( 'click', this._bindedHandlerClick );
    }


    _handlerClick(e){
        let dot = e.target;
        if( dot.classList.contains('tt-carousel__dots-item') ){
            this._activateDot(dot);
        }
    }


    _activateDot(dot){
        let index = parseInt( dot.getAttribute('data-index'), 10 );
        if( typeof index !== 'number') return;

        this._carousel.setState({
            propName:'current',
            value: index
        });
    }

    _styleDots(slideIndex){
        if( typeof slideIndex !== 'number') return;

        let dots = this.dots.children;
        for(let i=0; i<dots.length; i++){
            dots[i].classList.remove('tt-carousel__dots-item_active')
        }

        dots[slideIndex].classList.add('tt-carousel__dots-item_active');
    }

    destroy(){
        this.dots.removeEventListener('click', this._bindedHandlerClick);
        this.dots.remove();
    }

  


}