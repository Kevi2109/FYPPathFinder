// The Code here for Dijksra was developed with aid of the youtube video "https://www.youtube.com/watch?v=msttfIHHkak&t=1229s&ab_channel=Cl%C3%A9mentMihailescu", as stated in the report.
// This code sets the foundation to how the other algorthims are written by following a similar implementation style 
// I also developled some parts of this section by myself and adjusted the code based on the fact that I have multiple algorithm; compared to the single algorithm shown within the tutorial

import Node from './Node/Node';
import React, {Component} from 'react';
import {dijkstra_algorithm, getShortestPathOfNodes} from '../algorithms/dijkstra';
import {aStarSearch, getShortestPathOfNodes1} from '../algorithms/aStar';
import {randomWalksAlgorithm, getShortestPathOfNodes2} from '../algorithms/randomWalk';
import {plantGrowthAlgorithm, getShortestPathOfNodes3} from '../algorithms/natureInspired';
import './PVisualiser.css';


// Variables to set the position of the start node and end node witin the matirx
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

    // All 3 mouse events, for when the mouse is pressed dowm, held up(after clicked) and not clicked to implement the walls. 
    handleMD(rows, cols){
        const newMatrix = getNewMatrixWithWallToggled(this.state.matrix, rows, cols); // gets a new matrix at the given nodes rols and cols
        this.setState({matrix: newMatrix, mouseIsPressed: true}); 
    }

    handleME(rows, cols){
        if (!this.state.mouseIsPressed) return;
        const newMatrix = getNewMatrixWithWallToggled(this.state.matrix, rows, cols); // gets a new matrix at the given nodes rols and cols
        this.setState({matrix: newMatrix});
    }
    
    handleMU(){
        this.setState({mouseIsPressed: false});
    }
    
// This animation function takes in the two paraemeters and uses the same procedure as the bottom function to create a delay within the for loop; whilst itterating through the array
// It accesses the DOM element within the project and therefore adds the CSS clas to it ('node-visited')
// By having the return statement, we ensure that this function exists the animation after the scheduled timne has elasped.
// As result, means that it does not continue to iterate over the nodes.
// two functions within this code that causes the delay of 10 milliseconds.
    animatedNodes(visitedNodesInOrder,shortestPathOfNodes){
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

// Within this function we use a for loop to iterate through an array 'ShortestPathOfNodes' which uses the setTimeOut function to set an execution time of the function
// In this case it will be a delay of 50 milliseconds
// It then access DOM elemenets which represent current nodes, which is what visually styles the animation of the shortest path of nodes. (Nodes.css)
    animateShortestPath(shortestPathOfNodes){
    //>>>
    // The function expression date, was tried out, to try and record time of the algorithms computaionally. within this function to animate the shortest path.
      // var testTest = Date.now();
        //console.time("KIWI");
       // console.log(shortestPathOfNodes);
    //<<<
        for (let k = 0; k < shortestPathOfNodes.length; k++){

            setTimeout(() => {
            const node = shortestPathOfNodes[k];
            document.getElementById(`node-${node.rows}-${node.cols}`).className =
            'node node-shortest-path';
            }, 50 * k);
        }
    //>>>
       // console.log(Date.now()-testTest);
       // console.timeEnd("KIWI");
    //<<<
    }

// <<< Explaniation for the visualise_dij, visualise_aStar, Visualise_RWA and Visulse_PGA functtions >>>   
// The next four functions work the same, so what happens is that we retrieve the state of the matrix, startNode, finsihNode.
// and then call the algorithm we have made which is the dijsktra_algorithm and pass in the three parameters we stated above
// the nested animate function with this function calls the visitedNodesInOrder and the shortestPathOfNodes as arguments and
// allows the code to be visually displayed within the matrix 

// Visualisation function for Dijsktra 
    visualise_dij(){
        const{matrix} = this.state;
        const startNode = matrix[START_NODE_ROW][START_NODE_COL];
        const finishNode = matrix[END_NODE_ROW][END_NODE_COL];
        const visitedNodesInOrder = dijkstra_algorithm(matrix, startNode, finishNode)
        const shortestPathOfNodes = getShortestPathOfNodes(finishNode)
        //console.log(shortestPathOfNodes);
        this.animatedNodes(visitedNodesInOrder, shortestPathOfNodes);
        // once we have the visited node from dijkstra
        // we can call another node to get nodes in the shortest path order. Which will start at the finishNode and wiil work itself backwards in a linear fashion
        //console.log(visitedNodesInOrder); // ordered array of all the nodes we have visited in order. -> we will iteriate over this.
    }

// Visualisation function for A* 
    visualise_aStar(){
        const{matrix} = this.state;
        const startNode = matrix[START_NODE_ROW][START_NODE_COL];
        const finishNode = matrix[END_NODE_ROW][END_NODE_COL];
        const visitedNodesInOrder = aStarSearch(matrix, startNode, finishNode)
        const shortestPathOfNodes = getShortestPathOfNodes1(finishNode)
        //console.log(shortestPathOfNodes);
        this.animatedNodes(visitedNodesInOrder, shortestPathOfNodes);
        // once we have the visited node from dijkstra
        // we can call another node to get nodes in the shortest path order. Which will start at the finishNode and wiil work itself backwards in a linear fashion
        //console.log(visitedNodesInOrder); // ordered array of all the nodes we have visited in order. -> we will iteriate over this.
    }

// Visualisation function for Random Walk
    visualise_RWA(){
        const{matrix} = this.state;
        const startNode = matrix[START_NODE_ROW][START_NODE_COL];
        const finishNode = matrix[END_NODE_ROW][END_NODE_COL];
        const visitedNodesInOrder = randomWalksAlgorithm(matrix, startNode, finishNode)
        console.log(visitedNodesInOrder);
        const shortestPathOfNodes = getShortestPathOfNodes2(finishNode)
        //console.log(shortestPathOfNodes);
        this.animatedNodes(visitedNodesInOrder, shortestPathOfNodes);
        // once we have the visited node from dijkstra
        // we can call another node to get nodes in the shortest path order. Which will start at the finishNode and wiil work itself backwards in a linear fashion
        //console.log(visitedNodesInOrder); // ordered array of all the nodes we have visited in order. -> we will iteriate over this.
    }

// Visualisation function for Plant Growth
    visualise_PGA() {
            const{matrix} = this.state;
            const startNode = matrix[START_NODE_ROW][START_NODE_COL];
            const finishNode = matrix[END_NODE_ROW][END_NODE_COL];
            const visitedNodesInOrder = plantGrowthAlgorithm(matrix, startNode, finishNode)
            const shortestPathOfNodes = getShortestPathOfNodes3(finishNode)
            //console.log(shortestPathOfNodes);
            this.animatedNodes(visitedNodesInOrder, shortestPathOfNodes);
            // once we have the visited node from dijkstra
            // we can call another node to get nodes in the shortest path order. Which will start at the finishNode and wiil work itself backwards in a linear fashion
            //console.log(visitedNodesInOrder); // ordered array of all the nodes we have visited in order. -> we will iteriate over this.
    }
    
// <<< old code from start of the project >>>
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
// <<< old code from start of the project >>>


// Rendering the user interface 
    render() {
        //const {nodes} = this.state;
        //console.log(nodes)
        const {matrix, mouseIsPressed} = this.state;

        return(
        <>
            <button onClick={() => this.visualise_dij()}> 
                Visualise Dijkstra's Algorithm
            </button>
            <button onClick={() => this.visualise_aStar()}>
                Visualise A* Algorithm
            </button>
            <button onClick={() => this.visualise_RWA()}>
                 Visualise Random Walk Algorithm
            </button>
            <button onClick={() => this.visualise_PGA()}>
                Visualise Plant Growth Algorithm
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
                            ); // When we render these nodes wihtin the div container, we pass down these properties based on the node
                        })}
                        </div> // mapping over the 'rows' array which we are rendering a '<Node>' component for. "nodes" = reps node within row & "nodesIndex" = index of curr node within row.
                    );
                })}
            </div>
        </>
        );
    }
}


// This functions pruporses is to create the matrix and will thereofre intilise and return the matrix of nodes.
// Creates a matrix of 20x50
// It pushes the new node that is created with createNode into the currentRows of the matrix and will then populate it based of that.
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

// This function here is nested within the function above
// and creates a node object with the parameters 'cols' & 'rows'
// which will have node properties set for it.
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

// This function allows for the modification of the orginal matrix
// as this is done by creating a copy of the martix and slicing it.
// After that it updates the newMatrix with the rows and cols with newNodes object
// We then return a new matrix with the walls being toggeled on or off.
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



