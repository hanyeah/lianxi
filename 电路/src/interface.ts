namespace hanyeah.circuit {
  export interface IWorld{
    destroy(): void;
    addEdge(edge: IEdge): void;
    removeEdge(edge: IEdge): void;
    addVertex(vertex: IVertex): void;
    removeVertex(vertex: IVertex): void;
    getEdges(): IEdge[];
    getVertexs(): IVertex[];
    calculate(): void;
  }

  export interface IEdge {
    type: EdgeType;
    value: number;
    vertex0: IVertex;
    vertex1: IVertex;
    isBreak: boolean;
    destroy(): void;
  }

  export interface IVertex {
    brother: IVertex;
    edge: IEdge;
    prev: IVertex;
    next: IVertex;
    destroy(): void;
    connect(vertex: IVertex): void;
    disConnect(): void;
  }

  export interface ICalculater {
    destroy(): void;
    calculate(): void;
  }
}