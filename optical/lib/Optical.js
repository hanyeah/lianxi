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
 * Created by hanyeah on 2019/8/12.
 */
var hanyeah;
(function (hanyeah) {
    var electricity;
    (function (electricity) {
        var HObject = /** @class */ (function () {
            function HObject() {
                this.UID = HObject.TIME + (HObject.COUNTING++);
            }
            HObject.prototype.destroy = function () {
                //
            };
            HObject.COUNTING = 1;
            HObject.TIME = 0; // new Date().getTime();
            return HObject;
        }());
        electricity.HObject = HObject;
    })(electricity = hanyeah.electricity || (hanyeah.electricity = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/7/29.
 */
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var geom;
        (function (geom) {
            var HObject = hanyeah.electricity.HObject;
            var Space = /** @class */ (function (_super) {
                __extends(Space, _super);
                function Space() {
                    var _this = _super.call(this) || this;
                    _this.x = 0;
                    _this.y = 0;
                    _this.rotation = 0;
                    _this.matrix = new geom.Matrix();
                    _this.invMatrix = new geom.Matrix();
                    _this.gMatrix = new geom.Matrix();
                    _this.gInvMatrix = new geom.Matrix();
                    return _this;
                }
                Space.prototype.destroy = function () {
                };
                Space.prototype.clone = function () {
                    return new Space();
                };
                Space.prototype.globalToLocal = function (p) {
                    return this.gInvMatrix.transformPoint(p);
                };
                Space.prototype.deltaGlobalToLocal = function (p) {
                    return this.gInvMatrix.deltaTransformPoint(p);
                };
                Space.prototype.globalRayToLocalRay = function (ray) {
                    var result = ray.clone();
                    result.sp = this.globalToLocal(result.sp);
                    result.dir = this.deltaGlobalToLocal(result.dir);
                    return result;
                };
                Space.prototype.globalToLocal2 = function (p, lp) {
                    this.gInvMatrix.transformPoint2(p, lp);
                };
                Space.prototype.deltaGlobalToLocal2 = function (p, lp) {
                    this.gInvMatrix.deltaTransformPoint2(p, lp);
                };
                Space.prototype.globalRayToLocalRay2 = function (ray, localRay) {
                    this.gInvMatrix.transformPoint2(ray.sp, localRay.sp);
                    this.gInvMatrix.deltaTransformPoint2(ray.dir, localRay.dir);
                };
                Space.prototype.localToGlobal = function (p) {
                    return this.gMatrix.transformPoint(p);
                };
                Space.prototype.deltaLocalToGlobal = function (p) {
                    return this.gMatrix.deltaTransformPoint(p);
                };
                Space.prototype.localRayToGlobal = function (ray) {
                    var result = ray.clone();
                    result.sp = this.localToGlobal(result.sp);
                    result.dir = this.deltaLocalToGlobal(result.dir);
                    return result;
                };
                Space.prototype.setPosition = function (x, y) {
                    this.x = x;
                    this.y = y;
                };
                Space.prototype.updateTransform = function (gMatrix) {
                    if (gMatrix === void 0) { gMatrix = null; }
                    this.matrix.createBox(1, 1, this.rotation, this.x, this.y);
                    this.invMatrix.createBox(1, 1, -this.rotation, -this.x, -this.y);
                    this.gMatrix = this.matrix.clone();
                    if (gMatrix) {
                        this.gMatrix.concat(gMatrix);
                    }
                    this.gInvMatrix = this.gMatrix.clone();
                    this.gInvMatrix.invert();
                };
                return Space;
            }(HObject));
            geom.Space = Space;
        })(geom = optical.geom || (optical.geom = {}));
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var geom;
        (function (geom_1) {
            /**
             * 几何图形基类。
             */
            var Geom = /** @class */ (function (_super) {
                __extends(Geom, _super);
                function Geom() {
                    var _this = _super.call(this) || this;
                    _this.localRayMap = {};
                    return _this;
                }
                /**
                 * 求一元二次方程的根。
                 * @param result
                 * @param a
                 * @param b
                 * @param c
                 */
                Geom.getTbyAbc = function (result, a, b, c) {
                    var n = 0;
                    var t;
                    if (a === 0) {
                        t = -c / b;
                        if (t > 0) {
                            result[n] = t;
                            n++;
                            // result.push(t);
                        }
                    }
                    else {
                        var delta = b * b - 4 * a * c;
                        if (delta >= 0) {
                            a = 1 / (2 * a);
                            var sqrDelta = Math.sqrt(delta);
                            var sa = sqrDelta * a;
                            var ba = -b * a;
                            t = ba - sa; // (-b - sqrDelta) * a;
                            if (t > 0) {
                                result[n] = t;
                                n++;
                                // result.push(t);
                            }
                            t = ba + sa; // (-b + sqrDelta) * a;
                            if (t > 0) {
                                result[n] = t;
                                n++;
                                // result.push(t);
                            }
                        }
                    }
                };
                Geom.getSign = function (value) {
                    return value > 0 ? 1 : value < 0 ? -1 : 0;
                };
                Geom.In = function (geom, p) {
                    return geom.containsPoint(p) === 1;
                };
                Geom.Out = function (geom, p) {
                    return geom.containsPoint(p) === -1;
                };
                Geom.NotIn = function (geom, p) {
                    return geom.containsPoint(p) !== 1;
                };
                Geom.NotOut = function (geom, p) {
                    return geom.containsPoint(p) !== -1;
                };
                Geom.On = function (geom, p) {
                    return geom.containsPoint(p) === 0;
                };
                Geom.prototype.destroy = function () {
                    _super.prototype.destroy.call(this);
                    this.localRayMap = null;
                };
                /**
                 * 克隆。
                 * @returns {Geom}
                 */
                Geom.prototype.clone = function () {
                    return new Geom();
                };
                /**
                 * 计算和射线相交的所有点的t值，射线的表达式为r(t) = o + t*d，t>=0。
                 * @param ray
                 * @returns {Array}
                 */
                Geom.prototype.intersectT = function (ray) {
                    return [];
                };
                /**
                 *  封装的intersectT。
                 * @param ray
                 */
                Geom.prototype.intersectSimpleResult = function (ray) {
                    var _this = this;
                    var tArr = this.intersectT(ray);
                    var result = [];
                    tArr.forEach(function (t) {
                        result.push(new geom_1.SimpleIntersectResult(t, _this));
                    });
                    return result;
                };
                Geom.prototype.intersectSimpleResult2 = function (ray, arr) {
                    var _this = this;
                    var tArr = this.intersectT(ray);
                    tArr.forEach(function (t) {
                        arr.push(new geom_1.SimpleIntersectResult(t, _this));
                    });
                };
                /**
                 * 计算与射线相交的最近的点。
                 * @param ray
                 * @returns {IntersectResult}
                 */
                Geom.prototype.intersect = function (ray) {
                    var tArr = this.intersectT(ray);
                    if (tArr.length) {
                        var t = tArr[0];
                        return this.getIntersectResult(ray, t);
                    }
                    return geom_1.IntersectResult.noHit;
                };
                /**
                 * 计算所有与射线交互的点。
                 * @param ray
                 */
                Geom.prototype.intersects = function (ray) {
                    var _this = this;
                    var tArr = this.intersectT(ray);
                    var result = [];
                    tArr.forEach(function (t) {
                        result.push(_this.getIntersectResult(ray, t));
                    });
                    return result;
                };
                /**
                 * 获取法线
                 * @param p 图形上的点
                 * @param normalize 是否归一化，默认不归一化。
                 * @returns {Point} 法线
                 */
                Geom.prototype.getNormal = function (p, normalize) {
                    if (normalize === void 0) { normalize = false; }
                    return new geom_1.Point();
                };
                /**
                 * 点与图形的关系
                 * @param p
                 * @returns {number} 1：点在图形内，0：点在图形上，-1：点在图形外。
                 */
                Geom.prototype.containsPoint = function (p) {
                    return -1;
                };
                /**
                 * 封装与射线相交的结果。
                 * @param ray
                 * @param t
                 * @returns {IntersectResult}
                 */
                Geom.prototype.getIntersectResult = function (ray, t) {
                    var result = new geom_1.IntersectResult();
                    result.geom = this;
                    result.distance = t;
                    result.position = ray.getPoint(result.distance);
                    result.normal = this.getNormal(result.position);
                    result.normal.normalize(ray.dir.dot(result.normal) > 0 ? -1 : 1);
                    return result;
                };
                /**
                 * 封装与射线相交的结果，转换到全局坐标。
                 * @param ray
                 * @param lacalRay
                 * @param t
                 * @returns {IntersectResult}
                 */
                Geom.prototype.getGlobalIntersectResult = function (ray, lacalRay, t) {
                    var result = new geom_1.IntersectResult();
                    result.geom = this;
                    result.distance = t;
                    result.position = ray.getPoint(result.distance);
                    var normal = this.getNormal(lacalRay.getPoint(result.distance));
                    normal.normalize(lacalRay.dir.dot(normal) > 0 ? -1 : 1);
                    result.normal = this.deltaLocalToGlobal(normal);
                    return result;
                };
                Geom.prototype.getGlobalIntersectResult2 = function (ray, lacalRay, t, result) {
                    result.geom = this;
                    result.distance = t;
                    result.position = ray.getPoint(result.distance);
                    var normal = this.getNormal(lacalRay.getPoint(result.distance));
                    normal.normalize(lacalRay.dir.dot(normal) > 0 ? -1 : 1);
                    result.normal = this.deltaLocalToGlobal(normal);
                };
                Geom.prototype.updateLocalRay = function (ray) {
                    if (!this.localRayMap[ray.UID]) {
                        this.localRayMap[ray.UID] = new geom_1.Ray();
                    }
                    this.globalRayToLocalRay2(ray, this.localRayMap[ray.UID]);
                };
                Geom.prototype.getLocalRay = function (ray) {
                    return this.localRayMap[ray.UID];
                };
                Geom.prototype.removeLocalRay = function (ray) {
                    delete this.localRayMap[ray.UID];
                };
                return Geom;
            }(geom_1.Space));
            geom_1.Geom = Geom;
        })(geom = optical.geom || (optical.geom = {}));
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/7/31.
 */
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var geom;
        (function (geom_2) {
            var Shape = /** @class */ (function (_super) {
                __extends(Shape, _super);
                function Shape() {
                    var _this = _super.call(this) || this;
                    _this.geoms = [];
                    return _this;
                }
                Shape.prototype.destroy = function () {
                    _super.prototype.destroy.call(this);
                };
                Shape.prototype.addGeom = function (geom) {
                    if (this.geoms.indexOf(geom) === -1) {
                        this.geoms.push(geom);
                    }
                };
                Shape.prototype.removeGeom = function (geom) {
                    var ind = this.geoms.indexOf(geom);
                    if (ind !== -1) {
                        this.geoms.splice(ind, 1);
                    }
                };
                Shape.prototype.removeAllGeoms = function () {
                    this.geoms.length = 0;
                };
                Shape.prototype.intersect = function (ray) {
                    var result = geom_2.IntersectResult.noHit;
                    this.geoms.forEach(function (geom) {
                        var r0 = geom.intersect(ray);
                        if (r0.distance < result.distance) {
                            result = r0;
                        }
                    });
                    return result;
                };
                Shape.prototype.intersect2 = function (ray, result) {
                    var len = this.geoms.length;
                    var geom;
                    var tArr = [];
                    for (var i = 0; i < len; i++) {
                        geom = this.geoms[i];
                        tArr = geom.intersectT(ray);
                        for (var j = 0; j < tArr.length; j++) {
                            if (tArr[i] < result.t) {
                                result.t = tArr[i];
                                result.geom = geom;
                                result.shape = this;
                            }
                        }
                    }
                };
                Shape.prototype.updateTransform = function (gMatrix) {
                    if (gMatrix === void 0) { gMatrix = null; }
                    _super.prototype.updateTransform.call(this, gMatrix);
                    var len = this.geoms.length;
                    for (var i = 0; i < len; i++) {
                        this.geoms[i].updateTransform(this.gMatrix);
                    }
                };
                Shape.prototype.updateLocalRay = function (ray) {
                    var len = this.geoms.length;
                    for (var i = 0; i < len; i++) {
                        this.geoms[i].updateLocalRay(ray);
                    }
                };
                Shape.prototype.removeLocalRay = function (ray) {
                    var len = this.geoms.length;
                    for (var i = 0; i < len; i++) {
                        this.geoms[i].removeLocalRay(ray);
                    }
                };
                return Shape;
            }(geom_2.Space));
            geom_2.Shape = Shape;
        })(geom = optical.geom || (optical.geom = {}));
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/7/15.
 */
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var geom;
        (function (geom) {
            var Circle = /** @class */ (function (_super) {
                __extends(Circle, _super);
                function Circle(r) {
                    var _this = _super.call(this) || this;
                    _this.r = r;
                    return _this;
                }
                Object.defineProperty(Circle.prototype, "r", {
                    get: function () {
                        return this._r;
                    },
                    set: function (v) {
                        this._r = v;
                        this._r2 = v * v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Circle.prototype, "r2", {
                    get: function () {
                        return this._r2;
                    },
                    enumerable: true,
                    configurable: true
                });
                Circle.prototype.clone = function () {
                    return new Circle(this.r);
                };
                Circle.prototype.intersectT = function (ray) {
                    var result = [];
                    var c = ray.sp.sqrLength() - this.r2;
                    var b = 2 * ray.dir.dot(ray.sp);
                    geom.Geom.getTbyAbc(result, 1, b, c);
                    return result;
                };
                Circle.prototype.getNormal = function (p, normalize) {
                    if (normalize === void 0) { normalize = false; }
                    var normal = p.clone();
                    if (normalize) {
                        normal.normalize(1);
                    }
                    return normal;
                };
                Circle.prototype.containsPoint = function (p) {
                    return geom.Geom.getSign(this.r2 - p.sqrLength());
                };
                return Circle;
            }(geom.Geom));
            geom.Circle = Circle;
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
                    this.distance = Infinity;
                }
                IntersectResult.noHit = new IntersectResult();
                return IntersectResult;
            }());
            geom.IntersectResult = IntersectResult;
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
            var HObject = hanyeah.electricity.HObject;
            var Ray = /** @class */ (function (_super) {
                __extends(Ray, _super);
                function Ray(sp, dir) {
                    if (sp === void 0) { sp = null; }
                    if (dir === void 0) { dir = null; }
                    var _this = _super.call(this) || this;
                    _this.sp = sp ? sp.clone() : new geom.Point(0, 0);
                    _this.dir = dir ? dir.clone() : new geom.Point(1, 0);
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
                Ray.prototype.getPoint2 = function (t, p) {
                    p.x = this.sp.x + t * this._dir.x;
                    p.y = this.sp.y + t * this._dir.y;
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
            }(HObject));
            geom.Ray = Ray;
        })(geom = optical.geom || (optical.geom = {}));
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/8/2.
 */
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var geom;
        (function (geom_3) {
            var SimpleIntersectResult = /** @class */ (function () {
                function SimpleIntersectResult(t, geom, shape, localRay) {
                    if (t === void 0) { t = Infinity; }
                    if (geom === void 0) { geom = void 0; }
                    if (shape === void 0) { shape = void 0; }
                    if (localRay === void 0) { localRay = void 0; }
                    this.t = t;
                    this.geom = geom;
                    this.shape = shape;
                    this.localRay = localRay;
                }
                return SimpleIntersectResult;
            }());
            geom_3.SimpleIntersectResult = SimpleIntersectResult;
        })(geom = optical.geom || (optical.geom = {}));
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/7/15.
 */
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var lens;
        (function (lens) {
            var Shape = hanyeah.optical.geom.Shape;
            var Lens = /** @class */ (function (_super) {
                __extends(Lens, _super);
                function Lens() {
                    var _this = _super.call(this) || this;
                    _this.f = 100;
                    _this.n = 1.5;
                    return _this;
                }
                return Lens;
            }(Shape));
            lens.Lens = Lens;
        })(lens = optical.lens || (optical.lens = {}));
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/7/15.
 * 凸凸透镜
 */
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var lens;
        (function (lens) {
            var Circle = hanyeah.optical.geom.Circle;
            var IntersectResult = hanyeah.optical.geom.IntersectResult;
            var Geom = hanyeah.optical.geom.Geom;
            var Point = hanyeah.optical.geom.Point;
            var VVLens = /** @class */ (function (_super) {
                __extends(VVLens, _super);
                function VVLens() {
                    var _this = _super.call(this) || this;
                    _this.result = new IntersectResult();
                    _this.tArr1 = [];
                    _this.tArr2 = [];
                    _this.p = new Point(0, 0);
                    _this.circleL = new Circle(30);
                    _this.circleR = new Circle(30);
                    _this.circleL.x = -5;
                    _this.circleR.x = 5;
                    _this.addGeom(_this.circleL);
                    _this.addGeom(_this.circleR);
                    return _this;
                }
                VVLens.prototype.update = function () {
                    var r = 2.0 * (this.n - 1.0) * this.f;
                    this.circleL.r = r;
                    this.circleR.r = r;
                };
                VVLens.prototype.intersect = function (ray) {
                    this.result.distance = Infinity;
                    var rayL = this.circleL.getLocalRay(ray);
                    var rayR = this.circleR.getLocalRay(ray);
                    this.tArr1 = this.circleL.intersectT(rayL);
                    this.tArr2 = this.circleR.intersectT(rayR);
                    var i = 0, j = 0, len1 = this.tArr1.length, len2 = this.tArr2.length;
                    var len = len1 + len2;
                    var n = 0;
                    var t = 0, type = 0;
                    while (n < len) {
                        if (i >= len1) {
                            type = 2;
                        }
                        else if (j >= len2) {
                            type = 1;
                        }
                        else {
                            if (this.tArr1[i] < this.tArr2[j]) {
                                type = 1;
                            }
                            else {
                                type = 2;
                            }
                        }
                        if (type === 1) {
                            t = this.tArr1[i];
                            i++;
                            rayR.getPoint2(t, this.p);
                            if (Geom.In(this.circleR, this.p)) {
                                this.circleL.getGlobalIntersectResult2(ray, rayL, t, this.result);
                                break;
                            }
                        }
                        else {
                            t = this.tArr2[j];
                            j++;
                            rayL.getPoint2(t, this.p);
                            if (Geom.In(this.circleL, this.p)) {
                                this.circleR.getGlobalIntersectResult2(ray, rayR, t, this.result);
                                break;
                            }
                        }
                        n++;
                    }
                    return this.result;
                };
                VVLens.prototype.intersect2 = function (ray, result) {
                    var rayL = this.circleL.getLocalRay(ray);
                    var rayR = this.circleR.getLocalRay(ray);
                    this.tArr1 = this.circleL.intersectT(rayL);
                    this.tArr2 = this.circleR.intersectT(rayR);
                    var i = 0, j = 0, len1 = this.tArr1.length, len2 = this.tArr2.length;
                    var len = len1 + len2;
                    var n = 0;
                    var t = 0, type = 0;
                    while (n < len) {
                        if (i >= len1) {
                            type = 2;
                        }
                        else if (j >= len2) {
                            type = 1;
                        }
                        else {
                            if (this.tArr1[i] < this.tArr2[j]) {
                                type = 1;
                            }
                            else {
                                type = 2;
                            }
                        }
                        if (type === 1) {
                            t = this.tArr1[i];
                            i++;
                            if (t < result.t) {
                                rayR.getPoint2(t, this.p);
                                if (Geom.In(this.circleR, this.p)) {
                                    result.t = t;
                                    result.geom = this.circleL;
                                    result.shape = this;
                                    result.localRay = rayL;
                                    break;
                                }
                            }
                        }
                        else {
                            t = this.tArr2[j];
                            j++;
                            if (t < result.t) {
                                rayL.getPoint2(t, this.p);
                                if (Geom.In(this.circleL, this.p)) {
                                    result.t = t;
                                    result.geom = this.circleR;
                                    result.shape = this;
                                    result.localRay = rayR;
                                    break;
                                }
                            }
                        }
                        n++;
                    }
                };
                VVLens.prototype.intersect0 = function (ray) {
                    var arr = [];
                    var result = IntersectResult.noHit;
                    var rayL = this.circleL.getLocalRay(ray);
                    var rayR = this.circleR.getLocalRay(ray);
                    this.circleL.intersectSimpleResult2(rayL, arr);
                    this.circleR.intersectSimpleResult2(rayR, arr);
                    var len = arr.length;
                    // 插入排序
                    var temp;
                    for (var i = 1; i < len; i++) {
                        var j = i;
                        temp = arr[i];
                        while (j > 0 && arr[j].t < arr[j - 1].t) {
                            arr[j] = arr[j - 1];
                            j--;
                        }
                        arr[j] = temp;
                    }
                    var r;
                    for (var i = 0; i < len; i++) {
                        r = arr[i];
                        if (r.geom === this.circleL && Geom.In(this.circleR, rayR.getPoint(r.t))) {
                            result = this.circleR.getGlobalIntersectResult(ray, rayL, r.t);
                            break;
                        }
                        else if (r.geom === this.circleR && Geom.In(this.circleL, rayL.getPoint(r.t))) {
                            result = this.circleL.getGlobalIntersectResult(ray, rayR, r.t);
                            break;
                        }
                    }
                    return result;
                };
                return VVLens;
            }(lens.Lens));
            lens.VVLens = VVLens;
        })(lens = optical.lens || (optical.lens = {}));
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/7/17.
 */
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var Ray = hanyeah.optical.geom.Ray;
        var Point = hanyeah.optical.geom.Point;
        var IntersectResult = hanyeah.optical.geom.IntersectResult;
        var VVLens = hanyeah.optical.lens.VVLens;
        var Example01 = /** @class */ (function () {
            function Example01(ctx) {
                this.mouseP = new Point();
                this.world = new optical.OpticalWorld();
                this.mouseMoved = true;
                this.ctx = ctx;
                for (var i = 0; i < 100; i++) {
                    var ang = Math.PI * i / 50;
                    var ray = new Ray(new Point(400 + 200 * Math.cos(ang), 300 + 200 * Math.sin(ang)), new Point(100, 100));
                    this.world.addRay(ray);
                }
                for (var i = 0; i < 100; i++) {
                    var ang = Math.PI * i / 50;
                    var vvlens = new VVLens();
                    vvlens.setPosition(400 + 100 * Math.cos(ang), 300 + 100 * Math.sin(ang));
                    vvlens.updateTransform();
                    this.world.addShape(vvlens);
                }
                setInterval(this.loop.bind(this));
                ctx.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
            }
            Example01.prototype.onMouseMove = function (e) {
                var _this = this;
                this.mouseP.x = e.clientX;
                this.mouseP.y = e.clientY;
                this.world.rays.forEach(function (ray) {
                    ray.dir.setXY(_this.mouseP.x - ray.sp.x, _this.mouseP.y - ray.sp.y);
                    ray.dir.normalize(1);
                });
                this.mouseMoved = true;
            };
            Example01.prototype.loop = function () {
                var ctx = this.ctx;
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.canvas.style.backgroundColor = "#cccccc";
                // const result: IntersectResult = this.circle.intersect(this.ray);
                // console.time("计算用时：");
                var rayLen = this.world.rays.length;
                var shapeLen = this.world.shapes.length;
                var ray;
                var shape;
                if (this.mouseMoved) {
                    this.mouseMoved = false;
                    for (var i = 0; i < rayLen; i++) {
                        this.world.updateLocalRayByRay(this.world.rays[i]);
                    }
                }
                var result = new IntersectResult();
                for (var i = 0; i < rayLen; i++) {
                    result.distance = Infinity;
                    ray = this.world.rays[i];
                    this.world.rayCast2(ray, result);
                    ray.distance = result.distance === Infinity ? 2000 : result.distance;
                }
                // console.timeEnd("计算用时：");
                // console.time("渲染用时：");
                for (var i = 0; i < rayLen; i++) {
                    ray = this.world.rays[i];
                    this.drawLine(ctx, ray.sp, ray.getPoint(ray.distance));
                }
                for (var i = 0; i < shapeLen; i++) {
                    shape = this.world.shapes[i];
                    if (shape instanceof VVLens) {
                        // a
                        var vvlens = shape;
                        ctx.save();
                        ctx.rotate(vvlens.rotation);
                        ctx.translate(vvlens.x, vvlens.y);
                        ctx.beginPath();
                        ctx.fillStyle = "red";
                        ctx.arc(vvlens.circleL.x, vvlens.circleL.y, vvlens.circleL.r, 0, 2 * Math.PI);
                        ctx.clip("nonzero"); // 'nonzero', 'evenodd'
                        ctx.arc(vvlens.circleR.x, vvlens.circleR.y, vvlens.circleR.r, 0, 2 * Math.PI);
                        ctx.stroke(); // 用于绘制线条
                        ctx.closePath();
                        ctx.restore();
                    }
                }
                // console.timeEnd("渲染用时：");
            };
            Example01.prototype.drawEllipse = function (ctx, x, y, a, b, w, co) {
                if (w === void 0) { w = 1; }
                if (co === void 0) { co = "red"; }
                ctx.beginPath();
                ctx.lineWidth = w; // 设置线条宽度
                ctx.strokeStyle = co; // 设置线条颜色
                ctx.ellipse(x, y, a, b, 0, 0, 2 * Math.PI);
                ctx.stroke(); // 用于绘制线条
                ctx.closePath();
            };
            Example01.prototype.drawLine = function (ctx, p0, p1, w, co) {
                if (w === void 0) { w = 1; }
                if (co === void 0) { co = "red"; }
                ctx.beginPath();
                ctx.lineWidth = w; // 设置线条宽度
                ctx.strokeStyle = co; // 设置线条颜色
                ctx.moveTo(p0.x, p0.y);
                ctx.lineTo(p1.x, p1.y);
                ctx.stroke(); // 用于绘制线条
                ctx.closePath();
            };
            Example01.prototype.drawCircle = function (ctx, x, y, r, w, co) {
                if (w === void 0) { w = 1; }
                if (co === void 0) { co = "red"; }
                ctx.beginPath();
                ctx.lineWidth = w; // 设置线条宽度
                ctx.strokeStyle = co; // 设置线条颜色
                ctx.arc(x, y, r, 0, 2 * Math.PI);
                ctx.stroke(); // 用于绘制线条
                ctx.closePath();
            };
            return Example01;
        }());
        optical.Example01 = Example01;
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/7/11.
 */
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var IntersectResult = hanyeah.optical.geom.IntersectResult;
        var SimpleIntersectResult = hanyeah.optical.geom.SimpleIntersectResult;
        var HObject = hanyeah.electricity.HObject;
        var OpticalWorld = /** @class */ (function (_super) {
            __extends(OpticalWorld, _super);
            function OpticalWorld() {
                var _this = _super.call(this) || this;
                _this.shapes = [];
                _this.rays = [];
                return _this;
            }
            OpticalWorld.prototype.addShape = function (shape) {
                if (this.shapes.indexOf(shape) === -1) {
                    this.shapes.push(shape);
                }
            };
            OpticalWorld.prototype.removeShape = function (shape) {
                var ind = this.shapes.indexOf(shape);
                if (ind !== -1) {
                    this.shapes.splice(ind, 1);
                    shape.destroy();
                }
            };
            OpticalWorld.prototype.addRay = function (ray) {
                if (this.rays.indexOf(ray) === -1) {
                    this.rays.push(ray);
                }
            };
            OpticalWorld.prototype.removeRay = function (ray) {
                var ind = this.rays.indexOf(ray);
                if (ind !== -1) {
                    this.rays.splice(ind, 1);
                    var len = this.rays.length;
                    for (var i = 0; i < len; i++) {
                        this.shapes[i].removeLocalRay(ray);
                    }
                    ray.destroy();
                }
            };
            /**
             * 获取与光线碰撞的结果。
             * @param ray
             * @returns {IntersectResult}
             */
            OpticalWorld.prototype.rayCast = function (ray) {
                var result = IntersectResult.noHit;
                var len = this.shapes.length;
                var shape;
                for (var i = 0; i < len; i++) {
                    shape = this.shapes[i];
                    var r0 = shape.intersect(ray);
                    if (r0.distance < result.distance) {
                        result = r0;
                    }
                }
                return result;
            };
            OpticalWorld.prototype.rayCast2 = function (ray, result) {
                var len = this.shapes.length;
                var simpleResult = new SimpleIntersectResult();
                for (var i = 0; i < len; i++) {
                    this.shapes[i].intersect2(ray, simpleResult);
                }
                if (simpleResult.t !== Infinity) {
                    simpleResult.geom.getGlobalIntersectResult2(ray, simpleResult.localRay, simpleResult.t, result);
                }
            };
            /**
             * 获取所有与光线碰撞的结果。
             * @param ray
             * @param sort
             * @returns {IntersectResult[]}
             */
            OpticalWorld.prototype.rayMultiCast = function (ray, sort) {
                if (sort === void 0) { sort = true; }
                var result = [];
                this.shapes.forEach(function (shape) {
                    var r0 = shape.intersect(ray);
                    result.push(r0);
                });
                if (sort) {
                    result.sort(function (a, b) {
                        return a.distance - b.distance;
                    });
                }
                return result;
            };
            OpticalWorld.prototype.updateLocalRayByRay = function (ray) {
                var len = this.shapes.length;
                for (var i = 0; i < len; i++) {
                    this.shapes[i].updateLocalRay(ray);
                }
            };
            OpticalWorld.prototype.updateLocalRayByShape = function (shape) {
                var len = this.rays.length;
                for (var i = 0; i < len; i++) {
                    shape.updateLocalRay(this.rays[i]);
                }
            };
            return OpticalWorld;
        }(HObject));
        optical.OpticalWorld = OpticalWorld;
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
            var Circle2 = /** @class */ (function (_super) {
                __extends(Circle2, _super);
                function Circle2(cp, r) {
                    var _this = _super.call(this) || this;
                    _this.cp = cp.clone();
                    _this.r = r;
                    return _this;
                }
                Circle2.prototype.clone = function () {
                    return new Circle2(this.cp, this.r);
                };
                Circle2.prototype.intersectT = function (ray) {
                    var result = [];
                    var v = geom.Point.sub(ray.sp, this.cp);
                    var c = v.sqrLength() - this.r * this.r;
                    var b = 2 * ray.dir.dot(v);
                    geom.Geom.getTbyAbc(result, 1, b, c);
                    return result;
                };
                Circle2.prototype.getNormal = function (p, normalize) {
                    if (normalize === void 0) { normalize = false; }
                    var normal = geom.Point.sub(p, this.cp);
                    if (normalize) {
                        normal.normalize(1);
                    }
                    return normal;
                };
                Circle2.prototype.containsPoint = function (p) {
                    return geom.Geom.getSign(this.r * this.r - geom.Point.sqrDistance(p, this.cp));
                };
                return Circle2;
            }(geom.Geom));
            geom.Circle2 = Circle2;
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
                    geom.Geom.getTbyAbc(result, a, b, c);
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
                    geom.Geom.getTbyAbc(result, a, b, c);
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
/**
 * Created by hanyeah on 2019/7/15.
 */
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var geom;
        (function (geom) {
            var Matrix = /** @class */ (function () {
                function Matrix(a, b, c, d, tx, ty) {
                    if (a === void 0) { a = 1.0; }
                    if (b === void 0) { b = 0.0; }
                    if (c === void 0) { c = 0.0; }
                    if (d === void 0) { d = 1.0; }
                    if (tx === void 0) { tx = 0.0; }
                    if (ty === void 0) { ty = 0.0; }
                    this.a = a;
                    this.b = b;
                    this.c = c;
                    this.d = d;
                    this.tx = tx;
                    this.ty = ty;
                }
                Matrix.prototype.clone = function () {
                    return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
                };
                Matrix.prototype.setMatrix = function (m) {
                    this.a = m.a;
                    this.b = m.b;
                    this.c = m.c;
                    this.d = m.d;
                    this.tx = m.tx;
                    this.ty = m.ty;
                };
                Matrix.prototype.identity = function () {
                    this.a = 1.0;
                    this.b = 0.0;
                    this.c = 0.0;
                    this.d = 1.0;
                    this.tx = 0.0;
                    this.ty = 0.0;
                };
                Matrix.prototype.rotate = function (angle) {
                    var sin = Math.sin(angle);
                    var cos = Math.cos(angle);
                    var m = new Matrix(cos, sin, -sin, cos, 0.0, 0.0);
                    this.concat(m);
                };
                Matrix.prototype.scale = function (sx, sy) {
                    var m = new Matrix(sx, 0.0, 0.0, sy, 0.0, 0.0);
                    this.concat(m);
                };
                Matrix.prototype.translate = function (dx, dy) {
                    this.tx += dx;
                    this.ty += dy;
                };
                Matrix.prototype.transformPoint = function (p) {
                    return new geom.Point(this.a * p.x + this.b * p.y + this.tx, this.c * p.x + this.d * p.y + this.ty);
                };
                Matrix.prototype.transformPoint2 = function (p, p2) {
                    p2.x = this.a * p.x + this.b * p.y + this.tx;
                    p2.y = this.c * p.x + this.d * p.y + this.ty;
                };
                Matrix.prototype.deltaTransformPoint = function (p) {
                    return new geom.Point(this.a * p.x + this.b * p.y, this.c * p.x + this.d * p.y);
                };
                Matrix.prototype.deltaTransformPoint2 = function (p, p2) {
                    p2.x = this.a * p.x + this.b * p.y;
                    p2.y = this.c * p.x + this.d * p.y;
                };
                Matrix.prototype.createBox = function (sx, sy, rotation, tx, ty) {
                    this.identity();
                    this.rotate(rotation);
                    this.scale(sx, sy);
                    this.translate(tx, ty);
                };
                Matrix.prototype.concat = function (m) {
                    var a0 = this.a * m.a + this.b * m.c;
                    var b0 = this.a * m.b + this.b * m.d;
                    var c0 = this.c * m.a + this.d * m.c;
                    var d0 = this.c * m.b + this.d * m.d;
                    var tx0 = this.a * m.tx + this.b * m.ty + this.tx;
                    var ty0 = this.c * m.tx + this.d * m.ty + this.ty;
                    this.a = a0;
                    this.b = b0;
                    this.c = c0;
                    this.d = d0;
                    this.tx = tx0;
                    this.ty = ty0;
                };
                Matrix.prototype.invert = function () {
                    var c0 = this.c / (this.b * this.c - this.a * this.d);
                    var a0 = this.d / (this.a * this.d - this.b * this.c);
                    var d0 = this.a / (this.a * this.d - this.b * this.c);
                    var b0 = this.b / (this.b * this.c - this.a * this.d);
                    var tx0 = (this.b * this.ty - this.d * this.tx) / (this.a * this.d - this.b * this.c);
                    var ty0 = (this.a * this.ty - this.c * this.tx) / (this.b * this.c - this.a * this.d);
                    this.a = a0;
                    this.b = b0;
                    this.c = c0;
                    this.d = d0;
                    this.tx = tx0;
                    this.ty = ty0;
                };
                Matrix.prototype.toString = function () {
                    return "( a=" + this.a + ", b=" + this.b + " ,c=" + this.c + " ,d=" + this.d + " ,tx=" + this.tx + " ,ty=" + this.ty + " )";
                };
                Matrix.prototype.toJsonString = function () {
                    return "{a: " + this.a + ", b: " + this.b + ", c: " + this.c + ", d: " + this.d + ", tx: " + this.tx + ", ty: " + this.ty;
                };
                return Matrix;
            }());
            geom.Matrix = Matrix;
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
                    geom.Geom.getTbyAbc(arr, a, b, c);
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
/**
 * Created by hanyeah on 2019/7/15.
 * 凹凹透镜
 */
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var lens;
        (function (lens) {
            var CCLens = /** @class */ (function (_super) {
                __extends(CCLens, _super);
                function CCLens() {
                    return _super.call(this) || this;
                }
                return CCLens;
            }(lens.Lens));
            lens.CCLens = CCLens;
        })(lens = optical.lens || (optical.lens = {}));
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/7/15.
 * 凹平透镜
 */
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var lens;
        (function (lens) {
            var CFLens = /** @class */ (function (_super) {
                __extends(CFLens, _super);
                function CFLens() {
                    return _super.call(this) || this;
                }
                return CFLens;
            }(lens.Lens));
            lens.CFLens = CFLens;
        })(lens = optical.lens || (optical.lens = {}));
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/7/15.
 * 凹凸透镜
 */
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var lens;
        (function (lens) {
            var CVLens = /** @class */ (function (_super) {
                __extends(CVLens, _super);
                function CVLens() {
                    return _super.call(this) || this;
                }
                return CVLens;
            }(lens.Lens));
            lens.CVLens = CVLens;
        })(lens = optical.lens || (optical.lens = {}));
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/7/15.
 * 平凹透镜
 */
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var lens;
        (function (lens) {
            var FCLens = /** @class */ (function (_super) {
                __extends(FCLens, _super);
                function FCLens() {
                    return _super.call(this) || this;
                }
                return FCLens;
            }(lens.Lens));
            lens.FCLens = FCLens;
        })(lens = optical.lens || (optical.lens = {}));
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/7/15.
 * 平凸透镜
 */
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var lens;
        (function (lens) {
            var FVLens = /** @class */ (function (_super) {
                __extends(FVLens, _super);
                function FVLens() {
                    return _super.call(this) || this;
                }
                return FVLens;
            }(lens.Lens));
            lens.FVLens = FVLens;
        })(lens = optical.lens || (optical.lens = {}));
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/7/15.
 * 凸凹透镜
 */
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var lens;
        (function (lens) {
            var VCLens = /** @class */ (function (_super) {
                __extends(VCLens, _super);
                function VCLens() {
                    return _super.call(this) || this;
                }
                return VCLens;
            }(lens.Lens));
            lens.VCLens = VCLens;
        })(lens = optical.lens || (optical.lens = {}));
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/7/15.
 * 凸平透镜
 */
var hanyeah;
(function (hanyeah) {
    var optical;
    (function (optical) {
        var lens;
        (function (lens) {
            var VFLens = /** @class */ (function (_super) {
                __extends(VFLens, _super);
                function VFLens() {
                    return _super.call(this) || this;
                }
                return VFLens;
            }(lens.Lens));
            lens.VFLens = VFLens;
        })(lens = optical.lens || (optical.lens = {}));
    })(optical = hanyeah.optical || (hanyeah.optical = {}));
})(hanyeah || (hanyeah = {}));
