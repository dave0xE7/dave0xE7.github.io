
const videoElem = document.getElementById("video");
const logElem = document.getElementById("log");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");


videoElem.autoplay = true;

// Options for getDisplayMedia()

const displayMediaOptions = {
	video: {
		displaySurface: "window"
	},
	audio: false
};

// Set event listeners for the start and stop buttons
startElem.addEventListener("click", (evt) => {
	startCapture();
}, false);

stopElem.addEventListener("click", (evt) => {
	stopCapture();
}, false);


async function startCapture(displayMediaOptions) {
	// let captureStream = null;

	try {
		video.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
		
	} catch (err) {
		console.error(`Error: ${err}`);
	}
	// return captureStream;
}

function stopCapture(evt) {
	let tracks = videoElem.srcObject.getTracks();

	tracks.forEach((track) => track.stop());
	videoElem.srcObject = null;
}



// $(function () {

    // captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);



// });