
export function randomWalksAlgorithm(matrix, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;  // Return null for invalid inputs
    }

    initializeNodes(matrix);  // Initialize node properties

    let currentNode = startNode;
    let previousNode = null
    const visitedNodesInOrder = [currentNode];

    while (currentNode !== finishNode) {
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

function initializeNodes(matrix) {
    for (const row of matrix) {
        for (const node of row) {
            node.isVisited = false;
            node.distance = Infinity;
            node.previousNode = null;
        }
    }
}

function getAllNeighbors(node, matrix) {
    const neighbors = [];
    const { cols, rows } = node;

    if (rows > 0) neighbors.push(matrix[rows - 1][cols]);
    if (rows < matrix.length - 1) neighbors.push(matrix[rows + 1][cols]);
    if (cols > 0) neighbors.push(matrix[rows][cols - 1]);
    if (cols < matrix[0].length - 1) neighbors.push(matrix[rows][cols + 1]);

    return neighbors;
}

function updateUnvisitedNeighbors(node, matrix) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, matrix);
    for (const neighbor of unvisitedNeighbors) {
        // Check if the neighbor is already visited
        if (!neighbor.isVisited) {
            neighbor.distance = node.distance + 1;
            neighbor.previousNode = node;
        }
    }
}

function getUnvisitedNeighbors(node, matrix) {
    const neighbors = [];
    const { cols, rows } = node;

    if (rows > 0) neighbors.push(matrix[rows - 1][cols]);
    if (rows < matrix.length - 1) neighbors.push(matrix[rows + 1][cols]);
    if (cols > 0) neighbors.push(matrix[rows][cols - 1]);
    if (cols < matrix[0].length - 1) neighbors.push(matrix[rows][cols + 1]);

    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(matrix) {
    const nodes = [];
    for (const rows of matrix) {
        for (const node of rows) {
            nodes.push(node);
        }
    }
    return nodes;
}

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