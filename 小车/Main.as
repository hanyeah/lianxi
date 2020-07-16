package  {
	
	import flash.display.BitmapData;
	import flash.display.MovieClip;
	import flash.display.SimpleButton;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.external.ExternalInterface;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	import flash.text.TextField;
	
	
	public class Main extends MovieClip {
		
		public var circle: MovieClip;
		public var car: Car;
		public var codeTf: TextField;
		public var msgTf: TextField;
		public var runBtn: SimpleButton;
		public var resetBtn: SimpleButton;
		public var nextBtn: SimpleButton;
		private var bmd: BitmapData;
		private var f0: Boolean = false;
		private var f1: Boolean = false;
		private var str: String = "";
		private var op: Point = new Point();
		private var isRun: Boolean = false;
		public function Main() {
			// constructor code
			stage? initStage(null): addEventListener(Event.ADDED_TO_STAGE, initStage);
		}
		
		private function initStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, initStage);
			addEventListener(Event.ENTER_FRAME, enterFrameHandler);
			runBtn.addEventListener(MouseEvent.CLICK, run);
			resetBtn.addEventListener(MouseEvent.CLICK, reset);
			nextBtn.addEventListener(MouseEvent.CLICK, next);
			bmd = new BitmapData(400, 400, true, 0x000000);
			bmd.draw(circle);
			op.x = car.x;
			op.y = car.y;
			circle.gotoAndStop(1);
		}
		
		public function turnLeft(): void {
			car.rotation--;
		}
		
		public function turnRight(): void {
			car.rotation++;
		}
		
		private function run(e:MouseEvent = null):void 
		{
			isRun = true;
			str = codeTf.text;
		}
		
		private function reset(e:MouseEvent = null):void 
		{
			isRun = false;
			car.x = op.x;
			car.y = op.y;
			car.rotation = 0;
		}
		
		private function next(e:MouseEvent):void 
		{
			reset();
			bmd.fillRect(new Rectangle(0, 0, circle.width, circle.height), 0x00000000);
			if (circle.currentFrame === circle.totalFrames) {
				circle.gotoAndStop(1);
			} else {
				circle.nextFrame();
			}
			bmd.draw(circle);
		}
		
		private function enterFrameHandler(e:Event):void 
		{
			if (!isRun) {
				return;
			}
			
			for (var i: Number = 0; i < 10; i++ ){
				var p0: Point = car.localToGlobal(new Point(car.sensor0.x, car.sensor0.y));
				var p1: Point = car.localToGlobal(new Point(car.sensor1.x, car.sensor1.y));
				p0 = circle.globalToLocal(p0);
				p1 = circle.globalToLocal(p1);
				var c0: uint = bmd.getPixel32(p0.x, p0.y);
				var c1: uint = bmd.getPixel32(p1.x, p1.y);
				f0 = c0 != 0;
				f1 = c1 != 0;
				car.sensor0.gotoAndStop(f0 ? 1 : 2);
				car.sensor1.gotoAndStop(f1 ? 1 : 2);
				if (f1) {
					this.turnRight();
				}
				if (f0) {
					this.turnLeft();
				}
				if (!f0 && !f1) {
					break;
				}
			}
			
			msgTf.text = "===";
			car.update();
		}
	}
	
}
