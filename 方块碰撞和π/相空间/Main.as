package
{
	
	import flash.display.Graphics;
	import flash.display.MovieClip;
	import flash.display.Shape;
	import flash.display.SimpleButton;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.text.TextField;
	
	public class Main extends MovieClip
	{
		
		public var ox:Number = 10;
		public var oy:Number = 390;
		public var resetBtn:SimpleButton;
		public var pauseBtn:SimpleButton;
		public var tf:TextField;
		public var cube1:MovieClip;
		public var cube2:MovieClip;
		public var tfv:TextField;
		public var tfm:TextField;
		public var switchMc:MovieClip;
		private var v1:Number = 0;
		private var v2:Number = -5;
		private var m1:Number = 1;
		private var m2:Number = 100;
		private var shape:Shape;
		private var n:int = 0;
		private var pauseFlag:Boolean = false;
		private var lastV1:Number = v1;
		private var lastV2:Number = v2;
		private var xSca:Number = 1;
		private var ySca:Number = 1;
		private var autoPause:Boolean = false;
		private var dt:Number = 1.0;
		
		public function Main()
		{
			// constructor code
			stage ? initStage(null) : addEventListener(Event.ADDED_TO_STAGE, initStage);
			shape = new Shape();
			addChild(shape);
			shape.x = 200;
			shape.y = 150;
			initGra();
			resetClicked(null);
		}
		
		private function initStage(e:Event):void
		{
			removeEventListener(Event.ADDED_TO_STAGE, initStage);
			addEventListener(Event.ENTER_FRAME, enterFrameHandler);
			resetBtn.addEventListener(MouseEvent.CLICK, resetClicked);
			pauseBtn.addEventListener(MouseEvent.CLICK, pauseClicked);
			switchMc.buttonMode = true;
			switchMc.addEventListener(MouseEvent.CLICK, switchClicked);
			switchMc.gotoAndStop(1);
		}
		
		private function switchClicked(e:MouseEvent):void 
		{
			autoPause = !autoPause;
			switchMc.gotoAndStop(pauseFlag? 2: 1);
		}
		
		private function pauseClicked(e:MouseEvent):void 
		{
			pauseFlag = !pauseFlag;
		}
		
		private function resetClicked(e:MouseEvent):void
		{
			cube1.x = 150;
			cube2.x = 300;
			v1 = 0;
			v2 = -5;
			n = 0;
			tf.text = '';
			initGra();
			pauseFlag = true;
			
			v2 = parseFloat(this.tfv.text);
			m2 = parseInt(this.tfm.text);
			cube2.tf.text = m2 + 'kg';
			
			lastV1 = v1;
			lastV2 = v2;
			
			var Energy:Number = (m1 * v1 * v1 + m2 * v2 * v2);
			var sca:Number = 100 * 100 / Energy;
			xSca = Math.sqrt(m1 * sca);
			ySca = Math.sqrt(m2 * sca);
			dt = 1.0;
		}
		
		private function enterFrameHandler(e:Event):void
		{
			if (!pauseFlag) {
				if (autoPause) {
					dt = move(dt);
					if (dt == 0) {
						dt = 1;
					} else {
						pauseFlag = true;
					}
				} else {
					dt = 1;
					while (dt > 0) {
						dt = move(dt);
					}
				}
			}
		}
		
		private function move(dt:Number):Number
		{
			if (dt <= 0)
			{
				return 0;
			}
			var dv:Number = v2 - v1;
			var d:Number = cube2.x - cube1.x - 60;
			var dt0:Number;
			if (cube1.x + v1 * dt <= 40)
			{
				// 碰墙
				// trace('撞墙');
				dt0 = (40 - cube1.x) / v1;
				cube1.x += v1 * dt0;
				cube2.x += v2 * dt0;
				n++;
				tf.text = n + '';
				v1 = -v1;
				drawGra();
				return dt - dt0;
			}
			else if (d + dv * dt <= 0)
			{
				// 碰撞
				// trace('碰撞');
				dt0 = -d / dv;
				cube1.x += v1 * dt0;
				cube2.x += v2 * dt0;
				n++;
				tf.text = n + '';
				var v10:Number = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2);
				var v20:Number = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2);
				v1 = v10;
				v2 = v20;
				drawGra();
				return dt - dt0;
			}
			else
			{
				cube1.x += v1 * dt;
				cube2.x += v2 * dt;
				drawGra();
				return 0;
			}
			return 0;
		}
		
		private function drawGra():void
		{
			
			var gra:Graphics = shape.graphics;
			gra.lineStyle(0, 0xff0000, 1.0);
			gra.moveTo(lastV1 * xSca, lastV2 * ySca);
			gra.lineTo(v1 * xSca, v2 * ySca);
			lastV1 = v1;
			lastV2 = v2;
		}
		
		private function initGra():void
		{
			var gra:Graphics = shape.graphics;
			gra.clear();
			gra.lineStyle(2, 0xffffff, 1.0);
			gra.moveTo(-150, 0);
			gra.lineTo(150, 0);
			gra.moveTo(0, -150);
			gra.lineTo(0, 150);
			gra.lineStyle(1, 0xffffff, 1.0);
			gra.drawCircle(0, 0, 100);
		}
	
	}

}
