/**
 * Created by hanyeah on 2019/10/23.
 */
declare namespace hanyeah.tube {
    class Constants {
        static ATM: number;
        static TK: number;
        static NORM_T: number;
        static R: number;
        static MOL_MASS_AIR: number;
    }
}
/**
 * Created by hanyeah on 2019/10/31.
 */
declare namespace hanyeah.tube {
    class DChemicals {
        static TYPE_GAS: number;
        static TYPE_LIQUID: number;
        static TYPE_SOLID: number;
        type: number;
        protected _mm: number;
        protected _n: number;
        protected _m: number;
        protected _T: number;
        protected _V: number;
        protected _rho: number;
        protected _p: number;
        constructor(mm: number, n: number, T: number);
        mm: number;
        n: number;
        m: number;
        T: number;
        V: number;
        rho: number;
        readonly p: number;
        setAmountV(value: number): void;
        protected updateM(): void;
        protected updateN(): void;
        protected updateRho(): void;
        protected updateV(): void;
        protected updateM2(): void;
        protected updateP(): void;
        protected updateParam(level: number): void;
    }
}
/**
 * Created by hanyeah on 2019/10/23.
 */
declare namespace hanyeah.tube {
    import Point = PIXI.Point;
    class DTube {
        p0: Point;
        p1: Point;
        d: number;
        column0: Column;
        column1: Column;
        private length;
        constructor(p0: Point, p1: Point, d: number, data: DChemicals);
        v2h(v: number): number;
        h2v(h: number): number;
        add(data: DChemicals): void;
        reverseAdd(data: DChemicals): void;
        forEach(callBack: Function): void;
        reverseForEach(callBack: Function): void;
        columnNum(): number;
        getP(g: number): number;
        private updatePrevLength;
        private cutOff;
        private remove;
        private updateNextLength;
        private reverseCutOff;
        private reverseRemove;
    }
}
/**
 * Created by hanyeah on 2019/10/31.
 */
declare namespace hanyeah.tube {
    class DLiquidChemicals extends DChemicals {
        constructor(mm: number, n: number, T: number, rho: number);
        rho: number;
        V: number;
        setAmountV(value: number): void;
    }
}
/**
 * Created by hanyeah on 2019/10/31.
 */
declare namespace hanyeah.tube {
    class DGasChemicals extends DChemicals {
        constructor(mm: number, n: number, T: number, V: number);
        V: number;
        rho: number;
        setAmountV(value: number): void;
    }
}
/**
 * Created by hanyeah on 2019/10/23.
 */
declare namespace hanyeah.tube {
    class Column {
        length: number;
        data: DChemicals;
        next: Column;
        prev: Column;
        prevLength: number;
        nextLength: number;
        constructor(length: number, data: DChemicals);
        destroy(): void;
        getP(g: number): number;
    }
}
/**
 * Created by hanyeah on 2019/10/31.
 */
declare namespace hanyeah.tube {
    class DSolidChemicals extends DChemicals {
        constructor(mm: number, n: number, T: number, rho: number);
        rho: number;
        V: number;
        setAmountV(value: number): void;
    }
}
/**
 * Created by hanyeah on 2019/10/23.
 */
declare namespace hanyeah.tube {
    class Bottle extends PIXI.Container {
        d: number;
        s: number;
        h: number;
        v: number;
        wV: number;
        wH: number;
        p0: number;
        gra: PIXI.Graphics;
        constructor();
        update(dt: number): void;
        updateSkin(): void;
        v2h(v: number): number;
        h2v(h: number): number;
        addWater(v: any): void;
        removeWater(v: any): void;
        getP(g: number, h: number): number;
    }
}
/**
 * Created by hanyeah on 2019/10/23.
 */
declare namespace hanyeah.tube {
    import Point = PIXI.Point;
    class DUtils {
        static PX_PER_M: number;
        static getDir(p0: Point, p1: Point): Point;
        static pointAt(p0: Point, dir: Point, d: number): Point;
        static distance(p0: Point, p1: Point): number;
        static leng(x: number, y: number): number;
        static m2px(m: number): number;
        static px2m(px: number): number;
        static getS(r: number): number;
    }
}
/**
 * Created by hanyeah on 2019/10/23.
 */
declare namespace hanyeah.tube {
    class LiquidData {
        static TYPE_AIR: number;
        static TYPE_WATER: number;
        private static COUNTING;
        rho: number;
        v: number;
        color: number;
        type: number;
        static getWater(): LiquidData;
        static getAir(): LiquidData;
        constructor(type: number, rho: number, v: number, color: number);
        clone(): LiquidData;
    }
}
/**
 * Created by hanyeah on 2019/10/23.
 */
declare namespace hanyeah.tube {
    import DTube = hanyeah.tube.DTube;
    class Main {
        app: PIXI.Application;
        renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
        stage: PIXI.Container;
        ticker: PIXI.ticker.Ticker;
        tube: DTube;
        bottle: Bottle;
        constructor(canvas: HTMLCanvasElement);
        update(dt: number): void;
    }
}
