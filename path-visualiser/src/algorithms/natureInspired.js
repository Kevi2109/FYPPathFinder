// The Code here was inspired from Dijksra and was developed with aid of the youtube video "https://www.youtube.com/watch?v=msttfIHHkak&t=1229s&ab_channel=Cl%C3%A9mentMihailescu"
// and CHAT GPT used to help modify the Dijsktra code into perfoming the plant algorithm mixed with some of my written code. To help this properly run.

export function plantGrowthAlgorithm(matrix, startNode, finishNode) {
    // Ensure startNode and finishNode are valid and not the same
    if (!startNode || !finishNode || startNode === finishNode) {
        return false; // We return false for any invalid inputs.
    }

    // Initialise node properties
    initialiseNodesWithinMatrix(matrix, startNode, finishNode);

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
        // light Intensity values are given to the wall as well to simulate the walls acting as a window.
        // This creates further realism for the algorithm as it grows against it.
        const unvisitedNeighbors = neighbors.filter(neighbor => !neighbor.isWall);

        // CHAT GPT USED HERE TO MODIFY THE FUNCTION FROM DIJKSTRA
        // We first check if there are any unvisited neighbours of the current node
        // After that we then sort out the array based of its lightIntensity values and place it in largest to smallest order which means that within the index, the neighbour
        // with the highest light intnensity will therefore be 0 after the sorting has commenced and then is selected.
        // Finally we update the distance of the next node, by adding 1 to the current distance. This shows that the next node is a one step away.
        if (unvisitedNeighbors.length > 0) {
            const sortedNeighbors = unvisitedNeighbors.sort((a, b) => b.lightIntensity - a.lightIntensity);
            const nextNode = sortedNeighbors[0];
            nextNode.distance = currentNode.distance + 1; // Increment distance

            // CHAT GPT USED HERE TO MODIFY THE FUNCTION FROM DIJKSTRA
            if (Math.random() < 0.1) { // 10% chance of branching
                const branchNode = sortedNeighbors[1]; // 2nd highest light intensity
                if (branchNode && !branchNode.isVisited) {
                //    plantGrowth(branchNode, matrix);
                // if the branchNode has not been visited yet it adds it to the differentBranches array
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
            // Logs the nodes visited for the alogritm
            // Creates a new set wit visitedNodes in order and then returns it
            var set_nowheretogo = new Set (visitedNodesInOrder);
            console.log(set_nowheretogo);
            return visitedNodesInOrder; // If distance = Infinity, return the visitedNodesInOrder
        }

        // ANIMATE LATER
        if (currentNode === finishNode) {
            console.log('Algorithm completed successfully.');
           // Logs the nodes visited for the alogritm
           // Creates a new set wit visitedNodes in order and then returns it
            var set = new Set (visitedNodesInOrder);
            console.log(set.size+1);
            return visitedNodesInOrder; // If currentNode is the finishNode, return the visitedNodesInOrder
        }
        if (currentNode === finishNode){
            isfinish = true;
            console.log('finsih node is true');
        }
        differentBranches[i] = currentNode;
       }
       // AFTER THIS LOOP ENDS REMOVE THE BAD BRANCHES AND KEEP THE REST within the array
       // Reason done is to continue the search with the 'main' branch and all the bad branches are branches that have found a dead end.
       // Therefore this algorithms other branches will still be able to itterate and find the end goal
       differentBranches = differentBranches.filter(branch => !branch.isBadBranch); 
    }
    console.log("complete");

    // Logs the nodes visited for the alogritm
    var set_complete = new Set (visitedNodesInOrder);
    console.log(set_complete); 

    return visitedNodesInOrder;
}

// CHAT GPT USED HERE TO INITALISE THE PROPERTIES BEFORE THE SEARCH
function initialiseNodesWithinMatrix(matrix, startNode, finishNode) {
    for (const row of matrix) {
        for (const node of row) {
            node.isVisited = false;
            node.lightIntensity = calculateLightIntensity(matrix, node, finishNode); // Calculate light intensity for each node
            node.distance = Infinity; // Initialize distance to Infinity
        }
    }
}
// CHAT GPT USED HERE TO CALCULATE LIGHT INTENSITY
// The function here calculates the light intensity between the node and finish node 
// through the calulation of their distance from each other.
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
    return neighbors.filter(neighbor => !neighbor.isVisited); //filters the neigbors by those of which that aren't visited/ unvisitied.
}

// Function used to animaite the shortest path within the PVisualiser.
export function getShortestPathOfNodes3(finishNode) {
    const shortestPathOfNodes = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        shortestPathOfNodes.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    // console.log(shortestPathOfNodes);
    return shortestPathOfNodes;
}
  // This method will help us find the shortest path as this preforms the calulations backwards from the finsihing node to where we started.
  // kinda like a linked list