/**
 * Created by hanyeah on 2019/8/13.
 */
namespace hanyeah.electricity.examples {
  import DTwoTerminalElement = hanyeah.electricity.elecData.DTwoTerminalElement;
  export class Example01{
    constructor(ctx: CanvasRenderingContext2D) {
      const elecWorld: ElectricityWorld = new ElectricityWorld();
      const arr: Array<DTwoTerminalElement> = [];
      for (let i: number = 0; i < 10000; i++) {
        const ele: DTwoTerminalElement = new DTwoTerminalElement();
        elecWorld.addElement(ele);
        arr.push(ele);
      }
      arr[0].terminal0.connect(arr[1].terminal0);
      arr[0].terminal0.connect(arr[2].terminal0);
      arr[0].terminal1.connect(arr[1].terminal1);
      arr[0].terminal1.connect(arr[2].terminal1);
      // console.log(arr);
      const loop = function(){
        elecWorld.calculate();
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }
  }
}
