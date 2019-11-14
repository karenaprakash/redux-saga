import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
/* ---- CSS ----- */
import './loader_spinner.css';

const LoaderSpinner = () => {
    return (
        <div className="center" > <CircularProgress /></div> 
    )
}

export default LoaderSpinner;