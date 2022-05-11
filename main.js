var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

function drawPixel (x, y, r, g, b, a) {
    var index = (x + y*canvasWidth)*4;
    canvasData.data[index + 0] = r;
    canvasData.data[index + 1] = g;
    canvasData.data[index + 2] = b;
    canvasData.data[index + 3] = a;
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

function drawSierpinski(points, time) {
    initTriangle();
    var triPoint1 = [canvasHeight*0.5, 1];
    var triPoint2 = [1, canvasHeight-2];
    var triPoint3 = [canvasWidth-1, canvasHeight-1];

    var tmpPoint = triPoint1;
    var tmpPointTri =triPoint2;

    function newPointGen(){
        var colorR = 1;
        var colorG = 1;
        var colorB = 1;            

        var newPoint = [Math.ceil((tmpPointTri[0]>tmpPoint[0] ? (tmpPointTri[0]+tmpPoint[0])/2 : (tmpPoint[0]+tmpPointTri[0])/2)), 
                        Math.ceil(tmpPointTri[1]>tmpPoint[1] ? (tmpPointTri[1]+tmpPoint[1])/2 : (tmpPoint[1]+tmpPointTri[1])/2)];
        if (newPoint[0]>canvasWidth*0.5){
            colorR = ((newPoint[0]-canvasWidth*0.5)/canvasWidth)*255;
            colorG = ((newPoint[0]-canvasWidth*0.5)/canvasWidth)*255+100;
            colorB = ((newPoint[0]-canvasWidth*0.5)/canvasWidth)*255+50;
        }
        else {
            colorR = ((canvasWidth*0.5-newPoint[0])/canvasWidth)*255;
            colorG = ((canvasWidth*0.5-newPoint[0])/canvasWidth)*255+100;
            colorB = ((canvasWidth*0.5-newPoint[0])/canvasWidth)*255+50;
        }
        drawPixel(newPoint[0], newPoint[1], colorR, colorG, colorB, 255);
        
        tmpPoint = newPoint;

        tmp = Math.floor(Math.random()*3)+1;
        switch(tmp) {
        case 1:
            tmpPointTri = triPoint1;
            break;
        case 2:
            tmpPointTri = triPoint2;
            break;
        case 3:
            tmpPointTri = triPoint3;
            break;
        default:
            tmpPointTri = triPoint1;
        }
    }
    
    for (let i = 0; i<points; i++) {
        newPointGen();
    }
    updateCanvas();

}

drawSierpinski(1000000);
