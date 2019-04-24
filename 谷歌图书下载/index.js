var http=require("http");
var https = require("https");

var url = "https://books.google.com/books?id=6IUarHeMWpAC&hl=zh-CN&pg=PP1&jscmd=click3";

https.get(url,function(data){
    var str="";
    data.on("data",function(chunk){
        str+=chunk;//监听数据响应，拼接数据片段
    })
    data.on("end",function(){
        console.log(str.toString())
    })
})

//console.log(getArgs(url));

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

