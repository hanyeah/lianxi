const fs = require("fs");

var elesStr = fs.readFileSync("ele.json",'utf8');
var eles = JSON.parse(elesStr);

var a = ["状态", "熔点", "沸点", "密度", "比热", "蒸发热", "熔化热", "导电率", "导热系数"];
var data = eles.data;
for(var i = 0; i < data.length; i++){
	var o = data[i];
	o.phy = getPhy(o.phy);
	o.m = parseFloat(o.m);
}

fs.writeFileSync("ele2.json", JSON.stringify(eles, null, 2));


function getPhy(s){
	// 字符串处理：去掉空格和换行符
	s = s.replace(/\s/g, "").replace(/\\n/g, "").replace(/：/g, ":");
	// console.log(s);
	// 获取关键字的位置，并排序
	var ns = [];
	for(var i = 0; i < a.length; i++){
		var ind = s.indexOf(a[i]);
		if(ind != -1){
			ns.push(ind);
		}
	}
	ns.sort((a, b)=>{
		return a - b;
	});
	//console.log(ns);
	// 按关键字拆分字符串
	var arr = [];
	for(var i = 0; i < ns.length; i++){
		arr.push(s.substring(ns[i], ns[i+1]));
	}
	//console.log(arr);
	//
	var o = {};
	for(var i = 0; i < arr.length; i++){
		var a0 = arr[i].split(":");
		var s0 = a0[0];
		var key = getKey(s0);
		if(key && key != ""){
			o[key] = {
				unit: getUnit(s0, key),
				value:getValue(a0[1], s0.indexOf("状态")==-1)
			};
		}
	}
	//console.log(o);
	return o;
}

function getValue(s1, isNum){
	if(isNum){
		return parseFloat(s1 || "");
	}
	return s1 || "";
}

function getKey(s0){
	for(var i = 0; i < a.length; i++){
		if(s0.indexOf(a[i])!=-1){
			return a[i];
		}
	}
	return null;
}

function getUnit(s0, key){
	s0 = s0.replace(key, "").replace("(", "").replace(")","");
	if(s0.charAt(0) == "/"){
		return s0.substring(1);
	}
	return s0;
}
