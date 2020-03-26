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
    var LightData = /** @class */ (function () {
        function LightData(world, sp) {
            this.sp = sp || new hanyeah.HPoint();
            this.world = world;
            if (world) {
                world.addLight(this);
            }
        }
        LightData.prototype.destroy = function () {
            if (this.world) {
                this.world.removeLight(this);
                this.world = null;
            }
        };
        LightData.prototype.getRays = function (segments) {
            var result = [];
            var seg;
            for (var i = 0; i < segments.length; i++) {
                seg = segments[i];
                this.pushRay(result, seg.p0);
                this.pushRay(result, seg.p1);
            }
            result.push.apply(result, this.getBoundary());
            result.sort(this.compareFn.bind(this));
            result = this.removeDuplicate(result);
            return result;
        };
        LightData.prototype.pushRay = function (rays, p) {
            var ray = this.getRay(p);
            if (ray) {
                rays.push(ray);
            }
        };
        LightData.prototype.removeDuplicate = function (rays) {
            var ray;
            var result = [];
            for (var i = 0; i < rays.length; i++) {
                if (!(ray && ray.angle === rays[i].angle)) {
                    ray = rays[i];
                    result.push(ray);
                }
            }
            return result;
        };
        /**
         * 获取光源到指定点的光线。
         */
        LightData.prototype.getRay = function (p) {
            return null;
        };
        /**
         *
         */
        LightData.prototype.getBoundary = function () {
            return [];
        };
        LightData.prototype.compareFn = function (a, b) {
            return 0;
        };
        return LightData;
    }());
    hanyeah.LightData = LightData;
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
            _this.data = new hanyeah.Segment(_this.main.world, 0 /* mirror */);
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
        };
        return Mirror;
    }(hanyeah.Equipment));
    hanyeah.Mirror = Mirror;
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var Segment = /** @class */ (function () {
        function Segment(world, type) {
            this.p0 = new hanyeah.HPoint(-10, 0);
            this.p1 = new hanyeah.HPoint(10, 0);
            this.type = type;
            this.world = world;
            world.addSegment(this);
        }
        Segment.prototype.destroy = function () {
            this.world.removeSegment(this);
            this.world = null;
        };
        return Segment;
    }());
    hanyeah.Segment = Segment;
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var ConvergeLineLight = /** @class */ (function (_super) {
        __extends(ConvergeLineLight, _super);
        function ConvergeLineLight(world, sp, p0, p1) {
            var _this = _super.call(this, world, sp) || this;
            _this.angle0 = 0;
            _this.angle1 = 0;
            _this.p0 = p0;
            _this.p1 = p1;
            _this.angle0 = hanyeah.PointUtils.getAngle2(p0, sp);
            _this.angle1 = hanyeah.PointUtils.getAngle2(p1, sp);
            return _this;
        }
        ConvergeLineLight.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        /**
         * 获取光源到指定点的光线。
         */
        ConvergeLineLight.prototype.getRay = function (p) {
            return null;
        };
        /**
         *
         */
        ConvergeLineLight.prototype.getBoundary = function () {
            return [
                new hanyeah.RayData(this.p0.clone(), this.getP1(this.p0), hanyeah.PointUtils.getAngle2(this.p0, this.sp), this),
                new hanyeah.RayData(this.p1.clone(), this.getP1(this.p1), hanyeah.PointUtils.getAngle2(this.p1, this.sp), this)
            ];
        };
        ConvergeLineLight.prototype.compareFn = function (a, b) {
            if (this.angle1 >= this.angle0) {
                return -(a.angle - b.angle);
            }
            return -(this.formatAngle(a.angle) - this.formatAngle(b.angle));
        };
        ConvergeLineLight.prototype.formatAngle = function (ang) {
            if (ang <= this.angle1) {
                ang += 2 * Math.PI;
            }
            return ang;
        };
        ConvergeLineLight.prototype.getP1 = function (p) {
            var vec = { x: this.sp.x - p.x, y: this.sp.y - p.y };
            hanyeah.PointUtils.normalize(vec);
            return new hanyeah.HPoint(p.x + vec.x, p.y + vec.y);
        };
        return ConvergeLineLight;
    }(hanyeah.LightData));
    hanyeah.ConvergeLineLight = ConvergeLineLight;
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var HPoint = /** @class */ (function () {
        function HPoint(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        HPoint.prototype.set = function (x, y) {
            this.x = x;
            this.y = y;
        };
        HPoint.prototype.clone = function () {
            return new HPoint(this.x, this.y);
        };
        return HPoint;
    }());
    hanyeah.HPoint = HPoint;
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var IntersectResult = /** @class */ (function () {
        function IntersectResult(p, seg, d, ray) {
            this.p = p;
            this.seg = seg;
            this.d = d;
            this.ray = ray;
        }
        return IntersectResult;
    }());
    hanyeah.IntersectResult = IntersectResult;
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
    /**
     * 线光源
     */
    var LineLight = /** @class */ (function (_super) {
        __extends(LineLight, _super);
        function LineLight(world, sp, p0, p1) {
            var _this = _super.call(this, world, sp) || this;
            _this.angle0 = 0;
            _this.angle1 = 0;
            _this.p0 = p0;
            _this.p1 = p1;
            _this.angle0 = Math.atan2(p0.y - sp.y, p0.x - sp.x);
            _this.angle1 = Math.atan2(p1.y - sp.y, p1.x - sp.x);
            return _this;
        }
        LineLight.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        /**
         * 获取光源到指定点的光线。
         */
        LineLight.prototype.getRay = function (p) {
            if (hanyeah.PointUtils.isEqual(p, this.p0) || hanyeah.PointUtils.isEqual(p, this.p1)) {
                return null;
            }
            var ang = Math.atan2(p.y - this.sp.y, p.x - this.sp.x);
            if (this.isLegalAng(ang)) {
                var c1 = hanyeah.PointUtils.cross2(this.p0, this.sp, this.p0, this.p1);
                var c2 = hanyeah.PointUtils.cross2(this.p0, p, this.p0, this.p1);
                if (c1 * c2 <= 0) {
                    var sp = hanyeah.LineUtil.intersectRaySegment(this.sp, p, this.p0, this.p1);
                    if (sp) {
                        return new hanyeah.RayData(new hanyeah.HPoint(sp.x, sp.y), p, ang, this);
                    }
                }
            }
            return null;
        };
        /**
         *
         */
        LineLight.prototype.getBoundary = function () {
            return [
                new hanyeah.RayData(this.p0.clone(), this.getP1(this.p0), this.getAngle(this.p0), this),
                new hanyeah.RayData(this.p1.clone(), this.getP1(this.p1), this.getAngle(this.p1), this)
            ];
        };
        LineLight.prototype.isLegalAng = function (ang) {
            if (this.angle1 > this.angle0) {
                return ang >= this.angle0 && ang <= this.angle1;
            }
            return ang <= this.angle1 || ang >= this.angle0;
        };
        LineLight.prototype.compareFn = function (a, b) {
            if (this.angle1 >= this.angle0) {
                return -(a.angle - b.angle);
            }
            return -(this.formatAngle(a.angle) - this.formatAngle(b.angle));
        };
        LineLight.prototype.formatAngle = function (ang) {
            if (ang <= this.angle1) {
                ang += 2 * Math.PI;
            }
            return ang;
        };
        LineLight.prototype.getAngle = function (p) {
            return Math.atan2(p.y - this.sp.y, p.x - this.sp.x);
        };
        LineLight.prototype.getP1 = function (p) {
            var vec = { x: p.x - this.sp.x, y: p.y - this.sp.y };
            hanyeah.PointUtils.normalize(vec);
            return new hanyeah.HPoint(p.x + vec.x, p.y + vec.y);
        };
        return LineLight;
    }(hanyeah.LightData));
    hanyeah.LineLight = LineLight;
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    /**
     * 点光源
     */
    var PointLight = /** @class */ (function (_super) {
        __extends(PointLight, _super);
        function PointLight(world, sp, angle0, angle1) {
            if (sp === void 0) { sp = null; }
            if (angle0 === void 0) { angle0 = 0; }
            if (angle1 === void 0) { angle1 = Math.PI / 2; }
            var _this = _super.call(this, world, sp) || this;
            _this.angle0 = 0;
            _this.angle1 = 0;
            _this.angle0 = angle0;
            _this.angle1 = angle1;
            return _this;
        }
        PointLight.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        /**
         * 获取光源到指定点的光线。
         */
        PointLight.prototype.getRay = function (p) {
            var ang = Math.atan2(p.y - this.sp.y, p.x - this.sp.x);
            if (this.isLegalAng(ang)) {
                return new hanyeah.RayData(this.sp.clone(), p, ang, this);
            }
            return null;
        };
        PointLight.prototype.getBoundary = function () {
            return [
                new hanyeah.RayData(this.sp.clone(), this.getP1ByAngle(this.angle0), this.angle0, this),
                new hanyeah.RayData(this.sp.clone(), this.getP1ByAngle(this.angle1), this.angle1, this)
            ];
        };
        PointLight.prototype.getP1ByAngle = function (ang) {
            return new hanyeah.HPoint(this.sp.x + Math.cos(ang), this.sp.y + Math.sin(ang));
        };
        PointLight.prototype.isLegalAng = function (ang) {
            if (this.angle1 > this.angle0) {
                return ang >= this.angle0 && ang <= this.angle1;
            }
            return ang <= this.angle1 || ang >= this.angle0;
        };
        PointLight.prototype.compareFn = function (a, b) {
            if (this.angle1 >= this.angle0) {
                return -(a.angle - b.angle);
            }
            return -(this.formatAngle(a.angle) - this.formatAngle(b.angle));
        };
        PointLight.prototype.formatAngle = function (ang) {
            if (ang <= this.angle1) {
                ang += 2 * Math.PI;
            }
            return ang;
        };
        return PointLight;
    }(hanyeah.LightData));
    hanyeah.PointLight = PointLight;
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var QuadData = /** @class */ (function () {
        function QuadData() {
            this.sp = new QuadPoint();
            this.p0 = new QuadPoint();
            this.p1 = new QuadPoint();
            this.p2 = new QuadPoint();
            this.p3 = new QuadPoint();
        }
        return QuadData;
    }());
    hanyeah.QuadData = QuadData;
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
    var RayData = /** @class */ (function () {
        function RayData(p0, p1, angle, light) {
            this.p0 = p0;
            this.p1 = p1;
            this.dir = new hanyeah.HPoint(p1.x - p0.x, p1.y - p0.y);
            hanyeah.PointUtils.normalize(this.dir);
            this.angle = angle;
            this.light = light;
        }
        return RayData;
    }());
    hanyeah.RayData = RayData;
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var World = /** @class */ (function () {
        function World() {
            this.calculater = new hanyeah.Calculater();
            this.lightDataArr = [];
            this.sagmentDataArr = [];
        }
        World.prototype.addLight = function (data) {
            this.lightDataArr.push(data);
        };
        World.prototype.removeLight = function (data) {
            var ind = this.lightDataArr.indexOf(data);
            if (ind !== -1) {
                this.lightDataArr.splice(ind, 1);
            }
        };
        World.prototype.addSegment = function (data) {
            this.sagmentDataArr.push(data);
        };
        World.prototype.removeSegment = function (data) {
            var ind = this.sagmentDataArr.indexOf(data);
            if (ind !== -1) {
                this.sagmentDataArr.splice(ind, 1);
            }
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
            return Math.abs(p0.x - p1.x) < 1e-8 && Math.abs(p0.y - p1.y) < 1e-8;
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
    var AngleData = /** @class */ (function () {
        function AngleData(p0, p1, ang0) {
            //
            this.p0 = p0;
            this.p1 = p1;
            this.angle = hanyeah.Utils.formatAngle(hanyeah.PointUtils.getAngle2(p0, p1), ang0);
            this.d = hanyeah.PointUtils.distance(p0, p1);
        }
        return AngleData;
    }());
    hanyeah.AngleData = AngleData;
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var Lens = /** @class */ (function (_super) {
        __extends(Lens, _super);
        function Lens(scene) {
            return _super.call(this, scene) || this;
        }
        return Lens;
    }(hanyeah.Mirror));
    hanyeah.Lens = Lens;
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var Graphics = PIXI.Graphics;
    var Light = /** @class */ (function (_super) {
        __extends(Light, _super);
        function Light(main) {
            var _this = _super.call(this, main) || this;
            _this.gra = new Graphics();
            _this.addChild(_this.gra);
            _this.p0 = new hanyeah.DragAbleCircle(5, 0xff0000, 0, 0);
            _this.p1 = new hanyeah.DragAbleCircle(5, 0xff0000, 30, 50);
            _this.p2 = new hanyeah.DragAbleCircle(5, 0xff0000, -30, 50);
            _this.addChild(_this.p0);
            _this.addChild(_this.p1);
            _this.addChild(_this.p2);
            _this.data = new hanyeah.PointLight(_this.main.world);
            return _this;
        }
        Light.prototype.update = function (dt) {
            _super.prototype.update.call(this, dt);
            this.data.sp.set(this.x + this.p0.x, this.y + this.p0.y);
            this.data.angle0 = Math.atan2(this.p1.y - this.p0.y, this.p1.x - this.p0.x);
            this.data.angle1 = Math.atan2(this.p2.y - this.p0.y, this.p2.x - this.p0.x);
            //
            this.gra.clear();
            this.gra.lineStyle(5, 0x00ffff, 0.8);
            this.gra.moveTo(this.p0.x, this.p0.y);
            this.gra.lineTo(this.p1.x, this.p1.y);
            this.gra.moveTo(this.p0.x, this.p0.y);
            this.gra.lineTo(this.p2.x, this.p2.y);
        };
        return Light;
    }(hanyeah.Equipment));
    hanyeah.Light = Light;
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var CalculateLights = /** @class */ (function () {
        function CalculateLights(lights, segments) {
            var _a;
            this.quads = [];
            for (var i = 0; i < lights.length; i++) {
                (_a = this.quads).push.apply(_a, this.calculateLight(lights[i], segments));
            }
        }
        CalculateLights.prototype.calculateLight = function (light, segments) {
            var rays = light.getRays(segments);
            var result = [];
            var quad = new hanyeah.QuadData();
            quad.sp = new hanyeah.QuadPoint(light.sp.x, light.sp.y);
            result.push(quad);
            var rayData;
            for (var i = 0; i < rays.length; i++) {
                rayData = rays[i];
                if (i === 0) {
                    this.getLeftLine(rays[i], segments, quad);
                }
                else if (i === rays.length - 1) {
                    this.getRightLine(rays[i], segments, quad);
                }
                else {
                    this.getRightLine(rays[i], segments, quad);
                    quad = new hanyeah.QuadData();
                    quad.sp = new hanyeah.QuadPoint(light.sp.x, light.sp.y);
                    result.push(quad);
                    this.getLeftLine(rays[i], segments, quad);
                }
            }
            return this.simpleQuad(result);
        };
        CalculateLights.prototype.simpleQuad = function (quads) {
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
        CalculateLights.prototype.inSameSeg = function (quad0, quad1) {
            return quad0 && quad1 && quad0.p2.seg === quad1.p2.seg;
        };
        CalculateLights.prototype.mergeQuad = function (quad0, quad1) {
            quad0.p2 = quad1.p2;
            quad0.p3 = quad1.p3;
        };
        CalculateLights.prototype.getLeftLine = function (ray, segments, quad) {
            var intersects = this.getIntersects(ray, segments);
            var minIntersect = this.getMinIntersect(intersects, true, false);
            var p1 = minIntersect.p;
            quad.p0 = new hanyeah.QuadPoint(ray.p0.x, ray.p0.y, null);
            quad.p1 = new hanyeah.QuadPoint(p1.x, p1.y, minIntersect.seg);
        };
        CalculateLights.prototype.getRightLine = function (ray, segments, quad) {
            var intersects = this.getIntersects(ray, segments);
            var minIntersect = this.getMinIntersect(intersects, false, true);
            var p1 = minIntersect.p;
            quad.p2 = new hanyeah.QuadPoint(p1.x, p1.y, minIntersect.seg);
            quad.p3 = new hanyeah.QuadPoint(ray.p0.x, ray.p0.y, null);
        };
        CalculateLights.prototype.getMinIntersect = function (intersects, ignoreRight, ignoreLeft) {
            var intersect;
            var minInter;
            for (var i = 0; i < intersects.length; i++) {
                intersect = intersects[i];
                if (intersect.d > 0 && (!minInter || intersect.d < minInter.d)) {
                    if (ignoreRight && this.isRightPoint(intersect.ray, intersect.p, intersect.seg)) {
                        //
                    }
                    else if (ignoreLeft && this.isLeftPoint(intersect.ray, intersect.p, intersect.seg)) {
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
                    if (intersect.seg.type === 1 /* wall */) {
                        minInter = intersect;
                        break;
                    }
                }
            }
            return minInter;
        };
        CalculateLights.prototype.getIntersects = function (ray, segments) {
            var seg;
            var p;
            var result = [];
            for (var i = 0; i < segments.length; i++) {
                seg = segments[i];
                if (seg === ray.light.seg) {
                    continue;
                }
                if (hanyeah.PointUtils.isEqual(ray.p1, seg.p0) || hanyeah.PointUtils.isEqual(ray.p1, seg.p1)) {
                    p = ray.p1;
                }
                else {
                    p = hanyeah.LineUtil.intersectRaySegment(ray.p0, ray.p1, seg.p0, seg.p1);
                }
                if (p) {
                    var d = hanyeah.PointUtils.distance(ray.p0, p);
                    result.push(new hanyeah.IntersectResult(p, seg, d, ray));
                }
            }
            if (result.length === 0) {
                debugger;
                this.getIntersects(ray, segments);
            }
            return result;
        };
        /**
         * 是否是线段的右端点
         */
        CalculateLights.prototype.isRightPoint = function (ray, p, seg) {
            return (hanyeah.PointUtils.isEqual(p, seg.p0) && this.isRight(ray.p0, seg.p0, seg.p1))
                || (hanyeah.PointUtils.isEqual(p, seg.p1) && this.isRight(ray.p0, seg.p1, seg.p0));
        };
        CalculateLights.prototype.isRight = function (p, p0, p1) {
            var c = hanyeah.PointUtils.cross2(p0, p, p0, p1);
            return c < 0;
        };
        /**
         * 是否是线段的左端点
         */
        CalculateLights.prototype.isLeftPoint = function (ray, p, seg) {
            return (hanyeah.PointUtils.isEqual(p, seg.p0) && this.isLeft(ray.p0, seg.p0, seg.p1))
                || (hanyeah.PointUtils.isEqual(p, seg.p1) && this.isLeft(ray.p0, seg.p1, seg.p0));
        };
        CalculateLights.prototype.isLeft = function (p, p0, p1) {
            var c = hanyeah.PointUtils.cross2(p0, p, p0, p1);
            return c > 0;
        };
        return CalculateLights;
    }());
    hanyeah.CalculateLights = CalculateLights;
    var Calculater = /** @class */ (function () {
        function Calculater() {
            this.lightArr = [];
            //
        }
        Calculater.prototype.calculate = function (world) {
            var result = [];
            var lights = world.getAllLights();
            var segments = world.getAllSegments();
            for (var i = 0; i < 2; i++) {
                var quads = new CalculateLights(lights, segments).quads;
                lights = this.getLights(quads);
                if (i === 0) {
                    this.lightArr = lights;
                }
                result.push.apply(result, quads);
            }
            return result;
        };
        Calculater.prototype.getLights = function (quads) {
            var lights = [];
            for (var i = 0; i < quads.length; i++) {
                var quad = quads[i];
                if (quad.p2.seg.type === 0 /* mirror */) {
                    var p0 = quad.sp;
                    var vec = this.getVec(quad.p1, quad.p2);
                    var normal = new hanyeah.HPoint(-vec.y, vec.x);
                    var vec1 = new hanyeah.HPoint(quad.p1.x - quad.p0.x, quad.p1.y - quad.p0.y);
                    var d0 = hanyeah.PointUtils.dot(vec1, normal);
                    var sp = new hanyeah.HPoint(p0.x + d0 * normal.x * 2, p0.y + d0 * normal.y * 2);
                    // const light: LineLight = new LineLight(null, sp, 
                    //   new HPoint(quad.p1.x, quad.p1.y), 
                    //   new HPoint(quad.p2.x, quad.p2.y));
                    var light = new hanyeah.ConvergeLineLight(null, sp, new hanyeah.HPoint(quad.p1.x, quad.p1.y), new hanyeah.HPoint(quad.p2.x, quad.p2.y));
                    light.seg = quad.p2.seg;
                    lights.push(light);
                }
            }
            return lights;
        };
        Calculater.prototype.getReflectVec = function (p0, normal) {
            return new hanyeah.HPoint(p0.x + normal.x * 2, p0.y + normal.y * 2);
        };
        Calculater.prototype.getVec = function (p0, p1) {
            var vec = new hanyeah.HPoint(p1.x - p0.x, p1.y - p0.y);
            hanyeah.PointUtils.normalize(vec);
            return vec;
        };
        return Calculater;
    }());
    hanyeah.Calculater = Calculater;
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
            // this.addEq(new Lens(this), 400, 400);
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
            var _this = this;
            this.eqs.forEach(function (eq) {
                eq.update(dt);
            });
            var quads = this.world.calculate();
            this.gra.clear();
            this.gra.lineStyle(1, 0xffffff, 0.8);
            for (var i = 0; i < quads.length; i++) {
                this.gra.beginFill(0xff00ff, 0.5);
                var quad = quads[i];
                var p = hanyeah.LineUtil.intersectSegmentSegment(quad.p0, quad.p1, quad.p2, quad.p3);
                if (p) {
                    this.gra.moveTo(quad.p0.x, quad.p0.y);
                    this.gra.lineTo(p.x, p.y);
                    this.gra.lineTo(quad.p3.x, quad.p3.y);
                    this.gra.closePath();
                    this.gra.moveTo(p.x, p.y);
                    this.gra.lineTo(quad.p2.x, quad.p2.y);
                    this.gra.lineTo(quad.p1.x, quad.p1.y);
                    this.gra.closePath();
                }
                else {
                    this.gra.moveTo(quad.p0.x, quad.p0.y);
                    this.gra.lineTo(quad.p1.x, quad.p1.y);
                    this.gra.lineTo(quad.p2.x, quad.p2.y);
                    this.gra.lineTo(quad.p3.x, quad.p3.y);
                }
                this.gra.endFill();
            }
            this.world.calculater.lightArr.forEach(function (light) {
                _this.gra.beginFill(0x00ff00, 0.5);
                _this.gra.drawCircle(light.sp.x, light.sp.y, 10);
                _this.gra.endFill();
            });
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
            _this.data = new hanyeah.Segment(_this.main.world, 1 /* wall */);
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
