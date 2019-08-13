/**
 * Created by hanyeah on 2019/8/13.
 */
namespace hanyeah.electricity.elecData{
  export class DTwoTerminalElement extends HObject{
    public SI: number = 0;
    public SU: number = 0;
    public U: number = 0;
    public I: number = 0;
    public R: number = 0;
    public C: number = 0;
    public L: number = 0;
    public isBreak: boolean = false;
    public isShortCircuit: boolean = false;
    public get terminal0(): DTerminal{
      return this._terminal0;
    }
    public get terminal1(): DTerminal{
      return this._terminal1;
    }
    private _terminal0: DTerminal;
    private _terminal1: DTerminal;
    constructor() {
      super();
      this._terminal0 = new DTerminal();
      this._terminal1 = new DTerminal();
    }

    destroy() {
      super.destroy();
      this._terminal0.destroy();
      this._terminal1.destroy();
      this._terminal0 = null;
      this._terminal1 = null;
    }

    repair() {
      this.isBreak = false;
      this.isShortCircuit = false;
    }

  }
}
