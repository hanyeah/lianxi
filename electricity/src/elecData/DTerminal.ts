/**
 * Created by hanyeah on 2019/8/13.
 */
namespace hanyeah.electricity.elecData {
  export class DTerminal extends HObject {
    public get root(): DTerminal {
      if (this._root._root !== this._root) {
        let root: DTerminal = this._root._root;
        while (root !== root._root) {
          root = root._root;
        }
        let son: DTerminal = this._root;
        let temp: DTerminal;
        while (son !== root) {
          temp = son._root;
          son._root = root;
          son = temp;
        }
        this._root = root;
      }
      return this._root;
    }
    public set root(terminal: DTerminal) {
      this._root = terminal;
    }
    public index: number = -1;
    private _root: DTerminal;
    private prev: DTerminal;
    private next: DTerminal;

    constructor() {
      super();
      this.root = this;
      this.prev = this;
      this.next = this;
    }

    destroy() {
      super.destroy();
      this.disConnect();
      this.root = null;
      this.prev = null;
      this.next = null;
    }

    connect(terminal: DTerminal) {
      if (this.root !== terminal.root) {
        const next1: DTerminal = this.next;
        const next2: DTerminal = terminal.next;
        this.next = next2;
        next2.prev = this;
        terminal.next = next1;
        next1.prev = terminal;
        this.root.root = terminal.root;
      }
    }

    disConnect() {
      if (this.root === this) {
        let nextV: DTerminal = this.next;
        while (nextV !== this) {
          nextV.root = this.next;
          nextV = nextV.next;
        }
      }
      this.root = this;
      const next: DTerminal = this.next;
      const prev: DTerminal = this.prev;
      prev.next = next;
      next.prev = prev;
      this.next = this;
      this.prev = this;
    }
  }
}
