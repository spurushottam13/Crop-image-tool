import React, { useRef, useEffect, useState } from 'react'
import './imageContainer.css'

function ImageContainer({src}){
    const [size, setSize] = useState(null)
    const imgRef= useRef()
    useEffect(() => {
        if(imgRef.current){
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
                            <a className="clean-aTag" target="_blank" href={src} >Link</a>
                        </div>
                    )
                }
            </div>
            <img src={src} className="img" ref={imgRef} />
        </div>
    )
}

export default ImageContainer