let a={
  'sphere':true, //ainda está ativo
  'cylinder':true,
  'cube':true
};

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
      var data=this.data
      var el = this.el;

      // var str=""
      // a.forEach(key=>{
      //   str+=`${key}<b>`
      // })
      console.log("TESTE")
    },
    update:function(){
      this.el.setAttribute('value',"a")
    }
  });

  document.getElementById('list').setAttribute('value',"a")