document.addEventListener("DOMContentLoaded", function () {
    fetch("sections/navbar/navbar.html")
      .then(response => response.text())
      .then(data => document.getElementById("navbar").innerHTML = data);

    fetch("sections/banner/banner.html")
      .then(response => response.text())
      .then(data => document.getElementById("banner").innerHTML = data); 

    fetch('sections/pets/pets.html')
      .then(response => response.text())
      .then(html => {
        document.getElementById('pets').innerHTML = html;

        const script = document.createElement('script');
        script.src = '/category/sections/pets/pets.js';
        document.body.appendChild(script);
  }); 
  
    fetch("sections/footer/footer.html")
      .then(response => response.text())
      .then(data => document.getElementById("footer").innerHTML = data);
  });
  