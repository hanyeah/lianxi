 function my_clock(el){
      var today=new Date();
      var h=today.getHours();
      var m=today.getMinutes();
      var s=today.getSeconds();
      m=m>=10?m:('0'+m);
      s=s>=10?s:('0'+s);
      el.innerHTML = h+":"+m+":"+s;
      setTimeout(function(){my_clock(el)}, 1000);
  }

  var clock_div = document.getElementById('clock_div');
  my_clock(clock_div);


var con=document.getElementById('con');
var url = "https://books.google.co.jp/books?id=6IUarHeMWpAC&printsec=frontcover&hl=zh-CN#v=onepage&q&f=false";
url = "https://books.google.co.jp/books?id=6IUarHeMWpAC&lpg=PP1&hl=zh-CN&pg=PP1&jscmd=click3";
url = "https://books.google.com/books?id=6IUarHeMWpAC&hl=zh-CN&pg=PP1&jscmd=click3";

var baseUrl = 'https://books.google.com/books';
var bookId = '6IUarHeMWpAC';
var pageId = 'PP1';
var pages;
var n = 0;
var imgArr = [];
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
// loadPageId(pageId, loaded01);
// 
var imgsrc = 'https://books.google.com/books/content?id=6IUarHeMWpAC&hl=zh-CN&pg=PP1&img=1&zoom=3&sig=ACfU3U0e3NCtbkSi9fFsktMCMQ3FiMN3fg';

var btn = document.getElementById('button');
console.log(clock_div, con, btn);

btn.addEventListener('click', function(){
  con.innerHTML = 'hello';
  loadImg(imgsrc, imgLoaded);
});
//loadImg(imgsrc, imgLoaded);

function createPdf() {
  // var doc = new jsPDF();
  for (var i = 0; i < imgArr.length; i++) {
    var img = imgArr[i];
    var imgData = getImgData(img);
    // doc.addImage(imgData, 'JPEG', 0, 0, img.width, img.height);
  }
  // doc.save('aaa.pdf');
}

function getImgData(img) {
  canvas.width = img.width;
  canvas.height = img.height;
  canvas.style.width = img.width + 'px';
  canvas.style.height = img.height + 'px';
  con.append(canvas);
  canvas.setAttribute('crossOrigin', 'anonymous');
  ctx.drawImage(img, 0, 0);
  //return canvas.toDataURL("image/jpeg", 1.0);
}

function imgLoaded(img){
  con.append(img);
  console.log(img);
  imgArr.push(img);
  createPdf();
}

function loadImg(src, callBack) {
  var img = document.createElement('img');
  // img.setAttribute('crossOrigin', 'anonymous');
  img.onload = function() {
    callBack(img);
  }
  img.src = src;
}

function loaded01(data){
  console.log(data);
  pages = data.page;
  loadNext();
}

function loadNext() {
  if(n >= pages.length - 1) {
    complete();
  } else {
    n++;
    loadPageId(pages[n].pid, loaded02);
  }
}

function loaded02(data){
  var oo = pages[n];
  for(var i = 0; i < data.page.length; i++){
    var o = data.page[i];
    if(o.pid == oo.pid) {
      oo.src = o.src;
      break;
    }
  }
  loadNext();
}

function push(o) {
  for (var i = 0; i < pages.length; i++) {
    if(pages[i].pid == o.pid){
      pages[i].src = o.src;
      break;
    }
  }
}

function complete(){
  console.log(pages);
}


function loadPageId(pageId, callBack) {
  console.log('load:', pageId);
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
      console.log(e);
    }
  });
}

function get(url,callBack,async){
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
  xmlhttp.open("GET",url,async);
  xmlhttp.send();
  
}

function getArgs(src){
  src = src.substring(src.indexOf('?')+1, src.length);
    var args = {};
    var match = null;
    var search = decodeURIComponent(src);
    var reg = /(?:([^&]+)=([^&]+))/g;
    while((match = reg.exec(search))!==null){
        args[match[1]] = match[2];
    }
    return args;
}





