const maleCheckbox = document.getElementById('male');
const femaleCheckbox = document.getElementById('female');
const petCards = document.querySelectorAll('.pet-card');
const colorCheckboxes = [
    document.getElementById('colorRed'),
    document.getElementById('colorApricot'),
    document.getElementById('colorWhite'),
    document.getElementById('colorSilver'),
    document.getElementById('colorTan')
];
const minPriceInput = document.querySelector('input[placeholder="Min"]');
const maxPriceInput = document.querySelector('input[placeholder="Max"]');
const breedCheckboxes = [
    document.getElementById('small'),
    document.getElementById('medium'),
    document.getElementById('large')
];
const titleGender = document.getElementById('title-gender');
const titleCount = document.getElementById('title-count');
const sortSelect = document.querySelector('.form-select.w-auto');
const petGrid = document.querySelector('.row.g-4');
const petColumns = Array.from(petGrid.children); // .col-md-4 col-sm-6
const originalOrder = [...petColumns]; // Clonamos para preservar



maleCheckbox.addEventListener('change', filterPets);
femaleCheckbox.addEventListener('change', filterPets);
colorCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterPets);
});
minPriceInput.addEventListener('input', filterPets);
maxPriceInput.addEventListener('input', filterPets);
breedCheckboxes.forEach(cb => cb.addEventListener('change', filterPets));
sortSelect.addEventListener('change', () => {
    sortPets();
    filterPets(); // Para reaplicar o filtro após reordenar
});






function filterPets() {
    const showMale = maleCheckbox.checked;
    const showFemale = femaleCheckbox.checked;

    // Filtros de cor
    const selectedColors = colorCheckboxes
        .filter(cb => cb.checked)
        .map(cb => cb.id.replace('color', '').toLowerCase());

    // Filtros de raça
    const selectedBreeds = breedCheckboxes
        .filter(cb => cb.checked)
        .map(cb => cb.id.toLowerCase());

    // Filtros de preço
    const minPrice = parseInt(minPriceInput.value) || 0;
    const maxPrice = parseInt(maxPriceInput.value) || Infinity;

    petCards.forEach(card => {
        const gender = card.getAttribute('data-gender');
        const color = card.getAttribute('data-color') || '';
        const breed = card.getAttribute('data-breed') || '';
        const price = parseInt(card.getAttribute('data-price'));
        const col = card.closest('.col-md-4');

        const genderMatch =
            (!showMale && !showFemale) ||
            (gender === 'male' && showMale) ||
            (gender === 'female' && showFemale);

        const colorMatch =
            selectedColors.length === 0 ||
            selectedColors.some(selectedColor => color.includes(selectedColor));

        const breedMatch =
            selectedBreeds.length === 0 ||
            selectedBreeds.includes(breed.toLowerCase());

        const priceMatch = price >= minPrice && price <= maxPrice;

        if (genderMatch && colorMatch && breedMatch && priceMatch) {
            col.style.display = 'block';
        } else {
            col.style.display = 'none';
        }
    });

        let visibleCount = 0;

    petCards.forEach(card => {
        const gender = card.getAttribute('data-gender');
        const color = card.getAttribute('data-color') || '';
        const breed = card.getAttribute('data-breed') || '';
        const price = parseInt(card.getAttribute('data-price'));
        const col = card.closest('.col-md-4');

        const genderMatch =
            (!showMale && !showFemale) ||
            (gender === 'male' && showMale) ||
            (gender === 'female' && showFemale);

        const colorMatch =
            selectedColors.length === 0 ||
            selectedColors.some(selectedColor => color.includes(selectedColor));

        const breedMatch =
            selectedBreeds.length === 0 ||
            selectedBreeds.includes(breed.toLowerCase());

        const priceMatch = price >= minPrice && price <= maxPrice;

        if (genderMatch && colorMatch && breedMatch && priceMatch) {
            col.style.display = 'block';
            visibleCount++;
        } else {
            col.style.display = 'none';
        }
    });

    // Construir título com base nos filtros
    let titleParts = [];

    if (showMale && !showFemale) titleParts.push('Male');
    else if (showFemale && !showMale) titleParts.push('Female');
    else if (showMale && showFemale) titleParts.push('All Genders');

    if (selectedColors.length === 1) {
        titleParts.push(capitalize(selectedColors[0]));
    } else if (selectedColors.length > 1) {
        titleParts.push('Multicolor');
    }

    if (selectedBreeds.length === 1) {
        titleParts.push(capitalize(selectedBreeds[0]));
    } else if (selectedBreeds.length > 1) {
        titleParts.push('Mixed Sizes');
    }

    if (titleParts.length === 0) {
        titleParts.push('Dogs');
    } else {
        titleParts.push('Dog');
    }

    titleGender.textContent = titleParts.join(' ');
    titleCount.textContent = visibleCount;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function sortPets() {
    const selectedOption = sortSelect.value;
    let sortedColumns = [];

    const getPrice = el => {
        const card = el.querySelector('.pet-card');
        return card ? parseInt(card.getAttribute('data-price')) || 0 : 0;
    };

    if (selectedOption === 'Price Low to High') {
        sortedColumns = [...petColumns].sort((a, b) => getPrice(a) - getPrice(b));
    } else if (selectedOption === 'Price High to Low') {
        sortedColumns = [...petColumns].sort((a, b) => getPrice(b) - getPrice(a));
    } else {
        sortedColumns = [...originalOrder];
    }

    // Aplica ordenação
    sortedColumns.forEach(col => petGrid.appendChild(col));
}




/*function updateTitle(petCards) {
  const genderEl = document.getElementById('title-gender');
  const countEl = document.getElementById('title-count');

  if (!genderEl || !countEl) return;

  let visibleCount = 0;
  let visibleGenders = [];

  petCards.forEach(card => {
    const col = card.closest('.col-md-4');
    const gender = card.getAttribute('data-gender');

    if (col && col.style.display !== 'none') {
      visibleCount++;
      visibleGenders.push(gender);
    }
  });

  countEl.textContent = visibleCount;

  const uniqueGenders = [...new Set(visibleGenders)];

  if (uniqueGenders.length === 1) {
    const gender = uniqueGenders[0];
    genderEl.textContent = gender.charAt(0).toUpperCase() + gender.slice(1);
  } else {
    genderEl.textContent = 'Small Dog';
  }
}*/