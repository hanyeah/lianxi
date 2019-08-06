/**
 * Created by hanyeah on 2019/7/31.
 */
namespace hanyeah.optical.geom{
  export class Shape extends Space{
    protected geoms: Array<Geom> = [];
    constructor() {
      super();
    }

    public destroy() {
      super.destroy();
    }

    public addGeom(geom: Geom): void{
      if (this.geoms.indexOf(geom) === -1) {
        this.geoms.push(geom);
      }
    }

    public removeGeom(geom: Geom): void {
      const ind: number = this.geoms.indexOf(geom);
      if (ind !== -1) {
        this.geoms.splice(ind, 1);
      }
    }

    public removeAllGeoms() {
      this.geoms.length = 0;
    }

    public intersect(ray: Ray): IntersectResult{
      let result: IntersectResult = IntersectResult.noHit;
      this.geoms.forEach((geom: Geom) => {
        const r0: IntersectResult = geom.intersect(ray);
        if (r0.distance < result.distance) {
          result = r0;
        }
      });
      return result;
    }

    public updateTransform(gMatrix: Matrix = null) {
      super.updateTransform(gMatrix);
      this.geoms.forEach((geom: Geom) => {
        geom.updateTransform(this.gMatrix);
      });
    }

  }
}
