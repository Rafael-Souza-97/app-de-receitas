import React from 'react';
import PropTypes from 'prop-types';
import RecipesDrinks from './RecipesDrinks';
import RecipesMeals from './RecipesMeals';
// import { fetchDrinks12Cards, fetchMeals12Cards } from '../services/fetchs/fetch12Cards';

function Carousel({ path }) {
  // const [drinks, setDrinks] = useState([]);
  // const [meals, setMeals] = useState([]);
  // // console.log(sixDrinks, 'bebida');
  // console.log(sixMeals, 'comida');

  // useEffect(() => {
  //   // const test = async () => {
  //   //   const data = await fetchMeals12Cards();
  //   //   // console.log(data);
  //   //   setMeals(data.slice(0, 6));
  //   // };
  //   // const test2 = async () => {
  //   //   const data = await fetchDrinks12Cards();
  //   //   setDrinks(data.slice(0, 6));
  //   // };
  //   // console.log(drinks, 'bebida');
  //   // console.log(meals, 'comida');
  //   // test();
  //   // test2();
  //   console.log(sixMeals, 'broca');
  //   console.log(sixDrinks, 'bebida');
  // }, []);

  // const mapSixDrinks = () => {
  //   const items = sixMealsDrinks.map((drink, index) => (
  //     <div
  //       className="carousel-img-container"
  //       key={ index }
  //       data-testid={ `${index}-recommendation-card` }
  //     >
  //       <h5 data-testid={ `${index}-recommendation-title` }>{drink.strMeal}</h5>
  //       <img
  //         className="carousel-img"
  //         src={ drink.strMealThumb }
  //         alt={ drink.strMeal }

  //       />
  //     </div>
  //   ));
  //   return items;
  // };

  // const mapSixMeals = () => {
  //   const items = sixDrinksMeal.map((meal, index) => (
  //     <div
  //       className="carousel-img-container"
  //       key={ index }
  //       data-testid={ `${index}-recommendation-card` }
  //     >

  //       <h5 data-testid={ `${index}-recommendation-title` }>{meal.strDrink}</h5>

  //       <img
  //         className="carousel-img"
  //         src={ meal.strDrinkThumb }
  //         alt={ meal.strDrink }

  //       />

  //     </div>
  //   ));
  //   return items;
  // };

  // const feemdeus = () => {
  //   if (path.includes('meals')) {
  //     return mapSixMeals();
  //   } return mapSixDrinks();
  // };

  return (

    <div className="carousel">
      {/* {feemdeus()} */}
      {path.includes('meals') ? <RecipesDrinks /> : <RecipesMeals />}
    </div>

  );
}

Carousel.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Carousel;
