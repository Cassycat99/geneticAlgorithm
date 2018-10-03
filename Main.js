"use strict";
//Cassy Smithies
//Project 3 Phase 5
//Displays huegrid using chromosome values
//Cell size, intitation method, and display method, and stroke are determinded by the chromosome
//max dev, opacity, and are done on screen
//huegrids sit in an array called huGd
//Breed generation creates a new generation of chromosomes to control the huegrids
//the new generation is mutated children who were bred from parents using a crossover method

let cnv; //canvas
let mxDvSlider;
let mxDvLabel;
let resetBut;
let selectBut;
let transSlider;
let transLabel;
let checkbox;
let hG; //huegrid
let huGd;
let gen;


function setup() {

    //everything below is used to set up the canvas and UI controls
    //canvas set up
    cnv = createCanvas(960, 1000);
    cnv.position(0, 0);
    colorMode(HSB);
    background(100);

    huGd = []; //declares array for huegrids

    //slider setup for max div
    mxDvSlider = createSlider(0, 50, 2, 0);
    mxDvSlider.position(20, 20);
    mxDvLabel = createDiv("Max Div: ");
    mxDvLabel.position(mxDvSlider.x, mxDvSlider.y + 25);

    //slider set up for opacity
    transSlider = createSlider(0.0, 1.0, 1.0, 0);
    transSlider.position(cnv.width / 2, 20);
    transLabel = createDiv("Opacity: ");
    transLabel.position(transSlider.x, transSlider.y + 25)

    //set up for reset button
    resetBut = createButton("Reset");
    resetBut.position(cnv.width - 48, 20);
    resetBut.mousePressed(reset);
    //reset();

    //set up for select button
    selectBut = createButton("Select");
    selectBut.position(cnv.width - 118, 20);
    selectBut.mousePressed(selectGrid);

    //set up for breed generation button
    selectBut = createButton("Breed Generation");
    selectBut.position(cnv.width - 258, 20);
    selectBut.mousePressed(breedGen);

    //set up for crossover button
    selectBut = createButton("Crossover");
    selectBut.position(cnv.width - 658, 20);
    selectBut.mousePressed(crossover);

    //set up for mutate button
    selectBut = createButton("Mutate");
    selectBut.position(cnv.width - 758, 20);
    selectBut.mousePressed(mutate);

    gen = new Genetics() //creates 1 chrom to later be randomized
    huGd[0] = new HueGrid(gen.randChrom(), 20, 80, 300, 200); //creates new huegrid
    huGd[1] = new HueGrid(gen.randChrom(), 340, 80, 300, 200);
    huGd[2] = new HueGrid(gen.randChrom(), 660, 80, 300, 200);
    huGd[3] = new HueGrid(gen.randChrom(), 20, 300, 300, 200);
    huGd[4] = new HueGrid(gen.randChrom(), 340, 300, 300, 200);
    huGd[5] = new HueGrid(gen.randChrom(), 660, 300, 300, 200);
    huGd[6] = new HueGrid(gen.randChrom(), 20, 520, 300, 200);
    huGd[7] = new HueGrid(gen.randChrom(), 340, 520, 300, 200);
    huGd[8] = new HueGrid(gen.randChrom(), 660, 520, 300, 200);

    for (let i = 0; i < huGd.length; i++) {
        gen.insertNew(huGd[i].chrom, 0, i);
    }
}

function draw() {

    mxDvLabel.html("Max Dev: " + Math.round(mxDvSlider.value()));

    transLabel.html("Opacity: " + Math.round(transSlider.value()));

    for (let i = 0; i < huGd.length; i++) {
        huGd[i].display(); ///displays huegrid
    }
}

function reset() {
    for (let i = 0; i < huGd.length; i++) {
        huGd[i].reset(gen.randChrom());
    }
}

function crossover() {
    huGd[2].reset(gen.crossover((huGd[0].chrom), (huGd[1].chrom)));
    //GRID 1 = PARENT 1, GRID 2 = PARENT 2, GRID 3 = CHILD
    //reading left to right
}

function mutate() {
    huGd[0].reset(gen.mutate(huGd[0].chrom));
}

function selectGrid() {
    huGd[0].reset(gen.select());
    gen.insertNew(huGd[0].chrom, 0, 0);
}

function breedGen() {
    let nextGen = [];

    let eliteChrom = gen.elitism();
    nextGen.push(eliteChrom);

    //pushes chromosomes in
    for (let i = 0; i < (huGd.length - 1); i++) {
        //one less loop because eliteChrom is already pushed into the array
        nextGen.push(gen.breed1()); //breeds new generation
    }

    for (let i = 0; i < huGd.length; i++) {
        huGd[i].reset(nextGen[i]); //resets huegrids to be of new generation
        gen.insertNew(huGd[i].chrom, 0, i);
    }


}

function keyTyped() {


    if (key == '+') { //adds to fitness score
        for (let i = 0; i < huGd.length; i++) {
            //checks every grid if mouse is within
            if (huGd[i].mouseOver()) {
                gen.bumpFit(i, 1); //amount of change = +1

            }
        }
    }

    if (key == '-') { //subtracts from fitness
        for (let i = 0; i < huGd.length; i++) {
            if (huGd[i].mouseOver()) {
                gen.bumpFit(i, -1); //amount of change = -1
            }
        }
    }


}
