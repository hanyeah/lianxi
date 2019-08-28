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

      arr[0].terminal0.connect(arr[1].terminal0);
      arr[0].terminal1.connect(arr[1].terminal1);

      arr[0].terminal0.connect(arr[2].terminal1);
      arr[0].terminal1.connect(arr[3].terminal0);

      arr[3].terminal1.connect(arr[2].terminal0);
      arr[3].SU = 6;
      arr[3].R = 0;
      // console.log(arr);
      test1();
      // test2();
      // setInterval(test1, 2000);
      traceUI();
      function traceUI(){
        for (let i = 0; i < arr.length; i++) {
          console.log(i + ":\t" + arr[i].U.toPrecision(2) + ",\t" + arr[i].I.toPrecision(2));
        }
      }

      function test2() {
        console.time("用时");
        for (let i = 0; i < 100000; i++) {
          elecWorld.calculate();
        }
        elecWorld.calculate();
        console.timeEnd("用时");
      }

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
