function Main(canvas) {
    this.app = new PIXI.Application({ view: canvas, transparent: true, antialias: true });
    this.renderer = this.app.renderer;
    this.stage = this.app.stage;
    this.stage.interactive = true;
    // init ticker
    this.ticker = this.app.ticker;
    this.ticker.add(this.update, this);

    
    this.tube = new Tube(new PIXI.Point(300, 400), new PIXI.Point(300, 100), 6e-3);
    this.colorArr = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0x000000];
    this.n = 1;

    this.bottle = new Bottle(50 ,80);
    this.bottle.addWater(1000);
    this.bottle.x = 300;
    this.bottle.y = 410;
    this.bottle.p0 = 100000;

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

Main.prototype.update = function(dt) {
    var h = this.tube.p0.y - (this.bottle.y - this.bottle.wH);
    if(h > 0 && h < this.bottle.h) {
        var dp = this.bottle.getP(h) - this.tube.getP();
        var rho = 1.0e3;
        if(dp > 0) {
            var v = Math.sqrt(dp / rho);
            var dh = this.tube.v2h(v);
            this.add(dh * 16 / 1000, 1.0e3, 1);
            this.bottle.removeWater(v);
        } else if(dp < 0) {
            var v = Math.sqrt(-dp / rho);
            var dh = this.tube.v2h(v);
            this.reverseAdd(dh * 16 / 1000, 0, 0);
            this.bottle.addWater(v);
        }
    }
    /*if(this.dir === 1) {
        this.add();
    } else if(this.dir === -1) {
        this.reverseAdd();
    }*/

    var p0 = this.tube.p0.clone();
    var dir = getDir(this.tube.p0, this.tube.p1);
    var p1;

    var gra = this.gra;
    gra.clear();

    this.tube.forEach((column) => {
        p1 = pointAt(p0, dir, column.length);
        gra.lineStyle(m2px(this.tube.d), this.colorArr[column.data.id % this.colorArr.length]);
        gra.moveTo(p0.x, p0.y);
        gra.lineTo(p1.x, p1.y);
        p0 = p1;
    });
 
    gra.lineStyle(1, 0x000000);
    gra.drawRect(this.bottle.x - this.bottle.d / 2, this.bottle.y - this.bottle.h, this.bottle.d, this.bottle.h);
    gra.lineStyle(0, 0x000000, 0.0);
    gra.beginFill(0xff0000, 0.5);
    gra.drawRect(this.bottle.x - this.bottle.d / 2, this.bottle.y - this.bottle.wH, this.bottle.d, this.bottle.wH);
    gra.endFill();
}

Main.prototype.add = function(v, rho = 1.0e3, n) {
    this.tube.add(v || Math.random() * 10 + 1, {id: n, rho: rho});
}

Main.prototype.reverseAdd = function(v, rho = 1.0e3, n) {
    this.tube.reverseAdd(v || Math.random() * 10 + 1, {id: n, rho: rho});
}

function getDir(p0, p1) {
    var length = distance(p0, p1);
    return new PIXI.Point((p1.x - p0.x) / length, (p1.y - p0.y) / length);
}

function pointAt(p0, dir, d) {
    return new PIXI.Point(p0.x + dir.x * d, p0.y + dir.y * d);
}

function distance(p0, p1) {
    return length(p0.x - p1.x, p0.y - p1.y);
}

function length(x, y) {
    return Math.sqrt(x * x + y * y);
}

function m2px(m) {
    return m * 1000;
}

function px2m(px) {
    return px / 1000;
}

/**
 * 管子
 * @param {Point} p0 端点
 * @param {Point} p1 端点
 * @param {Point} d  直径
 */
function Tube(p0, p1, d){
    this.d = d;
    this.p0 = p0;
    this.p1 = p1;
    //
    this.length = distance(this.p0, this.p1);
    //
    this.column0 = new Column(this.length, {id: 0, rho: 0});
    this.column1 = this.column0;
}

Tube.prototype.v2h = function(v) {
    return v / this.d;
}

Tube.prototype.h2v = function(h) {
    return h * this.d;
}

Tube.prototype.add = function(h, data) {
    var column = new Column(h, data);
    column.next = this.column0;
    this.column0.prev = column;
    this.column0 = column;
    //
    this.updatePrevLength();
    this.cutOff();
}

Tube.prototype.reverseAdd = function(h, data) {
    var column = new Column(h, data);
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

Tube.prototype.getP = function() {
    var column = this.column0;
    var p = column.getP();
    while(column !== this.column1) {
        column = column.next;
        p += column.getP();
    }
    return p;
}

/**
 * 一段液柱。
 */
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

Column.prototype.getP = function() {
    var g = 10;
    return this.data.rho * g * this.length;
}

function Bottle(d, h) {
    this.d = d;
    this.h = h;
    //
    this.v = this.d * this.h;
    //
    this.wV = 0;
    this.wH = 0;
    this.p0 = 0;
}

Bottle.prototype.v2h = function(v) {
    return v / this.d;
}

Bottle.prototype.h2v = function(h) {
    return h * this.d;
}

Bottle.prototype.addWater = function(v) {
    this.wV += v;
    if(this.wV > this.v) {
        this.wV = this.v;
    }
    if(this.wV < 0) {
        this.wV = 0;
    }
    this.wH = this.v2h(this.wV);
}

Bottle.prototype.removeWater = function(v) {
    this.addWater(-v);
}

Bottle.prototype.getP = function(h) {
    var rho = 1.0e3;
    var g = 10.0;
    return this.p0 + rho * g * Math.min(this.wH, h);
}