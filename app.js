let a={
  'sphere':false, //ainda está ativo
  'cylinder':true,
  'cube':true
};

let string_value = "Lista de Palavras:";

AFRAME.registerComponent('button', {
    init: function () {
      var el = this.el;
      var defaultColor = el.getAttribute('material').color;

      el.addEventListener('mouseenter', function () {
        el.setAttribute('color','red');
        el.setAttribute('material','color:red');

      });

      el.addEventListener('mouseleave', function () {
        el.setAttribute('color', defaultColor);
        el.setAttribute('material',`color:${defaultColor}`)
      });

      el.addEventListener('click',function(){
          a[el.getAttribute('value')]=false;
          console.log(a);

          if(el.getAttribute('opacity')==0.5) el.setAttribute("opacity",1.0);             
          else el.setAttribute("opacity",0.5);
      })
    }
  });

  AFRAME.registerComponent('list', {
    init: function () {
      // Wait for the scene to load before setting the value
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
          // Set the concatenated string as the value of the <a-text> element
          this.el.setAttribute('value', concatenatedString);
      });
  }
});


// You can set the initial value as well
document.getElementById('list').setAttribute('value', string_value);