/**
 * Created by hanyeah on 2019/7/11.
 */
declare namespace hanyeah.optical {
    class OpticalWorld {
    }
}
declare namespace hanyeah.optical.geom {
    class Geom implements IGeom {
        protected static getSign(value: number): number;
        constructor();
        clone(): Geom;
        intersectT(ray: Ray): number[];
        intersect(ray: Ray): IntersectResult;
        getNormal(p: Point, normalize?: boolean): Point;
        protected getTbyAbc(result: number[], a: number, b: number, c: number): void;
        containsPoint(p: Point): number;
        protected getIntersectResult(ray: Ray, t: number): IntersectResult;
    }
}
/**
 * Created by hanyeah on 2019/7/11.
 */
declare namespace hanyeah.optical.geom {
    class Circle extends Geom {
        cp: Point;
        private _r;
        private r2;
        constructor(cp: Point, r: number);
        r: number;
        clone(): Circle;
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
    class Segment extends Geom {
        p1: Point;
        p2: Point;
        constructor(p1: Point, p2: Point);
        clone(): Segment;
        intersectT(ray: Ray): number[];
        getNormal(p: Point, normalize?: boolean): Point;
    }
}
