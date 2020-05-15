import React, { useEffect, useState, useRef } from 'react'
import CropCanvas from '../CropCanvas'
import { connect } from 'react-redux'
import { useImageCropper, useModal } from '../../customHooks'
import { setActiveCropCanvasIndex, uploadImages, removeAPIError } from '../../actions'
import './editing.css'

function Editing({imgSource, allCropCanvas, isLoading,apiError, removeAPIError, uploadImages, setActiveCropCanvasIndex}){
    const [key, setKey] = useState(0)
    const originalCanvas = useRef()
    const isCanvasCropped = useRef([false, false, false, false])

    const {ModalProvider, showModal} = useModal()
    const { setCanvas } = useImageCropper(originalCanvas)

    useEffect(()=>{
        originalCanvas.current.style.backgroundImage = `url(${imgSource})`
    })

    useEffect(() => {
        if(apiError){
            showModal(<p>API Error:{apiError} <br/><br/>See console.log for more info</p>)
            removeAPIError(false)
        }
    }, [apiError])

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
            showModal(<p>Please selecct all image size to crop, by clicking on Image size button.</p>)
            return
        }
        const allImages = []
        // allCropCanvas.forEach(i => allImages.push(i.current.toDataURL().split(",")[1]))
        allCropCanvas.forEach(i => allImages.push(i.current.toDataURL()))
        uploadImages(allImages)
    }
    return(
        <div className="component-container">
            <ModalProvider/>
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
        isLoading: state.isLoading,
        apiError: state.apiError
    }
}

const mapDispatchToProp = {
    setActiveCropCanvasIndex: setActiveCropCanvasIndex,
    uploadImages: uploadImages,
    removeAPIError: removeAPIError
}

export default connect(mapStateToProp, mapDispatchToProp)(Editing)