namespace hanyeah {
  export class Calculater{
    constructor() {
      //
    }

    calculate(world: World): Quad[] {
      const result: Quad[] = [];
      const lights: LightData[] = world.getAllLights();
      const segments: Segment[] = world.getAllSegments();
      for(let i: number = 0; i < lights.length; i++) {
        result.push(...this.calculateLight(lights[i], segments));
      }
      return result;
    }

    getAngles(light: LightData, segments: Segment[]): AngleData[] {
      let ang0: number = PointUtils.getAngle2(light.sP, PointUtils.getMiddleP(light.p0, light.p1));
      const angles: AngleData[] = [];
      angles.push(new AngleData(light.sP, light.p0, ang0));
      angles.push(new AngleData(light.sP, light.p1, ang0));
      for (let i: number = 0; i < segments.length; i++) {
        angles.push(new AngleData(light.sP, segments[i].p0, ang0));
        angles.push(new AngleData(light.sP, segments[i].p1, ang0));
      }
      angles.sort((a, b) => {
        return a.angle - b.angle;
      });
      return angles;
    }

    getInd(angles: AngleData[], light: LightData): number[] {
      let ind1: number = -1;
      let ind2: number = -1;
      for (let i: number = 0; i < angles.length; i++) {
        if (angles[i].p1.owner === light) {
          if (ind1 === -1) {
            ind1 = i;
          } else {
            ind2 = i;
            break;
          }
        }
      }
      return [ind1, ind2];
    }

    calculateLight(light: LightData, segments: Segment[]): Quad[] {
      const angles: AngleData[] = this.getAngles(light, segments);
      // 
      const inds: number[] = this.getInd(angles, light);
      const ind1: number = inds[0];
      const ind2: number = inds[1];
      //
      const result: Quad[] = [];
      let quad: Quad = new Quad();
      result.push(quad);
      let angData: AngleData;
      for (let i: number = ind1; i <= ind2; i++) {
        angData = angles[i];
        if(i === ind1) {
          this.firstLine(light, segments, angData, quad);
        } else if (i === ind2) {
          this.rightLine(light, segments, angData, quad);
        } else {
          quad = this.middleLine(light, segments, angData, quad);
          result.push(quad);
        }
      }
      return this.simpleQuad(result);
    }

    simpleQuad(quads: Quad[]): Quad[] {
      const result: Quad[] = [];
      let quad: Quad;
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

    inSameSeg(quad0: Quad, quad1: Quad): boolean {
      return quad0 && quad1 && quad0.p2.seg === quad1.p2.seg;
    }

    mergeQuad(quad0: Quad, quad1: Quad): void {
      quad0.p2 = quad1.p2;
      quad0.p3 = quad1.p3;
    }


    lastLine(light: LightData, segments: Segment[], angData: AngleData, quad: Quad): void {
      this.rightLine(light, segments, angData, quad);
    }

    middleLine(light: LightData, segments: Segment[], angData: AngleData, quad: Quad): Quad {
      this.rightLine(light, segments, angData, quad);
      quad = new Quad();
      this.leftLine(light, segments, angData, quad);
      return quad;
    }

    firstLine(light: LightData, segments: Segment[], angData: AngleData, quad: Quad): void {
      this.leftLine(light, segments, angData, quad);
    }

    leftLine(light: LightData, segments: Segment[], angData: AngleData, quad: Quad): void {
      const p0: IPoint = LineUtil.intersectRayLine(angData.p0, angData.p1, light.p0, light.p1);
      const d0: number = PointUtils.distance(angData.p0, p0);
      const intersects: IntersectResult[] = this.getIntersects(angData.p0, angData.p1, segments, light);
      const minIntersect: IntersectResult = this.getMinIntersect(intersects, d0, true, false);
      const p1: IPoint = minIntersect.p;
      quad.p0 = new QuadPoint(p0.x, p0.y, light);
      quad.p1 = new QuadPoint(p1.x, p1.y, minIntersect.seg);
    }

    rightLine(light: LightData, segments: Segment[], angData: AngleData, quad: Quad): void {
      const p0: IPoint = LineUtil.intersectRayLine(angData.p0, angData.p1, light.p0, light.p1);
      const d0: number = PointUtils.distance(angData.p0, p0);
      const intersects: IntersectResult[] = this.getIntersects(angData.p0, angData.p1, segments, light);
      const minIntersect: IntersectResult = this.getMinIntersect(intersects, d0, false, true);
      const p1: IPoint = minIntersect.p;
      quad.p2 = new QuadPoint(p1.x, p1.y, minIntersect.seg);
      quad.p3 = new QuadPoint(p0.x, p0.y, light);
    }

    getMinIntersect(intersects: IntersectResult[], minD: number, ignoreRight: boolean, ignoreLeft: boolean): IntersectResult {
      let intersect: IntersectResult;
      let minInter: IntersectResult;
      for(let i: number = 0; i < intersects.length; i++) {
        intersect = intersects[i];
        if (intersect.d >= minD && (!minInter || intersect.d < minInter.d)) {
          if (ignoreRight && this.isRightPoint(intersect.p, intersect.seg)) {
            //
          } else if (ignoreLeft && this.isLeftPoint(intersect.p, intersect.seg)) {
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

    /**
     * 是否是线段的右端点
     */
    isRightPoint(p: IPoint, seg: Segment): boolean {
      return (PointUtils.isEqual(p, seg.p0) && this.isRight(seg.p0)) 
      || (PointUtils.isEqual(p, seg.p1) && this.isRight(seg.p1));
    }

    isRight(p: HPoint): boolean {
      const c: number = PointUtils.cross2(p.angData.p0, p.angData.p1, p.brother.angData.p0, p.brother.angData.p1);
      return c > 0;
    }

    /**
     * 是否是线段的左端点
     */
    isLeftPoint(p: IPoint, seg: Segment): boolean {
      return (PointUtils.isEqual(p, seg.p0) && this.isLeft(seg.p0)) 
      || (PointUtils.isEqual(p, seg.p1) && this.isLeft(seg.p1));
    }

    isLeft(p: HPoint): boolean {
      const c: number = PointUtils.cross2(p.angData.p0, p.angData.p1, p.brother.angData.p0, p.brother.angData.p1);
      return c < 0;
    }

    getIntersects(p0: IPoint, p1: IPoint, arr: Segment[], ignore: ISegment): IntersectResult[] {
      let seg: Segment;
      let p: IPoint;
      const result: IntersectResult[] = [];
      for(let i: number = 0; i < arr.length; i++) {
        seg = arr[i];
        if(seg !== ignore) {
          p = LineUtil.intersectRaySegment(p0, p1, seg.p0, seg.p1);
          if (p) {
            result.push(new IntersectResult(p, seg, PointUtils.distance(p0, p)));
          }
        }
      }
      return result;
    }
  }
}