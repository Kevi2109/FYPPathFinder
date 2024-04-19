// The Code here was inspired from Dijksra and was developed with aid of the youtube video "https://www.youtube.com/watch?v=msttfIHHkak&t=1229s&ab_channel=Cl%C3%A9mentMihailescu"
// and CHAT GPT used to help modify the Dijsktra code into perfoming a random walk, mixed with some of my written code. To help this properly run.

export function randomWalksAlgorithm(matrix, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;  // We return false for any invalid inputs.
    }

    // CHAT GPT USED HERE TO MODIFY THE FUNCTION FROM DIJKSTRA
    initialiseNodes(matrix);  // Initialise node properties

    let currentNode = startNode;
    let previousNode = null
    const visitedNodesInOrder = [currentNode];

// While the currentNode (that is searching) is not equal to the finishNode. Continuse the search.
    while (currentNode !== finishNode) {
        // CHAT GPT USED HERE TO MODIFY THE FUNCTION FROM DIJKSTRA
        const neighbors = getAllNeighbors(currentNode, matrix);
        const availableNeighbors = neighbors.filter(neighbor => !neighbor.isWall);

        const randomIndex = Math.floor(Math.random() * availableNeighbors.length);
        const nextNode = availableNeighbors[randomIndex];
        
        currentNode.previousNode = previousNode
        currentNode.isVisited = true;
        previousNode = currentNode;
        currentNode = nextNode;  
        visitedNodesInOrder.push(currentNode);

      //  console.log('Current Node:', currentNode);
      //  console.log('Visited Nodes:', visitedNodesInOrder);
    }
    console.log('Visited Nodes:', visitedNodesInOrder);
   // if(currentNode === finishNode){
   // currentNode.previousNode = previousNode;
   // visitedNodesInOrder.push(currentNode);
   // }
    return visitedNodesInOrder; 
}
// The function above gets all the neighbours within the matrix
// and handles the edge case of the walls slightly different by filtering out any neighbour that is a wall
// Those nodes are then stored withn in the array 'avalibleNeighbors'.
// Then randomly selects any adject neighbors by using the randomIndex within the range of the previous array 'availableNeigbors'
// Then the previous node is marked as visited and then updates current node to be the next randomly selectednode at the time.
// This Itteration keeps occuring until we reach the end goal.

// CHAT GPT USED HERE TO MODIFY THE FUNCTION FROM DIJKSTRA
// Intitalises extra properties of the random walk algorithm needed
function initialiseNodes(matrix) {
    for (const row of matrix) {
        for (const node of row) {
            node.isVisited = false;
            node.distance = Infinity;
            node.previousNode = null;
        }
    }
}

// This function intialises an empty array and then gets the rows and cols properties from the node object.
// if the node is to above, below, on the left hand side or right it will push the node into the newley construted neighbours array.
// Overall this function only gets the unvisited neighbouring nodes and indetifies adjcent nodes.
function getAllNeighbors(node, matrix) {

    const neighbors = [];
    const { cols, rows } = node;

    if (rows > 0) neighbors.push(matrix[rows - 1][cols]);
    if (rows < matrix.length - 1) neighbors.push(matrix[rows + 1][cols]);
    if (cols > 0) neighbors.push(matrix[rows][cols - 1]);
    if (cols < matrix[0].length - 1) neighbors.push(matrix[rows][cols + 1]);

    //return neighbors
    return neighbors; //filters the neigbors by those of which that aren't visited/ unvisitied.
}

// >>> Previous code not needed <<<
//function updateUnvisitedNeighbors(node, matrix) {
//    const unvisitedNeighbors = getUnvisitedNeighbors(node, matrix);
//    for (const neighbor of unvisitedNeighbors) {
//        // Check if the neighbor is already visited
//        if (!neighbor.isVisited) {
//            neighbor.distance = node.distance + 1;
//            neighbor.previousNode = node;
//        }
//    }
//}
// >>> Previous code not needed <<<

// >>> Previous code not needed <<<
///function getUnvisitedNeighbors(node, matrix) {
///    const neighbors = [];
///    const { cols, rows } = node;

///    if (rows > 0) neighbors.push(matrix[rows - 1][cols]);
///    if (rows < matrix.length - 1) neighbors.push(matrix[rows + 1][cols]);
///    if (cols > 0) neighbors.push(matrix[rows][cols - 1]);
///    if (cols < matrix[0].length - 1) neighbors.push(matrix[rows][cols + 1]);

///    return neighbors.filter(neighbor => !neighbor.isVisited);
///}
// >>> Previous code not needed <<<

// >>> Previous code not needed <<<
///function getAllNodes(matrix) {
///    const nodes = [];
///    for (const rows of matrix) {
///        for (const node of rows) {
///            nodes.push(node);
///        }
///    }
///    return nodes;
///}
// >>> Previous code not needed <<<


// Function used to animaite the shortest path within the PVisualiser.
export function getShortestPathOfNodes2(finishNode) {
    const shortestPathOfNodes = [];
    let currentNode = finishNode;
    console.log(currentNode.previousNode)
    while (currentNode !== null) {
        shortestPathOfNodes.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
   // console.log(shortestPathOfNodes);
    return shortestPathOfNodes;
}
  // This method will help us find the shortest path as this preforms the calulations backwards from the finsihing node to where we started.
  // kinda like a linked list