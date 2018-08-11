function PointLight(intensity, position){
	this.intensity = intensity;
	this.position = position;
	this.shadow = true;
}

PointLight.prototype.initialize = function(){
	//
}

PointLight.prototype.sample = function(scene, position){
	// 计算L，但保留r和r^2，供之后使用
	var delta = this.position.subtract(position);
	var rr = delta.sqrLength();
	var r = Math.sqrt(rr);
	var L = delta.divide(r);
	// 阴影测试
	if(this.shadow){
		var shadowRay = new Ray3(position, L);
		var shadowResult = scene.intersect(shadowRay);
		// 在r以内的相交点才会遮蔽光源
		if (shadowResult.geometry && shadowResult.distance <= r){
			return LightSample.zero;
		}
	}
	// 平方反比衰减
	var attenuation = 1 / rr;
	// 计算幅照度
	return new LightSample(L, this.intensity.multiply(attenuation));
}