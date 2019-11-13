const puppeteer = require('puppeteer');
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // 打开一个页面，获取元素地址
  await page.goto('http://cheman.chemnet.com/elements/index.cgi?terms=Hydrogen.htm#1');
  // await page.screenshot({path: 'example.png'});
  const hrefs = await page.evaluate(() => {
  	function getText(arr) {
		if(arr && arr.length !== 0){
			return arr[0].innerText;
		} 
		return "";
	}

	function getElrd(elbox){
		return getText(elbox.getElementsByClassName("elrd"));
	}
	function getElff(elbox){
		return getText(elbox.getElementsByClassName("elff"));
	}
	function getEltl(elbox){
		return getText(elbox.getElementsByClassName("eltl"));
	}
	function getElen(elbox){
		return getText(elbox.getElementsByClassName("elen"));
	}
  	var arr = document.getElementsByClassName("elboxs");
  	var hrefsArr = [];
  	for(var i = 0; i < arr.length; i++){
  		var elbox = arr[i];
  		var elrd = getElrd(elbox);
  		if(!(elrd == "" || isNaN(elrd))){
  			var href = elbox.getElementsByTagName("a")[0].href;
  			if(href && href != ''){
				hrefsArr.push({
					n: elrd,
					zh: getEltl(elbox),
					en: getElff(elbox),
					m: getElen(elbox),
					href: href
				});
  			}
  		}
  	}
    return hrefsArr;
  });

	// 地址按原子序数排序
	hrefs.sort((a, b)=>{
		return a.n - b.n;
	});
	//
	var jsonStr = fs.readFileSync("ele.json",'utf8');
	var json = JSON.parse(jsonStr);
	console.log(json.n);
	// 依次打开地址，提取页面中的信息
	var result = json.data;
	var i = json.n || 0;
	try{
		for(; i < hrefs.length; i++){
			var o = hrefs[i];
			var n = o.n;
			var href = o.href;
			console.log(hrefs.length + "/" + i+":"+n + ":" + href);
			await page.goto(href);
			console.log("打开成功");
			var eleData = await page.evaluate(()=>{
				console.log("执行脚本");
				var ct1 = document.getElementsByClassName("ct1")[0];
				return {
					ch: getCell(10),
					en: getCell(14),
					n: parseFloat(getCell(12)),
					sym: getCell(17),
					m: parseFloat(getCell(11)),
					jg: ct1.children[2].getElementsByTagName("table")[0].innerText,
					find: ct1.children[4].getElementsByTagName("table")[0].innerText,
					phy: ct1.children[8].getElementsByTagName("table")[0].innerText,
					text: getText(document.getElementsByClassName("jz1")[0])
				};

				function getCell(idNum){
					return getText(document.getElementById("AutoNumber"+idNum));
				}

				function getText(ele) {
					if(ele){
						return ele.innerText;
					} 
					return "";
				}
			});
			eleData.url = href;
			result.push(eleData);
		}
	}catch(e){
		console.log(e);
	}

console.log(hrefs.length + "/" + i);
json.n = i;
	// result
fs.writeFileSync("hrefs.json", JSON.stringify(hrefs, null, 2));
  fs.writeFileSync("ele.json", JSON.stringify(json, null, 2));
  await browser.close();
})();

