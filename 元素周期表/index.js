const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://cheman.chemnet.com/elements/index.cgi?terms=Hydrogen.htm#1');
  // await page.screenshot({path: 'example.png'});
  const hrefs = await page.evaluate(() => {
  	var arr = document.getElementsByClassName("elboxs");
  	var hrefsArr = [];
  	for(var i = 0; i < arr.length; i++){
  		var div = arr[i];
  		hrefsArr.push(div.getElementsByTagName("a")[0].href);
  		// div.getElementsByClassName("elrd")[0].innerText;
  		// div.getElementsByClassName("elff")[0].innerText;
  		// div.getElementsByClassName("eltl")[0].innerText;
  		// div.getElementsByClassName("elen")[0].innerText;

  	}
    return hrefsArr;
  });

  console.log(hrefs);
  await browser.close();
})();