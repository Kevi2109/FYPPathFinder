import Node from './Node/Node';
import React, {Component} from 'react';
import {dijkstra_algorithm, getShortestPathOfNodes} from '../algorithms/dijkstra';
import {aStarSearch, getShortestPathOfNodes1} from '../algorithms/aStar';
import {randomWalksAlgorithm, getShortestPathOfNodes2} from '../algorithms/test';
import {plantGrowthAlgorithm, getShortestPathOfNodes3} from '../algorithms/natureInspired';
import './PVisualiser.css';


const START_NODE_COL = 15;
const START_NODE_ROW = 10;
const END_NODE_COL = 35;
const END_NODE_ROW = 10;
// This is a simple component that has no state, but only renders a div called "matrix" # and a Node component 
export default class PVisualiser extends Component {
    constructor(){
        super();
        this.state = {matrix: [], mouseIsPressed: false, };       
    }

    
// This is a type of lifecycle method within react. This method is called after a component has been inserted into the DOM(Document Object Model). 
// Creates a matrix of 'nodes' with a an empty array first initliased. After that I have 2 loops to create 15rows and 50columns for my matrix.
    componentDidMount() {
        const matrix =getIntialMatrix();
        this.setState({matrix});
    }

    // All 3 mouse events

    handleMD(rows, cols){
        const newMatrix = getNewMatrixWithWallToggled(this.state.matrix, rows, cols); // gets a new matrix at the given nodes rols and cols
        this.setState({matrix: newMatrix, mouseIsPressed: true}); 
    }

    handleME(rows, cols){
        if (!this.state.mouseIsPressed) return;
        const newMatrix = getNewMatrixWithWallToggled(this.state.matrix, rows, cols);
        this.setState({matrix: newMatrix});
    }
    
    handleMU(){
        this.setState({mouseIsPressed: false});
    }
    

    animatedDijkstraNodes(visitedNodesInOrder,shortestPathOfNodes){
        for (let k = 0; k <= visitedNodesInOrder.length; k++){
            if ( k === visitedNodesInOrder.length){
              setTimeout(()=>{
                this.animateShortestPath(shortestPathOfNodes)
              }, 10 * k)
              return;   
            }
            setTimeout(() => {
            const node =visitedNodesInOrder[k];
            document.getElementById(`node-${node.rows}-${node.cols}`).className =
            'node node-visited';
            }, 10 * k);
        }
    }


    animateShortestPath(shortestPathOfNodes){
        console.log(shortestPathOfNodes);
        for (let k = 0; k < shortestPathOfNodes.length; k++){

            setTimeout(() => {
            const node = shortestPathOfNodes[k];
            document.getElementById(`node-${node.rows}-${node.cols}`).className =
            'node node-shortest-path';
            }, 50 * k);
        }
    }

    visualise_dij(){
        const{matrix} = this.state;
        const startNode = matrix[START_NODE_ROW][START_NODE_COL];
        const finishNode = matrix[END_NODE_ROW][END_NODE_COL];
        const visitedNodesInOrder = dijkstra_algorithm(matrix, startNode, finishNode)
        const shortestPathOfNodes = getShortestPathOfNodes(finishNode)
        //console.log(shortestPathOfNodes);
        this.animatedDijkstraNodes(visitedNodesInOrder, shortestPathOfNodes);
        // once we have the visited node from dijkstra
        // we can call another node to get nodes in the shortest path order. Which will start at the finishNode and wiil work itself backwards in a linear fashion
        //console.log(visitedNodesInOrder); // ordered array of all the nodes we have visited in order. -> we will iteriate over this.
    }

    visualise_aStar(){
        const{matrix} = this.state;
        const startNode = matrix[START_NODE_ROW][START_NODE_COL];
        const finishNode = matrix[END_NODE_ROW][END_NODE_COL];
        const visitedNodesInOrder = aStarSearch(matrix, startNode, finishNode)
        const shortestPathOfNodes = getShortestPathOfNodes1(finishNode)
        //console.log(shortestPathOfNodes);
        this.animatedDijkstraNodes(visitedNodesInOrder, shortestPathOfNodes);
        // once we have the visited node from dijkstra
        // we can call another node to get nodes in the shortest path order. Which will start at the finishNode and wiil work itself backwards in a linear fashion
        //console.log(visitedNodesInOrder); // ordered array of all the nodes we have visited in order. -> we will iteriate over this.
    }

    visualise_RWA(){
        const{matrix} = this.state;
        const startNode = matrix[START_NODE_ROW][START_NODE_COL];
        const finishNode = matrix[END_NODE_ROW][END_NODE_COL];
        const visitedNodesInOrder = randomWalksAlgorithm(matrix, startNode, finishNode)
        console.log(visitedNodesInOrder);
        const shortestPathOfNodes = getShortestPathOfNodes2(finishNode)
        //console.log(shortestPathOfNodes);
        this.animatedDijkstraNodes(visitedNodesInOrder, shortestPathOfNodes);
        // once we have the visited node from dijkstra
        // we can call another node to get nodes in the shortest path order. Which will start at the finishNode and wiil work itself backwards in a linear fashion
        //console.log(visitedNodesInOrder); // ordered array of all the nodes we have visited in order. -> we will iteriate over this.
    }

    visualise_ACO() {
            const{matrix} = this.state;
            const startNode = matrix[START_NODE_ROW][START_NODE_COL];
            const finishNode = matrix[END_NODE_ROW][END_NODE_COL];
            const visitedNodesInOrder = plantGrowthAlgorithm(matrix, startNode, finishNode)
            const shortestPathOfNodes = getShortestPathOfNodes3(finishNode)
            //console.log(shortestPathOfNodes);
            this.animatedDijkstraNodes(visitedNodesInOrder, shortestPathOfNodes);
            // once we have the visited node from dijkstra
            // we can call another node to get nodes in the shortest path order. Which will start at the finishNode and wiil work itself backwards in a linear fashion
            //console.log(visitedNodesInOrder); // ordered array of all the nodes we have visited in order. -> we will iteriate over this.
    }
    

//    componentDidMount() {
//        const nodes = [];
//        for ( let rows = 0; rows <15; rows++ ){
//            const currentRows = [];
//            for ( let cols = 0; cols <50; cols++ ){
//                const cNode ={
//                    cols,
//                    rows,
//                    isStart: rows === 9 && cols === 5,
//                    isEnd: rows === 9 && cols === 45,  
//                }; // object cNode to hold start and finsih node. IsStart is true if the row is number 9 and col is 5. Same with IsFinish 
//                currentRows.push(cNode);
//            }
//            nodes.push(currentRows); // .push adds elements to the end of an array. Used to add the rows and cols 
//        }
//        this.setState({nodes}) // Tells react to re-render the state with our nodes array.
//    }

    render() {
        //const {nodes} = this.state;
        //console.log(nodes)
        const {matrix, mouseIsPressed} = this.state;

        return(
        <>
            <button onClick={() => this.visualise_dij()}>
                Visualise Dijkstra's algorithm
            </button>
            <button onClick={() => this.visualise_aStar()}>
                Visualize A* Algorithm
            </button>
            <button onClick={() => this.visualise_RWA()}>
                Nature Inspired Algoritm
            </button>
            <button onClick={() => this.visualise_ACO()}>
                Nature Inspired Algoritm 2
            </button>
            <div className="matrix">   
                {matrix.map((rows, rowsIndex)=>{ // Maps over the array 'matrix' and will itterate over the 'rows' array it will keep ahold of the current index
                                               // Need to add this key property to get rid of 'unique' warning. As we need to add a unqiue key to anything inside a itterable. "return <div key>"   
                    return (
                        <div key={rowsIndex}>    
                        {rows.map((nodes,nodesIndex) => {
                            const {rows, cols, isEnd,isStart, isVisited, isWall} = nodes;
                            return (
                              <Node
                                key={nodesIndex}
                                cols = {cols}
                                isEnd = {isEnd}
                                isStart = {isStart}                               
                                isVisited = {isVisited}
                                isWall = {isWall}
                                mouseIsPressed ={mouseIsPressed}
                                onMouseDown= {(rows, cols) => this.handleMD(rows,cols)}
                                onMouseEnter={(rows, cols) => 
                                    this.handleME(rows, cols)
                                }
                                onMouseUp = {() => this.handleMU()}
                                rows = {rows}></Node>
                            ); // When we render these nodes we pass down these properties based on the node
                        })}
                        </div> // mapping over the 'rows' array which we are rendering a '<Node>' component for. "nodes" = reps node within row & "nodesIndex" = index of curr node within row.
                    );
                })}
            </div>
        </>
        );
    }
}

const getIntialMatrix = () => {
    const matrix = [];
    for ( let rows = 0; rows <20; rows++ ){
        const currentRows = [];
        for ( let cols = 0; cols <50; cols++ ){
            currentRows.push(createNode(cols,rows));
        }
        matrix.push(currentRows);
    }
    return matrix;
};

const createNode = (cols,rows) => {
    return {
        cols,
        rows,
        isStart: rows === START_NODE_ROW && cols === START_NODE_COL,
        isEnd: rows === END_NODE_ROW && cols === END_NODE_COL,
        distance: Infinity,
        isVisited: false, 
        isWall: false,
        previousNode: null,    
    };
};


const getNewMatrixWithWallToggled = (matrix, rows, cols) => {
    const newMatrix = matrix.slice();
    const nodes = newMatrix[rows][cols];
    const newNodes = {
        ...nodes,
        isWall: !nodes.isWall,
    };
    newMatrix[rows][cols] = newNodes;
    return newMatrix;
};



