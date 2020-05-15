import React, { useEffect, useState, useRef } from 'react'
import CropCanvas from '../CropCanvas'
import { connect } from 'react-redux'
import { useImageCropper } from '../../customHooks'
import { setActiveCropCanvasIndex, uploadImages } from '../../actions'
import './editing.css'

function Editing({imgSource, allCropCanvas, isLoading, uploadImages, setActiveCropCanvasIndex}){
    const [key, setKey] = useState(0)
    const originalCanvas = useRef()
    const isCanvasCropped = useRef([false, false, false, false])
    const { setCanvas } = useImageCropper(originalCanvas)

    useEffect(()=>{
        originalCanvas.current.style.backgroundImage = `url(${imgSource})`
    })

    const handleCropCanvasClick = (index) => {
        setKey(index + 1)
        isCanvasCropped.current[index] = true
        setActiveCropCanvasIndex(index)
        const canvas = allCropCanvas[index]
        setCanvas({
            originalCanvas: originalCanvas,
            resultCanvas: canvas,
            img: imgSource,
            cropHeight: canvas.current.height,
            cropWidth: canvas.current.width
        })
    }
    const handleUploadClick = () => {
        if(isCanvasCropped.current.filter(i => i).length !== 4 ) {
            alert("Please select all region ")
            return
        }
        const allImages = []
        allCropCanvas.forEach(i => allImages.push(i.current.toDataURL().split(",")[1]))
        uploadImages(allImages)
    }
    return(
        <div className="component-container">
            <div className="edit-tools-wrapper">
                <div className="content-wrapper">
                    Click on the Image size button and select the crop area for each <br/>
                </div>
               <div className="inline-wrapper">
                <div className="inline-wrapper">
                        <div 
                            className={isCanvasCropped.current[2] ? "bg-soft btn" : "btn"} 
                            onClick={_ => handleCropCanvasClick(2)}
                        >
                            365x212
                        </div>
                        <div 
                            className={isCanvasCropped.current[3] ? "bg-soft btn" : "btn"} 
                            onClick={_ => handleCropCanvasClick(3)}
                        >
                            380x380    
                        </div>
                        <div 
                            className={isCanvasCropped.current[1] ? "bg-soft btn" : "btn"}
                            onClick={_ => handleCropCanvasClick(1)}
                        >
                            365x450
                        </div>
                        <div 
                            className={isCanvasCropped.current[0] ? "bg-soft btn" : "btn"} 
                            onClick={_ => handleCropCanvasClick(0)}
                        >
                            755x450
                        </div>
                    </div>
                    <div className="inline-wrapper">
                        <div className="btn bg-blue" onClick={_ => handleUploadClick()} disabled={isLoading}>
                        {
                            isLoading ? 'Uploading...' : "Upload Images"
                        }
                        </div>
                    </div>
               </div>
            </div>
            <div className="canvas-wrapper">
                <canvas 
                    className="canvas-style"
                    id="original-canvas" 
                    key={key} 
                    ref={originalCanvas} 
                    width={1024} height={1024}
                ></canvas>
                <div>
                    Preview of the croped image. (If not visible Please click image size button)
                </div>
                <CropCanvas/>
            </div>
        </div>
    )
}

function mapStateToProp(state){
    return{
        imgSource: state.imgSource,
        allCropCanvas: state.allCropCanvas,
        isLoading: state.isLoading
    }
}

const mapDispatchToProp = {
    setActiveCropCanvasIndex: setActiveCropCanvasIndex,
    uploadImages: uploadImages
}

export default connect(mapStateToProp, mapDispatchToProp)(Editing)