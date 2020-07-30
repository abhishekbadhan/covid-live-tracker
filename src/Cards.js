import React from 'react';
import { Card } from '@material-ui/core';
import kFormatter from './Utils';
import './Cards.css';

function Cards(props) {
    return (
        <div onClick={props.onClick} className ={` ${props.action && props.title }`} >
            <Card style={{padding:20}} >
                <div style={{opacity:0.8}} >{props.title}</div> 
                <div className="clickhere">CLICK HERE</div>
                <br></br>
                <b className="numformat" >+{kFormatter(props.cases)}</b>
                <br></br>
            </Card>
        </div>
    )
}

export default Cards