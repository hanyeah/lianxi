package  {
	
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.MovieClip;
	import flash.display.SimpleButton;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Rectangle;
	import flash.text.TextField;
	
	
	public class Test01 extends MovieClip {
		
		public var tfx:TextField;
		public var tfy:TextField;
		public var btn:SimpleButton;
		private var w:int = 200;
		private var h:int = 200;
		private var r:Number = 50;
		private var bmd1:BitmapData;
		private var bmd2:BitmapData;
		public function Test01() {
			// constructor code
			stage?initStage(null):addEventListener(Event.ADDED_TO_STAGE, initStage);
		}
		
		private function initStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, initStage);
			bmd1 = addBitmap(0, 100);
			bmd2 = addBitmap(w, 100);
			refreshAll();
			btn.addEventListener(MouseEvent.CLICK, clickHandler);
		}
		
		private function addBitmap(x0:int, y0:int):BitmapData{
			var bmd:BitmapData = new BitmapData(w, h, false, 0x0);
			var bmp:Bitmap = new Bitmap(bmd);
			addChild(bmp);
			bmp.x = x0;
			bmp.y = y0;
			return bmd;
		}
		
		private function clickHandler(e:MouseEvent):void 
		{
			forEachPx(bmd2, refresh2);
		}
		
		private function refreshAll():void{
			forEachPx(bmd1, refresh1);
			forEachPx(bmd2, refresh2);
		}
		
		private function refresh1(i:int,j:int,dx:Number,dy:Number):uint{
			var co:uint = 0x0;
			dx /= r;
			dy /= r;
			var d:Number = dis(dx, dy);
			if (Math.abs(d-1)<=1/r){
				co = 0xff0000;
			}
			return co;
		}
		
		private function refresh2(i:int,j:int,dx:Number,dy:Number):uint{
			var co:uint = 0x0;
			dx /= r;
			dy /= r;
			var dx1:Number = dx;
			var dy1:Number = Math.pow(dy,1/3);
			var d:Number = dis(dx1, dy1);
			if (Math.abs(d-1)<=1/r){
				co = 0xff0000;
			}
			return co;
		}
		
		private function dis(dx:Number,dy:Number):Number{
			return Math.sqrt(dx * dx + dy * dy);
		}
		
		private function forEachPx(bmd:BitmapData, callBack:Function):void{
			bmd.lock();
			bmd.fillRect(new Rectangle(0, 0, w, h), 0x0);
			var hw:Number = w / 2;
			var hh:Number = h / 2;
			for (var i:int = 0; i < w; i++ ){
				for (var j:int = 0; j < h;j++ ){
					var co:uint = callBack(i, j, i - hw, j - hh);
					bmd.setPixel(i, j, co);
				}
			}
			bmd.unlock();
		}
		
	}
	
}
