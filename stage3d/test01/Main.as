package  {
	import flash.display.MovieClip;
	import flash.display.Stage3D;
	import flash.display3D.Context3DProgramType;
	import flash.display3D.Context3DVertexBufferFormat;
	import flash.display3D.IndexBuffer3D;
	import flash.display3D.VertexBuffer3D;
	import flash.events.Event;
	import flash.display3D.Context3D;
	import flash.display3D.Program3D;
	import com.adobe.utils.AGALMiniAssembler;
	// https://www.bbsmax.com/A/MAzAKn7R59/
	// https://helpx.adobe.com/cn/flash-player/release-note/fp_17_air_17_release_notes.html
	// https://github.com/hanyeah/graphicscorelib
	// https://help.adobe.com/zh_CN/as3/dev/WSd6a006f2eb1dc31e-310b95831324724ec56-8000.html
	
	public class Main extends MovieClip {
		
		
		public function Main() {
			// constructor code
			if(stage.stage3Ds.length){
				var stage3D: Stage3D = stage.stage3Ds[0];
				stage3D.addEventListener(Event.CONTEXT3D_CREATE, myContext3DHandler);
				stage3D.requestContext3D();
			}
		}
		
		public function myContext3DHandler(e: Event): void{
			var stage3D: Stage3D = e.target as Stage3D;
			var context3D:Context3D = stage3D.context3D;
			context3D.configureBackBuffer(300,300, 4, false);
			context3D.clear(0.0, 0.0, 0.0, 1.0);
			context3D.present();
			
			var triangleData: Vector.<Number> = Vector.<Number>([
				// x, y
				-1, -1, 0, 0, 1,
				-1, 1, 0, 1, 0,
				1, -1, 1, 0, 0,
				1, 1, 0, 1, 0
			]);
			var vb: VertexBuffer3D  = context3D.createVertexBuffer(4, 5);
			vb.uploadFromVector(triangleData, 0, 4);
			var indexData: Vector.<uint> = Vector.<uint>([
				0, 1, 2, 1, 2, 3
			]);
			var ib: IndexBuffer3D = context3D.createIndexBuffer(6);
			ib.uploadFromVector(indexData, 0, 6);
			
			
			var vec: Vector.<Number> = Vector.<Number>([0.0, 1.0, 0.5, 1.0]);
			trace(vec);
			
			context3D.enableErrorChecking = true;
			context3D.setProgramConstantsFromVector(Context3DProgramType.FRAGMENT, 0, vec);
			
			//A simple vertex program in AGAL
			const VERTEX_SHADER:String =["mov op, va0",
				"mov v0, va1"].join("\n"); 
			//A simple fragment (or pixel) program in AGAL        
			const FRAGMENT_SHADER:String = [
			"mov ft0 v0",
			"mov ft0.x fc0.z",
			"mov oc ft0",
			].join("\n");  
			var vertexAssembly:AGALMiniAssembler = new AGALMiniAssembler();
			var fragmentAssembly:AGALMiniAssembler = new AGALMiniAssembler();
			//Compile shaders
			vertexAssembly.assemble(Context3DProgramType.VERTEX, VERTEX_SHADER);
			fragmentAssembly.assemble(Context3DProgramType.FRAGMENT, FRAGMENT_SHADER);  

			
			context3D.clear(0.0, 0.0, 0.0, 1.0);
			context3D.setVertexBufferAt(0, vb, 0, Context3DVertexBufferFormat.FLOAT_2);
			context3D.setVertexBufferAt(1, vb, 2, Context3DVertexBufferFormat.FLOAT_3);
			var program3D: Program3D = context3D.createProgram();
			program3D.upload(vertexAssembly.agalcode, fragmentAssembly.agalcode);
			context3D.setProgram(program3D);
			context3D.drawTriangles(ib);
			context3D.present();
			
		}
	}
	
}
