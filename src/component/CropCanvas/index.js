import React, {useRef, useEffect} from 'react'
import { connect } from 'react-redux'
import './cropCanvas.css'
import { addAllCropCanvas } from '../../actions'

function CropCanvas({ activeCropCanvas, activeCropCanvasIndex, addAllCropCanvas }) {
    const cropCanvas1 = useRef()
    const cropCanvas2 = useRef()
    const cropCanvas3 = useRef()
    const cropCanvas4 = useRef()
    addAllCropCanvas([cropCanvas1, cropCanvas2, cropCanvas3, cropCanvas4])
    return (
        <React.Fragment>
            <canvas
                className="crop canvas-style"
                style={activeCropCanvasIndex  === 0 ? {display: 'block'} : {}}
                ref={cropCanvas1}
                width={755} height={450}
            ></canvas>
            <canvas
                className="crop canvas-style"
                style={activeCropCanvasIndex  === 1 ? {display: 'block'} : {}}
                ref={cropCanvas2}
                width={365} height={450}
            ></canvas>
            <canvas
                className="crop canvas-style"
                style={activeCropCanvasIndex  === 2 ? {display: 'block'} : {}}
                ref={cropCanvas3}
                width={365} height={212}
            ></canvas>
            <canvas
                className="crop canvas-style"
                style={activeCropCanvasIndex  === 3 ? {display: 'block'} : {}}
                ref={cropCanvas4}
                width={380} height={380}
            ></canvas>
        </React.Fragment>
    )
}

function mapStateToProp(state) {
    return {
        activeCropCanvas: state.activeCropCanvas,
        activeCropCanvasIndex: state.activeCropCanvasIndex
    }
}

const mapDispatchToProp = {
    addAllCropCanvas: addAllCropCanvas
}

export default connect(mapStateToProp, mapDispatchToProp)(CropCanvas)