var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Created by hanyeah on 2019/10/23.
 */
var hanyeah;
(function (hanyeah) {
    var tube;
    (function (tube) {
        var Column = /** @class */ (function () {
            function Column(length, data) {
                this.length = length;
                this.data = data;
                this.next = this;
                this.prev = this;
                this.prevLength = 0;
                this.nextLength = 0;
            }
            Column.prototype.destroy = function () {
                this.next = null;
                this.prev = null;
                this.data = null;
            };
            Column.prototype.getP = function (g) {
                return this.data.rho * g * this.length;
            };
            return Column;
        }());
        tube.Column = Column;
    })(tube = hanyeah.tube || (hanyeah.tube = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/10/23.
 */
var hanyeah;
(function (hanyeah) {
    var tube;
    (function (tube) {
        var LiquidData = /** @class */ (function () {
            function LiquidData(type, rho, v, color) {
                this.rho = rho;
                this.v = v;
                this.color = color;
                this.type = type;
            }
            LiquidData.getWater = function () {
                return new LiquidData(LiquidData.TYPE_WATER, 1.0e3, 1, 0x000000);
            };
            LiquidData.getAir = function () {
                return new LiquidData(LiquidData.TYPE_AIR, 1.293, 1, 0xff0000);
            };
            LiquidData.prototype.clone = function () {
                return new LiquidData(this.type, this.rho, this.v, this.color);
            };
            LiquidData.TYPE_AIR = 1;
            LiquidData.TYPE_WATER = 2;
            LiquidData.COUNTING = 0;
            return LiquidData;
        }());
        tube.LiquidData = LiquidData;
    })(tube = hanyeah.tube || (hanyeah.tube = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/10/23.
 */
var hanyeah;
(function (hanyeah) {
    var tube;
    (function (tube) {
        var TubeData = /** @class */ (function () {
            function TubeData(p0, p1, d, data) {
                console.log("tube");
                this.p0 = p0;
                this.p1 = p1;
                this.d = d;
                //
                this.length = tube.Utils.distance(this.p0, this.p1);
                //
                data.v = this.h2v(this.length);
                this.column0 = new tube.Column(this.length, data);
                this.column1 = this.column0;
            }
            TubeData.prototype.v2h = function (v) {
                return v / this.d;
            };
            TubeData.prototype.h2v = function (h) {
                return h * this.d;
            };
            TubeData.prototype.add = function (data) {
                if (data.type === this.column0.data.type) {
                    this.column0.length += this.v2h(data.v);
                }
                else {
                    var column = new tube.Column(this.v2h(data.v), data);
                    column.next = this.column0;
                    this.column0.prev = column;
                    this.column0 = column;
                }
                //
                this.updatePrevLength();
                this.cutOff();
            };
            TubeData.prototype.reverseAdd = function (data) {
                if (data.type === this.column1.data.type) {
                    this.column1.length += this.v2h(data.v);
                }
                else {
                    var column = new tube.Column(this.v2h(data.v), data);
                    column.prev = this.column1;
                    this.column1.next = column;
                    this.column1 = column;
                }
                //
                this.updateNextLength();
                this.reverseCutOff();
            };
            TubeData.prototype.forEach = function (callBack) {
                var column = this.column0;
                callBack(column);
                while (column !== this.column1) {
                    column = column.next;
                    callBack(column);
                }
            };
            TubeData.prototype.reverseForEach = function (callBack) {
                var column = this.column1;
                callBack(column);
                while (column !== this.column0) {
                    column = column.prev;
                    callBack(column);
                }
            };
            TubeData.prototype.columnNum = function () {
                var n = 1;
                var column = this.column0;
                while (column !== this.column1) {
                    column = column.next;
                    n++;
                }
                return n;
            };
            TubeData.prototype.getP = function (g) {
                var dy = this.p0.y - this.p1.y;
                if (dy === 0) {
                    return 0;
                }
                var column = this.column0;
                var p = column.getP(g);
                while (column !== this.column1) {
                    column = column.next;
                    p += column.getP(g);
                }
                return p * dy / this.length;
            };
            TubeData.prototype.updatePrevLength = function () {
                var column = this.column0;
                column.prevLength = 0;
                while (column !== this.column1) {
                    column.next.prevLength = column.prevLength + column.length;
                    column = column.next;
                }
            };
            TubeData.prototype.cutOff = function () {
                while (this.column1.prevLength > this.length) {
                    this.remove();
                }
                this.column1.length = this.length - this.column1.prevLength;
            };
            TubeData.prototype.remove = function () {
                this.column1 = this.column1.prev;
                this.column1.next.destroy();
                this.column1.next = this.column1;
            };
            TubeData.prototype.updateNextLength = function () {
                var column = this.column1;
                column.nextLength = 0;
                while (column !== this.column0) {
                    column.prev.nextLength = column.nextLength + column.length;
                    column = column.prev;
                }
            };
            TubeData.prototype.reverseCutOff = function () {
                while (this.column0.nextLength > this.length) {
                    this.reverseRemove();
                }
                this.column0.length = this.length - this.column0.nextLength;
            };
            TubeData.prototype.reverseRemove = function () {
                this.column0 = this.column0.next;
                this.column0.prev.destroy();
                this.column0.prev = this.column0;
            };
            return TubeData;
        }());
        tube.TubeData = TubeData;
    })(tube = hanyeah.tube || (hanyeah.tube = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/10/23.
 */
var hayeah;
(function (hayeah) {
    var tube;
    (function (tube) {
        var TubeData = hanyeah.tube.TubeData;
        var Point = PIXI.Point;
        var LiquidData = hanyeah.tube.LiquidData;
        var Tube = /** @class */ (function (_super) {
            __extends(Tube, _super);
            function Tube() {
                var _this = _super.call(this) || this;
                _this.length = 100;
                _this.tubeData = new TubeData(new Point(0, 0), new Point(0, -200), 6, LiquidData.getAir());
                _this.gra = new PIXI.Graphics();
                _this.addChild(_this.gra);
                return _this;
            }
            Tube.prototype.update = function (dt) {
                this.updateSkin();
            };
            Tube.prototype.updateSkin = function () {
                var gra = this.gra;
                gra.clear();
                gra.lineStyle(1, 0x000000, 1.0);
                gra.moveTo(-3, 0);
                gra.lineTo(-3, -200);
                gra.moveTo(3, 0);
                gra.lineTo(3, -200);
                this.tubeData.forEach(function (column) {
                    gra.lineStyle(6, column.data.color, 1.0);
                    gra.moveTo(0, -column.prevLength);
                    gra.lineTo(0, -(column.prevLength + column.length));
                });
            };
            return Tube;
        }(PIXI.Container));
        tube.Tube = Tube;
    })(tube = hayeah.tube || (hayeah.tube = {}));
})(hayeah || (hayeah = {}));
/**
 * Created by hanyeah on 2019/10/23.
 */
var hanyeah;
(function (hanyeah) {
    var tube;
    (function (tube) {
        var Bottle = /** @class */ (function (_super) {
            __extends(Bottle, _super);
            function Bottle() {
                var _this = _super.call(this) || this;
                _this.d = 80;
                _this.h = 120;
                _this.v = _this.d * _this.h;
                _this.wV = 0;
                _this.wH = 0;
                _this.p0 = 0;
                _this.gra = new PIXI.Graphics();
                _this.addChild(_this.gra);
                return _this;
            }
            Bottle.prototype.update = function (dt) {
                this.updateSkin();
            };
            Bottle.prototype.updateSkin = function () {
                var gra = this.gra;
                gra.clear();
                gra.lineStyle(1, 0x000000, 1.0);
                gra.drawRect(-40, -120, 80, 120);
                gra.beginFill(0xff0000, 0.3);
                gra.drawRect(-40, -this.wH, 80, this.wH);
                gra.endFill();
            };
            Bottle.prototype.v2h = function (v) {
                return v / this.d;
            };
            Bottle.prototype.h2v = function (h) {
                return h * this.d;
            };
            Bottle.prototype.addWater = function (v) {
                this.wV += v;
                if (this.wV > this.v) {
                    this.wV = this.v;
                }
                if (this.wV < 0) {
                    this.wV = 0;
                }
                this.wH = this.v2h(this.wV);
            };
            Bottle.prototype.removeWater = function (v) {
                this.addWater(-v);
            };
            Bottle.prototype.getP = function (g, h) {
                return this.p0 + 1.0e3 * g * Math.min(this.wH, h);
            };
            return Bottle;
        }(PIXI.Container));
        tube.Bottle = Bottle;
    })(tube = hanyeah.tube || (hanyeah.tube = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/10/23.
 */
var hanyeah;
(function (hanyeah) {
    var tube;
    (function (tube) {
        var Constants = /** @class */ (function () {
            function Constants() {
            }
            Constants.ATM = 101325; // 标准大气压atmosphere,[Pa]
            Constants.TK = 273.15;
            Constants.NORM_T = Constants.TK + 20;
            Constants.R = 8.314472;
            Constants.MOL_MASS_AIR = 28.959;
            return Constants;
        }());
        tube.Constants = Constants;
    })(tube = hanyeah.tube || (hanyeah.tube = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/10/23.
 */
var hanyeah;
(function (hanyeah) {
    var tube;
    (function (tube) {
        var Tube = hayeah.tube.Tube;
        var Main = /** @class */ (function () {
            function Main(canvas) {
                console.log("main");
                this.app = new PIXI.Application({ view: canvas, transparent: true, antialias: true });
                this.renderer = this.app.renderer;
                this.stage = this.app.stage;
                this.stage.interactive = true;
                this.ticker = this.app.ticker;
                this.stage.hitArea = new StageHItArea();
                this.ticker.add(this.update, this);
                this.tube = new Tube();
                this.stage.addChild(this.tube);
                this.tube.x = 400;
                this.tube.y = 400;
                this.bottle = new tube.Bottle();
                this.stage.addChild(this.bottle);
                this.bottle.x = 400;
                this.bottle.y = 400 + 20;
                this.bottle.addWater(this.bottle.h2v(60));
            }
            Main.prototype.update = function (dt) {
                this.tube.update(dt);
                this.bottle.update(dt);
            };
            return Main;
        }());
        tube.Main = Main;
        var StageHItArea = /** @class */ (function () {
            function StageHItArea() {
            }
            StageHItArea.prototype.contains = function (x, y) {
                return true;
            };
            return StageHItArea;
        }());
    })(tube = hanyeah.tube || (hanyeah.tube = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/10/23.
 */
var hanyeah;
(function (hanyeah) {
    var tube;
    (function (tube) {
        var Point = PIXI.Point;
        var Utils = /** @class */ (function () {
            function Utils() {
            }
            Utils.getDir = function (p0, p1) {
                var leng = Utils.distance(p0, p1);
                if (leng === 0) {
                    throw (new Error("getDir error: leng is zero!"));
                }
                return new Point((p1.x - p0.x) / leng, (p1.y - p0.y) / leng);
            };
            Utils.pointAt = function (p0, dir, d) {
                return new Point(p0.x + dir.x * d, p0.y + dir.y * d);
            };
            Utils.distance = function (p0, p1) {
                return Utils.leng(p0.x - p1.x, p0.y - p1.y);
            };
            Utils.leng = function (x, y) {
                return Math.sqrt(x * x + y * y);
            };
            Utils.m2px = function (m) {
                return m * Utils.PX_PER_M;
            };
            Utils.px2m = function (px) {
                return px / Utils.PX_PER_M;
            };
            Utils.PX_PER_M = 1000;
            return Utils;
        }());
        tube.Utils = Utils;
    })(tube = hanyeah.tube || (hanyeah.tube = {}));
})(hanyeah || (hanyeah = {}));
