package  {
	
	import flash.display.MovieClip;
	import flash.events.Event;
	
	
	public class Main extends MovieClip {
		
		private var ballArr:Array = [];
		private var t:Number = 0;
		public function Main() {
			// constructor code
			stage?initStage(null):addEventListener(Event.ADDED_TO_STAGE, initStage);
		}
		
		private function initStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, initStage);
			
			for (var i: int = 0; i < 5; i++) {
				var ball: Ball = new Ball(i);
				ballArr.push(ball);
				addChild(ball);
			}
			
			addEventListener(Event.ENTER_FRAME, enterFrameHandler);
		}
		
		private function enterFrameHandler(e:Event):void 
		{
			t += 1000 / stage.frameRate;
			for (var i: int = 0; i < this.ballArr.length; i++) {
				var ball: Ball = ballArr[i];
				ball.refresh(t);
			}
		}
		
	}
	
}
import flash.display.Sprite;

class Ball extends Sprite{
	public var id:int = 0;
	public function Ball(id:int) {
		super();
		this.id = id;
	}
	
	public function refresh(t:Number) {
		// θ = A*cos(ω * t + ψ)
		// ω = sqrt(g/L)
		
		var r: Number = 15;
		var x0: Number = id * 2 * r + 75;
		var y0: Number = 50;
		
		
		var g:Number = 9.8 * 10;
		var L:Number = 100;
		var x1: Number = x0;
		var y1: Number = y0 + L;
		
		var w:Number = Math.sqrt(g / L);
		var T:Number = 2 * Math.PI / w;
		var theta:Number = 0;
		if (id == 0) {
			theta = 1.0 * Math.cos(w * (t * 0.001 + 0));
			if (theta > 0) {
				theta = 0;
			}
			x1 = x0 + L * Math.sin(theta);
			y1 = y0 + L * Math.cos(theta);
		} else if (id == 4) {
			theta = 1.0 * Math.cos(w * (t * 0.001 + 0));
			if (theta < 0) {
				theta = 0;
			}
			x1 = x0 + L * Math.sin(theta);
			y1 = y0 + L * Math.cos(theta);
		}
		
		graphics.clear();
		graphics.lineStyle(1, 0x000000, 1.0);
		graphics.moveTo(x0, y0);
		graphics.lineTo(x1, y1);
		graphics.drawCircle(x1, y1, r);
	}
	
}
