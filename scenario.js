let all_selected = []; // tudo o que foi selecionado
let count_found = 0;   //       objetos encontrados
let count_done = 0;    //       ações realizadas
let all_found = false; // todos objetos encontrados
let all_done = false;  // todas ações realizadas
let list_component;
let cursor;

function updateList() {
  let concatenatedString = "Objetos:" + "\n";
  for (const key in a) {
    if (a[key]) {
      concatenatedString += "o - "; 
    } else {
      concatenatedString += "x - ";
    }
    concatenatedString += key + "\n";
  }
  concatenatedString += "---------------\n";
  concatenatedString += "Tarefas:\n";
  for (let key in acoes) {
    let percentage = (1 - (acoes[key].length / 2)) * 100;
    concatenatedString += percentage.toString() + "%: " + key + "\n";
    for (let i = 0; i < acoes[key].length; i++) {
      concatenatedString += ' -> ' + acoes[key][i] + '\n';
    }
  }
  list_component.setAttribute('value', concatenatedString);
}

AFRAME.registerComponent('list', {
  init: function () {
    list_component = this.el;
    this.el.addEventListener('loaded', () => {
      updateList();
    });
  }
});

AFRAME.registerComponent('button', {
  init: function () {
    var el = this.el;
    cursor = document.getElementById('cursor');
    let objeto = el.getAttribute('value');

    el.addEventListener('mouseenter', function () {
      if (!all_selected.includes(objeto)) cursor.setAttribute('color', "green");
      else cursor.setAttribute('color', "cyan");
    });

    el.addEventListener('mouseleave', function () {
      cursor.setAttribute('color', "#FF5733");
    });

    el.addEventListener('click', function () {
      let in_action = false;
      if (a[objeto] == true) { // objeto por encontrar
        a[objeto] = false;
        all_selected.push(objeto);
        count_found++;
        if (count_found == Object.keys(a).length) {
          all_found = true;
        }
      } else {                 // parte de ação por realizar 
        for (let key in acoes) {
          if (acoes[key].includes(objeto)) {
            acoes[key] = acoes[key].filter(item => item != objeto);
            all_selected.push(objeto);
            in_action = true;
            if (acoes[key].length === 0) {
              count_done++;
              if (count_done === Object.keys(acoes).length) {
                all_done = true;
              }
            }
          }
        }
      }
      if (a[objeto] == false || in_action) {
        updateList(); // apenas se mudou algo
      }
    })
  }
});

function toggleVisibility() {
  var myBox = document.getElementById('myBox');
  myBox.getAttribute('visible') ? myBox.setAttribute('visible', false) : myBox.setAttribute('visible', true);
}




function updateTimer() {
  const timerText = document.getElementById('timer');
  let second_string = "0";
  let minute_string = "0";
  if (second < 10) second_string = second_string + second.toString();
  else second_string = second;
  if (minute < 10) minute_string = minute_string + minute.toString();
  else minute_string = minute;
  timerText.setAttribute('value', `Time: ${minute_string}:${second_string}`);
  second++;
  if (second == 60) {
    second = 0;
    minute++;
  }

  if (all_found && all_done) {
    clearTimeout(timerInterval); 
    timerText.setAttribute('value', 'Complete! ' + timerText.getAttribute('value'));
    timerText.setAttribute('color', 'green');
  }
}

// Function to toggle visibility of the A-Frame entity
function toggleVisibility() {
  var myBox = document.getElementById('myBox');
  var text_list = document.getElementById('text_list');
  var timer = document.getElementById('timer');
  var visible=myBox.getAttribute('value');

  myBox.setAttribute('animation__out', {'property': 'scale','to':'0 0 0','startEvents': 'outAnimation'});
  text_list.setAttribute('animation__out', {'property': 'scale','to':0,'startEvents': 'outAnimation'});
  timer.setAttribute('animation__out', {'property': 'scale','to':0,'startEvents': 'outAnimation'});

  myBox.setAttribute('animation__in', {'property': 'scale','from':'0 0 0','to':'0.5 0.5 0.5','startEvents': 'inAnimation'});
  text_list.setAttribute('animation__in', {'property': 'scale','from':'0 0 0','to':'2 2 2','startEvents': 'inAnimation'});
  timer.setAttribute('animation__in', {'property': 'scale','from':'0 0 0','to':'0.2 0.3 0.5','startEvents': 'inAnimation'});

  if(visible==='1'){
    // myBox.setAttribute('visible',false);
    myBox.emit('outAnimation',null, false)
    text_list.emit('outAnimation',null, false)
    timer.emit('outAnimation',null, false)
    myBox.setAttribute('value','0')
  }
  else{
    myBox.emit('inAnimation',null, false)
    text_list.emit('inAnimation',null, false)
    timer.emit('inAnimation',null, false)
    //myBox.setAttribute('visible',true);
    myBox.setAttribute('value','1')
  }
}


// Add event listener for the 'L' key press
document.addEventListener('keydown', function (event) {
  if (event.key === 'l' || event.key === 'L') {
        toggleVisibility();
  }
});

let second = 0; // Initial time in seconds
let minute = 0;
const timerInterval = setInterval(updateTimer, 1000);

document.getElementById('myBox').setAttribute('value','1')
