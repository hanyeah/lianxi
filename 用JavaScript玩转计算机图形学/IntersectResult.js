function IntersectResult(){
	this.geometry = null;
	this.distance = 0;
	this.position = Vector3.zero;
	this.normal = Vector3.zero;
}

IntersectResult.noHit = new IntersectResult();