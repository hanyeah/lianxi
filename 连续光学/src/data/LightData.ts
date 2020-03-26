namespace hanyeah {
  export class LightData {
    public world: World;
    public sp: HPoint;
    public seg: Segment;
    constructor(world: World, sp: HPoint) {
      this.sp = sp || new HPoint();
      this.world = world;
      if (world) {
        world.addLight(this);
      }
    }

    public destroy(): void {
      if(this.world) {
        this.world.removeLight(this);
        this.world = null;
      }
    }

    public getRays(segments: Segment[]): RayData[] {
      let result: RayData[] = [];
      let seg: Segment;
      for(let i: number = 0; i <segments.length; i++) {
        seg = segments[i];
        this.pushRay(result, seg.p0);
        this.pushRay(result, seg.p1);
      }
      result.push(...this.getBoundary());
      result.sort(this.compareFn.bind(this));
      result = this.removeDuplicate(result);
      return result;
    }

    protected pushRay(rays: RayData[], p: HPoint): void {
      const ray = this.getRay(p);
      if (ray) {
        rays.push(ray);
      }
    }

    protected removeDuplicate(rays: RayData[]): RayData[] {
      let ray: RayData;
      const result: RayData[] = [];
      for (let i: number = 0; i < rays.length; i++) {
        if (!(ray && ray.angle === rays[i].angle)) {
          ray = rays[i];
          result.push(ray);
        }
      }
      return result;
    }

    /**
     * 获取光源到指定点的光线。
     */
    protected getRay(p: HPoint): RayData {
      return null;
    }
    
    /**
     * 
     */
    protected getBoundary(): RayData[] {
      return [];
    }

    protected compareFn(a: RayData, b: RayData): number {
      return 0;
    }

  }
}