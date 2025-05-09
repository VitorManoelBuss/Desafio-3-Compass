document.addEventListener("DOMContentLoaded", function () {
    fetch("sections/navbar/navbar.html")
      .then(response => response.text())
      .then(data => document.getElementById("navbar").innerHTML = data);

    fetch("sections/detail/detail.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("detail").innerHTML = data;
    
        const carousel = document.querySelector('#petCarousel');
        const thumbnails = document.querySelectorAll('.thumb');
    
        carousel.addEventListener('slid.bs.carousel', function (event) {
          thumbnails.forEach(thumb => thumb.classList.remove('active'));
          thumbnails[event.to].classList.add('active');
        });
      });

      fetch("sections/customer/customer.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("customer").innerHTML = data;
    
        // Espera o conteúdo ser inserido no DOM
        setTimeout(() => {
          const carousel = document.querySelector('#customerCarousel');
          const indicators = document.querySelectorAll(
            '#customerCarousel + .text-center .carousel-indicators button'
          );
    
          if (carousel && indicators.length > 0) {
            carousel.addEventListener('slid.bs.carousel', function (event) {
              indicators.forEach(btn => btn.classList.remove('active'));
              const index = event.to;
              if (indicators[index]) {
                indicators[index].classList.add('active');
              }
            });
          }
        }, 100);
      });

    fetch("sections/whats-new/whats-new.html")
      .then(response => response.text())
      .then(data => document.getElementById("whats-new").innerHTML = data);

    fetch("sections/footer/footer.html")
      .then(response => response.text())
      .then(data => document.getElementById("footer").innerHTML = data);
  });
  