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
		private var d1:Number;
		private var d2:Number;
		private var m1:Number = 1;
		private var m2:Number = 100;
		private var shape:Shape;
		private var n:int = 0;
		private var pauseFlag:Boolean = false;
		private var lastD1:Number;
		private var lastD2:Number;
		private var xSca:Number = 1;
		private var ySca:Number = 1;
		private var autoPause:Boolean = false;
		private var dt:Number = 1.0;
		private var angle:Number = 1;
		private var d10:Number;
		private var d20:Number;
		private var lastD10:Number;
		private var lastD20:Number;
		private var v20:Number = 0;
		
		public function Main()
		{
			// constructor code
			stage ? initStage(null) : addEventListener(Event.ADDED_TO_STAGE, initStage);
			shape = new Shape();
			addChild(shape);
			shape.x = 220;
			shape.y = 100;
			resetClicked(null);
			shape.scaleY = -1;
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
			pauseFlag = true;
			
			v2 = parseFloat(this.tfv.text);
			m2 = parseInt(this.tfm.text);
			cube2.tf.text = m2 + 'kg';
			
			updateD();
			
			lastD1 = d1;
			lastD2 = d2;
			d10 = d1;
			d20 = d2;
			v20 = v2;
			lastD10 = d10;
			lastD20 = d20;
			
			xSca = Math.sqrt(1 / m1);
			ySca = Math.sqrt(1 / m2);
			dt = 1.0;
			
			angle = Math.atan2(ySca, xSca);
			initGra();
		}
		
		private function updateD():void{
			d1 = cube1.x - 10 - 30;
			d2 = cube2.x - 10 - 30 - 60;
		}
		
		private function enterFrameHandler(e:Event):void
		{
			if (!pauseFlag) {
				// trace('--------');
				if (autoPause) {
					dt = move(dt);
					// dt = move2(dt);
					if (dt == 0) {
						dt = 1;
					} else {
						pauseFlag = true;
					}
				} else {
					dt = 1;
					while (dt > 0) {
						dt = move(dt);
						// dt = move2(dt);
					}
				}
			}
		}
		private function move2(dt:Number):Number{
			if (dt <= 0)
			{
				return 0;
			}
			var ang:Number = (n + 1) * angle;
			if (ang < Math.PI) {
				var xn:Number = d10 / Math.tan(ang);
				var d:Number = d20 - xn;
				trace('=====', d10, Math.tan(ang), d20);
				trace(d, v20, ang, xn, dt);
				if (d + v20 * dt < 0) {
					var dt0:Number = -d / v20;
					trace('====', dt0);
					this.up(dt0);
					n++;
					if (n % 2 == 0){
						v1 = -v1;
					} else {
						var sin:Number = Math.sin(-ang * 2);
						var cos:Number = Math.cos( -ang * 2);
						var v22:Number = cos * v2 - sin * v1;
						var v12:Number = sin * v2 + cos * v1;
						v2 = v22;
						v1 = v12;
					}
					return dt - dt0;
				} else {
					this.up(dt);
					return 0;
				}
			} else {
				this.up(dt);
				return 0;
			}
			return 0;
		}
		
		private function up(dt:Number):void{
			d1 += v1 * dt;
			d2 += v2 * dt;
			d20 += v20;
			cube1.x = d1;
			cube2.x = d2;
			drawGra();
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
				updateD();
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
				updateD();
				drawGra();
				return dt - dt0;
			}
			else
			{
				cube1.x += v1 * dt;
				cube2.x += v2 * dt;
				updateD();
				drawGra();
				return 0;
			}
			return 0;
		}
		
		private function drawGra():void
		{
			
			var gra:Graphics = shape.graphics;
			gra.lineStyle(0, 0xff0000, 1.0);
			gra.moveTo(lastD2 * xSca, lastD1 * ySca);
			gra.lineTo(d2 * xSca, d1 * ySca);
			gra.moveTo(lastD20 * xSca, lastD10 * ySca);
			gra.lineTo(d20 * xSca, d10 * ySca);
			lastD1 = d1;
			lastD2 = d2;
			lastD10 = d10;
			lastD20 = d20;
		}
		
		private function initGra():void
		{
			var gra:Graphics = shape.graphics;
			gra.clear();
			gra.lineStyle(2, 0xffffff, 1.0);
			gra.moveTo(-200, 0);
			gra.lineTo(200, 0);
			gra.moveTo(0, -100);
			gra.lineTo(0, 100);
			gra.lineStyle(1, 0xffffff, 1.0);
			
			var ang:Number = angle;
			while (ang < Math.PI) {
				gra.moveTo(0, 0);
				gra.lineTo(200 * Math.cos(ang), 200 * Math.sin(ang));
				ang += angle;
				// trace(ang);
			}
		}
	
	}

}
