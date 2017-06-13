$(document).on('ready', function() {
  var header_h = $("#nav-container").height();
  $("#h").height(header_h-10); 

  $("body").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
    top = $(id).offset().top-header_h-20;
    $('body,html').animate({scrollTop: top}, 700);
  });

  ymaps.ready(init);
  var myMap;
  function init () {
    myMap = new ymaps.Map("map", {
        center: [53.802257, 27.661831], //Minsk
        zoom: 10 
      }, {
        balloonMaxWidth: 300,
        searchControlProvider: 'yandex#search'
      });

    $(".map-info").on("click","a", function (event) {
      event.preventDefault();
      var id  = "#"+$(this).attr('data');
      var coords = $(this).attr('coords').split(','); 

      var address = $(id+" .mark-address").html();
      if(!address){address=""};
      var phone = $(id+" .mark-phone").html();
      if(!phone){phone=""};
      var tit = $(id+" .mark-tit").html();
      if(!tit){tit=""}; 
      var time = $(id+" .mark-time").html();
      if(!time){time=""};

      if($(this).attr('data')){
        myMap.balloon.open(coords, {
          contentHeader:tit,
          contentBody:address+"<br>"+phone,
          contentFooter:'<sup>'+time+'</sup>'
        });

      }else{}       

    });

    for(var i=1; i<1+$(".map-info a[coords]").size();i++){
      var cor = $("#mark"+i+" a[coords]").attr("coords").split(",");
      var cont = $("#mark"+i).html();
      myMap.geoObjects.add(new ymaps.Placemark(cor, {
        balloonContent: "<table>"+cont+"</table>"
      }, {
        preset: 'twirl#violetIcon'
      }));

    }     
  };

  $("#form").submit(function() { 
    var form_data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "send.php", 
      data: form_data,
      success: function() {
        alert("Ваше сообщение отпрвлено!");
      }
    });
  });
});

