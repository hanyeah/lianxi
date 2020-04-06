namespace hanyeah.circuit {
  export class Vertex implements IVertex {
    public brother: IVertex;
    public edge: IEdge;
    public prev: IVertex = this;
    public next: IVertex = this;
    private world: IWorld;
    
    constructor(world: IWorld, edge: IEdge){
      this.world = world;
      this.edge = edge;
      world.addVertex(this);
    }

    public destroy(): void {
      this.world.removeVertex(this);
      this.disConnect();
      this.edge = null;
      this.world = null;
      this.prev = null;
      this.next = null;
    }

    public connect(vertex: IVertex): void {
      const next1: IVertex = this.next;
      const next2: IVertex = vertex.next;
      this.next = next2;
      next2.prev = this;
      vertex.next = next1;
      next1.prev = vertex;
    }

    public disConnect(): void {
      this.prev.next = this.next;
      this.next.prev = this.prev;
      this.next = this;
      this.prev = this;
    }

  }
}
