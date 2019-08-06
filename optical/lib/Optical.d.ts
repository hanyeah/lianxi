/**
 * Created by hanyeah on 2019/7/29.
 */
declare namespace hanyeah.optical.geom {
    class Space {
        private static COUNTING;
        UID: number;
        x: number;
        y: number;
        rotation: number;
        protected matrix: Matrix;
        protected invMatrix: Matrix;
        protected gMatrix: Matrix;
        protected gInvMatrix: Matrix;
        constructor();
        destroy(): void;
        clone(): Space;
        globalToLocal(p: Point): Point;
        deltaGlobalToLocal(p: Point): Point;
        globalRayToLocalRay(ray: Ray): Ray;
        localToGlobal(p: Point): Point;
        deltaLocalToGlobal(p: Point): Point;
        localRayToGlobal(ray: Ray): Ray;
        setPosition(x: number, y: number): void;
        updateTransform(gMatrix?: Matrix): void;
    }
}
declare namespace hanyeah.optical.geom {
    /**
     * 几何图形基类。
     */
    class Geom extends Space implements IGeom {
        /**
         * 求一元二次方程的根。
         * @param result
         * @param a
         * @param b
         * @param c
         */
        static getTbyAbc(result: number[], a: number, b: number, c: number): void;
        static getSign(value: number): number;
        static In(geom: Geom, p: Point): boolean;
        static Out(geom: Geom, p: Point): boolean;
        static NotIn(geom: Geom, p: Point): boolean;
        static NotOut(geom: Geom, p: Point): boolean;
        static On(geom: Geom, p: Point): boolean;
        constructor();
        /**
         * 克隆。
         * @returns {Geom}
         */
        clone(): Geom;
        /**
         * 计算和射线相交的所有点的t值，射线的表达式为r(t) = o + t*d，t>=0。
         * @param ray
         * @returns {Array}
         */
        intersectT(ray: Ray): number[];
        /**
         *  封装的intersectT。
         * @param ray
         */
        intersectSimpleResult(ray: Ray): SimpleIntersectResult[];
        /**
         * 计算与射线相交的最近的点。
         * @param ray
         * @returns {IntersectResult}
         */
        intersect(ray: Ray): IntersectResult;
        /**
         * 计算所有与射线交互的点。
         * @param ray
         */
        intersects(ray: Ray): IntersectResult[];
        /**
         * 获取法线
         * @param p 图形上的点
         * @param normalize 是否归一化，默认不归一化。
         * @returns {Point} 法线
         */
        getNormal(p: Point, normalize?: boolean): Point;
        /**
         * 点与图形的关系
         * @param p
         * @returns {number} 1：点在图形内，0：点在图形上，-1：点在图形外。
         */
        containsPoint(p: Point): number;
        /**
         * 封装与射线相交的结果。
         * @param ray
         * @param t
         * @returns {IntersectResult}
         */
        getIntersectResult(ray: Ray, t: number): IntersectResult;
        /**
         * 封装与射线相交的结果，转换到全局坐标。
         * @param ray
         * @param lacalRay
         * @param t
         * @returns {IntersectResult}
         */
        getGlobalIntersectResult(ray: Ray, lacalRay: Ray, t: number): IntersectResult;
    }
}
/**
 * Created by hanyeah on 2019/7/11.
 */
declare namespace hanyeah.optical.geom {
    class Ray {
        sp: Point;
        distance: number;
        private _dir;
        constructor(sp: Point, dir: Point);
        dir: Point;
        clone(): Ray;
        getPoint(t: number): Point;
        intersectT(ray: Ray): number[];
        getNormal(p: Point, normalize?: boolean): Point;
    }
}
/**
 * Created by hanyeah on 2019/7/11.
 */
declare namespace hanyeah.optical.geom {
    class Point {
        x: number;
        y: number;
        static add(p1: Point, p2: Point): Point;
        static sub(p1: Point, p2: Point): Point;
        static dot(p1: Point, p2: Point): number;
        static cross(p1: Point, p2: Point): number;
        static rot90(p: Point): Point;
        static rotNeg90(p: Point): Point;
        static interpolate(p1: Point, p2: Point, f: number): Point;
        static getFactor(p1: Point, p2: Point, p: Point): number;
        static distance(p1: Point, p2: Point): number;
        static sqrDistance(p1: Point, p2: Point): number;
        constructor(x?: number, y?: number);
        clone(): Point;
        length(): number;
        sqrLength(): number;
        normalize(value?: number): void;
        negate(): void;
        multiplay(f: any): void;
        divide(f: any): void;
        add(p: Point): void;
        sub(p: Point): void;
        rot90(): void;
        rotNeg90(): void;
        dot(p: Point): number;
        cross(p: Point): number;
        setXY(x: number, y: number): void;
    }
}
/**
 * Created by hanyeah on 2019/7/15.
 */
declare namespace hanyeah.optical.geom {
    class Circle extends Geom {
        r: number;
        constructor(r: number);
        clone(): Circle;
        intersectT(ray: Ray): number[];
        getNormal(p: Point, normalize?: boolean): Point;
        containsPoint(p: Point): number;
    }
}
/**
 * Created by hanyeah on 2019/7/11.
 */
declare namespace hanyeah.optical.geom {
    class Circle2 extends Geom {
        cp: Point;
        r: number;
        constructor(cp: Point, r: number);
        clone(): Circle2;
        intersectT(ray: Ray): number[];
        getNormal(p: Point, normalize?: boolean): Point;
        containsPoint(p: Point): number;
    }
}
declare namespace hanyeah.optical.geom {
    /**
     * 椭圆
     */
    class Ellipse extends Geom {
        a: number;
        b: number;
        private c;
        constructor(a: number, b: number);
        getC(): number;
        clone(): Ellipse;
        setAB(a: number, b: number): void;
        calcC(): void;
        intersectT(ray: Ray): number[];
        getNormal(p: Point, normalize?: boolean): Point;
        containsPoint(p: Point): number;
    }
}
/**
 * Created by hanyeah on 2019/7/11.
 */
declare namespace hanyeah.optical.geom {
    class IntersectResult {
        static noHit: IntersectResult;
        shape: Shape;
        geom: Geom;
        distance: number;
        position: Point;
        normal: Point;
        constructor();
    }
}
/**
 * Created by hanyeah on 2019/7/31.
 */
declare namespace hanyeah.optical.geom {
    class Shape extends Space {
        protected geoms: Array<Geom>;
        constructor();
        destroy(): void;
        addGeom(geom: Geom): void;
        removeGeom(geom: Geom): void;
        removeAllGeoms(): void;
        intersect(ray: Ray): IntersectResult;
        updateTransform(gMatrix?: Matrix): void;
    }
}
/**
 * Created by hanyeah on 2019/7/15.
 */
declare namespace hanyeah.optical.lens {
    import Shape = hanyeah.optical.geom.Shape;
    class Lens extends Shape implements ILens {
        f: number;
        n: number;
        constructor();
    }
}
/**
 * Created by hanyeah on 2019/7/15.
 * 凸凸透镜
 */
declare namespace hanyeah.optical.lens {
    import Circle = hanyeah.optical.geom.Circle;
    import Ray = hanyeah.optical.geom.Ray;
    import IntersectResult = hanyeah.optical.geom.IntersectResult;
    class VVLens extends Lens {
        circleL: Circle;
        circleR: Circle;
        constructor();
        update(): void;
        intersect(ray: Ray): IntersectResult;
    }
}
/**
 * Created by hanyeah on 2019/7/17.
 */
declare namespace hanyeah.optical {
    import Point = hanyeah.optical.geom.Point;
    class Example01 {
        ctx: CanvasRenderingContext2D;
        private mouseP;
        private world;
        constructor(ctx: CanvasRenderingContext2D);
        onMouseMove(e: MouseEvent): void;
        loop(): void;
        drawEllipse(ctx: CanvasRenderingContext2D, x: number, y: number, a: number, b: number, w?: number, co?: string): void;
        drawLine(ctx: CanvasRenderingContext2D, p0: Point, p1: Point, w?: number, co?: string): void;
        drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, w?: number, co?: string): void;
    }
}
/**
 * Created by hanyeah on 2019/7/11.
 */
declare namespace hanyeah.optical {
    import Shape = hanyeah.optical.geom.Shape;
    import IntersectResult = hanyeah.optical.geom.IntersectResult;
    import Ray = hanyeah.optical.geom.Ray;
    class OpticalWorld {
        shapes: Array<Shape>;
        rays: Array<Ray>;
        constructor();
        addShape(shape: Shape): void;
        removeShape(shape: Shape): void;
        addRay(ray: Ray): void;
        removeRay(ray: Ray): void;
        /**
         * 获取与光线碰撞的结果。
         * @param ray
         * @returns {IntersectResult}
         */
        rayCast(ray: Ray): IntersectResult;
        /**
         * 获取所有与光线碰撞的结果。
         * @param ray
         * @param sort
         * @returns {IntersectResult[]}
         */
        rayMultiCast(ray: Ray, sort?: boolean): IntersectResult[];
    }
}
/**
 * Created by hanyeah on 2019/7/12.
 */
declare namespace hanyeah.optical.geom {
    /**
     * 双曲线。
     * x^2 / a^2 - y^2 / b^2 = 1
     */
    class Hyperbola extends Geom {
        a: number;
        b: number;
        private c;
        constructor(a: number, b: number);
        getC(): number;
        clone(): Hyperbola;
        setAB(a: number, b: number): void;
        calcC(): void;
        intersectT(ray: Ray): number[];
        getNormal(p: Point, normalize?: boolean): Point;
        containsPoint(p: Point): number;
    }
}
/**
 * Created by hanyeah on 2019/7/11.
 */
declare namespace hanyeah.optical.geom {
    interface IGeom {
        clone(): IGeom;
        intersect(ray: Ray): IntersectResult;
        getNormal(p: Point, normalize: boolean): Point;
        intersectT(ray: Ray): number[];
        containsPoint(p: Point): number;
    }
}
declare namespace hanyeah.optical.geom {
    class Line extends Geom {
        x0: number;
        constructor(x0: number);
        clone(): Line;
        intersectT(ray: Ray): number[];
        getNormal(p: Point, normalize?: boolean): Point;
        containsPoint(p: Point): number;
    }
}
/**
 * Created by hanyeah on 2019/7/11.
 */
declare namespace hanyeah.optical.geom {
    class Line2 extends Geom {
        p1: Point;
        p2: Point;
        constructor(p1: Point, p2: Point);
        clone(): Line2;
        intersectT(ray: Ray): number[];
        getNormal(p: Point, normalize?: boolean): Point;
    }
}
/**
 * Created by hanyeah on 2019/7/15.
 */
declare namespace hanyeah.optical.geom {
    class Matrix {
        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;
        constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
        clone(): Matrix;
        setMatrix(m: Matrix): void;
        identity(): void;
        rotate(angle: number): void;
        scale(sx: number, sy: number): void;
        translate(dx: number, dy: number): void;
        transformPoint(p: Point): Point;
        deltaTransformPoint(p: Point): Point;
        createBox(sx: number, sy: number, rotation: number, tx: number, ty: number): void;
        concat(m: Matrix): void;
        invert(): void;
        toString(): string;
        toJsonString(): string;
    }
}
declare namespace hanyeah.optical.geom {
    class Parabola extends Geom {
        p: number;
        constructor(p: number);
        clone(): Parabola;
        intersectT(ray: Ray): number[];
        getNormal(p: Point, normalize?: boolean): Point;
        containsPoint(p: Point): number;
    }
}
/**
 * Created by hanyeah on 2019/7/11.
 */
declare namespace hanyeah.optical.geom {
    class Segment extends Geom {
        p1: Point;
        p2: Point;
        constructor(p1: Point, p2: Point);
        clone(): Segment;
        intersectT(ray: Ray): number[];
        getNormal(p: Point, normalize?: boolean): Point;
    }
}
/**
 * Created by hanyeah on 2019/8/2.
 */
declare namespace hanyeah.optical.geom {
    class SimpleIntersectResult {
        t: number;
        geom: Geom;
        constructor(t: number, geom: Geom);
    }
}
/**
 * Created by hanyeah on 2019/7/15.
 * 凹凹透镜
 */
declare namespace hanyeah.optical.lens {
    class CCLens extends Lens {
        constructor();
    }
}
/**
 * Created by hanyeah on 2019/7/15.
 * 凹平透镜
 */
declare namespace hanyeah.optical.lens {
    class CFLens extends Lens {
        constructor();
    }
}
/**
 * Created by hanyeah on 2019/7/15.
 * 凹凸透镜
 */
declare namespace hanyeah.optical.lens {
    class CVLens extends Lens {
        constructor();
    }
}
/**
 * Created by hanyeah on 2019/7/15.
 * 平凹透镜
 */
declare namespace hanyeah.optical.lens {
    class FCLens extends Lens {
        constructor();
    }
}
/**
 * Created by hanyeah on 2019/7/15.
 * 平凸透镜
 */
declare namespace hanyeah.optical.lens {
    class FVLens extends Lens {
        constructor();
    }
}
/**
 * Created by hanyeah on 2019/7/15.
 */
declare namespace hanyeah.optical.lens {
    interface ILens {
    }
}
/**
 * Created by hanyeah on 2019/7/15.
 * 凸凹透镜
 */
declare namespace hanyeah.optical.lens {
    class VCLens extends Lens {
        constructor();
    }
}
/**
 * Created by hanyeah on 2019/7/15.
 * 凸平透镜
 */
declare namespace hanyeah.optical.lens {
    class VFLens extends Lens {
        constructor();
    }
}
