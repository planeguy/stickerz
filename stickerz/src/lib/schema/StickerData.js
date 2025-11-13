import { v4 } from "uuid";

export class StickerData {
    constructor({x,y,size,colour,text,id,img}){
        this.x=x;
        this.y=y;
        this.size=size;
        this.colour=colour;
        this.text=text;
        this.id=id??v4();
        this.img=img;
    }
}