// CHAT GPT used to help modify the Dijsktra code into perfoming an A* search, mixed with some of my written code. To help this properly run.

export function aStarSearch(matrix, startNode, finishNode) {
    const visitedNodesInOrder = [];
    if (!startNode || !finishNode || startNode === finishNode) {
        return false; // We return false for any invalid inputs.
    }

 // CHAT GPT USED HERE TO MODIFY THE FUNCTION FROM DIJKSTRA 
    // We want to initialise additional properties for the A* algorithm, so that it can calculate the heursitics.
    for (const rows of matrix) {
        for (const node of rows) {
           // node.distance = Infinity;
            node.heuristic = calculateHeuristic(node, finishNode);
            node.totalCost = Infinity;
           // node.isVisited = false;
           // node.previousNode = null;
        }
    }

// CHAT GPT USED HERE TO MODIFY THE FUNCTION FROM DIJKSTRA 
    startNode.distance = 0;
    startNode.totalCost = startNode.heuristic;

    const unvisitedNodes = getAllNodes(matrix);

// CHAT GPT USED HERE TO MODIFY THE FUNCTION FROM DIJKSTRA 
// !! = is used to convert the length value to a boolean, and if the length is non zero the loop will continue.
    while (!!unvisitedNodes.length) {
        sortNodesByTotalCost(unvisitedNodes);
        const currentNode = unvisitedNodes.shift();

        // HANDLE WALLS
        if (currentNode.isWall) continue;

        // HANDLE IMPOSSIBLE LATER
        if (currentNode.distance === Infinity) return visitedNodesInOrder;

        // ANIMATE LATER
        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);

        console.log('Current Node:', currentNode);
        console.log('Visited Nodes:', visitedNodesInOrder);

        if (currentNode === finishNode){
            console.log('Final Visited Nodes:', visitedNodesInOrder);
         return visitedNodesInOrder;
        }

        updateUnvisitedNeighbors(currentNode, matrix);
    }
}

// CHAT GPT USED HERE TO MODIFY THE FUNCTION FROM DIJKSTRA 
// sort method used to sort elements from the array 'unvisitedNodes'
// array sorts the 'unvisitedNodes' based on the ascending order of the 'totalCost' property
function sortNodesByTotalCost(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.totalCost - nodeB.totalCost);
}

function updateUnvisitedNeighbors(node, matrix) {
    // Gets the array of unvisited neighbours of the node within the matrix.
    const unvisitedNeighbors = getUnvisitedNeighbors(node, matrix);

    // CHAT GPT USED HERE TO WRITE CODE
    for (const neighbor of unvisitedNeighbors) {
        const tentativeDistance = node.distance + 1;
        if (tentativeDistance < neighbor.distance) {
            neighbor.distance = tentativeDistance;
            neighbor.totalCost = tentativeDistance + neighbor.heuristic;
            neighbor.previousNode = node;
        }
        console.log('Updated Neighbor:', neighbor);
    }
}
// This function above then gets then calculates the tenative distance by adding 1 from the starting node and the neighbour.
// If the the tentative distance is less than the current distance from the neighbour it will then iterate through the univisted neighbours
// whilst simultaneously updating the distance, totalCost and previousNode if there is a shorter path found through the current node.

// This function intialises an empty array and then gets the rows and cols properties from the node object.
// if the node is to above, below, on the left hand side or right it will push the node into the newley construted neighbours array.
// Overall this function only gets the unvisited neighbouring nodes and indetifies adjcent nodes.
function getUnvisitedNeighbors(node, matrix) {
    
    const neighbors = [];
    const { cols, rows } = node;

    if (rows > 0) neighbors.push(matrix[rows - 1][cols]);
    if (rows < matrix.length - 1) neighbors.push(matrix[rows + 1][cols]);
    if (cols > 0) neighbors.push(matrix[rows][cols - 1]);
    if (cols < matrix[0].length - 1) neighbors.push(matrix[rows][cols + 1]);

    //return neighbors
    return neighbors.filter((neighbor) => !neighbor.isVisited); //filters the neigbors by those of which that aren't visited/ unvisitied.
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

// CHAT GPT USED HERE TO MODIFY THE FUNCTION FROM DIJKSTRA 
function calculateHeuristic(node, finishNode) {
    // we need to use the Manhattan distance in order to calucate the heuritic(h cost)
    // between the nodes and finsihNodes
    return Math.abs(node.rows - finishNode.rows) + Math.abs(node.cols - finishNode.cols);
}

export function getShortestPathOfNodes1(finishNode) {
    const shortestPathOfNodes = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        shortestPathOfNodes.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return shortestPathOfNodes;
}
  // This method will help us find the shortest path as this preforms the calulations backwards from the finsihing node to where we started.
  // kinda like a linked list