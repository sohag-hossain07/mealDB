// meal section
const mealSection = document.getElementById("meal-section");

const loadMeals = () => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=fish`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));
};

const searchMeals = () => {
  const inputField = document.getElementById("input-field");
  const inputValue = inputField.value;
  loadSearchedMeal(inputValue);

  // clear meal section
  mealSection.textContent = "";

  // clear input field
  inputField.value = "";
};

const loadSearchedMeal = (search) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));
};

const displayMeals = (meals) => {
  meals.forEach((meal) => {
    const column = document.createElement("div");
    column.classList.add("col");
    column.innerHTML = `
      <div class="card h-100">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="${
      meal.strTags
    }" />
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">
            ${meal.strInstructions.slice(0, 100)}
          </p>
          </div>
          <button onclick="searchMeal(${
            meal.idMeal
          })" type="button" class="button btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#meal-details">
            Launch demo modal
          </button>
      </div>
    `;

    // column append in the meal section
    mealSection.appendChild(column);
  });
};

const searchMeal = (search) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${search}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => mealDetails(data.meals[0]));
};

const mealDetails = (meal) => {
  console.log(meal);
  document.getElementById("mealDetailsModal").innerText = `${meal.strMeal}`;
  const mealDetailsBody = document.getElementById("meal-details-body");
  mealDetailsBody.innerHTML = `
    <div class='w-100 text-center'>
      <img class='img-fluid' style='max-height: 500px; object-fit: cover' src='${meal.strMealThumb}' alt='${meal.strTags}' />
    </div>
    <p class='mt-5'>${meal.strInstructions}</p>
    <a class='mt-4' href='${meal.strYoutube}' target='_blank'>Go to Youtube video</a>
  `;
};

loadMeals();
