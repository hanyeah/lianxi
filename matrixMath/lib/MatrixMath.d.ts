/**
 * Created by hanyeah on 2019/8/15.
 */
declare namespace hanyeah {
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
