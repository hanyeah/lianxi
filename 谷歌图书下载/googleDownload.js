var urlInput = document.getElementById('urlInput');
var out = document.getElementById('out');
var imgCon = document.getElementById('imgCon');
var booknameInput = document.getElementById('booknameInput');
var con = document.getElementById('con');

var bookname;
var baseUrl;
var bookId;
var page;
var imgArr;
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

var downButton = document.getElementById('downButton');
downButton.onclick = function() {
	download();
}
function download() {
	page = [];
	imgArr = [];

	bookname = booknameInput.value;
	out.innerHTML = "";
	var src = urlInput.value;
	downButton.style.pointerEvent = 'none';
	setTimeout(()=>{
		downButton.style.pointerEvent = 'auto';
	}, 5000);
	try{
		var url = new URL(src);
		baseUrl = url.protocol + '//' + url.host + url.pathname;
		var args = getArgs(url);
		bookId = args['id'];
		// 加载图书信息
		// "https://books.google.com/books?id=6IUarHeMWpAC&hl=zh-CN&pg=PP1&jscmd=click3"
		loadPageId('PP1', bookPageInfoLoaded);
	} catch (e) {
		trace(e);
	}
}


function trace(...args) {
	out.innerHTML += "<p>" + args.join(' ') + "<p/>";
	console.log.apply(console, args);
}

//------------地址解析----------------

function getArgs(url){
    var args = {};
    var match = null;
    var search = decodeURIComponent(url.search.substring(1));
    var reg = /(?:([^&]+)=([^&]+))/g;
    while((match = reg.exec(search))!==null){
        args[match[1]] = match[2];
    }
    return args;
}

//--------------------加载图片------------------------------
function loadImgNext(n) {
	if(n >= page.length - 1) {
		createPdf();
	} else {
		trace(n, page.length);
		var src = page[n].src;
		loadImg(src, function(img) {
			if(img) {
				imgArr.push(img);
				clearCon(imgCon);
				imgCon.append(img);
			} else {
				trace('load image error.');
			}
			loadImgNext(n + 1);
		});
	}
}

function createPdf() {
	clearCon(imgCon);
	imgCon.append(canvas);
	var sca = (25.4 / 72);
  var doc = new jsPDF();//new jsPDF('px', 'px');
  for (var i = 0; i < imgArr.length; i++) {
    var img = imgArr[i];
    var imgData = getImgData(img);
    if(i!=0){
		doc.addPage();
    }
    doc.addImage(imgData, 'JPEG', 0, 0, img.width*sca, img.height*sca);
  }
  doc.save(bookname + '.pdf');
}

function getImgData(img) {
  canvas.width = img.width;
  canvas.height = img.height;
  canvas.style.width = img.width + 'px';
  canvas.style.height = img.height + 'px';
  // canvas.setAttribute('crossOrigin', 'anonymous');
  ctx.drawImage(img, 0, 0);
  data = canvas.toDataURL('image/jpeg', 1.0);
  return data;
}

function loadImg(src, callBack) {
  var img = document.createElement('img');
  // img.setAttribute('crossOrigin', 'anonymous');
  img.onload = function() {
    callBack(img);
  }
  img.onerror = function() {
  	callBack(null);
  }
  img.src = src;
}

function clearCon(con) {
	while(con.firstChild) {
		con.removeChild(con.firstChild);
	}
}

//-----------------加载图书每一页的信息---------------------

function pageLoadComplete(){
	imgArr = [];
	loadImgNext(0);
}

function loadNext(n){
	if (n >= page.length - 1) {
		pageLoadComplete();
	} else {
		if(page[n].src) {
			loadNext(n + 1);
		} else {
			trace(n, page.length);
			loadPageId(page[n].pid, function(data){
				console.log(data);
				pushData(data.page);
				loadNext(n + 1);
			});
		}
	}
}

function bookPageInfoLoaded(data) {
	page = [];
	for(var i = 0; i < data.page.length; i++) {
		var o = data.page[i];
		if(!o.src) {
			page.push(o);
		}
	}
	pushData(data.page);
	loadNext(0);
}

function pushData(pageData) {
	for(var i = 0; i < pageData.length; i++) {
		var o = pageData[i];
		if(o.src) {
			for(var j = 0; j < page.length; j++) {
				var o2 = page[j];
				if(o2.pid === o.pid){
					o2.src = o.src;
					break;
				}
			}
		}
	}
}

/*function loadPageId(pageId, callBack) {
  trace('load:', pageId);
  $.ajax(baseUrl, {
    data:{
      id: bookId,
      h1: 'zh-CN',
      pg: pageId,
      jscmd: 'click3'
    },
    dataType: 'jsonp',
    crossDomain: true,
    success: function(data) {
      callBack(data);
    },
    error:function(e){
      trace(e);
    }
  });
}*/

function loadPageId(pageId, callBack){
	var url = baseUrl + "?id=" + bookId +"&hl=zh-CN&pg="+pageId+"&jscmd=click3";
	trace('load:', url);
	get(url, function(data) {
		var o = JSON.parse(data);
		callBack(o);
	});
}

function get(url,callBack){
  var xmlhttp;
  if (window.XMLHttpRequest){
    // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp=new XMLHttpRequest();
    }
  else{
  // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  xmlhttp.onreadystatechange=function(){
      if (xmlhttp.readyState==4 && xmlhttp.status==200){
        callBack(xmlhttp.responseText);
    }
    }
  xmlhttp.open("GET",url,true);
  xmlhttp.send();
  
}
