import React, { useRef, useEffect, useState } from 'react'
import './imageContainer.css'

function ImageContainer({src}){
    const [size, setSize] = useState(null)
    // Ref for the img element
    const imgRef= useRef()
    useEffect(() => {
        if(imgRef.current){
            // Detects the height n width of image load, and render as the title of img
            imgRef.current.onload = () => {
                setSize({
                    width: imgRef.current.offsetWidth,
                    height: imgRef.current.offsetHeight
                })
            }
        }
        console.log(imgRef.current)
    })
    return(
        <div className="image-container">
            <div className="img-header">
                {
                    !size ? (
                        <span>Loading . . .</span>
                    ) : (
                        <div className="inline-wrapper -sp">
                            <div>Size: {size.width}x{size.height}</div>
                            <a className="clean-aTag" target="_blank" rel="noopener noreferrer" href={src} >Link</a>
                        </div>
                    )
                }
            </div>
            <img src={src} alt="random" className="img" ref={imgRef} />
        </div>
    )
}

export default ImageContainer