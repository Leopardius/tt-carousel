import { cssTransition, cssGetTranslateX, cssTranslateX } from './transformTranslate';

export default class Mobile{
    /**
     * Add transition functionality for touch screen.
     * @param {Object} options 
     * @param {Function} options.getState // get state of carousel
     * @param {Function} options.setState // set state of carousel
     * @param {boolean} [options.infinite=false] enable infinite transition
     * @param {HTMLElement} HTMLElement wide div which being transitioning 
     */
    constructor(HTMLElement, options){
        this._element = HTMLElement;
        this._carousel = {
            getState: options.getState,
            setState: options.setState
        }
        this._infinite = options.infinite;
        this._state = {
            startX:undefined,
            starTtranslate:undefined
        }
        this._addTouchEnentListener(this._element);
    }

    _clearState(){
        this._state.startX = undefined;
        this._state.starTtranslate = undefined;
    }

    _addTouchEnentListener(element){
        this._bindedTouchstartHandler = this._touchstartHandler.bind(this);
        this._bindedTouchmoveHandler = this._touchmoveHandler.bind(this);
        this._bindedTouchendHandler = this._touchendHandler.bind(this);

        element.addEventListener('touchstart', this._bindedTouchstartHandler);
        element.addEventListener('touchmove', this._bindedTouchmoveHandler);
        element.addEventListener('touchend', this._bindedTouchendHandler);
    }

    destroy(){
        this._element.removeEventListener('touchmove', this._bindedTouchstartHandler);
        this._element.removeEventListener('touchmove', this._bindedTouchmoveHandler);
        this._element = undefined;
    }

    _touchstartHandler(e){
        this._state.startX = e.changedTouches[0].pageX;
        this._state.starTtranslate = cssGetTranslateX(this._element);
    }

    _touchmoveHandler(e){
        if( typeof this._state.startX !== 'number' || typeof this._state.starTtranslate !== 'number' ) return;
        let difference = this._state.startX - e.changedTouches[0].pageX;
        let translate = cssGetTranslateX(this._element);
        if(typeof translate !== 'number') return;
        let x = this._state.starTtranslate - difference;
        cssTransition(this._element, 0+'ms');
        cssTranslateX(this._element, `translateX(${x}px)`);
        if( Math.abs(difference) > 60){
            this._clearState();
            let current = this._carousel.getState('current');
            current = (difference > 0) ? ++current : --current;
            this._carousel.setState({
                propName:'current',
                value: current
            });
        }
    }

    _touchendHandler(e){
        this._clearState();
        let current = this._carousel.getState('current');
        this._carousel.setState({
            propName:'current',
            value: current
        });
    }




}