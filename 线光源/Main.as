package
{
	
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.MovieClip;
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	
	public class Main extends MovieClip
	{
		
		public var p0:MovieClip;
		public var p1:MovieClip;
		public var p2:MovieClip;
		private var draged:Boolean = true;
		private var bmd:BitmapData;
		private var shape:Shape;
		private var w:int = 300;
		private var h:int = 300;
		
		public function Main()
		{
			// constructor code
			bmd = new BitmapData(w, h, false, 0x00000000);
			var bmp:Bitmap = new Bitmap(bmd);
			addChildAt(bmp, 0);
			shape = new Shape();
			addChildAt(shape, 1);
			drag(p0);
			drag(p1);
			drag(p2);
			addEventListener(Event.ENTER_FRAME, enterFrameHandler);
		}
		
		private var p00:Point;
		private var p01:Point;
		private var p02:Point;
		private var p03:Point;
		private function enterFrameHandler(e:Event):void
		{
			if (draged)
			{
				p00 = new Point(p0.x, p0.y);
				p01 = new Point(p1.x, p1.y);
				p02 = new Point(p2.x, p2.y);
				p03 = imagePoint(p00,p01,p02);
				refreshLine();
				refreshLight();
				draged = false;
			}
		}
		
		private function refreshLine():void
		{
			shape.graphics.clear();
			shape.graphics.lineStyle(2, 0xff0000, 1.0);
			shape.graphics.moveTo(p1.x, p1.y);
			shape.graphics.lineTo(p2.x, p2.y);
			
			shape.graphics.lineStyle(0, 0x0000ff, 0.5);
			shape.graphics.moveTo(p0.x, p0.y);
			shape.graphics.lineTo(p1.x, p1.y);
			
			shape.graphics.lineStyle(0, 0x0000ff, 0.5);
			shape.graphics.moveTo(p0.x, p0.y);
			shape.graphics.lineTo(p2.x, p2.y);
			
			shape.graphics.lineStyle(0, 0xff0000, 1.0);
			shape.graphics.drawCircle(p03.x, p03.y, 5);
			
			shape.graphics.lineStyle(0, 0x00ffff, 0.5);
			shape.graphics.moveTo(p03.x, p03.y);
			shape.graphics.lineTo(p1.x, p1.y);
			
			shape.graphics.lineStyle(0, 0x00ffff, 0.5);
			shape.graphics.moveTo(p03.x, p03.y);
			shape.graphics.lineTo(p2.x, p2.y);
		}
		
		private function refreshLight():void
		{
			bmd.lock();
			bmd.fillRect(new Rectangle(0, 0, w, h), 0x00000000);
			var p04:Point;
			var co:uint;
			for (var i:int = 0; i < w; i++)
			{
				for (var j:int = 0; j < h; j++)
				{
					p04 = new Point(i, j);
					if (pointinTriangle(p00, p01, p02, p04)){
						co = 0xffff00;
						bmd.setPixel32(i, j, co);
					}
					else if (detectIntersect(p01, p02, p03, p04))
					{
						co = 0x00ff00;
						bmd.setPixel32(i, j, co);
					}
				}
			}
			bmd.unlock();
		}
		
		private function imagePoint(p0:Point,p1:Point,p2:Point):Point{
			var vec1:Point = new Point(p2.x - p1.x, p2.y - p1.y);
			vec1.normalize(1);
			var vec2:Point = new Point(-vec1.y,vec1.x);
			
			var p3:Point = new Point(p0.x - p1.x, p0.y - p1.y);
			var len:Number=p3.x*vec2.x+p3.y*vec2.y;
			vec2.normalize(len*2);
			return p0.subtract(vec2);
		}
		
		/**
		 * 线段是否相交
		 * @param	aa
		 * @param	bb
		 * @param	cc
		 * @param	dd
		 * @return
		 */
		private function detectIntersect(aa:Point, bb:Point, cc:Point, dd:Point):Boolean
		{
			if (Math.max(aa.x, bb.x) < Math.min(cc.x, dd.x))
			{
				return false;
			}
			if (Math.max(aa.y, bb.y) < Math.min(cc.y, dd.y))
			{
				return false;
			}
			if (Math.max(cc.x, dd.x) < Math.min(aa.x, bb.x))
			{
				return false;
			}
			if (Math.max(cc.y, dd.y) < Math.min(aa.y, bb.y))
			{
				return false;
			}
			if (mult(cc, bb, aa) * mult(bb, dd, aa) < 0)
			{
				return false;
			}
			if (mult(aa, dd, cc) * mult(dd, bb, cc) < 0)
			{
				return false;
			}
			return true;
		}
		
		/**
		 * 叉积。
		 * @param	a
		 * @param	b
		 * @param	c
		 * @return
		 */
		private function mult(a:Point, b:Point, c:Point):Number
		{
			return (a.x - c.x) * (b.y - c.y) - (b.x - c.x) * (a.y - c.y);
		}
		
		/**
		 * 点在三角形内
		 * @param	p1
		 * @param	p2
		 * @param	p3
		 * @param	p4
		 */
		private function pointinTriangle(p1:Point, p2:Point, p3:Point, p4:Point)
		{
			var v0:Point = new Point(p3.x - p1.x, p3.y - p1.y);
			var v1:Point = new Point(p2.x - p1.x, p2.y - p1.y);
			var v2:Point = new Point(p4.x - p1.x, p4.y - p1.y);
			
			var dot00:Number = dot(v0, v0);
			var dot01:Number = dot(v0, v1);
			var dot02:Number = dot(v0, v2);
			var dot11:Number = dot(v1, v1);
			var dot12:Number = dot(v1, v2);
			
			var u:Number = dot11 * dot02 - dot01 * dot12;
			var v:Number = dot00 * dot12 - dot01 * dot02;
			var f:Number = dot00 * dot11 - dot01 * dot01;
			return u >= 0 && v >= 0 && u + v - f <= 0;
		}
		
		/**
		 * 点积
		 * @param	p1
		 * @param	p2
		 * @return
		 */
		private function dot(p1:Point, p2:Point):Number
		{
			return p1.x * p2.x + p1.y * p2.y;
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
