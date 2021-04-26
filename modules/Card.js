import { Node } from "../lib/Node.js"
import {Sprite} from "../lib/Sprite.js"
import {Label} from "../lib/Label.js"

export class Card extends Node {
    constructor(src,index, value) {
        super();
        this.src=src;
        this.index = index;
        this.value = value;

        this._initSize();
        this._initStatic();
        this._initCover();
        this._createLabel();
        
    }

    _initSize(){
        this.width = 100;
        this.height = 100;
    }

    _initCover(){
        var cover = new Sprite("./img/cardBg.jpg");
        // cover.x=10;
        // cover.y=50;
        cover.width =100;
        cover.height=100;
        cover.elm.node=this;
        this.addChild(cover);

        // var no = new Label ("Arial","15px","Green");
        // no.text=this.index;
        // cover.addChild(no);
    }

    _initStatic(){
        var img = new Sprite(this.src);
        // img.x=10;
        // img.y=50;
        img.value=this.value;
        img.width=100;
        img.height=100;
        img.elm.node=this;
        this.addChild(img);
    }

    _createLabel(){
        var no = new Label ("Arial","30px","Green");
        no.text=this.index+1;
        no.x=this.width/2 -15;
        no.y=this.height/2 -15;
        no.elm.node=this;
        this.addChild(no);
    }
}
