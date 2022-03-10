import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import icons from "../img/icons.svg";

import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".Recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpiner();

    // load recipe

    await model.loadRecipe(id);
    const { recipe } = model.state.recipe;

    // render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

controlRecipes();

["hashchange", "load"].forEach((ev) =>
  window.addEventListener(ev, controlRecipes)
);
