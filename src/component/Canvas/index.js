import React, { useEffect, useRef } from 'react';
const theImage = "https://i.pinimg.com/474x/6d/15/54/6d1554e2aca033d9c6f476467516b8ec.jpg";
var cw = 400;
var ch = 400;

let isDragging1 = false
var r = 4
const sp13 = {
    color: "white",
    x:50,
    y:50,
    w: 150,
    h: 150,
    bool: false

}
window.log = function(){
    console.log(sp13)
}

var mousePos1 = {
    x: 0,
    y: 0
  };

  function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: Math.round(evt.clientX - rect.left),
      y: Math.round(evt.clientY - rect.top)
    }
  }
  


  function drawCroppedImage(img, ctx2) {
    ctx2.drawImage(img, sp13.x, sp13.y, sp13.w, sp13.h, 0,0, 400, 400);
  }

  function drawGuides(ctx1) {
    ctx1.beginPath()
    ctx1.rect(sp13.x - 10, sp13.y - 10, sp13.w + 20, sp13.h + 20);
    ctx1.lineWidth = "10";
    ctx1.strokeStyle = "blue";
    ctx1.stroke()
  }


function Canvas() {
    const originalCanvas = useRef()
    const cropCanvas = useRef()
    const img = new Image();
    img.src = theImage;

    useEffect(() => {
        img.onload = function () {
            const output = document.getElementById('output')
            originalCanvas.current.style.backgroundImage = "url(" + theImage + ")";
            const ctx1 = originalCanvas.current.getContext("2d")
            const ctx2 = cropCanvas.current.getContext("2d")
            drawGuides(ctx1)
            const c1 = originalCanvas.current
            c1.addEventListener('mousedown', function (evt) {
                isDragging1 = true;
                mousePos1 = getMousePosition(c1, evt);
                ctx1.beginPath()
                ctx1.rect(sp13.x - 10, sp13.y - 10, sp13.w + 20, sp13.h + 20);
                ctx1.lineWidth = "10";
                ctx1.strokeStyle = "blue";
                ctx1.stroke()
                if (ctx1.isPointInPath(mousePos1.x, mousePos1.y)) {
                    sp13.bool = true;
                    sp13.x = mousePos1.x
                    sp13.y = mousePos1.y
                } else {
                    sp13.bool = false;
                }
            }, false);
            // mousemove ***************************
            c1.addEventListener('mousemove', function (evt) {
                mousePos1 = getMousePosition(c1, evt); 
                if (isDragging1 == true) {
                    ctx1.clearRect(0, 0, cw, ch);
                    sp13.y = mousePos1.y;
                    sp13.x = mousePos1.x;
                    drawGuides(ctx1);
                    ctx2.clearRect(0, 0, cw, ch);
                    // imgo = Imgo(o, d);
                    drawCroppedImage(img, ctx2);
                   // Output(Imgo, output);
                }
            }, false);
            // mouseup ***************************
            c1.addEventListener('mouseup', function (evt) {
                isDragging1 = false;
                sp13.bool = false
            }, false);
            // mouseout ***************************
            c1.addEventListener('mouseout', function (evt) {
                isDragging1 = false;
                sp13.bool = false
            }, false);
            renderCropImage()
        }
    }, [])

    const renderCropImage = () => {
        const c = cropCanvas.current
        var ctx = c.getContext("2d");
        ctx.drawImage(img, 100, 100, 100, 100, 0, 0, 400, 400);
    }

    return (
        <React.Fragment>
            <p>This is Canvas</p>
            <canvas id="original-canvas" ref={originalCanvas} width={400} height={400}>
            </canvas>
            <canvas id="crop-canvas" ref={cropCanvas} width={400} height={400}></canvas>
            <p id="output"></p>
        </React.Fragment>
    )
}

export default Canvas