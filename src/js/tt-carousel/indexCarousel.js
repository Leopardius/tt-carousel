import debounce from './debounce';
import Arrows from './arrows';
import Dots from './dots';
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

        this._plugins = []; // instances. All have destroy method
        this._privateCallbacks = {
            afterCurrentChange: [] // invoke after change current property of state with value of current slide as arg
        }
        

        document.addEventListener("DOMContentLoaded", this.init.bind(this));
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

    init(){
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
            
        
        container.classList.add('tt-carousel');

        this._wideContainer = document.createElement('div');
        this._wideContainer.className = 'tt-carousel__wide-container';

        this._narrowContainer = document.createElement('div');
        this._narrowContainer.className = 'tt-carousel__narrow-container';

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
            this._plugins.push( this._arrowsInstance );
        }

        if( stg.dots ){
            this._dotsInstance = new Dots({
                getState: getState,
                setState: setState,
                slidesToShow: stg.slidesToShow
            });
            this._dotsInstance.styleDots( getState('current') );
            this._insertDots(container, this._dotsInstance);
            this._plugins.push( this._dotsInstance );
            this._privateCallbacks.afterCurrentChange.push( this._dotsInstance.styleDots )
        }

        this._mobileInstance = new MobileTransition(
            this._wideContainer,
            {
                getState:getState,
                setState:setState,
                infinite: stg.infinite
            }
        );
        this._plugins.push( this._mobileInstance );

    }

    _update(){
        this._destroy();
        this._settings = this._makeActualSettings(this._defaultSettings, this._options);
        if( this._settings.initiate ){
            this._createCarousel(this._settings.container);
        }
    }

    _destroy(){
        this._plugins.forEach( (instance) => {
            instance.destroy();
        })
        this._plugins = [];
        this._arrowsInstance = undefined;
        this._dotsInstance = undefined;
        this._mobileInstance = undefined;
        
        this._settings.container.innerHTML = this._originalSlides;
        this._clearContainer(this._settings.container);

        this._privateCallbacks.afterCurrentChange = [];
    }

    destroyForever(){

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
        this.sensitivityWindowWidth = window.innerWidth;

        let resizeListener = debounce(function(){
            if( this._sensitivity() ) return;
            this._update();
        },
        1000);

        window.addEventListener('resize', resizeListener.bind(this));
    }


    _sensitivity(){
        let threshold = 10; // px
        if( Math.abs(window.innerWidth - this.sensitivityWindowWidth) > threshold ){
            this.sensitivityWindowWidth = window.innerWidth;
            return false;
        }else{
            return true;
        }
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
                self._state[obj.propName] = obj.value;
                self.goToSlide();
                self._privateCallbacks.afterCurrentChange.forEach( (item) => {
                    item( self._state.current );
                })
                break;
            default:
                self._state[obj.propName] = obj.value;
        }


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

    _insertDots(container, dots){
        if( !dots ) return;
        container.appendChild(dots.dots);
    }

    

    _wrapSlides(container, wideContainer, narrowContainer){
        var slides = container.innerHTML;
        container.innerHTML = '';
        wideContainer.innerHTML = slides;
        narrowContainer.appendChild(wideContainer);
        container.appendChild(narrowContainer);
    }

    _clearContainer(container){
        container.classList.remove('tt-carousel');
    }

    _calcWidth(container){
        this._narrowWidth = container.offsetWidth || container.offsetWidth || container.clientWidth;
        this._slideWidth = this._narrowWidth / this._settings.slidesToShow;
        this._wideWidth = this._slideWidth * this.getState('slidesQuantity');
    }

    _beforeCalcWidth(slides){
        for(var i=0; i<slides.length; i++){
            slides[i].classList.add('tt-carousel__item');
            slides[i].style.width = '50px';
        }
        this._wideContainer.style.width = '50000px';
    }


    _styleSlides(slides){
        
        this._beforeCalcWidth(slides);
        this._calcWidth(this._settings.container);
        
        this._wideContainer.style.width = this._wideWidth + 'px';

        for(var i=0; i<slides.length; i++){
            slides[i].style.width = this._slideWidth + 'px';
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



