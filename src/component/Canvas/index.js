import React, { useEffect, useRef } from 'react';
import  {useImageCropper} from '../../customHooks';
const theImage = "https://i.pinimg.com/474x/6d/15/54/6d1554e2aca033d9c6f476467516b8ec.jpg";

function Canvas() {
    const originalCanvas = useRef()
    const cropCanvas = useRef()
    const {setCanvas} = useImageCropper()
    useEffect(() => {
        setCanvas({
            originalCanvas,
            resultCanvas: cropCanvas,
            img: theImage,
            cropHeight: 100,
            cropWidth: 100
        })
    })
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