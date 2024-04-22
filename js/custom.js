jQuery(document).ready(function($) {
    'use strict';

	var $window   = $(window),
        $document = $(document),
        $body     = $('body');

    window.SITE = {

        // Initialization
        init: function() {
            var self = this,
                obj;

            for ( obj in self ) {
                if ( self.hasOwnProperty(obj) ) {
                    var _method = self[obj];
                    if ( _method.selector !== undefined && _method.init !== undefined ) {
                        if ( $(_method.selector).length > 0 ) {
                            _method.init();
                        }
                    }
                }
            }
			
			     new WOW().init();
        },
		
		navigation: {
        selector: '.links',
        init: function() {

            $('.links').on('click', function(e) {
                e.preventDefault();
                $body.toggleClass('nav-open');
            });

            $('.menu-dropdown > a').on('click', function(e) {
                e.preventDefault();
                if ($(this).next('ul').is(':visible')) {
                    $(this).next('ul').slideUp(250);
                } else {
                    $(this).closest('ul').find('ul').slideUp(250);
                    $(this).next('ul').slideDown(250);
                }
            });

        }
    },
		
		contactForm: {
      selector: '#contactForm',
      init: function() {

          var self = $('#contactForm');

          self.validate({
              // errorElement: 'span',
              // errorLabelContainer: self.find('.form-error'),
              // wrapper: "p",
              rules: {
                  nombre: {
                      required    : true,
                      minlength   : 2
                  },
                  correo: {
                      required    : true,
                      email       : true
                  },
                  asunto: {
                      required    : true,
                      minlength   : 2
                  },
                  mensaje: {
                      required    : true,
                      minlength   : 10
                  }
              },
              messages: {
                  nombre: {
                      required    : "Por favor ingresa tu nombre.",
                      minlength   : "El nombre debe contenter por lo menos 2 caracteres"
                  },
                  correo: {
                      required    : "Por favor ingresa tu correo.",
                      minlength   : "El correo ingresado es invalido."
                  },
                  asunto: {
                      required    : "Por favor ingresa el asunto.",
                      minlength   : "El nombre debe contenter por lo menos 2 caracteres"
                  },
                  mensaje: {
                      required    : "Por favor ingresa un mensaje.",
                      minlength   : "El mensaje debe contenter por lo menos 10 caracteres"
                  }
              }
          });

          self.submit(function() {
              var $formAlert = $(this).find('.form-alert');
              var $formError = $(this).find('.form-error');
              var $loader    = $(this).find('.ajax-loader');
              var response;
              $formAlert.hide().html();
              $loader.show();
              if (self.valid()){
                  $.ajax({
                      type: "POST",
                      url: "php/contact-form.php",
                      data: $(this).serialize(),
                      success: function(msg) {
                          if (msg === 'SEND') {
                              response = '<div class="alert alert-success">¡Listo! Gracias por tu mensaje. Nos pondremos en contacto lo más rápido posible.</div>';
                          }
                          else {
                              response = '<div class="alert alert-danger">Uuups... parece que tenemos un problema.</div>';
                          }
                          $formAlert.html(response);
                          $formAlert.show();
                          $loader.hide();
                          self.reset();
                      }
                  });
                  return false;
              }
              $loader.hide();
              return false;
          });

        },
    },
      
    carousel: {
      selector: '.technologies-logos',
      init: function() {
        
        $('.technologies-logos').owlCarousel({
          loop: true,
          center: false, 
          margin: 60,
          nav: false,
          navText: [
              '<i class="bx bx-chevron-left"></i>',
              '<i class="bx bx-chevron-right"></i>'
          ],
          dots: false,
          autoWidth: false,
          autoplay: true,
          autoplayHoverPause: true,
          responsive: {
              0: {
          margin: 30,
                  items: 2
              },
              480: {
          margin: 30,
                  items: 2
              },
              667: {
          margin: 30,
                  items: 2
              },
              768: {
          margin: 40,
                  items: 3
              },
              1024: {
          margin: 60,
                  items: 5
              },
              1200: {
          margin: 60,
                  items: 5
              },
              1440: {
          margin: 60,
                  items: 6
              }
          }
        });
      },
    },
		  
		googleMap: {
      selector: '.google-map',
      init: function() {

          $('.google-map').each(function(index) {

              var self = $(this);

              self.attr('id', 'google-map-' + index);

              var mapID = self.attr('id'),
                  mapLat = self.data('lat'),
                  mapLng = self.data('lng'),
                  mapZoom = self.data('zoom') ? parseInt(self.data('zoom'), 10) : 16,
                  mapStyle = '';

              // Light style
              if (self.data('style') !== undefined && self.data('style') === 'light' ) {
                  mapStyle = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
              }

                var mapLatLng = new google.maps.LatLng(mapLat, mapLng);
                var mapConfig = {
                    zoom: mapZoom,
                    center: mapLatLng,
                    styles: mapStyle,
                    scrollwheel: false,
                    panControl: false,
                    zoomControl: true,
                    scaleControl: false,
                    mapTypeControl: false,
                    streetViewControl: false,
                };

                var map = new google.maps.Map(document.getElementById(mapID), mapConfig);

                setTimeout( function() {
                    var marker = new google.maps.Marker({
                        position: map.getCenter(),
                        map: map,
                        animation: google.maps.Animation.DROP,
                        icon: 'upload/marker.png',
                    });
                }, 1500 );

                $(window).resize( function () {
                    var center = map.getCenter();
                    google.maps.event.trigger( map, 'resize' );
                    map.setCenter( center );
                });
          });
        }
      },
		
	};
	
	$document.ready(function() {
		window.SITE.init();	
	});
    
});

