namespace hanyeah {

  export class Calculater{
    constructor() {
      //
    }

    calculate(world: World): QuadData[] {
      const result: QuadData[] = [];
      const lights: LightData[] = world.getAllLights();
      const segments: Segment[] = world.getAllSegments();
      for(let i: number = 0; i < lights.length; i++) {
        result.push(...this.calculateLight(lights[i], segments));
      }
      return result;
    }

    calculateLight(light: LightData, segments: Segment[]): QuadData[] {
      const rays: RayData[] = light.getRays(segments);
      const result: QuadData[] = [];
      let quad: QuadData = new QuadData();
      result.push(quad);
      let rayData: RayData;
      for (let i: number = 0; i < rays.length; i++) {
        rayData = rays[i];
        if (i === 0) {
          this.getLeftLine(rays[i], segments, quad);
        } else if (i === rays.length - 1) {
          this.getRightLine(rays[i], segments, quad);
        } else {
          this.getRightLine(rays[i], segments, quad);
          quad = new QuadData();
          result.push(quad);
          this.getLeftLine(rays[i], segments, quad);
        }
      }
      return this.simpleQuad(result);
    }

    simpleQuad(quads: QuadData[]): QuadData[] {
      const result: QuadData[] = [];
      let quad: QuadData;
      for (let i: number = 0; i < quads.length; i++) {
        if (this.inSameSeg(quad, quads[i])) {
          this.mergeQuad(quad, quads[i]);
        } else {
          result.push(quads[i]);
          quad = quads[i];
        }
      }
      return result;
    }

    inSameSeg(quad0: QuadData, quad1: QuadData): boolean {
      return quad0 && quad1 && quad0.p2.seg === quad1.p2.seg;
    }

    mergeQuad(quad0: QuadData, quad1: QuadData): void {
      quad0.p2 = quad1.p2;
      quad0.p3 = quad1.p3;
    }

    getLeftLine(ray: RayData, segments: Segment[], quad: QuadData): void {
      const intersects: IntersectResult[] = this.getIntersects(ray, segments);
      const minIntersect: IntersectResult = this.getMinIntersect(intersects, true, false);
      const p1: IPoint = minIntersect.p;
      quad.p0 = new QuadPoint(ray.p0.x, ray.p0.y, null);
      quad.p1 = new QuadPoint(p1.x, p1.y, minIntersect.seg);
    }

    getRightLine(ray: RayData, segments: Segment[], quad: QuadData): void{
      const intersects: IntersectResult[] = this.getIntersects(ray, segments);
      const minIntersect: IntersectResult = this.getMinIntersect(intersects, false, true);
      const p1: IPoint = minIntersect.p;
      quad.p2 = new QuadPoint(p1.x, p1.y, minIntersect.seg);
      quad.p3 = new QuadPoint(ray.p0.x, ray.p0.y, null);
    }

    getMinIntersect(intersects: IntersectResult[], ignoreRight: boolean, ignoreLeft: boolean): IntersectResult {
      let intersect: IntersectResult;
      let minInter: IntersectResult;
      for(let i: number = 0; i < intersects.length; i++) {
        intersect = intersects[i];
        if (!minInter || intersect.d < minInter.d) {
          if (ignoreRight && this.isRightPoint(intersect.ray, intersect.p, intersect.seg)) {
            //
          } else if (ignoreLeft && this.isLeftPoint(intersect.ray, intersect.p, intersect.seg)) {
            //
          } else {
            minInter = intersect;
          }
        }
      }
      if (!minInter) {
        // 没有，找墙吧
        for(let i: number = 0; i < intersects.length; i++) {
          intersect = intersects[i];
          if (intersect.seg.type === SegmentType.wall) {
            minInter = intersect;
            break;
          }
        }
      }
      return minInter;
    }

    getIntersects(ray: RayData, segments: Segment[]): IntersectResult[] {
      let seg: Segment;
      let p: IPoint;
      const result: IntersectResult[] = [];
      for(let i: number = 0; i < segments.length; i++) {
        seg = segments[i];
        p = LineUtil.intersectRaySegment(ray.p0, ray.p1, seg.p0, seg.p1);
        if (p) {
          const d: number = PointUtils.distance(ray.p0, p);
          result.push(new IntersectResult(p, seg, d, ray));
        }
      }
      return result;
    }

    /**
     * 是否是线段的右端点
     */
    isRightPoint(ray: RayData, p: IPoint, seg: Segment): boolean {
      return (PointUtils.isEqual(p, seg.p0) && this.isRight(ray.p0, seg.p0, seg.p1)) 
      || (PointUtils.isEqual(p, seg.p1) && this.isRight(ray.p0, seg.p1, seg.p0));
    }

    isRight(p: IPoint, p0: IPoint, p1: IPoint): boolean {
      const c: number = PointUtils.cross2(p0, p, p0, p1);
      return c < 0;
    }

    /**
     * 是否是线段的左端点
     */
    isLeftPoint(ray: RayData, p: IPoint, seg: Segment): boolean {
      return (PointUtils.isEqual(p, seg.p0) && this.isLeft(ray.p0, seg.p0, seg.p1)) 
      || (PointUtils.isEqual(p, seg.p1) && this.isLeft(ray.p0, seg.p1, seg.p0));
    }

    isLeft(p: IPoint, p0: IPoint, p1: IPoint): boolean {
      const c: number = PointUtils.cross2(p0, p, p0, p1);
      return c > 0;
    }

  }
}