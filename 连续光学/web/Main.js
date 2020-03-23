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
var hanyeah;
(function (hanyeah) {
    var Container = PIXI.Container;
    var Equipment = /** @class */ (function (_super) {
        __extends(Equipment, _super);
        function Equipment(main) {
            var _this = _super.call(this) || this;
            _this.main = main;
            return _this;
        }
        Equipment.prototype.removed = function () {
        };
        Equipment.prototype.update = function (dt) {
        };
        return Equipment;
    }(Container));
    hanyeah.Equipment = Equipment;
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var World = /** @class */ (function () {
        function World() {
            this.lightDataArr = [];
            this.sagmentDataArr = [];
            this.calculater = new hanyeah.Calculater();
        }
        World.prototype.addLight = function (data) {
            this.lightDataArr.push(data);
        };
        World.prototype.addSegment = function (data) {
            this.sagmentDataArr.push(data);
        };
        World.prototype.getAllLights = function () {
            return this.lightDataArr;
        };
        World.prototype.getAllSegments = function () {
            return this.sagmentDataArr;
        };
        World.prototype.calculate = function () {
            return this.calculater.calculate(this);
        };
        return World;
    }());
    hanyeah.World = World;
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var AngleData = /** @class */ (function () {
        function AngleData(p0, p1, ang0) {
            //
            this.p0 = p0;
            this.p1 = p1;
            this.angle = hanyeah.Utils.formatAngle(hanyeah.PointUtils.getAngle2(p0, p1), ang0);
            this.d = hanyeah.PointUtils.distance(p0, p1);
            p0.angData = this;
            p1.angData = this;
        }
        return AngleData;
    }());
    hanyeah.AngleData = AngleData;
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var Calculater = /** @class */ (function () {
        function Calculater() {
            //
        }
        Calculater.prototype.calculate = function (world) {
            var result = [];
            var lights = world.getAllLights();
            var segments = world.getAllSegments();
            for (var i = 0; i < lights.length; i++) {
                result.push.apply(result, this.calculateLight(lights[i], segments));
            }
            return result;
        };
        Calculater.prototype.getAngles = function (light, segments) {
            var ang0 = hanyeah.PointUtils.getAngle2(light.sP, hanyeah.PointUtils.getMiddleP(light.p0, light.p1));
            var angles = [];
            angles.push(new hanyeah.AngleData(light.sP, light.p0, ang0));
            angles.push(new hanyeah.AngleData(light.sP, light.p1, ang0));
            for (var i = 0; i < segments.length; i++) {
                angles.push(new hanyeah.AngleData(light.sP, segments[i].p0, ang0));
                angles.push(new hanyeah.AngleData(light.sP, segments[i].p1, ang0));
            }
            angles.sort(function (a, b) {
                return a.angle - b.angle;
            });
            return angles;
        };
        Calculater.prototype.getInd = function (angles, light) {
            var ind1 = -1;
            var ind2 = -1;
            for (var i = 0; i < angles.length; i++) {
                if (angles[i].p1.owner === light) {
                    if (ind1 === -1) {
                        ind1 = i;
                    }
                    else {
                        ind2 = i;
                        break;
                    }
                }
            }
            return [ind1, ind2];
        };
        Calculater.prototype.calculateLight = function (light, segments) {
            var angles = this.getAngles(light, segments);
            // 
            var inds = this.getInd(angles, light);
            var ind1 = inds[0];
            var ind2 = inds[1];
            //
            var result = [];
            var quad = new hanyeah.Quad();
            result.push(quad);
            var angData;
            for (var i = ind1; i <= ind2; i++) {
                angData = angles[i];
                if (i === ind1) {
                    this.firstLine(light, segments, angData, quad);
                }
                else if (i === ind2) {
                    this.rightLine(light, segments, angData, quad);
                }
                else {
                    quad = this.middleLine(light, segments, angData, quad);
                    result.push(quad);
                }
            }
            return this.simpleQuad(result);
        };
        Calculater.prototype.simpleQuad = function (quads) {
            var result = [];
            var quad;
            for (var i = 0; i < quads.length; i++) {
                if (this.inSameSeg(quad, quads[i])) {
                    this.mergeQuad(quad, quads[i]);
                }
                else {
                    result.push(quads[i]);
                    quad = quads[i];
                }
            }
            return result;
        };
        Calculater.prototype.inSameSeg = function (quad0, quad1) {
            return quad0 && quad1 && quad0.p2.seg === quad1.p2.seg;
        };
        Calculater.prototype.mergeQuad = function (quad0, quad1) {
            quad0.p2 = quad1.p2;
            quad0.p3 = quad1.p3;
        };
        Calculater.prototype.lastLine = function (light, segments, angData, quad) {
            this.rightLine(light, segments, angData, quad);
        };
        Calculater.prototype.middleLine = function (light, segments, angData, quad) {
            this.rightLine(light, segments, angData, quad);
            quad = new hanyeah.Quad();
            this.leftLine(light, segments, angData, quad);
            return quad;
        };
        Calculater.prototype.firstLine = function (light, segments, angData, quad) {
            this.leftLine(light, segments, angData, quad);
        };
        Calculater.prototype.getP0 = function (light, angData) {
            if (angData.p1.owner === light) {
                return angData.p1;
            }
            if (angData.angle === light.p0.angData.angle) {
                return light.p0;
            }
            if (angData.angle === light.p1.angData.angle) {
                return light.p1;
            }
            return hanyeah.LineUtil.intersectRayLine(angData.p0, angData.p1, light.p0, light.p1);
        };
        Calculater.prototype.leftLine = function (light, segments, angData, quad) {
            var p0 = this.getP0(light, angData);
            var d0 = hanyeah.PointUtils.distance(angData.p0, p0);
            var intersects = this.getIntersects(angData.p0, angData.p1, segments, light);
            var minIntersect = this.getMinIntersect(intersects, d0, true, false);
            var p1 = minIntersect.p;
            quad.p0 = new hanyeah.QuadPoint(p0.x, p0.y, light);
            quad.p1 = new hanyeah.QuadPoint(p1.x, p1.y, minIntersect.seg);
        };
        Calculater.prototype.rightLine = function (light, segments, angData, quad) {
            var p0 = this.getP0(light, angData);
            var d0 = hanyeah.PointUtils.distance(angData.p0, p0);
            var intersects = this.getIntersects(angData.p0, angData.p1, segments, light);
            var minIntersect = this.getMinIntersect(intersects, d0, false, true);
            var p1 = minIntersect.p;
            quad.p2 = new hanyeah.QuadPoint(p1.x, p1.y, minIntersect.seg);
            quad.p3 = new hanyeah.QuadPoint(p0.x, p0.y, light);
        };
        Calculater.prototype.getMinIntersect = function (intersects, minD, ignoreRight, ignoreLeft) {
            var intersect;
            var minInter;
            for (var i = 0; i < intersects.length; i++) {
                intersect = intersects[i];
                if (intersect.d >= minD && (!minInter || intersect.d < minInter.d)) {
                    if (ignoreRight && this.isRightPoint(intersect.p, intersect.seg)) {
                        //
                    }
                    else if (ignoreLeft && this.isLeftPoint(intersect.p, intersect.seg)) {
                        //
                    }
                    else {
                        minInter = intersect;
                    }
                }
            }
            if (!minInter) {
                // 没有，找墙吧
                for (var i = 0; i < intersects.length; i++) {
                    intersect = intersects[i];
                    if (intersect.seg.type === hanyeah.SegmentType.wall) {
                        minInter = intersect;
                        break;
                    }
                }
            }
            return minInter;
        };
        /**
         * 是否是线段的右端点
         */
        Calculater.prototype.isRightPoint = function (p, seg) {
            return (hanyeah.PointUtils.isEqual(p, seg.p0) && this.isRight(seg.p0))
                || (hanyeah.PointUtils.isEqual(p, seg.p1) && this.isRight(seg.p1));
        };
        Calculater.prototype.isRight = function (p) {
            var c = hanyeah.PointUtils.cross2(p.angData.p0, p.angData.p1, p.brother.angData.p0, p.brother.angData.p1);
            return c > 0;
        };
        /**
         * 是否是线段的左端点
         */
        Calculater.prototype.isLeftPoint = function (p, seg) {
            return (hanyeah.PointUtils.isEqual(p, seg.p0) && this.isLeft(seg.p0))
                || (hanyeah.PointUtils.isEqual(p, seg.p1) && this.isLeft(seg.p1));
        };
        Calculater.prototype.isLeft = function (p) {
            var c = hanyeah.PointUtils.cross2(p.angData.p0, p.angData.p1, p.brother.angData.p0, p.brother.angData.p1);
            return c < 0;
        };
        Calculater.prototype.getIntersects = function (p0, p1, arr, ignore) {
            var seg;
            var p;
            var result = [];
            for (var i = 0; i < arr.length; i++) {
                seg = arr[i];
                if (seg !== ignore) {
                    p = hanyeah.LineUtil.intersectRaySegment(p0, p1, seg.p0, seg.p1);
                    if (p) {
                        result.push(new hanyeah.IntersectResult(p, seg, hanyeah.PointUtils.distance(p0, p)));
                    }
                }
            }
            return result;
        };
        return Calculater;
    }());
    hanyeah.Calculater = Calculater;
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var HPoint = /** @class */ (function () {
        function HPoint(x, y, owner) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (owner === void 0) { owner = null; }
            this.x = x;
            this.y = y;
            this.owner = owner;
        }
        HPoint.prototype.set = function (x, y) {
            this.x = x;
            this.y = y;
        };
        return HPoint;
    }());
    hanyeah.HPoint = HPoint;
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var IntersectResult = /** @class */ (function () {
        function IntersectResult(p, seg, d) {
            this.p = p;
            this.seg = seg;
            this.d = d;
        }
        return IntersectResult;
    }());
    hanyeah.IntersectResult = IntersectResult;
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var LightData = /** @class */ (function () {
        function LightData(world) {
            this.p0 = new hanyeah.HPoint(0, 0, this);
            this.p1 = new hanyeah.HPoint(0, 0, this);
            this.sP = new hanyeah.HPoint(0, 0, this);
            this.world = world;
            this.world.addLight(this);
        }
        LightData.prototype.destroy = function () {
        };
        return LightData;
    }());
    hanyeah.LightData = LightData;
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var Quad = /** @class */ (function () {
        function Quad() {
            this.p0 = new QuadPoint();
            this.p1 = new QuadPoint();
            this.p2 = new QuadPoint();
            this.p3 = new QuadPoint();
        }
        return Quad;
    }());
    hanyeah.Quad = Quad;
    var QuadPoint = /** @class */ (function () {
        function QuadPoint(x, y, seg) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (seg === void 0) { seg = null; }
            this.x = x;
            this.y = y;
            this.seg = seg;
        }
        return QuadPoint;
    }());
    hanyeah.QuadPoint = QuadPoint;
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var Segment = /** @class */ (function () {
        function Segment(world, type) {
            this.p0 = new hanyeah.HPoint(0, 0, this);
            this.p1 = new hanyeah.HPoint(0, 0, this);
            this.p0.brother = this.p1;
            this.p1.brother = this.p0;
            this.world = world;
            this.world.addSegment(this);
            this.type = type;
        }
        Segment.prototype.destroy = function () {
        };
        return Segment;
    }());
    hanyeah.Segment = Segment;
    var SegmentType;
    (function (SegmentType) {
        SegmentType[SegmentType["mirror"] = 0] = "mirror";
        SegmentType[SegmentType["wall"] = 1] = "wall";
        SegmentType[SegmentType["light"] = 2] = "light";
    })(SegmentType = hanyeah.SegmentType || (hanyeah.SegmentType = {}));
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var LineUtil = /** @class */ (function () {
        function LineUtil() {
        }
        /**
         * 两条直线<p1,p2>与<p3,p4>的交点
         * @param p1
         * @param p2
         * @param p3
         * @param p4
         * @returns {null}
         */
        LineUtil.intersectLineLine = function (p1, p2, p3, p4) {
            // 参考：https://www.iteye.com/blog/fins-1522259
            var denominator = (p2.y - p1.y) * (p4.x - p3.x) - (p3.y - p4.y) * (p1.x - p2.x);
            if (denominator === 0) {
                // 平行，不相交
                return null;
            }
            var dx1 = p2.x - p1.x;
            var dy1 = p2.y - p1.y;
            var dx2 = p4.x - p3.x;
            var dy2 = p4.y - p3.y;
            var dx3 = p3.x - p1.x;
            var dy3 = p3.y - p1.y;
            return {
                x: (dx1 * dx2 * dy3 + dy1 * dx2 * p1.x - dy2 * dx1 * p3.x) / denominator,
                y: -(dy1 * dy2 * dx3 + dx1 * dy2 * p1.y - dx2 * dy1 * p3.y) / denominator
            };
        };
        /**
         * 直线<p1,p2>与线段(p3,p4)的交点
         * @param p1
         * @param p2
         * @param p3
         * @param p4
         * @returns {IPoint}
         */
        LineUtil.intersectLineSegment = function (p1, p2, p3, p4) {
            var p = LineUtil.intersectLineLine(p1, p2, p3, p4);
            if (p && LineUtil.pointInSegment(p, p3, p4)) {
                // 在线上段(p3,p4)上
                return p;
            }
            return null;
        };
        /**
         * 射线和直线的交点
         */
        LineUtil.intersectRayLine = function (p1, p2, p3, p4) {
            var p = LineUtil.intersectLineLine(p1, p2, p3, p4);
            if (p && LineUtil.pointInRay(p, p1, p2)) {
                return p;
            }
            return null;
        };
        /**
         * 射线和线段的交点
         */
        LineUtil.intersectRaySegment = function (p1, p2, p3, p4) {
            var p = LineUtil.intersectLineLine(p1, p2, p3, p4);
            if (p && LineUtil.pointInRay(p, p1, p2) && LineUtil.pointInSegment(p, p3, p4)) {
                return p;
            }
            return null;
        };
        /**
         * 点在线段上(包含端点)
         */
        LineUtil.pointInSegment = function (p, p1, p2) {
            return (p.x - p1.x) * (p.x - p2.x) + (p.y - p1.y) * (p.y - p2.y) <= 0;
        };
        /**
         * 点在射线上
         */
        LineUtil.pointInRay = function (p, p1, p2) {
            return (p.x - p1.x) * (p2.x - p1.x) + (p.y - p1.y) * (p2.y - p1.y) >= 0;
        };
        /**
         * 两条线段(p1,p2)与(p3,p4)的交点
         * @param p1
         * @param p2
         * @param p3
         * @param p4
         * @returns {IPoint}
         */
        LineUtil.intersectSegmentSegment = function (p1, p2, p3, p4) {
            // 参考：https://www.cnblogs.com/i-gps/archive/2012/06/19/2554992.html
            // https://www.iteye.com/blog/fins-1522259
            var p = LineUtil.intersectLineLine(p1, p2, p3, p4);
            if (p
                && (p.x - p1.x) * (p.x - p2.x) + (p.y - p1.y) * (p.y - p2.y) <= 0 // 在线上段(p1,p2)上
                && (p.x - p3.x) * (p.x - p4.x) + (p.y - p3.y) * (p.y - p4.y) <= 0 // 在线上段(p3,p4)上
            ) {
                return p;
            }
            return null;
        };
        /**
         * 得到两条直线<p1,p2>、<p3, p4>相交的交点
         * @param	p1
         * @param	p2
         * @param	p3
         * @param	p4
         * @return {IPoint}
         */
        LineUtil.lineIntersect = function (p1, p2, p3, p4) {
            var rp = { x: 0, y: 0 };
            var x1 = p1.x;
            var y1 = p1.y;
            var x2 = p2.x;
            var y2 = p2.y;
            var x3 = p3.x;
            var y3 = p3.y;
            var x4 = p4.x;
            var y4 = p4.y;
            var c = 0.0000001;
            var m;
            if (x2 === x1) {
                m = (y2 - y1) / (x2 - x1 + c);
            }
            else {
                m = (y2 - y1) / (x2 - x1);
            }
            var n;
            if (x4 === x3) {
                n = (y4 - y3) / (x4 - x3 + c);
            }
            else {
                n = (y4 - y3) / (x4 - x3);
            }
            if (m === n) {
                rp.x = (m * x1 - n * x3 + y3 - y1) / (m - n + c);
            }
            else {
                rp.x = (m * x1 - n * x3 + y3 - y1) / (m - n);
            }
            rp.y = m * rp.x - m * x1 + y1;
            return rp;
        };
        /**
         * 直线 p1-p2 和 p3-p4是否平行
         * 如果(p1,p2)长度很小，或者(p3,p4)长度很小，可能会判断错。所以线段长度推荐用单位向量（或者尽量大一些）
         * @param p1
         * @param p2
         * @param p3
         * @param p4
         * @returns {boolean}
         */
        LineUtil.isParallel = function (p1, p2, p3, p4) {
            // 叉积是否为0
            return Math.abs((p2.x - p1.x) * (p4.y - p3.y) - (p2.y - p1.y) * (p4.x - p3.x)) < 1e-10;
        };
        /**
         * 点p是否在线段 (p1,p2) 上
         */
        LineUtil.containsPoint = function (p, p1, p2) {
            // 叉积
            if (!LineUtil.isParallel(p, p1, p, p2)) {
                return false;
            }
            // 点积
            return (p.x - p1.x) * (p.x - p2.x) + (p.y - p1.y) * (p.y - p2.y) <= 0;
        };
        /**
         * 点到线段的最短距离
         * @param p
         * @param p1
         * @param p2
         * @returns {number}
         */
        LineUtil.distancePointToSegment = function (p, p1, p2) {
            var pt = LineUtil.pointToSegmentDisPoint(p, p1, p2);
            return hanyeah.PointUtils.distance(pt, p);
        };
        /**
         * 点到线段的最短距离的点。
         * @param p
         * @param p1
         * @param p2
         * @returns {IPoint}
         */
        LineUtil.pointToSegmentDisPoint = function (p, p1, p2) {
            var cross = (p2.x - p1.x) * (p.x - p1.x) + (p2.y - p1.y) * (p.y - p1.y);
            if (cross <= 0) {
                return p1;
            }
            var d2 = (p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y);
            if (cross >= d2) {
                return p2;
            }
            var r = cross / d2;
            return {
                x: p1.x + (p2.x - p1.x) * r,
                y: p1.y + (p2.y - p1.y) * r
            };
        };
        /**
         * 点到直线的距离
         * @param p
         * @param p1
         * @param p2
         * @returns {number}
         */
        LineUtil.distancePointToLine = function (p, p1, p2) {
            var pt = LineUtil.getFootPoint(p, p1, p2);
            return hanyeah.PointUtils.distance(pt, p);
        };
        /**
         * 计算点到直线的垂足。
         * @param p
         * @param p1
         * @param p2
         * @returns {{x: number, y: number}}
         */
        LineUtil.getFootPoint = function (p, p1, p2) {
            var cross = (p2.x - p1.x) * (p.x - p1.x) + (p2.y - p1.y) * (p.y - p1.y);
            var d2 = (p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y);
            var r = cross / d2;
            return {
                x: p1.x + (p2.x - p1.x) * r,
                y: p1.y + (p2.y - p1.y) * r
            };
        };
        return LineUtil;
    }());
    hanyeah.LineUtil = LineUtil;
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var PointUtils = /** @class */ (function () {
        function PointUtils() {
        }
        /**
         * 两点之间的距离
         * @param p1
         * @param p2
         * @returns {number}
         */
        PointUtils.distance = function (p1, p2) {
            var dx = p1.x - p2.x;
            var dy = p1.y - p2.y;
            return Math.sqrt(dx * dx + dy * dy);
        };
        /**
         * 两点距离的平方
         * @param p1
         * @param p2
         * @returns {number}
         */
        PointUtils.sqrDistance = function (p1, p2) {
            var dx = p1.x - p2.x;
            var dy = p1.y - p2.y;
            return dx * dx + dy * dy;
        };
        /**
         * 到原点的长度
         */
        PointUtils.length0 = function (p) {
            return Math.sqrt(p.x * p.x + p.y * p.y);
        };
        /**
         * 到原点的长度的平方
         */
        PointUtils.sqrLength = function (p) {
            return p.x * p.x + p.y * p.y;
        };
        /**
         * 归一化
         */
        PointUtils.normalize = function (p) {
            var s = 1 / PointUtils.length0(p);
            p.x *= s;
            p.y *= s;
        };
        /**
         * 点积
         */
        PointUtils.dot = function (p0, p1) {
            return p0.x * p1.x + p0.y * p1.y;
        };
        /**
         * 叉乘
         */
        PointUtils.cross = function (p0, p1) {
            return p0.x * p1.y - p1.x * p0.y;
        };
        PointUtils.cross2 = function (p0, p1, p2, p3) {
            return (p1.x - p0.x) * (p3.y - p2.y) - (p3.x - p2.x) * (p1.y - p0.y);
        };
        /**
         * 获取两点组成的向量角度
         */
        PointUtils.getAngle2 = function (p0, p1) {
            return Math.atan2(p1.y - p0.y, p1.x - p0.x);
        };
        /**
         * 获取两点的中点
         */
        PointUtils.getMiddleP = function (p0, p1) {
            return { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
        };
        /**
         * 两点相加
         */
        PointUtils.addP = function (p0, p1) {
            return { x: p0.x + p1.x, y: p0.y + p1.y };
        };
        /**
         * 两个点是否相等
         */
        PointUtils.isEqual = function (p0, p1) {
            return p0.x === p1.x && p0.y === p1.y;
        };
        return PointUtils;
    }());
    hanyeah.PointUtils = PointUtils;
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        Utils.formatAngle = function (ang, ang0) {
            ang = -(ang - ang0);
            if (ang > Math.PI) {
                ang -= Math.PI * 2;
            }
            else if (ang < -Math.PI) {
                ang += Math.PI * 2;
            }
            return ang;
        };
        return Utils;
    }());
    hanyeah.Utils = Utils;
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var Container = PIXI.Container;
    var Graphics = PIXI.Graphics;
    var Text = PIXI.Text;
    var DragAbleCircle = /** @class */ (function (_super) {
        __extends(DragAbleCircle, _super);
        function DragAbleCircle(r, co, x, y) {
            var _this = _super.call(this) || this;
            _this.mouseDownHandler = function (e) {
                _this.lastP = e.data.global.clone();
                _this.addListener("mousemove", _this.mouseMoveHandler);
                _this.addListener("mouseup", _this.mouseUpHandler);
                _this.addListener("mouseupoutside", _this.mouseUpHandler);
            };
            _this.mouseMoveHandler = function (e) {
                _this.x += e.data.global.x - _this.lastP.x;
                _this.y += e.data.global.y - _this.lastP.y;
                _this.lastP = e.data.global.clone();
            };
            _this.mouseUpHandler = function (e) {
                _this.removeListener("mousemove", _this.mouseMoveHandler);
                _this.removeListener("mouseup", _this.mouseUpHandler);
                _this.removeListener("mouseupoutside", _this.mouseUpHandler);
            };
            var gra = new Graphics();
            _this.addChild(gra);
            gra.lineStyle(1, 0xffffff, 0.8);
            gra.beginFill(co, 0.6);
            gra.drawCircle(0, 0, r);
            _this.x = x;
            _this.y = y;
            _this.addListener("mousedown", _this.mouseDownHandler);
            _this.cursor = "pointer";
            _this.interactive = true;
            _this.tf = new Text("", { fill: "#00ff00", fontSize: 12 });
            _this.addChild(_this.tf);
            _this.tf.y = -r - 30;
            return _this;
        }
        return DragAbleCircle;
    }(Container));
    hanyeah.DragAbleCircle = DragAbleCircle;
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var Application = PIXI.Application;
    var Main = /** @class */ (function () {
        function Main() {
            var _this = this;
            this.onLoaded = function () {
                window.removeEventListener("load", _this.onLoaded);
                _this.app = new Application({ antialias: true });
                document.body.appendChild(_this.app.view);
                _this.stage = _this.app.stage;
                _this.scene = new hanyeah.Scene();
                _this.stage.addChild(_this.scene);
                _this.app.ticker.add(function (dt) {
                    _this.scene.update(dt);
                });
            };
            console.log("main");
            window.addEventListener("load", this.onLoaded);
        }
        return Main;
    }());
    hanyeah.Main = Main;
})(hanyeah || (hanyeah = {}));
new hanyeah.Main();
var hanyeah;
(function (hanyeah) {
    var Graphics = PIXI.Graphics;
    var Light = /** @class */ (function (_super) {
        __extends(Light, _super);
        function Light(main) {
            var _this = _super.call(this, main) || this;
            _this.gra = new Graphics();
            _this.addChild(_this.gra);
            _this.p2 = new hanyeah.DragAbleCircle(5, 0x00ff00, 0, 0);
            _this.p0 = new hanyeah.DragAbleCircle(5, 0xff0000, -20, 50);
            _this.p1 = new hanyeah.DragAbleCircle(5, 0xff0000, 20, 50);
            _this.addChild(_this.p0);
            _this.addChild(_this.p1);
            _this.addChild(_this.p2);
            _this.data = new hanyeah.LightData(_this.main.world);
            return _this;
        }
        Light.prototype.update = function (dt) {
            _super.prototype.update.call(this, dt);
            this.data.p0.set(this.x + this.p0.x, this.y + this.p0.y);
            this.data.p1.set(this.x + this.p1.x, this.y + this.p1.y);
            this.data.sP.set(this.x + this.p2.x, this.y + this.p2.y);
            //
            this.gra.clear();
            this.gra.lineStyle(5, 0x00ffff, 0.8);
            this.gra.moveTo(this.p0.x, this.p0.y);
            this.gra.lineTo(this.p1.x, this.p1.y);
            this.gra.lineStyle(1, 0x00ffff, 0.8);
            this.gra.moveTo(this.p2.x, this.p2.y);
            this.gra.lineTo(this.p0.x, this.p0.y);
            this.gra.moveTo(this.p2.x, this.p2.y);
            this.gra.lineTo(this.p1.x, this.p1.y);
        };
        return Light;
    }(hanyeah.Equipment));
    hanyeah.Light = Light;
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var Graphics = PIXI.Graphics;
    var Mirror = /** @class */ (function (_super) {
        __extends(Mirror, _super);
        function Mirror(main) {
            var _this = _super.call(this, main) || this;
            _this.gra = new Graphics();
            _this.addChild(_this.gra);
            _this.p0 = new hanyeah.DragAbleCircle(5, 0x0000ff, -20, 0);
            _this.p1 = new hanyeah.DragAbleCircle(5, 0x0000ff, 20, 0);
            _this.addChild(_this.p0);
            _this.addChild(_this.p1);
            _this.data = new hanyeah.Segment(_this.main.world, hanyeah.SegmentType.mirror);
            return _this;
        }
        Mirror.prototype.update = function (dt) {
            _super.prototype.update.call(this, dt);
            this.data.p0.set(this.x + this.p0.x, this.y + this.p0.y);
            this.data.p1.set(this.x + this.p1.x, this.y + this.p1.y);
            //
            this.gra.clear();
            this.gra.lineStyle(5, 0xffff00, 0.8);
            this.gra.moveTo(this.p0.x, this.p0.y);
            this.gra.lineTo(this.p1.x, this.p1.y);
            //
            if (this.data.p0.angData) {
                this.p0.tf.text = "" + Math.round(this.data.p0.angData.angle * 100) / 100;
            }
            if (this.data.p1.angData) {
                this.p1.tf.text = "" + Math.round(this.data.p1.angData.angle * 100) / 100;
            }
        };
        return Mirror;
    }(hanyeah.Equipment));
    hanyeah.Mirror = Mirror;
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var Container = PIXI.Container;
    var Graphics = PIXI.Graphics;
    var Scene = /** @class */ (function (_super) {
        __extends(Scene, _super);
        function Scene() {
            var _this = _super.call(this) || this;
            _this.world = new hanyeah.World();
            _this.eqs = [];
            _this.gra = new Graphics();
            _this.addChild(_this.gra);
            _this.addEq(new hanyeah.Light(_this), 400, 100);
            _this.addEq(new hanyeah.Mirror(_this), 300, 300);
            _this.addEq(new hanyeah.Mirror(_this), 500, 300);
            _this.addEq(new hanyeah.Wall(_this, { x: 0, y: 0 }, { x: 0, y: 600 }), 0, 0);
            _this.addEq(new hanyeah.Wall(_this, { x: 800, y: 0 }, { x: 800, y: 600 }), 0, 0);
            _this.addEq(new hanyeah.Wall(_this, { x: 0, y: 0 }, { x: 800, y: 0 }), 0, 0);
            _this.addEq(new hanyeah.Wall(_this, { x: 0, y: 600 }, { x: 800, y: 600 }), 0, 0);
            return _this;
        }
        Scene.prototype.addEq = function (eq, x, y) {
            eq.position.set(x, y);
            this.addChild(eq);
            this.eqs.push(eq);
            return eq;
        };
        Scene.prototype.update = function (dt) {
            this.eqs.forEach(function (eq) {
                eq.update(dt);
            });
            var quads = this.world.calculate();
            this.gra.clear();
            this.gra.lineStyle(1, 0xffffff, 0.8);
            for (var i = 0; i < quads.length; i++) {
                this.gra.beginFill(0xff00ff, 0.5);
                var quad = quads[i];
                this.gra.moveTo(quad.p0.x, quad.p0.y);
                this.gra.lineTo(quad.p1.x, quad.p1.y);
                this.gra.lineTo(quad.p2.x, quad.p2.y);
                this.gra.lineTo(quad.p3.x, quad.p3.y);
                this.gra.closePath();
                this.gra.endFill();
            }
        };
        return Scene;
    }(Container));
    hanyeah.Scene = Scene;
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var Graphics = PIXI.Graphics;
    var Wall = /** @class */ (function (_super) {
        __extends(Wall, _super);
        function Wall(main, p0, p1) {
            var _this = _super.call(this, main) || this;
            _this.gra = new Graphics();
            _this.addChild(_this.gra);
            _this.data = new hanyeah.Segment(_this.main.world, hanyeah.SegmentType.wall);
            _this.p0 = p0;
            _this.p1 = p1;
            return _this;
        }
        Wall.prototype.update = function (dt) {
            _super.prototype.update.call(this, dt);
            this.data.p0.set(this.x + this.p0.x, this.y + this.p0.y);
            this.data.p1.set(this.x + this.p1.x, this.y + this.p1.y);
            //
            this.gra.clear();
            this.gra.lineStyle(1, 0xff0000, 0.8);
            this.gra.moveTo(this.p0.x, this.p0.y);
            this.gra.lineTo(this.p1.x, this.p1.y);
        };
        return Wall;
    }(hanyeah.Equipment));
    hanyeah.Wall = Wall;
})(hanyeah || (hanyeah = {}));
