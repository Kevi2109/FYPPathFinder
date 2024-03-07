

export function plantGrowthAlgorithm(matrix, startNode, finishNode) {
    // Ensure startNode and finishNode are valid and not the same
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }

    // Initialize all nodes with default values
    initialize(matrix, startNode, finishNode);

    // Start the growth from the startNode
    let currentNode = startNode;
    currentNode.distance = 0; // Set the distance of startNode to 0

    const visitedNodesInOrder = [];

    // used to be const but changed
    let differentBranches = [currentNode];
    // used to be const but const
    let isfinish = false;
    
    while (differentBranches.length > 0 && !isfinish ) {
       for (var i = 0; i < differentBranches.length; i++) {
        currentNode = differentBranches[i];
        currentNode.isVisited = true;

        // HANDLE WALLS
        if (currentNode.isWall) continue;

        console.log(currentNode);
        visitedNodesInOrder.push(currentNode);
        console.log("next loop");

        const lightIntensity = calculateLightIntensity(matrix, currentNode, finishNode);
        const neighbors = getUnvisitedNeighbors(currentNode, matrix);

        // Filter out walls
        const unvisitedNeighbors = neighbors.filter(neighbor => !neighbor.isWall);

        if (unvisitedNeighbors.length > 0) {
            const sortedNeighbors = unvisitedNeighbors.sort((a, b) => b.lightIntensity - a.lightIntensity);
            const nextNode = sortedNeighbors[0];
            nextNode.distance = currentNode.distance + 1; // Increment distance

            if (Math.random() < 0.1) { // 10% chance of branching
                const branchNode = sortedNeighbors[1]; // 2nd highest light intensity
                if (branchNode && !branchNode.isVisited) {
                //    plantGrowth(branchNode, matrix);
                    differentBranches.push(branchNode);
                    branchNode.distance = currentNode.distance + 1; // Increment distance Sfor branch node

                    console.log('Branched Node:', branchNode); //added
                }
            }
            currentNode = nextNode;
        } else {
            // In the else if the are no more avalible paths/ cells then mark the current node branch 
            // as bad.
            console.log("badbranch2");
            // No unvisited neighbors, find a path around walls or end the algorithm
            // currentNode = findAlternativePath(matrix, currentNode, finishNode) || currentNode;
           // const alternativePathNode = findAlternativePath(matrix, currentNode, finishNode);
           // if (!alternativePathNode) {
           //     console.log('Algorithm terminated due to impossibility.');
           //     return visitedNodesInOrder; // If there's no alternative path, return the visitedNodesInOrder
           // }
            // NEWLEY ADDED
            currentNode.isBadBranch = true;
        //    currentNode = null//alternativePathNode;

        }
        // NEWLEY ADDED
      // differentBranches = differentBranches.filter(branch => !branch.isBadBranch);
       // HANDLE IMPOSSIBLE LATER
        if (currentNode.distance === Infinity) {
            console.log('Algorithm terminated due to impossibility.');
            return visitedNodesInOrder; // If distance = Infinity, return the visitedNodesInOrder
        }

        // ANIMATE LATER
        if (currentNode === finishNode) {
            console.log('Algorithm completed successfully.');
            return visitedNodesInOrder; // If currentNode is the finishNode, return the visitedNodesInOrder
        }
        if (currentNode === finishNode){
            isfinish = true;
            console.log('finsih node is true');
        }
        differentBranches[i] = currentNode;
       }
       // AFTER THIS LOOP ENDS REMOVE THE BAD BRANCHES AND KEEP THE REST
       differentBranches = differentBranches.filter(branch => !branch.isBadBranch);
    }
    console.log("complete");
    return visitedNodesInOrder;
}

function initialize(matrix, startNode, finishNode) {
    for (const row of matrix) {
        for (const node of row) {
            node.isVisited = false;
            node.lightIntensity = calculateLightIntensity(matrix, node, finishNode); // Calculate light intensity for each node
            node.distance = Infinity; // Initialize distance to Infinity
        }
    }
}

function calculateLightIntensity(matrix, node, finishNode) {
    if (!node || !finishNode) {
        console.error('Node or finishNode is undefined:', matrix, node, finishNode);
        return;
    }

    const { rows, cols } = finishNode; // Use finishNode.rows and finishNode.cols
    const distance = Math.sqrt(
        Math.pow(rows - node.rows, 2) +
        Math.pow(cols - node.cols, 2)
    );

    return 1 / (distance + 1);
}

//function plantGrowth(node, matrix) {
//    node.isVisited = true;
//}

function getUnvisitedNeighbors(node, matrix) {
    const neighbors = [];
    const { cols, rows } = node;

    if (rows > 0) neighbors.push(matrix[rows - 1][cols]);
    if (rows < matrix.length - 1) neighbors.push(matrix[rows + 1][cols]);
    if (cols > 0) neighbors.push(matrix[rows][cols - 1]);
    if (cols < matrix[0].length - 1) neighbors.push(matrix[rows][cols + 1]);

    return neighbors.filter(neighbor => !neighbor.isVisited);
}

//function findAlternativePath(matrix, currentNode, finishNode) {
    // Implement logic to navigate around walls or find an alternative path
    // This is a placeholder function and needs to be implemented based on the specifics of your matrix and nodes
//    return null;

//   const stack = [currentNode];  // Use a stack to backtrack
//   const visitedNodes = [];

//   while (stack.length > 0) {
//       const nodeToCheck = stack.pop();

       // Check if the node provides a valid path
//       if (nodeToCheck.distance < Infinity) {
//           // Found a valid path, break out of the loop
//           currentNode = nodeToCheck;
//           break;
//       }

       // No valid path from this node, backtrack to the previous nodes
//       visitedNodes.push(nodeToCheck);
//       const neighbors = getUnvisitedNeighbors(nodeToCheck, matrix);
//       const unvisitedNeighbors = neighbors.filter(neighbor => !visitedNodes.includes(neighbor));

//       stack.push(...unvisitedNeighbors);
//   }

//   return currentNode;
//}


export function getShortestPathOfNodes3(finishNode) {
    const shortestPathOfNodes = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        shortestPathOfNodes.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return shortestPathOfNodes;
}