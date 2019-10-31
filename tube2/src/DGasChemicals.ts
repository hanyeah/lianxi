/**
 * Created by hanyeah on 2019/10/31.
 */
namespace hanyeah.tube{
  export class DGasChemicals extends DChemicals{
    constructor(mm: number, n: number, T: number, V: number) {
      super(mm, n, T);
      this._V = V;
      this.type = DChemicals.TYPE_GAS;
      this.updateParam(1);
    }

    public set V(value: number){
      this._V = value;
      this.updateParam(2);
    }

    public set rho(value: number){
      this._rho = value;
      this.updateM2();
      this.updateN();
      this.updateParam(3);
    }

    public setAmountV(value: number){
      this._V = value;
      this.updateM2();
      this.updateN();
      this.updateParam(3);
    }

  }
}

