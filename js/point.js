

export default class Point {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString(){
        return JSON.stringify(this);
    }
}