import React from 'react';
import { connect } from 'react-redux';

function ImageGallery({viewId}){
    return(
        <React.Fragment>
            <p>This is Image Gallery</p>
            {
                viewId.split("-").map(i => <img src={"https://i.imgur.com/" + i + ".png"} />)
            }
        </React.Fragment>
    )
}

function mapStateToProp(state){
    return{
        viewId: state.viewId
    }
}

export default connect(mapStateToProp, null)(ImageGallery)