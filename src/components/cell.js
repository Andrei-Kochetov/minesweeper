const fieldHtml = document.createElement('div');
fieldHtml.classList.add('fieldHtml')
document.body.appendChild(fieldHtml)

class Cell{
    constructor(checkBomb, coord){
        this.checkBomb = checkBomb;
        this.coord = coord;
    }
    createCellOnField() {
        const cellElem = document.createElement("div");
        cellElem.classList.add("cell");
        cellElem.classList.add("cell__start");
    
        fieldHtml.appendChild(cellElem);
      }
}

export function createCell(checkBomb, coord){
    const newCell = new Cell(checkBomb, coord)
    newCell.createCellOnField()
    return newCell
}