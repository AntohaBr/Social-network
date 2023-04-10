import React from 'react'
import preloader from 'Assets/Images/Preloader.gif'


export const Preloader = ({}) => {
    return <div style={{backgroundColor: 'white'}}>
        <img src={preloader}/>
    </div>
}