var hanyeah;
(function (hanyeah) {
    var circuit;
    (function (circuit) {
        var Calculater = /** @class */ (function () {
            function Calculater(world) {
                this.world = world;
            }
            Calculater.prototype.destroy = function () {
                this.world = null;
            };
            Calculater.prototype.calculate = function () {
                console.log(this.world.getEdges());
                console.log(this.world.getVertexs());
            };
            return Calculater;
        }());
        circuit.Calculater = Calculater;
    })(circuit = hanyeah.circuit || (hanyeah.circuit = {}));
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var circuit;
    (function (circuit) {
        var Edge = /** @class */ (function () {
            function Edge(world, type, value) {
                this.type = circuit.EdgeType.Resistance;
                this.value = 0;
                this.type = type;
                this.value = value;
                this.world = world;
                world.addEdge(this);
                this.vertex0 = new circuit.Vertex(world, this);
                this.vertex1 = new circuit.Vertex(world, this);
                this.vertex0.brother = this.vertex1;
                this.vertex1.brother = this.vertex0;
            }
            Edge.prototype.destroy = function () {
                this.world.removeEdge(this);
                this.vertex0.destroy();
                this.vertex1.destroy();
                this.vertex0 = null;
                this.vertex1 = null;
                this.world = null;
            };
            return Edge;
        }());
        circuit.Edge = Edge;
    })(circuit = hanyeah.circuit || (hanyeah.circuit = {}));
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var circuit;
    (function (circuit) {
        var EdgeType;
        (function (EdgeType) {
            EdgeType[EdgeType["Voltage"] = 0] = "Voltage";
            EdgeType[EdgeType["Current"] = 1] = "Current";
            EdgeType[EdgeType["Resistance"] = 2] = "Resistance";
        })(EdgeType = circuit.EdgeType || (circuit.EdgeType = {}));
    })(circuit = hanyeah.circuit || (hanyeah.circuit = {}));
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var circuit;
    (function (circuit) {
        var Main = /** @class */ (function () {
            function Main() {
                var world = new circuit.World();
                var edge0 = new circuit.Edge(world, circuit.EdgeType.Voltage, 3);
                var edge1 = new circuit.Edge(world, circuit.EdgeType.Resistance, 1);
                var edge2 = new circuit.Edge(world, circuit.EdgeType.Resistance, 2);
                var edge3 = new circuit.Edge(world, circuit.EdgeType.Resistance, 2);
                // 2、3并联
                edge2.vertex0.connect(edge3.vertex0);
                edge2.vertex1.connect(edge3.vertex1);
                // 再和1串联
                edge1.vertex1.connect(edge2.vertex0);
                // 再和0并联
                edge0.vertex0.connect(edge1.vertex0);
                edge0.vertex1.connect(edge2.vertex0);
                //
                world.calculate();
            }
            return Main;
        }());
        circuit.Main = Main;
    })(circuit = hanyeah.circuit || (hanyeah.circuit = {}));
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var circuit;
    (function (circuit) {
        var Vertex = /** @class */ (function () {
            function Vertex(world, edge) {
                this.prev = this;
                this.next = this;
                this.world = world;
                this.edge = edge;
                world.addVertex(this);
            }
            Vertex.prototype.destroy = function () {
                this.world.removeVertex(this);
                this.disConnect();
                this.edge = null;
                this.world = null;
                this.prev = null;
                this.next = null;
            };
            Vertex.prototype.connect = function (vertex) {
                var next1 = this.next;
                var next2 = vertex.next;
                this.next = next2;
                next2.prev = this;
                vertex.next = next1;
                next1.prev = vertex;
            };
            Vertex.prototype.disConnect = function () {
                this.prev.next = this.next;
                this.next.prev = this.prev;
                this.next = this;
                this.prev = this;
            };
            return Vertex;
        }());
        circuit.Vertex = Vertex;
    })(circuit = hanyeah.circuit || (hanyeah.circuit = {}));
})(hanyeah || (hanyeah = {}));
var hanyeah;
(function (hanyeah) {
    var circuit;
    (function (circuit) {
        var World = /** @class */ (function () {
            function World() {
                this.edges = [];
                this.vertexs = [];
                this.calculater = new circuit.Calculater(this);
            }
            World.prototype.destroy = function () {
                this.edges = null;
                this.vertexs = null;
                this.calculater = null;
            };
            World.prototype.addEdge = function (edge) {
                this.add(this.edges, edge);
            };
            World.prototype.removeEdge = function (edge) {
                this.remove(this.edges, edge);
            };
            World.prototype.addVertex = function (vertex) {
                this.add(this.vertexs, vertex);
            };
            World.prototype.removeVertex = function (vertex) {
                this.remove(this.vertexs, vertex);
            };
            World.prototype.getEdges = function () {
                return this.edges;
            };
            World.prototype.getVertexs = function () {
                return this.vertexs;
            };
            World.prototype.calculate = function () {
                this.calculater.calculate();
            };
            World.prototype.add = function (arr, ele) {
                var ind = arr.indexOf(ele);
                if (ind === -1) {
                    arr.push(ele);
                }
            };
            World.prototype.remove = function (arr, ele) {
                var ind = arr.indexOf(ele);
                if (ind !== -1) {
                    arr.splice(ind, 1);
                }
            };
            return World;
        }());
        circuit.World = World;
    })(circuit = hanyeah.circuit || (hanyeah.circuit = {}));
})(hanyeah || (hanyeah = {}));
