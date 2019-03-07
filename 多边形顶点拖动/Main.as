package  {
	
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	
	//http://www.gotoandplay.it/_articles/2004/12/inverseKinematics.php
	//http://www.gotoandplay.it/_articles/2004/11/ik_engine.php
	public class Main extends MovieClip {
		
		public var p0:MovieClip;
		public var p1:MovieClip;
		public var p10:MovieClip;
		public var p11:MovieClip;
		public var p12:MovieClip;
		public var p13:MovieClip;
		
		public var p20:MovieClip;
		public var p21:MovieClip;
		public var p22:MovieClip;
		
		public var pArr:Array;
		public var pArr1:Array;
		public var pArr2:Array;
		public var edgeArr1:Array = [];
		public var edgeArr2:Array = [];
		public function Main() {
			// constructor code
			
			pArr = [p0, p1, p10, p11, p12, p13, p20, p21, p22];
			pArr1 = [p0, p10, p11, p12, p13, p1];
			pArr2 = [p0, p20, p21, p22, p1];
			for (var i : int = 0; i < pArr.length; i++ ) {
				var p:MovieClip = pArr[i];
				drag(p);
			}
			this.updateOxy();
			this.updateEdge();
			
			addEventListener(Event.ENTER_FRAME, enterFrameHandler);
		}
		
		private function enterFrameHandler(e:Event):void 
		{
			if (draged) {
				dragHandler();
			}
			graphics.clear();
			drawLines(pArr1, 0xff0000);
			drawLines(pArr2, 0xff0000);
		}
		
		private function updateEdge() {
			for (var i : int = 1; i < pArr1.length; i++ ) {
				edgeArr1[i - 1] = dis(pArr1[i], pArr1[i-1]);
			}
			for (var i : int = 1; i < pArr2.length; i++ ) {
				edgeArr2[i - 1] = dis(pArr2[i], pArr2[i-1]);
			}
		}
		
		private function drawLines(vector:Array, color:uint):void{
			graphics.lineStyle(2, color, 1.0);
			for (var i :int = 0; i < vector.length; i++) {
				var p:MovieClip = vector[i];
				if (i == 0) {
					graphics.moveTo(p.x, p.y);
				} else {
					graphics.lineTo(p.x, p.y);
				}
			}
		}
		
		private function dragHandler():void {
			switch(curSp) {
				case p0:
					dragP0();
					break;
				case p1:
					dragP1();
					break;
				default:
					updateEdge();
					break;
			}
		}
		
		private function dragP0():void{
			var dx:Number = p0.x - p0.ox;
			var dy:Number = p0.y - p0.oy;
			for (var i : int = 1; i < pArr.length; i++ ) {
				var p :MovieClip = pArr[i];
				p.x += dx;
				p.y += dy;
			}
			this.updateOxy();
		}
		
		private function updateOxy():void{
			p0.ox = p0.x;
			p0.oy = p0.y;
			p1.ox = p1.x;
			p1.oy = p1.y;
		}
		
		private function dragP1():void{
			var tp:Point = new Point(p1.x, p1.y);
			var n:int = 0;
			while (true) {
				move(pArr1, tp, edgeArr1);
				move(pArr2, tp, edgeArr2);
				n++;
				if(n > 10){
					break;
				}
				if(dis2(tp, p1) < 0.01){
					break;
				}
			}
			
			this.updateOxy();
		}
		
		private function move(arr:Array, p:Point, edgArr:Array):void{
			var tp:Point = new Point(p.x, p.y);
			p1.x = p1.ox;
			p1.y = p1.oy;
			for (var i:int = arr.length - 1; i > 0; i--){
				var p0:Object = arr[i - 1];
				var p1:Object = arr[i];
				moveToTarget(p0, p1, tp, edgArr[i - 1]);
				tp.x = p0.x;
				tp.y = p0.y;
			}
			
			tp.x = p0.ox;
			tp.y = p0.oy;
			for (var i:int = 1; i < arr.length; i++){
				var p0:Object = arr[i];
				var p1:Object = arr[i - 1];
				moveToTarget(p0, p1, tp, edgArr[i - 1]);
				tp.x = p0.x;
				tp.y = p0.y;
			}
			
		}
		
		private function moveToTarget(p0:Object, p1:Object, tp:Object, d:Number):void{
			var angle:Number = Math.atan2(tp.y - p0.y, tp.x - p0.x);
			p1.x = p0.x + d * Math.cos(angle);
			p1.y = p0.y + d * Math.sin(angle);
			var dx:Number = tp.x - p1.x;
			var dy:Number = tp.y - p1.y;
			p0.x += dx;
			p0.y += dy;
			p1.x = tp.x;
			p1.y = tp.y;
		}
		
		private function dis2(p1:Object, p2:Object):Number{
			var dx:Number = p1.x - p2.x;
			var dy:Number = p1.y - p2.y;
			return dx * dx + dy * dy;
		}
		
		private function dis(p1:Object, p2:Object):Number{
			return Math.sqrt(dis2(p1, p2));
		}
		
		//-----------------------------
		private var curSp:Sprite;
		private var draged:Boolean = false;
		
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
			stage.addEventListener(MouseEvent.MOUSE_UP, mouseUpHandler);
			stage.addEventListener(Event.MOUSE_LEAVE, mouseUpHandler);
		}
		
		private function mouseUpHandler(e:MouseEvent):void
		{
			curSp.stopDrag();
			curSp = null;
			removeEventListener(MouseEvent.MOUSE_MOVE, mouseMoveHandler);
			stage.removeEventListener(MouseEvent.MOUSE_UP, mouseUpHandler);
			stage.removeEventListener(Event.MOUSE_LEAVE, mouseUpHandler);
		}
		
		private function mouseMoveHandler(e:MouseEvent):void
		{
			//
			draged = true;
		}
	}
	
}
