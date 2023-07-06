// helper functions

function degToRad(degrees) {
    const result = (Math.PI / 180) * degrees;
    return result;
}

const RADIUS = 20;

var canvas, ctx;
// When true, moving the mouse draws on the canvas
var isDrawing = true;
var x = 0;
var y = 0;

var xm = 0;
var ym = 0;

var cursorX, cursorY;
var cursorInfoBox;

var controllsBox;

var path = [];
var paths = [];

var infoBox, logBox;

var pointerDown = false;

var info = {
    screen: {},
    navigator: {},
    location: {}
};

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function DrawPaths(ctx) {
    for (let i = 0; i < paths.length; i++) {
        // let drawpath = paths[index];
        // console.log(paths[i]);

        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(paths[i][0].x, paths[i][0].y);
        for (let j = 1; j < paths[i].length; j++) {
            ctx.lineTo(paths[i][j].x, paths[i][j].y);

        }
        ctx.stroke();
        ctx.closePath();
    }
}

function LogKeyboardEvents() {
    document.addEventListener('keydown', (event) => {
        const keyName = event.key;

        console.log("keydown: " + keyName);
        logBox.textContent += keyName;

    });    
    document.addEventListener('pointerdown', (e) => {
        // console.log(event);
        
        if (e.which == 1) {
            drawDot(ctx, e.x, e.y, "blue");
        } else if (e.which == 3) {
            drawDot(ctx, e.x, e.y, "red");
        } else if (e.which == 2) {
            drawDot(ctx, e.x, e.y, "green");
        } else {
            drawDot(ctx, e.x, e.y, "white");
        }

        pointerDown = true;
    });

    document.addEventListener('pointerup', (e) => {
        // console.log(event.pointerType);

        if (path.length > 1) {
            paths.push(path);
            path = [];
            console.log('finished path');
        }

        pointerDown = false;
    });

    document.addEventListener('pointermove', (e) => {
        // console.log(event);
        cursorX = Math.floor(e.x);
        cursorY = Math.floor(e.y);

        // ctx.clearRect(0,0,canvas.width, canvas.height);
        // ctx.fillText("x: "+cursorX+", y:"+cursorY+"", 10, 50);
        cursorInfoBox.innerHTML = "x: " + cursorX + " y: " + cursorY;

        if (pointerDown) {
            ctx.strokeStyle = '#CCCCCC';
            path.push(new Point(e.x, e.y));
        } else {
            ctx.strokeStyle = '#333333';
        }
        drawLine(ctx, x, y, e.x, e.y);
        x = e.x;
        y = e.y;

    });

    // document.addEventListener('click', async (e) => {
    //     if (!document.pointerLockElement) {
    //         await canvas.requestPointerLock({
    //             unadjustedMovement: true,
    //         })
    //     }
    // });
}

function drawDot(ctx, x, y, c) {
    ctx.fillStyle = c;
    ctx.strokeStyle = c;
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    // ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

function updateInfo() {

    //#region info variables
    info.screen.availHeight = window.screen.availHeight; // Returns the height of the screen (excluding the Windows Taskbar)
    info.screen.availWidth = window.screen.availWidth; // Returns the width of the screen (excluding the Windows Taskbar)
    info.screen.colorDepth = window.screen.colorDepth; // Returns the bit depth of the color palette for displaying images
    info.screen.height = window.screen.height; // Returns the total height of the screen
    info.screen.pixelDepth = window.screen.pixelDepth; // Returns the color resolution (in bits per pixel) of the screen
    info.screen.width = window.screen.width; // Returns the total width of the screen


    info.navigator.appCodeName = navigator.appCodeName; // Returns browser code name
    info.navigator.appName = navigator.appName; // Returns browser name
    info.navigator.appVersion = navigator.appVersion;  // Returns browser version
    info.navigator.cookieEnabled = navigator.cookieEnabled; // Returns true if browser cookies are enabled
    info.navigator.geolocation = navigator.geolocation; // Returns a geolocation object for the user's location
    info.navigator.language = navigator.language;  // Returns browser language
    info.navigator.onLine = navigator.onLine;  // Returns true if the browser is online
    info.navigator.platform = navigator.platform;  // Returns browser platform
    info.navigator.product = navigator.product; // Returns browser engine name
    info.navigator.userAgent = navigator.userAgent; // Returns browser user-agent header


    info.location.hash = window.location.hash; // Sets or returns the anchor part (#) of a URL
    info.location.host = window.location.host; // Sets or returns the hostname and port number of a URL
    info.location.hostname = window.location.hostname; // Sets or returns the hostname of a URL
    info.location.href = window.location.href; // Sets or returns the entire URL
    info.location.origin = window.location.origin; // Returns the protocol, hostname and port number of a URL
    info.location.pathname = window.location.pathname; // Sets or returns the path name of a URL
    info.location.port = window.location.port; // Sets or returns the port number of a URL
    info.location.protocol = window.location.protocol; // Sets or returns the protocol of a URL
    info.location.search = window.location.search; // Sets or returns the querystring part of a URL
    //#endregion

    //#region 

    infoBox.innerHTML = "";

    infoBox.innerHTML += "<span>info.screen.availHeight " + info.screen.availHeight + " </span><br>";
    infoBox.innerHTML += "<span>info.screen.availWidth " + info.screen.availWidth + " </span><br>";
    infoBox.innerHTML += "<span>info.screen.colorDepth " + info.screen.colorDepth + " </span><br>";
    infoBox.innerHTML += "<span>info.screen.height " + info.screen.height + " </span><br>";
    infoBox.innerHTML += "<span>info.screen.pixelDepth " + info.screen.pixelDepth + " </span><br>";
    infoBox.innerHTML += "<span>info.screen.width " + info.screen.width + " </span><br>";


    infoBox.innerHTML += "<span>info.navigator.appCodeName " + info.navigator.appCodeName + " </span><br>";
    infoBox.innerHTML += "<span>info.navigator.appName " + info.navigator.appName + " </span><br>";
    infoBox.innerHTML += "<span>info.navigator.appVersion " + info.navigator.appVersion + " </span><br>";
    infoBox.innerHTML += "<span>info.navigator.cookieEnabled " + info.navigator.cookieEnabled + " </span><br>";
    infoBox.innerHTML += "<span>info.navigator.geolocation " + info.navigator.geolocation + " </span><br>";
    infoBox.innerHTML += "<span>info.navigator.language " + info.navigator.language + " </span><br>";
    infoBox.innerHTML += "<span>info.navigator.onLine " + info.navigator.onLine + " </span><br>";
    infoBox.innerHTML += "<span>info.navigator.platform " + info.navigator.platform + " </span><br>";
    infoBox.innerHTML += "<span>info.navigator.product " + info.navigator.product + " </span><br>";
    infoBox.innerHTML += "<span>info.navigator.userAgent " + info.navigator.userAgent + " </span><br>";


    // infoBox.textContent += JSON.stringify(info.navigator) + " ";
    // infoBox.textContent += JSON.stringify(info.navigator) + " ";
    // infoBox.innerHTML += "<span>info.location.hash =" +info.location.hash +" </span><br>";
    // infoBox.innerHTML += "<span>info.location.host =" +info.location.host +" </span><br>";
    // infoBox.innerHTML += "<span>info.location.hostname =" +info.location.hostname +" </span><br>";
    infoBox.innerHTML += "<span>info.location.href =" + info.location.href + " </span><br>";
    // infoBox.innerHTML += "<span>info.location.origin =" +info.location.origin +" </span><br>";
    // infoBox.innerHTML += "<span>info.location.pathname =" +info.location.pathname +" </span><br>";
    // infoBox.innerHTML += "<span>info.location.port =" +info.location.port +" </span><br>";
    // infoBox.innerHTML += "<span>info.location.protocol =" +info.location.protocol +" </span><br>";
    // infoBox.innerHTML += "<span>info.location.search =" +info.location.search +" </span><br>";
    // infoBox.textContent += JSON.stringify(info.location) + " ";

    //#endregion
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    DrawPaths(ctx);
    console.log('resize');

    updateInfo();
}

function updateTitle() {
    document.title = Math.floor(Date.now() / 1000);
}

function SavePaths() {
    localStorage.setItem('paths', JSON.stringify(paths));
}
function LoadPaths() {
    if (localStorage['paths'] != undefined) {
        paths = JSON.parse(localStorage.getItem('paths'));
        DrawPaths(ctx);
    }
}

function openFullscreen() {
    if (document.fullscreenEnabled) {
        if (document.body.requestFullscreen) {
            document.body.requestFullscreen();
        } else if (document.body.webkitRequestFullscreen) { /* Safari */
            document.body.webkitRequestFullscreen();
        } else if (document.body.msRequestFullscreen) { /* IE11 */
            document.body.msRequestFullscreen();
        }
    }
}
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

var inputValues = [];

function CreateInputControlls(name, defaultValue) {
    inputValues[name] = defaultValue;
    let newBox = document.createElement("div");
    newBox.className = "inputControlls";
    let newInput = document.createElement("input");
    let newLabel = document.createElement("label");
    newInput.type = "number"
    newInput.name = name;
    if (localStorage.hasOwnProperty(name)) {
        let storedValue = localStorage.getItem(name);
        inputValues[name] = storedValue;
        newInput.value = storedValue;
    } else {
        newInput.value = defaultValue;
    }
    newInput.onchange = function (e) {
        let inputName = e.target.name;
        let inputVal = e.target.value;
        // console.log(""+inputName+"="+inputVal);
        inputValues[inputName] = inputVal;
        localStorage.setItem(inputName, inputVal);
        // Draw();
    }
    newLabel.for = name;
    newLabel.innerText = name + ": ";
    newBox.append(newLabel);
    newBox.append(newInput);
    controllsBox.append(newBox);
}

//#region pointerlock
function InitPointerLock() {
    // let x = 50;
    // let y = 50;
    xm = 50;
    ym = 50;
    
    function canvasDraw() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#f00";
      ctx.beginPath();
      ctx.arc(xm, ym, RADIUS, 0, degToRad(360), true);
      ctx.fill();
    }
    canvasDraw();
    
    document.addEventListener("click", async () => {
      if(!document.pointerLockElement) {
        await canvas.requestPointerLock({
          unadjustedMovement: true,
        });
      }
    });
    
    // pointer lock event listeners
    
    document.addEventListener("pointerlockchange", lockChangeAlert, false);
    
    function lockChangeAlert() {
      if (document.pointerLockElement === canvas) {
        console.log("The pointer lock status is now locked");
        document.addEventListener("mousemove", updatePosition, false);
      } else {
        console.log("The pointer lock status is now unlocked");
        document.removeEventListener("mousemove", updatePosition, false);
      }
    }
    
    const tracker = document.getElementById("tracker");
    
    let animation;
    function updatePosition(e) {
      xm+= e.movementX;
      ym += e.movementY;
      if (xm> canvas.width + RADIUS) {
        xm= -RADIUS;
      }
      if (ym > canvas.height + RADIUS) {
        ym = -RADIUS;
      }
      if (xm< -RADIUS) {
        xm= canvas.width + RADIUS;
      }
      if (ym < -RADIUS) {
        ym = canvas.height + RADIUS;
      }
      tracker.textContent = `xm position: ${xm}, ym position: ${ym}`;
    
      if (!animation) {
        animation = requestAnimationFrame(function () {
          animation = null;
          canvasDraw();
        });
      }
    }
    
}
//#endregion pointerlock


function startMoveFullscreenBtn() {
    btnA.style.position = 'absolute';

    document.addEventListener('pointermove', (e) => {
        btnA.style.left = (e.x-10)+'px';
        btnA.style.top = (e.y-10)+'px';
    });
}

window.onload = function () {

    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    document.body.style.overflow = 'hidden';

    btnA = document.createElement('button');
    btnA.textContent = 'Fullscreen';
    document.body.append(btnA);
    // btnA.click
    btnA.onclick = function () {
        if (document.fullscreen) {
            closeFullscreen();
        } else {
            openFullscreen();
        }

    }
    
    controllsBox = document.createElement('div');
    controllsBox.id = 'controllsBox';
    document.body.append(controllsBox);
    

    btnB = document.createElement('button');
    btnB.textContent = 'Save';
    document.body.append(btnB);
    btnB.onclick = function () {
        SavePaths();
    }

    cursorInfoBox = document.createElement('div');
    cursorInfoBox.id = "cursorInfoBox";
    cursorInfoBox.classList.add('unselectable');
    document.body.appendChild(cursorInfoBox);

    infoBox = document.createElement('div');
    infoBox.id = "infoBox";
    infoBox.classList.add('unselectable');
    document.body.appendChild(infoBox);
    // infoBox.textContent += "window.he";

    logBox = document.createElement('div');
    document.body.appendChild(logBox);


    canvas.style.position = 'absolute';
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    canvas.style.right = '0px';
    canvas.style.bottom = '0px';
    canvas.style.zIndex = '-1';

    ctx = canvas.getContext('2d')

    resizeCanvas();

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.font = '20px Arial';


    ctx.fillStyle = '#000000'
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    document.body.onbeforeunload = function (e) {
        alert('onbeforeunload');
        console.log('onbeforeunload');
        console.log(e);
    };

    document.body.onfocus = function (e) {
        console.log('onfocus ');
        console.log(e);
    };

    document.body.onpageshow = function (e) {
        console.log('onpageshow ');
        console.log(e);
    };
    document.body.onpagehide = function (e) {
        console.log('onpagehide ');
        console.log(e);
    };

    ctx.fillRect(0, 0, canvas.width, canvas.height)


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

    LoadPaths();

    // setInterval(function () {
    //     // clockTime.innerText = Date.now() / 1000;
    //     // clockDate.innerText = new Date().toLocaleString('de');
    //     updateTitle();
    // }, 400);


    // document.body.onbeforeunload = function (e) {
    //     alert('onbeforeunload');
    //     console.log('onbeforeunload');
    //     console.log(e);
    // };

    // document.body.onfocus = function (e) {
    //     console.log('onfocus ');
    //     console.log(e);
    // };

    // document.body.onpageshow = function (e) {
    //     console.log('onpageshow ');
    //     console.log(e);
    // };
    // document.body.onpagehide = function (e) {
    //     console.log('onpagehide ');
    //     console.log(e);
    // };

    // CreateInputControlls('test', 0);

    // setTimeout(() => {
    //     openFullscreen();
    // }, 3000);
};
