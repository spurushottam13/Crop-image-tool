import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { setImageSource, setHaveImage, setViewId } from '../../actions';
import Editing from '../Editing';
import ImageGallery from '../ImageGallery';
import Wave from '../Wave';
import Icon from '../../icons';
import './home.css'

function Home({ setHaveImage, haveImage, viewId, setImageSource, setViewId }) {
    const inputRef = useRef()
    const fileUploadHandler = (e) => {
        e.preventDefault()
        const reader = new FileReader();
        let file = e.target.files[0];
        reader.onload = function (event) {
            const img = new Image()
            img.src = reader.result
            img.onload = function () {
                const height = this.height
                const width = this.width
                if (width !== 1024 && height !== 1024) {
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
    if (viewId) return <ImageGallery/>
    if (haveImage) return <Editing />
    return (
        <div className="component-container">
            <Wave/>
            <div className="home-wrapper">
                <div className="home-section-1">
                    <span className="bold800 f3 pcolor"> Hey!!</span> <br/>
                    <span className="bold800 f2">Crop 1024x1024 <br/> image into diffent size </span><br />
                    <span className="bold800 f3">755x450 </span><br />
                    <span className="bold800 f2-4">365x450 </span><br />
                    <span className="bold800 f1-8">365x212 </span><br />
                    <span className="bold800 f1-2">380x380 </span><br />
                    <span className="bold800 f0-8"> and store on imgur cloud hosting and access through view-id <span className="badge">anytime.</span></span>
                </div>
                <div className="home-section-2">
                    <div className="upload-area">
                        <div className="myfileupload-buttonbar">
                            <label class="myui-button">
                                <Icon.upload /><span >  Add Files</span>
                                <input id="file" type="file" name="files[]" onChange={fileUploadHandler} />
                            </label>
                        </div>
                    </div>
                    <div className="search-viewid">
                        <p>Have a view-id ? </p>
                        <div className="inline">
                            <input type="text" ref={inputRef}/>
                            <Icon.search onClick={_ => setViewId(inputRef.current.value)} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

function mapStateToProp(state) {
    return {
        haveImage: state.haveImage,
        viewId: state.viewId
    }
}

const mapDispacthToProp = {
    setImageSource: setImageSource,
    setHaveImage: setHaveImage,
    setViewId: setViewId
}

export default connect(mapStateToProp, mapDispacthToProp)(Home)