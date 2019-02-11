package  {
	
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	
	
	public class Main extends MovieClip {
		
		public var p1:MovieClip;
		public var p2:MovieClip;
		private var draged:Boolean = true;
		private var p0:Point = new Point(400, 300);
		private var r:Number = 100;
		private var k:Number = r * r;
		public function Main() {
			// constructor code
			drag(p1);
			drag(p2);
			addEventListener(Event.ENTER_FRAME, enterFrameHandler);
		}
		private function enterFrameHandler(e:Event):void
		{
			refresh();
		}
		
		private function refresh():void{
			graphics.clear();
			graphics.lineStyle(1, 0x000000, 1.0);
			graphics.drawCircle(p0.x, p0.y, r);
			
			graphics.lineStyle(1, 0x000000, 1.0);
			graphics.moveTo(p1.x, p1.y);
			graphics.lineTo(p2.x, p2.y);
			
			graphics.lineStyle(1, 0xff0000, 1.0);
			var n:int = 500;
			for (var i:int = -n; i <= n; i++ ){
				var f1:Number = i / 100;
				var f2:Number = (i + 1) / 100;
				var p01:Point = Point.interpolate(new Point(p1.x, p1.y), new Point(p2.x, p2.y), f1);
				var p02:Point = Point.interpolate(new Point(p1.x, p1.y), new Point(p2.x, p2.y), f2);
				var p11:Point = fanyandian(p01);
				var p12:Point = fanyandian(p02);
				graphics.moveTo(p11.x, p11.y);
				graphics.lineTo(p12.x, p12.y);
			}
			
		}
		
		private function fanyandian(p:Point):Point{
			var pa:Point = new Point(p.x - p0.x, p.y - p0.y);
			var La:Number = pa.length;
			var Lb:Number = k / La;
			var f:Number = Lb / La;
			return Point.interpolate(p, p0, f);
		}
		
		//-----------------------------
		private var curSp:Sprite;
		
		private function drag(sp:Sprite):void
		{
			sp.buttonMode = true;
			sp.addEventListener(MouseEvent.MOUSE_DOWN, mouseDownHandler);
		}
		
		private function mouseDownHandler(e:MouseEvent):void
		{
			curSp = e.currentTarget as Sprite;
			curSp.startDrag();
			addEventListener(MouseEvent.MOUSE_MOVE, mouseMoveHandler);
			addEventListener(MouseEvent.MOUSE_UP, mouseUpHandler);
			addEventListener(Event.MOUSE_LEAVE, mouseUpHandler);
		}
		
		private function mouseUpHandler(e:MouseEvent):void
		{
			curSp.stopDrag();
			curSp = null;
			removeEventListener(MouseEvent.MOUSE_MOVE, mouseMoveHandler);
			removeEventListener(MouseEvent.MOUSE_UP, mouseUpHandler);
			removeEventListener(Event.MOUSE_LEAVE, mouseUpHandler);
		}
		
		private function mouseMoveHandler(e:MouseEvent):void
		{
			//
			draged = true;
		}
		
	}
	
}
