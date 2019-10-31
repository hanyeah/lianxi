/**
 * Created by hanyeah on 2019/10/31.
 */
namespace hanyeah.tube{
  import Constants = hanyeah.tube.Constants;
  export class DChemicals{
    public static TYPE_GAS: number = 1;
    public static TYPE_LIQUID: number = 2;
    public static TYPE_SOLID: number = 3;
    public type: number = 0;
    protected _mm: number = 1;
    protected _n: number = 1;
    protected _m: number = 1;
    protected _T: number = 300;
    protected _V: number = 1;
    protected _rho: number = 1;
    protected _p: number = 1;
    constructor(mm: number, n: number, T: number) {
      this._mm = mm;
      this._n = n;
      this._T = T;
      this.updateParam(1);
    }

    public get mm(): number{
      return this._mm;
    }

    public set mm(value: number){
      this._mm = value;
      this.updateParam(1);
    }

    public get n(): number{
      return this._n;
    }

    public set n(value: number){
      this._n = value;
      this.updateParam(1);
    }

    public get m(): number{
      return this._m;
    }

    public set m(value: number){
      this._m = value;
      this.updateN();
      this.updateParam(2);
    }

    public get T(): number{
      return this._T;
    }

    public set T(value: number){
      this._T = value;
      this.updateParam(3);
    }

    public get V(): number{
      return this._V;
    }

    public set V(value: number){
      // this._V = value;
    }

    public get rho(): number{
      return this._rho;
    }

    public set rho(value: number){
      // this._rho = value;
    }

    public get p(): number{
      return this._rho;
    }

    public setAmountV(value: number){
      // this._V = value;
    }

    protected updateM() {
      this._m = this._n * this._mm;
    }

    protected updateN() {
      this._n = this._m / this._mm;
    }

    protected updateRho() {
      this._rho = this._m / this._V;
    }

    protected updateV() {
      this._V = this._m / this._rho;
    }

    protected updateM2() {
      this._m = this._V * this._rho;
    }

    protected updateP() {
      this._p = this._n * Constants.R * this._T / this._V;
    }

    protected updateParam(level: number){
      if (level > 0) {
        this.updateM();
      }
      if (level > 1) {
        if (this.type === DChemicals.TYPE_GAS) {
          this.updateRho();
        } else {
          this.updateV();
        }
      }
      if (level > 2) {
        this.updateP();
      }
    }

  }
}
