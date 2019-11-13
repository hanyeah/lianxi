const fs = require("fs");

var elesStr = fs.readFileSync("ele2.json",'utf8');
var eles = JSON.parse(elesStr);

var a = ["状态", "熔点", "沸点", "密度", "比热", "蒸发热", "熔化热", "导电率", "导热系数"];
var data = eles.data;

var b = [];
for(var i = 0; i < a.length; i++){
	b.push(a[i]);
	if(i !== 0){
		b.push("单位");
	}
}
var scv = [];
scv.push(["原子序数", "元素名", "英文名", "元素符号", "相对原子质量","发现"].concat(b).join(","));
for(var i = 0; i < data.length; i++){
	var oo = data[i];
	var aa = [
			oo.n,
			oo.ch,
			oo.en,
			oo.sym,
			parseFloat(oo.m),
			string(oo.find)
		];
		console.log(i, oo.ch)
		for(var j = 0; j < a.length; j++){
			var ooo = oo.phy[a[j]];
			if(j!=0){
				aa.push(ooo?ooo.value:"");
				aa.push(string(ooo?ooo.unit:""));
			} else {
				aa.push(string(ooo?ooo.value:""));
			}
		}
	scv.push(aa.join(","));
}
fs.writeFileSync("ele.csv", scv.join("\n"));

function string(ss){
	return '"' + ss + '"';
}