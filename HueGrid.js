//Cassy Smithies
//HueGrid
//Project 3 Phase 3
//class that creates huegrid and controls its behavior


class HueGrid {
    constructor(chrom, x, y, HueWidth, HueHeight) {
        this.hueVal; // 2D array of hue values
        this.cellSize = 5; //cellsize set by slider
        this.maxDev = 2; //amount of twinkle set by slider
        this.strokeOn = false;
        this.chrom;
        this.initmeth;
        this.altermeth;
        this.strokeSet;

        this.y = y;
        this.x = x;
        this.HueWidth = HueWidth;
        this.HueHeight = HueHeight;

        this.reset(chrom);
    }

    reset(chrom) {

        background(100);
        this.chrom = chrom; //sets chrom to number passed in from main
        this.cellSize = ((this.chrom & 15) + 3); //add 3 so the lowest sell size can be 3
        this.initmeth = ((this.chrom >>> 4) & 3); //shifts 4 right and masks out to 3
        this.altermeth = ((this.chrom >>> 6) & 3); //shifts 6 right and masks out to 3
        this.strokeSet = ((this.chrom >>> 7) & 1); //shifts 7 right and masks out to 1

        this.stToggle(this.strokeSet);

        let rowLeng = Math.floor(this.HueWidth / this.cellSize); //calculates row length

        let colLeng = Math.floor(this.HueHeight / this.cellSize);

        //calculates column length
        //floor ensures that you will get a number that fits on the canvas

        this.hueVal = []; //array

        for (let i = 0; i < rowLeng; i++) {
            this.hueVal[i] = [];
            for (let j = 0; j < colLeng; j++) { //cycles through every pixel

                switch (this.initmeth) {

                    //switch here is for style options          
                    case 0:
                        this.hueVal[i][j] = random(0, 360);
                        break;

                    case 1:
                        this.hueVal[i][j] = (i ^ j);
                        break;

                    case 2:
                        this.hueVal[i][j] = (i * j);
                        break;

                    case 3:
                        this.hueVal[i][j] = (i - j);
                        break;

                    default:
                        this.hueVal[i][j] = random(0, 360);

                        break;
                }
            }
        }
    }

    display() {
        push();
        translate(this.x, this.y);
        if (this.strokeOn) { //draws stroke if on or not
            stroke(360);
        } else {
            noStroke();
        }

        this.maxDev = mxDvSlider.value(); //sets max dev slider label


        for (let i = 0; i < this.hueVal.length; i++) {
            for (let j = 0; j < this.hueVal[i].length; j++) {

                this.hueVal[i][j] = this.alterHue(this.hueVal[i][j], i, j);
                // Use the hueValue to set the fill for this cell
                fill(this.hueVal[i][j], 100, 100, transSlider.value()); //sets fill
                // Location is the loop indices scaled by the cell size
                rect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize); //draws pixels
            }
        }
        pop();
    }



    alterHue(hue, i, j) {
        // Perturb the hue value & wrap around the color wheel

        switch (this.altermeth) { //switch changes how to colors are chosen on screen

            case 0: //random
                hue += this.maxDev;
                //hue += random(-this.maxDev, this.maxDev);
                if (hue > 360)
                    hue -= 360;
                else if (hue < 0)
                    hue += 360;

                break;
            case 1: //poisson twinkle
                let bound = random(this.maxDev * 5);
                hue = hue + random(-bound, bound);
                if (hue > 360)
                    hue -= 360;
                else if (hue < 0)
                    hue += 360;
                break;

            case 2: //increment
                hue = (hue + this.maxDev) % 360; // Increment by maxDev
                if (hue > 360)
                    hue -= 360;
                else if (hue < 0)
                    hue += 360;
                break;

            default: //default is random
                hue += this.maxDev;
                if (hue > 360)
                    hue -= 360;
                else if (hue < 0)
                    hue += 360;

                break;

                //hueVal[i][j] = (i * j);
                //hueVal[i][j] = (i + j) * 15;
                //hueVal[i][j] = (i + j) %360;
                //hueVal[i][j] = ( i ^ j);
                //hueVal[i][j] = (j * sin(i));
                //hueVal[i][j] = (tan(i/j));
                //hueVal[i][j] = (i^3+i^2);
                //hueVal[i][j] = ((i^500));
        }
        return hue;
    }

    stToggle(setStroke) { //changes stroke to be on or off
        if (setStroke == 1) {
            this.strokeOn = true;
        } else {
            this.strokeOn = false;
        }
        //this.strokeOn = !this.strokeOn;
    }

    mouseOver() {
        //checks if mouse is within a huegrid and returns true or false
        if (mouseX >= this.x && mouseX <= (this.HueWidth + this.x) && mouseY >= this.y && mouseY <= (this.HueHeight + this.y)) {
            return true
        } else {
            return false
        }
    }

}
