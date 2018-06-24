package  {
	
	import flash.display.Graphics;
	import flash.display.MovieClip;
	import flash.display.Shape;
	import flash.events.Event;
	import flash.geom.Point;
	
	
	public class Main extends MovieClip {
		
		
		public function Main() {
			// constructor code
			var shape:Shape = new Shape();
			var r:Number = 50;
			addChild(shape);
			shape.x = 275;
			shape.y = 200;
			var ang:Number = 0;
			
			addEventListener(Event.ENTER_FRAME, enterframeHandler);
			
			function enterframeHandler(e:Event):void{
				ang += 0.01;
				var p0:Point = new Point(0, 0);
				var p1:Point = new Point(0, r);
				var cos:Number = Math.cos(ang);
				var sin:Number = Math.sin(ang);
				var p2:Point = new Point(cos, sin); 
				var gra:Graphics = shape.graphics;
				var x0:Number = r * Math.tan(Math.PI/4+ang/2);
				gra.clear();
				gra.lineStyle(1, 0x000000);
				gra.moveTo( -1000, 0);
				gra.lineTo(1000,0);
				gra.lineStyle(1, 0xff0000);
				gra.drawCircle(0, 0, r);
				gra.lineStyle(1, 0x00ff00);
				gra.moveTo(0, 0);
				gra.lineTo(p2.x, p2.y);
				gra.lineStyle(1, 0x0000ff);
				gra.moveTo(p1.x, p1.y);
				gra.lineTo(x0*2-p1.x, -p1.y);
				gra.lineStyle(1, 0xff00ff);
				gra.drawCircle(p2.x, p2.y, 3);
				gra.drawCircle(p1.x, p1.y, 3);
				gra.drawCircle(x0,0, 3);
			}
		}
	}
	
}
