
let all_selected = []; // tudo o que foi selecionado
let count_found = 0;   //       objetos encontrados
let count_done = 0;    //       ações realizadas
let all_found = false; // todos objetos encontrados
let all_done = false;  // todas ações realizadas
let list_component;
let cursor;
let speechQueue = [];  // Queue to store texts to be spoken
let isSpeaking = false; // Flag to track if the synthesizer is currently speaking
let last_time = false;
function textToSpeech(text) {
  speechQueue.push(text); // Add the text to the queue

  // If not currently speaking, start speaking
  if (!isSpeaking) {
    speakNext(); // Start processing the queue
  }
}

function speakNext(){

  // subscription key and region for speech services.
  var subscriptionKey, serviceRegion;
  var synthesizer;
    subscriptionKey="26c097a0391048fa934b92d1110285a1";
    serviceRegion="westeurope";
    //resultDiv = document.getElementById("resultDiv");
    if (speechQueue.length > 0 && !isSpeaking) {
      console.log(speechQueue);
      isSpeaking = true;
      const text = speechQueue.shift(); // Get the next text from the queue

  
      if (subscriptionKey === "" || subscriptionKey === "subscription") {
        alert("Please enter your Microsoft Cognitive Services Speech subscription key!");
        isSpeaking = false; // Set the flag to indicate that speaking is done
        return;
      }
      var speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

      synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);

      synthesizer.speakTextAsync(
        text,
        function (result) {
          window.console.log(result);
          synthesizer.close();
          synthesizer = undefined;
          isSpeaking = false; // Set the flag to indicate that speaking is done
          //wait for the speaking to finish before processing the next text in the queue
          speakNext(); // Process the next text in the queue

        },
        function (err) {
          window.console.log(err);
          isSpeaking = false; // Set the flag to indicate that speaking is done// Process the next text in the queue
          synthesizer.close();
          synthesizer = undefined;
          speakNext(); 
      });

    if (!!window.SpeechSDK) {
      SpeechSDK = window.SpeechSDK;

      // in case we have a function for getting an authorization token, call it.
      if (typeof RequestAuthorizationToken === "function") {
          RequestAuthorizationToken();
      }
    }
  }
}


function updateList() {
  let concatenatedString = "Objetos:" + "\n";
  for (const key in a) {
    if(a[key]!=5){
      if (a[key]) {
        concatenatedString += "o - "; 
      } else {
        concatenatedString += "x - ";
      }
      concatenatedString += key + "\n";
    }
  }
  concatenatedString += "---------------\n";
  concatenatedString += "Tarefas:\n";
  for (let key in acoes) {
    let percentage = Math.round((1 - ((acoes[key].length-1) / acoes[key][0])) * 100);
    concatenatedString += percentage.toString() + "%: " + key + "\n";
    for (let i = 1; i < acoes[key].length; i++) {
      concatenatedString += ' -> ' + acoes[key][i] + '\n';
    }
  }
  concatenatedString += "---------------\n";
  concatenatedString += "A - ocultar lista\n";
  concatenatedString += "B - sair\n";
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
    cursor = document.getElementById('right-hand');
    let objeto = el.getAttribute('value');

    el.addEventListener('mouseenter', function () {
      if (!all_selected.includes(objeto)) cursor.setAttribute('raycaster', "lineColor: green");
      else cursor.setAttribute('raycaster', "lineColor: cyan");
    });

    el.addEventListener('mouseleave', function () {
      cursor.setAttribute('raycaster', "lineColor: #FF5733");
    });

    el.addEventListener('click', async function () {
      let in_action = false;
      textToSpeech(objeto);
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
            //textToSpeech(objeto);
            all_selected.push(objeto);
            in_action = true;
            if (acoes[key].length === 1) {
              await new Promise(r => setTimeout(r, 1000));
              textToSpeech(key + " completed!");
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




async function updateTimer() {
  const timerText = document.getElementById('timer');
  let second_string = "0";
  let minute_string = "0";
  if (second < 10) second_string = second_string + second.toString();
  else second_string = second;
  if (minute < 10) minute_string = minute_string + minute.toString();
  else minute_string = minute;
  if(!last_time){timerText.setAttribute('value', `Time: ${minute_string}:${second_string}`);}
  // second++;
  // if (second == 60) {
  //   second = 0;
  //   minute++;
  // }

  if (all_found && all_done) {
    all_found = false;
    last_time = true;
    second_string = "0";
    minute_string = "0";
    if (second < 10) second_string = second_string + second.toString();
    else second_string = second;
    if (minute < 10) minute_string = minute_string + minute.toString();
    else minute_string = minute;
    timerText.setAttribute('value', 'Complete! ' + `Time: ${minute_string}:${second_string}`);
    timerText.setAttribute('color', 'green');
    await new Promise(r => setTimeout(r, 1000));
    textToSpeech(`Completed in ${minute_string} minutes and ${second_string} seconds! Congratulations!`)
    clearTimeout(timerInterval); 
  }

  second++;
  if (second == 60) {
    second = 0;
    minute++;
  }
}

// Function to toggle visibility of the A-Frame entity
function toggleVisibility() {
  var myBox = document.getElementById('myBox');
  var text_list = document.getElementById('text_list');
  var timer = document.getElementById('timer');
  var visible=myBox.getAttribute('value');

  myBox.setAttribute('animation__out', {'property': 'scale','to':'0 0 0','startEvents': 'outAnimation','dur': '500'});
  text_list.setAttribute('animation__out', {'property': 'scale','to':'0 0 0','startEvents': 'outAnimation','dur': '500'});
  timer.setAttribute('animation__out', {'property': 'scale','to':'0 0 0','startEvents': 'outAnimation','dur': '500'});

  myBox.setAttribute('animation__in', {'property': 'scale','from':'0 0 0','to':'0.3 0.3 0.3','startEvents': 'inAnimation','dur': '500'});
  text_list.setAttribute('animation__in', {'property': 'scale','from':'0 0 0','to':'2 2 2','startEvents': 'inAnimation','dur': '500'});
  timer.setAttribute('animation__in', {'property': 'scale','from':'0 0 0','to':'0.2 0.3 0.5','startEvents': 'inAnimation','dur': '500'});

  if(visible==='1'){
    myBox.emit('outAnimation',null, false)
    text_list.emit('outAnimation',null, false)
    timer.emit('outAnimation',null, false)
    myBox.setAttribute('value','0')
  }
  else if(visible==='0'){
    myBox.emit('inAnimation',null, false)
    text_list.emit('inAnimation',null, false)
    timer.emit('inAnimation',null, false)
    myBox.setAttribute('value','1')
  }
}

// Add event listener for the 'L' key press
document.addEventListener('keydown', function (event) {
  if (event.key === 'l' || event.key === 'L') {
        toggleVisibility();
  }
});


// Add event listener for the 'L' key press
document.addEventListener('abuttondown', function (event) {
//  if (event.key === 'l' || event.key === 'L') {
        toggleVisibility();
  // }
});

document.addEventListener('bbuttondown', function (event) {
  window.location.href = './home.html';
 });

let second = 0; // Initial time in seconds
let minute = 0;
const timerInterval = setInterval(updateTimer, 1000);

