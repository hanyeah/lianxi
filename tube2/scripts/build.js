var path = require('path');
var fs = require('fs');

function copyFile(src, dist) {
  fs.writeFileSync(path.join(__dirname, dist), fs.readFileSync(path.join(__dirname,src)));
}
console.log(__dirname)
var dir = './../dist';
copyFile('./../lib/Electricity.js', dir+'/Electricity.js');
copyFile('./../node_modules/MatrixMath/lib/MatrixMath.js', dir+'/MatrixMath.js');
