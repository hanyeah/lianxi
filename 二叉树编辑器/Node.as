package  {
	
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
		}
		
		public function updateMaxLR():Point{
			var L:Point;
			var R:Point;
			if (left){
				left.updateMaxLR();
				L = left.LR;
			}
			if(right){
				right.updateMaxLR();
				R = right.LR;
			}
			
			LR.x = Math.max(1, L ? L.x + 1: 2, R.x - 1);
			LR.y = Math.max(1, L ? L.y - 1: 0, R.y + 1);
		}
		
		private function doubleClickHandler(e:MouseEvent):void 
		{
			toInput();
		}
		
		public function destroy():void{
			removeEventListener(MouseEvent.DOUBLE_CLICK, doubleClickHandler);
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
