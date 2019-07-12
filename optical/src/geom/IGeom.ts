/**
 * Created by hanyeah on 2019/7/11.
 */
namespace hanyeah.optical.geom {
  export interface IGeom {

    clone(): IGeom;

    intersect(ray: Ray): IntersectResult;

  }
}
