class PlaceMode extends Mode {

    constructor(canvas) {
        super(canvas, "Place");
        this.canPlace = true;
    }

    onStart() {
        super.onStart();
        this.onMouseMove();
    }
    
    onEnd() {
        if (this.canPlace) {
            this.canvas.refreshDisplay();
        }
    }

    onClick() {
        if (!this.canvas.nodeOnMouse) { // Placing node
            this.automata.addNode(new Node(this.canvas.ctx, this.canvas.mouseX, this.canvas.mouseY, "q" + this.automata.nodeId));
            this.canvas.refreshDisplay();
            this.canvas.checkMouseCollision();
        }
    }

    onNodeEnter(node) {
        this.canPlace = false;
    }

    onNodeExit(node) {
        this.canPlace = true;
    }

    onMouseMove() {

        this.canvas.refreshDisplay();

        if (!this.canPlace) {
            return;
        }

        // Draw preview node
        
        this.canvas.ctx.beginPath();
        this.canvas.ctx.arc(this.canvas.mouseX, this.canvas.mouseY, 40, 0, 2 * Math.PI);

        this.canvas.ctx.fillStyle = "rgb(225, 225, 225)";
        this.canvas.ctx.fill();
        this.canvas.ctx.fillStyle = "rgb(180, 180, 180)";
        this.canvas.ctx.strokeStyle = "rgb(180, 180, 180)";
    
        this.canvas.ctx.stroke();

        this.canvas.ctx.fillText("q" + this.automata.nodeId, this.canvas.mouseX, this.canvas.mouseY + parseInt(this.canvas.ctx.font) / 4);

    }
}