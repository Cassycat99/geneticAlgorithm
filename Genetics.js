//Cassy Smithies
//genetics
//Project 3 Phase 5
//class that is used to create chromosomes that then create hueGrids
//uses array of population (of chromosomes)
//holds array of fitness scores
//these arrays are parallel to the array of HuGd


class Genetics {
    constructor() {

        this.chrom;
        this.bitLength = 8; //bit length
        this.bitOptions = 2 ** this.bitLength;
        //2 raised to the bit length defines how many numbers are possible
        this.randChrom(); //randomizes chromosome
        this.population = [];
        this.fitness = [];

    }

    randChrom() { //randomizes the characterics of a chromosome
        this.chrom = Math.floor(random(this.bitOptions));
        return this.chrom;
    }

    crossover(parent1, parent2) {
        //picks a random point on two chromosomes that define huegrids 
        //isloates the left side of one parent
        //isloates the right side of one parent
        //crosses numbers over to create one child

        let crossoverPoint = Math.floor(random(0, this.bitLength));
        let mask = ((1 << crossoverPoint) - 1);
        parent1 = (parent1 & mask); //right side of chromosome
        parent2 = (parent2 >>> (crossoverPoint)); //left side of chromosome
        parent2 = (parent2 << (crossoverPoint));

        let chrom = (parent1 | parent2); //creates child chromosome

        return chrom; //returns new chrom
    }

    mutate(chrom) {

        //mutate point is a random number to pick which bit
        //mutate point gets shifted to change to that bit
        //mask is then exclusively or-ed with the chrom
        //this makes the XOR table be used

        //Think 01000 XOR 111111
        //    = 10111
        //01000 is the mutated point, 11111 is the chrom

        let mutatePoint = Math.floor(random(0, this.bitLength));
        let mask = 1 << mutatePoint;
        chrom = (chrom ^ mask);
        return chrom; //returns new chrom

    }

    insertNew(chrom, fitness, index) {
        //updates population and fitness arrays
        this.population[index] = chrom;
        this.fitness[index] = fitness;
    }

    bumpFit(index, amount) {
        this.fitness[index] = this.fitness[index] + amount;
        //changes fitness amounts
    }

    select() {
        //randomly selects two grids and compares their fitness
        //the higher fitness' chromsome is returned
        let chrom;
        //higher fitness returned
        let rand1 = Math.floor(random(0, huGd.length)); //random index number
        let rand2 = Math.floor(random(0, huGd.length)); //random index number
        if (this.fitness[rand1] >= this.fitness[rand2]) {
            chrom = this.population[rand1];
        }

        if (this.fitness[rand1] < this.fitness[rand2]) {
            chrom = this.population[rand2];
        }

        return chrom;

    }

    breed1() {
        //select() one parent
        //select() the other parent (don't care if they're the same)
        // Do a crossover() on the two parents to generate a new kid
        // mutate() the kid
        //return the resulting chromosome

        let p1 = this.select(); //random index number
        let p2 = this.select(); //random index number
        let child = this.crossover(p1,p2);
        let chrom = this.mutate(child);
        return chrom;    
        
    }

    elitism(){
        //finds highest fit value
        //looks through fitness array for index of elite chrom
        //finds chrom related to fitness value in population array
        //returns chromosome
        
        let eliteValue = max(this.fitness);
        let eliteIndex;
        
        for (let i = 0; i < this.fitness.length; i++) { 
        if (this.fitness[i] == eliteValue){
            eliteIndex = i;
        }
        }
        let elite = this.population[eliteIndex];      
    
        return elite;
    }
    
    
}
