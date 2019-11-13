const puppeteer = require('puppeteer');
const fs = require("fs");

(async ()=>{
  var jsonStr = fs.readFileSync("hrefs.json",'utf8');
  var json = JSON.parse(jsonStr);
  //
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // 打开一个页面，获取元素地址
  for(var i = 0; i < json.length; i++){
  	var o = json[i];
  	var url = o.href;
  	console.log(json.length + "/" + (i+1), url);
  	await page.goto(url);
  	var content = await page.content();
  	fs.writeFileSync("html/" + url.substring(url.indexOf("terms=") + 6).replace('#1',""), content.replace("charset=gbk", "charset=utf-8")); 
  }
  await browser.close();
})();