package  {
	
	import fl.controls.Label;
	import fl.controls.NumericStepper;
	import fl.controls.Slider;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.geom.Rectangle;
	
	
	public class Main extends MovieClip {
		
		public var s1:Slider;
		public var s2:Slider;
		public var l1:Label;
		public var l2:Label;
		public var l0:Label;
		public var n1:NumericStepper;
		private var bmd:BitmapData;
		private var p:Number = 0.0;
		private var w:int = 300;
		private var h:int = 300;
		private var think:Number = 2.0;
		public function Main() {
			// constructor code
			bmd = new BitmapData(w, h, true, 0x00000000);
			var bmp:Bitmap = new Bitmap(bmd);
			addChildAt(bmp, 0);
			bmp.y = 100;
			addEventListener(Event.ENTER_FRAME, enterFrameHandler);
		}
		
		private function enterFrameHandler(e:Event):void 
		{
			var v1:Number = s1.value;
			var v2:Number = s2.value;
			var v0:Number = v1 * v2;
			l1.text = v1 + "";
			l2.text = v2 + "";
			l0.text = "p=" + v0 + "";
			
			if(p!=v0 || think != n1.value){
				p = v0;
				think = n1.value;
				refresh();
			}
		}
		private function refresh():void{
			bmd.lock();
			var hw:Number = w / 2;
			var hh:Number = h / 2;
			var p1:Number = 1 / p;
			bmd.fillRect(new Rectangle(0, 0, w, h), 0x00000000);
			for (var i:int = 0; i < w;i++ ){
				for (var j:int = 0; j < h;j++ ){
					var dx:Number = Math.abs(i - hw);
					var dy:Number = Math.abs(j - hh);
					var v:Number = Math.pow(Math.pow(dx, p) + Math.pow(dy, p), p1);
					if (Math.abs(v-100) < think){
						bmd.setPixel32(i, j, 0xffff0000);
					}
				}
			}
			bmd.unlock();
			
		}
	}
	
}
