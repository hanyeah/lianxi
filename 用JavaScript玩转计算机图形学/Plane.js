function Plane(normal, d){
	this.normal = normal;
	this.d = d;
}

Plane.prototype.copy = function(){
	return new Plane(this.normal.copy(), this.d);
}

Plane.prototype.initialize = function(){
	this.position = this.normal.multiply(this.d);
}

Plane.prototype.intersect = function(ray){
	var a = ray.direction.dot(this.normal);
	if(a>=0){
		return IntersectResult.noHit;
	}
	var b = this.normal.dot(ray.origin.subtract(this.position));
	var result = new IntersectResult();
	result.geometry = this;
	result.distance = -b / a;
	result.position = ray.getPoint(result.distance);
	result.normal = this.normal;
	return result;
}