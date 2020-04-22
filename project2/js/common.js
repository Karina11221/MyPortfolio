// Телефон
$(".input-phone").inputmask({
  mask: '+7 (999) 999-99-99',
  showMaskOnHover: false
});

$(document).ready(function () {
	var mySwiper = new Swiper ('.swiper-container', {
		effect: "coverflow",
		centeredSlides: !0,
		slidesPerView: "auto",
		navigation: {
			nextEl: ".doctors-next",
			prevEl: ".doctors-prev"
		},
		coverflowEffect: {
			rotate: 0,
			stretch: -50,
			depth: 300,
			modifier: 1
		}
	})
});

$('.form-type label').click(function () {
	var type = $(this).data('type');
	var input = $(this).data('input');
	var placeholder = $(this).data('placeholder');
	$('label[for="contact"] span').text(type);
	$('label[for="contact"] input').attr('type', input).attr('placeholder', placeholder);
});

ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map('map', {
    center: [55.730930, 37.672264],
    zoom: 16,
    controls: []
  });

  var myGeoObjects = [];
  myGeoObjects[0] = new ymaps.Placemark([55.730662, 37.672271], {
    clusterCaption: 'Everon', 
  },{
    iconLayout: 'default#image',
    iconImageHref: 'img/icons/pin.png',
    iconImageSize: [98, 119],
    iconImageOffset: [-49, -70]
  });   

  var clusterer = new ymaps.Clusterer({
    clusterDisableClickZoom: false,
    clusterOpenBalloonOnClick: false,
    clusterBalloonContentLayout: 'cluster#balloonCarousel',
    clusterBalloonPanelMaxMapArea: 0,
    clusterBalloonContentLayoutWidth: 300,
    clusterBalloonContentLayoutHeight: 200,
    clusterBalloonPagerSize: 5
  });
  var zoomControl = new ymaps.control.ZoomControl({
      options: {
          float: 'none', position: {right: '25px', top: '100px'}
      }
  });
  myMap.controls.add(zoomControl);

  clusterer.add(myGeoObjects);
  myMap.geoObjects.add(clusterer);
  myMap.behaviors.disable('scrollZoom');
}


// Скролл до блока
$(document).ready(function() { 
  function smooth() {
    $('.nav a').on('click', function() { 
      var id = $(this).attr('href'),
      top = $(id).offset().top - 100;
      $('html, body').animate({
        scrollTop: top
      }, 1000);
      return false;
    });
  }
  smooth();

  var lastId,
	    topMenu = $(".nav"),
	    topMenuHeight = topMenu.outerHeight() + 100,
	    menuItems = topMenu.find("a"),
	    scrollItems = menuItems.map(function(){
	      var item = $($(this).attr("href"));
	      if (item.length) { return item; }
	    });
	$(window).scroll(function(){
	 var fromTop = $(this).scrollTop()+topMenuHeight;
	 var cur = scrollItems.map(function(){
	   if ($(this).offset().top < fromTop)
	     return this;
	 });
	 cur = cur[cur.length-1];
	 var id = cur && cur.length ? cur[0].id : "";

	 if (lastId !== id) {
	   lastId = id;
	   menuItems
	   .parent().removeClass("active")
	   .end().filter("[href='#"+id+"']").parent().addClass("active");
	 }                   
	});
});

$("[data-fancybox]").fancybox({
  touch: false
});

$(document).ready(function () {
  $("form").submit(function () {
    var clikedForm = $(this),
        name = clikedForm.find("[name='name']").val(),
        phone =  clikedForm.find("[name='contact']").val();

    if(name == '') {
      alert('Введите имя');
      return false;
    }
    if(phone == '') {
      alert('Введите контакт');
      return false;
    }
    
  });
});