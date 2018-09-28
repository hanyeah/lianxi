package  {
	
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	
	
	public class Main extends MovieClip {
		
		public var pO:MovieClip;
		public var pA:MovieClip;
		public var pB:MovieClip;
		public function Main() {
			// constructor code
			drag(pO);
			drag(pA);
			drag(pB);
			addEventListener(Event.ENTER_FRAME, enterFrameHandler);
		}
		
		private function enterFrameHandler(e:Event):void 
		{
			var p0:Point = new Point(pO.x, pO.y);
			var p1:Point = new Point(pA.x, pA.y);
			var p2:Point = new Point(pB.x, pB.y);
			var p01:Point = p1.subtract(p0);
			var p02:Point = p2.subtract(p0);
			var A:Point = p02;
			var b:Point = p01;
			//
			var ATA:Number = A.x * A.x + A.y * A.y;
			var AAT:Object = {
				a: A.x * A.x, b: A.x * A.y,
				c: A.y * A.x, d: A.y * A.y
			};
			var P:Object = {
				a: AAT.a / ATA, b: AAT.b / ATA,
				c: AAT.c / ATA, d: AAT.d / ATA
			};
			//
			var pb:Point = new Point();
			pb.x = P.a * b.x + P.b * b.y;
			pb.y = P.c * b.x + P.d * b.y;
			//
			graphics.clear();
			graphics.lineStyle(4, 0x000000, 1.0);
			graphics.moveTo(p0.x, p0.y);
			graphics.lineTo(p1.x, p1.y);
			graphics.moveTo(p0.x, p0.y);
			graphics.lineTo(p2.x, p2.y);
			graphics.lineStyle(2, 0x000000, 1.0);
			graphics.moveTo(p0.x + b.x, p0.y + b.y);
			graphics.lineTo(p0.x + pb.x, p0.y + pb.y);
			graphics.lineStyle(2, 0xff0000, 1.0);
			graphics.moveTo(p0.x, p0.y);
			graphics.lineTo(p0.x + pb.x, p0.y + pb.y);
			
		}
		//-----------------------------
		private var curSp:Sprite;
		private function drag(sp:Sprite):void{
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
		}
	}
	
}
