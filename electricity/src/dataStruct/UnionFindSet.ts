/**
 * 并查集。
 */
namespace hanyeah.electricity.elecData{
  export class UnionFindSet extends HObject{
    public get root(): UnionFindSet {
      return this.getRoot();
    }
    public set root(_root: UnionFindSet) {
      this._root = _root;
    }
    protected _root: UnionFindSet;
    constructor() {
      super();
      this._root = this;
    }
    protected getRoot(): UnionFindSet{
      if (this._root._root !== this._root) {
        let root: UnionFindSet = this._root._root;
        while (root !== root._root) {
          root = root._root;
        }
        let son: UnionFindSet = this._root;
        let temp: UnionFindSet;
        while (son !== root) {
          temp = son._root;
          son._root = root;
          son = temp;
        }
        this._root = root;
      }
      return this._root;
    }
  }
}
