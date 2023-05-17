import { getRoundNeighbors } from "./field";

const fieldHtml = document.createElement('div');
fieldHtml.classList.add('fieldHtml')
document.body.appendChild(fieldHtml)

class Cell{
    constructor(checkBomb, coord ){
        this.checkBomb = checkBomb;
        this.coord = coord;
    }
    createCellOnField() {
        const cellElem = document.createElement("div");
        cellElem.classList.add("cell");
        cellElem.classList.add("cell__start");
    
        fieldHtml.appendChild(cellElem);

        this.cellElem = cellElem;
        this.cellElem.addEventListener("click", () => this.onCellClick());
        this.cellElem.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            this.onCellRightClick()
        });
        

      }
    onCellClick() {
        if(this.cellElem.innerHTML === "🚩"){
            this.cellElem.innerHTML = ""
        }
        if(this.checkBomb){
           this.cellElem.innerHTML = "💣"; 
        } 
        if(!this.checkBomb){
            getRoundNeighbors(this.coord)
        } 
        
        this.setValueNumber();
        this.openCell();

    }
    onCellRightClick() {
        if(this.cellElem.innerHTML === "🚩"){
            this.cellElem.innerHTML = ""
        } else if (this.cellElem.innerHTML === "💣"){
            return;
        } else{
            this.cellElem.innerHTML = "🚩"
        }
    }
    openCell(){
        this.cellElem.innerHtml = this.valueNumber || '';
        this.cellElem.classList.remove('cell__start')
    }
    setValue(valueNumber){
        this.valueNumber = valueNumber;
    }
    setValueNumber(){
        const neighbors = getRoundNeighbors(this.coord);
        let bombCount = 0;
        //console.log(neighbors)
        neighbors.forEach((neighbor) => {
            console.log(neighbor)
          if ( neighbor.checkBomb) {
            bombCount++;
          }
        });
    
        if (bombCount) {
          this.setValue(bombCount);
        }
    }
  
}


export function createCell(checkBomb, coord){
    const newCell = new Cell(checkBomb, coord)
    newCell.createCellOnField()
    return newCell
}