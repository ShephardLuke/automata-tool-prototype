# Automata Tool (Prototype)
### https://automata-tool-prototype.shephardluke.co.uk
A proof of concept to showcase a tool for creating and sharing [finite-state automata (FSA)](https://en.wikipedia.org/wiki/Finite-state_machine). This is a prototype I made in about a day, so it is clunky and patched together but it does the main things I wanted to test out.

# How to create an automaton
The canvas is the main area, where you can create an automaton. The canvas will have q0 already there, this is the starting state as showing with it's leading arrow.

There are 3 modes when creating, they are place, connect and select. 

**To switch modes press 1, 2, 3 for each mode respectively.** The info panel at the bottom tells you which mode you are in.

## Place mode - for placing new states
When you move the mouse around the canvas you will have a preview of the state you are going to place. Clicking will place that state in that position.

## Connect mode - for adding a connection between 2 states
Click the state you would like the connection to start from. It will turn dark grey. If you change your mind click that same state again and it will be unselected.

Next click the state you would like to connect it to. An alert will pop up asking for the symbol. Type the symbol and press okay and the connection will be drawn between the states. 

## Select mode - for changing placed states
Click any placed state to select it.

This state can be dragged to be moved somewhere else on the canvas.

The info panel below the canvas will show all of the info on the selected state, telling you if it is a start or final state and stating all of its connections with other states.

There are 2 buttons below the info panel, make start and toggle final. Press these to change if the state is the starting state or to change if it is a final state or not. There can only be 1 start state so the previous starting state will lose its starting status. There can be any amount of final states, and the start state can be final.

# Sharing an automaton
## Exporting an automaton
The export section will show how your automaton looks like as a 5 tuple in the format A = (Σ, Q, δ, q0, F). There are other formats, this is how I was taught and it can be made into other formats by swapping the sets elements around.

This 5 tuple can be saved locally or shared or imported and it will hold the data of the automaton.

## Importing an automaton
To import an automaton you can paste its 5 tuple into the box and press import.

For automaton not made in this program make sure that it is formatted correctly. It has to be in the form  A = (Σ, Q, δ, q0, F) and there has to be one space after every comma or it will not import.

If the import is successful the info box will let you know. The program will have put all the imported states in the middle of the canvas, you then can use the place mode to drag them out and arrange them in any way you please. You can then use the program as normal to edit the automaton.

# Notes
I did this for fun and it was fun in the end. I made this quickly just to get my idea down and see if it was worth pursuing, and I liked how it turned out so I would like to make a proper fully fleshed out version eventually. Since I made it quickly however there were some drawbacks due to some things taking too long for a prototype.
## Drawbacks
One drawback is the connections kind of messy when you start adding multiple connections to one state and you cannot connect a state to itself. It took a lot of time to figure out how to make those lines draw perfectly between the circles and I did not want to try figure out at that time how to draw curved lines for multiple connections between states or a state to itself.

I used regular html, css and js for this, which is fine but it means I had to create all of the canvas work without any help from libraries or anything. On a proper version I will probably use some libraries to handle most of the heavy diagram stuff for me so I can stick to workings of it.




