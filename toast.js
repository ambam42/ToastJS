const TOAST_STICK = -1;
const TOAST_SHORT = 2000;
const TOAST_LONG = 3500;
const TOAST_FADE_TIME = 10;

const TOAST_LEFT = {"top": "50%", "left": "1%", "transform": "translateY(-50%)", "position": "absolute"};
const TOAST_TOP = {"top": "1%", "left": "50%", "transform": "translateX(-50%)", "position": "absolute"};
const TOAST_RIGHT = {"top": "50%", "right": "1%", "transform": "translateY(-50%)", "position": "absolute"};
const TOAST_BOTTOM = {"bottom": "1%", "left": "50%", "transform": "translateX(-50%)", "position": "absolute"};
const TOAST_CENTER = {"top": "50%", "left": "50%", "transform": "translate(-50%, -50%)", "position": "absolute"};
const TOAST_DOM_ELEMENT = {"position": "absolute", "padding": "12px 0", "opacity": "0", "white-space": "nowrap"};

const TOAST_ARROW_LEFT = {"content": " ","border-top": "10px solid transparent","border-bottom": "10px solid transparent","border-left": "10px solid transparent","border-right":"10px solid #4d4d4d","height": "1px", "display": "inline", "position":"absolute", "left":"0%", "top":"50%", "transform" : "translate(-100%, -50%)"}
const TOAST_ARROW_RIGHT = {"content": " ","border-top": "10px solid transparent","border-bottom": "10px solid transparent","border-right": "10px solid transparent","border-left":"10px solid #4d4d4d","height": "1px", "display": "inline", "position":"absolute", "left":"100%", "top":"50%", "transform" : "translateY(-50%)" };

const TOAST_ARROW_TOP = {"content": " ","border-top": "10px solid transparent","border-right": "10px solid transparent","border-left": "10px solid transparent","border-bottom":"10px solid #4d4d4d","width": "1px", "display": "inline", "position": "absolute", "bottom":"100%"}
const TOAST_ARROW_BOTTOM = {"content": " ","border-right": "10px solid transparent","border-left": "10px solid transparent","border-bottom": "10px solid transparent","border-top":"10px solid #4d4d4d","width": "1px", "display": "inline","position":"absolute", "top":"100%", }

const TOAST_ARROW_TB_LEFT = {"position:":"absolute", "left":"10%"};
const TOAST_ARROW_TB_RIGHT = {"position:":"absolute", "right":"10%"};

var TOAST_ZINDEX = 100000;

const TOAST_STYLE = {
    "background-color": "#4d4d4d",
    "font-family": "'Open Sans', sans-serif",
    "font-size": "18px",
    "color": "#ffffff",
    "padding": "12px",
    "border-radius": "12px",
    "display": "inline"
}

function Toast(text, length){
    this.text = text;
    this.length = length || TOAST_SHORT;
    this.style = {};   
    this.body;
    this.html;
    
    this.setAttribute = function(attr, value, context){
        var context=context||this;
        context.style[attr] = value;
    }
    this.getHtml = function(context){
        var context=context||this;
        return context.html ? context.html : context.html = document.documentElement || context.getBody().parentNode || document.getElementsByTagName('html')[0];
    }
    this.getBody = function (context) {
        var context=context||this;
        return context.body ? context.body : context.body = document.body || document.getElementsByTagName('body')[0];
    }
    this.show = function(pos, context){
        var context = context||this;
        var pos = pos || TOAST_BOTTOM;
        var stick = (stick!==false?true:false);
        var div = document.createElement('div');

        div.innerHTML = context.text;
        context.apply(div.style, TOAST_STYLE);
        context.apply(div.style, context.style);

        if(context.isDomElement(pos)){
            var domE = pos;
            var bOffset = context.offset(context.getHtml());
            var offset = context.offset(pos);

            var divWrapper = document.createElement('div');
            var divArrow = document.createElement('div');
            
            divWrapper.appendChild(divArrow);
            divWrapper.appendChild(div);
            context.apply(divWrapper.style, TOAST_DOM_ELEMENT);
            
            context.getBody().appendChild(divWrapper);

            var dOffset = context.offset(divWrapper);
            var onLeft = bOffset.x >= offset.x;

            var onCenter = offset.y > (bOffset.height * .2) && offset.y < bOffset.height * .8;
            
            if(onCenter && (dOffset.width < (bOffset.width - offset.right) || dOffset.width < offset.left)){
                if(onLeft){
                    context.apply(divArrow.style, TOAST_ARROW_LEFT);
                    var aOffset = context.offset(divArrow);
                    pos = {"position":"absolute", "left" : offset.right + (aOffset.width /2), "top" : offset.y - (dOffset.height /2)}
                }else{
                    context.apply(divArrow.style, TOAST_ARROW_RIGHT);
                    aOffset = context.offset(divArrow);
                    pos = {"position":"absolute", "left" : (offset.left - (dOffset.width+(aOffset.width /2))), "top" : offset.y - (dOffset.height /2)}
                }
            }else{
                var onTop = bOffset.y >= offset.y;
                pos = {"position":"absolute"};
                if(onTop){
                    context.apply(divArrow.style, TOAST_ARROW_TOP);
                    aOffset = context.offset(divArrow);
                    pos.top = offset.bottom + (aOffset.height /2);
                }else{
                    context.apply(divArrow.style, TOAST_ARROW_BOTTOM);
                    aOffset = context.offset(divArrow);
                    pos.top = offset.top - (dOffset.height + (aOffset.height /2));
                }
                if(onLeft){
                    context.apply(divArrow.style, TOAST_ARROW_TB_LEFT);
                    pos.left = offset.x;
                    //lower right
                }else {
                    context.apply(divArrow.style, TOAST_ARROW_TB_RIGHT);
                    pos.left = offset.x - dOffset.width;
                    //lower left
                }
            }

            div=divWrapper;
        } else {
            context.getBody().appendChild(div);
        }
      
        pos["z-index"] = TOAST_ZINDEX++;
        context.apply(div.style, pos);
        context.fadeIn(div);
        
        if(context.length !== TOAST_STICK){
            setTimeout(function(){
                context.fadeOut(div, function(element, context){context.removeElement(element);});
            }, context.length);
        }
    }
    this.removeElement = function(element, context){
        var context=context||this;
        context.getBody().removeChild(element);
    }
    this.apply = function(element, props){
        for(prop in props){
            if(props.hasOwnProperty(prop)){
                element[prop] = props[prop];
            }
        }
    }
    this.isDomElement = function(element) {
        if(element && typeof element  === "object" && typeof element.nodeType !== "undefined"){
            return true;
        }
        else{
            return false;
        }
    }
    this.fadeIn = function(element,context){
        var context=context||this;
        context.fade(element, .01, 1);
    }
    this.fadeOut = function(element,callback,context){
        var context=context||this;
        var callback=callback||null;
        context.fade(element, -.01, 0, callback);
    }
    this.fade = function(element, increment, threshold, callback, time, first, context){
        var context = context||this;
        var increment = increment||.01;
        var threshold = ((typeof threshold !== "undefined" && Number.isInteger(threshold))?threshold:1);
        var callback = callback||null;
        var time=time||TOAST_FADE_TIME;
        var first = (first!==false?true:false);
        
        if(first===true){
            if(element.fade){
                clearTimeout(element.fade);
                element.fade=null;
            }
            if(increment > 0){
                element.style.opacity = 0;
            }else{
                element.style.opacity = 1;
            }
        }
        element.style.opacity = +(element.style.opacity) + +(increment);
        if((increment > 0 && element.style.opacity <= threshold) || (increment < 0 && element.style.opacity >= threshold)){
            element.fade = setTimeout(function(){
                context.fade(element, increment, threshold, callback, time, false, context);
            }, time);
        }else if(callback){
            callback(element, context);
        }
    }
    this.offset=function(elem,context){
        context=context||this;
        doc = elem && elem.ownerDocument;

        if (!doc) {
            return null;
        }

        return context.getOffset(elem, doc, doc.documentElement, null, context);
    }
    this.getOffset = function(elem, doc, docElem, box, context) {
        context=context||this;
        try {
            box = elem.getBoundingClientRect();
        } catch(e) {}

        // Make sure we're not dealing with a disconnected DOM node
        if (!box || (typeof jQuery!=="undefined" && !jQuery.contains(docElem, elem))) {
            return box ? new Box(box.left, box.top, box.right, box.bottom, box.width, box.height) : new Box();
        }

        var body = context.getBody(),
            win = context.getWindow(doc),
            clientTop = docElem.clientTop || body.clientTop || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0,
            scrollTop = win.pageYOffset || (typeof jQuery!=="undefined" && jQuery.support.boxModel && docElem.scrollTop) || body.scrollTop,
            scrollLeft = win.pageXOffset || (typeof jQuery!=="undefined" && jQuery.support.boxModel && docElem.scrollLeft) || body.scrollLeft,
            wTop = scrollTop - clientTop,
            wLeft = scrollLeft - clientLeft,
            top = box.top + wTop,
            left = box.left + wLeft,
            right = box.right + wLeft,
            bottom = box.bottom + wTop,
            width = (box.width > 0 ? box.width : box.right > 0 ? box.right - box.left : 0 ),
            height = (box.height > 0 ? box.height : box.bottom > 0 ? box.bottom - box.top : 0 );

        return new Box(left, top, right, bottom, width, height);
    }
    this.getWindow = function(doc){
        return doc.parentWindow || doc.defaultView; //  Window
    }
    this.isInside = function(container, box){
        return (container.left <= box.left && container.right >= box.right && container.top <= box.top && container.bottom >= box.bottom);
    }

}

function Box(left, top, right, bottom, width, height, x, y) {
    this.left = left || 0;
    this.top = top || 0;
    this.right = right || 0;
    this.bottom = bottom || 0;
    this.width = width || this.right-this.left;
    this.height = this.bottom-this.top;
    this.x= x || this.left + (this.width / 2);
    this.y= y || this.top + (this.height / 2);

    this.translate=function(pos, context){
        var context = context||this;
        if(pos.top){
            context.top = +pos.top;
            context.bottom = +context.top + +context.height;
        }else if(pos.bottom){
            context.bottom = pos.bottom;
            context.top = +context.bottom - +context.height;
        }

        if(pos.left){
            context.left = pos.left;
            context.right = +context.left + +context.width;
        }else if(pos.right){
            context.right = pos.right;
            context.left = +context.right - +context.width;
        }
        context.x=context.left + (context.width / 2);
        context.y=context.top + (context.height / 2);
    }
}