// 习惯用trace
var trace = fl.trace;
// 加载外部JSON库
var JSFL_PATH = fl.scriptURI.substr(0,fl.scriptURI.lastIndexOf("/")+1);
fl.runScript(JSFL_PATH + "json2.jsfl");
//
var flaDocument = fl.getDocumentDOM();
var path;
var name;

if(!flaDocument){
	trace("没有打开的文档");
} else {
	// 初始化sheet
	initSheet();
	// 处理名字和路径
	initPathAndName();
	//clean
	var texturePath = path + "textures";
	forEach([path+name+".json", path+name+".css", path+name+".png"], function(file){
			if (FLfile.exists(file)) {
    			FLfile.remove(file);
			}
	});
	
	// 解析文档
	trace(flaDocument.path);
	jiexiDoc();
	// 保存
	save();
	// trace(JSON.stringify(data, null, 2));
}

function jiexiDoc(){
	flaDocument.selectAll();
	forEach(flaDocument.selection, function(instance){
			var na = instance.libraryItem.name.split(".")[0];
			fl.spriteSheetExporter.addBitmap(instance, na);
			trace(na);
	});
}

function forEach(arr, callBack){
	for(var i = 0; i < arr.length; i++){
		callBack(arr[i]);
	}
}

function getCssData(jsonData){
	var o = JSON.parse(jsonData);
	var a = [];
	a.push("."+name+"_sprite{background-image:url(/"+ name+".png); background-repeat:no-repeat}");
	for(var key in o.frames){
		var oo = o.frames[key];
		var frame = oo.frame;
		a.push("."+key+" {width:"+frame.w+"px;height:"+frame.h+"px;background-position:"+frame.x+"px "+frame.y+"px;}");
	}
	return a.join("\n");
}

// 保存
function save(){
	//var strData = JSON.stringify(data, null, 2);
//	var confFile = path + name + "_conf.json";
//	FLfile.write(confFile, strData);
	//trace("导出" + confFile);
	var jsonData = fl.spriteSheetExporter.exportSpriteSheet(path + name, {format:"png", bitDepth:32, backgroundColor:"#00000000"});
	var cssData = getCssData(jsonData);
	var cssFile = path + name + ".css";
	FLfile.write(cssFile, cssData);
	trace("导出" + cssFile);
}

// 初始化名字和路径
function initPathAndName(){
	name = flaDocument.name.replace(".fla", "");
	path = flaDocument.path;
	if (path.indexOf("/") == -1) {
   		//windows
    	path = "file:///" + path.substring(0, path.lastIndexOf("\\") + 1);
    	path = path.split("\\").join("/");
	} else {
    	//MAC
    	path = "file://" + path.substring(0, path.lastIndexOf("/") + 1);
	}
}
// 初始化sheet
function initSheet(){
	fl.spriteSheetExporter.borderPadding = 2;
	fl.spriteSheetExporter.shapePadding = 2;
	fl.spriteSheetExporter.layoutFormat = "JSON";
	fl.spriteSheetExporter.canStackDuplicateFrames = false;
	fl.spriteSheetExporter.stackDuplicateFrames = false;
}

function isBitmap(element){
	return element.elementType == "instance" && element.instanceType == "bitmap";
}

function isNomalLayer(layer){
 return layer.layerType == "normal";
}
