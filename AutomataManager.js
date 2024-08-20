class AutomataManager {
    constructor(startNode) {
        this.nodeId = 1;
        this.nodes = [startNode];
        this.startNode = startNode;
    }

    setStartNode(node) {
        this.startNode.start = false;
        node.start = true;
        this.startNode = node
        this.export5tuple();
    }

    toggleFinalNode(node) {
        node.final = !node.final;
        this.export5tuple();
    }

    connectNodes(startNode, targetNode) { // Connect nodes without a symbol or below with a symbol
        startNode.connect(targetNode, prompt("Symbol: "));
        this.export5tuple();
    }

    connectNodesSymbol(startNode, targetNode, symbol) {
        startNode.connect(targetNode, symbol);
        this.export5tuple();
    }

    addNode(node) {
        this.nodeId += 1;
        this.nodes.push(node);
        this.export5tuple();
    }

    export5tuple() { // Export the automaton as a 5 tuple
        let alphabet = [];
        let allSymbols = "";
        let allStates = "";
        let transitionRelation = "";
        let allFinals = "";
        for (let node of this.nodes) {

            if (allStates.length == 0) {
                allStates += node.label;
            } else {
                allStates += ", " + node.label;
            }
            
            for (let connection of node.connections) {
                if (!alphabet.includes(connection.symbol)) {
                    alphabet.push(connection.symbol);
                    if (alphabet.length == 1) {
                        allSymbols += connection.symbol;
                    } else {
                        allSymbols += ", " + connection.symbol;
                    }
                }

                if (transitionRelation.length == 0) {
                    transitionRelation += "(" + node.label + ", " + connection.symbol + ", " + connection.targetNode.label + ")";
                } else {
                    transitionRelation += ", (" + node.label + ", " + connection.symbol + ", " + connection.targetNode.label + ")";
                }
            }

            if (node.final) {
                if (allFinals.length == 0) {
                    allFinals += node.label;
                } else {
                    allFinals += ", " + node.label;
                }
            }
        }
        let result = "({" + allSymbols + "}, {" + allStates + "}, {" + transitionRelation + "}, " + this.startNode.label + ", {" + allFinals + "})";
        document.getElementById("automata5tuple").innerHTML = result;
    }
}