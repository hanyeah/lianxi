/**
 * Created by hanyeah on 2019/10/31.
 */
namespace hanyeah.tube{
  export class DLiquidChemicals extends DChemicals{
    constructor(mm: number, n: number, T: number, rho: number) {
      super(mm, n, T);
      this._rho = rho;
      this.type = DChemicals.TYPE_LIQUID;
      this.updateParam(1);
    }

    public set rho(value: number){
      this._rho = value;
      this.updateParam(2);
    }

    public set V(value: number){
      this._V = value;
      this.updateM2();
      this.updateN();
      this.updateParam(3);
    }

    public setAmountV(value: number){
      this.V = value;
    }

  }
}
