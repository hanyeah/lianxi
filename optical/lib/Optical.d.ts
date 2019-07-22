declare namespace hanyeah.optical.geom {
    class Geom implements IGeom {
        x: number;
        y: number;
        rotation: number;
        private matrix;
        private invMatrix;
        protected static getSign(value: number): number;
        constructor();
        clone(): Geom;
        intersectT(ray: Ray): number[];
        intersect(ray: Ray): IntersectResult;
        getNormal(p: Point, normalize?: boolean): Point;
        protected getTbyAbc(result: number[], a: number, b: number, c: number): void;
        containsPoint(p: Point): number;
        toLocal(p: Point): Point;
        toGlobal(p: Point): Point;
        toLocalRay(ray: Ray): Ray;
        toGlobalRay(ray: Ray): Ray;
        setPosition(x: number, y: number): void;
        setRotation(rotation: number): void;
        updateTransform(): void;
        protected getIntersectResult(ray: Ray, t: number): IntersectResult;
    }
}
/**
 * Created by hanyeah on 2019/7/11.
 */
declare namespace hanyeah.optical.geom {
    class Ray extends Geom {
        sp: Point;
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
        geom: IGeom;
        distance: number;
        position: Point;
        normal: Point;
        constructor();
    }
}
/**
 * Created by hanyeah on 2019/7/17.
 */
declare namespace hanyeah.optical {
    import IGeom = hanyeah.optical.geom.IGeom;
    import Point = hanyeah.optical.geom.Point;
    class Example01 {
        ctx: CanvasRenderingContext2D;
        arr: Array<IGeom>;
        private ray;
        private mouseP;
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
    class OpticalWorld {
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
        toLocal(p: Point): Point;
        toGlobal(p: Point): Point;
        toLocalRay(ray: Ray): Ray;
        toGlobalRay(ray: Ray): Ray;
        setPosition(x: number, y: number): any;
        setRotation(rotation: number): any;
        updateTransform(): any;
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
 * Created by hanyeah on 2019/7/15.
 */
declare namespace hanyeah.optical.lens {
    class Lens implements ILens {
        constructor();
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
/**
 * Created by hanyeah on 2019/7/15.
 * 凸凸透镜
 */
declare namespace hanyeah.optical.lens {
    class VVLens extends Lens {
        constructor();
    }
}
