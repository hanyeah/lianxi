function Union(geometries){
	this.geometries = geometries;
}

Union.prototype.initialize = function(){
	for(var i in this.geometries){
		this.geometries[i].initialize();
	}
}

Union.prototype.intersect = function(ray){
	var minDistance = Infinity;
	var minResult = IntersectResult.noHit;
	for(var i in this.geometries){
		var result = this.geometries[i].intersect(ray);
		if(result.geometry && result.distance < minDistance){
			minDistance = result.distance;
			minResult = result;
		}
	}
	return minResult;
}