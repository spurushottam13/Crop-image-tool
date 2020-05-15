import React from 'react'
import './header.css'

function Header(){
    const viewId = window.localStorage.getItem('viewId')
    return(
        <div className="header">
            <p>Image Cropping Tool</p>
            {
                viewId ? (
                    <div>
                        <span className="capsule left">Recent view-id</span> 
                        <span className="capsule right">{viewId}</span>    
                    </div>
                ) : (
                    <p className="n-text">crafted with 💙 by <a href="https://github.com/spurushottam13" target="_blank" className="clean-aTag">purushottam</a></p>
                )
            }
        </div>
    )
}

export default Header