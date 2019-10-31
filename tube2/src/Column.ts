/**
 * Created by hanyeah on 2019/10/23.
 */
namespace hanyeah.tube{
  export class Column{
    public length: number;
    public data: DChemicals;
    public next: Column;
    public prev: Column;
    public prevLength: number;
    public nextLength: number;
    constructor(length: number, data: DChemicals) {
      this.length = length;
      this.data = data;
      this.next = this;
      this.prev = this;
      this.prevLength = 0;
      this.nextLength = 0;
    }

    public destroy() {
      this.next = null;
      this.prev = null;
      this.data = null;
    }

    public getP(g: number): number {
      return this.data.rho * g * this.length;
    }

  }
}
