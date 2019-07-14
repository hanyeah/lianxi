var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Created by hanyeah on 2019/7/11.
 */
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var OpticalWorld = /** @class */ (function () {
            function OpticalWorld() {
            }
            return OpticalWorld;
        }());
        optical.OpticalWorld = OpticalWorld;
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var geom;
        (function (geom) {
            var Geom = /** @class */ (function () {
                function Geom() {
                }
                Geom.getSign = function (value) {
                    return value > 0 ? 1 : value < 0 ? -1 : 0;
                };
                Geom.prototype.clone = function () {
                    return new Geom();
                };
                Geom.prototype.intersectT = function (ray) {
                    return [];
                };
                Geom.prototype.intersect = function (ray) {
                    var tArr = this.intersectT(ray);
                    if (tArr.length) {
                        var t = tArr[0];
                        return this.getIntersectResult(ray, t);
                    }
                    return geom.IntersectResult.noHit;
                };
                Geom.prototype.getNormal = function (p, normalize) {
                    if (normalize === void 0) { normalize = false; }
                    return new geom.Point();
                };
                Geom.prototype.getTbyAbc = function (result, a, b, c) {
                    if (a === 0) {
                        var t = -c / b;
                        if (t > 0) {
                            result.push(t);
                        }
                    }
                    else {
                        var delta = b * b - 4 * a * c;
                        if (delta >= 0) {
                            var a2 = 2 * a;
                            var sqrDelta = Math.sqrt(delta);
                            var t1 = (-b - sqrDelta) / a2;
                            if (t1 > 0) {
                                result.push(t1);
                            }
                            var t2 = (-b + sqrDelta) / a2;
                            if (t2 > 0) {
                                result.push(t2);
                            }
                        }
                    }
                };
                Geom.prototype.containsPoint = function (p) {
                    return -1;
                };
                Geom.prototype.getIntersectResult = function (ray, t) {
                    var result = new geom.IntersectResult();
                    result.geom = this;
                    result.distance = t;
                    result.position = ray.getPoint(result.distance);
                    result.normal = this.getNormal(result.position);
                    result.normal.normalize(ray.dir.dot(result.normal) > 0 ? -1 : 1);
                    return result;
                };
                return Geom;
            }());
            geom.Geom = Geom;
        })(geom = optical.geom || (optical.geom = {}));
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/7/11.
 */
/// <reference path="Geom.ts"/>
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var geom;
        (function (geom) {
            var Circle = /** @class */ (function (_super) {
                __extends(Circle, _super);
                function Circle(cp, r) {
                    var _this = _super.call(this) || this;
                    _this.cp = cp.clone();
                    _this.r = r;
                    return _this;
                }
                Object.defineProperty(Circle.prototype, "r", {
                    get: function () {
                        return this._r;
                    },
                    set: function (value) {
                        this._r = value;
                        this.r2 = value * value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Circle.prototype.clone = function () {
                    return new Circle(this.cp, this.r);
                };
                Circle.prototype.intersectT = function (ray) {
                    var result = [];
                    var v = geom.Point.sub(ray.sp, this.cp);
                    var c = v.sqrLength() - this.r2;
                    var b = 2 * ray.dir.dot(v);
                    this.getTbyAbc(result, 1, b, c);
                    return result;
                };
                Circle.prototype.getNormal = function (p, normalize) {
                    if (normalize === void 0) { normalize = false; }
                    var normal = geom.Point.sub(p, this.cp);
                    if (normalize) {
                        normal.normalize(1);
                    }
                    return normal;
                };
                Circle.prototype.containsPoint = function (p) {
                    return geom.Geom.getSign(this.r * this.r - geom.Point.sqrDistance(p, this.cp));
                };
                return Circle;
            }(geom.Geom));
            geom.Circle = Circle;
        })(geom = optical.geom || (optical.geom = {}));
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var geom;
        (function (geom) {
            /**
             * 椭圆
             */
            var Ellipse = /** @class */ (function (_super) {
                __extends(Ellipse, _super);
                function Ellipse(a, b) {
                    var _this = _super.call(this) || this;
                    _this.setAB(a, b);
                    return _this;
                }
                Ellipse.prototype.getC = function () {
                    return this.c;
                };
                Ellipse.prototype.clone = function () {
                    return new Ellipse(this.a, this.b);
                };
                Ellipse.prototype.setAB = function (a, b) {
                    this.a = Math.abs(a);
                    this.b = Math.abs(b);
                    this.calcC();
                };
                Ellipse.prototype.calcC = function () {
                    this.c = Math.sqrt(this.a * this.a - this.b * this.b);
                };
                Ellipse.prototype.intersectT = function (ray) {
                    var result = [];
                    var ta2 = this.a * this.a;
                    var tb2 = this.b * this.b;
                    var a = ray.dir.x * ray.dir.x * tb2 + ray.dir.y * ray.dir.y * ta2;
                    var b = 2 * (ray.sp.x * ray.dir.x * tb2 + ray.sp.y * ray.dir.y * ta2);
                    var c = ray.sp.x * ray.sp.x * tb2 + ray.sp.y * ray.sp.y * ta2 - ta2 * tb2;
                    this.getTbyAbc(result, a, b, c);
                    return result;
                };
                Ellipse.prototype.getNormal = function (p, normalize) {
                    if (normalize === void 0) { normalize = false; }
                    var normal;
                    if (this.c === 0) {
                        normal = p.clone();
                    }
                    else {
                        var pc1 = geom.Point.sub(p, new geom.Point(-this.c, 0));
                        var pc2 = geom.Point.sub(p, new geom.Point(this.c, 0));
                        pc1.normalize(1);
                        pc2.normalize(1);
                        normal = geom.Point.add(pc1, pc2);
                    }
                    if (normalize) {
                        normal.normalize(1);
                    }
                    return normal;
                };
                Ellipse.prototype.containsPoint = function (p) {
                    return geom.Geom.getSign(2 * this.a - (geom.Point.distance(p, new geom.Point(this.c, 0)) + geom.Point.distance(p, new geom.Point(-this.c, 0))));
                };
                return Ellipse;
            }(geom.Geom));
            geom.Ellipse = Ellipse;
        })(geom = optical.geom || (optical.geom = {}));
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/7/12.
 */
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var geom;
        (function (geom) {
            /**
             * 双曲线。
             * x^2 / a^2 - y^2 / b^2 = 1
             */
            var Hyperbola = /** @class */ (function (_super) {
                __extends(Hyperbola, _super);
                function Hyperbola(a, b) {
                    var _this = _super.call(this) || this;
                    _this.setAB(a, b);
                    return _this;
                }
                Hyperbola.prototype.getC = function () {
                    return this.c;
                };
                Hyperbola.prototype.clone = function () {
                    return new Hyperbola(this.a, this.b);
                };
                Hyperbola.prototype.setAB = function (a, b) {
                    this.a = Math.abs(a);
                    this.b = Math.abs(b);
                    this.calcC();
                };
                Hyperbola.prototype.calcC = function () {
                    this.c = Math.sqrt(this.a * this.a + this.b * this.b);
                };
                Hyperbola.prototype.intersectT = function (ray) {
                    var result = [];
                    var a2 = this.a * this.a;
                    var b2 = this.b * this.b;
                    var pab = new geom.Point(this.a, this.b);
                    var a = ray.dir.dot(pab) * ray.dir.cross(pab);
                    var b = 2 * (ray.sp.x * ray.dir.x * b2 - ray.sp.y * ray.dir.y * a2);
                    var c = ray.sp.dot(pab) * ray.sp.cross(pab);
                    this.getTbyAbc(result, a, b, c);
                    return result;
                };
                Hyperbola.prototype.getNormal = function (p, normalize) {
                    if (normalize === void 0) { normalize = false; }
                    var pc = geom.Point.sub(p, new geom.Point(this.c, 0));
                    pc.normalize(1);
                    var normal = new geom.Point(pc.x - this.c, pc.y);
                    if (normalize) {
                        normal.normalize(1);
                    }
                    return normal;
                };
                Hyperbola.prototype.containsPoint = function (p) {
                    return geom.Geom.getSign(geom.Point.distance(p, new geom.Point(-this.c, 0)) - geom.Point.distance(p, new geom.Point(this.c, 0)) - 2 * this.a);
                };
                return Hyperbola;
            }(geom.Geom));
            geom.Hyperbola = Hyperbola;
        })(geom = optical.geom || (optical.geom = {}));
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/7/11.
 */
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var geom;
        (function (geom) {
            var IntersectResult = /** @class */ (function () {
                function IntersectResult() {
                }
                IntersectResult.noHit = new IntersectResult();
                return IntersectResult;
            }());
            geom.IntersectResult = IntersectResult;
        })(geom = optical.geom || (optical.geom = {}));
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var geom;
        (function (geom) {
            var Line = /** @class */ (function (_super) {
                __extends(Line, _super);
                function Line(x0) {
                    var _this = _super.call(this) || this;
                    _this.x0 = x0;
                    return _this;
                }
                Line.prototype.clone = function () {
                    return new Line(this.x0);
                };
                Line.prototype.intersectT = function (ray) {
                    var result = [];
                    if (ray.dir.x !== 0) {
                        var t = (this.x0 - ray.sp.x) / ray.dir.x;
                        if (t > 0) {
                            result.push(t);
                        }
                    }
                    return result;
                };
                Line.prototype.getNormal = function (p, normalize) {
                    if (normalize === void 0) { normalize = false; }
                    return new geom.Point(-1, 0);
                };
                Line.prototype.containsPoint = function (p) {
                    return geom.Geom.getSign(p.x - this.x0);
                };
                return Line;
            }(geom.Geom));
            geom.Line = Line;
        })(geom = optical.geom || (optical.geom = {}));
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/7/11.
 */
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var geom;
        (function (geom) {
            var Line2 = /** @class */ (function (_super) {
                __extends(Line2, _super);
                function Line2(p1, p2) {
                    var _this = _super.call(this) || this;
                    _this.p1 = p1.clone();
                    _this.p2 = p2.clone();
                    return _this;
                }
                Line2.prototype.clone = function () {
                    return new Line2(this.p1, this.p2);
                };
                Line2.prototype.intersectT = function (ray) {
                    var result = [];
                    var b = geom.Point.sub(this.p2, this.p1);
                    var db = ray.dir.cross(b);
                    if (db !== 0) {
                        var a = geom.Point.sub(ray.sp, this.p1);
                        var ab = a.cross(b);
                        var t = ab / db;
                        if (t > 0) {
                            result.push(t);
                        }
                    }
                    return result;
                };
                Line2.prototype.getNormal = function (p, normalize) {
                    if (normalize === void 0) { normalize = false; }
                    var b = geom.Point.sub(this.p2, this.p1);
                    var normal = geom.Point.rotNeg90(b);
                    if (normalize) {
                        normal.normalize(1);
                    }
                    return normal;
                };
                return Line2;
            }(geom.Geom));
            geom.Line2 = Line2;
        })(geom = optical.geom || (optical.geom = {}));
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var geom;
        (function (geom) {
            var Parabola = /** @class */ (function (_super) {
                __extends(Parabola, _super);
                function Parabola(p) {
                    var _this = _super.call(this) || this;
                    _this.p = p;
                    return _this;
                }
                Parabola.prototype.clone = function () {
                    return new Parabola(this.p);
                };
                Parabola.prototype.intersectT = function (ray) {
                    var result = [];
                    var a = ray.dir.y * ray.dir.y;
                    var b = 2 * (ray.sp.y * ray.dir.y - this.p * ray.dir.x);
                    var c = ray.sp.y * ray.sp.y - 2 * this.p * ray.sp.x;
                    var arr = [];
                    this.getTbyAbc(arr, a, b, c);
                    arr.forEach(function (t) {
                        if (ray.sp.x + ray.dir.x * t > 0) {
                            result.push(t);
                        }
                    });
                    return result;
                };
                Parabola.prototype.getNormal = function (p, normalize) {
                    if (normalize === void 0) { normalize = false; }
                    var normal = new geom.Point(-1, p.y / this.p);
                    if (normalize) {
                        normal.normalize(1);
                    }
                    return normal;
                };
                Parabola.prototype.containsPoint = function (p) {
                    return geom.Geom.getSign(p.x + this.p / 2 - geom.Point.distance(p, new geom.Point(this.p / 2, 0)));
                };
                return Parabola;
            }(geom.Geom));
            geom.Parabola = Parabola;
        })(geom = optical.geom || (optical.geom = {}));
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/7/11.
 */
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var geom;
        (function (geom) {
            var Point = /** @class */ (function () {
                function Point(x, y) {
                    if (x === void 0) { x = 0.0; }
                    if (y === void 0) { y = 0.0; }
                    this.x = x;
                    this.y = y;
                }
                Point.add = function (p1, p2) {
                    return new Point(p1.x + p2.x, p1.y + p2.y);
                };
                Point.sub = function (p1, p2) {
                    return new Point(p1.x - p2.x, p1.y - p2.y);
                };
                Point.dot = function (p1, p2) {
                    return p1.x * p2.x + p1.y * p2.y;
                };
                Point.cross = function (p1, p2) {
                    return p1.x * p2.y - p1.y * p2.x;
                };
                Point.rot90 = function (p) {
                    return new Point(+p.y, -p.x);
                };
                Point.rotNeg90 = function (p) {
                    return new Point(-p.y, +p.x);
                };
                Point.interpolate = function (p1, p2, f) {
                    return new Point(p1.x + (p2.x - p1.x) * f, p1.y + (p2.y - p1.y) * f);
                };
                Point.getFactor = function (p1, p2, p) {
                    if (p1.x !== p2.x) {
                        return (p.x - p1.x) / (p2.x - p1.x);
                    }
                    if (p1.y !== p2.y) {
                        return (p.y - p1.y) / (p2.y - p1.y);
                    }
                    return NaN;
                };
                Point.distance = function (p1, p2) {
                    return Point.sub(p2, p1).length();
                };
                Point.sqrDistance = function (p1, p2) {
                    return Point.sub(p2, p1).sqrLength();
                };
                Point.prototype.clone = function () {
                    return new Point(this.x, this.y);
                };
                Point.prototype.length = function () {
                    return Math.sqrt(this.x * this.x + this.y * this.y);
                };
                Point.prototype.sqrLength = function () {
                    return this.x * this.x + this.y * this.y;
                };
                Point.prototype.normalize = function (value) {
                    if (value === void 0) { value = 1; }
                    var inv = value / this.length();
                    this.x *= inv;
                    this.y *= inv;
                };
                Point.prototype.negate = function () {
                    this.x = -this.x;
                    this.y = -this.y;
                };
                Point.prototype.multiplay = function (f) {
                    this.x *= f;
                    this.y *= f;
                };
                Point.prototype.divide = function (f) {
                    this.x /= f;
                    this.y /= f;
                };
                Point.prototype.add = function (p) {
                    this.x += p.x;
                    this.y += p.y;
                };
                Point.prototype.sub = function (p) {
                    this.x -= p.x;
                    this.y -= p.y;
                };
                Point.prototype.rot90 = function () {
                    var t = this.y;
                    this.y = -this.x;
                    this.y = t;
                };
                Point.prototype.rotNeg90 = function () {
                    var t = this.x;
                    this.x = -this.y;
                    this.y = t;
                };
                Point.prototype.dot = function (p) {
                    return this.x * p.x + this.y * p.y;
                };
                Point.prototype.cross = function (p) {
                    return this.x * p.y - this.y * p.x;
                };
                Point.prototype.setXY = function (x, y) {
                    this.x = x;
                    this.y = y;
                };
                return Point;
            }());
            geom.Point = Point;
        })(geom = optical.geom || (optical.geom = {}));
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/7/11.
 */
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var geom;
        (function (geom) {
            var Ray = /** @class */ (function (_super) {
                __extends(Ray, _super);
                function Ray(sp, dir) {
                    var _this = _super.call(this) || this;
                    _this.sp = sp.clone();
                    _this.dir = dir;
                    return _this;
                }
                Object.defineProperty(Ray.prototype, "dir", {
                    get: function () {
                        return this._dir;
                    },
                    set: function (value) {
                        this._dir = value.clone();
                        this._dir.normalize();
                    },
                    enumerable: true,
                    configurable: true
                });
                Ray.prototype.clone = function () {
                    return new Ray(this.sp, this.dir);
                };
                Ray.prototype.getPoint = function (t) {
                    return new geom.Point(this.sp.x + t * this._dir.x, this.sp.y + t * this._dir.y);
                };
                Ray.prototype.intersectT = function (ray) {
                    var result = [];
                    var d12 = this.dir.cross(ray.dir);
                    if (d12 !== 0) {
                        var o = geom.Point.sub(ray.sp, this.sp);
                        var dco = this.dir.cross(o);
                        var t = dco / d12;
                        if (t > 0) {
                            result.push(t);
                        }
                    }
                    return result;
                };
                Ray.prototype.getNormal = function (p, normalize) {
                    if (normalize === void 0) { normalize = false; }
                    var normal = geom.Point.rotNeg90(this.dir);
                    if (normalize) {
                        normal.normalize(1);
                    }
                    return normal;
                };
                return Ray;
            }(geom.Geom));
            geom.Ray = Ray;
        })(geom = optical.geom || (optical.geom = {}));
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/7/11.
 */
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var geom;
        (function (geom) {
            var Segment = /** @class */ (function (_super) {
                __extends(Segment, _super);
                function Segment(p1, p2) {
                    var _this = _super.call(this) || this;
                    _this.p1 = p1.clone();
                    _this.p2 = p2.clone();
                    return _this;
                }
                Segment.prototype.clone = function () {
                    return new Segment(this.p1, this.p2);
                };
                Segment.prototype.intersectT = function (ray) {
                    var result = [];
                    var b = geom.Point.sub(this.p2, this.p1);
                    var db = ray.dir.cross(b);
                    if (db !== 0) {
                        var a = geom.Point.sub(ray.sp, this.p1);
                        var ab = a.cross(b);
                        var t = ab / db;
                        if (t > 0) {
                            var position = ray.getPoint(t);
                            var f = geom.Point.getFactor(this.p1, this.p2, position);
                            if (f >= 0 && f <= 1) {
                                result.push(t);
                            }
                        }
                    }
                    return result;
                };
                Segment.prototype.getNormal = function (p, normalize) {
                    if (normalize === void 0) { normalize = false; }
                    var b = geom.Point.sub(this.p2, this.p1);
                    var normal = geom.Point.rotNeg90(b);
                    if (normalize) {
                        normal.normalize(1);
                    }
                    return normal;
                };
                return Segment;
            }(geom.Geom));
            geom.Segment = Segment;
        })(geom = optical.geom || (optical.geom = {}));
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
