package  {
	
	import flash.display.Graphics;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.FocusEvent;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	import flash.text.TextField;
	import flash.text.TextFieldType;
	
	
	public class Node extends MovieClip {
		
		public var circle:MovieClip;
		public var circleL:MovieClip;
		public var circleR:MovieClip;
		public var tf:TextField;
		public var lineMc:MovieClip;
		private var value:Number;
		public var left:Node;
		public var right:Node;
		public var parentNode:Node;
		public var LR:Point = new Point(1, 1);
		public static var counting:Number = 1;
		public function Node(value:Number = NaN) {
			// constructor code
			if (isNaN(value)){
				value = Node.counting++;
			}
			setValue(value);
			tf.mouseEnabled = false;
			doubleClickEnabled = true;
			addEventListener(MouseEvent.DOUBLE_CLICK, doubleClickHandler);
			addEventListener(MouseEvent.CLICK, clickHandler);
			updateLR();
			mouseChildren = false;
		}
		
		private function clickHandler(e:MouseEvent):void 
		{
			stage.focus = this;
		}
		
		public function updateLR():void{
			var w:int = 35;
			var h:int = 65;
			circleL.x = -(left?left.LR.y+1:1) * w; 
			circleL.y = h; 
			circleR.x = (right?right.LR.x+1:1) * w; 
			circleR.y = h; 
			while(lineMc.numChildren){
				lineMc.removeChildAt(0);
			}
			var gra:Graphics = lineMc.graphics;
			gra.clear();
			gra.lineStyle(2, 0x000000, 1.0);
			gra.moveTo(-21, 15);
			gra.lineTo(circleL.x, circleL.y - 25);
			gra.moveTo(21, 15);
			gra.lineTo(circleR.x, circleR.y - 25);
			if(left){
				left.updateLR();
			}
			if(right){
				right.updateLR();
			}
		}
		
		public function updateMaxLR():void{
			var L:Point;
			var R:Point;
			if (left){
				left.updateMaxLR();
				L = left.LR;
			} else {
				L = new Point(0, 0);
			}
			if(right){
				right.updateMaxLR();
				R = right.LR;
			} else {
				R = new Point(0, 0);
			}
			
			LR.x = Math.max(1, L.x + L.y + 1);
			LR.y = Math.max(1, R.x + R.y + 1);
		}
		
		private function doubleClickHandler(e:MouseEvent):void 
		{
			toInput();
		}
		
		public function destroy():void{
			removeEventListener(MouseEvent.DOUBLE_CLICK, doubleClickHandler);
			removeEventListener(MouseEvent.CLICK, clickHandler);
		}
		
		public function setValue(value:Number):void{
			tf.text = value+"";
			this.value = value;
		}
		
		public function getValue():Number{
			return this.value;
		}
		
		private function toInput():void {
			tf.type = TextFieldType.INPUT;
			tf.selectable = true;
			tf.mouseEnabled = true;
			tf.background = true;
			stage.focus = tf;
			
			stage.addEventListener(FocusEvent.MOUSE_FOCUS_CHANGE, onFocusChange);
		}
		
		private function onFocusChange(e:FocusEvent):void 
		{
			stage.removeEventListener(FocusEvent.MOUSE_FOCUS_CHANGE, onFocusChange);
			toDynamic();
		}
		private function toDynamic():void {
			tf.type = TextFieldType.DYNAMIC;
			tf.selectable = false;
			tf.mouseEnabled = false;
			tf.background = false;
		}
		
	}
	
}
