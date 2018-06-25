package  {
	
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	
	
	public class Main extends MovieClip {
		
		public var pA:MovieClip;
		public var pB:MovieClip;
		private var bmd:BitmapData;
		public function Main() {
			// constructor code
			drag(pA);
			drag(pB);
			bmd = new BitmapData(400, 400, false, 0x00);
			var bmp:Bitmap = new Bitmap(bmd);
			addChildAt(bmp, 0);
			addEventListener(Event.ENTER_FRAME, enterframeHandler);
		}
		
		private function enterframeHandler(e:Event):void 
		{
			bmd.lock();
			for (var i:int = 0; i < 400;i++ ){
				for (var j:int = 0; j < 400; j++ ){
					var pc:Point = new Point((pA.x + pB.x) / 2, (pA.y + pB.y) / 2);
					var pAB:Point = new Point(pA.x - pB.x, pA.y - pB.y);
					pAB.normalize(10000);
					var po:Point = new Point(pc.x + pAB.y, pc.y - pAB.x);
					var pd:Point = new Point(i - po.x, j - po.y);
					var co:uint = 0x000000;
					if(Math.abs(pd.length-10000)<1){
						co = 0x00aa00;
					}
					bmd.setPixel(i, j, co);
				}
			}
			bmd.unlock();
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
