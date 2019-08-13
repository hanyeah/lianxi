/**
 * Created by hanyeah on 2019/8/13.
 */
namespace hanyeah.electricity.elecData {
  export class DTerminal extends HObject {
    public get root(): DTerminal {
      if (this._root._root !== this._root) {
        let son: DTerminal = this._root;
        let root: DTerminal = this._root;
        let temp: DTerminal;
        while (root !== root._root) {
          root = root._root;
        }
        this._root = root;
        while (son !== root) {
          temp = son._root;
          son._root = root;
          son = temp;
        }
      }
      return this._root;
    }

    public set root(terminal: DTerminal) {
      this._root = terminal;
    }

    public get root2(): DTerminal {
      if (this._root2._root2 !== this._root2) {
        let son: DTerminal = this._root2;
        let root: DTerminal = this._root2;
        let temp: DTerminal;
        while (root !== root._root2) {
          root = root._root2;
        }
        this._root2 = root;
        while (son !== root) {
          temp = son._root2;
          son._root2 = root;
          son = temp;
        }
      }
      return this._root2;
    }

    public set root2(terminal: DTerminal) {
      this._root2 = terminal;
    }

    private _root: DTerminal;
    private _root2: DTerminal;
    private prev: DTerminal;
    private next: DTerminal;

    constructor() {
      super();
      this.root = this;
      this.root2 = this;
      this.prev = this;
      this.next = this;
    }

    destroy() {
      super.destroy();
      this.disConnect();
      this.root = null;
      this.root2 = null;
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
        this.root2.root2 = terminal.root2;
      }
    }

    disConnect() {
      if (this.root === this) {
        let nextV: DTerminal = this.next;
        while (nextV !== this) {
          nextV.root = this.next;
          nextV.root2 = this.next;
          nextV = nextV.next;
        }
      }
      this.root = this;
      this.root2 = this;
      const next: DTerminal = this.next;
      const prev: DTerminal = this.prev;
      prev.next = next;
      next.prev = prev;
      this.next = this;
      this.prev = this;
    }
  }
}
