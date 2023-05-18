import { getRoundNeighbors, openAllBomb } from "./field";

const fieldHtml = document.createElement('div');
fieldHtml.classList.add('fieldHtml');
document.body.appendChild(fieldHtml);

class Cell{
    constructor(checkBomb, coord ){
        this.checkBomb = checkBomb;
        this.coord = coord;
    }

    setIsOpen(isOpen){
        this.isOpen = isOpen;
    }
    setValue(value){
        this.value = value;
    }
    setFlag(isFlag) {
        this.isFlag = isFlag;
        this.cellElem.innerHTML = isFlag ? "📍" : "";
    }

    showValueCell(){
        this.cellElem.innerHTML = this.value || '' ;
    }
      
    openCell(){
        this.isOpen = true ;
        this.cellElem.classList.remove('cell__start');
        this.showValueCell()

    }

    setTypeValue(){
        if(this.checkBomb){
            this.setValue('🧨') 
            return;
        }

        const neighbors = getRoundNeighbors(this.coord);
        let bombCount = 0;
        neighbors.forEach((neighbor) => {
          if ( neighbor === 1 || neighbor.checkBomb) {
            bombCount++;
          }
        });
    
        if (bombCount) {
          this.setValue(bombCount);
        }
    }


    onCellRightClick() {
        if(this.isFlag){
        this.setFlag(false);
        } else{
            this.setFlag(true);
        }
    }


    onCellClick(openNumber = false) {
        if(this.isFlag){

            this.setFlag(false);

            return;

        } else if(!this.value && !this.isOpen){

            this.openCell();

            const neighbors = getRoundNeighbors(this.coord);

            neighbors.forEach((neighbor) => {

                if ( !neighbor.isOpen ) {
                    neighbor.onCellClick(true)
                }

            });

        } else if((this.value && openNumber) || typeof this.value === "number"){

            this.openCell()

        } else if(this.checkBomb){

            openAllBomb();

        } 
        
        this.showValueCell()

    }
   

    createCellOnField() {
        const cellElem = document.createElement("div");
        cellElem.classList.add("cell");
        cellElem.classList.add("cell__start");

        this.cellElem = cellElem;
        this.cellElem.addEventListener("click", () => this.onCellClick());
        this.cellElem.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            this.onCellRightClick()
        });
        
        fieldHtml.appendChild(cellElem);
      }
  
}


export function createCell(checkBomb, coord){
    const newCell = new Cell(checkBomb, coord);
    newCell.setTypeValue()
    newCell.createCellOnField()
    return newCell
}
export function clearField(){
   fieldHtml.innerHTML = '';
 }

export function widthField(width){
    fieldHtml.style.maxWidth = `calc(40px * ${width})`;
}