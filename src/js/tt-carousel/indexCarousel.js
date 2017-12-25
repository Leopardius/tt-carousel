import debounce from './debounce';
import Arrows from './arrows';
import polyfill from './polyfill';
import { cssTranslateX, cssTransition } from './transformTranslate';
import MobileTransition from './mobile';

// if(process.env.NODE_ENV === 'production'){
//     polyfill();
// }
polyfill();

export default class Tt{
    /**
     * Carousel.
     * @param {Object} options The options object.
     * @param {HTMLElement} options.container document.querySelector 
     * @param {boolean} [options.initiate=true] enable slider. Used with responsive array
     * @param {[]} [options.responsive] settings for different window width
     * @param {number} [options.slidesToShow=1] quantity slides in view
     * @param {number} [options.speed=300] transition speed
     * @param {boolean} [options.dots=true] enable dots navigaton
     * @param {boolean} [options.arrows=true] enable right/left arrows
     * @param {boolean} [options.infinite=false] enable infinite transition
     */
    constructor(options){
        this._options = options;
        // options.responsive = [
        //     {
        //       breakpoint: 768,
        //       speed:1000,
        //       initiate:true
        //     },
        //     {
        //       breakpoint: 480,
        //     }
        //   ]
        this._defaultSettings = {
            slidesToShow:1,
            speed: 300,
            dots: true,
            arrows: true,
            infinite: false,
            initiate: true,
            responsive: []
        };
        this._settings = this._makeActualSettings(this._defaultSettings, this._options);
        
        this._state = { // state of carousel
            slidesQuantity:0,
            current:0
        }; 

        document.addEventListener("DOMContentLoaded", this._init.bind(this));
    }

    _makeActualSettings(defaultSettings, options){
        if( !options ) return defaultSettings;
        let newSettings = {};
        let responsiveObject;

        options.responsive = options.responsive
                                .filter(function(val){
                                    return typeof val.breakpoint === 'number'
                                })
                                .sort(function(a, b){
                                    return ( b.breakpoint - a.breakpoint);
                                });
        
        newSettings = Object.assign({}, defaultSettings, options);
        responsiveObject = this._chooseResponsiveSettings(options.responsive);
    
        if(responsiveObject){
            newSettings = Object.assign(newSettings, responsiveObject);
            if(responsiveObject.initiate === undefined){
                newSettings.initiate = true;
            }
        }

        return newSettings;
    }

    _init(){
        if( !this._settings.container ){
            this._logError('need DOM element - container for carousel');
            return;
        }

        this._originalSlides = this._settings.container.innerHTML;
    
        if( this._settings.initiate ){
            this._createCarousel(this._settings.container);
        }
    
        this._addResizeListener();
    }

    _createCarousel(container){
        let stg = this._settings;
        
        this._state.current = 0; // index of current slide
        this._state.slidesQuantity = ( getByPath(container, 'children.length') )
                                    ? container.children.length
                                    : 0;
        if( this._state.slidesQuantity <= stg.slidesToShow){
            return;
        }
            
        this._calcWidth(container);
        this._styleContainer(container);
        this._wideContainer = document.createElement('div');
        this._styleWideContainer(this._wideContainer);
        this._narrowContainer = document.createElement('div');
        this._styleNarrowContainer(this._narrowContainer);
        this._wrapSlides(container, this._wideContainer, this._narrowContainer);
        this._styleSlides(this._wideContainer.children);

        let getState = this.getState.bind(this);
        let setState = this._setState.bind(this);

        if( stg.arrows ){
            this._arrowsInstance = new Arrows({
                getState:getState,
                setState:setState,
                infinite: stg.infinite
            });
            this._insertArrows(container, this._arrowsInstance);
        }
        if( stg.dots ){
            // this._addDots(container);
        }

        this._mobileInstance = new MobileTransition(
            this._wideContainer,
            {
                getState:getState,
                setState:setState,
                infinite: stg.infinite
            }
        );
    }

    _update(){
        this._destroy();
        this._settings = this._makeActualSettings(this._defaultSettings, this._options);
        if( this._settings.initiate ){
            this._createCarousel(this._settings.container);
        }
    }

    _destroy(){
        if(this._arrowsInstance){
            this._arrowsInstance.destroy(this._arrowsInstance.left, this._arrowsInstance.right);
            this._arrowsInstance = undefined;
        }

        if(this._dotsInstance){
            this._dotsInstance.destroy();
            this._dotsInstance = undefined;
        }

        if(this._mobileInstance){
            this._mobileInstance.destroy();
            this._mobileInstance = undefined;
        }

        this._settings.container.innerHTML = this._originalSlides;
        this._clearContainer(this._settings.container);

    }

    _destroyForever(){

    }

    _chooseResponsiveSettings(responsiveArr){
         // var self = this;
        if( !responsiveArr.length ) return null;
        var windowWidth = window.innerWidth;

        for(var i=0; i < responsiveArr.length; i++){
            if(windowWidth > responsiveArr[i].breakpoint){
                if(i>0){
                    return responsiveArr[i-1];
                }else{
                    return null;
                }
            }
        }
        return responsiveArr[i-1];
    }

    _addResizeListener(){
        let resizeListener = debounce(function(){
            this._update();
        },
        1000);

        window.addEventListener('resize', resizeListener.bind(this));
    }


    /**
     * Returns prop of _state
     * @param {string} propName
     */
    getState(propName){
        if( !propName || this._state[propName] === undefined ){
            throw new Error('there is no such state property');
            return;
        }
        return this._state[propName];
    }

    _setState(obj){
        // obj={
        //     propName:'current',
        //     value:3
        // }
        var self = this;
        if( !obj || !obj.propName || obj.value === undefined ){
            this._logError('setState fale');
            return;
        } 

        switch(obj.propName){
            case 'current':
                obj.value = this._validateCurrent(obj.value);
                break;
        }

        self._state[obj.propName] = obj.value;

        if(obj.propName === 'current'){
            self.goToSlide();
        }
        console.log(self._state);
    }


    _validateCurrent(val){
        if(typeof val !== 'number') throw new Error('Index of slide must be a number');

        if(this._settings.infinite) return val;

        if(val < 0) return 0;
        let quantityOfSlides = this.getState('slidesQuantity');
        if(val > quantityOfSlides - this._settings.slidesToShow) return quantityOfSlides - this._settings.slidesToShow;
        return val;
    }

    _insertArrows(container, arrowsObj){
        if( !arrowsObj ) return;
        container.insertBefore(arrowsObj.leftArrow, container.children[0]);
        container.appendChild(arrowsObj.rightArrow);
    }

    _addDots(container){
        if( !this._dots ) return;
        var dots = document.createElement('div');
        dots.className = 'tt-carousel__dots';
        var quantity = this._wideContainer.children.length;
        for(var i=0; i<quantity; i++){
            var dot = document.createElement('div');
            dot.className = 'tt-carousel__dots-item';
            dots.appendChild(dot);
        }
        container.appendChild(dots);
    }

    _calcWidth(container){
        this._narrowWidth = container.clientWidth;
        this._slideWidth = parseInt(this._narrowWidth / this._settings.slidesToShow, 10);
        this._wideWidth = this._slideWidth * container.children.length;
    }

    _wrapSlides(container, wideContainer, narrowContainer){
        var slides = container.innerHTML;
        container.innerHTML = '';
        wideContainer.innerHTML = slides;
        narrowContainer.appendChild(wideContainer);
        container.appendChild(narrowContainer);
    }

    _styleContainer(container){
        container.classList.add('tt-carousel');
    }

    _clearContainer(container){
        container.classList.remove('tt-carousel');
    }

    _styleNarrowContainer(narrowContainer){
        narrowContainer.className = 'tt-carousel__narrow-container';
    }

    _styleWideContainer(wideContainer){
        wideContainer.className = 'tt-carousel__wide-container';
        wideContainer.style.width = this._wideWidth + 'px';
    }

    _styleSlides(slides){
        for(var i=0; i<slides.length; i++){
            var slide = slides[i];
            slide.className = slide.className ? slide.className + ' tt-carousel__item' : 'tt-carousel__item';
            slide.style.width = this._slideWidth + 'px';
            slide.style.minHeight = '1px';
        }
    }

    _logError(error){
        if(error === undefined) return;
        if('error' in console){
            console.error(error);
        }else{
            console.log('error', error);
        }
    }

    goToSlide(){
        let position = this.getState('current');
        let x = -1 * position * this._slideWidth;
        cssTransition(this._wideContainer, this._settings.speed+'ms');
        cssTranslateX(this._wideContainer, `translateX(${x}px)`);
    }


}



