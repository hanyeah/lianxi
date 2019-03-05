package  {
	
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	
	
	public class Main extends MovieClip {
		
		public var p1:MovieClip;
		public var p2:MovieClip;
		public var p3:MovieClip;
		public var p4:MovieClip;
		public var a:Number = 0;
		public var b:Number = 0;
		public var c:Number = 0;
		public var d:Number = 0;
		public function Main() {
			// constructor code
			addEventListener(Event.ENTER_FRAME, enterFrameHandler);
			drag(p1);
			drag(p2);
			drag(p3);
			drag(p4);
			p1.ox = p1.x;
			p1.oy = p1.y;
			p4.ox = p4.x;
			p4.oy = p4.y;
			updateABCD();
		}
		
		private function enterFrameHandler(e:Event):void 
		{
			if (draged) {
				dragHandler();
			}
			graphics.clear();
			graphics.lineStyle(2, 0xff0000, 1.0);
			graphics.moveTo(p1.x, p1.y);
			graphics.lineTo(p2.x, p2.y);
			graphics.lineTo(p4.x, p4.y);
			graphics.lineTo(p3.x, p3.y);
			graphics.lineTo(p1.x, p1.y);
		}
		
		private function dragHandler():void {
			switch(curSp) {
				case p1:
					dragP1();
					break;
				case p2:
				case p3:
					updateABCD();
					break;
				case p4:
					dragP4();
					break;
			}
		}
		
		private function dragP1():void{
			var dx:Number = p1.x - p1.ox;
			var dy:Number = p1.y - p1.oy;
			p2.x += dx;
			p2.y += dy;
			p3.x += dx;
			p3.y += dy;
			p4.x += dx;
			p4.y += dy;
			p1.ox = p1.x;
			p1.oy = p1.y;
		}
		
		private function dragP4():void{
			var e:Number = dis(p1, p4);
			if (e > a + b || e < Math.abs(a - b) || e > d + c || e < Math.abs(d - c)) {
				p4.x = p4.ox;
				p4.y = p4.oy;
			} else {
				var p:Point = new Point(p4.x - p1.x, p4.y - p1.y);
				p.normalize(1);
				
				var cos1:Number = getCos(a, e, b);
				calP(p, cos1, a, 1, p2);
				
				var cos2:Number = getCos(d, e, c);
				calP(p, cos2, d, -1, p3);
				
				p4.ox = p4.x;
				p4.oy = p4.y;
			}
		}
		
		private function calP(p:Point, cos:Number, a:Number, dir:int, tp:Object):void{
			var f:Number = a * cos;
			var j:Number = Math.sqrt(a * a - f * f);
			tp.x = p1.x + p.x * f + dir * p.y * j;
			tp.y = p1.y + p.y * f - dir * p.x * j;
		}
		
		private function updateABCD():void{
			a = dis(p1, p2);
			b = dis(p2, p4);
			c = dis(p3, p4);
			d = dis(p1, p3);
		}
		
		private function getCos(a:Number, b:Number, c:Number):Number{
			return (a * a + b * b - c * c) / (2 * a * b);	
		}
		
		private function dis2(p1:Object, p2:Object):Number{
			var dx:Number = p1.x - p2.x;
			var dy:Number = p1.y - p2.y;
			return dx * dx + dy * dy;
		}
		
		private function dis(p1:Object, p2:Object):Number{
			return Math.sqrt(dis2(p1, p2));
		}
		
		//-----------------------------
		private var curSp:Sprite;
		private var draged:Boolean = false;
		
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
			stage.addEventListener(MouseEvent.MOUSE_UP, mouseUpHandler);
			stage.addEventListener(Event.MOUSE_LEAVE, mouseUpHandler);
		}
		
		private function mouseUpHandler(e:MouseEvent):void
		{
			curSp.stopDrag();
			curSp = null;
			removeEventListener(MouseEvent.MOUSE_MOVE, mouseMoveHandler);
			stage.removeEventListener(MouseEvent.MOUSE_UP, mouseUpHandler);
			stage.removeEventListener(Event.MOUSE_LEAVE, mouseUpHandler);
		}
		
		private function mouseMoveHandler(e:MouseEvent):void
		{
			//
			draged = true;
		}
	}
	
}
