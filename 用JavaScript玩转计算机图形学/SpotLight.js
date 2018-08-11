function SpotLight(intensity, position, direction, theta, phi, falloff){
	this.intensity = intensity;
	this.position = position;
	this.direction = direction;
	this.theta = theta;
	this.phi = phi;
	this.falloff = falloff;
	this.shadow = true;
}

SpotLight.prototype.initialize = function(){
	this.S = this.direction.normalize().negate();
	this.cosTheta = Math.cos(this.theta * Math.PI / 180 / 2);
	this.cosPhi = Math.cos(this.phi * Math.PI / 180 / 2);
	this.baseMultiplier = 1 / (this.cosTheta - this.cosPhi);
}

SpotLight.prototype.sample = function(scene, position){
	// 计算L，但保留r和r^2，供之后使用
	var delta = this.position.subtract(position);
	var rr = delta.sqrLength();
	var r = Math.sqrt(rr);
	var L = delta.divide(r);
	// 计算聚光灯因子
	var spot;
	var SdotL = this.S.dot(L);
	if(SdotL > this.cosTheta){
		spot = 1;
	} else if(SdotL <= this.cosPhi){
		spot = 0;
	} else {
		spot = Math.pow((SdotL - this.cosPhi) * this.baseMultiplier, this.falloff);
	}
	// 阴影测试
	if(this.shadow){
		var shadowRay = new Ray3(position, L);
		var shadowResult = scene.intersect(shadowRay);
		// 在r以内的相交点才会屏蔽光源
		if(shadowResult.geometry && shadowResult.distance <= r){
			return LightSample.zero;
		}
	}
	// 平方反比衰减
	var attenuation = 1 / rr;
	// 计算辐照度
	return new LightSample(L, this.intensity.multiply(attenuation * spot));
}