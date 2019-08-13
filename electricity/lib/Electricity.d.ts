/**
 * Created by hanyeah on 2019/8/12.
 */
declare namespace hanyeah.electricity {
    class HObject {
        private static COUNTING;
        private static TIME;
        UID: number;
        constructor();
        destroy(): void;
    }
}
/**
 * Created by hanyeah on 2019/8/13.
 */
declare namespace hanyeah.electricity.elecData {
    class DTerminal extends HObject {
        root: DTerminal;
        root2: DTerminal;
        private _root;
        private _root2;
        private prev;
        private next;
        constructor();
        destroy(): void;
        connect(terminal: DTerminal): void;
        disConnect(): void;
    }
}
/**
 * Created by hanyeah on 2019/8/13.
 */
declare namespace hanyeah.electricity.elecData {
    class DTwoTerminalElement extends HObject {
        SI: number;
        SU: number;
        U: number;
        I: number;
        R: number;
        C: number;
        L: number;
        isBreak: boolean;
        isShortCircuit: boolean;
        readonly terminal0: DTerminal;
        readonly terminal1: DTerminal;
        private _terminal0;
        private _terminal1;
        constructor();
        destroy(): void;
        repair(): void;
    }
}
/**
 * Created by hanyeah on 2019/8/12.
 */
declare namespace hanyeah.electricity.graph {
    class Vertex extends HObject {
        constructor();
    }
}
/**
 * Created by hanyeah on 2019/8/12.
 */
declare namespace hanyeah.electricity.graph {
    class Edge extends HObject {
        vertex1: any;
        vertex2: any;
        constructor();
    }
}
/**
 * Created by hanyeah on 2019/8/13.
 */
declare namespace hanyeah.electricity {
    import DTwoTerminalElement = hanyeah.electricity.elecData.DTwoTerminalElement;
    class ElectricityCalculater {
        constructor();
        calculate(elements: Array<DTwoTerminalElement>): void;
    }
}
/**
 * Created by hanyeah on 2019/8/12.
 */
declare namespace hanyeah.electricity {
    import DTwoTerminalElement = hanyeah.electricity.elecData.DTwoTerminalElement;
    class ElectricityWorld extends HObject {
        calculater: ElectricityCalculater;
        private elements;
        constructor();
        hasElement(element: DTwoTerminalElement): boolean;
        addElement(element: DTwoTerminalElement): void;
        removeElement(element: DTwoTerminalElement): void;
        calculate(): void;
    }
}
/**
 * Created by hanyeah on 2019/8/13.
 */
declare namespace hanyeah.electricity.examples {
    class Example01 {
        constructor(ctx: CanvasRenderingContext2D);
    }
}
