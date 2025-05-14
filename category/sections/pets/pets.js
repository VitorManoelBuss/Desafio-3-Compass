const maleCheckbox = document.getElementById('male');
const femaleCheckbox = document.getElementById('female');
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
const petGrid = document.querySelector('.row.g-4');
const petColumns = Array.from(petGrid.children);
const allCards = Array.from(document.querySelectorAll('.pet-card'));
const paginationContainer = document.getElementById('pagination-container');

let currentPage = 1;
const cardsPerPage = 6;

// Variável para armazenar os cards filtrados
let filteredCards = [];

// Event listeners
maleCheckbox.addEventListener('change', () => { filterPets(); });
femaleCheckbox.addEventListener('change', () => { filterPets(); });
colorCheckboxes.forEach(cb => cb.addEventListener('change', filterPets));
minPriceInput.addEventListener('input', filterPets);
maxPriceInput.addEventListener('input', filterPets);
breedCheckboxes.forEach(cb => cb.addEventListener('change', filterPets));
document.addEventListener('DOMContentLoaded', () => {
    filterPets();
});

// Funções principais
function filterPets() {
    const showMale = maleCheckbox.checked;
    const showFemale = femaleCheckbox.checked;
    const selectedColors = colorCheckboxes.filter(cb => cb.checked).map(cb => cb.id.replace('color', '').toLowerCase());
    const selectedBreeds = breedCheckboxes.filter(cb => cb.checked).map(cb => cb.id.toLowerCase());
    const minPrice = parseInt(minPriceInput.value) || 0;
    const maxPrice = parseInt(maxPriceInput.value) || Infinity;

    let visibleCount = 0;

    // Filtrando os cards
    filteredCards = allCards.filter(card => {
        const gender = card.getAttribute('data-gender');
        const color = (card.getAttribute('data-color') || '').toLowerCase();
        const breed = (card.getAttribute('data-breed') || '').toLowerCase();
        const price = parseInt(card.getAttribute('data-price'));

        const genderMatch =
            (!showMale && !showFemale) ||
            (gender === 'male' && showMale) ||
            (gender === 'female' && showFemale);

        const colorMatch =
            selectedColors.length === 0 ||
            selectedColors.some(selected => color.includes(selected));

        const breedMatch =
            selectedBreeds.length === 0 ||
            selectedBreeds.includes(breed);

        const priceMatch = price >= minPrice && price <= maxPrice;

        if (genderMatch && colorMatch && breedMatch && priceMatch) {
            visibleCount++;
            return true;
        }
        return false;
    });

    updateTitle(showMale, showFemale, selectedColors, selectedBreeds, visibleCount);
    paginateVisiblePets();
}

function updateTitle(showMale, showFemale, selectedColors, selectedBreeds, count) {
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
    titleCount.textContent = count;
}

function paginateVisiblePets() {
    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

    // Esconde todos os cards
    allCards.forEach(card => card.closest('.col-md-4').style.display = 'none');

    // Calcula o intervalo de cards a serem exibidos
    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    // Exibe os cards filtrados da página atual
    filteredCards.slice(start, end).forEach(card => card.closest('.col-md-4').style.display = 'block');

    updatePaginationButtons(totalPages);
}

function updatePaginationButtons(totalPages) {
    paginationContainer.innerHTML = '';

    if (totalPages <= 1) return;

    // Cria os botões de navegação das páginas
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === currentPage ? 'active' : ''}`;
        const a = document.createElement('a');
        a.className = 'page-link';
        a.href = '#';
        a.textContent = i;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            paginateVisiblePets();
        });
        li.appendChild(a);
        paginationContainer.appendChild(li);
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
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