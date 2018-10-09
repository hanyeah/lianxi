var n = 10000000;
var v = 121313;
var k = 10;

console.log(n, v, k);

// 加法
function f1(){
	console.time("f1");
	var m = v;
	for(var i = 0; i < n; i++){
		m += k;
	}
	console.timeEnd("f1");
}

// 乘法
function f2(){
	console.time("f2");
	var m = v;
	for(var i = 0; i < n; i++){
		m *= v;
	}
	console.timeEnd("f2");
}

// 除法
function f3(){
	console.time("f3");
	var m = v;
	for(var i = 0; i < n; i++){
		m /= v;
	}
	console.timeEnd("f3");
}

// 乘方
function f4(){
	console.time("f4");
	var m = v;
	for(var i = 0; i < n; i++){
		Math.pow(m, k);
	}
	console.timeEnd("f4");
}

f1();
f2();
f3();
f4();
