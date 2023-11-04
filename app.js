let a={
  'barrel':true,
  'engine':true,
  'wheel':true,
  'workbench':true,
};


let acoes = { // pressupomos acoes de 2 objetos apenas
  'change oil':['canister','car'], //removido da lista quando encontrado até
}

let all_selected = [];

let count_found = 0;
let count_done = 0;
let all_found = false;
let all_done = false;

let list_component;
let cursor;


AFRAME.registerComponent('list', {
  init: function () {
    // Wait for the scene to load before setting the value
    list_component = this.el;
    this.el.addEventListener('loaded', () => {
        // Concatenate string_value with all keys from the 'a' object
        let concatenatedString = "Objetos:" + "\n";
        for (const key in a) {
            if (a[key]) {
                concatenatedString += "o - ";
            }
            else {
                concatenatedString += "x - ";
            }
            concatenatedString += key + "\n";
        }
        concatenatedString += "---------------\n";
        concatenatedString += "Tarefas:\n"
        for (let key in acoes) {
          let percentage = (1-(acoes[key].length/2))*100;
          concatenatedString += percentage.toString() + "%: " + key + "\n";
          for (let i = 0; i < acoes[key].length; i++) {
            concatenatedString += ' -> ' + acoes[key][i] + '\n';
          }
        }
        // Set the concatenated string as the value of the <a-text> element
        this.el.setAttribute('value', concatenatedString);
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


      el.addEventListener('click',function(){
        let in_action = false;
        if(a[objeto]==true){ //verificar se é objeto
          a[objeto]=false;
          all_selected.push(objeto);
          count_found++;
          if (count_found == Object.keys(a).length){
            all_found = true;
          } 
        }
        else {
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
        if (a[objeto]==false || in_action) {
          let concatenatedString = "Palavras:" + "\n";
            for (const key in a) {
                if (a[key]) {
                    concatenatedString += "o - ";
                }
                else {
                    concatenatedString += "x - ";
                }
                concatenatedString += key + "\n";
            }
            concatenatedString += "---------------\n";
            concatenatedString += "Tarefas:\n";
            for (let key in acoes) {
              let percentage = (1-(acoes[key].length/2))*100;
              concatenatedString += percentage.toString() + "%: " + key + "\n";
              for (let i = 0; i < acoes[key].length; i++) {
                concatenatedString += ' -> ' + acoes[key][i] + '\n';
              }
            }
            list_component.setAttribute('value', concatenatedString);
          }
      })
    }
  });

  
// You can set the initial value as well
//document.getElementById('list').setAttribute('value', string_value);

