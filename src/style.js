import './sass/style.scss';
import {createField, showWinResult} from './components/field';
import {clearField} from './components/cell';
import './assets/bomb.mp3';
import './assets/c4.mp3';
import './assets/hos2.mp3';
import './assets/flag.mp3';
import './assets/win.mp3';




const menu = document.createElement('div');
menu.classList.add('menu')
const form = document.createElement('form');
form.innerHTML = '<select id="select"><option value="10">Easy</option><option value="15">Normal</option><option value="25">Hard</option></select> <div id="demo1"></div>'

const wrapperRange = document.createElement('div');
wrapperRange.classList.add('slidecontainer')
wrapperRange.innerHTML = '<input type="range" min="10" max="99" value="10" class="slider" id="myRange"> <div id="demo"></div>';

const wrapperMinesCount = document.createElement('div');
wrapperMinesCount.classList.add('wrapperMinesCount')
wrapperMinesCount.innerHTML = '<div>🧨</div>'
export const minesCount = document.createElement('div');
minesCount.textContent = 10;
wrapperMinesCount.appendChild(minesCount)

const wrapperClickCount = document.createElement('div');
wrapperClickCount.classList.add('wrapperClickCount')
wrapperClickCount.innerHTML = '<div>Ходы:</div>'
export const clickCount = document.createElement('div');
clickCount.textContent = 0;
wrapperClickCount.appendChild(clickCount)

const wrapperTimer = document.createElement('div');
wrapperTimer.classList.add('wrapperTimer')
wrapperTimer.innerHTML = '<div>Время:</div>'
export let timer = document.createElement('div');
timer.textContent = 0;
wrapperTimer.appendChild(timer)

let timerId;
export function startTimer(){
    if(clickCount.textContent == 1 ){
        timerId = setInterval(()=>{
        timer.textContent = +timer.textContent + 1
    }, 1000) 
}
}


const restart = document.createElement('button');
restart.innerHTML = 'Начать заново';
restart.onclick = function() {
    minesCount.textContent = slider.value;
    clickCount.textContent = 0;
    playSoundOnRestart();
    stopAndClearTimer();
    clearField();
    createField(cellValue,cellValue, minesValue )
}

//const body = document.querySelector('body');

const theme = document.createElement('button');
theme.innerHTML = 'Сменить цвет сайта ';


theme.onclick = function() {
    document.body.classList.toggle('bc-body');
    document.querySelectorAll('.cell').forEach(el=>{
        el.classList.toggle('cell_dark'); 
    })
    document.querySelectorAll('button').forEach(el=>{
        el.classList.toggle('btn-color');
    })
    document.querySelector('select').classList.toggle('btn-color');
    document.querySelector('.leaderTitle').classList.toggle('leaderTitle_dark');
    document.querySelector('.leaderBoard').classList.toggle('leaderBoard_dark');

}

const muteWrapper = document.createElement('div');
const mute = document.createElement('input');
mute.setAttribute('type', 'checkbox');
mute.setAttribute('id', 'mute');
const muteLabel = document.createElement('label');
muteLabel.setAttribute('for', 'mute');
muteLabel.innerHTML = 'Выключить звук';
muteWrapper.appendChild(mute);
muteWrapper.appendChild(muteLabel);

menu.appendChild(wrapperRange);
menu.appendChild(form);
menu.appendChild(wrapperTimer);
menu.appendChild(restart);
menu.appendChild(wrapperMinesCount);
menu.appendChild(wrapperClickCount);
menu.appendChild(theme);
menu.appendChild(muteWrapper);

const leaderTitle = document.createElement('div');
leaderTitle.classList.add('leaderTitle')
leaderTitle.innerHTML = 'Таблица последних результатов:'
export const leaderBoard = document.createElement('div');
leaderBoard.classList.add('leaderBoard')

document.body.prepend(menu);
document.body.append(leaderTitle);
document.body.append(leaderBoard);

let minesValue;
let cellValue;

const slider = document.getElementById("myRange");
const output = document.getElementById("demo");
output.innerHTML = slider.value;
slider.onchange = function() {
    output.innerHTML = this.value;
    minesValue = this.value;
    minesCount.textContent = this.value;
    clickCount.textContent = 0;
    playSoundOnRestart();
    stopAndClearTimer();
    clearField();
    createField(cellValue,cellValue, minesValue);
}


const select = document.getElementById("select");
select.oninput = function() {
    cellValue = this.value;
    clickCount.textContent = 0;
    playSoundOnRestart();
    stopAndClearTimer();
    clearField();
    createField(cellValue,cellValue, minesValue )
}
function stopAndClearTimer(){
    clearInterval(timerId)
    timer.textContent = 0;

}
export function stopTimer(){
    clearInterval(timerId)   
}

export function playSoundOnClickCell(){
    if(mute.checked){
        return
    } else{
        let audio = new Audio();
        audio.preload = 'auto';
        audio.src = './c4.mp3';
        audio.play();
    }

}
 function playSoundOnRestart(){
    if(mute.checked){
        return
    } else{
        let audio = new Audio();
        audio.preload = 'auto';
        audio.src = './hos2.mp3';
       audio.play(); 
    }  
}
export function playSoundOnClickBomb(){
    if(mute.checked){
        return
    } else{
        let audio = new Audio();
        audio.preload = 'auto';
        audio.src = './bomb.mp3';
        audio.play();
    }

}
export function playSoundOnRightClick(){
    if(mute.checked){
        return
    } else{
        let audio = new Audio();
        audio.preload = 'auto';
        audio.src = './flag.mp3';
        audio.play();
    }

}
export function playSoundWin(){
    if(mute.checked){
        return
    } else{
        let audio = new Audio();
        audio.preload = 'auto';
        audio.src = './win.mp3';
        audio.play();
    }

}


createField()
showWinResult();