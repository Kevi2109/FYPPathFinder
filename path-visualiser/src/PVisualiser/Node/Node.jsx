// The Code here for Dijksra was developed with aid of the youtube video "https://www.youtube.com/watch?v=msttfIHHkak&t=1229s&ab_channel=Cl%C3%A9mentMihailescu"

// Node component
import React, {Component} from 'react';

import './Node.css';

// This is a simple component that has no state. This will render this Node component and will be called
// via the PVisualiser class that used this component which is then displayed with our App.js
export default class Node extends Component {
//    constructor(props){
//        super(props);
//        this.state = {};
//    }


    render() {
        const {cols, isEnd, isStart,isVisited,isWall, onMouseDown, onMouseEnter, onMouseUp,rows} = this.props;
        const extraClassName = isEnd
        ? 'node-end'
        : isStart
        ? 'node-start'
        : isVisited
        ? 'node-visited'
        : isWall
        ? 'node-wall'
        : '';
// Ternary used to see 'isEnd' which is true, we are going to have extra class name called 'node-end' which sets the end node to red and same for 'isStart'S
        return(
        <div
        id={`node-${rows}-${cols}`}
        className ={`node ${extraClassName}`}
        //return( <div className={`node ${extraClassName}`}
        onMouseDown={()=>onMouseDown(rows,cols)} // Implement the funcationality to create a wall. Eg clicking on node to make it wall and vice versa. and when you click and drag you want to create walls
        onMouseEnter={()=>onMouseEnter(rows,cols)} // These are 3 mouse event listeners, which is called on the node div. "mouse Enter" is when you hover over an element. useful when we come to drag
        onMouseUp={()=>onMouseUp()}  ></div> // when you realise
        );
    }
}

//export const DEFAULT_NODE = {
//   rows: 0,
//   cols: 0,
//};