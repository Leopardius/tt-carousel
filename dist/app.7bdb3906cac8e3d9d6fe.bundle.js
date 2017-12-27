!function(t){var e={};function i(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s="vGYV")}({"4pG7":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}();var r=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._carousel={getState:e.getState,setState:e.setState},this._infinite=e.infinite,this._render()}return n(t,[{key:"_render",value:function(){this.rightArrow=document.createElement("div"),this.leftArrow=document.createElement("div"),this.rightArrow.className="tt-carousel__arrows tt-carousel__right-arrow",this.leftArrow.className="tt-carousel__arrows tt-carousel__left-arrow",this._addListeners(),this._disableButton()}},{key:"_addListeners",value:function(){this._bindedHandlerLeftClick=this._handlerLeftClick.bind(this),this._bindedHandlerRightClick=this._handlerRightClick.bind(this),this.leftArrow.addEventListener("click",this._bindedHandlerLeftClick),this.rightArrow.addEventListener("click",this._bindedHandlerRightClick)}},{key:"destroy",value:function(t,e){this.leftArrow.removeEventListener("click",this._bindedHandlerLeftClick),this.rightArrow.removeEventListener("click",this._bindedHandlerRightClick),t&&t.remove(),e&&e.remove()}},{key:"_handlerLeftClick",value:function(){var t=this._carousel.getState("current");t--,this._carousel.setState({propName:"current",value:t}),this._disableButton()}},{key:"_handlerRightClick",value:function(){var t=this._carousel.getState("current");this._carousel.getState("slidesQuantity");t++,this._carousel.setState({propName:"current",value:t}),this._disableButton()}},{key:"_disableButton",value:function(t){if(!this._infinite){t=this._carousel.getState("current");var e=this._carousel.getState("slidesQuantity");switch(t){case 0:this.leftArrow.classList.add("tt-carousel__arrows_disabled"),this.rightArrow.classList.remove("tt-carousel__arrows_disabled");break;case e-1:this.leftArrow.classList.remove("tt-carousel__arrows_disabled"),this.rightArrow.classList.add("tt-carousel__arrows_disabled");break;default:this.leftArrow.classList.remove("tt-carousel__arrows_disabled"),this.rightArrow.classList.remove("tt-carousel__arrows_disabled")}}}}]),t}();e.default=r},DuR2:function(t,e){var i;i=function(){return this}();try{i=i||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(i=window)}t.exports=i},NwNo:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(){window.getByPath=function(t,e,i){try{return i=i||".",e.replace("[",i).replace("]","").split(i).reduce(function(t,e){return t[e]},t)}catch(t){return}},Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:function(t,e){if(void 0===t||null===t)throw new TypeError("Cannot convert first argument to object");for(var i=Object(t),n=1;n<arguments.length;n++){var r=arguments[n];if(void 0!==r&&null!==r)for(var s=Object.keys(Object(r)),o=0,a=s.length;o<a;o++){var l=s[o],u=Object.getOwnPropertyDescriptor(r,l);void 0!==u&&u.enumerable&&(i[l]=r[l])}}return i}}),[Element.prototype,CharacterData.prototype,DocumentType.prototype].forEach(function(t){t.hasOwnProperty("remove")||Object.defineProperty(t,"remove",{configurable:!0,enumerable:!0,writable:!0,value:function(){this.parentNode.removeChild(this)}})}),function(){var t=function(t){return new RegExp("(^| )"+t+"( |$)")},e=function(t,e,i){for(var n=0;n<t.length;n++)e.call(i,t[n])};function i(t){this.element=t}i.prototype={add:function(){e(arguments,function(t){this.contains(t)||(this.element.className+=" "+t)},this)},remove:function(){e(arguments,function(e){this.element.className=this.element.className.replace(t(e),"")},this)},toggle:function(t){return this.contains(t)?(this.remove(t),!1):(this.add(t),!0)},contains:function(e){return t(e).test(this.element.className)},replace:function(t,e){this.remove(t),this.add(e)}},"classList"in Element.prototype||Object.defineProperty(Element.prototype,"classList",{get:function(){return new i(this)}}),window.DOMTokenList&&null==DOMTokenList.prototype.replace&&(DOMTokenList.prototype.replace=i.prototype.replace)}()}},ScwD:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),r=i("tJNC");var s=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._element=e,this._carousel={getState:i.getState,setState:i.setState},this._infinite=i.infinite,this._state={startX:void 0,starTtranslate:void 0},this._addTouchEnentListener(this._element)}return n(t,[{key:"_clearState",value:function(){this._state.startX=void 0,this._state.starTtranslate=void 0}},{key:"_addTouchEnentListener",value:function(t){this._bindedTouchstartHandler=this._touchstartHandler.bind(this),this._bindedTouchmoveHandler=this._touchmoveHandler.bind(this),this._bindedTouchendHandler=this._touchendHandler.bind(this),t.addEventListener("touchstart",this._bindedTouchstartHandler),t.addEventListener("touchmove",this._bindedTouchmoveHandler),t.addEventListener("touchend",this._bindedTouchendHandler)}},{key:"destroy",value:function(){this._element.removeEventListener("touchmove",this._bindedTouchstartHandler),this._element.removeEventListener("touchmove",this._bindedTouchmoveHandler),this._element=void 0}},{key:"_touchstartHandler",value:function(t){this._state.startX=t.changedTouches[0].pageX,this._state.starTtranslate=(0,r.cssGetTranslateX)(this._element)}},{key:"_touchmoveHandler",value:function(t){if("number"==typeof this._state.startX&&"number"==typeof this._state.starTtranslate){var e=this._state.startX-t.changedTouches[0].pageX;if("number"==typeof(0,r.cssGetTranslateX)(this._element)){var i=this._state.starTtranslate-e;if((0,r.cssTransition)(this._element,"0ms"),(0,r.cssTranslateX)(this._element,"translateX("+i+"px)"),Math.abs(e)>60){this._clearState();var n=this._carousel.getState("current");n=e>0?++n:--n,this._carousel.setState({propName:"current",value:n})}}}}},{key:"_touchendHandler",value:function(t){this._clearState();var e=this._carousel.getState("current");this._carousel.setState({propName:"current",value:e})}}]),t}();e.default=s},b4Sj:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.default=function(){var e="Expected a function",n=NaN,r="[object Symbol]",s=/^\s+|\s+$/g,o=/^[-+]0x[0-9a-f]+$/i,a=/^0b[01]+$/i,l=/^0o[0-7]+$/i,u=parseInt,c="object"==(void 0===t?"undefined":i(t))&&t&&t.Object===Object&&t,d="object"==("undefined"==typeof self?"undefined":i(self))&&self&&self.Object===Object&&self,h=c||d||Function("return this")(),f=Object.prototype.toString,_=Math.max,v=Math.min,p=function(){return h.Date.now()};function y(t){var e=void 0===t?"undefined":i(t);return!!t&&("object"==e||"function"==e)}function m(t){return"symbol"==(void 0===t?"undefined":i(t))||(e=t,!!e&&"object"==(void 0===e?"undefined":i(e))&&f.call(t)==r);var e}function b(t){if("number"==typeof t)return t;if(m(t))return n;if(y(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=y(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(s,"");var i=a.test(t);return i||l.test(t)?u(t.slice(2),i?2:8):o.test(t)?n:+t}return function(t,i,n){var r,s,o,a,l,u,c=0,d=!1,h=!1,f=!0;if("function"!=typeof t)throw new TypeError(e);i=b(i)||0,y(n)&&(d=!!n.leading,o=(h="maxWait"in n)?_(b(n.maxWait)||0,i):o,f="trailing"in n?!!n.trailing:f);function m(e){var i=r,n=s;return r=s=void 0,c=e,a=t.apply(n,i)}function w(t){var e=t-u;return void 0===u||e>=i||e<0||h&&t-c>=o}function g(){var t=p();if(w(t))return S(t);l=setTimeout(g,function(t){var e=i-(t-u);return h?v(e,o-(t-c)):e}(t))}function S(t){return l=void 0,f&&r?m(t):(r=s=void 0,a)}function k(){var t=p(),e=w(t);if(r=arguments,s=this,u=t,e){if(void 0===l)return c=n=u,l=setTimeout(g,i),d?m(n):a;if(h)return l=setTimeout(g,i),m(u)}var n;return void 0===l&&(l=setTimeout(g,i)),a}return k.cancel=function(){void 0!==l&&clearTimeout(l),c=0,r=u=s=l=void 0},k.flush=function(){return void 0===l?a:S(p())},k}}()}).call(e,i("DuR2"))},"fF0/":function(t,e){},kA1b:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Carousel=void 0;var n,r=i("lWpC"),s=(n=r,n&&n.__esModule?n:{default:n});i("fF0/");e.Carousel=s.default},lWpC:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),r=u(i("b4Sj")),s=u(i("4pG7")),o=u(i("NwNo")),a=i("tJNC"),l=u(i("ScwD"));function u(t){return t&&t.__esModule?t:{default:t}}(0,o.default)();var c=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._options=e,this._defaultSettings={slidesToShow:1,speed:300,dots:!0,arrows:!0,infinite:!1,initiate:!0,responsive:[]},this._settings=this._makeActualSettings(this._defaultSettings,this._options),this._state={slidesQuantity:0,current:0},document.addEventListener("DOMContentLoaded",this.init.bind(this))}return n(t,[{key:"_makeActualSettings",value:function(t,e){if(!e)return t;var i={},n=void 0;return e.responsive=e.responsive.filter(function(t){return"number"==typeof t.breakpoint}).sort(function(t,e){return e.breakpoint-t.breakpoint}),i=Object.assign({},t,e),(n=this._chooseResponsiveSettings(e.responsive))&&(i=Object.assign(i,n),void 0===n.initiate&&(i.initiate=!0)),i}},{key:"init",value:function(){this._settings.container?(this._originalSlides=this._settings.container.innerHTML,this._settings.initiate&&this._createCarousel(this._settings.container),this._addResizeListener()):this._logError("need DOM element - container for carousel")}},{key:"_createCarousel",value:function(t){var e=this._settings;if(this._state.current=0,this._state.slidesQuantity=getByPath(t,"children.length")?t.children.length:0,!(this._state.slidesQuantity<=e.slidesToShow)){t.classList.add("tt-carousel"),this._wideContainer=document.createElement("div"),this._wideContainer.className="tt-carousel__wide-container",this._narrowContainer=document.createElement("div"),this._narrowContainer.className="tt-carousel__narrow-container",this._wrapSlides(t,this._wideContainer,this._narrowContainer),this._styleSlides(this._wideContainer.children);var i=this.getState.bind(this),n=this._setState.bind(this);e.arrows&&(this._arrowsInstance=new s.default({getState:i,setState:n,infinite:e.infinite}),this._insertArrows(t,this._arrowsInstance)),e.dots,this._mobileInstance=new l.default(this._wideContainer,{getState:i,setState:n,infinite:e.infinite})}}},{key:"_update",value:function(){this._destroy(),this._settings=this._makeActualSettings(this._defaultSettings,this._options),this._settings.initiate&&this._createCarousel(this._settings.container)}},{key:"_destroy",value:function(){this._arrowsInstance&&(this._arrowsInstance.destroy(this._arrowsInstance.left,this._arrowsInstance.right),this._arrowsInstance=void 0),this._dotsInstance&&(this._dotsInstance.destroy(),this._dotsInstance=void 0),this._mobileInstance&&(this._mobileInstance.destroy(),this._mobileInstance=void 0),this._settings.container.innerHTML=this._originalSlides,this._clearContainer(this._settings.container)}},{key:"_destroyForever",value:function(){}},{key:"_chooseResponsiveSettings",value:function(t){if(!t.length)return null;for(var e=window.innerWidth,i=0;i<t.length;i++)if(e>t[i].breakpoint)return i>0?t[i-1]:null;return t[i-1]}},{key:"_addResizeListener",value:function(){this.sensitivityWindowWidth=window.innerWidth;var t=(0,r.default)(function(){this._sensitivity()||this._update()},1e3);window.addEventListener("resize",t.bind(this))}},{key:"_sensitivity",value:function(){return!(Math.abs(window.innerWidth-this.sensitivityWindowWidth)>10)||(this.sensitivityWindowWidth=window.innerWidth,!1)}},{key:"getState",value:function(t){if(!t||void 0===this._state[t])throw new Error("there is no such state property");return this._state[t]}},{key:"_setState",value:function(t){if(t&&t.propName&&void 0!==t.value){switch(t.propName){case"current":t.value=this._validateCurrent(t.value)}this._state[t.propName]=t.value,"current"===t.propName&&this.goToSlide()}else this._logError("setState fale")}},{key:"_validateCurrent",value:function(t){if("number"!=typeof t)throw new Error("Index of slide must be a number");if(this._settings.infinite)return t;if(t<0)return 0;var e=this.getState("slidesQuantity");return t>e-this._settings.slidesToShow?e-this._settings.slidesToShow:t}},{key:"_insertArrows",value:function(t,e){e&&(t.insertBefore(e.leftArrow,t.children[0]),t.appendChild(e.rightArrow))}},{key:"_addDots",value:function(t){if(this._dots){var e=document.createElement("div");e.className="tt-carousel__dots";for(var i=this._wideContainer.children.length,n=0;n<i;n++){var r=document.createElement("div");r.className="tt-carousel__dots-item",e.appendChild(r)}t.appendChild(e)}}},{key:"_wrapSlides",value:function(t,e,i){var n=t.innerHTML;t.innerHTML="",e.innerHTML=n,i.appendChild(e),t.appendChild(i)}},{key:"_clearContainer",value:function(t){t.classList.remove("tt-carousel")}},{key:"_calcWidth",value:function(t){this._narrowWidth=t.offsetWidth||t.offsetWidth||t.clientWidth,this._slideWidth=this._narrowWidth/this._settings.slidesToShow,this._wideWidth=this._slideWidth*this.getState("slidesQuantity")}},{key:"_beforeCalcWidth",value:function(t){for(var e=0;e<t.length;e++)t[e].classList.add("tt-carousel__item"),t[e].style.width="50px";this._wideContainer.style.width="50000px"}},{key:"_styleSlides",value:function(t){this._beforeCalcWidth(t),this._calcWidth(this._settings.container),this._wideContainer.style.width=this._wideWidth+"px";for(var e=0;e<t.length;e++)t[e].style.width=this._slideWidth+"px"}},{key:"_logError",value:function(t){void 0!==t&&("error"in console?console.error(t):console.log("error",t))}},{key:"goToSlide",value:function(){var t=-1*this.getState("current")*this._slideWidth;(0,a.cssTransition)(this._wideContainer,this._settings.speed+"ms"),(0,a.cssTranslateX)(this._wideContainer,"translateX("+t+"px)")}}]),t}();e.default=c},tJNC:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.cssTranslateX=function(t,e){t.style.MozTransform=e,t.style.WebkitTransform=e,t.style.OTransform=e,t.style.MsTransform=e,t.style.transform=e},e.cssGetTranslateX=function(t){if(!t)return!1;var e=void 0;if(t.style.transform){var i=t.style.transform.indexOf("(");if(-1===i)return!1;var n=t.style.transform.indexOf(")");if(-1===n)return!1;e=parseInt(t.style.transform.slice(i+1,n),10)}else e=0;return e},e.cssTransition=function(t,e){t.style.MozTransition=e,t.style.WebkitTransition=e,t.style.OTransition=e,t.style.MsTransition=e,t.style.transition=e}},vGYV:function(t,e,i){"use strict";new(i("kA1b").Carousel)({slidesToShow:5,container:document.querySelector(".carousel"),responsive:[{breakpoint:1200,slidesToShow:4},{breakpoint:991,slidesToShow:3},{breakpoint:768,slidesToShow:2},{breakpoint:450,slidesToShow:1}]})}});
//# sourceMappingURL=app.7bdb3906cac8e3d9d6fe.bundle.js.map