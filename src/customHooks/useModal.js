import React, { useState } from 'react';

function useModal() {
    const [isActive, setIsActive] = useState(false)
    const [component, setComponent] = useState(null)
    const handleClose = () => setIsActive(false) && setComponent(null)
    const show = (component) => {
        setComponent(component)
        setIsActive(true)
    }
    const Provider = () => (
        <div style={
            isActive ? {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                overflow: "auto",
                zIndex: 1
            } : {
                display: "none"
            }
        }>
            <div 
                style={{
                    position: "fixed",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)"
                }}
                onClick={handleClose}
            >
                <div
                    style={{
                        position: "relative",
                        width: '90%',
                        maxWidth: '500px',
                        padding: 20,
                        boxSizing: "border-box",
                        backgroundColor: "#fff",
                        margin: "auto",
                        marginTop: 60,
                        borderRadius: 3,
                        zIndex: 2,
                        textAlign: "left",
                        boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)"
                    }}
                >
                    {component}
                    <div
                        style={{
                            width: "fit-content",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            background: "#8ea5f4",
                            color: "white",
                            cursor: "pointer"
                        }}
                        onClick={handleClose}
                    >Close</div>
                </div>
            </div>
        </div >
    )
    return{
        ModalProvider: Provider,
        showModal: show
    }
}

export default useModal