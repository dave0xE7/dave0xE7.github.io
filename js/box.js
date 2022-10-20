
var canvas, ctx;
// When true, moving the mouse draws on the canvas
var isDrawing = true;
var x = 0;
var y = 0;

function LogKeyboardEvents () {
    document.addEventListener('keydown', (event) => {
        const keyName = event.key;

        console.log("keydown: "+keyName);

    });
    document.addEventListener('pointerdown', (e) => {
        // console.log(event);
        drawDot(ctx, e.x, e.y, "red")
    })

    document.addEventListener('pointerup', (e) => {
        // console.log(event.pointerType);
    })

    document.addEventListener('pointermove', (e) => {
        // console.log(event);
        drawLine(ctx, x, y, e.x, e.y);
          x = e.x;
          y = e.y;
    })
}

function drawDot(ctx, x,y, c) {
    ctx.fillStyle=c;
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, 2 * Math.PI);
    ctx.stroke(); 
}

function drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = '#000000'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    console.log('resize')
}

window.onload = function () {

    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    // canvas.width = 500;
    // canvas.height = 300;

    document.body.style.overflow='hidden';

    canvas.style.position='absolute';
    canvas.style.top='0px';
    canvas.style.left='0px';
    canvas.style.right='0px';
    canvas.style.bottom='0px';
    canvas.style.zIndex='-1';

    ctx = canvas.getContext('2d')

    resizeCanvas();

    ctx.clearRect(0,0,canvas.width, canvas.height)

    ctx.fillStyle = '#000000'
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0,0,canvas.width,canvas.height)

    window.addEventListener('resize', (e) => {
        resizeCanvas();
    })

    // canvas.addEventListener('mousemove', (e) => {
    //     // console.log(e);
    //     if (isDrawing) {
    //       drawLine(ctx, x, y, e.x, e.y);
    //       x = e.x;
    //       y = e.y;
    //     }
    //   });

    LogKeyboardEvents();
};