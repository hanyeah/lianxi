package  {
	
	import flash.display.MovieClip;
	import flash.geom.Point;
	
	
	public class Car extends MovieClip {
		
		public var sensor0: MovieClip;
		public var sensor1: MovieClip;
		private var speed: Number = 1;
		public function Car() {
			// constructor code
			sensor0.gotoAndStop(1);
			sensor1.gotoAndStop(1);
		}
		
		public function update(): void {
			var angle: Number = Math.PI * (-90 + this.rotation) / 180;
			this.x += speed * Math.cos(angle);
			this.y += speed * Math.sin(angle);
		}
	}
	
}
