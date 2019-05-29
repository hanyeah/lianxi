/**
 * Created by wangchengjin on 16/5/11.
 * @class
 * @constructor
 */
class MatrixMath {
    constructor(rows, cols) {
        /**
         * Matrix array holder
         */
        this._m = [];
        /**
         * Error flag
         */
        this._isError = false;
        /**
         * Error message holder
         */
        this._errorMes = "";
        /**
         * Helper variable. Used for calculation of determinant
         */
        this._det = 0.0;
        /**
         * Number of rows of this matrix
         */
        this._rows = rows;
        /**
         * Number of columns of this matrix
         */
        this._columns = cols;

        Object.defineProperty(this, "isError", {
            get: function () {
                return this._isError;
            },
            set: function(value){
                this._isError = value;
            }
        });

        Object.defineProperty(this, "errorMes", {
            get: function () {
                return this._errorMes;
            },
            set: function(value){
                this._errorMes = value;
            }
        });

        Object.defineProperty(this, "detMultiplier", {
            get: function () {
                return this._det;
            }
        });
        Object.defineProperty(this, "rows", {
            get: function () {
                return this._rows;
            }
        });
        Object.defineProperty(this, "columns", {
            get: function () {
                return this._columns;
            }
        });
        Object.defineProperty(this, "m", {
            get: function () {
                return this._m;
            }
        });
        const numElements = rows * cols;
        let i;
        for (i = 0; i < numElements; i++)
        {
            this._m.push(0);
        }
    }

    /**
     * 定义为单位矩阵<br>
     * Defines this instance as an identity matrix
     */
    identity() {
        this._isError = false;
        this._errorMes = "";
        if (this._rows != this._columns)
        {
            this._isError = true;
            this._errorMes = "Number of rows doesn't match number of columns";
            return;
        }
        let i;
        let j;
        for (i = 0; i < this._rows; i++){
            for (j = 0; j < this._columns; j++)
            {
                if (i == j) this._m[j + i * this._columns] = 1;
                else this._m[j + i * this._columns] = 0;
            }
        }
    }

    /**
     * 矩阵乘法<br>
     * Matrices multiplication.
     * Resets this instance's _m property with the multiplication results
     * of this Matrix object and the passed Matrix object.
     * Number of columns of this matrix must be equal to number of rows of the second matrix.
     * Otherwise there will be error.
     * @param	m2 matrix-multiplier
     */
    multiply(m2) {
        this._isError = false;
        this._errorMes = "";
        if (this._columns != m2.rows)
        {
            this._isError = true;
            this._errorMes = "Number of columns of the first matrix doesn't match with number of rows of the second matrix";
            return;
        }

        const m2NumCols2 = m2.columns;
        const tempMatr = new MatrixMath(this._rows, m2NumCols2);
        let i;
        let j;
        let k;
        for (i = 0; i < this._rows; i++)
        {
            for (j = 0; j < m2NumCols2; j++)
            {
                for (k = 0; k < this._columns; k++)
                {
                    tempMatr._m[j + i * m2NumCols2] += this._m[k + i * this._columns] * m2._m[j + k * m2NumCols2];
                }
            }
        }
        return tempMatr;
    }

    /**
     * 标量乘法<br>
     * Scalar multiplication
     * Scales this instance's _m elements by the passed value.
     */
    scalar(s) {
        const numElements = this._rows * this._columns;
        let i;
        for (i = 0; i < numElements; i++)
        {
            this._m[i] *= s;
        }
    }

    /**
     * 矩阵加法<br>
     * Maxtrix addition.
     * Resets this instance's _m property with the addition results
     * of this Matrix object and the passed Matrix object.
     * Numbers of columns and rows of this matrix must be equal to numbers of columns and rows of the second matrix.
     * Otherwise there will be error.
     * @param	m2 matrix to add
     */
    add(m2) {
        this._isError = false;
        this._errorMes = "";

        if (this._rows != m2.rows || this._columns != m2.columns)
        {
            this._isError = true;
            this._errorMes = "Number of columns and rows of the first matrix doesn't match with number of columns and rows of the second matrix";
            return;
        }

        const numElements = this._rows * this._columns;
        let i;
        for (i = 0; i < numElements; i++)
        {
            this._m[i] += m2._m[i];
        }
    }

    /**
     * 矩阵减法<br>
     * Maxtrix substraction.
     * Resets this instance's _m property with the substraction results
     * of this Matrix object and the passed Matrix object.
     * Numbers of columns and rows of this matrix must be equal to numbers of columns and rows of the second matrix.
     * Otherwise there will be error.
     * @param	m2 matrix to substract
     */
    substract(m2) {
        this._isError = false;
        this._errorMes = "";

        if (this._rows != m2.rows || this._columns != m2.columns)
        {
            this._isError = true;
            this._errorMes = "Number of columns and rows of the first matrix doesn't match with number of columns and rows of the second matrix";
            return;
        }

        const numElements = this._rows * this._columns;
        let i;
        for (i = 0; i < numElements; i++)
        {
            this._m[i] -= m2._m[i];
        }
    }

    /**
     * 转置矩阵
     * Transpose this Matrix object
     */
    transpose() {
        const tempMatr = new MatrixMath(this._columns, this._rows);
        let i;
        let j;
        for (i = 0; i < this._rows; i++)
        {
            for (j = 0; j < this._columns; j++)
            {
                tempMatr._m[i + j * this._rows] = this._m[j + i * this._columns];
            }
        }
        return tempMatr;
    }

    /**
     * 转变为上三角矩阵(高斯消去转换)<br>
     * Gaussian elimination process. Will transform this matrix to upper triangular matrix.
     */
    gaussElimination() {
        this._isError = false;
        this._errorMes = "";

        let pivotRow;
        let temp;
        this._det = 1;

        if (this._rows > this._columns - 1)
        {
            this._isError = true;
            this._errorMes = "This matrix doesn't represent any system of equations";
            return;
        }
        let i;
        let j;
        let k;
        for (i = 0; i < this._rows - 1; i++)
        {
            pivotRow = i;
            for (j = i + 1; j < this._rows; j++)
            {
                if (Math.abs(this._m[i + j * this._columns]) > Math.abs(this._m[i + pivotRow * this._columns]))
                {
                    pivotRow = j;
                }
            }
            this.swapRows(i, pivotRow);
            for (j = i + 1; j < this._rows; j++)
            {
                if (this._m[i * (1 + this._columns)] == 0)
                {
                    this._isError = true;
                    this._errorMes = "This system of equations doesn't have any solution";
                    return;
                }

                temp = this._m[i + j * this._columns] / this._m[i * (1 + this._columns)];
                for (k = i; k < this._columns; k++)
                {
                    this._m[k + j * this._columns] -= this._m[k + i * this._columns] * temp;
                }
            }
        }

        if (this._m[(this._rows - 1) * (1 + this._columns)] == 0)
        {
            this._isError = true;
            this._errorMes = "This system of equations doesn't have any solution";
            return;
        }
    }

    /**
     * 逆矩阵<br>
     * Inverse Matrix Calculation
     * @return Iverted Matrix
     */
    inverse() {
        this._isError = false;
        this._errorMes = "";
        const numRows = this._rows;
        const I = new MatrixMath(numRows, numRows);

        if (this._rows != this._columns)
        {
            I.resize(0, 0);
            I.isError = true;
            I.errorMes = "Number of rows doesn't match number of columns";;
            return I;
        }

        let sum;
        const A = this.merge(I);
        const numCols = A.columns;

        let i;
        for (i = 0; i < numRows; i++)
        {
            A._m[(i + numRows) + i * numCols] = 1;
        }

        A.gaussElimination();
        if (A.isError) {
            I.resize(0, 0);
            I.isError = true;
            I.errorMes = A.errorMes;
            return I;
        }

        var column;
        let j;
        for (var column = 0; column < numRows; column++)
        {
            for (i = numRows - 1; i >= 0; i--)
            {
                sum = 0;
                for (j = i + 1; j < numRows; j++)
                {
                    sum += A._m[j + i * numCols] * I._m[column + j * numRows];
                }
                I._m[column + i * numRows] = (A._m[column + numRows + i * numCols] - sum) / A._m[i * (1 + numCols)];
            }
        }

        return I;
    }

    /**
     *
     * Calculation of the determinant of this matrix with Gaussian elimination method. Matrix must be square.
     * @return determinant value
     */
    gaussDeterminant() {
        this._isError = false;
        this._errorMes = "";

        if (this._rows != this._columns)
        {
            this._isError = true;
            this._errorMes = "Number of rows doesn't match number of columns";
            return null;
        }

        const numRows = this._rows;
        const A = this.merge(new MatrixMath(numRows, 1));
        A.gaussElimination();
        if (A.isError)
        {
            this._isError = true;
            this._errorMes = "Some unexpected error";
            return 0;
        }

        this._det = A.detMultiplier;
        const Acols = A.columns;
        let i;
        for (i = 0; i < numRows; i++)
        {
            this._det *= A._m[i * (1 + Acols)];
        }

        return this._det;
    }

    /**
     * 递归法计算	矩阵的行列式值(这种方法非常消耗处理器资源，并且不建议超过8×8)<br>
     * Calculation of the determinant of this matrix with recursive method.
     * This method is very processor-intensive, and not recommended for use with matrices over 8x8 elements
     * @return determinant value
     */
    recursiveDeterminant() {
        this._isError = false;
        this._errorMes = "";

        if (this._rows != this._columns)
        {
            this._isError = true;
            this._errorMes = "Number of rows doesn't match number of columns";
            return null;
        }

        const numRows = this._rows;
        let det = 0;
        let part1;
        let part2;
        let tempMatr;
        let mult;
        let element;

        let i;
        let j;
        if (numRows > 1)
        {
            for (i = 0; i < numRows; i++)
            {
                element = this._m[i];
                if (element != 0)
                {
                    (i % 2 == 0) ? mult = 1 : mult = -1;

                    if (i == 0)
                    {
                        tempMatr = this.fragment(1, 1, numRows - 1, this._columns - 1);
                    }
                    else if (i == numRows - 1)
                    {
                        tempMatr = this.fragment(1, 0, numRows - 1, this.columns - 2);
                    }
                    else
                    {
                        part1 = this.fragment(1, 0, numRows - 1, i - 1);
                        part2 = this.fragment(1, i + 1, numRows - 1, this._columns - 1);
                        tempMatr = part1.merge(part2);
                    }

                    det += mult * element * tempMatr.recursiveDeterminant();
                }
            }
        }
        else
        {
            det = _m[0];
        }

        return det;
    }

    /**
     * 这个矩阵中指定位置插入一个矩阵<br>
     * Insertion of matrix in specified position of this matrix
     * @param	mat matrix to insert
     * @param	row row-position to insert the matrix
     * @param	col column-position to insert the matrix
     * @param	resize resize flag. Matrix size will be enhanced (when there is such need) if this parameter is true
     */
    insert(mat, row, col, resize) {
        const oldRows = this._rows;
        const oldCols = this._columns;

        if (row >= oldRows || col >= oldCols) return;

        let newRows = row + mat.rows;
        let newCols = col + mat.columns;
        newRows = (newRows > oldRows) ? newRows : oldRows;
        newCols = (newCols > oldCols) ? newCols : oldCols;
        if (resize)
        {
            this.resize(newRows, newCols);
        }
        // Вставка значений из вставляемой матрицы
        newRows = row + mat.rows;
        newCols = col + mat.columns;
        const maxRow = (newRows <= this._rows) ? newRows : this._rows;
        const maxCol = (newCols <= this._columns) ? newCols : this._columns;
        let i;
        let j;
        for (i = row; i < maxRow; i++)
        {
            for (j = col; j < maxCol; j++)
            {
                this._m[j + i * this._columns] = mat._m[(j - col) + (i - row) * mat.columns];
            }
        }
    }

    /**
     * 调整矩阵的大小<br>
     * Matrix resize method
     * @param	newRows new number of rows of this matrix
     * @param	newCols new number of columns of this matrix
     */
    resize(newRows, newCols) {
        const oldRows = this._rows;
        const oldCols = this._columns;
        const tempMatr = new MatrixMath(newRows, newCols);
        let i, j;

        for (i = 0; i < newRows; i++)
        {
            if (i < oldRows)
            {
                for (j = 0; j < newCols; j++)
                {
                    if (j < oldCols)
                    {
                        tempMatr._m[j + i * newCols] = this._m[j + i * oldCols];
                    }
                }
            }
        }
        this._rows = newRows;
        this._columns = newCols;
        this._m = tempMatr._m;
    }

    /**
     * 复制这个矩阵的一些片段<br>
     * Copy some fragment of this matrix
     */
    fragment(startRow, startCol, endRow, endCol) {
        if (startRow > this._rows) startRow = this._rows;
        if (startCol > this._columns) startCol = this._columns;
        if (endRow > this._rows) endRow = this._rows;
        if (endCol > this._columns) endCol = this._columns;

        let tempNum;
        if (startRow > endRow)
        {
            tempNum = startRow;
            startRow = endRow;
            endRow = tempNum;
        }
        if (startCol > endCol)
        {
            tempNum = startCol;
            startCol = endCol;
            endCol = tempNum;
        }

        const tempMatrCols = endCol - startCol + 1;
        const tempMatr = new MatrixMath(endRow - startRow + 1, tempMatrCols);
        let i;
        let j;
        for (i = startRow; i <= endRow; i++)
        {
            for (j = startCol; j <= endCol; j++)
            {
                tempMatr._m[j - startCol + (i - startRow) * tempMatrCols] = _m[j + i * this._columns];
            }
        }
        return tempMatr;
    }

    /**
     * 合并矩阵<br>
     * Merge this matrix with matrix m2
     * @param	m2 matrix to merge
     * @return merged matrix
     */
    merge(m2) {
        const secondRows = m2.rows;
        const secondCols = m2.columns;
        const firstRows = this._rows;
        const firstCols = this._columns;

        const tempMatrCols = firstCols + secondCols;
        const tempMatr = new MatrixMath(Math.max(firstRows, secondRows), tempMatrCols);

        let i;
        let j;
        for (i = 0; i < firstRows; i++)
        {
            for (j = 0; j < firstCols; j++)
            {
                tempMatr._m[j + i * tempMatrCols] = this._m[j + i * firstCols];
            }
        }

        for (i = 0; i < secondRows; i++)
        {
            for (j = 0; j < secondCols; j++)
            {
                tempMatr._m[j + firstCols + i * tempMatrCols] = m2._m[j + i * secondCols];
            }
        }

        return tempMatr;
    }

    /**
     * 把矩阵中的两行互换位置<br>
     * Swap two rows of this matrix
     */
    swapRows(row1, row2) {
        if (row1 > this._rows || row2 > this._rows) return;

        if (row1 != row2)
        {
            this._det = -this._det;
            let tempNum;
            let j;
            for (j = 0; j < this._columns; j++)
            {
                tempNum = this._m[j + row1 * this._columns];
                this._m[j + row1 * this._columns] = this._m[j + row2 * this._columns];
                this._m[j + row2 * this._columns] = tempNum;
            }
        }
    }

    /**
     * Defines each matrix element as a random number clamped between passed min-max values.
     */
    random(a, b) {
        const numElements = this._rows * this._columns;
        let i;
        for (i = 0; i < numElements; i++)
        {
            this._m[i] = Math.round(Math.random() * (Math.max(a, b) - Math.min(a, b))) + Math.min(a, b);
        }
    }

    /**
     * 复制矩阵<br>
     * Copy this matrix
     */
    clone() {
        const numElements = this._rows * this._columns;
        const tempMatr = new MatrixMath(this._rows, this._columns);
        let i;
        for (i = 0; i < numElements; i++)
        {
            tempMatr._m[i] = this._m[i];
        }
        return tempMatr;
    }

    /**
     * 设置指定位置的值<br>
     * Sets the element with specified value
     */
    setElement(row, col, value) {
        if (row >= this._rows || col >= this._columns) return;
        this._m[col + row * this._columns] = value;
    }

    /**
     * 返回指定位置的值<br>
     * Gets the value of specified element
     */
    getElement(row, col) {
        if (row >= this._rows || col >= this._columns) return NaN;
        return this._m[col + row * this._columns];
    }

    /**
     * 将二维向量转换为矩阵<br>
     * Sets the Matrix Object properties from two-dimensional Vector
     */
    setMatrixFromRows(rowsVector) {
        const numRows = rowsVector.length;
        const numCols = rowsVector[0].length;
        let i;
        let j;
        for (i = 0; i < numRows; i++)
        {
            if (rowsVector[i].length != numCols) return;
        }

        this._m.length = numRows * numCols;
        for (i = 0; i < numRows; i++)
        {
            for (j = 0; j < numCols; j++)
            {
                this._m[j + i * numCols] = rowsVector[i][j];
            }
        }
        this._rows = numRows;
        this._columns = numCols;
    }

    /**
     * 把一维向量转换为矩阵<br>
     * Sets the Matrix Object properties from one-dimensional Vector and numbers of rows and columns
     */
    setMatrixFromVector(matrixVector, numRows, numCols) {
        const numElements = numRows * numCols;
        if (numElements != matrixVector.length) return;
        let i;
        for (i = 0; i < numElements; i++)
        {
            this._m[i] = matrixVector[i];
        }
        this._rows = numRows;
        this._columns = numCols;
    }

    /**
     * 用于调试 - 跟踪Matrix对象<br>
     * Used for debugging -- traces the Matrix object.
     */
    traceMatrix() {
        let row;
        let i;
        let j;
        for (i = 0; i < this._rows; i++)
        {
            row = "";
            for (j = 0; j < this._columns; j++)
            {
                row += this._m[j + i * this._columns];
                if (j < this._columns - 1) row += "\t";
            }
        }
    }

    /**
     * 高斯法求解线性方程组<br>
     * Gaussian method for solving systems of linear equations.
     * @param	A matrix with variable's coefficients
     * @param	B matrix-row with free coefficients
     * @return matrix-row which contains values of variables
     */
    static GaussSolution(A, B) {
        const numRows = A.rows;
        let sum;
        // Матрица-столбец решения
        const x = new MatrixMath(numRows, 1);

        if (A.rows != A.columns || A.rows != B.rows || B.columns > 1 || B.columns == 0)
        {
            x.resize(0, 0);
            x.isError = true;
            x.errorMes = "Can't solve this system of equations";
            return x;
        }

        // Создание новой матрицы для преобразования к верхнетреугольному виду
        const tempMatr = A.merge(B);
        const tempMatrCols = tempMatr.columns;
        // Прямой ход метода Гаусса
        tempMatr.gaussElimination();
        if (tempMatr.isError)
        {
            x.resize(0, 0);
            x.isError = true;
            x.errorMes = tempMatr.errorMes;
            return x;
        }

        let i;
        let j;
        // Обратный ход метода Гаусса
        for (i = numRows - 1; i >= 0; i--)
        {
            sum = 0;
            for (j = i + 1; j < numRows; j++)
            {
                sum += tempMatr._m[j + i * tempMatrCols] * x._m[j];
            }
            x._m[i] = (tempMatr._m[numRows + i * tempMatrCols] - sum) / tempMatr._m[i * (1 + tempMatrCols)];
        }

        return x;
    }

    /**
     * LUP分解法求解线性方程组<br>
     * LUP Decomposition method for solving systems of linear equations.
     * @param	A matrix with variable's coefficients
     * @param	P permutation matrix-row
     */
    static LUPDecomposition(A, P) {
        if (A.rows != A.columns) return;
        const numRows = A.rows;
        P.resize(numRows, 1);
        let i;
        let j;
        let k;
        for (i = 0; i < numRows; i++)
        {
            P._m[i] = i;
        }
        for (k = 0; k < numRows; k++)
        {
            let p = 0;
            let kk;
            for (i = k; i < numRows; i++)
            {
                if (Math.abs(A._m[k + i * numRows]) > p)
                {
                    p = Math.abs(A._m[k + i * numRows]);
                    kk = i;
                }
            }

            if (p == 0)
            {
                A.isError = true;
                A.errorMes = "Can't solve this system of equations";
                return;
            }
            P.swapRows(k, kk);
            A.swapRows(k, kk);
            for (i = k + 1; i < numRows; i++)
            {
                A._m[k + i * numRows] /= A._m[k * (1 + numRows)];
                for (j = k + 1; j < numRows; j++)
                {
                    A._m[j + i * numRows] -= A._m[k + i * numRows] * A._m[j + k * numRows];
                }
            }
        }
    }

    /**
     * LUP 解线性方程组
     * LUP Solution method for solving systems of linear equations. Must be used after LUP Decomposition method
     * @param	A matrix with variable's coefficients after decomposition
     * @param	P permutation matrix-row after decomposition
     * @param	B matrix-row with free coefficients of this system of linear equations
     * @return matrix-row which contains values of variables
     */
    static LUPSolution(A, P, B) {
        const numRows = A.rows;
        let sum;
        let i, j;
        const x = new MatrixMath(numRows, 1);
        if (A.isError || numRows != A.columns || numRows != P.rows || P.columns != 1 || numRows != B.rows || B.columns != 1)
        {
            x.resize(0, 0);
            x.isError = true;
            x.errorMes = "Can't solve this system of equations";
            return x;
        }

        for (i = 0; i < numRows; i++)
        {
            sum = 0;
            for (j = 0; j < i; j++)
            {
                sum += A._m[j + i * numRows] * x._m[j];
            }
            x._m[i] = B._m[P._m[i]] - sum;
        }

        for (i = numRows - 1; i >= 0; i--)
        {
            sum = 0;
            for (j = i + 1; j < numRows; j++)
            {
                sum += A._m[j + i * numRows] * x._m[j];
            }
            x._m[i] = (x._m[i] - sum) / A._m[i * (1 + numRows)];
        }

        return x;
    }

    /**
     * 克拉默法求解线性方程组(这种方法非常消耗处理器资源，并且不建议超过8×8)<br>
     * Cramer's method for solving systems of linear equations.
     * This method is very processor-intensive, and not recommended for use with matrices over 8x8 elements
     * @param	A matrix with variable's coefficients
     * @param	B matrix-row with free coefficients
     * @return matrix-row which contains values of variables
     */
    static CramerSolution(A, B) {
        const numRows = A.rows;
        const x = new MatrixMath(numRows, 1);
        let tempMatr;

        if (A.rows != A.columns || A.rows != B.rows || B.columns != 1)
        {
            x.resize(0, 0);
            x.isError = true;
            x.errorMes = "Can't solve this system of equations";
            return x;
        }

        const detA = A.recursiveDeterminant();
        if (detA == 0)
        {
            x.resize(0, 0);
            x.isError = true;
            x.errorMes = "The A matrix is not invertible. So I can't solve this system of equations";
            return x;
        }
        else
        {
            let i;
            for (i = 0; i < numRows; i++)
            {
                tempMatr = A.clone();
                tempMatr.insert(B, 0, i);
                x._m[i] = tempMatr.recursiveDeterminant() / detA;
            }
        }

        return x;
    }
}

// module.exports = MatrixMath;