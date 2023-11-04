let a={
  'car':true,
  'engine':true,
  'wheel':true,
  'workbench':true,
};


let acoes = { // pressupomos acoes de 2 objetos apenas
  'change oil':['oil','car'], //removido da lista quando encontrado até
}

let count_found = 0;
let count_done = 0;
let all_found = false;
let all_done = false;

let list_component;
let cursor;
let string_value = "Lista de Palavras:";

AFRAME.registerComponent('list', {
  init: function () {
    // Wait for the scene to load before setting the value
    list_component = this.el;
    this.el.addEventListener('loaded', () => {
        // Concatenate string_value with all keys from the 'a' object
        let concatenatedString = string_value + "\n";
        for (const key in a) {
            if (a[key]) {
                concatenatedString += "o - ";
            }
            else {
                concatenatedString += "x - ";
            }
            concatenatedString += key + "\n";
        }
        concatenatedString += "\n---------------\n\n";
        for (let key in acoes) {
          let percentage = (1-(acoes[key].length/2))*100;
          concatenatedString += percentage.toString() + "%: " + key + "\n";
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

      el.addEventListener('mouseenter', function () {
        if (a[el.getAttribute('value')]==true) cursor.setAttribute('color', "green");
        else cursor.setAttribute('color', "cyan");
      });
      
      el.addEventListener('mouseleave', function () {
        cursor.setAttribute('color', "#FF5733");
      });


      el.addEventListener('click',function(){
        if(a[el.getAttribute('value')]==true){
          a[el.getAttribute('value')]=false;
          console.log(a);
          count_found++;
          if (count_found == Object.keys(a).length){
            all_found = true;
          }

          //update list
          let concatenatedString = string_value + "\n";
          for (const key in a) {
              if (a[key]) {
                  concatenatedString += "o - ";
              }
              else {
                  concatenatedString += "x - ";
              }
              concatenatedString += key + "\n";
          }
          concatenatedString += "\n---------------\n\n";
          for (let key in acoes) {
            let percentage = (1-(acoes[key].length/2))*100;
            concatenatedString += percentage.toString() + "%: " + key + "\n";
          }
          list_component.setAttribute('value', concatenatedString);
        }
      })
    }
  });

  
// You can set the initial value as well
document.getElementById('list').setAttribute('value', string_value);

