function Fps() {
	var tf = document.createElement("div");
	tf.style.color = "red";
	tf.style.position = "absolute";
	tf.style.left = "10px";
	tf.style.top = "10px";
	tf.style.fontSize = "16px";
	var fps = 0;
	var n = 0;
	var t = 0;
	var id;

	function loop() {
		n++;
		var t0 = new Date().getTime();
		if (t0 - t > 1000) {
			fps = n;
			n = 0;
			t += 1000;
		}
		tf.innerHTML = "FPS:" + fps;
		id = requestAnimationFrame(loop);
	}

	this.show = function() {
		if(id) {
			return this;
		}
		t = new Date().getTime();
		n = 0;
		fps = 0;
		id = requestAnimationFrame(loop);
		if(document.body) {
			document.body.appendChild(tf);
		} else {
			window.addEventListener("load", function(){
				document.body.appendChild(tf);
			});
		}
		return this;
	}

	this.remove = function() {
		if(id){
			cancelAnimationFrame(id);
			id = null;
		}
		if(tf.parentNode) {
			tf.parentNode.removeChild(tf);
		}
	}
}
