class CanvasManager {
    constructor() {
        this.canvas = document.getElementById("mainCanvas");
        this.ctx = this.canvas.getContext("2d");

        
        this.ctx.font = "20px arial";
        this.ctx.textAlign = "center";

        this.automata = new AutomataManager(new Node(this.ctx, this.canvas.width / 7, this.canvas.height / 2, "q0", true, false));
        
        this.mouseX = -100;
        this.mouseY = -100;

        this.mode = new Mode(this, "init");
        this.mode = this.mode.switchMode(new PlaceMode(this));
        
        this.setupListeners();

        this.nodeOnMouse = null;
        
    }

    refreshDisplay() { // Wipe canvas and redraw automaton
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.height);
        for (let node of this.automata.nodes) {
            node.draw();
        }
        //console.log("refresh");
    }

    setupListeners() { // All of the event listeners for the canvas, each run their respective method
        this.canvas.addEventListener('mousemove', function(event) {
            this.onMouseMove(event);
            this.mode.onMouseMove();
        }.bind(this))
        
        this.canvas.addEventListener('click', function(event) {
            this.onClick();
        }.bind(this))

        this.canvas.addEventListener('mousedown', function(event) {
            this.mode.onMouseDown();
        }.bind(this))

        this.canvas.addEventListener('mouseup', function(event) {
            this.mode.onMouseUp();
        }.bind(this))

        window.addEventListener('keyup', function(event) {
            if (event.key == "1") {
                this.mode = this.mode.switchMode(new PlaceMode(this));
            }
            if (event.key == "2") {
                this.mode = this.mode.switchMode(new ConnectMode(this));
            }
            else if (event.key == "3") {
                this.mode = this.mode.switchMode(new SelectMode(this));
            }
            else if (event.key == "0") {
                this.automata = new AutomataManager(new Node(this.ctx, this.canvas.width / 7, this.canvas.height / 2, "q0", true, false));
                this.mode = this.mode.switchMode(new PlaceMode(this));
            }
            // else if (event.key == "s" || event.key == "S") {
            //     console.log(JSON.stringify(this.automata));
            // }
        }.bind(this))

        document.getElementById("importAutomataButton").addEventListener("click", this.importAutomata.bind(this));
    }
    
    importAutomata() { // Import from text 5 tuple box
        let automata = document.getElementById("importAutomata").value;
        //document.getElementById("importAutomata").value = "";
        //automata = automata.substring(2);

        // Split the big string into each section

        let chunks = automata.split("}");
        console.log(chunks);


        // Create nodes using the 2nd set in the tuple

        let statesString = chunks[1].substring(3);
        let stateLables = statesString.split(", "); // list of labels for each node

        let nodes = [];

        for (let label of stateLables) {
            nodes.push(new Node(this.ctx, this.canvas.width / 2, this.canvas.height / 2, label));
        }

        // Start node

        let startNodeLabel = chunks[3].substring(2).split(", {")[0];
        this.automata.nodes = nodes;
        this.automata.startNode = this.automata.nodes[stateLables.indexOf(startNodeLabel)];
        this.automata.nodes[stateLables.indexOf(startNodeLabel)].start = true;

        // Transistion relation

        let tr = chunks[2].substring(4); // Splits brackets and spaces
        tr = tr.split(")");

        for (let transition of tr) { // Create connections
            let arr;
            if (transition === tr[0]) { 
                arr = transition.split(", "); // First substring done earlier
            } else {
                arr = transition.substring(3).split(", ");
            }
            if (arr.length != 3) {
                break;
            }
            console.log(arr);
            let startNode = nodes[stateLables.indexOf(arr[0])];
            let targetNode = nodes[stateLables.indexOf(arr[2])];

            this.automata.connectNodesSymbol(startNode, targetNode, arr[1]); // Connects first item of tr with third item using symbol second item eg (q0, a, q1)
            
        }

        // Set final states

        let finals = chunks[3].substring(chunks[3].indexOf("{") + 1);
        console.log(finals);

        finals = finals.split(", ");

        for (let final of finals) {
            if (final == "") {
                break;
            }
            this.automata.nodes[stateLables.indexOf(final)].final = true;
        }

        // Update page

        this.refreshDisplay();
        this.automata.nodeId = this.automata.nodes.length;
        this.automata.export5tuple();

        document.getElementById("importResult").classList.remove("hidden");

        this.mode = this.mode.switchMode(new PlaceMode(this));
        this.mode = this.mode.switchMode(new SelectMode(this));

        
       // this.refreshDisplay()

        // let alphabet = [];

        // while (automata[0] != "" && automata[0] != "}") {
        //     alphabet.push(automata[0]);
        //     if (automata[1] == ",") {
        //         automata = automata.substring(3);
        //     } else {
        //         automata = automata.substring(1);
        //     }
        // }

        
        // automata = automata.substring(4);

        // console.log(alphabet, automata);

        // let states = [];

        // while (automata[0] != "" && automata[0] != "}") {
        //     let endIndexComma = automata.indexOf(",");
            
        //     let state = automata.substring(0, endIndex);
        //     automata = automata.substring(endIndex);

        // }

    }

    getNodeOnMouse() { // Returns the node the mouse is on
        let found = null;
        for (let node of this.automata.nodes) {
            if (node.isInside(this.mouseX, this.mouseY, this.ctx)) {
                if (node != null) {
                    found = node;
                }
            };
        }
        return found;
    }

    onClick() {
        this.mode.onClick();
    }

    onMouseMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = event.clientX - rect.left;
        this.mouseY = event.clientY - rect.top;

        this.checkMouseCollision();

    }

    checkMouseCollision() { // Runs the current mode's collision methods when a node is entered or exited 
        let newNode = this.getNodeOnMouse();
        if (this.nodeOnMouse != newNode) {
            if (this.nodeOnMouse) {
                this.mode.onNodeExit(this.nodeOnMouse);
            }
            if(newNode) {
                this.mode.onNodeEnter(newNode);
            }
            this.nodeOnMouse = newNode;
        }
    }
    

}