/**
 * Created by hanyeah on 2019/8/13.
 */
namespace hanyeah.electricity.examples {
  import DTwoTerminalElement = hanyeah.electricity.elecData.DTwoTerminalElement;
  export class Example01{

    constructor(ctx: CanvasRenderingContext2D) {
      const elecWorld: ElectricityWorld = new ElectricityWorld();
      const arr: Array<DTwoTerminalElement> = [];
      for (let i: number = 0; i < 3; i++) {
        const ele: DTwoTerminalElement = new DTwoTerminalElement();
        elecWorld.addElement(ele);
        arr.push(ele);
      }
      arr[0].terminal0.connect(arr[1].terminal0);
      arr[0].terminal0.connect(arr[2].terminal0);
      console.log(arr);
      elecWorld.calculate();
    }
  }
}
