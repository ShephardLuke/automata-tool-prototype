class ConnectMode extends Mode {

    constructor(canvas) {
        super(canvas, "Connect");
        this.startNode = null;
    }
    
    onStart() {
        super.onStart();
        document.getElementById("nodeInfo").classList.remove("hidden");
        document.getElementById("nodeInfo").innerText = "Choose a state that you would like to add a connection to.";
    }

    onEnd() {
        document.getElementById("nodeInfo").classList.add("hidden");
    }

    onClick() {
        let targetNode = this.canvas.nodeOnMouse;
        if (this.startNode) {
            if (targetNode) {
                if (targetNode != this.startNode) {
                    this.automata.connectNodes(this.startNode, targetNode);
                }
                this.selectStartNode(null);
            }
        } else {
            this.selectStartNode(targetNode);
        }
        
    }

    selectStartNode(node) { // The first node that is clicked when connecting 2 nodes
        if (this.startNode == node) {
            return;
        }
        if (this.startNode) {
            this.startNode.colour = "white";
        }        

        this.startNode = node;
        if (this.startNode) {
            document.getElementById("nodeInfo").innerText = "Choose a state for " + node.label + " to connect with.";
            this.startNode.colour = "rgb(120, 120, 120)";
        } else {
            document.getElementById("nodeInfo").innerText = "Choose a state that you would like to add a connection to.";
        }

        this.canvas.refreshDisplay();

    }

    
    onNodeEnter(node) {
        if (node != this.startNode) {
            node.colour = "rgb(180, 180, 180)";
            this.canvas.refreshDisplay();
        }
    }

    onNodeExit(node) {
        if (node != this.startNode) {
            node.colour = "white";
            this.canvas.refreshDisplay();
        }
    }

}