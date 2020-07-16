// 习惯用trace
var trace = fl.trace;
// 加载外部JSON库
var JSFL_PATH = fl.scriptURI.substr(0,fl.scriptURI.lastIndexOf("/")+1);
fl.runScript(JSFL_PATH + "json2.jsfl");
//
var flaDocument = fl.getDocumentDOM();
var path;
var name;
var sheet;
var data = {
	instances: [],
	libs:{}
};
if(!flaDocument){
	trace("没有打开的文档");
} else {
	// 初始化sheet
	initSheet();
	// 处理名字和路径
	initPathAndName();
	//clean
	var texturePath = path + "textures";
	if (FLfile.exists(texturePath)) {
    	FLfile.remove(texturePath)
	}
	// 解析文档
	jiexiDoc();
	// 化简
	forEach(data.instances, huajian);
	for(var key in data.libs){
		huajian(data.libs[key]);
	}
	// 保存
	save();
	// trace(JSON.stringify(data, null, 2));
}

//解析文档
function jiexiDoc(){
	var elements = bianliTimeline(flaDocument.getTimeline(), isMovieClip, 1)[0];
	forEach(elements, function(instance){
			if(isSupport(instance)){
				//data.instances.push({
				//	libName: instance.libraryItem.name,
				//	instanceName: instance.name
				//});
				data.instances.push(instance.libraryItem.name);
				data.libs[instance.libraryItem.name] = parseLibItem(instance.libraryItem);
			}
	});
}

function parseLibSprite(libraryItem){
	trace("sprite");
	instances = bianliTimeline(libraryItem.timeline, isSupport, 1)[0];
	if(!isContainer(instances)){
		var instance = instances[0];
		var o = parseLibBitmap(instance.libraryItem);
		if(instance.x != 0 || instance.y != 0){
			o.anchor = {
				x: toFixed(-instance.x / instance.width, 4),
				y: toFixed(-instance.y / instance.height, 4)
			};
		}
		return o;
	}
	var o = {
		type: "Container",
		children: []
	};
	forEach(instances, function(instance){
			if(isSupport(instance)){
				o.children.push(parseBaseParam(instance, {}));
				var oo = parseLibItem(instance.libraryItem);
				if(oo){
					data.libs[instance.libraryItem.name] = oo;
				}
			}
	});
	return o;
}

function parseLibBitmap(libraryItem){
	trace("bitmap" + libraryItem.name);
	var o = {
		type: "Bitmap",
		texture: libraryItem.name
	};
	sheet.addBitmap(libraryItem);
	return o;
}

function parseLibMovieClip(libraryItem){
	trace("AnimatedSprite");
	var frames = bianliTimeline(libraryItem.timeline, isSupport, 0);
	if(isAnimatedSprite(frames)){
		var o = {
			type: "AnimatedSprite",
			textureArray: []
		};
		forEach(frames, function(frame){
			var element = frame[0];
			o.textureArray.push(element.libraryItem.name);
			sheet.addBitmap(element.libraryItem);
		});
		return o;
	}
	return null;
}

function parseLibItem(libraryItem){
	if(data.libs[libraryItem.name]){
		return null;
	}
	var o;
	if(!libraryItem.symbolType){
		o = parseLibBitmap(libraryItem);
	} else {
		if(isOneFrame(libraryItem)){
		    o = parseLibSprite(libraryItem);
		} else {
			o = parseLibMovieClip(libraryItem);
		}
	}
	return o;
}
//
function isContainer(instances){
	return !(instances.length == 1 && isBitmap(instances[0]) && isOri(parseBaseParam(instances[0], {})));
}

function isAnimatedSprite(arr){
	for(var i = 0; i < arr.length; i++){
		if(arr[i].length > 1){
			return false;
		}
		if(!isBitmap(arr[i][0])){
			return false;
		}
	}
	return true;
}

function canIgnore(co){
	if(co.type == "MovieClip"){
		return true;
	}
	if(co.type == "Container" && co.children.length == 0){
		return true;
	}
	return false;
}

function isOri(o){
	return o.sx == 1 && o.sy == 1 && o.rotation == 0 && o.alpha == 1;
}

function parseBaseParam(instance, o){
	o.libName = instance.libraryItem.name;
	o.name = instance.name;
	o.x = toFixed(instance.x, 2);
	o.y = toFixed(instance.y, 2);
	o.rotation = toFixed(instance.rotation || 0, 2);
	o.sx = toFixed(instance.scaleX, 3);
	o.sy = toFixed(instance.scaleY, 3);
	o.alpha = instance.colorAlphaPercent == null ? 1: toFixed((instance.colorAlphaPercent / 100), 2);
	return o;
}

// 保存
function save(){
	var strData = JSON.stringify(data, null, 2);
	var confFile = path + name + "_conf.json";
	FLfile.write(confFile, strData);
	trace("导出" + confFile);
	var jsonData = sheet.exportSpriteSheet(path + name, {format:"png", bitDepth:32, backgroundColor:"#00000000"});
	//
	// jsonData = jsonFrameAddFileName(jsonData);
	//
	var jsonFile = path + name + ".json";
	FLfile.write(jsonFile, jsonData);
	trace("导出" + jsonFile);
}

function jsonFrameAddFileName(jsonData){
	var o = JSON.parse(jsonData);
	for(var key in o.frames){
		o.frames[name + "/" + key] = o.frames[key];
		delete o.frames[key];
	}
	return JSON.stringify(o, null, 2);
}

// 化简
function huajian(o){
	if(o.x == 0){
		delete o.x;
	}
	if(o.y == 0){
		delete o.y;
	}
	if(o.sx == 1){
		delete o.sx;
	}
	if(o.sy == 1){
		delete o.sy;
	}
	if(o.alpha == 1){
		delete o.alpha;
	}
	if(o.rotation == 0){
		delete o.rotation;
	}
	if(o.name == ""){
		delete o.name;
	}
	if(o.children){
		forEach(o.children, huajian);
	}
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
	sheet = new SpriteSheetExporter();
	sheet.borderPadding = 2;
	sheet.shapePadding = 2;
	sheet.layoutFormat = "JSON";
	sheet.canStackDuplicateFrames = false;
	sheet.stackDuplicateFrames = false;
}

// 遍历Timeline
function bianliTimeline(timeline, filterEle, maxFrame){
	var result = [];
	var layers = timeline.layers;
	var totalFrames = maxFrame ? Math.min(maxFrame, timeline.frameCount): timeline.frameCount;
	for(var i = 0; i < totalFrames; i++){
		var a = [];
		for(var j = layers.length - 1; j >= 0; j--){
			var layer = layers[j];
			if(!isNomalLayer(layer)){
				continue;
			}
			var frame = layer.frames[i];
			if(frame){
				var elements = frame.elements;
				for(var k = 0; k < elements.length; k++){
					if(!filterEle || filterEle(elements[k])){
						a.push(elements[k]);
					}
				}
			}
		}
		result.push(a);
	}
	return result;
}

function toFixed(num, n){
	var s = num + "";
	if(s.indexOf(".")!=-1 && s.indexOf(".") + n < s.length){
		return num.toFixed(n);
	}
	return num;
}

function forEach(arr, callBack){
	for(var i = 0; i < arr.length; i++){
		callBack(arr[i]);
	}
}

function isOneFrame(libraryItem){
	return libraryItem.timeline.frameCount == 1;
}

function isSprite(element){
	return isMovieClip(element) && element.libraryItem.timeline.frameCount == 1;
}

function isBitmap(element){
	return element.elementType == "instance" && element.instanceType == "bitmap";
}

function isMovieClip(element){
	return element.elementType == "instance" && element.instanceType == "symbol" && element.libraryItem.symbolType == "movie clip";
}

function isSupport(element){
	return isBitmap(element) || isMovieClip(element);
}

function isNomalLayer(layer){
 return layer.layerType == "normal";
}
