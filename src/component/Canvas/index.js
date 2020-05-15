import React, { useEffect, useRef, useState } from 'react';
import { useImageCropper } from '../../customHooks';
import './canvas.css'
import { imageUploader } from '../../utils/imageUploader';
function Canvas() {
    const [imgSource, setImageSource] = useState(null)
    const [key, setKey] = useState(0)
    const originalCanvas = useRef()
    const cropCanvas1 = useRef()
    const cropCanvas2 = useRef()
    const cropCanvas3 = useRef()
    const cropCanvas4 = useRef()
    const allCropCanvas = [cropCanvas1, cropCanvas2, cropCanvas3, cropCanvas4]
    const { setCanvas, addCanavs } = useImageCropper(originalCanvas)

    const uploadHandler = (e) => {
        e.preventDefault()
        const reader = new FileReader();
        let file = e.target.files[0];
        console.log(file)
        reader.onload = function (event) {
            const img = new Image()
            img.src = reader.result
            img.onload = function(){
                const height = this.height
                const width = this.width
                if(width !== 1024 && height !== 1024) {
                    alert("Please upload pic of 1024x1024")
                }
                setImageSource(reader.result)
                originalCanvas.current.style.backgroundImage = `url(${reader.result})`
                defaultCrop(reader.result)
            }
        }
        reader.readAsDataURL(file)
    }

    const defaultCrop = (imgSource) => {
        allCropCanvas.forEach(cropCanvas => {
            setCanvas({
                originalCanvas: originalCanvas,
                resultCanvas: cropCanvas,
                img: imgSource,
                cropHeight: cropCanvas.current.width,
                cropWidth: cropCanvas.current.height
            })
        })
    }

    const imageUploadHandler = () => {
        const promiseStack = []
        allCropCanvas.forEach(canvas => {
            const image = canvas.current.toDataURL().split(",")[1]
            const promise = imageUploader({image})
            promiseStack.push(promise)
        })
        Promise.all(promiseStack)
            .then(data => {
                console.log(data.join("-"))
            })
            .catch(console.error)

    }

    const handleCropCanvasClick = (canvas, key) => {
        setKey(key)
        setCanvas({
            originalCanvas: originalCanvas,
            resultCanvas: canvas,
            img: imgSource,
            cropHeight: canvas.current.height,
            cropWidth: canvas.current.width
        })
    }
    return (
        <React.Fragment>
            <p>This is Canvas</p>
            <div>
                <canvas 
                    id="original-canvas" 
                    key={key} 
                    ref={originalCanvas} 
                    width={1024} height={1024}
                ></canvas>
            </div>
            <div>
                <button onClick={_ => handleCropCanvasClick(cropCanvas1,1)}>755x450</button>
                <button onClick={_ => handleCropCanvasClick(cropCanvas2,2)}>365x450</button>
                <button onClick={_ => handleCropCanvasClick(cropCanvas3,3)}>365x212</button>
                <button onClick={_ => handleCropCanvasClick(cropCanvas4,4)}>380x380</button>
            </div>
            <div>
                <canvas 
                    className="crop-canvas"
                    ref={cropCanvas1} 
                    width={755} height={450}
                ></canvas>
                <canvas 
                    className="crop-canvas"
                     
                    ref={cropCanvas2} 
                    width={365} height={450}
                ></canvas>
                <canvas 
                    className="crop-canvas"
                    ref={cropCanvas3} 
                    width={365} height={212}
                ></canvas>
                <canvas 
                    className="crop-canvas"
                     
                    ref={cropCanvas4} 
                    width={380} height={380}
                ></canvas>
            </div>
            
            <p id="output"></p>
            <input className="fileInput"
                type="file"
                onChange={(e) => uploadHandler(e)} />
            <button onClick={imageUploadHandler}>Upload</button>
        </React.Fragment>
    )
}

export default Canvas