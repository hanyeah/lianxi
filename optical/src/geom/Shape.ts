/**
 * Created by hanyeah on 2019/7/31.
 */
namespace hanyeah.optical.geom {
  export class Shape extends Space {
    protected geoms: Array<Geom> = [];

    constructor() {
      super();
    }

    public destroy() {
      super.destroy();
    }

    public addGeom(geom: Geom): void {
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

    public intersect(ray: Ray): IntersectResult {
      let result: IntersectResult = IntersectResult.noHit;
      this.geoms.forEach((geom: Geom) => {
        const r0: IntersectResult = geom.intersect(ray);
        if (r0.distance < result.distance) {
          result = r0;
        }
      });
      return result;
    }

    public intersect2(ray: Ray, result: SimpleIntersectResult): void {
      const len: number = this.geoms.length;
      let geom: Geom;
      let tArr: number[] = [];
      for (let i: number = 0; i < len; i++) {
        geom = this.geoms[i];
        tArr = geom.intersectT(ray);
        for (let j: number = 0; j < tArr.length; j++) {
          if (tArr[i] < result.t) {
            result.t = tArr[i];
            result.geom = geom;
            result.shape = this;
          }
        }
      }
    }

    public updateTransform(gMatrix: Matrix = null) {
      super.updateTransform(gMatrix);
      const len: number = this.geoms.length;
      for (let i: number = 0; i < len; i++) {
        this.geoms[i].updateTransform(this.gMatrix);
      }
    }

    public updateLocalRay(ray: Ray): void {
      const len: number = this.geoms.length;
      for (let i: number = 0; i < len; i++) {
        this.geoms[i].updateLocalRay(ray);
      }
    }

    public removeLocalRay(ray: Ray): void {
      const len: number = this.geoms.length;
      for (let i: number = 0; i < len; i++) {
        this.geoms[i].removeLocalRay(ray);
      }
    }

  }
}
