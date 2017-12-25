
export default class Arrows{
    /**
     * Create Arrows (need to be insert).
     * At the edges add class tt-carousel__arrows_disabled (if option infinite is not enabled).
     * @param {Object} options 
     * @param {Function} options.getState // get state of carousel
     * @param {Function} options.setState // set state of carousel
     * @param {boolean} [options.infinite=false] enable infinite transition
     */
    constructor(options){
        this._carousel = {
            getState: options.getState,
            setState: options.setState
        }
        this._infinite = options.infinite;

        this._render();
    }

    _render(){
        this.rightArrow = document.createElement('div');
        this.leftArrow = document.createElement('div');
        this.rightArrow.className = 'tt-carousel__arrows tt-carousel__right-arrow';
        this.leftArrow.className = 'tt-carousel__arrows tt-carousel__left-arrow';
    
        this._addListeners();
        this._disableButton();
    }

    _addListeners(){
        this._bindedHandlerLeftClick = this._handlerLeftClick.bind(this);
        this._bindedHandlerRightClick = this._handlerRightClick.bind(this);

        this.leftArrow.addEventListener( 'click', this._bindedHandlerLeftClick );
        this.rightArrow.addEventListener( 'click', this._bindedHandlerRightClick );
    }

    destroy(leftArrow, rightArrow){
        this.leftArrow.removeEventListener('click', this._bindedHandlerLeftClick);
        this.rightArrow.removeEventListener('click', this._bindedHandlerRightClick);
        if(leftArrow) leftArrow.remove();
        if(rightArrow) rightArrow.remove();
    }

    _handlerLeftClick(){
        var current = this._carousel.getState('current');
        current--;
        this._carousel.setState({
            propName:'current',
            value: current
        });
        this._disableButton();
    }

    _handlerRightClick(){
        var current = this._carousel.getState('current');
        var slidesQuantity = this._carousel.getState('slidesQuantity');
        current++;
        this._carousel.setState({
            propName:'current',
            value: current
        });
        this._disableButton();
    }

    _disableButton(current){
        if( this._infinite ) return;
        var current = this._carousel.getState('current');
        var slidesQuantity = this._carousel.getState('slidesQuantity');
        switch(current){
            case 0:
                this.leftArrow.classList.add('tt-carousel__arrows_disabled');
                this.rightArrow.classList.remove('tt-carousel__arrows_disabled');
                break;
            case slidesQuantity-1:
                this.leftArrow.classList.remove('tt-carousel__arrows_disabled');
                this.rightArrow.classList.add('tt-carousel__arrows_disabled');
                break;
            default:
                this.leftArrow.classList.remove('tt-carousel__arrows_disabled');
                this.rightArrow.classList.remove('tt-carousel__arrows_disabled');
        }
    }

}