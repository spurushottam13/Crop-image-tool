import React from 'react'
import './imageContainer.css'

function ImageContainer({src, decription}){
    return(
        <div className="image-container">
            <div className="header">
                {decription}
            </div>
            <img src={src} className="img" />
        </div>
    )
}

export default ImageContainer