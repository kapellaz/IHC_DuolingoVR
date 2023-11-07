AFRAME.registerComponent('button', {
    init: function () {
      var el = this.el;
      var cursor = document.getElementById('cursor');
  
      el.addEventListener('mouseenter', function () {
        cursor.setAttribute('color', "green");
      });
  
      el.addEventListener('mouseleave', function () {
        cursor.setAttribute('color', "#FF5733");
      });
  
      el.addEventListener('click', function () {
        let chosen = el.getAttribute("value");
        if (chosen == "how to play?") {
          
        } else {
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
        });
  
        el.addEventListener('mouseleave', function () {
            cursor.setAttribute('color', "#FF5733");
        });
        
        el.addEventListener("click", function () {
            target.getAttribute("visible")
              ? target.setAttribute("visible", false)
              : target.setAttribute("visible", true);
        });
    }
  });
  