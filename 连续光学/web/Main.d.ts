declare namespace hanyeah {
    import Container = PIXI.Container;
    class Equipment extends Container {
        main: Scene;
        constructor(main: Scene);
        removed(): void;
        update(dt: number): void;
    }
}
declare namespace hanyeah {
    class World {
        private lightDataArr;
        private sagmentDataArr;
        private calculater;
        constructor();
        addLight(data: LightData): void;
        addSegment(data: Segment): void;
        getAllLights(): LightData[];
        getAllSegments(): Segment[];
        calculate(): Quad[];
    }
}
declare namespace hanyeah {
    class AngleData {
        p0: HPoint;
        p1: HPoint;
        angle: number;
        d: number;
        constructor(p0: HPoint, p1: HPoint, ang0: number);
    }
}
declare namespace hanyeah {
    class Calculater {
        constructor();
        calculate(world: World): Quad[];
        getAngles(light: LightData, segments: Segment[]): AngleData[];
        getInd(angles: AngleData[], light: LightData): number[];
        calculateLight(light: LightData, segments: Segment[]): Quad[];
        simpleQuad(quads: Quad[]): Quad[];
        inSameSeg(quad0: Quad, quad1: Quad): boolean;
        mergeQuad(quad0: Quad, quad1: Quad): void;
        lastLine(light: LightData, segments: Segment[], angData: AngleData, quad: Quad): void;
        middleLine(light: LightData, segments: Segment[], angData: AngleData, quad: Quad): Quad;
        firstLine(light: LightData, segments: Segment[], angData: AngleData, quad: Quad): void;
        getP0(light: LightData, angData: AngleData): IPoint;
        leftLine(light: LightData, segments: Segment[], angData: AngleData, quad: Quad): void;
        rightLine(light: LightData, segments: Segment[], angData: AngleData, quad: Quad): void;
        getMinIntersect(intersects: IntersectResult[], minD: number, ignoreRight: boolean, ignoreLeft: boolean): IntersectResult;
        /**
         * 是否是线段的右端点
         */
        isRightPoint(p: IPoint, seg: Segment): boolean;
        isRight(p: HPoint): boolean;
        /**
         * 是否是线段的左端点
         */
        isLeftPoint(p: IPoint, seg: Segment): boolean;
        isLeft(p: HPoint): boolean;
        getIntersects(p0: IPoint, p1: IPoint, arr: Segment[], ignore: ISegment): IntersectResult[];
    }
}
declare namespace hanyeah {
    class HPoint implements IPoint {
        x: number;
        y: number;
        brother: HPoint;
        owner: ISegment;
        angData: AngleData;
        constructor(x?: number, y?: number, owner?: ISegment);
        set(x: number, y: number): void;
    }
}
declare namespace hanyeah {
    class IntersectResult {
        p: IPoint;
        seg: Segment;
        d: number;
        constructor(p: IPoint, seg: Segment, d: number);
    }
}
declare namespace hanyeah {
    class LightData {
        world: World;
        p0: HPoint;
        p1: HPoint;
        sP: HPoint;
        constructor(world: World);
        destroy(): void;
    }
}
declare namespace hanyeah {
    class Quad {
        p0: QuadPoint;
        p1: QuadPoint;
        p2: QuadPoint;
        p3: QuadPoint;
        constructor();
    }
    class QuadPoint implements IPoint {
        x: number;
        y: number;
        seg: ISegment;
        constructor(x?: number, y?: number, seg?: ISegment);
    }
}
declare namespace hanyeah {
    class Segment {
        world: World;
        p0: HPoint;
        p1: HPoint;
        type: SegmentType;
        constructor(world: World, type: SegmentType);
        destroy(): void;
    }
    enum SegmentType {
        mirror = 0,
        wall = 1,
        light = 2
    }
    interface ISegment {
        p0: HPoint;
        p1: HPoint;
    }
}
declare namespace hanyeah {
    interface IPoint {
        x: number;
        y: number;
    }
}
declare namespace hanyeah {
    class LineUtil {
        /**
         * 两条直线<p1,p2>与<p3,p4>的交点
         * @param p1
         * @param p2
         * @param p3
         * @param p4
         * @returns {null}
         */
        static intersectLineLine(p1: IPoint, p2: IPoint, p3: IPoint, p4: IPoint): IPoint;
        /**
         * 直线<p1,p2>与线段(p3,p4)的交点
         * @param p1
         * @param p2
         * @param p3
         * @param p4
         * @returns {IPoint}
         */
        static intersectLineSegment(p1: IPoint, p2: IPoint, p3: IPoint, p4: IPoint): IPoint;
        /**
         * 射线和直线的交点
         */
        static intersectRayLine(p1: IPoint, p2: IPoint, p3: IPoint, p4: IPoint): IPoint;
        /**
         * 射线和线段的交点
         */
        static intersectRaySegment(p1: IPoint, p2: IPoint, p3: IPoint, p4: IPoint): IPoint;
        /**
         * 点在线段上(包含端点)
         */
        private static pointInSegment;
        /**
         * 点在射线上
         */
        private static pointInRay;
        /**
         * 两条线段(p1,p2)与(p3,p4)的交点
         * @param p1
         * @param p2
         * @param p3
         * @param p4
         * @returns {IPoint}
         */
        static intersectSegmentSegment(p1: IPoint, p2: IPoint, p3: IPoint, p4: IPoint): IPoint;
        /**
         * 得到两条直线<p1,p2>、<p3, p4>相交的交点
         * @param	p1
         * @param	p2
         * @param	p3
         * @param	p4
         * @return {IPoint}
         */
        static lineIntersect(p1: IPoint, p2: IPoint, p3: IPoint, p4: IPoint): IPoint;
        /**
         * 直线 p1-p2 和 p3-p4是否平行
         * 如果(p1,p2)长度很小，或者(p3,p4)长度很小，可能会判断错。所以线段长度推荐用单位向量（或者尽量大一些）
         * @param p1
         * @param p2
         * @param p3
         * @param p4
         * @returns {boolean}
         */
        static isParallel(p1: IPoint, p2: IPoint, p3: IPoint, p4: IPoint): boolean;
        /**
         * 点p是否在线段 (p1,p2) 上
         */
        static containsPoint(p: IPoint, p1: IPoint, p2: IPoint): boolean;
        /**
         * 点到线段的最短距离
         * @param p
         * @param p1
         * @param p2
         * @returns {number}
         */
        static distancePointToSegment(p: IPoint, p1: IPoint, p2: IPoint): number;
        /**
         * 点到线段的最短距离的点。
         * @param p
         * @param p1
         * @param p2
         * @returns {IPoint}
         */
        static pointToSegmentDisPoint(p: IPoint, p1: IPoint, p2: IPoint): IPoint;
        /**
         * 点到直线的距离
         * @param p
         * @param p1
         * @param p2
         * @returns {number}
         */
        static distancePointToLine(p: IPoint, p1: IPoint, p2: IPoint): number;
        /**
         * 计算点到直线的垂足。
         * @param p
         * @param p1
         * @param p2
         * @returns {{x: number, y: number}}
         */
        static getFootPoint(p: IPoint, p1: IPoint, p2: IPoint): IPoint;
    }
}
declare namespace hanyeah {
    class PointUtils {
        /**
         * 两点之间的距离
         * @param p1
         * @param p2
         * @returns {number}
         */
        static distance(p1: IPoint, p2: IPoint): number;
        /**
         * 两点距离的平方
         * @param p1
         * @param p2
         * @returns {number}
         */
        static sqrDistance(p1: IPoint, p2: IPoint): number;
        /**
         * 到原点的长度
         */
        static length0(p: IPoint): number;
        /**
         * 到原点的长度的平方
         */
        static sqrLength(p: IPoint): number;
        /**
         * 归一化
         */
        static normalize(p: IPoint): void;
        /**
         * 点积
         */
        static dot(p0: IPoint, p1: IPoint): number;
        /**
         * 叉乘
         */
        static cross(p0: IPoint, p1: IPoint): number;
        static cross2(p0: IPoint, p1: IPoint, p2: IPoint, p3: IPoint): number;
        /**
         * 获取两点组成的向量角度
         */
        static getAngle2(p0: IPoint, p1: IPoint): number;
        /**
         * 获取两点的中点
         */
        static getMiddleP(p0: IPoint, p1: IPoint): IPoint;
        /**
         * 两点相加
         */
        static addP(p0: IPoint, p1: IPoint): IPoint;
        /**
         * 两个点是否相等
         */
        static isEqual(p0: IPoint, p1: IPoint): boolean;
    }
}
declare namespace hanyeah {
    class Utils {
        static formatAngle(ang: number, ang0: number): number;
    }
}
declare namespace hanyeah {
    import Container = PIXI.Container;
    import InteractionEvent = PIXI.interaction.InteractionEvent;
    import Text = PIXI.Text;
    class DragAbleCircle extends Container {
        private lastP;
        tf: Text;
        constructor(r: number, co: number, x: number, y: number);
        mouseDownHandler: (e: InteractionEvent) => void;
        mouseMoveHandler: (e: InteractionEvent) => void;
        mouseUpHandler: (e: InteractionEvent) => void;
    }
}
declare namespace hanyeah {
    import Application = PIXI.Application;
    import Container = PIXI.Container;
    class Main {
        app: Application;
        stage: Container;
        scene: Scene;
        constructor();
        onLoaded: () => void;
    }
}
declare namespace hanyeah {
    class Light extends Equipment {
        p0: DragAbleCircle;
        p1: DragAbleCircle;
        p2: DragAbleCircle;
        data: LightData;
        private gra;
        constructor(main: Scene);
        update(dt: number): void;
    }
}
declare namespace hanyeah {
    class Mirror extends Equipment {
        p0: DragAbleCircle;
        p1: DragAbleCircle;
        data: Segment;
        private gra;
        constructor(main: Scene);
        update(dt: number): void;
    }
}
declare namespace hanyeah {
    import Container = PIXI.Container;
    class Scene extends Container {
        world: World;
        private gra;
        private eqs;
        constructor();
        addEq(eq: Equipment, x: number, y: number): Equipment;
        update(dt: number): void;
    }
}
declare namespace hanyeah {
    class Wall extends Equipment {
        data: Segment;
        private gra;
        private p0;
        private p1;
        constructor(main: Scene, p0: IPoint, p1: IPoint);
        update(dt: number): void;
    }
}
