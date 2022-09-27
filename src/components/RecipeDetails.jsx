import React from 'react';
// import { fetchDrinksDetails, fetchMealsDetails, drinkIngredientsAndMeasure,
//   mealIngredientsAndMeasure } from '../services/fetchs/fetchItemsDetails';
// import DrinkDetails from './pages/Drink-Details';

function RecipeDetails({ id, path, dataMeal,
  filteredIngredienteMeal, filteredMeasureMeal,
  dataDrink, filteredIngredienteDrink, filteredMeasureDrink }) {
//   const [infoMeals, setInfoMeals] = useState([]);
//   const [ingredientesMeal, setIngredientesMeal] = useState({
//     ingredientes: [],
//     measures: [],
//   });
  // const [infoDrinks, setInfoDrinks] = useState([]);
  // const [ingredientesDrink, setIngredientesDrink] = useState({
  //   ingredientes: [],
  //   measures: [],
  // });
  // console.log(id);
  // console.log(path);

  // useEffect(() => {
  //   const getDrinkInfo = async () => {
  //     const data = await fetchDrinksDetails(id);
  //     setInfoDrinks(data);
  //   };

  //   const ingredientesAndMeasure = async () => {
  //     const upDateIngredients = await drinkIngredientsAndMeasure(id, 'strIngredient');
  //     const upDateMeasures = await drinkIngredientsAndMeasure(id, 'strMeasure');
  //     setIngredientesDrink({
  //       ...ingredientesDrink,
  //       ingredientes: upDateIngredients,
  //       measures: upDateMeasures,
  //     });
  //   };

  //   ingredientesAndMeasure();
  //   getDrinkInfo();
  // }, [id]);

  // useEffect(() => {
  //   const getMealInfo = async () => {
  //     const data = await fetchMealsDetails(id);
  //     setInfoMeals(data);
  //   };

  //   const ingredientesAndMeasure = async () => {
  //     const upDateIngredients = await mealIngredientsAndMeasure(id, 'strIngredient');
  //     const upDateMeasures = await mealIngredientsAndMeasure(id, 'strMeasure');
  //     setIngredientesMeal({
  //       ...ingredientesMeal,
  //       ingredientes: upDateIngredients,
  //       measures: upDateMeasures,
  //     });
  //   };

  //   ingredientesAndMeasure();
  //   getMealInfo();
  // }, [id]);

  // console.log(infoDrinks);

  // const showDrinkInfo = () => {
  //   const {
  //     idDrink,
  //     strDrink,
  //     strDrinkThumb,
  //     strInstructions,
  //     strCategory,
  //   } = infoDrinks[0];

  //   return (
  //     <>
  //       <img data-testid="recipe-photo" src={ strDrinkThumb } alt={ strDrink } />
  //       <h1 data-testid="recipe-title">{strDrink}</h1>
  //       <h2>Categoria</h2>
  //       <p data-testid="recipe-category">{strCategory}</p>
  //       <h2>Instruções de preparo</h2>
  //       <p data-testid="instructions">{strInstructions}</p>

  //     </>
  //   );
  // };

  const mapDrinks = () => {
    const info = dataDrink.map((element, index) => (
      <div key={ index }>
        <img
          data-testid="recipe-photo"
          src={ element.strDrinkThumb }
          alt={ element.strDrink }
        />
        <h1
          data-testid="recipe-title"
        >
          {element.strDrink}

        </h1>
        <h2>Categoria</h2>
        <p
          data-testid="recipe-category"
        >
          {element.strCategory}

        </p>
        <p>{element.strAlcoholic}</p>
        <h2>Instruções de preparo</h2>
        <p
          data-testid="instructions"
        >
          {element.strInstructions}

        </p>
        <h2>Ingredientes</h2>
        <ul>
          {filteredIngredienteDrink.map((ingrediente, i) => (
            <li
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              {ingrediente}

            </li>
          ))}
        </ul>
        <h2>quantidades</h2>
        <ul>
          {filteredMeasureDrink.map((measure, indice) => (
            <li key={ indice }>
              {measure}
            </li>
          ))}
        </ul>
      </div>
    ));
    return info;
  };

  const mapMeals = () => {
    const info = dataMeal.map((element, index) => (
      <div key={ index }>
        <img
          data-testid="recipe-photo"
          src={ element.strMealThumb }
          alt={ element.strMeal }
        />
        <h1
          data-testid="recipe-title"
        >
          {element.strMeal}

        </h1>
        <h2>Categoria</h2>
        <p
          data-testid="recipe-category"
        >
          {element.strCategory}

        </p>
        <h2>Instruções de preparo</h2>
        <iframe
          data-testid="video"
          title="video"
          src={ element.strYoutube }
          width="100%"
          height="360"
        />
        <p
          data-testid="instructions"
        >
          {element.strInstructions}

        </p>
        <h2>Ingredientes</h2>
        <ul>
          {filteredIngredienteMeal.map((x, i) => (
            <li
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              {x}

            </li>
          ))}
        </ul>
        <h2>quantidades</h2>
        <ul>
          {filteredMeasureMeal.map((y, indice) => (
            <li key={ indice }>
              {y}
            </li>
          ))}
        </ul>
      </div>
    ));
    return info;
  };
  const feemdeus = () => {
    if (path.includes('meals')) {
      return mapMeals();
    } return mapDrinks();
  };
  return (
    <>
      <div>aleluia</div>
      {id}
      {feemdeus()}
      {/* {path.includes('drinks') && infoDrinks.length > 0 && mapDrinks() } */}
      {/* {mapDrinks()} */}
      {/* {showDrinkInfo()} */}
    </>
  );
}

export default RecipeDetails;
