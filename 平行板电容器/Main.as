package  {
	
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	import flash.text.TextField;
	import flash.utils.Dictionary;
	
	
	public class Main extends MovieClip {
		
		public var plateL:MovieClip;
		public var plateR:MovieClip;
		public var tf:TextField;
		private var bmd:BitmapData;
		private var w:int = 256;
		private var rect:Rectangle = new Rectangle(0, 0, w, w);
		private var dic:Dictionary = new Dictionary();
		private var h:int = 100;
		private var Q:Number = 10;
		private var k:Number = 1.0;
		public function Main() {
			// constructor code
			drag(plateL);
			drag(plateR);
			tf.mouseEnabled = false;
			dic[plateL] = new Point(plateL.x, plateL.y);
			dic[plateR] = new Point(plateR.x, plateR.y);
			plateL.op = new Point(plateL.x, plateL.y);
			plateR.op = new Point(plateR.x, plateR.y);
			
			bmd = new BitmapData(w, w, false, 0x000000);
			var bmp:Bitmap = new Bitmap(bmd);
			addChildAt(bmp, 0);
			
			addEventListener(Event.ENTER_FRAME, enterFrameHandler);
			addEventListener(KeyboardEvent.KEY_DOWN, keyBoardHandler);
		}
		
		private function enterFrameHandler(e:Event):void{
			bmd.fillRect(rect, 0x000000);
			for (var i : int = 0; i < w; i++ ){
				for (var j : int = 0; j < w; j++ ) {
					var co:uint = Math.random() * 255 * 0;
					bmd.setPixel(i, j, co);
				}
			}
			
			var p:Point = new Point(plateL.x, plateL.y);
			var n:int = 1000;
			var U:Number = 0;
			var d:Number = 1;
			var rectR:Rectangle = plateR.getBounds(this);
			while (n) {
				var E:Point = getE(p.x, p.y);
				E.normalize(d);
				U += E.length * d;
				p.x += E.x;
				p.y += E.y;
				n--;
				if (rectR.containsPoint(p)) {
					break;
				}
			}
			tf.text = 'U = ' + U + ', n = ' + n;
			
		}
		
		private function getE(x0:Number, y0:Number):Point{
			var n:int = 100;
			var oy:Number = y0 - (plateL.y - h / 2 + 0.000011);
			var dy:Number = h / n;
			var x1:Number = x0 - plateL.x;
			var x2:Number = x0 - plateR.x;
			var qs:Number = k * Q / n;
			var E:Point = new Point(0, 0);
			var x12:Number = x1 * x1;
			var x22:Number = x2 * x2;
			var r1:Number;
			var r2:Number;
			var oy2:Number;
			for (var i:int = 0; i <= n; i++ ) {
				oy2 = oy * oy;
				r1 = x12 + oy2;
				r1 = r1 * Math.sqrt(r1);
				E.x += qs * x1 / r1;
				E.y += qs * oy / r1;
				r2 = x22 + oy2;
				r2 = r2 * Math.sqrt(r2);
				E.x -= qs * x2 / r2;
				E.y -= qs * oy / r2;
				oy -= dy;
			}
			return E;
		}
		
		private function jifen(x:Number, y0:Number):Number{
			return x * Math.atan2(x, y0) - y0 * 0.5 * Math.log(x * x + y0 * y0);
		}
		
		private function keyBoardHandler(e:KeyboardEvent):void{
			if (e.ctrlKey && e.keyCode === '0'.charCodeAt(0)) {
				plateL.x = plateL.op.x;
				plateL.y = plateL.op.y;
				plateR.x = plateR.op.x;
				plateR.y = plateR.op.y;
			}
		}
		
		private function moveCallBack(sp:Sprite, evt:MouseEvent, isEnd:Boolean):void{
			if (evt.shiftKey) {
				curSp.y = dic[curSp].y;
			} else if (evt.ctrlKey) {
				curSp.x = dic[curSp].x;
			}
			dic[plateL].x = plateL.x;
			dic[plateL].y = plateL.y;
			dic[plateR].x = plateR.x;
			dic[plateR].y = plateR.y;
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
			moveCallBack(curSp, e, true);
			curSp = null;
			removeEventListener(MouseEvent.MOUSE_MOVE, mouseMoveHandler);
			stage.removeEventListener(MouseEvent.MOUSE_UP, mouseUpHandler);
			stage.removeEventListener(Event.MOUSE_LEAVE, mouseUpHandler);
		}
		
		private function mouseMoveHandler(e:MouseEvent):void
		{
			//
			draged = true;
			moveCallBack(curSp, e, false);
		}
		
	}
	
}
