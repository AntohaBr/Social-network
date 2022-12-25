import React from 'react';
import preloader from '../../../assets/images/preloader.gif';


export const Preloader = ({}) => {
    return <div style={{backgroundColor: 'white'}}>
        <img src={preloader}/>
    </div>
}