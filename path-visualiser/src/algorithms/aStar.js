

export function aStarSearch(matrix, startNode, finishNode) {
    const visitedNodesInOrder = [];
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }

    // Initialize additional properties for A* algorithm
    for (const rows of matrix) {
        for (const node of rows) {
            node.distance = Infinity;
            node.heuristic = calculateHeuristic(node, finishNode);
            node.totalCost = Infinity;
            node.isVisited = false;
            node.previousNode = null;
        }
    }

    startNode.distance = 0;
    startNode.totalCost = startNode.heuristic;

    const unvisitedNodes = getAllNodes(matrix);

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

function sortNodesByTotalCost(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.totalCost - nodeB.totalCost);
}

function updateUnvisitedNeighbors(node, matrix) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, matrix);

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

function getUnvisitedNeighbors(node, matrix) {
    const neighbors = [];
    const { cols, rows } = node;

    if (rows > 0) neighbors.push(matrix[rows - 1][cols]);
    if (rows < matrix.length - 1) neighbors.push(matrix[rows + 1][cols]);
    if (cols > 0) neighbors.push(matrix[rows][cols - 1]);
    if (cols < matrix[0].length - 1) neighbors.push(matrix[rows][cols + 1]);

    return neighbors.filter((neighbor) => !neighbor.isVisited);
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

function calculateHeuristic(node, finishNode) {
    // Use Manhattan distance as the heuristic
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

