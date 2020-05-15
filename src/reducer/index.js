const mainReducer = (state, action) => {
    const {type, payload} = action
    switch(type){
        case "UPDATE_TITLE":
            return {...state, ...{title: payload}}
        case "ADD_ALL_CROP_CANVAS":
            return {...state, ...{allCropCanvas: payload}}
        case "SET_HAVE_IMAGE": 
            return {...state, ...{haveImage: payload}}
        case "SET_IMAGE_SOURCE":
            return {...state, ...{imgSource: payload}}
        case 'SET_ACTIVE_CROP_CANVAS_INDEX':
            return {...state, ...{activeCropCanvasIndex: payload}}
        case 'SET_IS_LOADING':
            return {...state, ...{isLoading: payload}}
        case 'SET_VIEW_ID': 
            return {...state, ...{viewId: payload}}
        default:
            return state
    }
}

export default mainReducer