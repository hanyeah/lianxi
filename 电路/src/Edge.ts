namespace hanyeah.circuit {
  export class Edge implements IEdge {
    public type: EdgeType = EdgeType.Resistance;
    public value: number = 0;
    public vertex0: IVertex;
    public vertex1: IVertex;
    public isBreak: boolean;
    private world: IWorld;
    constructor(world: IWorld, type: EdgeType, value: number){
      this.type = type;
      this.value = value;
      this.world = world;
      world.addEdge(this);
      this.vertex0 = new Vertex(world, this);
      this.vertex1 = new Vertex(world, this);
      this.vertex0.brother = this.vertex1;
      this.vertex1.brother = this.vertex0;
    }

    public destroy(): void {
      this.world.removeEdge(this);
      this.vertex0.destroy();
      this.vertex1.destroy();
      this.vertex0 = null;
      this.vertex1 = null;
      this.world = null;
    }
  }
}
