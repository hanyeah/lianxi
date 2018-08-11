function CheckerMaterial(scale, reflectiveness){
	this.scale = scale;
	this.reflectiveness = reflectiveness;
}

CheckerMaterial.prototype.sample = function(ray, position, normal){
	return Math.abs((Math.floor(position.x*this.scale) + Math.floor(position.z*this.scale))%2)<1?Color.black:Color.white;
}