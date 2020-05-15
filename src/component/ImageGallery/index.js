import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ImageContainer from '../ImageContainer';

function ImageGallery({viewId}){
    useEffect(() => {
        window.localStorage.setItem('viewId', viewId)
    }, [viewId])
    return(
        <React.Fragment>
            <div className="message">
                Use this view-id <span className="badge">{viewId}</span> in home page to revisting these croped image
            </div>
            <div className="canvas-wrapper">
                {
                    viewId.split("-").map(i => (
                        <ImageContainer src={"https://i.imgur.com/" + i + ".png"} />
                    ))
                }
            </div>
        </React.Fragment>
    )
}

function mapStateToProp(state){
    return{
        viewId: state.viewId
    }
}

export default connect(mapStateToProp, null)(ImageGallery)