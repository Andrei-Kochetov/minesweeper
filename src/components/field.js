import {createCell, widthField} from './cell'
import {stopTimer, clickCount, timer, leaderBoard,playSoundWin } from '../style'

let field = [];
let leaderBoardArr = [];

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
      /* if(fieldElement.checkBomb){
        fieldElement.openCell()
      } */
      fieldElement.openCell()
    });
  });
  
  showLose();
  stopTimer();
}

export function win(){
  let countCloseCell = 0;
  let countCloseMine = 0;
  field.forEach((fieldRow) => {
    fieldRow.forEach((fieldElement) => { 
      if(!fieldElement.isOpen){
        countCloseCell++
      }
      if(fieldElement.checkBomb){
        countCloseMine++
      }
    });
  });
  if(countCloseCell === countCloseMine ){
/*     field.forEach((fieldRow) => {
      fieldRow.forEach((fieldElement) => {
        fieldElement.openCell()
      });
    }); */
    playSoundWin();
    showWin();
    stopTimer();
    saveWinResult();
  }
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
      field[y][x] = newCell;
    });
  });

  widthField(width);



}
/* 
export function replaceBomb(){
  field.forEach((fieldRow, y) => {
    fieldRow.forEach((fieldElement, x) => {
      if(clickCount.textContent == 1 && fieldElement.checkBomb){
        setBomb(countBomb);
        
        field.forEach((fieldRow, y) => {
          fieldRow.forEach((fieldElement, x) => {
            const newCell = createCell(Boolean(fieldElement), { x, y });
            field[y][x] = newCell;
          });
        });
      }
    });
  }); 
} */
 function clearField(){
   field.forEach((fieldRow, y) => {
    fieldRow.forEach((fieldElement, x) => {
      fieldElement.remove()
    });
  }); 

}

function showLose(){
  alert(`Ты проиграл, не расстраивайся!
Время игры: ${timer.textContent} секунд
Количество ходов: ${clickCount.textContent}`)
}
function showWin(){
  alert(`Ты выиграл, поздравляю!
Время игры: ${timer.textContent} секунд
Количество ходов: ${clickCount.textContent}`)
}

function saveWinResult(){
  let currResultWin = {
    Ходы: clickCount.textContent,
    Время : timer.textContent,
  }
  leaderBoardArr.push(currResultWin)
  //console.log(leaderBoardArr)
  if(leaderBoardArr.length > 10){
    leaderBoardArr.shift();
  };
  for(let i = 0; i<leaderBoardArr.length; i++){
      localStorage.setItem(`${i + 1}`, JSON.stringify(leaderBoardArr[i]))
  }
  showWinResult()
}
export function showWinResult(){
    leaderBoard.innerText = '';
    leaderBoardArr = [];
    for(let i = 0; i< localStorage.length; i++){
    let itemLeaderBoard = JSON.parse(localStorage.getItem(`${i + 1}`));
    leaderBoardArr.push(itemLeaderBoard);
    let stingObject = `${i + 1}: Кол-во ходов: ${itemLeaderBoard['Ходы']}, Время игры: ${itemLeaderBoard['Время']}` 
    //console.log(itemLeaderBoard)
    //console.log(typeof itemLeaderBoard)
    leaderBoard.innerText += stingObject + '\n';
    }
}

