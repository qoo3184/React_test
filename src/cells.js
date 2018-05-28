import React, { Component } from 'react';
import { createStore } from 'redux';
import {Cell} from './styled';

class Cells extends React.Component{
    render(){
        let text="";
        if(this.props.num===0){
            text="O";
        }else if(this.props.num===1){
            text="X";
        }
        return <Cell onClick={this.updateMark.bind(this)}>{text}</Cell>;
    }
    updateMark(){
        this.props.updateDate(this.props.index);
    }
}

export default Cells;