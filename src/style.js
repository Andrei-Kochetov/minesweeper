import './sass/style.scss';
import {createField} from './components/field';
import {clearField} from './components/cell'

const menu = document.createElement('div');
menu.classList.add('menu')
const form = document.createElement('form');
form.innerHTML = '<select id="select"><option value="10">Easy</option><option value="15">Normal</option><option value="25">Hard</option></select> <div id="demo1"></div>'

const wrapperRange = document.createElement('div');
wrapperRange.classList.add('slidecontainer')
wrapperRange.innerHTML = '<input type="range" min="1" max="100" value="10" class="slider" id="myRange"> <div id="demo"></div>';

menu.appendChild(wrapperRange);
menu.appendChild(form);


document.body.prepend(menu);

let minesValue;
let cellValue;

const slider = document.getElementById("myRange");
const output = document.getElementById("demo");
output.innerHTML = slider.value;
slider.onchange = function() {
    output.innerHTML = this.value;
    minesValue = this.value;
    clearField();
    createField(cellValue,cellValue, minesValue);
}


const select = document.getElementById("select");
select.oninput = function() {
    cellValue = this.value;
    clearField();
    createField(cellValue,cellValue, minesValue )
}



createField()