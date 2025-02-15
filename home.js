AFRAME.registerComponent('button', {
    init: function () {
      var el = this.el;
      var cursor = document.getElementById('cursor');
      var guide = document.getElementById('Guide');
  
      el.addEventListener('mouseenter', function () {
        cursor.setAttribute('color', "green");
        guide.setAttribute('visible', 'true');
      });
  
      el.addEventListener('mouseleave', function () {
        cursor.setAttribute('color', "#FF5733");
        guide.setAttribute('visible', 'false');
      });
  
      el.addEventListener('click', function () {
        let chosen = el.getAttribute("value");
        if (chosen != "how to play?") { 
          window.location.href = `./${chosen}.html`;
        }
      });
    }
  });

  AFRAME.registerComponent('button2', {
    init: function () {
        var el = this.el;
        var cursor = document.getElementById('cursor');
        var target = document.getElementById('myBox');
        el.addEventListener('mouseenter', function () {
            cursor.setAttribute('color', "green");
            target.setAttribute("visible", true);
        });
  
        el.addEventListener('mouseleave', function () {
            cursor.setAttribute('color', "#FF5733");
            target.setAttribute("visible", false)
        });
    }
  });
  