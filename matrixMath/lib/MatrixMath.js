/**
 * Created by hanyeah on 2019/8/15.
 */
var hanyeah;
(function (hanyeah) {
    var MatrixMath = /** @class */ (function () {
        function MatrixMath(rows, cols) {
            this.isError = false;
            this.m = [];
            this.det = 0;
            this.rows = 1;
            this.cols = 1;
            this.numElements = 1;
            this.rows = rows;
            this.cols = cols;
            this.numElements = rows * cols;
            for (var i = 0; i < this.numElements; i++) {
                this.m[i] = 0;
            }
        }
        /**
         * 输出矩阵。
         */
        MatrixMath.traceMatrix = function (matr) {
            var i;
            var j;
            var arr = [];
            for (i = 0; i < matr.rows; i++) {
                var a = [];
                for (j = 0; j < matr.cols; j++) {
                    a[j] = matr.getElement(i, j);
                }
                arr[i] = a.join("\t");
            }
            console.log(arr.join("\n"));
        };
        /**
         * 高斯消去法解线性方程组。
         * @param A
         * @param B
         * @returns {hanyeah.electricity.MatrixMath}
         * @constructor
         */
        MatrixMath.GaussSolution = function (A, B) {
            var numRows = A.rows;
            var sum;
            var x = new MatrixMath(numRows, 1);
            if (A.rows !== A.cols || A.rows !== B.rows || B.cols > 1 || B.cols === 0) {
                x.resize(0, 0);
                x.isError = true;
                return x;
            }
            var tempMatr = A.merge(B);
            var tempMatrCols = tempMatr.cols;
            tempMatr.gaussElimination();
            if (tempMatr.isError) {
                x.resize(0, 0);
                x.isError = true;
                return x;
            }
            var i;
            var j;
            for (i = numRows - 1; i >= 0; i--) {
                sum = 0;
                for (j = i + 1; j < numRows; j++) {
                    sum += tempMatr.m[j + i * tempMatrCols] * x.m[j];
                }
                x.m[i] = (tempMatr.m[numRows + i * tempMatrCols] - sum) / tempMatr.m[i * (1 + tempMatrCols)];
            }
            return x;
        };
        /**
         * LUP分解法求解线性方程组。
         * @param A
         * @param P
         * @constructor
         */
        MatrixMath.LUPDecomposition = function (A, P) {
            if (A.rows !== A.cols) {
                return;
            }
            var numRows = A.rows;
            P.resize(numRows, 1);
            var i;
            var j;
            var k;
            for (i = 0; i < numRows; i++) {
                P.m[i] = i;
            }
            for (k = 0; k < numRows; k++) {
                var p = 0;
                var kk = void 0;
                for (i = k; i < numRows; i++) {
                    if (Math.abs(A.m[k + i * numRows]) > p) {
                        p = Math.abs(A.m[k + i * numRows]);
                        kk = i;
                    }
                }
                if (p === 0) {
                    A.isError = true;
                    return;
                }
                P.swapRows(k, kk);
                A.swapRows(k, kk);
                for (i = k + 1; i < numRows; i++) {
                    A.m[k + i * numRows] /= A.m[k * (1 + numRows)];
                    for (j = k + 1; j < numRows; j++) {
                        A.m[j + i * numRows] -= A.m[k + i * numRows] * A.m[j + k * numRows];
                    }
                }
            }
        };
        /**
         * LUP 解线性方程组。
         * @param A
         * @param P
         * @param B
         * @returns {hanyeah.electricity.MatrixMath}
         * @constructor
         */
        MatrixMath.LUPSolution = function (A, P, B) {
            var numRows = A.rows;
            var sum;
            var i, j;
            var x = new MatrixMath(numRows, 1);
            if (A.isError || numRows !== A.cols || numRows !== P.rows || P.cols !== 1 || numRows !== B.rows || B.cols !== 1) {
                x.resize(0, 0);
                x.isError = true;
                return x;
            }
            for (i = 0; i < numRows; i++) {
                sum = 0;
                for (j = 0; j < i; j++) {
                    sum += A.m[j + i * numRows] * x.m[j];
                }
                x.m[i] = B.m[P.m[i]] - sum;
            }
            for (i = numRows - 1; i >= 0; i--) {
                sum = 0;
                for (j = i + 1; j < numRows; j++) {
                    sum += A.m[j + i * numRows] * x.m[j];
                }
                x.m[i] = (x.m[i] - sum) / A.m[i * (1 + numRows)];
            }
            return x;
        };
        MatrixMath.CramerSolution = function (A, B) {
            var numRows = A.rows;
            var x = new MatrixMath(numRows, 1);
            var tempMatr;
            if (A.rows !== A.cols || A.rows !== B.rows || B.cols !== 1) {
                x.resize(0, 0);
                x.isError = true;
                return x;
            }
            var detA = A.gaussDeterminant();
            if (detA === 0) {
                x.resize(0, 0);
                x.isError = true;
                return x;
            }
            else {
                var i = void 0;
                for (i = 0; i < numRows; i++) {
                    tempMatr = A.clone();
                    tempMatr.insert(B, 0, i);
                    x.m[i] = tempMatr.gaussDeterminant() / detA;
                }
            }
            return x;
        };
        MatrixMath.prototype.clone = function () {
            var tempMatr = new MatrixMath(this.rows, this.cols);
            var m2 = tempMatr.m;
            for (var i = 0; i < this.numElements; i++) {
                m2[i] = this.m[i];
            }
            return tempMatr;
        };
        /**
         * 单位矩阵。
         */
        MatrixMath.prototype.identity = function () {
            var i;
            var j;
            for (i = 0; i < this.rows; i++) {
                for (j = 0; j < this.cols; j++) {
                    this.m[j + i * this.cols] = i === j ? 1 : 0;
                }
            }
        };
        /**
         * 矩阵乘法。
         * @param matr2
         * @returns {MatrixMath}
         */
        MatrixMath.prototype.multiply = function (matr2) {
            var cols2 = matr2.cols;
            var tempMatr = new MatrixMath(this.rows, cols2);
            var i;
            var j;
            var k;
            for (i = 0; i < this.rows; i++) {
                for (j = 0; j < cols2; j++) {
                    for (k = 0; k < this.cols; k++) {
                        tempMatr.m[j + i * cols2] += this.m[k + i * this.cols] * matr2.m[j + k * cols2];
                    }
                }
            }
            return tempMatr;
        };
        /**
         * 标量乘法。
         * @param s
         */
        MatrixMath.prototype.scalar = function (s) {
            for (var i = 0; i < this.numElements; i++) {
                this.m[i] *= s;
            }
            return this;
        };
        MatrixMath.prototype.add = function (matr2) {
            for (var i = 0; i < this.numElements; i++) {
                this.m[i] += matr2.m[i];
            }
            return this;
        };
        MatrixMath.prototype.sub = function (matr2) {
            for (var i = 0; i < this.numElements; i++) {
                this.m[i] -= matr2.m[i];
            }
            return this;
        };
        /**
         * 转置矩阵。
         * @returns {MatrixMath}
         */
        MatrixMath.prototype.transpose = function () {
            var tempMatr = new MatrixMath(this.cols, this.rows);
            var i;
            var j;
            for (i = 0; i < this.rows; i++) {
                for (j = 0; j < this.cols; j++) {
                    tempMatr.m[i + j * this.rows] = this.m[j + i * this.cols];
                }
            }
            return tempMatr;
        };
        /**
         * 转变为上三角矩阵(高斯消去法)
         */
        MatrixMath.prototype.gaussElimination = function () {
            this.isError = false;
            var pivotRow;
            var temp;
            var i;
            var j;
            var k;
            this.det = 1;
            for (i = 0; i < this.rows - 1; i++) {
                pivotRow = i;
                for (j = i + 1; j < this.rows; j++) {
                    if (Math.abs(this.m[i + j * this.cols]) > Math.abs(this.m[i + pivotRow * this.cols])) {
                        pivotRow = j;
                    }
                }
                this.swapRows(i, pivotRow);
                for (j = i + 1; j < this.rows; j++) {
                    if (this.m[i * (1 + this.cols)] === 0) {
                        this.isError = true;
                        console.log("无解");
                        return;
                    }
                    temp = this.m[i + j * this.cols] / this.m[i * (1 + this.cols)];
                    for (k = i; k < this.cols; k++) {
                        this.m[k + j * this.cols] -= this.m[k + i * this.cols] * temp;
                    }
                }
            }
            if (this.m[(this.rows - 1) * (1 + this.cols)] === 0) {
                this.isError = true;
                console.log("无解");
                return;
            }
        };
        /**
         * 逆矩阵。
         * @returns {MatrixMath}
         */
        MatrixMath.prototype.inverse = function () {
            this.isError = false;
            var numRows = this.rows;
            var I = new MatrixMath(numRows, numRows);
            var A = this.merge(I);
            var numCols = A.cols;
            var sum;
            var i;
            for (i = 0; i < numRows; i++) {
                A.m[(i + numRows) + i * numCols] = 1;
            }
            A.gaussElimination();
            if (A.isError) {
                I.resize(0, 0);
                I.isError = true;
                return I;
            }
            var col;
            var j;
            for (col = 0; col < numRows; col++) {
                for (i = numRows - 1; i >= 0; i--) {
                    sum = 0;
                    for (j = i + 1; j < numRows; j++) {
                        sum += A.m[j + i * numCols] * I.m[col + j * numRows];
                    }
                    I.m[col + i * numRows] = (A.m[col + numRows + i * numCols] - sum) / A.m[i * (1 + numCols)];
                }
            }
            return I;
        };
        /**
         * 交换两行。
         * @param row1
         * @param row2
         */
        MatrixMath.prototype.swapRows = function (row1, row2) {
            if (row1 > this.rows || row2 > this.rows) {
                return;
            }
            if (row1 !== row2) {
                this.det = -this.det;
                var tempNum = void 0;
                var j = void 0;
                for (j = 0; j < this.cols; j++) {
                    tempNum = this.m[j + row1 * this.cols];
                    this.m[j + row1 * this.cols] = this.m[j + row2 * this.cols];
                    this.m[j + row2 * this.cols] = tempNum;
                }
            }
        };
        /**
         * 高斯消去法计算行列式的值。
         * @returns {number}
         */
        MatrixMath.prototype.gaussDeterminant = function () {
            this.isError = false;
            var numRows = this.rows;
            var A = this.merge(new MatrixMath(numRows, 1));
            A.gaussElimination();
            if (A.isError) {
                this.isError = true;
                return 0;
            }
            this.det = A.det;
            var acols = A.cols;
            var i;
            for (i = 0; i < numRows; i++) {
                this.det *= A.m[i * (1 + acols)];
            }
            return this.det;
        };
        /**
         * 递归法计算矩阵的行列式值(这种方法非常消耗处理器资源，并且不建议超过8×8)。
         * @returns {any}
         */
        MatrixMath.prototype.recursiveDeterminant = function () {
            this.isError = false;
            var numRows = this.rows;
            var det = 0;
            var part1;
            var part2;
            var tempMatr;
            var mult;
            var element;
            var i;
            if (numRows > 1) {
                for (i = 0; i < numRows; i++) {
                    element = this.m[i];
                    if (element !== 0) {
                        (i % 2 === 0) ? mult = 1 : mult = -1;
                        if (i === 0) {
                            tempMatr = this.fragment(1, 1, numRows - 1, this.cols - 1);
                        }
                        else if (i === numRows - 1) {
                            tempMatr = this.fragment(1, 0, numRows - 1, this.cols - 2);
                        }
                        else {
                            part1 = this.fragment(1, 0, numRows - 1, i - 1);
                            part2 = this.fragment(1, i + 1, numRows - 1, this.cols - 1);
                            tempMatr = part1.merge(part2);
                        }
                        det += mult * element * tempMatr.recursiveDeterminant();
                    }
                }
            }
            else {
                det = this.m[0];
            }
            return det;
        };
        /**
         * 矩阵中指定位置插入一个矩阵。
         * @param mat
         * @param row
         * @param col
         * @param resize
         */
        MatrixMath.prototype.insert = function (mat, row, col) {
            var oldRows = this.rows;
            var oldCols = this.cols;
            if (row >= oldRows || col >= oldCols) {
                return;
            }
            var newRows = row + mat.rows;
            var newCols = col + mat.cols;
            newRows = (newRows > oldRows) ? newRows : oldRows;
            newCols = (newCols > oldCols) ? newCols : oldCols;
            this.resize(newRows, newCols);
            newRows = row + mat.rows;
            newCols = col + mat.cols;
            var maxRow = (newRows <= this.rows) ? newRows : this.rows;
            var maxCol = (newCols <= this.cols) ? newCols : this.cols;
            var i;
            var j;
            for (i = row; i < maxRow; i++) {
                for (j = col; j < maxCol; j++) {
                    this.m[j + i * this.cols] = mat.m[(j - col) + (i - row) * mat.cols];
                }
            }
        };
        /**
         * 合并矩阵。
         * @param matr2
         * @returns {MatrixMath}
         */
        MatrixMath.prototype.merge = function (matr2) {
            var secondRows = matr2.rows;
            var secondCols = matr2.cols;
            var firstRows = this.rows;
            var firstCols = this.cols;
            var tempMatrCols = firstCols + secondCols;
            var tempMatr = new MatrixMath(Math.max(firstRows, secondRows), tempMatrCols);
            var i;
            var j;
            for (i = 0; i < firstRows; i++) {
                for (j = 0; j < firstCols; j++) {
                    tempMatr.m[j + i * tempMatrCols] = this.m[j + i * firstCols];
                }
            }
            for (i = 0; i < secondRows; i++) {
                for (j = 0; j < secondCols; j++) {
                    tempMatr.m[j + firstCols + i * tempMatrCols] = matr2.m[j + i * secondCols];
                }
            }
            return tempMatr;
        };
        /**
         * 调整矩阵大小。
         * @param newRows
         * @param newCols
         */
        MatrixMath.prototype.resize = function (newRows, newCols) {
            var oldRows = this.rows;
            var oldCols = this.cols;
            var tempMatr = new MatrixMath(newRows, newCols);
            var i, j;
            for (i = 0; i < newRows; i++) {
                if (i < oldRows) {
                    for (j = 0; j < newCols; j++) {
                        if (j < oldCols) {
                            tempMatr.m[j + i * newCols] = this.m[j + i * oldCols];
                        }
                    }
                }
            }
            this.rows = newRows;
            this.cols = newCols;
            this.numElements = tempMatr.numElements;
            this.m = tempMatr.m;
        };
        /**
         * 复制矩阵的一些片段。
         * @param startRow
         * @param startCol
         * @param endRow
         * @param endCol
         * @returns {hanyeah.electricity.MatrixMath}
         */
        MatrixMath.prototype.fragment = function (startRow, startCol, endRow, endCol) {
            if (startRow > this.rows)
                startRow = this.rows;
            if (startCol > this.cols)
                startCol = this.cols;
            if (endRow > this.rows)
                endRow = this.rows;
            if (endCol > this.cols)
                endCol = this.cols;
            var tempNum;
            if (startRow > endRow) {
                tempNum = startRow;
                startRow = endRow;
                endRow = tempNum;
            }
            if (startCol > endCol) {
                tempNum = startCol;
                startCol = endCol;
                endCol = tempNum;
            }
            var tempMatrCols = endCol - startCol + 1;
            var tempMatr = new MatrixMath(endRow - startRow + 1, tempMatrCols);
            var i;
            var j;
            for (i = startRow; i <= endRow; i++) {
                for (j = startCol; j <= endCol; j++) {
                    tempMatr.m[j - startCol + (i - startRow) * tempMatrCols] = this.m[j + i * this.cols];
                }
            }
            return tempMatr;
        };
        /**
         * 设置指定位置的值。
         * @param row
         * @param col
         * @param value
         */
        MatrixMath.prototype.setElement = function (row, col, value) {
            if (row >= this.rows || col >= this.cols) {
                return;
            }
            this.m[col + row * this.cols] = value;
        };
        /**
         * 获取指定位置的值。
         * @param row
         * @param col
         * @returns {number}
         */
        MatrixMath.prototype.getElement = function (row, col) {
            if (row >= this.rows || col >= this.cols) {
                return NaN;
            }
            return this.m[col + row * this.cols];
        };
        return MatrixMath;
    }());
    hanyeah.MatrixMath = MatrixMath;
})(hanyeah || (hanyeah = {}));
