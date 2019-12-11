package  {
	
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	
	
	public class Main extends MovieClip{
		
		public var mc1: MovieClip;
		public var mc2: MovieClip;
		public var mc3: MovieClip;
		private var constraintV: VerticalLineConstraint = new VerticalLineConstraint(new Point(100, 100), 200);
		private var constraintH: HorizontalLineConstraint = new HorizontalLineConstraint(new Point(200, 100), 200);
		private var constraintC: CircleConstraint = new CircleConstraint(new Point(300, 250), 100, 0, 360);
		
		public function Main() {
			// constructor code
			stage?initStage(null):addEventListener(Event.ADDED_TO_STAGE, initStage);
		}
		
		private function initStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, initStage);
			
			drag(mc1);
			drag(mc2);
			drag(mc3);
			
			
			var p1: Point = constraintV.getPercentP(0);
			mc1.x = p1.x;
			mc1.y = p1.y;
			mc1.mouseChildren = false;
			
			var p2: Point = constraintH.getPercentP(0);
			mc2.x = p2.x;
			mc2.y = p2.y;
			mc2.mouseChildren = false;
			
			var p3: Point = constraintC.getPercentP(0);
			mc3.x = p3.x;
			mc3.y = p3.y;
			mc3.mouseChildren = false;
			
			addEventListener(Event.ENTER_FRAME, enterFrameHandler);
		}
		
		private function enterFrameHandler(e:Event):void 
		{
			updateMc(mc1, constraintV);
			updateMc(mc2, constraintH);
			updateMc(mc3, constraintC);
		}
		
		private function updateMc(mc: MovieClip, constraint: IConstraint):void {
			var p: Point = constraint.getConstraintP(new Point(mc.x, mc.y));
			mc.x = p.x;
			mc.y = p.y;
			mc.tf.text = Math.floor(constraint.getPercent(p) * 100) + "%";
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
import flash.geom.Point;

interface IConstraint{
	function getPercentP(per: Number):Point;
	function getConstraintP(p: Point):Point;
	function getPercent(p: Point):Number;
}

class VerticalLineConstraint implements IConstraint{
	public var p0: Point;
	public var length: Number;
	public function VerticalLineConstraint(p0: Point, length: Number){
		this.p0 = p0;
		this.length = length;
	}
	
	public function getPercentP(per: Number):Point{
		return new Point(p0.x, p0.y + length * per);
	}
	
	public function getConstraintP(p: Point):Point{
		p = p.clone();
		p.y = Utils.limitAB(p.y, p0.y, p0.y + length);
		p.x = p0.x;
		return p;
	}
	
	public function getPercent(p: Point):Number{
		return (p.y - p0.y) / length;
	}
	
}

class HorizontalLineConstraint implements IConstraint{
	public var p0: Point;
	public var length: Number;
	public function HorizontalLineConstraint(p0: Point, length: Number){
		this.p0 = p0;
		this.length = length;
	}
	
	public function getPercentP(per: Number):Point{
		return new Point(p0.x + length * per, p0.y);
	}
	
	public function getConstraintP(p: Point):Point{
		p = p.clone();
		p.x = Utils.limitAB(p.x, p0.x, p0.x + length);
		p.y = p0.y;
		return p;
	}
	
	public function getPercent(p: Point):Number{
		return (p.x - p0.x) / length;
	}
	
}

class CircleConstraint implements IConstraint{
	public var p0: Point;
	public var r: Number;
	public var ang0: Number;
	public var ang1: Number;
	public function CircleConstraint(p0: Point, r: Number, ang0: Number, ang1: Number){
		this.p0 = p0;
		this.r = r;
		this.ang0 = ang0;
		this.ang1 = ang1;
	}
	
	public function getPercentP(per: Number):Point{
		var ang: Number = Utils.ang2rad(per * (ang1 - ang0) + ang0);
		return getAngP(ang);
	}
	
	public function getConstraintP(p: Point):Point{
		var per: Number = getPercent(p);
		per = Utils.limitAB(per, 0, 1);
		return getPercentP(per);
	}
	
	public function getPercent(p: Point):Number{
		var ang: Number = Utils.rad2ang(Math.atan2(p.y - p0.y, p.x - p0.x));
		if (ang < 0){
			ang += 360;
		}
		return (ang - ang0) / (ang1 - ang0);
	}
	
	private function getAngP(ang:Number):Point{
		return new Point(p0.x + r * Math.cos(ang), p0.y + r * Math.sin(ang));
	}
	
}

class Utils{
	public static function limitAB(x: Number, a:Number, b: Number):Number{
		if (a > b){
			var t: Number = a;
			a = b;
			b = t;
		}
		if (x < a){
			return a;
		}
		if (x > b){
			return b;
		}
		return x;
	}
	
	public static function ang2rad(ang: Number): Number{
		return ang * Math.PI / 180;
	}
	
	public static function rad2ang(rad: Number): Number{
		return rad * 180 / Math.PI;
	}
	
}
