import {Node} from "./Node.js"
export class Label extends Node{
    constructor (font,size,color){
        super();
        this._text="";
        this._font = "";
        if (font) this.font=font;
        this._size = 0;
        if (size) this.size=size;
        this._color ="";
        if (color) this.color = color;
    }

    get text(){
        return this._text;
    }
    set text(value){
        this._text=value;
        this.elm.innerText = this._text;
    }

    get font(){
        return this._font;
    }
    set font(value){
        this._font=value;
        this.elm.style.fontFamily = this._font;
    }

    get size(){
        return this._size;
    }
    set size(value){
        this._size=value;
        this.elm.style.fontSize = this._size;
    }

    get color(){
        return this._color;
    }
    set color(value){
        this._color=value;
        this.elm.style.color=this._color;
    }

    _initElement() {
        this.elm = document.createElement("label");
        this.elm.style.position = "absolute";
    }
}