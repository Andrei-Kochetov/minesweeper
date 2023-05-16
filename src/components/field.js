import {createCell} from './cell'

let field = [];

function setBomb (countBomb) {
    let currCountBomb = countBomb;
  
    const fieldHeight = field.length;
    const fieldWidth = field[0].length;
  
    while (currCountBomb) {
      const x = Math.floor(Math.random()* fieldWidth);
      const y = Math.floor(Math.random()* fieldHeight);
        //console.log(x)
        //console.log(y)
      const fieldElem = field[y][x];
  
      if (fieldElem === 0) {
        field[y][x] = 1;
        currCountBomb--;
      }
    }
  }


export function createField(width = 10, height = 10, countBomb = 10) {
  field = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => 0)
  );

  setBomb(countBomb)
    
  
  field.forEach((fieldRow, y) => {
    fieldRow.forEach((fieldElement, x) => {
      const newCell = createCell(Boolean(fieldElement), { x, y });

      field[y][x] = newCell;
    });
  });
  console.log(field)

}