(function() {
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// from SO: 3437786
	var w = window,
		d = document,
		e = d.documentElement,
		g = d.getElementsByTagName('body')[0],
		WIDTH = w.innerWidth || e.clientWidth || g.clientWidth,
		HEIGHT = w.innerHeight|| e.clientHeight|| g.clientHeight;

	function sketch(processing) {
		var BACKGROUND_R = 135;
		var BACKGROUND_G = 215;
		var BACKGROUND_B = 235;
		processing.size(WIDTH, HEIGHT);
		processing.background(BACKGROUND_R, BACKGROUND_G, BACKGROUND_B);

		// Ball object constructor and methods
		function Ball() {
			this.diameter = getRandomInt(Math.round(WIDTH * 0.03), Math.round(WIDTH * 0.08));
			this.x = getRandomInt(0 + this.diameter, WIDTH - this.diameter);
			this.y = getRandomInt(0 + this.diameter, HEIGHT - this.diameter);
			this.dx = getRandomInt(2, 8);
			this.dy = getRandomInt(2, 8);
			this.r = getRandomInt(0, 255);
			this.g = getRandomInt(0, 255);
			this.b = getRandomInt(0, 255);
		}

		Ball.prototype.bounce = function() {
			if ((this.x + this.diameter / 2) > WIDTH
				|| (this.x - this.diameter / 2) < 0) {
				this.dx *= -1;
			}
			if ((this.y + this.diameter / 2) > HEIGHT
				|| (this.y - this.diameter / 2) < 0) {
				this.dy *= -1;
			}

			this.x += this.dx;
			this.y += this.dy;
		}

		Ball.prototype.display = function() {
			processing.noStroke();
			processing.fill(this.r, this.g, this.b, 125);
			processing.ellipse(this.x, this.y, this.diameter, this.diameter);
		}

		// create and store balls in array
		var balls = [];
		var NUMBER_OF_BALLS = 25;
		for(var i = 0; i < NUMBER_OF_BALLS; i++) {
			balls.push(new Ball());
		}

		// called 60 times / s
		processing.draw = function() {
			processing.background(BACKGROUND_R, BACKGROUND_G, BACKGROUND_B);
			for(var i = 0; i < NUMBER_OF_BALLS; i++) {
				balls[i].bounce();
				balls[i].display();
			}
		}
	}

	var canvas = document.getElementById('bounce');
	var processingInstance = new Processing(canvas, sketch);
})();