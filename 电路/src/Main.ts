namespace hanyeah.circuit {
  export class Main{
    constructor(){
      const world: World = new World();
      const edge0: Edge = new Edge(world, EdgeType.Voltage, 3);
      const edge1: Edge = new Edge(world, EdgeType.Resistance, 1);
      const edge2: Edge = new Edge(world, EdgeType.Resistance, 2);
      const edge3: Edge = new Edge(world, EdgeType.Resistance, 2);
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
  }
}

new hanyeah.circuit.Main();
