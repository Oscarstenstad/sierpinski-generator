var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

var lastType = "";

function drawPixel (x, y, r, g, b, a) {
    var index = (x + y*canvasWidth)*4;
    canvasData.data[index + 0] = r;
    canvasData.data[index + 1] = g;
    canvasData.data[index + 2] = b;
    canvasData.data[index + 3] = a;
}

function clearPixels () {
    for (let i = 0; i < canvasData.data.length; i+=4){
        canvasData.data[i] = canvasData.data[i + 1] = canvasData.data[i + 2] = 255;
    }
    updateCanvas();
}

function updateCanvas() {
    ctx.putImageData(canvasData, 0, 0);
}

function initTriangle() {
    drawPixel(canvasWidth*0.5, 0, 255, 1, 1, 255);
    drawPixel(0, canvasHeight-1, 255, 1, 1, 255);
    drawPixel(canvasWidth-1, canvasHeight-1, 255, 1, 1, 255);
    updateCanvas();
}   

function drawSierpinski(type, points) {
    initTriangle();

    var triPoint = [[canvasHeight*0.5, 1], [1, canvasHeight-2], [canvasWidth-1, canvasHeight-1]];

    var tmpPoint = triPoint[0];
    var tmpPointTri = triPoint[1];

    function newPointGen(){            

        let newPoint = [Math.ceil((tmpPointTri[0]>tmpPoint[0] ? (tmpPointTri[0]+tmpPoint[0])/2 : (tmpPoint[0]+tmpPointTri[0])/2)), 
                        Math.ceil(tmpPointTri[1]>tmpPoint[1] ? (tmpPointTri[1]+tmpPoint[1])/2 : (tmpPoint[1]+tmpPointTri[1])/2)];
        
        let colorR = (newPoint[0]>canvasWidth*0.5) ? ((newPoint[0]-canvasWidth*0.5)/canvasWidth)*255 + 100 : ((canvasWidth*0.5-newPoint[0])/canvasWidth)*255 + 100;
        let colorG = (newPoint[0]>canvasWidth*0.5) ? ((newPoint[0]-canvasWidth*0.5)/canvasWidth)*1 : ((canvasWidth*0.5-newPoint[0])/canvasWidth)*1;
        let colorB = (newPoint[0]>canvasWidth*0.5) ? ((newPoint[0]-canvasWidth*0.5)/canvasWidth)*1 : ((canvasWidth*0.5-newPoint[0])/canvasWidth)*1;

        drawPixel(newPoint[0], newPoint[1], colorR, colorG, colorB, 255);
        
        tmpPoint = newPoint;
        tmpPointTri = triPoint[Math.floor(Math.random()*3)];
    }

    if (type == "scatter"){
        if (lastType != "scatter"){
            clearPixels();
        }
        lastType = "scatter";
        var drawTriangle = setInterval(() => { drawInterval() }, 1);
        setTimeout(() => { clearInterval(drawTriangle) }, 1000);
    
        function drawInterval() {
            for (let i = 0; i<100; i++) newPointGen();
            updateCanvas();
        }
    }
    else if(type == "instant") {
        clearPixels();
        for (let i = 0; i<points; i++) newPointGen();
        updateCanvas();
        lastType = "instant"
    }
    else if (type == "clear"){
        lastType = "clear";
        clearPixels();    
    }
}