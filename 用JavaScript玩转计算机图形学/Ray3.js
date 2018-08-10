function Ray3(origin, direction){
	this.origin = origin;
	this.direction = direction;
}

Ray3.prototype.getPoint = function(t){
	return this.origin.add(this.direction.multiply(t));
}