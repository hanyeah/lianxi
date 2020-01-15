package  {
	
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.display.Graphics;
	import flash.geom.Point;
	
	
	public class Test01 extends MovieClip {
		
		
		private var con: Sprite;
		public function Test01() {
			// constructor code
			con = new Sprite();
			addChild(con);
			var sp1: Sprite = new Sprite();
			var sp2: Sprite = new Sprite();
			con.addChild(sp1);
			con.addChild(sp2);
			var gra1: Graphics = sp1.graphics;
			gra1.lineStyle(1, 0xff0000);
			var gra2: Graphics = sp2.graphics;
			gra2.lineStyle(1, 0x00ff00);
			
			var t: Number = 0;
			var g: Number = 9.8;
			var v0: Point = new Point(10, 0);
			var v: Point = new Point(10, 0);
			var p0: Point = new Point(0, 0);
			var p1: Point = new Point(0, 0);
			var dt: Number = 1;
			gra1.moveTo(0, 0);
			gra2.moveTo(0, 0);
			while(t < 100){
				p1.x = v0.x * t;
				p1.y = v0.y * t + 0.5 * g * t * t;
				gra1.lineTo(p1.x, p1.y * 0.1);
				
				v.y += g * dt;
				p0.x += v.x * dt;
				p0.y += v.y * dt;
				gra2.lineTo(p0.x, p0.y * 0.1);
				t += dt;
			}
			
			
		}
	}
	
}
