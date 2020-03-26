declare namespace hanyeah {
    class LightData {
        world: World;
        sp: HPoint;
        seg: Segment;
        constructor(world: World, sp: HPoint);
        destroy(): void;
        getRays(segments: Segment[]): RayData[];
        protected pushRay(rays: RayData[], p: HPoint): void;
        protected removeDuplicate(rays: RayData[]): RayData[];
        /**
         * 获取光源到指定点的光线。
         */
        protected getRay(p: HPoint): RayData;
        /**
         *
         */
        protected getBoundary(): RayData[];
        protected compareFn(a: RayData, b: RayData): number;
    }
}
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
    class Segment {
        world: World;
        p0: HPoint;
        p1: HPoint;
        type: SegmentType;
        constructor(world: World, type: SegmentType);
        destroy(): void;
    }
}
declare namespace hanyeah {
    class CalculateLights {
        quads: QuadData[];
        constructor(lights: LightData[], segments: Segment[]);
        calculateLight(light: LightData, segments: Segment[]): QuadData[];
        simpleQuad(quads: QuadData[]): QuadData[];
        inSameSeg(quad0: QuadData, quad1: QuadData): boolean;
        mergeQuad(quad0: QuadData, quad1: QuadData): void;
        getLeftLine(ray: RayData, segments: Segment[], quad: QuadData): void;
        getRightLine(ray: RayData, segments: Segment[], quad: QuadData): void;
        getMinIntersect(intersects: IntersectResult[], ignoreRight: boolean, ignoreLeft: boolean): IntersectResult;
        getIntersects(ray: RayData, segments: Segment[]): IntersectResult[];
        /**
         * 是否是线段的右端点
         */
        isRightPoint(ray: RayData, p: IPoint, seg: Segment): boolean;
        isRight(p: IPoint, p0: IPoint, p1: IPoint): boolean;
        /**
         * 是否是线段的左端点
         */
        isLeftPoint(ray: RayData, p: IPoint, seg: Segment): boolean;
        isLeft(p: IPoint, p0: IPoint, p1: IPoint): boolean;
    }
    class Calculater {
        lightArr: LineLight[];
        constructor();
        calculate(world: World): QuadData[];
        getLights(quads: QuadData[]): LightData[];
        private getReflectVec;
        getVec(p0: IPoint, p1: IPoint): HPoint;
    }
}
declare namespace hanyeah {
    class HPoint implements IPoint {
        x: number;
        y: number;
        constructor(x?: number, y?: number);
        set(x: number, y: number): void;
        clone(): HPoint;
    }
}
declare namespace hanyeah {
    class IntersectResult {
        p: IPoint;
        seg: Segment;
        d: number;
        ray: RayData;
        constructor(p: IPoint, seg: Segment, d: number, ray: RayData);
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
    /**
     * 线光源
     */
    class LineLight extends LightData {
        p0: HPoint;
        p1: HPoint;
        angle0: number;
        angle1: number;
        type: LightType;
        constructor(world: World, sp: HPoint, p0: HPoint, p1: HPoint, type: LightType);
        destroy(): void;
        /**
         * 获取光源到指定点的光线。
         */
        protected getRay(p: HPoint): RayData;
        /**
         *
         */
        protected getBoundary(): RayData[];
        protected isLegalAng(ang: number): boolean;
        protected compareFn(a: RayData, b: RayData): number;
        private formatAngle;
        private getAngle;
        private getP1;
    }
}
declare namespace hanyeah {
    /**
     * 点光源
     */
    class PointLight extends LightData {
        angle0: number;
        angle1: number;
        constructor(world: World, sp?: HPoint, angle0?: number, angle1?: number);
        destroy(): void;
        /**
         * 获取光源到指定点的光线。
         */
        protected getRay(p: HPoint): RayData;
        protected getBoundary(): RayData[];
        protected getP1ByAngle(ang: number): HPoint;
        protected isLegalAng(ang: number): boolean;
        protected compareFn(a: RayData, b: RayData): number;
        private formatAngle;
    }
}
declare namespace hanyeah {
    class QuadData {
        sp: QuadPoint;
        p0: QuadPoint;
        p1: QuadPoint;
        p2: QuadPoint;
        p3: QuadPoint;
        constructor();
    }
    class QuadPoint implements IPoint {
        x: number;
        y: number;
        seg: Segment;
        constructor(x?: number, y?: number, seg?: Segment);
    }
}
declare namespace hanyeah {
    class RayData {
        p0: HPoint;
        p1: HPoint;
        dir: HPoint;
        angle: number;
        light: LightData;
        constructor(p0: HPoint, p1: HPoint, angle: number, light: LightData);
    }
}
declare namespace hanyeah {
    interface IPoint {
        x: number;
        y: number;
    }
}
declare namespace hanyeah {
    class World {
        calculater: Calculater;
        private lightDataArr;
        private sagmentDataArr;
        constructor();
        addLight(data: LightData): void;
        removeLight(data: LightData): void;
        addSegment(data: Segment): void;
        removeSegment(data: Segment): void;
        getAllLights(): LightData[];
        getAllSegments(): Segment[];
        calculate(): QuadData[];
    }
}
declare namespace hanyeah {
    const enum LightType {
        /** 汇聚 */
        converge = 0,
        /** 发散 */
        diverge = 1
    }
    const enum SegmentType {
        mirror = 0,
        wall = 1,
        light = 2
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
    class AngleData {
        p0: HPoint;
        p1: HPoint;
        angle: number;
        d: number;
        constructor(p0: HPoint, p1: HPoint, ang0: number);
    }
}
declare namespace hanyeah {
    class Light extends Equipment {
        p0: DragAbleCircle;
        p1: DragAbleCircle;
        p2: DragAbleCircle;
        data: PointLight;
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
