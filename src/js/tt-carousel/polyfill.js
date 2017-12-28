export default function () {

    (function(e){ 
        e.matches || (e.matches=e.matchesSelector||function(selector){
            var matches = document.querySelectorAll(selector), th = this;
            return Array.prototype.some.call(matches, function(e){
                return e === th;
            });
        });   
    })(Element.prototype);
    


    // htmlelement.closest(css)
    (function(e){ 
        e.closest = e.closest || function(css){ 
          var node = this;
         
          while (node) { 
             if (node.matches(css)) return node; 
             else node = node.parentElement; 
          } 
          return null; 
        } 
    })(Element.prototype);


    // analog lodash's _.get()
    window.getByPath = function(theObject, path, separator) {
        try {
            separator = separator || '.';
        
            return path.
                    replace('[', separator).replace(']','').
                    split(separator).
                    reduce(
                        function (obj, property) { 
                            return obj[property];
                        }, theObject
                    );
                        
        } catch (err) {
            return undefined;
        }   
    }


    // Object.assign
    if (!Object.assign) {
        Object.defineProperty(Object, 'assign', {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (target, firstSource) {
                'use strict';
                if (target === undefined || target === null) {
                    throw new TypeError('Cannot convert first argument to object');
                }

                var to = Object(target);
                for (var i = 1; i < arguments.length; i++) {
                    var nextSource = arguments[i];
                    if (nextSource === undefined || nextSource === null) {
                        continue;
                    }

                    var keysArray = Object.keys(Object(nextSource));
                    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                        var nextKey = keysArray[nextIndex];
                        var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                        if (desc !== undefined && desc.enumerable) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
                return to;
            }
        });
    }


    // from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
    (function (arr) {
        arr.forEach(function (item) {
        if (item.hasOwnProperty('remove')) {
            return;
        }
        Object.defineProperty(item, 'remove', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function remove() {
            this.parentNode.removeChild(this);
            }
        });
        });
    })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);


    // classList 
    // Источник: https://gist.github.com/k-gun/c2ea7c49edf7b757fe9561ba37cb19ca
     (function () {
        // helpers
        var regExp = function (name) {
            return new RegExp('(^| )' + name + '( |$)');
        };
        var forEach = function (list, fn, scope) {
            for (var i = 0; i < list.length; i++) {
                fn.call(scope, list[i]);
            }
        };

        // class list object with basic methods
        function ClassList(element) {
            this.element = element;
        }

        ClassList.prototype = {
            add: function () {
                forEach(arguments, function (name) {
                    if (!this.contains(name)) {
                        this.element.className += ' ' + name;
                    }
                }, this);
            },
            remove: function () {
                forEach(arguments, function (name) {
                    this.element.className =
                        this.element.className.replace(regExp(name), '');
                }, this);
            },
            toggle: function (name) {
                return this.contains(name)
                    ? (this.remove(name), false) : (this.add(name), true);
            },
            contains: function (name) {
                return regExp(name).test(this.element.className);
            },
            // bonus..
            replace: function (oldName, newName) {
                this.remove(oldName), this.add(newName);
            }
        };

        // IE8/9, Safari
        if (!('classList' in Element.prototype)) {
            Object.defineProperty(Element.prototype, 'classList', {
                get: function () {
                    return new ClassList(this);
                }
            });
        }

        // replace() support for others
        if (window.DOMTokenList && DOMTokenList.prototype.replace == null) {
            DOMTokenList.prototype.replace = ClassList.prototype.replace;
        }
    })();


}