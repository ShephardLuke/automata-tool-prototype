class Node {
    constructor(ctx, x, y, label, start=false, final=false) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.label = label;
        this.start = start;
        this.final = final;
        this.colour = "white";
        this.connections = [];
    }

    connect(targetNode, symbol) {
        this.connections.push(new Connection(targetNode, symbol));  
    }

    path() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 40, 0, 2 * Math.PI);
    }
    
    draw(fill=false) { // A lot of canvas drawing

        this.path()
        // this.ctx.fillStyle = "grey";
        // this.ctx.fill();
        // this.ctx.fillStyle = "black";

        this.ctx.fillStyle = this.colour;
        this.ctx.fill();
        this.ctx.fillStyle = "black";
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();

        this.ctx.fillText(this.label, this.x, this.y + parseInt(this.ctx.font) / 4);

        if (this.start) { // Arrow in front of node
            this.ctx.beginPath();
            this.ctx.moveTo(this.x - 40, this.y);
            this.ctx.lineTo(this.x - 100, this.y);
            this.ctx.stroke(); 

            let theta = 3.14159;  // 180 deg in rad
            let ARROW_ANGLE = 0.785398; // 45 deg in rad

            this.ctx.beginPath();
            this.ctx.moveTo(this.x - 40, this.y);
            this.ctx.lineTo(this.x - 40 + 20 * Math.cos(theta + ARROW_ANGLE), this.y + 20 * Math.sin(theta + ARROW_ANGLE));
            this.ctx.stroke();
    
            
            this.ctx.beginPath();
            this.ctx.moveTo(this.x - 40, this.y);
            this.ctx.lineTo(this.x - 40 + 20 * Math.cos(theta - ARROW_ANGLE), this.y + 20 * Math.sin(theta - ARROW_ANGLE));
            this.ctx.stroke();

        }

        if (this.final) { // Inner circle
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, 30, 0, 2 * Math.PI);
            this.ctx.stroke();
            
        }

        for (let connection of this.connections) {
            this.drawConnection(connection.targetNode, connection.symbol);
        }

    }
    
    drawConnection(targetNode, symbol) { // Arrow between 2 nodes
        //this.automata.connect(this, targetNode);
        this.ctx.beginPath();

        let midX = this.x + (targetNode.x - this.x) * 0.50;
        let midY = this.y + (targetNode.y - this.y) * 0.50;

        // Mathsy stuff to draw line between 2 circles and not inside them
        
        let closestPointSelected = this.getClosestPoint(midX, midY);   
        let closestPointTarget = targetNode.getClosestPoint(midX, midY);
        this.ctx.moveTo(closestPointSelected[0], closestPointSelected[1]);
        this.ctx.lineTo(closestPointTarget[0], closestPointTarget[1]);
        this.ctx.stroke();

        let dy = closestPointSelected[1] - closestPointTarget[1]; // wtf is this maths, it works somehow
        let dx = closestPointSelected[0] - closestPointTarget[0];
        let theta = Math.atan2(dy, dx);
        // theta *= 180 / Math.PI; // in deg (not needed)

        let ARROW_ANGLE = 0.785398; // 45 deg in rad

        this.ctx.beginPath();
        this.ctx.moveTo(closestPointTarget[0], closestPointTarget[1]);
        this.ctx.lineTo(closestPointTarget[0] + 10 * Math.cos(theta + ARROW_ANGLE), closestPointTarget[1] + 10 * Math.sin(theta + ARROW_ANGLE));
        this.ctx.stroke();

        
        this.ctx.beginPath();
        this.ctx.moveTo(closestPointTarget[0], closestPointTarget[1]);
        this.ctx.lineTo(closestPointTarget[0] + 10 * Math.cos(theta - ARROW_ANGLE), closestPointTarget[1] + 10 * Math.sin(theta - ARROW_ANGLE));
        this.ctx.stroke();

        this.ctx.fillText(symbol, midX, midY);
    }    

    getClosestPoint(x, y) { // no clue how it works but it does the job [[BEWARE 0/0, rare but can cause errors if in wrong place]]
        let vX = x - this.x;
        let vY = y - this.y;
        let magV = Math.sqrt(vX*vX + vY*vY);
        let aX = this.x + vX / magV * 40;
        let aY = this.y + vY / magV * 40;

        return [aX, aY];
    }

    isInside(x, y) { // Collision detection
        this.path();
        return this.ctx.isPointInPath(x, y);
    }

    getInfo() { // Info panel
        let info = "";
        info += "Start state: " + this.start;
        info += "\nFinal state: " + this.final;
        info += "\nConnections: ";
        for (let connection of this.connections) {
            info += connection.targetNode.label + " (" + connection.symbol + "), ";
        }
        return info;
    }


}