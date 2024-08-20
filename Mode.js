class Mode { // Basic Mode class, not used only extended upon by the proper modes
    constructor(canvas, name) {
        this.canvas = canvas
        this.automata = this.canvas.automata
        this.name = name;
    }

    onStart() {
        document.getElementById("selectedMode").innerText = this.name;
    }

    onEnd() {

    }

    onNodeEnter(node) {

    }

    onNodeExit(node) {

    }

    onMouseMove() {

    }

    onMouseUp() {

    }

    onMouseDown() {

    }

    onClick() {

    }

    switchMode(mode) { // Runs whenever user swiches modes
        if (mode.name == this.name) {
            return this;
        }
        this.onEnd();
        for (let node of this.automata.nodes) {
            node.colour = "white";
        }


        if (this.canvas.nodeOnMouse != null) {
            mode.onNodeEnter(this.canvas.nodeOnMouse);
        }
        mode.onStart();

        return mode;
    }

}