import { Node } from "./Node.js";
export class Audio extends Node {
    constructor(path) {
        super();
        this._path = "";
        if (path) this.path = path;
    }

    get path() {
        return this._path;
    }
    set path(value) {
        this._path = value;
        this.elm.src = this._path;
    }

    _initElement() {
        this.elm = document.createElement("audio");
    }
}