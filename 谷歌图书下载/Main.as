package  {
	
	import flash.display.Loader;
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.events.SecurityErrorEvent;
	import flash.net.URLLoader;
	import flash.net.URLLoaderDataFormat;
	import flash.net.URLRequest;
	import flash.text.TextField;
	
	
	public class Main extends MovieClip {
		
		public var tf:TextField;
		private var uld:URLLoader;
		private var loader:Loader;
		public function Main() {
			// constructor code
			var url:String = 'https://books.google.com/books/content?id=6IUarHeMWpAC&hl=zh-CN&pg=PP1&img=1&zoom=3&sig=ACfU3U0e3NCtbkSi9fFsktMCMQ3FiMN3fg';
			uld = new URLLoader();
			uld.dataFormat = URLLoaderDataFormat.BINARY;
			uld.load(new URLRequest(url));
			uld.addEventListener(Event.COMPLETE, onLoaded);
			uld.addEventListener(SecurityErrorEvent.SECURITY_ERROR, onError);
			uld.addEventListener(IOErrorEvent.IO_ERROR, onError);
		}
		
		private function onLoaded(e:Event):void{
			trace(uld.data);
			tf.appendText('uld loaded');
			loader = new Loader();
			loader.loadBytes(uld.data);
			this.addChild(loader);
		}
		
		private function onError(e:Event):void{
			trace(e);
			tf.appendText(e.toString());
		}
	}
	
}
