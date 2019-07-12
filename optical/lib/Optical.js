/**
 * Created by hanyeah on 2019/7/11.
 */
var com;
(function (com) {
    var hanyeah;
    (function (hanyeah) {
        var Optical = /** @class */ (function () {
            function Optical() {
            }
            return Optical;
        }());
        hanyeah.Optical = Optical;
    })(hanyeah = com.hanyeah || (com.hanyeah = {}));
})(com || (com = {}));
/**
 * Created by hanyeah on 2019/7/11.
 */
var com;
(function (com) {
    var hanyeah;
    (function (hanyeah) {
        var geom;
        (function (geom) {
            var Circle = /** @class */ (function () {
                function Circle(cp, r) {
                    this.cp = cp;
                    this.r = r;
                }
                Circle.prototype.clone = function () {
                    return new Circle(this.cp.clone(), this.r);
                };
                Circle.prototype.intersect = function (ray) {
                    return geom.IntersectResult.noHit;
                };
                return Circle;
            }());
            geom.Circle = Circle;
        })(geom = hanyeah.geom || (hanyeah.geom = {}));
    })(hanyeah = com.hanyeah || (com.hanyeah = {}));
})(com || (com = {}));
/**
 * Created by hanyeah on 2019/7/11.
 */
var com;
(function (com) {
    var hanyeah;
    (function (hanyeah) {
        var geom;
        (function (geom) {
            var IntersectResult = /** @class */ (function () {
                function IntersectResult() {
                }
                IntersectResult.noHit = new IntersectResult();
                return IntersectResult;
            }());
            geom.IntersectResult = IntersectResult;
        })(geom = hanyeah.geom || (hanyeah.geom = {}));
    })(hanyeah = com.hanyeah || (com.hanyeah = {}));
})(com || (com = {}));
/**
 * Created by hanyeah on 2019/7/11.
 */
var com;
(function (com) {
    var hanyeah;
    (function (hanyeah) {
        var geom;
        (function (geom) {
            var Line = /** @class */ (function () {
                function Line(p1, p2) {
                    this.p1 = p1;
                    this.p2 = p2;
                }
                Line.prototype.clone = function () {
                    return new Line(this.p1.clone(), this.p2.clone());
                };
                Line.prototype.intersect = function (ray) {
                    return geom.IntersectResult.noHit;
                };
                return Line;
            }());
            geom.Line = Line;
        })(geom = hanyeah.geom || (hanyeah.geom = {}));
    })(hanyeah = com.hanyeah || (com.hanyeah = {}));
})(com || (com = {}));
/**
 * Created by hanyeah on 2019/7/11.
 */
var com;
(function (com) {
    var hanyeah;
    (function (hanyeah) {
        var geom;
        (function (geom) {
            var Point = /** @class */ (function () {
                function Point(x, y) {
                    if (x === void 0) { x = 0; }
                    if (y === void 0) { y = 0; }
                    this.x = x;
                    this.y = y;
                }
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
                Point.dot = function (p1, p2) {
                    return p1.x * p2.x + p1.y * p2.y;
                };
                Point.cross = function (p1, p2) {
                    return p1.x * p2.y - p1.y * p2.x;
                };
                return Point;
            }());
            geom.Point = Point;
        })(geom = hanyeah.geom || (hanyeah.geom = {}));
    })(hanyeah = com.hanyeah || (com.hanyeah = {}));
})(com || (com = {}));
/**
 * Created by hanyeah on 2019/7/11.
 */
var com;
(function (com) {
    var hanyeah;
    (function (hanyeah) {
        var geom;
        (function (geom) {
            var Ray = /** @class */ (function () {
                function Ray(sp, dir) {
                    this.sp = sp;
                    this.dir = dir;
                }
                Ray.prototype.clone = function () {
                    return new Ray(this.sp.clone(), this.dir.clone());
                };
                Ray.prototype.intersect = function (ray) {
                    return geom.IntersectResult.noHit;
                };
                return Ray;
            }());
            geom.Ray = Ray;
        })(geom = hanyeah.geom || (hanyeah.geom = {}));
    })(hanyeah = com.hanyeah || (com.hanyeah = {}));
})(com || (com = {}));
/**
 * Created by hanyeah on 2019/7/11.
 */
var com;
(function (com) {
    var hanyeah;
    (function (hanyeah) {
        var geom;
        (function (geom) {
            var Segment = /** @class */ (function () {
                function Segment(p1, p2) {
                    this.p1 = p1;
                    this.p2 = p2;
                }
                Segment.prototype.clone = function () {
                    return new Segment(this.p1.clone(), this.p2.clone());
                };
                Segment.prototype.intersect = function (ray) {
                    return geom.IntersectResult.noHit;
                };
                return Segment;
            }());
            geom.Segment = Segment;
        })(geom = hanyeah.geom || (hanyeah.geom = {}));
    })(hanyeah = com.hanyeah || (com.hanyeah = {}));
})(com || (com = {}));
