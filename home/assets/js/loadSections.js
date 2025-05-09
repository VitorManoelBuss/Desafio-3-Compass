document.addEventListener("DOMContentLoaded", function () {
  fetch("sections/hero/hero.html")
    .then(response => response.text())
    .then(data => document.getElementById("hero").innerHTML = data);

  fetch("sections/pets/pets.html")
    .then(response => response.text())
    .then(data => document.getElementById("pets").innerHTML = data);

  fetch("sections/banner/banner.html")
    .then(response => response.text())
    .then(data => document.getElementById("banner").innerHTML = data);

  fetch("sections/products/products.html")
    .then(response => response.text())
    .then(data => document.getElementById("products").innerHTML = data);

  fetch("sections/sponsorship/sponsorship.html")
    .then(response => response.text())
    .then(data => document.getElementById("sponsorship").innerHTML = data);

  fetch("sections/banner2/banner2.html")
    .then(response => response.text())
    .then(data => document.getElementById("banner2").innerHTML = data);

  fetch("sections/knowledge/knowledge.html")
    .then(response => response.text())
    .then(data => document.getElementById("knowledge").innerHTML = data);

  fetch("sections/footer/footer.html")
    .then(response => response.text())
    .then(data => document.getElementById("footer").innerHTML = data);
});
