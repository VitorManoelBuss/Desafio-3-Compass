document.addEventListener("DOMContentLoaded", function () {
    fetch("sections/navbar/navbar.html")
      .then(response => response.text())
      .then(data => document.getElementById("navbar").innerHTML = data);

    fetch("sections/banner/banner.html")
      .then(response => response.text())
      .then(data => document.getElementById("banner").innerHTML = data); 

      fetch("sections/pets/pets.html")
      .then(response => response.text())
      .then(data => document.getElementById("pets").innerHTML = data); 
  
    fetch("sections/footer/footer.html")
      .then(response => response.text())
      .then(data => document.getElementById("footer").innerHTML = data);
  });
  