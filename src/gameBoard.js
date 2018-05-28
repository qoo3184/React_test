import React, { Component } from 'react';
import { createStore } from 'redux';
import {Board,WhoWin,Btn} from './styled';
import Cells from './cells';
let redux={
    store:null,
    reducer:(state, action)=>{
        switch(action.type){
            case 'updateMark' :
                let currentMark=state.marks[action.index];
                if(currentMark===-1&&state.winner===null){ // 符合更新條件
                    let mark=state.circle%2; // 根據回合數，決定要畫圈或叉
                    state.marks[action.index]=mark; // 把圈或叉的標記，記錄到 marks 裡面
                    let winner=redux.checkWinner(state.marks); // 偵測贏家
                    return {
                        circle:state.circle+1,
                        marks:state.marks,
                        winner:winner
                    };
                }else{ // 不符合更新條件，不更新狀態
                    return state
                }
            case 'reStart':
                document.getElementById('winner').innerHTML='';
                return {
                    circle:0,
                    marks:[-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    winner:null
                };
            default :
                return state;
        }
    },
    checkWinner:(marks)=>{
         // 偵測水平方向的三條線是否有相同的標記
        let index;
        for(let y=0;y<3;y++){
            if(marks[y*3]!==-1&&marks[y*3]===marks[y*3+1]&&marks[y*3+1]===marks[y*3+2]){
                return {side:marks[y*3]};
            }
        }
        // 偵測垂直方向的三條線是否有相同的標記
        for(let x=0;x<3;x++){
            if(marks[x]!==-1&&marks[x]===marks[3+x]&&marks[3+x]===marks[2*3+x]){
                return {side:marks[x]};
            }
        }
        // 偵測斜線方向的兩條線是否有相同的標記
        if(marks[0]!==-1&&marks[0]===marks[4]&&marks[4]===marks[8]){
            return {side:marks[0]};
        }else if(marks[2]!==-1&&marks[2]===marks[4]&&marks[4]===marks[6]){
            return {side:marks[2]};
        }
        // 目前還沒有贏家
        return null;
    }
}
redux.store=createStore(redux.reducer, {
    circle:0, // 回合數
    marks:[-1, -1, -1, -1, -1, -1, -1, -1, -1], // 框框標記：-1 無, 0: 圈, 1: 叉
    winner:null // 贏家的資訊，null 代表沒有
});
class GameBoard extends React.Component {
    constructor(props){
        super(props);
        this.state=redux.store.getState();
    }
    render(){
        let grids =[];
        for(let i=0;i<this.state.marks.length;i++){
            grids.push(
                <Cells index={i} num={this.state.marks[i]} updateDate={this.update.bind(this)}/>
            );
        }
        let text='';
        if(this.state.winner){
            if(this.state.winner.side===0){
                text= 'O獲勝 ! !';
            }
            else{
                text= 'X獲勝 ! !';
            }
            document.getElementById('winner').innerHTML=text;
        }
        else if(this.state.winner===null&&this.state.circle===9){
            text='平局';
            document.getElementById('winner').innerHTML=text;
        }
        return <div>
                    <WhoWin id='winner'></WhoWin>
                    <Board>{grids}</Board>
                    <Btn onClick={this.restart.bind(this)}>RESTART</Btn>
                </div>
    }
    update(index){
        redux.store.dispatch({
            index:index,
            type:'updateMark'
        });
    }
    restart(){
        redux.store.dispatch({
            type:'reStart'
        });
    }
    refresh(){
    // 把 Redux 的狀態設定給組件，觸發畫面更新
        this.setState(redux.store.getState());
    }
    // 連結點建立：註冊狀態改變的通知處理函式，回應 Redux 中的狀態變化
    componentDidMount(){
        this.unsubscribe=redux.store.subscribe(this.refresh.bind(this));
    }
    // 連結點斷開：若使用者介面被遺棄，則取消註冊函式
    componentWillUnmount(){
        this.unsubscribe();
    }
}

export default GameBoard;

