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
    public index: number = 0;
    public terminal0: DTerminal;
    public terminal1: DTerminal;
    public isBreak: boolean = false;

    constructor() {
      super();
      this.terminal0 = new DTerminal();
      this.terminal1 = new DTerminal();
    }

    destroy() {
      super.destroy();
      this.terminal0.destroy();
      this.terminal1.destroy();
      this.terminal0 = null;
      this.terminal1 = null;
    }

  }
}
