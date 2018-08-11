function DirectionalLight(irradiance, direction){
	this.irradiance = irradiance;
	this.direction = direction;
	this.shadow = true;
}

DirectionalLight.prototype.initialize = function(){
	this.L = this.direction.normalize().negate();
}

DirectionalLight.prototype.sample = function(scene, position){
	// 阴影测试
	if(this.shadow){
		var shadowRay = new Ray3(position, this.L);
		var shadowResult = scene.intersect(shadowRay);
		if(shadowResult.geometry){
			return LightSample.zero;
		}
	}
	return new LightSample(this.L, this.irradiance);
}