import styled from 'styled-components';

export const Board=styled.div`
    width: 300px;
    height: 300px;
    border:10px solid black;
    border-radius:10px;
`;
export const Cell=styled.div`
    width: 100px;
    height: 100px;
    box-sizing: border-box;
    border: 1px solid black;
    cursor:pointer;
    display:inline-block;
    font-size: 50px;
    line-height: 100px;
    text-align:center;
    vertical-align:middle;
    overflow:hidden;
`;
export const WhoWin=styled.h1`
    width: 300px;
    height:40px;
    font-size: 40px;
    line-height:40px;
    text-align:center;
`;
export const Btn=styled.button`
    width: 320px;
    height:40px;
    font-size: 20px;
    line-height:40px;
    text-align:center;
    margin-top: 10px;
`;