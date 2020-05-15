import { useState, useEffect, useRef } from 'react';

export default function useImageCropper() {
    const [originalCanvas, setOriginalCanvas] = useState()
    const [resultCanvas, setResultCanvas] = useState()
    const [imgUrl, setImgUrl] = useState()

    // Using Ref for mutable variable
    const isDragging = useRef(false)
    const cropConfig = useRef(null)
    const mousePos = useRef({
        x: 0,
        y: 0
    });

    /**
     * Return mouse position
     * @param {element} canvas 
     * @param {event} evt 
     */
    const getMousePosition = (canvas, evt)  => {
        const rect = canvas.getBoundingClientRect();
        return {
            x: Math.round(evt.clientX - rect.left),
            y: Math.round(evt.clientY - rect.top)
        }
    }

    /**
     * Draw a image on resultCanvas
     * @param {element} img 
     * @param {context} resultContext 
     */
    const drawCroppedImage = (img, resultContext) => {
        const {x,y,w,h} = cropConfig.current
        const {width, height} = resultCanvas.current
        resultContext.drawImage(img,x, y, w, h, 0, 0, width, height);
    }

    /**
     * Draw guide on originalCanvas
     * @param {context} originalContext 
     */
    const drawGuides = (originalContext) => {
        const {x,y,w,h} = cropConfig.current
        originalContext.beginPath()
        originalContext.rect(x - 5, y - 5, w + 10, h + 10);
        originalContext.lineWidth = "5";
        originalContext.strokeStyle = "white";
        originalContext.stroke()
    }

    useEffect(() => {
        // Return if all config are store in state
        if (!originalCanvas || !resultCanvas || !cropConfig) return
        
        //Execute only when state is ready.
        const img = new Image()
        img.src = imgUrl
        img.onload = function () {
            originalCanvas.current.style.backgroundImage = `url(${imgUrl})`
            const originalContext = originalCanvas.current.getContext("2d")
            const resultContext = resultCanvas.current.getContext("2d")
            const originalCanvasEL = originalCanvas.current
            const resultCanvasEL = resultCanvas.current

            drawGuides(originalContext)

            // @handler => mousedown
            originalCanvasEL.addEventListener('mousedown', function (evt) {
                isDragging.current = true
                mousePos.current = getMousePosition(originalCanvasEL, evt);
                drawGuides(originalContext)
                if (originalContext.isPointInPath(mousePos.current.x, mousePos.current.y)) {
                    cropConfig.current.bool = true;
                    cropConfig.current.x = mousePos.current.x
                    cropConfig.current.y = mousePos.current.y
                } else {
                    cropConfig.current.bool = false;
                }
            }, false);

            // @handler => mousemove
            originalCanvasEL.addEventListener('mousemove', function (evt) {
                mousePos.current = getMousePosition(originalCanvasEL, evt);
                if (isDragging.current) {
                    originalContext.clearRect(0, 0, originalCanvasEL.width, originalCanvasEL.height);
                    cropConfig.current.y = mousePos.current.y;
                    cropConfig.current.x = mousePos.current.x;
                    drawGuides(originalContext);
                    resultContext.clearRect(0, 0, resultCanvasEL.width, resultCanvasEL.height);
                    drawCroppedImage(img, resultContext);
                }
            }, false);

            // @handler => mouseup
            originalCanvasEL.addEventListener('mouseup', function (evt) {
                isDragging.current = false
                cropConfig.current.bool = false
            }, false);

            // @handler => mouseout
            originalCanvasEL.addEventListener('mouseout', function (evt) {
                isDragging.current = false
                cropConfig.current.bool = false
            }, false);
            drawCroppedImage(img, resultContext)
        }
    })

    const setCanvas = ({ originalCanvas, img, resultCanvas, cropWidth, cropHeight }) => {
        setOriginalCanvas(originalCanvas)
        setResultCanvas(resultCanvas)
        setImgUrl(img)
        //mousePos.current = getMousePosition()
        cropConfig.current = {
            color: "white",
            x: originalCanvas.current.width / 2 - cropWidth/2 ,
            y: originalCanvas.current.height /2 - cropHeight/2,
            w: cropWidth,
            h: cropHeight,
            bool: false
        }
    }
    return {
        setCanvas
    }
}