class SelectMode extends Mode {

    constructor(canvas) {
        super(canvas, "Select");
        this.selectedNode = null;

        this.nodeStart = this.makeNodeStart.bind(this);
        this.nodeFinal = this.makeNodeFinal.bind(this)

        this.moving = false;
    }

    onStart() {
        super.onStart();
        document.getElementById("nodeInfo").classList.remove("hidden");
        document.getElementById("nodeInfo").innerText = "Select a state to see its info, or drag nodes to move them.";

        document.getElementById("makeNodeStart").addEventListener("click", this.nodeStart);
        document.getElementById("makeNodeFinal").addEventListener("click", this.nodeFinal);
    }


    onEnd() {
        document.getElementById("nodeInfo").classList.add("hidden");
        document.getElementById("makeNodeStart").classList.add("hidden");
        document.getElementById("makeNodeFinal").classList.add("hidden");

        document.getElementById("makeNodeStart").removeEventListener("click", this.nodeStart);
        document.getElementById("makeNodeFinal").removeEventListener("click", this.nodeFinal);
    }

    onMouseDown() {
        if (this.canvas.nodeOnMouse == this.selectedNode) {
            this.moving = true;
        }
    }

    onMouseUp() {
        if (this.moving) {
            this.moving = false;
        }
    }
    
    onClick() { // Show final / start buttons where neccessary
        this.selectNode(this.canvas.nodeOnMouse);
        if (this.selectedNode) {
            if (!this.selectedNode.start) {
                document.getElementById("makeNodeStart").classList.remove("hidden");
            }
            document.getElementById("makeNodeFinal").classList.remove("hidden");
        } else {
            document.getElementById("makeNodeStart").classList.add("hidden");
            document.getElementById("makeNodeFinal").classList.add("hidden");
        }
    }

    onMouseMove() {
        if (this.moving && this.selectedNode) {
            this.selectedNode.x = this.canvas.mouseX;
            this.selectedNode.y = this.canvas.mouseY;

            this.canvas.refreshDisplay();
        }
    }
    
    makeNodeStart() {
        this.automata.setStartNode(this.selectedNode);
        document.getElementById("makeNodeStart").classList.add("hidden");
        this.refreshNodeInfo();
        this.canvas.refreshDisplay();
    }

    makeNodeFinal() {
        this.automata.toggleFinalNode(this.selectedNode);
        this.refreshNodeInfo();
        this.canvas.refreshDisplay();
    }

    selectNode(node) { // Selecting a node to show its properties
        if (this.selectedNode == node) {
            return;
        }
        if (this.selectedNode) {
            this.selectedNode.colour = "white";
        }        

        this.selectedNode = node;
        if (this.selectedNode) {
            this.refreshNodeInfo();
            this.selectedNode.colour = "rgb(120, 120, 120)";
        } else {
            document.getElementById("nodeInfo").innerText = "Select a state to see its info, or drag nodes to move them.";
        }
        this.canvas.refreshDisplay()
    }

    refreshNodeInfo() { // Info panel
        document.getElementById("nodeInfo").innerText = "Selected state: " + this.selectedNode.label + "\n\nProperties:\n" + this.selectedNode.getInfo();
    }

    onNodeEnter(node) {
        if (node != this.selectedNode) {
            node.colour = "rgb(180, 180, 180)";
            this.canvas.refreshDisplay();
        }
    }

    onNodeExit(node) {
        if (node != this.selectedNode) {
            node.colour = "white";
            this.canvas.refreshDisplay();
        }
    }


}