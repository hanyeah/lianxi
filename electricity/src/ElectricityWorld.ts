/**
 * Created by hanyeah on 2019/8/12.
 */
namespace hanyeah.electricity {
  import DTwoTerminalElement = hanyeah.electricity.elecData.DTwoTerminalElement;
  import DTerminal = hanyeah.electricity.elecData.DTerminal;
  export class ElectricityWorld extends HObject{

    public calculater: ElectricityCalculater = new ElectricityCalculater();
    private elements: Array<DTwoTerminalElement> = [];
    constructor() {
      super();
    }

    hasElement(element: DTwoTerminalElement) {
      return this.elements.indexOf(element) !== -1;
    }

    addElement(element: DTwoTerminalElement) {
      if (!this.hasElement(element)) {
        this.elements.push(element);
      }
    }

    removeElement(element: DTwoTerminalElement) {
      const ind: number = this.elements.indexOf(element);
      if (ind !== -1) {
        this.elements.splice(ind, 1);
      }
    }

    calculate() {
      this.calculater.calculate(this.elements);
    }

  }
}
