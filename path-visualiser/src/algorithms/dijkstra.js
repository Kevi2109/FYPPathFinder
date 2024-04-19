// The Code here for Dijksra was developed with aid of the youtube video "https://www.youtube.com/watch?v=msttfIHHkak&t=1229s&ab_channel=Cl%C3%A9mentMihailescu"
// This code sets the foundation to how the other algorthims are written by following a similar implementation style 
// I also developled some parts of this section by myself and adjusted the code based on the fact that I have multiple algos; compared to the one only shown within the tutorial


// Defines the variables within the object 'node' -> has common properties associated with a node
//const node = {
//    rows, cols, distance, isvisited
//};

export function dijkstra_algorithm(matrix, startNode, finishNode){
    const visitedNodesInOrder = [];
    if(!startNode || !finishNode || startNode === finishNode){
        return false; // We return false for any invalid inputs.
    } // we take in our matrix, SN, FN as param and make sure with the if statement there aren't any edge cases. eg no SN or FN/ or they overlap.

    // Since this is Dijksta, we want to set the distance to every other node to infinity, as we can't reach all the nodes
    // expect the start node which will be at zero 
    // then we would want to pick the closet node of all the nodes to visit next, but whithin this case since our SN is equal to zero we will chose that.
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(matrix);
    while(!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closetNode = unvisitedNodes.shift(); // Once we get to our closet node, we then in he while loop updates all the neigbouring nodes, will then have whatever the current distance is +1 as it "shifts" that value/ pops it over. Instead of using unshift.
                                                   // Shift method = mutating method. removes the first element from the "UVN" array and assigns it to the var "CN"S
                                                   // Updates "CN" for further 
        // Edge cases
        //HANDLE WALLS
        if(closetNode.isWall) continue;
        //HANDLE IMPOSSIBLE LATER
        if(closetNode.distance === Infinity) return visitedNodesInOrder; // If = to infinity means if there is no closet node as we trapped in a wall. we will return the visitedNodesInOrder.
        //ANIMATE LATER
        closetNode.isVisited = true; // this is mark to show that the node is visited is VISITED and that will be true.
        visitedNodesInOrder.push(closetNode);
        if(closetNode === finishNode) return visitedNodesInOrder; // at some point the the closet Node will equal the finish node, so therefore we have completed the task.
        updateUnvisitedNeighbors(closetNode, matrix);                      // returns an array of VN in the order we have visited them.
                                                                  // So after every closet node, we appened the closet node to the array VNIO
                                                                  // does so we can animate the nodes in the order we have visited them.
        console.log('Visited Nodes:', visitedNodesInOrder);                                             
    }
}

function sortNodesByDistance(unvisitedNodes){
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
} // Sorts the "UVN" nodes, based on the distance.

function updateUnvisitedNeighbors(node, matrix){
    const unvisitedNeighbors =getUnvisitedNeighbors(node,matrix);
    for (const neighbor of unvisitedNeighbors){
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}
// When we are updating the neigbors with a new distance, we mark them with the previous node
// that will be the current node we are at. which adventually gives us the shortest path.

// This function intialises an empty array and then gets the rows and cols properties from the node object.
// if the node is to above, below, on the left hand side or right it will push the node into the newley construted neighbours array.
// Overall this function only gets the unvisited neighbouring nodes and indetifies adjcent nodes.
function getUnvisitedNeighbors(node,matrix){

    const neighbors = [];
    const{cols,rows} = node;

    if(rows > 0) neighbors.push(matrix[rows -1][cols]);
    if(rows < matrix.length -1) neighbors.push(matrix[rows +1][cols]);
    if(cols > 0) neighbors.push(matrix[rows][cols-1]);
    if(cols < matrix[0].length -1 ) neighbors.push(matrix[rows][cols+1]);

    //return neighbors
    return neighbors.filter(neighbor => !neighbor.isVisited); //filters the neigbors by those of which that aren't visited/ unvisitied.
}

// This function here turns the 2d martix into 1D array so its easier to keep track of 
// the order of nodes within the matirx, row by row, thus preserving it.
// The inner loop iterates through each node that is within the current row, whilst the outer for loop iterates through each node within the matrix
function getAllNodes(matrix) {
    const nodes = [];
    for (const rows of matrix) {
      for (const node of rows) {
        nodes.push(node);
      }
    }
    return nodes;
  }

   export function getShortestPathOfNodes(finishNode){
    const shortestPathOfNodes = [];
    let currentNode = finishNode;
    while(currentNode !== null){
        shortestPathOfNodes.unshift(currentNode);
        currentNode = currentNode.previousNode;    
    }
    return shortestPathOfNodes;
  }
  // This method will help us find the shortest path as this preforms the calulations backwards from the finsihing node to where we started.
  // kinda like a linked list

