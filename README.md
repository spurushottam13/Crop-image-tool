## Image Crop Tools

* Run Project : `npm install` and `npm start`

* Custom Hooks  
    - `useImageCropper` : take orignal canvas and render the crop image on result canvas with config.   
    ```
    const { setCanvas } = useImageCropper(originalCanvas)
    setCanvas({
        originalCanvas: originalCanvas,
        resultCanvas: canvas,
        img: imgSource,
        cropHeight: canvas.current.height,
        cropWidth: canvas.current.width
    })
    ```

    - `useModal` : display modal with component pass as a parameter

    ```
    const {ModalProvider, showModal} = useModal()
    
    showModal(<p>Please selecct all image size to crop, by clicking on Image size button.</p>)

    return (
        <div>
        ....
            ...
        <ModalProvider>
        </div>
    )
    ```

