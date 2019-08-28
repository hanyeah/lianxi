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
 * Created by hanyeah on 2019/8/23.
 */
declare namespace hanyeah.electricity.consts {
    enum EdgeType {
        C = 0,
        L = 1,
        VCVS = 2,
        VCCS = 3,
        CCVS = 4,
        CCCS = 5,
        M = 6,
        N = 7,
        U = 8,
        I = 9
    }
}
/**
 * 并查集。
 */
declare namespace hanyeah.electricity.elecData {
    class UnionFindSet extends HObject {
        root: UnionFindSet;
        protected _root: UnionFindSet;
        constructor();
        protected getRoot(): UnionFindSet;
    }
}
/**
 * 图。
 */
declare namespace hanyeah.electricity.graph {
    class Graph extends HObject {
        index: number;
        private vertexs;
        private edges;
        private tEdges;
        private lEdges;
        private vn;
        private en;
        private tn;
        private ln;
        constructor(index: number);
        addEdge(edge: Edge): void;
        addTEdge(edge: Edge): void;
        addLEdge(edge: Edge): void;
        addVertex(vertex: Vertex): void;
        getEn(): number;
        getVn(): number;
        getTn(): number;
        getLn(): number;
        getVertexs(): Vertex[];
        getEdges(): Edge[];
        getTEdges(): Edge[];
        getLEdges(): Edge[];
    }
}
/**
 * Created by hanyeah on 2019/8/12.
 */
declare namespace hanyeah.electricity.graph {
    class Edge extends HObject {
        index: number;
        index2: number;
        vertex0: Vertex;
        vertex1: Vertex;
        SU: number;
        SI: number;
        U: number;
        I: number;
        R: number;
        constructor(index: number);
    }
}
/**
 * Created by hanyeah on 2019/8/12.
 */
declare namespace hanyeah.electricity.graph {
    import UnionFindSet = hanyeah.electricity.elecData.UnionFindSet;
    class Vertex extends UnionFindSet {
        index: number;
        index2: number;
        graphIndex: number;
        U: number;
        constructor(index: number);
    }
}
/**
 * Created by hanyeah on 2019/8/22.
 */
declare namespace hanyeah.electricity.calculaters {
    import Vertex = hanyeah.electricity.graph.Vertex;
    import Edge = hanyeah.electricity.graph.Edge;
    import Graph = hanyeah.electricity.graph.Graph;
    class MethodBase extends HObject {
        constructor();
        /**
         *
         * @param vertexs
         * @param edges
         */
        solve(vertexs: Vertex[], edges: Edge[]): void;
        solveGraph(graph: Graph): void;
    }
}
/**
 * Created by hanyeah on 2019/8/22.
 * 列表法。
 */
declare namespace hanyeah.electricity.calculaters {
    import Graph = hanyeah.electricity.graph.Graph;
    class ListMethod extends MethodBase {
        constructor();
        solveGraph(graph: Graph): void;
    }
}
/**
 * Created by hanyeah on 2019/8/22.
 * 回路阻抗法。
 */
declare namespace hanyeah.electricity.calculaters {
    import Vertex = hanyeah.electricity.graph.Vertex;
    import Edge = hanyeah.electricity.graph.Edge;
    import Graph = hanyeah.electricity.graph.Graph;
    class ImpedanceMethod extends MethodBase {
        constructor();
        /**
         *
         * @param vertexs
         * @param edges
         */
        solve(vertexs: Vertex[], edges: Edge[]): void;
        solveGraph(graph: Graph): void;
    }
}
/**
 * Created by hanyeah on 2019/8/13.
 */
declare namespace hanyeah.electricity.elecData {
    class DTerminal extends UnionFindSet {
        index: number;
        U: number;
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
        index: number;
        terminal0: DTerminal;
        terminal1: DTerminal;
        isBreak: boolean;
        constructor();
        destroy(): void;
        getY(omiga: number): number;
        getZ(omiga: number): number;
    }
}
/**
 * Created by hanyeah on 2019/8/22.
 * 导纳矩阵法。
 */
declare namespace hanyeah.electricity.calculaters {
    import Graph = hanyeah.electricity.graph.Graph;
    class AdmittanceMethod extends MethodBase {
        constructor();
        solveGraph(graph: Graph): void;
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
/**
 * Created by hanyeah on 2019/8/15.
 */
declare namespace hanyeah.electricity {
    class MatrixMath {
        isError: boolean;
        m: number[];
        det: number;
        rows: number;
        cols: number;
        numElements: number;
        /**
         * 输出矩阵。
         */
        static traceMatrix(matr: MatrixMath): void;
        /**
         * 高斯消去法解线性方程组。
         * @param A
         * @param B
         * @returns {hanyeah.electricity.MatrixMath}
         * @constructor
         */
        static GaussSolution(A: MatrixMath, B: MatrixMath): MatrixMath;
        /**
         * LUP分解法求解线性方程组。
         * @param A
         * @param P
         * @constructor
         */
        static LUPDecomposition(A: MatrixMath, P: MatrixMath): void;
        /**
         * LUP 解线性方程组。
         * @param A
         * @param P
         * @param B
         * @returns {hanyeah.electricity.MatrixMath}
         * @constructor
         */
        static LUPSolution(A: MatrixMath, P: MatrixMath, B: MatrixMath): MatrixMath;
        static CramerSolution(A: MatrixMath, B: MatrixMath): MatrixMath;
        constructor(rows: any, cols: any);
        clone(): MatrixMath;
        /**
         * 单位矩阵。
         */
        identity(): void;
        /**
         * 矩阵乘法。
         * @param matr2
         * @returns {MatrixMath}
         */
        multiply(matr2: MatrixMath): MatrixMath;
        /**
         * 标量乘法。
         * @param s
         */
        scalar(s: number): MatrixMath;
        add(matr2: MatrixMath): MatrixMath;
        sub(matr2: MatrixMath): MatrixMath;
        /**
         * 转置矩阵。
         * @returns {MatrixMath}
         */
        transpose(): MatrixMath;
        /**
         * 转变为上三角矩阵(高斯消去法)
         */
        gaussElimination(): void;
        /**
         * 逆矩阵。
         * @returns {MatrixMath}
         */
        inverse(): MatrixMath;
        /**
         * 交换两行。
         * @param row1
         * @param row2
         */
        swapRows(row1: number, row2: number): void;
        /**
         * 高斯消去法计算行列式的值。
         * @returns {number}
         */
        gaussDeterminant(): number;
        /**
         * 递归法计算矩阵的行列式值(这种方法非常消耗处理器资源，并且不建议超过8×8)。
         * @returns {any}
         */
        recursiveDeterminant(): number;
        /**
         * 矩阵中指定位置插入一个矩阵。
         * @param mat
         * @param row
         * @param col
         * @param resize
         */
        insert(mat: MatrixMath, row: number, col: number): void;
        /**
         * 合并矩阵。
         * @param matr2
         * @returns {MatrixMath}
         */
        merge(matr2: MatrixMath): MatrixMath;
        /**
         * 调整矩阵大小。
         * @param newRows
         * @param newCols
         */
        resize(newRows: number, newCols: number): void;
        /**
         * 复制矩阵的一些片段。
         * @param startRow
         * @param startCol
         * @param endRow
         * @param endCol
         * @returns {hanyeah.electricity.MatrixMath}
         */
        fragment(startRow: number, startCol: number, endRow: number, endCol: number): MatrixMath;
        /**
         * 设置指定位置的值。
         * @param row
         * @param col
         * @param value
         */
        setElement(row: number, col: number, value: number): void;
        /**
         * 获取指定位置的值。
         * @param row
         * @param col
         * @returns {number}
         */
        getElement(row: number, col: number): number;
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
