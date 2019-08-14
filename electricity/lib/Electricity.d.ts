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
        index: number;
        private _root;
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
        index: number;
        terminal0: DTerminal;
        terminal1: DTerminal;
        isBreak: boolean;
        constructor();
        destroy(): void;
    }
}
/**
 * Created by hanyeah on 2019/8/12.
 */
declare namespace hanyeah.electricity.graph {
    class Edge extends HObject {
        vertex0: any;
        vertex1: any;
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
 * Created by hanyeah on 2019/8/12.
 */
declare namespace hanyeah.electricity.graph {
    class Vertex extends HObject {
        constructor();
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
