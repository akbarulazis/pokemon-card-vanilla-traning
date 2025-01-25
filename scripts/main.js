async function getAllDataPokemon() {
  const loadingElement = document.getElementById("loading");
  loadingElement.style.display = "inline-block"; // Show loader
  let dataPokemon = [];
  try {
    for (let i = 1; i < 100; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      dataPokemon.push(await response.json());
    }
  } catch (error) {
    console.error("Fetching Error", error);
  } finally {
    loadingElement.style.display = "none"; // Hide loader
  }
  return dataPokemon;
}

function categoriesShow(dataPokemon) {
  const categoryPokemon = document.getElementById("pokemon-category");

  const allCategory = document.createElement("div");
  allCategory.classList.add("category-item");
  allCategory.textContent = "All TYPE";
  allCategory.addEventListener("click", () =>
    filterPokemon(dataPokemon, "ALL")
  );
  categoryPokemon.appendChild(allCategory);

  const categories = [];

  dataPokemon.forEach((category) => {
    if (!categories.includes(category.types[0].type.name.toUpperCase())) {
      categories.push(category.types[0].type.name.toUpperCase());
    }
  });

  categories.forEach((category) => {
    const categoryItem = document.createElement("div");
    categoryItem.classList.add("category-item");
    categoryItem.textContent = category;
    categoryItem.addEventListener("click", () =>
      filterPokemon(dataPokemon, category)
    );
    // console.log(category);
    categoryPokemon.appendChild(categoryItem);
  });
}

function filterPokemon(dataPokemon, selectedType) {
  if (selectedType === "ALL") {
    pokemonCard(dataPokemon);
  } else {
    const filteredPokemon = dataPokemon.filter(
      (pokemon) => pokemon.types[0].type.name.toUpperCase() === selectedType
    );
    pokemonCard(filteredPokemon);
  }
}

function pokemonCard(dataPokemon) {
  const mainPokemon = document.getElementById("pokemonCard");
  mainPokemon.innerHTML = "";
  dataPokemon.forEach((category) => {
    const pokemonName =
      category.name.charAt(0).toUpperCase() + category.name.slice(1);
    const pokemonId = category.id;
    const typesOnePokemon = category.types[0].type.name.toUpperCase();
    const pokemonImg = category.sprites.other["official-artwork"].front_default;

    const mainPokeCard = document.createElement("div");
    mainPokeCard.className = `pokecard ${typesOnePokemon.toLowerCase()} main`;

    const pokemonPic = document.createElement("div");
    pokemonPic.className = "pokePic";

    const pokemonImageHtml = document.createElement("img");
    pokemonImageHtml.className = "pokeImage";
    pokemonImageHtml.src = pokemonImg;
    pokemonPic.appendChild(pokemonImageHtml);

    mainPokeCard.appendChild(pokemonPic);

    const pokemonNumberElement = document.createElement("h2");
    pokemonNumberElement.textContent = pokemonId;
    mainPokeCard.appendChild(pokemonNumberElement);

    const pokemonNameElement = document.createElement("h4");
    pokemonNameElement.textContent = pokemonName;
    mainPokeCard.appendChild(pokemonNameElement);

    const typeClassPoke = document.createElement("div");
    typeClassPoke.className = "pokeClass";

    const primaryTypePoke = document.createElement("h5");
    primaryTypePoke.textContent = typesOnePokemon;
    typeClassPoke.appendChild(primaryTypePoke);

    mainPokeCard.appendChild(typeClassPoke);

    mainPokemon.appendChild(mainPokeCard);
  });
}

async function loadData() {
  const pokemon = await getAllDataPokemon();
  categoriesShow(pokemon);
  pokemonCard(pokemon);
}

loadData();
