function Main(canvas) {
    this.app = new PIXI.Application({ view: canvas, transparent: true, antialias: true });
    this.renderer = this.app.renderer;
    this.stage = this.app.stage;
    this.stage.interactive = true;
    // init ticker
    this.ticker = this.app.ticker;
    this.ticker.add(this.update, this);

    
    this.tube = new Tube(new PIXI.Point(100, 100), new PIXI.Point(500, 100), 1);
    this.colorArr = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0x000000];
    this.n = 1;
    this.gra = new PIXI.Graphics();
    this.stage.addChild(this.gra);
    window.main = this;
    this.ticker.start();
    this.ticker.maxFPS = 10;
    this.dir = 1;

    this.stage.hitArea = new function(){
        this.contains = function(x, y){
            return true;
        };
    }

    this.stage.on("click", (e) => {
        this.dir = -this.dir;
    });
}

Main.prototype.update = function() {
    if(this.dir === 1) {
        this.add();
    } else if(this.dir === -1) {
        this.reverseAdd();
    }

    var p0 = this.tube.p0.clone();
    var dir = getDir(this.tube.p0, this.tube.p1);
    var p1;

    var gra = this.gra;
    gra.clear();

    gra.lineStyle(5, 0x000000);
    gra.moveTo(this.tube.p0.x, this.tube.p0.y + 50);
    gra.lineTo(this.tube.p1.x, this.tube.p1.y + 50);

    this.tube.forEach((column) => {
        p1 = pointAt(p0, dir, column.length);
        gra.lineStyle(5, this.colorArr[column.data.id % this.colorArr.length]);
        gra.moveTo(p0.x, p0.y);
        gra.lineTo(p1.x, p1.y);
        p0 = p1;
    });
}

Main.prototype.add = function(v) {
    this.tube.add(v || Math.random() * 10 + 1, {id: this.n++});
}

Main.prototype.reverseAdd = function(v) {
    this.tube.reverseAdd(v || Math.random() * 10 + 1, {id: this.n++});
}

function getDir(p0, p1) {
    var length = distance(p0, p1);
    return new PIXI.Point((p1.x - p0.x) / length, (p1.y - p0.y) / length);
}

function pointAt(p0, dir, d) {
    return new PIXI.Point(p0.x + dir.x * d, p0.y + dir.y * d);
}

function Tube(p0, p1, d){
    this.d = d;
    this.p0 = p0;
    this.p1 = p1;
    //
    this.r = this.d / 2;
    this.s = Math.PI * this.r* this.r;
    this.length = distance(this.p0, this.p1);
    //
    this.column0 = new Column(this.length, {id: 0});
    this.column1 = this.column0;
}

Tube.prototype.v2l = function(v) {
    return v / this.s;
}

Tube.prototype.l2v = function(l) {
    return l * this.s;
}

Tube.prototype.add = function(l, data) {
    var column = new Column(l, data);
    column.next = this.column0;
    this.column0.prev = column;
    this.column0 = column;
    //
    this.updatePrevLength();
    this.cutOff();
}

Tube.prototype.reverseAdd = function(l, data) {
    var column = new Column(l, data);
    column.prev = this.column1;
    this.column1.next = column;
    this.column1 = column;
    // 
    this.updateNextLength();
    this.reverseCutOff();
}

Tube.prototype.updatePrevLength = function() {
    var column = this.column0;
    column.prevLength = 0;
    while(column !== this.column1) {
        column.next.prevLength = column.prevLength + column.length;
        column = column.next;
    }
}

Tube.prototype.updateNextLength = function() {
    var column = this.column1;
    column.nextLength = 0;
    while(column !== this.column0){
        column.prev.nextLength = column.nextLength + column.length;
        column = column.prev;
    }
}

Tube.prototype.remove = function() {
    this.column1 = this.column1.prev;
    this.column1.next.destroy();
    this.column1.next = this.column1;
}

Tube.prototype.reverseRemove = function() {
    this.column0 = this.column0.next;
    this.column0.prev.destroy();
    this.column0.prev = this.column0;
}

Tube.prototype.cutOff = function() {
    while(this.column1.prevLength > this.length) {
        this.remove();
    }
    this.column1.length = this.length - this.column1.prevLength;
}

Tube.prototype.reverseCutOff = function() {
    while(this.column0.nextLength > this.length) {
        this.reverseRemove();
    }
    this.column0.length = this.length - this.column0.nextLength;
}

Tube.prototype.forEach = function(callBack) {
    var column = this.column0;
    callBack(column);
    while(column !== this.column1) {
        column = column.next;
        callBack(column);
    }
}

Tube.prototype.reverseForEach = function(callBack) {
    var column = this.column1;
    callBack(column);
    while(column !== this.column0) {
        column = column.prev;
        callBack(column);
    }
}

Tube.prototype.columnNum = function() {
    var n = 1;
    var column = this.column0;
    while(column !== this.column1) {
        column = column.next;
        n++;
    }
    return n;
}

function Column(length, data){
    this.next = this;
    this.prev = this;
    this.length = length;
    this.data = data;
    this.prevLength = 0;
    this.nextLength = 0;
}

Column.prototype.destroy = function() {
    this.next = null;
    this.prev = null;
    this.data = null;
}


function distance(p0, p1) {
    return length(p0.x - p1.x, p0.y - p1.y);
}

function length(x, y) {
    return Math.sqrt(x * x + y * y);
}

