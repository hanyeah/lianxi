function Color(r,g,b){
	this.r = r;
	this.g = g;
	this.b = b;
}

Color.prototype.copy = function(){
	return new Color(this.x, this.y, this.z);
}

Color.prototype.add = function(c){
	return new Color(this.r + c.r, this.g + c.g, this.b + c.b);
}

Color.prototype.multiply = function(s){
	return new Color(this.r * s, this.g * s, this.b * s);
}

Color.prototype.modulate = function(c){
	return new Color(this.r * c.r, this.g * c.g, this.b * c.b);
}

Color.black = new Color(0, 0, 0);
Color.white = new Color(1, 1, 1);
Color.red = new Color(1, 0, 0);
Color.green = new Color(0, 1, 0);
Color.blue = new Color(0, 0, 1);