
var monitorUpdateInterval = 50;

var monitorCanvas, monitorCanvasCtx;

function InitMonitor() {
    
    monitorCanvas = document.createElement('canvas');
    document.body.appendChild(monitorCanvas);

    monitorCanvas.width = window.screen.width;
    monitorCanvas.style.position = 'absolute';
    monitorCanvas.style.bottom = '0px';
    monitorCanvas.style.left = '0px';

    monitorCanvasCtx = monitorCanvas.getContext('2d');

    monitorCanvasCtx.fillStyle = 'rgba(0,0,0,0)';
    monitorCanvasCtx.strokeStyle = 'white';
    monitorCanvasCtx.clearRect(0,0,monitorCanvas.width,monitorCanvas.height);
    monitorCanvasCtx.fillRect(0,0,monitorCanvas.width,monitorCanvas.height);
    monitorCanvasCtx.fillStyle = 'white';
    monitorCanvasCtx.clearRect(0,0,monitorCanvas.width,monitorCanvas.height);
    monitorCanvasCtx.fillRect(0,0,monitorCanvas.width,monitorCanvas.height);
    monitorCanvasCtx.clearRect(0,0,monitorCanvas.width,monitorCanvas.height);

    monitorCanvasCtx.fillRect(10,10,100,100);

}

var img1;

function TestMonitor() {
    // monitorCanvasCtx.begin()

    // monitorCanvasCtx.drawImage(img1, 0, 0);

    // monitorCanvasCtx.globalCompositeOperation = "source-atop";

    // var pattern = monitorCanvasCtx.createPattern(img, 'repeat');
    // monitorCanvasCtx.rect(0, 0, monitorCanvas.width, monitorCanvas.height);
    // monitorCanvasCtx.fillStyle = pattern;
    // monitorCanvasCtx.fill();

    // monitorCanvasCtx.globalAlpha = .10;
    // monitorCanvasCtx.drawImage(img1, 0, 0);
    // monitorCanvasCtx.drawImage(img1, 0, 0);
    // monitorCanvasCtx.drawImage(img1, 0, 0);
        //ctx.globalAlpha = 1;

    // imageData = monitorCanvasCtx.getImageData(0, 0, monitorCanvas.width - 1, monitorCanvas.height - 1);

    // monitorCanvasCtx.putImageData(imageData, 1, 0);

    // monitorCanvasCtx.fillRect(monitorCanvas.width-4,0,1,monitorCanvas.height);
    x1 = monitorCanvas.width-4;
    x2 = monitorCanvas.width-4;
    y1 = 0;
    y2 = monitorCanvas.height;

    monitorCanvasCtx.strokeStyle = 'white';
    // monitorCanvasCtx.st

    monitorCanvasCtx.beginPath();
    monitorCanvasCtx.moveTo(x1 + 0.5, y1 + 0.5);
    monitorCanvasCtx.lineTo(x2 + 0.5, y2 + 0.5);
    monitorCanvasCtx.stroke();
}

var monitor = {};

monitor.init = InitMonitor;
monitor.test = TestMonitor;

monitor.update = function () {
    imageData = monitorCanvasCtx.getImageData(0, 0, monitorCanvas.width-1, monitorCanvas.height - 1);
    monitorCanvasCtx.putImageData(imageData, -1, 0);


};

monitor.start = function () {
    setInterval(() => {
        monitor.update();
    }, monitorUpdateInterval);
};


monitor.init();
monitor.start();
monitor.test();