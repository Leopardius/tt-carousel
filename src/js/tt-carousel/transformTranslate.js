export function cssTranslateX(HTMLelement, x){
    HTMLelement.style.MozTransform = x;
    HTMLelement.style.WebkitTransform = x;
    HTMLelement.style.OTransform = x;
    HTMLelement.style.MsTransform  = x;
    HTMLelement.style.transform = x;
}

export function cssGetTranslateX(HTMLelement){
    if(!HTMLelement) return false;
    let transform;
    if( !HTMLelement.style.transform ){
        transform = 0;
    }else{
        let bracketLeft = HTMLelement.style.transform.indexOf('(');
        if(bracketLeft === -1) return false;
        let bracketRight = HTMLelement.style.transform.indexOf(')');
        if(bracketRight === -1) return false;
        transform = parseInt(HTMLelement.style.transform.slice(bracketLeft+1, bracketRight), 10);
    }
    
    return transform;
}

export function cssTransition(HTMLelement, t){
    HTMLelement.style.MozTransition = t;
    HTMLelement.style.WebkitTransition = t;
    HTMLelement.style.OTransition = t;
    HTMLelement.style.MsTransition = t;
    HTMLelement.style.transition = t;
}