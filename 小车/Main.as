package  {
	
	import flash.display.BitmapData;
	import flash.display.MovieClip;
	import flash.display.SimpleButton;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.external.ExternalInterface;
	import flash.geom.Point;
	import flash.text.TextField;
	
	
	public class Main extends MovieClip {
		
		public var circle: MovieClip;
		public var car: Car;
		public var codeTf: TextField;
		public var msgTf: TextField;
		public var runBtn: SimpleButton;
		private var bmd: BitmapData;
		private var f0: Boolean = false;
		private var f1: Boolean = false;
		public function Main() {
			// constructor code
			stage? initStage(null): addEventListener(Event.ADDED_TO_STAGE, initStage);
		}
		
		private function initStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, initStage);
			addEventListener(Event.ENTER_FRAME, enterFrameHandler);
			runBtn.addEventListener(MouseEvent.CLICK, run);
			bmd = new BitmapData(circle.width, circle.height, true, 0x000000);
			bmd.draw(circle);
		}
		
		public function turnLeft(): void {
			car.rotation--;
		}
		
		public function turnRight(): void {
			car.rotation++;
		}
		
		private function run(e:MouseEvent):void 
		{

		}
		
		private function enterFrameHandler(e:Event):void 
		{
			var p0: Point = car.localToGlobal(new Point(car.sensor0.x, car.sensor0.y));
			var p1: Point = car.localToGlobal(new Point(car.sensor1.x, car.sensor1.y));
			p0 = circle.globalToLocal(p0);
			p1 = circle.globalToLocal(p1);
			var c0: uint = bmd.getPixel32(p0.x, p0.y);
			var c1: uint = bmd.getPixel32(p1.x, p1.y);
			f0 = c0 != 0;
			f1 = c1 != 0;
			car.sensor0.gotoAndStop(f0 ? 1 : 2);
			car.sensor1.gotoAndStop(f1 ? 1 : 2)
			
			if (f0) {
				this.turnLeft();
			}
			if (f1) {
				this.turnRight();
			}
			car.update();
		}
	}
	
}
