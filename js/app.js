$(() => {
	let $play = $("#btnPlay")
	let $stop = $("#btnStop")
	let $musicPlayer = $("#music")
	let $vinyl = $(".art")
	let $bandName = $("#bandName")
	let $songTitle = $("#songTitle")
	let radioStats = ""
	let streamSource = ""
	let statInterval
	let throttlePause;
 
	const throttle = (callback, time) => {
  		//don't run the function if throttlePause is true
  		if (throttlePause) return;
 
  		//set throttlePause to true after the if condition. This allows the function to be run once
  		throttlePause = true;
   
  		//setTimeout runs the callback within the specified time
  		setTimeout(() => {
    			callback();
     
    			//throttlePause is set to false once the function has been called, allowing the throttle function to loop
    			throttlePause = false;
  		}, time);
	};

	const onStop = () => {
		console.log("onStop()")
		$stop.hide()
		$play.show()

		setTimeout(() => {
			$musicPlayer.trigger("pause")
			$musicPlayer.trigger("load")
			// $musicPlayer.attr("src", "") // Throws ERRORs
		}, 500)

		$vinyl.addClass("stop")
	}

	const onPlay = () => {
		console.log("onPlay()")
		$play.hide()
		$stop.show()


		$musicPlayer.attr("src", streamSource)
		$musicPlayer.trigger("load")
		$musicPlayer.trigger("play")

		$vinyl.removeClass("stop")

	}

	const loadSongInfo = () => {
		$.get(radioStats+"?"+Math.random(), (data) => {
			if( data && data.icestats && data.icestats.source) {
				let songInfo = data.icestats.source.yp_currently_playing.split(" - ")
				$bandName.text(songInfo[0])
				$songTitle.text(songInfo[1])
			}
		})
	}

	$play.show()
	$stop.hide()
	$vinyl.addClass("stop")

	$play.on("click", () => {
		onPlay()
	})

	$stop.on("click", () => {
		onStop()
	})

	document.getElementById("music").addEventListener('error', (e) => {
		console.log("error", e)

		onStop()

		let t = setTimeout(() => {
			$play.click()
		}, 1000)
	})

	statInterval = setInterval(() => {
		loadSongInfo()	
	}, 15000)

	loadSongInfo()
})