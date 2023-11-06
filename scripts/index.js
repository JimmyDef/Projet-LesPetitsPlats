// import { getData } from "./utils/modules";
import { recipes } from "../assets/data/recipes.js";

const articleSection = document.getElementById("card-wrapper");

// -----------------------------------------------------------
// Fonction création des cards
// -----------------------------------------------------------

const getArticleDom = (data) => {
  const { image, name, ingredients, description } = data;
  const imgUrl = `./assets/images/${image}`;
  const ingredientsWrapper = document.getElementById("");

  const article = document.createElement("article");
  article.className = "article";
  article.innerHTML = ` 
 
          <div class="article__img-wrapper">
            <img src="${imgUrl}" alt="${name}" class="article__img">
          </div>
         
          <h2 class="article__title">${name}</h2>
          <p  class="article__recipe">RECETTE</p>
          <p class="article__details">${description}</p>
        <p class="article__ingredients">INGRÉDIENTS</p>
        <div class="article__ingredients-wrapper" id="ingredients-wrapper"></div>
`;
  articleSection.appendChild(article);
};

recipes.forEach((data) => {
  getArticleDom(data);
});
