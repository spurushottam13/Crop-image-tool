import React from 'react';
import { connect } from 'react-redux';
import { setImageSource, setHaveImage } from '../../actions';
import Editing from '../Editing';
import ImageGallery from '../ImageGallery';

function Home({setHaveImage, haveImage, viewId, setImageSource}) {
    const fileUploadHandler = (e) => {
        e.preventDefault()
        const reader = new FileReader();
        let file = e.target.files[0];
        reader.onload = function (event) {
            const img = new Image()
            img.src = reader.result
            img.onload = function(){
                const height = this.height
                const width = this.width
                if(width !== 1024 && height !== 1024) {
                    alert("Please upload pic of 1024x1024")
                    return
                }
                setImageSource(reader.result)
                setHaveImage(true)
                // originalCanvas.current.style.backgroundImage = `url(${reader.result})`
                // defaultCrop(reader.result)
            }
        }
        reader.readAsDataURL(file)
    }
    if(viewId) return (<ImageGallery/>)
    if(haveImage) return (<Editing/>)
    return (
        <div className="component-wrapper">
            <p>This is Main Page</p>
            <input className="fileInput"
                type="file"
                onChange={fileUploadHandler} />
        </div >
    )
}

function mapStateToProp(state){
    return{
        haveImage: state.haveImage,
        viewId: state.viewId
    }
}

const mapDispacthToProp = {
    setImageSource: setImageSource,
    setHaveImage: setHaveImage
}

export default connect(mapStateToProp, mapDispacthToProp)(Home)