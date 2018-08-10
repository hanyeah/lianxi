function Vector3(x,y,z){
	this.x = x;
	this.y = y;
	this.z = z;
}

Vector3.prototype.copy = function(){
	return new Vector3(this.x,this.y,this.z);
}

Vector3.prototype.length = function(){
	return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
}

Vector3.prototype.sqrLength = function(){
	return this.x*this.x+this.y*this.y+this.z*this.z;
}

Vector3.prototype.normalize = function(){
	var inv = 1/this.length();
	return new Vector3(this.x*inv, this.y*inv, this.z*inv);
}

Vector3.prototype.negate = function(){
	return new Vector3(-this.x,-this.y,-this.z);
}

Vector3.prototype.add = function(v){
	return new Vector3(this.x+v.x,this.y+v.y,this.z+v.z);
}

Vector3.prototype.subtract = function(v){
	return new Vector3(this.x-v.x,this.y-v.y,this.z-v.z);
}

Vector3.prototype.multiply = function(f){
	return new Vector3(this.x*f,this.y*f,this.z*f);
}

Vector3.prototype.divide = function(f){
	var invf = 1/f;
	return new Vector3(this.x*invf,this.y*invf,this.z*invf);
}

Vector3.prototype.dot = function(v){
	return this.x*v.x+this.y*v.y+this.z*v.z;
}

Vector3.prototype.cross = function(v){
	return new Vector3(-this.z*v.y+this.y*v.z,this.z*v.x-this.x*v.z,-this.y*v.x+this.x*v.y);
}

Vector3.zero = new Vector3(0, 0, 0);