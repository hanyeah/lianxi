declare namespace hanyeah.circuit {
    interface IWorld {
        destroy(): void;
        addEdge(edge: IEdge): void;
        removeEdge(edge: IEdge): void;
        addVertex(vertex: IVertex): void;
        removeVertex(vertex: IVertex): void;
        getEdges(): IEdge[];
        getVertexs(): IVertex[];
        calculate(): void;
    }
    interface IEdge {
        type: EdgeType;
        value: number;
        vertex0: IVertex;
        vertex1: IVertex;
        isBreak: boolean;
        destroy(): void;
    }
    interface IVertex {
        brother: IVertex;
        edge: IEdge;
        prev: IVertex;
        next: IVertex;
        destroy(): void;
        connect(vertex: IVertex): void;
        disConnect(): void;
    }
    interface ICalculater {
        destroy(): void;
        calculate(): void;
    }
}
declare namespace hanyeah.circuit {
    class Calculater implements ICalculater {
        private world;
        constructor(world: IWorld);
        destroy(): void;
        calculate(): void;
    }
}
declare namespace hanyeah.circuit {
    enum EdgeType {
        Voltage = 0,
        Current = 1,
        Resistance = 2
    }
}
declare namespace hanyeah.circuit {
    class Vertex implements IVertex {
        brother: IVertex;
        edge: IEdge;
        prev: IVertex;
        next: IVertex;
        private world;
        constructor(world: IWorld, edge: IEdge);
        destroy(): void;
        connect(vertex: IVertex): void;
        disConnect(): void;
    }
}
declare namespace hanyeah.circuit {
    class Edge implements IEdge {
        type: EdgeType;
        value: number;
        vertex0: IVertex;
        vertex1: IVertex;
        isBreak: boolean;
        private world;
        constructor(world: IWorld, type: EdgeType, value: number);
        destroy(): void;
    }
}
declare namespace hanyeah.circuit {
    class World implements IWorld {
        private edges;
        private vertexs;
        private calculater;
        constructor();
        destroy(): void;
        addEdge(edge: IEdge): void;
        removeEdge(edge: IEdge): void;
        addVertex(vertex: IVertex): void;
        removeVertex(vertex: IVertex): void;
        getEdges(): IEdge[];
        getVertexs(): IVertex[];
        calculate(): void;
        private add;
        private remove;
    }
}
declare namespace hanyeah.circuit {
    class Main {
        constructor();
    }
}
