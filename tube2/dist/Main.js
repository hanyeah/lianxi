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
 * Created by hanyeah on 2019/10/31.
 */
var hanyeah;
(function (hanyeah) {
    var tube;
    (function (tube) {
        var Constants = hanyeah.tube.Constants;
        var DChemicals = /** @class */ (function () {
            function DChemicals(mm, n, T) {
                this.type = 0;
                this._mm = 1;
                this._n = 1;
                this._m = 1;
                this._T = 300;
                this._V = 1;
                this._rho = 1;
                this._p = 1;
                this._mm = mm;
                this._n = n;
                this._T = T;
                this.updateParam(1);
            }
            Object.defineProperty(DChemicals.prototype, "mm", {
                get: function () {
                    return this._mm;
                },
                set: function (value) {
                    this._mm = value;
                    this.updateParam(1);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DChemicals.prototype, "n", {
                get: function () {
                    return this._n;
                },
                set: function (value) {
                    this._n = value;
                    this.updateParam(1);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DChemicals.prototype, "m", {
                get: function () {
                    return this._m;
                },
                set: function (value) {
                    this._m = value;
                    this.updateN();
                    this.updateParam(2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DChemicals.prototype, "T", {
                get: function () {
                    return this._T;
                },
                set: function (value) {
                    this._T = value;
                    this.updateParam(3);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DChemicals.prototype, "V", {
                get: function () {
                    return this._V;
                },
                set: function (value) {
                    // this._V = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DChemicals.prototype, "rho", {
                get: function () {
                    return this._rho;
                },
                set: function (value) {
                    // this._rho = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DChemicals.prototype, "p", {
                get: function () {
                    return this._rho;
                },
                enumerable: true,
                configurable: true
            });
            DChemicals.prototype.setAmountV = function (value) {
                // this._V = value;
            };
            DChemicals.prototype.updateM = function () {
                this._m = this._n * this._mm;
            };
            DChemicals.prototype.updateN = function () {
                this._n = this._m / this._mm;
            };
            DChemicals.prototype.updateRho = function () {
                this._rho = this._m / this._V;
            };
            DChemicals.prototype.updateV = function () {
                this._V = this._m / this._rho;
            };
            DChemicals.prototype.updateM2 = function () {
                this._m = this._V * this._rho;
            };
            DChemicals.prototype.updateP = function () {
                this._p = this._n * Constants.R * this._T / this._V;
            };
            DChemicals.prototype.updateParam = function (level) {
                if (level > 0) {
                    this.updateM();
                }
                if (level > 1) {
                    if (this.type === DChemicals.TYPE_GAS) {
                        this.updateRho();
                    }
                    else {
                        this.updateV();
                    }
                }
                if (level > 2) {
                    this.updateP();
                }
            };
            DChemicals.TYPE_GAS = 1;
            DChemicals.TYPE_LIQUID = 2;
            DChemicals.TYPE_SOLID = 3;
            return DChemicals;
        }());
        tube.DChemicals = DChemicals;
    })(tube = hanyeah.tube || (hanyeah.tube = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/10/23.
 */
var hanyeah;
(function (hanyeah) {
    var tube;
    (function (tube) {
        var DTube = /** @class */ (function () {
            function DTube(p0, p1, d, data) {
                console.log("tube");
                this.p0 = p0;
                this.p1 = p1;
                this.d = d;
                //
                this.length = tube.DUtils.distance(this.p0, this.p1);
                //
                data.setAmountV(this.h2v(this.length));
                this.column0 = new tube.Column(this.length, data);
                this.column1 = this.column0;
            }
            DTube.prototype.v2h = function (v) {
                return v / this.d;
            };
            DTube.prototype.h2v = function (h) {
                return h * this.d;
            };
            DTube.prototype.add = function (data) {
                if (data.type === this.column0.data.type) {
                    this.column0.length += this.v2h(data.V);
                }
                else {
                    var column = new tube.Column(this.v2h(data.V), data);
                    column.next = this.column0;
                    this.column0.prev = column;
                    this.column0 = column;
                }
                //
                this.updatePrevLength();
                this.cutOff();
            };
            DTube.prototype.reverseAdd = function (data) {
                if (data.type === this.column1.data.type) {
                    this.column1.length += this.v2h(data.V);
                }
                else {
                    var column = new tube.Column(this.v2h(data.V), data);
                    column.prev = this.column1;
                    this.column1.next = column;
                    this.column1 = column;
                }
                //
                this.updateNextLength();
                this.reverseCutOff();
            };
            DTube.prototype.forEach = function (callBack) {
                var column = this.column0;
                callBack(column);
                while (column !== this.column1) {
                    column = column.next;
                    callBack(column);
                }
            };
            DTube.prototype.reverseForEach = function (callBack) {
                var column = this.column1;
                callBack(column);
                while (column !== this.column0) {
                    column = column.prev;
                    callBack(column);
                }
            };
            DTube.prototype.columnNum = function () {
                var n = 1;
                var column = this.column0;
                while (column !== this.column1) {
                    column = column.next;
                    n++;
                }
                return n;
            };
            DTube.prototype.getP = function (g) {
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
            DTube.prototype.updatePrevLength = function () {
                var column = this.column0;
                column.prevLength = 0;
                while (column !== this.column1) {
                    column.next.prevLength = column.prevLength + column.length;
                    column = column.next;
                }
            };
            DTube.prototype.cutOff = function () {
                while (this.column1.prevLength > this.length) {
                    this.remove();
                }
                this.column1.length = this.length - this.column1.prevLength;
            };
            DTube.prototype.remove = function () {
                this.column1 = this.column1.prev;
                this.column1.next.destroy();
                this.column1.next = this.column1;
            };
            DTube.prototype.updateNextLength = function () {
                var column = this.column1;
                column.nextLength = 0;
                while (column !== this.column0) {
                    column.prev.nextLength = column.nextLength + column.length;
                    column = column.prev;
                }
            };
            DTube.prototype.reverseCutOff = function () {
                while (this.column0.nextLength > this.length) {
                    this.reverseRemove();
                }
                this.column0.length = this.length - this.column0.nextLength;
            };
            DTube.prototype.reverseRemove = function () {
                this.column0 = this.column0.next;
                this.column0.prev.destroy();
                this.column0.prev = this.column0;
            };
            return DTube;
        }());
        tube.DTube = DTube;
    })(tube = hanyeah.tube || (hanyeah.tube = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/10/31.
 */
var hanyeah;
(function (hanyeah) {
    var tube;
    (function (tube) {
        var DLiquidChemicals = /** @class */ (function (_super) {
            __extends(DLiquidChemicals, _super);
            function DLiquidChemicals(mm, n, T, rho) {
                var _this = _super.call(this, mm, n, T) || this;
                _this._rho = rho;
                _this.type = tube.DChemicals.TYPE_LIQUID;
                _this.updateParam(1);
                return _this;
            }
            Object.defineProperty(DLiquidChemicals.prototype, "rho", {
                set: function (value) {
                    this._rho = value;
                    this.updateParam(2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DLiquidChemicals.prototype, "V", {
                set: function (value) {
                    this._V = value;
                    this.updateM2();
                    this.updateN();
                    this.updateParam(3);
                },
                enumerable: true,
                configurable: true
            });
            DLiquidChemicals.prototype.setAmountV = function (value) {
                this.V = value;
            };
            return DLiquidChemicals;
        }(tube.DChemicals));
        tube.DLiquidChemicals = DLiquidChemicals;
    })(tube = hanyeah.tube || (hanyeah.tube = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/10/31.
 */
var hanyeah;
(function (hanyeah) {
    var tube;
    (function (tube) {
        var DGasChemicals = /** @class */ (function (_super) {
            __extends(DGasChemicals, _super);
            function DGasChemicals(mm, n, T, V) {
                var _this = _super.call(this, mm, n, T) || this;
                _this._V = V;
                _this.type = tube.DChemicals.TYPE_GAS;
                _this.updateParam(1);
                return _this;
            }
            Object.defineProperty(DGasChemicals.prototype, "V", {
                set: function (value) {
                    this._V = value;
                    this.updateParam(2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DGasChemicals.prototype, "rho", {
                set: function (value) {
                    this._rho = value;
                    this.updateM2();
                    this.updateN();
                    this.updateParam(3);
                },
                enumerable: true,
                configurable: true
            });
            DGasChemicals.prototype.setAmountV = function (value) {
                this._V = value;
                this.updateM2();
                this.updateN();
                this.updateParam(3);
            };
            return DGasChemicals;
        }(tube.DChemicals));
        tube.DGasChemicals = DGasChemicals;
    })(tube = hanyeah.tube || (hanyeah.tube = {}));
})(hanyeah || (hanyeah = {}));
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
 * Created by hanyeah on 2019/10/31.
 */
var hanyeah;
(function (hanyeah) {
    var tube;
    (function (tube) {
        var DSolidChemicals = /** @class */ (function (_super) {
            __extends(DSolidChemicals, _super);
            function DSolidChemicals(mm, n, T, rho) {
                var _this = _super.call(this, mm, n, T) || this;
                _this._rho = rho;
                _this.type = tube.DChemicals.TYPE_SOLID;
                _this.updateParam(1);
                return _this;
            }
            Object.defineProperty(DSolidChemicals.prototype, "rho", {
                set: function (value) {
                    this._rho = value;
                    this.updateParam(2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DSolidChemicals.prototype, "V", {
                set: function (value) {
                    this._V = value;
                    this.updateM2();
                    this.updateN();
                    this.updateParam(3);
                },
                enumerable: true,
                configurable: true
            });
            DSolidChemicals.prototype.setAmountV = function (value) {
                this.V = value;
            };
            return DSolidChemicals;
        }(tube.DChemicals));
        tube.DSolidChemicals = DSolidChemicals;
    })(tube = hanyeah.tube || (hanyeah.tube = {}));
})(hanyeah || (hanyeah = {}));
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
                _this.s = tube.DUtils.getS(_this.d / 2);
                _this.h = 100;
                _this.v = _this.s * _this.h;
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
                return v / this.s;
            };
            Bottle.prototype.h2v = function (h) {
                return h * this.s;
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
        var Point = PIXI.Point;
        var DUtils = /** @class */ (function () {
            function DUtils() {
            }
            DUtils.getDir = function (p0, p1) {
                var leng = DUtils.distance(p0, p1);
                if (leng === 0) {
                    throw (new Error("getDir error: leng is zero!"));
                }
                return new Point((p1.x - p0.x) / leng, (p1.y - p0.y) / leng);
            };
            DUtils.pointAt = function (p0, dir, d) {
                return new Point(p0.x + dir.x * d, p0.y + dir.y * d);
            };
            DUtils.distance = function (p0, p1) {
                return DUtils.leng(p0.x - p1.x, p0.y - p1.y);
            };
            DUtils.leng = function (x, y) {
                return Math.sqrt(x * x + y * y);
            };
            DUtils.m2px = function (m) {
                return m * DUtils.PX_PER_M;
            };
            DUtils.px2m = function (px) {
                return px / DUtils.PX_PER_M;
            };
            DUtils.getS = function (r) {
                return Math.PI * r * r;
            };
            DUtils.PX_PER_M = 1000;
            return DUtils;
        }());
        tube.DUtils = DUtils;
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
        var Main = /** @class */ (function () {
            function Main(canvas) {
                console.log("main");
                this.app = new PIXI.Application({ view: canvas, transparent: true, antialias: true });
                this.renderer = this.app.renderer;
                this.stage = this.app.stage;
                this.stage.interactive = true;
                this.ticker = this.app.ticker;
                this.stage.hitArea = new StageHItArea();
            }
            Main.prototype.update = function (dt) {
                //
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
