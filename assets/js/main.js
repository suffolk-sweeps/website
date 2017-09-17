document.addEventListener("DOMContentLoaded", function() {
  smoothScroll();
  initMap();
  initContactForm();
});

/**
 * Add click event listener to anchor links to smoothly scroll to their target.
 */
function smoothScroll() {
  const anchorLinks = [].slice.call(document.querySelectorAll('a[href*="#"]:not([href="#"])'));

  anchorLinks.forEach(function(anchorLink) {
    // Check the path and hostname of the link matches the current page.
    if (location.pathname.replace(/^\//,'') == anchorLink.pathname.replace(/^\//,'') && location.hostname == anchorLink.hostname) {
      anchorLink.addEventListener('click', function(event) {
        // Disable default link behaviour.
        event.preventDefault();

        // Get target element.
        const targetId = anchorLink.hash.slice(1);
        const target = document.getElementById(targetId);

        // Check target exists.
        if (target != undefined) {
          // Scroll to target.
          $('html,body').animate({scrollTop: $(target).offset().top}, 700);
        }
      });
    }
  });
}

/**
 * Initialise Google map of area covered.
 */
function initMap() {
  // Define center of map.
  const center = new google.maps.LatLng(52.069417, 0.714399);

  // Initialise map.
  const map = new google.maps.Map(document.getElementById('Map--areas'), {
    center: center,
    zoom: 9,
    disableDefaultUI: true,
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: false
  });

  // Draw radius of area covered on map.
  new google.maps.Circle({
    strokeColor: '#DC3522',
    strokeOpacity: 0.7,
    strokeWeight: 3,
    fillColor: '#DC3522',
    fillOpacity: 0.35,
    map: map,
    center: center,
    radius: 32186.88
  });
}

/**
 * Initialise contact for to submit via AJAX.
 */
function initContactForm() {
  const form = document.getElementById('ContactForm');
  const submit = document.getElementById('ContactForm-submit');

  submit.addEventListener('click', function(event) {
    // Return if form is invalid.
    if(!form.checkValidity()) {
      return;
    }

    // Disable default button behaviour.
    event.preventDefault();

    // Submit contact form to Form Spree via AJAX.
    $.ajax({
      url: "https://formspree.io/suffolksweeps@gmail.com",
      method: "POST",
      data: $("#ContactForm").serialize(),
      dataType: "json"
    }).done(function(data) {
      const alert = $('<div>')
        .addClass('AlertBox is-status')
        .text('Thank you for your enquiry. We will be in touch shortly.');

      $(form).find('.AlertBox').remove();
      $(form).prepend(alert);
      form.reset();
    }).fail(function(jqXHR, textStatus, errorThrown )  {
      const alert = $('<div>')
        .addClass('AlertBox is-error')
        .text('There was an error with your enquiry. Please try again.');

      $(form).find('.AlertBox').remove();
      $(form).prepend(alert);
    });
  });
}
