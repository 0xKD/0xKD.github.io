(function() {
	/*
		SO: 14169317
			const double RealtimeAnalyser::DefaultMinDecibels = -100;
			const double RealtimeAnalyser::DefaultMaxDecibels = -30;

		https://github.com/corbanbrook/dsp.js/blob/master/examples/fft.html
			multiply magnitude by 100:
	*/

	// load audio
	var dancer = new Dancer();

	// dancer.load(document.getElementsByTagName('audio')[0]);
	
	dancer.load({ src: 'audio/d.mp3' });

	function sketch(processing) {
		// to make it short
		_p = processing;
		_map = _p.map;

		_p.size(768, 300);
		_p.background(95, 105, 220);

		_p.noStroke();
		var width = 10;

		_p.frameRate(30);
		_p.draw = function() {
			var arr = dancer.getSpectrum();

			_p.background(95, 105, 220);
			_p.fill(255, 255, 255, 100);

			var c = 0;
			for(var i = 0; i < arr.length / 2; i += 1) {
				_p.rect(c + i, 300, width, -(_p.map(arr[i] * 2, 0, 1, 0, 300)));
				c += width + 2;
			}
		}
	}

	var canvas = document.getElementById('music');
	var processingInstance = new Processing(canvas, sketch);

	// start the song
	dancer.play();

	// for debugging
	window.dancer = dancer;
})();