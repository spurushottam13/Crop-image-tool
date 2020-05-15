import React, { useEffect, useState, useRef } from 'react'
import CropCanvas from '../CropCanvas'
import { connect } from 'react-redux'
import { useImageCropper } from '../../customHooks'
import { setActiveCropCanvasIndex, setIsLoading, uploadImages } from '../../actions'
import ImageGallery from '../ImageGallery'

function Editing({imgSource, allCropCanvas, isLoading, uploadImages, setActiveCropCanvasIndex}){
    const [key, setKey] = useState(0)
    const [defaultCropped, setDefaultCropped] = useState(false)
    const originalCanvas = useRef()
    const isCanvasCropped = useRef([false, false, false, false])
    const { setCanvas, addCanavs } = useImageCropper(originalCanvas)

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
        <div className="component-wrapper">
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
                <button onClick={_ => handleCropCanvasClick(0)}>755x450</button>
                <button onClick={_ => handleCropCanvasClick(1)}>365x450</button>
                <button onClick={_ => handleCropCanvasClick(2)}>365x212</button>
                <button onClick={_ => handleCropCanvasClick(3)}>380x380</button>
            </div>
            <div>
                <button onClick={_ => handleUploadClick()} disabled={isLoading}>
                    {
                        isLoading ? 'Doing...' : "Upload Images"
                    }
                </button>
            </div>
            <CropCanvas/>
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