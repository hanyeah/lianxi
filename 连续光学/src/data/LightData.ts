namespace hanyeah {
  export class LightData {
    public world: World;
    public p0: HPoint = new HPoint(0, 0, this);
    public p1: HPoint = new HPoint(0, 0, this);
    public sP: HPoint = new HPoint(0, 0, this);
    constructor(world: World) {
      this.world = world;
      this.world.addLight(this);
    }

    public destroy(): void {
      
    }
  }
}