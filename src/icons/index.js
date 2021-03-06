import React from 'react'
const upload = _ =>(
    <svg 
        version="1.1" 
        id="Layer_1" 
        color={'white'}
        height="25px"
        width="25px"
        xmlns="http://www.w3.org/2000/svg" 
        style={{marginRight: 15, fill: '#2425f6'}}
        x="0px" y="0px" viewBox="0 0 512 512" 
    > <g> <g> <g> 
        <path d="M256,0C114.833,0,0,114.844,0,256s114.833,256,256,256s256-114.844,256-256S397.167,0,256,0z M256,490.667 C126.604,490.667,21.333,385.396,21.333,256S126.604,21.333,256,21.333S490.667,126.604,490.667,256S385.396,490.667,256,490.667 z"/> <path d="M263.542,88.458c-4.167-4.167-10.917-4.167-15.083,0L141.792,195.125c-4.167,4.167-4.167,10.917,0,15.083 c4.167,4.167,10.917,4.167,15.083,0l88.458-88.458V416c0,5.896,4.771,10.667,10.667,10.667s10.667-4.771,10.667-10.667V121.75 l88.458,88.458c2.083,2.083,4.813,3.125,7.542,3.125s5.458-1.042,7.542-3.125c4.167-4.167,4.167-10.917,0-15.083L263.542,88.458z "/> </g> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> 
    </svg>
)

const search = ({onClick}) => (
    <svg version="1.1" 
        id="Capa_1" 
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg"
        className="search-icon"
        x="0px" y="0px"width="25px" height="25px" 
        viewBox="0 0 30.239 30.239"
    > <g> <path d="M20.194,3.46c-4.613-4.613-12.121-4.613-16.734,0c-4.612,4.614-4.612,12.121,0,16.735 c4.108,4.107,10.506,4.547,15.116,1.34c0.097,0.459,0.319,0.897,0.676,1.254l6.718,6.718c0.979,0.977,2.561,0.977,3.535,0 c0.978-0.978,0.978-2.56,0-3.535l-6.718-6.72c-0.355-0.354-0.794-0.577-1.253-0.674C24.743,13.967,24.303,7.57,20.194,3.46z M18.073,18.074c-3.444,3.444-9.049,3.444-12.492,0c-3.442-3.444-3.442-9.048,0-12.492c3.443-3.443,9.048-3.443,12.492,0 C21.517,9.026,21.517,14.63,18.073,18.074z"/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> 
</svg>)

const Icon =  {
    upload,
    search
}

export default Icon