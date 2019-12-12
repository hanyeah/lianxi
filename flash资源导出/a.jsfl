var trace = fl.trace;
// fl.trace(fl.configDirectory);
// trace(fl.scriptURI);
var JSFL_PATH = fl.scriptURI.substr(0,fl.scriptURI.lastIndexOf("/")+1);
fl.runScript(JSFL_PATH + "json2.jsfl");

var flaDocument = fl.getDocumentDOM();
var path;
var name;
var timeline;
var elements;


var sheet = new SpriteSheetExporter();
sheet.borderPadding = 2;
sheet.shapePadding = 2;
sheet.layoutFormat = "JSON";
sheet.canStackDuplicateFrames = false;
sheet.stackDuplicateFrames = false;

if(!flaDocument){
	trace("没有打开的文档");
} else {
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
	//clean
	var texturePath = path + "textures";
	if (FLfile.exists(texturePath)) {
    	FLfile.remove(texturePath)
	}
	//trace(flaDocument.name);
	// trace(path);
	// 解析
	elements = bianliTimeline(flaDocument.getTimeline(), isMovieClip, 1)[0];
	var arr = [];
	forEach(elements, function(element){
		arr.push(parseEq(element));
	});
	// 化简
	forEach(arr, huajian);
	// 保存
	var strData = JSON.stringify(arr, null, 2);
	// trace(strData);
	var confFile = path + name + "_conf.json";
	FLfile.write(confFile, strData);
	trace("导出" + confFile);
	var jsonData = sheet.exportSpriteSheet(path + name, {format:"png", bitDepth:32, backgroundColor:"#00000000"});
	//
	// jsonData = jsonFrameAddFileName(jsonData);
	//
	FLfile.write(jsonFile, jsonData);
	var jsonFile = path + name + ".json";
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

function parseEq(element){
	var o = parseSprite(element, true);
	o.name = element.libraryItem.name;
	return o;
}

function parseSprite(instance, isEq){
	var symbolItem = instance.libraryItem;
	elements = bianliTimeline(symbolItem.timeline, isSupport, 1)[0];
	if(!isEq){
		if(elements.length == 1 && isBitmap(elements[0])){
			var ele = elements[0];
			var bo = parseElement(ele);
			if(isOri(bo)){
				parseBaseParam(instance, bo);
				if(ele.x != 0 || ele.y != 0){
					bo.anchor = {
						x: toFixed(-ele.x / ele.width, 4),
						y: toFixed(-ele.y / ele.height, 4)
					};
				}
				return bo;
			}
		}
	}
	var o = {
		type: "Container",
		children: []
	};
	if(!isEq){
		parseBaseParam(instance, o);
	}
	forEach(elements, function(element){
			var co = parseElement(element);
			if(!canIgnore(co)){
				o.children.push(co);
			}
	});
	return o;
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
	o.name = instance.name;
	o.x = toFixed(instance.x, 2);
	o.y = toFixed(instance.y, 2);
	o.rotation = toFixed(instance.rotation || 0, 2);
	o.sx = toFixed(instance.scaleX, 3);
	o.sy = toFixed(instance.scaleY, 3);
	o.alpha = instance.colorAlphaPercent == null ? 1: toFixed((instance.colorAlphaPercent / 100), 2);
}

function parseElement(element){
	if(isMovieClip(element)){
		if(isSprite(element)){
			return parseSprite(element);
		} else {
			return parseMovieClip(element);
		}
	} else if(isBitmap(element)){
		return parseBitmap(element);
	}
}

function parseMovieClip(instance){
	var symbolItem = instance.libraryItem;
	var frames = bianliTimeline(symbolItem.timeline, isSupport, 0);
	if(isAnimatedSprite(frames)){
		var o = {
			type: "AnimatedSprite",
			textureArray: []
		};
		parseBaseParam(instance, o);
		forEach(frames, function(frame){
			var element = frame[0];
			o.textureArray.push(element.libraryItem.name);
			sheet.addBitmap(element.libraryItem);
		});
		return o;
	}
	return {type: "MovieClip", name: instance.libraryItem.name};
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

function parseBitmap(instance){
	var o = {
		type: "Sprite",
		texture: instance.libraryItem.name
	};
	sheet.addBitmap(instance.libraryItem);
	parseBaseParam(instance, o);
	return o;
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
					if(filterEle(elements[k])){
						a.push(elements[k]);
					}
				}
			}
		}
		result.push(a);
	}
	return result;
}

function isSprite(element){
	return element.libraryItem.timeline.frameCount == 1;
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

