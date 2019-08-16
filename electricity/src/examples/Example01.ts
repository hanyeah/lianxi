/**
 * Created by hanyeah on 2019/8/13.
 */
namespace hanyeah.electricity.examples {
  import DTwoTerminalElement = hanyeah.electricity.elecData.DTwoTerminalElement;
  export class Example01{
    constructor(ctx: CanvasRenderingContext2D) {
      const elecWorld: ElectricityWorld = new ElectricityWorld();
      const arr: Array<DTwoTerminalElement> = [];
      for (let i: number = 0; i < 4; i++) {
        const ele: DTwoTerminalElement = new DTwoTerminalElement();
        elecWorld.addElement(ele);
        arr.push(ele);
        ele.R = 2;
      }
      arr[0].SU = 5;
      arr[0].terminal0.connect(arr[1].terminal0);
      arr[0].terminal0.connect(arr[2].terminal0);

      arr[0].terminal1.connect(arr[1].terminal1);
      arr[0].terminal1.connect(arr[3].terminal0);

      arr[3].terminal1.connect(arr[2].terminal1);
      // console.log(arr);
      test1();
      // setInterval(test1, 2000);
      function test1() {
        console.time("用时");
        elecWorld.calculate();
        console.timeEnd("用时");
      }

      function test0() {
        const loop = function(){
          elecWorld.calculate();
          requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
      }

    }
  }
}
