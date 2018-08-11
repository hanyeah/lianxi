function PhongMaterial(diffuse, specular, shininess, reflectiveness){
	this.diffuse = diffuse;
	this.specular = specular;
	this.shininess = shininess;
	this.reflectiveness = reflectiveness;
}

var lightDir = new Vector3(1, 1, 1).normalize();
var lightColor = Color.white;

PhongMaterial.prototype.sample = function(ray, position, normal){
	var NdotL = normal.dot(lightDir);
	var H = lightDir.subtract(ray.direction).normalize();
	var NdotH = normal.dot(H);
	var diffuseTern = this.diffuse.multiply(Math.max(NdotL,0));
	var specularTerm = this.specular.multiply(Math.pow(Math.max(NdotH,0),this.shininess));
	return lightColor.modulate(diffuseTern.add(specularTerm));
}