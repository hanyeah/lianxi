var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Created by hanyeah on 2019/8/12.
 */
var hanyeah;
(function (hanyeah) {
    var electricity;
    (function (electricity) {
        var HObject = /** @class */ (function () {
            function HObject() {
                this.UID = HObject.TIME + (HObject.COUNTING++);
            }
            HObject.prototype.destroy = function () {
                //
            };
            HObject.COUNTING = 1;
            HObject.TIME = 0; // new Date().getTime();
            return HObject;
        }());
        electricity.HObject = HObject;
    })(electricity = hanyeah.electricity || (hanyeah.electricity = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/8/23.
 */
var hanyeah;
(function (hanyeah) {
    var electricity;
    (function (electricity) {
        var consts;
        (function (consts) {
            var EdgeType;
            (function (EdgeType) {
                EdgeType[EdgeType["C"] = 0] = "C";
                EdgeType[EdgeType["L"] = 1] = "L";
                EdgeType[EdgeType["VCVS"] = 2] = "VCVS";
                EdgeType[EdgeType["VCCS"] = 3] = "VCCS";
                EdgeType[EdgeType["CCVS"] = 4] = "CCVS";
                EdgeType[EdgeType["CCCS"] = 5] = "CCCS";
                EdgeType[EdgeType["M"] = 6] = "M";
                EdgeType[EdgeType["N"] = 7] = "N";
                EdgeType[EdgeType["U"] = 8] = "U";
                EdgeType[EdgeType["I"] = 9] = "I";
            })(EdgeType = consts.EdgeType || (consts.EdgeType = {}));
        })(consts = electricity.consts || (electricity.consts = {}));
    })(electricity = hanyeah.electricity || (hanyeah.electricity = {}));
})(hanyeah || (hanyeah = {}));
/**
 * 并查集。
 */
var hanyeah;
(function (hanyeah) {
    var electricity;
    (function (electricity) {
        var elecData;
        (function (elecData) {
            var UnionFindSet = /** @class */ (function (_super) {
                __extends(UnionFindSet, _super);
                function UnionFindSet() {
                    var _this = _super.call(this) || this;
                    _this._root = _this;
                    return _this;
                }
                Object.defineProperty(UnionFindSet.prototype, "root", {
                    get: function () {
                        return this.getRoot();
                    },
                    set: function (_root) {
                        this._root = _root;
                    },
                    enumerable: true,
                    configurable: true
                });
                UnionFindSet.prototype.getRoot = function () {
                    if (this._root._root !== this._root) {
                        var root = this._root._root;
                        while (root !== root._root) {
                            root = root._root;
                        }
                        var son = this._root;
                        var temp = void 0;
                        while (son !== root) {
                            temp = son._root;
                            son._root = root;
                            son = temp;
                        }
                        this._root = root;
                    }
                    return this._root;
                };
                return UnionFindSet;
            }(electricity.HObject));
            elecData.UnionFindSet = UnionFindSet;
        })(elecData = electricity.elecData || (electricity.elecData = {}));
    })(electricity = hanyeah.electricity || (hanyeah.electricity = {}));
})(hanyeah || (hanyeah = {}));
/**
 * 图。
 */
var hanyeah;
(function (hanyeah) {
    var electricity;
    (function (electricity) {
        var graph;
        (function (graph) {
            var Graph = /** @class */ (function (_super) {
                __extends(Graph, _super);
                function Graph(index) {
                    var _this = _super.call(this) || this;
                    _this.index = -1;
                    _this.vertexs = [];
                    _this.edges = [];
                    _this.tEdges = [];
                    _this.lEdges = [];
                    _this.vn = 0;
                    _this.en = 0;
                    _this.tn = 0;
                    _this.ln = 0;
                    _this.index = index;
                    return _this;
                }
                Graph.prototype.addEdge = function (edge) {
                    this.edges[this.en] = edge;
                    edge.index2 = this.en;
                    this.en++;
                };
                Graph.prototype.addTEdge = function (edge) {
                    this.tEdges[this.tn] = edge;
                    edge.index2 = this.tn;
                    this.tn++;
                };
                Graph.prototype.addLEdge = function (edge) {
                    this.lEdges[this.ln] = edge;
                    edge.index2 = this.ln;
                    this.ln++;
                };
                Graph.prototype.addVertex = function (vertex) {
                    this.vertexs[this.vn] = vertex;
                    vertex.index2 = this.vn;
                    this.vn++;
                };
                Graph.prototype.getEn = function () {
                    return this.en;
                };
                Graph.prototype.getVn = function () {
                    return this.vn;
                };
                Graph.prototype.getTn = function () {
                    return this.tn;
                };
                Graph.prototype.getLn = function () {
                    return this.ln;
                };
                Graph.prototype.getVertexs = function () {
                    return this.vertexs;
                };
                Graph.prototype.getEdges = function () {
                    return this.edges;
                };
                Graph.prototype.getTEdges = function () {
                    return this.tEdges;
                };
                Graph.prototype.getLEdges = function () {
                    return this.lEdges;
                };
                return Graph;
            }(electricity.HObject));
            graph.Graph = Graph;
        })(graph = electricity.graph || (electricity.graph = {}));
    })(electricity = hanyeah.electricity || (hanyeah.electricity = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/8/12.
 */
var hanyeah;
(function (hanyeah) {
    var electricity;
    (function (electricity) {
        var graph;
        (function (graph) {
            var Edge = /** @class */ (function (_super) {
                __extends(Edge, _super);
                function Edge(index) {
                    var _this = _super.call(this) || this;
                    _this.index = -1;
                    _this.index2 = -1;
                    _this.SU = 0;
                    _this.SI = 0;
                    _this.R = 0;
                    _this.index = index;
                    return _this;
                }
                return Edge;
            }(electricity.HObject));
            graph.Edge = Edge;
        })(graph = electricity.graph || (electricity.graph = {}));
    })(electricity = hanyeah.electricity || (hanyeah.electricity = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/8/12.
 */
var hanyeah;
(function (hanyeah) {
    var electricity;
    (function (electricity) {
        var graph;
        (function (graph) {
            var UnionFindSet = hanyeah.electricity.elecData.UnionFindSet;
            var Vertex = /** @class */ (function (_super) {
                __extends(Vertex, _super);
                function Vertex(index) {
                    var _this = _super.call(this) || this;
                    _this.index = -1;
                    _this.index2 = -1;
                    _this.graphIndex = -1;
                    _this.index = index;
                    return _this;
                }
                return Vertex;
            }(UnionFindSet));
            graph.Vertex = Vertex;
        })(graph = electricity.graph || (electricity.graph = {}));
    })(electricity = hanyeah.electricity || (hanyeah.electricity = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/8/22.
 */
var hanyeah;
(function (hanyeah) {
    var electricity;
    (function (electricity) {
        var calculaters;
        (function (calculaters) {
            var Graph = hanyeah.electricity.graph.Graph;
            var MethodBase = /** @class */ (function (_super) {
                __extends(MethodBase, _super);
                function MethodBase() {
                    return _super.call(this) || this;
                }
                /**
                 *
                 * @param vertexs
                 * @param edges
                 */
                MethodBase.prototype.solve = function (vertexs, edges) {
                    // 连通图
                    var vLen = vertexs.length;
                    var eLen = edges.length;
                    var vertex0;
                    var vertex1;
                    var n = 0;
                    var edge;
                    var graphs = [];
                    var graph;
                    var vertex;
                    for (var i = 0; i < eLen; i++) {
                        edge = edges[i];
                        vertex0 = edge.vertex0;
                        vertex1 = edge.vertex1;
                        vertex = vertex0.root;
                        if (vertex.graphIndex === -1) {
                            graph = new Graph(n);
                            graphs[n] = graph;
                            vertex.graphIndex = n;
                            n++;
                        }
                        else {
                            graph = graphs[vertex.graphIndex];
                        }
                        if (vertex0.index2 === -1) {
                            graph.addVertex(vertex0);
                        }
                        if (vertex1.index2 === -1) {
                            graph.addVertex(vertex1);
                        }
                        graph.addEdge(edge);
                    }
                    //
                    for (var i = 0; i < graphs.length; i++) {
                        this.solveGraph(graphs[i]);
                    }
                };
                MethodBase.prototype.solveGraph = function (graph) {
                    //
                };
                return MethodBase;
            }(electricity.HObject));
            calculaters.MethodBase = MethodBase;
        })(calculaters = electricity.calculaters || (electricity.calculaters = {}));
    })(electricity = hanyeah.electricity || (hanyeah.electricity = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/8/22.
 * 列表法。
 */
var hanyeah;
(function (hanyeah) {
    var electricity;
    (function (electricity) {
        var calculaters;
        (function (calculaters) {
            var ListMethod = /** @class */ (function (_super) {
                __extends(ListMethod, _super);
                function ListMethod() {
                    return _super.call(this) || this;
                }
                ListMethod.prototype.solveGraph = function (graph) {
                    var vertexs = graph.getVertexs();
                    var edges = graph.getEdges();
                    var rows = vertexs.length - 1;
                    var cols = edges.length;
                    var edge;
                    var n0 = rows + cols;
                    var n = n0 + cols;
                    var M = new electricity.MatrixMath(n, n);
                    var Y = new electricity.MatrixMath(n, 1);
                    var r0;
                    var r1;
                    var ri;
                    var ni;
                    for (var i = 0; i < cols; i++) {
                        edge = edges[i];
                        r0 = edge.vertex0.index2;
                        r1 = edge.vertex1.index2;
                        ri = rows + i;
                        ni = n0 + i;
                        // A
                        M.setElement(r0, ni, 1);
                        M.setElement(r1, ni, -1);
                        // -AT
                        M.setElement(ri, r0, -1);
                        M.setElement(ri, r1, 1);
                        // I
                        M.setElement(ri, ri, 1);
                        // F
                        if (edge.SU) {
                            M.setElement(ni, ri, 1);
                            M.setElement(ni, ni, 0);
                        }
                        else if (edge.SI) {
                            M.setElement(ni, ri, 0);
                            M.setElement(ni, ni, 1);
                        }
                        else if (edge.R === 0) {
                            M.setElement(ni, ri, -1);
                            M.setElement(ni, ni, edge.R);
                        }
                        else {
                            M.setElement(ni, ri, 1 / edge.R);
                            M.setElement(ni, ni, -1);
                        }
                        // Us + Is
                        Y.setElement(ni, 0, edge.SU + edge.SI);
                    }
                    console.log("M:");
                    electricity.MatrixMath.traceMatrix(M);
                    console.log("Y:");
                    electricity.MatrixMath.traceMatrix(Y);
                    var X = electricity.MatrixMath.GaussSolution(M, Y);
                    console.log("x:");
                    electricity.MatrixMath.traceMatrix(X);
                };
                return ListMethod;
            }(calculaters.MethodBase));
            calculaters.ListMethod = ListMethod;
        })(calculaters = electricity.calculaters || (electricity.calculaters = {}));
    })(electricity = hanyeah.electricity || (hanyeah.electricity = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/8/22.
 * 回路阻抗法。
 */
var hanyeah;
(function (hanyeah) {
    var electricity;
    (function (electricity) {
        var calculaters;
        (function (calculaters) {
            var Graph = hanyeah.electricity.graph.Graph;
            var ImpedanceMethod = /** @class */ (function (_super) {
                __extends(ImpedanceMethod, _super);
                function ImpedanceMethod() {
                    return _super.call(this) || this;
                }
                /**
                 *
                 * @param vertexs
                 * @param edges
                 */
                ImpedanceMethod.prototype.solve = function (vertexs, edges) {
                    // 连通图
                    var vLen = vertexs.length;
                    var eLen = edges.length;
                    var vertex0;
                    var vertex1;
                    var n = 0;
                    var edge;
                    var graphs = [];
                    var graph;
                    var vertex;
                    for (var i = 0; i < eLen; i++) {
                        edge = edges[i];
                        vertex0 = edge.vertex0;
                        vertex1 = edge.vertex1;
                        vertex = vertex0.root;
                        if (vertex.graphIndex === -1) {
                            graph = new Graph(n);
                            graphs[n] = graph;
                            vertex.graphIndex = n;
                            n++;
                        }
                        else {
                            graph = graphs[vertex.graphIndex];
                        }
                        if (vertex0.index2 === -1 || vertex1.index2 === -1) {
                            graph.addTEdge(edge);
                        }
                        else {
                            graph.addLEdge(edge);
                        }
                        if (vertex0.index2 === -1) {
                            graph.addVertex(vertex0);
                        }
                        if (vertex1.index2 === -1) {
                            graph.addVertex(vertex1);
                        }
                    }
                    //
                    for (var i = 0; i < graphs.length; i++) {
                        this.solveGraph(graphs[i]);
                    }
                };
                ImpedanceMethod.prototype.solveGraph = function (graph) {
                    var vertexs = graph.getVertexs();
                    var tEdges = graph.getTEdges();
                    var lEdges = graph.getLEdges();
                    var vn = graph.getVn() - 1;
                    var tn = graph.getTn();
                    var ln = graph.getLn();
                    var AT = new electricity.MatrixMath(vn, tn);
                    var AL = new electricity.MatrixMath(vn, ln);
                    var edge;
                    for (var i = 0; i < tn; i++) {
                        edge = tEdges[i];
                        AT.setElement(edge.vertex0.index2, i, 1);
                        AT.setElement(edge.vertex1.index2, i, -1);
                    }
                    for (var i = 0; i < ln; i++) {
                        edge = lEdges[i];
                        AL.setElement(edge.vertex0.index2, i, 1);
                        AL.setElement(edge.vertex1.index2, i, -1);
                    }
                    // BF=[BT, IL]=[-(AT¹·AL)',IL]
                    var BT = AT.inverse().multiply(AL).transpose();
                    BT.scalar(-1);
                    var IL = new electricity.MatrixMath(ln, ln);
                    IL.identity();
                    var BF = BT.merge(IL);
                    //
                    var en = tn + ln;
                    var edges = tEdges.concat(lEdges);
                    // 关联矩阵。
                    var A = new electricity.MatrixMath(vn, en);
                    // 支路电压源矩阵
                    var US = new electricity.MatrixMath(en, 1);
                    // 支路电流源矩阵
                    var IS = new electricity.MatrixMath(en, 1);
                    // 支路导纳矩阵
                    var Z = new electricity.MatrixMath(en, en);
                    for (var i = 0; i < en; i++) {
                        edge = edges[i];
                        A.setElement(edge.vertex0.index2, i, 1);
                        A.setElement(edge.vertex1.index2, i, -1);
                        US.setElement(i, 0, edge.SU);
                        IS.setElement(i, 0, edge.SI);
                        Z.setElement(i, i, edge.R);
                    }
                    //
                    var BZ = BF.multiply(Z);
                    BF.resize(en, en);
                    BZ.resize(en, en);
                    var BZA = BZ.clone();
                    BZA.insert(A, en - vn, 0);
                    var BU = BF.multiply(US);
                    var BZI = BZ.multiply(IS);
                    var BUBZI = BU.clone().sub(BZI);
                    var IB = electricity.MatrixMath.GaussSolution(BZA, BUBZI);
                    console.log("IB");
                    electricity.MatrixMath.traceMatrix(IB);
                };
                return ImpedanceMethod;
            }(calculaters.MethodBase));
            calculaters.ImpedanceMethod = ImpedanceMethod;
        })(calculaters = electricity.calculaters || (electricity.calculaters = {}));
    })(electricity = hanyeah.electricity || (hanyeah.electricity = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/8/13.
 */
var hanyeah;
(function (hanyeah) {
    var electricity;
    (function (electricity) {
        var elecData;
        (function (elecData) {
            var DTerminal = /** @class */ (function (_super) {
                __extends(DTerminal, _super);
                function DTerminal() {
                    var _this = _super.call(this) || this;
                    _this.index = -1;
                    _this.root = _this;
                    _this.prev = _this;
                    _this.next = _this;
                    return _this;
                }
                DTerminal.prototype.destroy = function () {
                    _super.prototype.destroy.call(this);
                    this.disConnect();
                    this.root = null;
                    this.prev = null;
                    this.next = null;
                };
                DTerminal.prototype.connect = function (terminal) {
                    if (this.root !== terminal.root) {
                        var next1 = this.next;
                        var next2 = terminal.next;
                        this.next = next2;
                        next2.prev = this;
                        terminal.next = next1;
                        next1.prev = terminal;
                        this.root.root = terminal.root;
                    }
                };
                DTerminal.prototype.disConnect = function () {
                    if (this.root === this) {
                        var nextV = this.next;
                        while (nextV !== this) {
                            nextV.root = this.next;
                            nextV = nextV.next;
                        }
                    }
                    this.root = this;
                    var next = this.next;
                    var prev = this.prev;
                    prev.next = next;
                    next.prev = prev;
                    this.next = this;
                    this.prev = this;
                };
                return DTerminal;
            }(elecData.UnionFindSet));
            elecData.DTerminal = DTerminal;
        })(elecData = electricity.elecData || (electricity.elecData = {}));
    })(electricity = hanyeah.electricity || (hanyeah.electricity = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/8/13.
 */
var hanyeah;
(function (hanyeah) {
    var electricity;
    (function (electricity) {
        var elecData;
        (function (elecData) {
            var DTwoTerminalElement = /** @class */ (function (_super) {
                __extends(DTwoTerminalElement, _super);
                function DTwoTerminalElement() {
                    var _this = _super.call(this) || this;
                    _this.SI = 0;
                    _this.SU = 0;
                    _this.U = 0;
                    _this.I = 0;
                    _this.R = 0;
                    _this.index = 0;
                    _this.isBreak = false;
                    _this.terminal0 = new elecData.DTerminal();
                    _this.terminal1 = new elecData.DTerminal();
                    return _this;
                }
                DTwoTerminalElement.prototype.destroy = function () {
                    _super.prototype.destroy.call(this);
                    this.terminal0.destroy();
                    this.terminal1.destroy();
                    this.terminal0 = null;
                    this.terminal1 = null;
                };
                DTwoTerminalElement.prototype.getY = function (omiga) {
                    return 1 / this.R;
                };
                DTwoTerminalElement.prototype.getZ = function (omiga) {
                    return this.R;
                };
                return DTwoTerminalElement;
            }(electricity.HObject));
            elecData.DTwoTerminalElement = DTwoTerminalElement;
        })(elecData = electricity.elecData || (electricity.elecData = {}));
    })(electricity = hanyeah.electricity || (hanyeah.electricity = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/8/22.
 * 导纳矩阵法。
 */
var hanyeah;
(function (hanyeah) {
    var electricity;
    (function (electricity) {
        var calculaters;
        (function (calculaters) {
            var AdmittanceMethod = /** @class */ (function (_super) {
                __extends(AdmittanceMethod, _super);
                function AdmittanceMethod() {
                    return _super.call(this) || this;
                }
                AdmittanceMethod.prototype.solveGraph = function (graph) {
                    var vertexs = graph.getVertexs();
                    var edges = graph.getEdges();
                    var rows = vertexs.length - 1;
                    var cols = edges.length;
                    var edge;
                    // 关联矩阵。
                    var A = new electricity.MatrixMath(rows, cols);
                    // 支路电压源矩阵
                    var US = new electricity.MatrixMath(cols, 1);
                    // 支路电流源矩阵
                    var IS = new electricity.MatrixMath(cols, 1);
                    // 支路导纳矩阵
                    var Y = new electricity.MatrixMath(cols, cols);
                    for (var i = 0; i < cols; i++) {
                        edge = edges[i];
                        A.setElement(edge.vertex0.index2, i, 1);
                        A.setElement(edge.vertex1.index2, i, -1);
                        US.setElement(i, 0, edge.SU);
                        IS.setElement(i, 0, edge.SI);
                        Y.setElement(i, i, edge.R === 0 ? 1e6 : 1 / edge.R);
                    }
                    // A·Y·AT·UN = A·IS - A·Y·US;
                    // 其中YN = A·Y·AT;
                    var AT = A.transpose();
                    var AY = A.multiply(Y);
                    var YN = AY.multiply(AT);
                    var AIS = A.multiply(IS);
                    var AYUS = AY.multiply(US);
                    var UN = electricity.MatrixMath.GaussSolution(YN, AIS.clone().sub(AYUS));
                    console.log("UN");
                    electricity.MatrixMath.traceMatrix(UN);
                };
                return AdmittanceMethod;
            }(calculaters.MethodBase));
            calculaters.AdmittanceMethod = AdmittanceMethod;
        })(calculaters = electricity.calculaters || (electricity.calculaters = {}));
    })(electricity = hanyeah.electricity || (hanyeah.electricity = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/8/12.
 */
var hanyeah;
(function (hanyeah) {
    var electricity;
    (function (electricity) {
        var ElectricityWorld = /** @class */ (function (_super) {
            __extends(ElectricityWorld, _super);
            function ElectricityWorld() {
                var _this = _super.call(this) || this;
                _this.calculater = new electricity.ElectricityCalculater();
                _this.elements = [];
                return _this;
            }
            ElectricityWorld.prototype.hasElement = function (element) {
                return this.elements.indexOf(element) !== -1;
            };
            ElectricityWorld.prototype.addElement = function (element) {
                if (!this.hasElement(element)) {
                    this.elements.push(element);
                }
            };
            ElectricityWorld.prototype.removeElement = function (element) {
                var ind = this.elements.indexOf(element);
                if (ind !== -1) {
                    this.elements.splice(ind, 1);
                }
            };
            ElectricityWorld.prototype.calculate = function () {
                this.calculater.calculate(this.elements);
            };
            return ElectricityWorld;
        }(electricity.HObject));
        electricity.ElectricityWorld = ElectricityWorld;
    })(electricity = hanyeah.electricity || (hanyeah.electricity = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/8/13.
 */
var hanyeah;
(function (hanyeah) {
    var electricity;
    (function (electricity) {
        var examples;
        (function (examples) {
            var DTwoTerminalElement = hanyeah.electricity.elecData.DTwoTerminalElement;
            var Example01 = /** @class */ (function () {
                function Example01(ctx) {
                    var elecWorld = new electricity.ElectricityWorld();
                    var arr = [];
                    for (var i = 0; i < 4; i++) {
                        var ele = new DTwoTerminalElement();
                        elecWorld.addElement(ele);
                        arr.push(ele);
                        ele.R = 2;
                    }
                    arr[0].terminal0.connect(arr[1].terminal0);
                    arr[0].terminal1.connect(arr[1].terminal1);
                    arr[0].terminal0.connect(arr[2].terminal1);
                    arr[0].terminal1.connect(arr[3].terminal0);
                    arr[3].terminal1.connect(arr[2].terminal0);
                    arr[3].SU = 6;
                    arr[3].R = 0;
                    // console.log(arr);
                    test1();
                    // test2();
                    // setInterval(test1, 2000);
                    traceUI();
                    function traceUI() {
                        for (var i = 0; i < arr.length; i++) {
                            console.log(i + ":\t" + arr[i].U.toPrecision(2) + ",\t" + arr[i].I.toPrecision(2));
                        }
                    }
                    function test2() {
                        console.time("用时");
                        for (var i = 0; i < 100000; i++) {
                            elecWorld.calculate();
                        }
                        elecWorld.calculate();
                        console.timeEnd("用时");
                    }
                    function test1() {
                        console.time("用时");
                        elecWorld.calculate();
                        console.timeEnd("用时");
                    }
                    function test0() {
                        var loop = function () {
                            elecWorld.calculate();
                            requestAnimationFrame(loop);
                        };
                        requestAnimationFrame(loop);
                    }
                }
                return Example01;
            }());
            examples.Example01 = Example01;
        })(examples = electricity.examples || (electricity.examples = {}));
    })(electricity = hanyeah.electricity || (hanyeah.electricity = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/8/15.
 */
var hanyeah;
(function (hanyeah) {
    var electricity;
    (function (electricity) {
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
        electricity.MatrixMath = MatrixMath;
    })(electricity = hanyeah.electricity || (hanyeah.electricity = {}));
})(hanyeah || (hanyeah = {}));
/**
 * Created by hanyeah on 2019/8/13.
 */
var hanyeah;
(function (hanyeah) {
    var electricity;
    (function (electricity) {
        var Edge = hanyeah.electricity.graph.Edge;
        var Vertex = hanyeah.electricity.graph.Vertex;
        var ListMethod = hanyeah.electricity.calculaters.ListMethod;
        var ElectricityCalculater = /** @class */ (function () {
            function ElectricityCalculater() {
            }
            ElectricityCalculater.prototype.calculate = function (elements) {
                var len = elements.length;
                var ele;
                var terminal0;
                var terminal1;
                // -------------初始化index-------------
                for (var i = 0; i < len; i++) {
                    ele = elements[i];
                    ele.terminal0.index = -1;
                    ele.terminal1.index = -1;
                }
                // ------------生成顶点Map---------
                var vertexs = [];
                var n = 0;
                for (var i = 0; i < len; i++) {
                    ele = elements[i];
                    terminal0 = ele.terminal0.root;
                    terminal1 = ele.terminal1.root;
                    if (terminal0.index === -1) {
                        vertexs[n] = new Vertex(n);
                        terminal0.index = n;
                        n++;
                    }
                    if (terminal1.index === -1) {
                        vertexs[n] = new Vertex(n);
                        terminal1.index = n;
                        n++;
                    }
                }
                // ------------生成边Map------------
                var edges = [];
                n = 0;
                var edge;
                for (var i = 0; i < len; i++) {
                    ele = elements[i];
                    if (ele.isBreak) {
                        continue;
                    }
                    terminal0 = ele.terminal0.root;
                    terminal1 = ele.terminal1.root;
                    if (terminal0 !== terminal1) {
                        edge = new Edge(n);
                        edge.vertex0 = vertexs[terminal0.index];
                        edge.vertex1 = vertexs[terminal1.index];
                        edges[n] = edge;
                        edge.SU = ele.SU;
                        edge.SI = ele.SI;
                        edge.R = ele.R;
                        ele.index = n;
                        n++;
                        if (edge.vertex0.root !== edge.vertex1.root) {
                            edge.vertex0.root.root = edge.vertex1.root;
                        }
                    }
                }
                // console.log(vertexs);
                // console.log(edges);
                // const method: MethodBase = new ImpedanceMethod();
                // method.solve(vertexs, edges);
                // const method: MethodBase = new AdmittanceMethod();
                // method.solve(vertexs, edges);
                var method = new ListMethod();
                method.solve(vertexs, edges);
            };
            return ElectricityCalculater;
        }());
        electricity.ElectricityCalculater = ElectricityCalculater;
    })(electricity = hanyeah.electricity || (hanyeah.electricity = {}));
})(hanyeah || (hanyeah = {}));
