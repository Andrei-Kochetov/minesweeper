import {createCell} from './cell'

let field = [];

function setBomb (countBomb) {
    let currCountBomb = countBomb;
  
    const fieldHeight = field.length;
    const fieldWidth = field[0].length;
  
    while (currCountBomb) {
      const x = Math.floor(Math.random()* fieldWidth);
      const y = Math.floor(Math.random()* fieldHeight);
      const fieldElem = field[y][x];
  
      if (fieldElem === 0) {
        field[y][x] = 1;
        currCountBomb--;
      }
    }
  }
export function openAllBomb(){
  field.forEach((fieldRow) => {
    fieldRow.forEach((fieldElement) => {
      if(fieldElement.checkBomb){
        fieldElement.openCell()
      }
    });
  });
}
export function getRoundNeighbors(coord) {
    const { x, y } = coord;

    const n1 = field[y - 1]?.[x];
    const n2 = field[y - 1]?.[x + 1];
    const n3 = field[y]?.[x + 1];
    const n4 = field[y + 1]?.[x + 1];
    const n5 = field[y + 1]?.[x];
    const n6 = field[y + 1]?.[x - 1];
    const n7 = field[y]?.[x - 1];
    const n8 = field[y - 1]?.[x - 1];
    //console.log(n1)

    return [n1, n2, n3, n4, n5, n6, n7, n8].filter(
        (item) => typeof item !== "undefined"
    );
}
export function createField(width = 10, height = 10, countBomb = 10) {
  field = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => 0)
  );

  setBomb(countBomb)
    
  
  field.forEach((fieldRow, y) => {
    fieldRow.forEach((fieldElement, x) => {
      const newCell = createCell(Boolean(fieldElement), { x, y });
      //console.log(field[y][x])
      field[y][x] = newCell;
    });
  });
  //console.log(field)

}

