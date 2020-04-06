namespace hanyeah.circuit {
  export class Calculater implements ICalculater {
    private world: IWorld;
    constructor(world: IWorld){
      this.world = world;
    }

    public destroy(): void {
      this.world = null;
    }

    public calculate(): void {
      console.log(this.world.getEdges());
      console.log(this.world.getVertexs());
    }
  }
}
