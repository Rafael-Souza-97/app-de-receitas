import React, { useEffect } from 'react';
// import { fetchDrinks12Cards, fetchMeals12Cards } from '../services/fetchs/fetch12Cards';

function Carousel({ sixMeals = [], sixDrinks = [], path }) {
  // const [drinks, setDrinks] = useState([]);
  // const [meals, setMeals] = useState([]);
  // // console.log(sixDrinks, 'bebida');
  // console.log(sixMeals, 'comida');

  useEffect(() => {
    // const test = async () => {
    //   const data = await fetchMeals12Cards();
    //   // console.log(data);
    //   setMeals(data.slice(0, 6));
    // };
    // const test2 = async () => {
    //   const data = await fetchDrinks12Cards();
    //   setDrinks(data.slice(0, 6));
    // };
    // console.log(drinks, 'bebida');
    // console.log(meals, 'comida');
    // test();
    // test2();
    console.log(sixMeals, 'broca');
    console.log(sixDrinks, 'bebida');
  }, []);

  const mapSixDrinks = () => {
    const items = sixDrinks.map((drink, index) => (
      <div
        className="carousel-img-container"
        key={ index }

      >
        <h3 data-testid={ `${index}-recommendation-card` }>{drink.strDrink}</h3>
        <img
          className="carousel-img"
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
          data-testid={ `${index}-recommendation-title` }
        />
      </div>
    ));
    return items;
  };

  const mapSixMeals = () => {
    const items = sixMeals.map((meal, index) => (
      <div
        className="carousel-img-container"
        key={ index }

      >
        <h3 data-testid={ `${index}-recommendation-card` }>{meal.strDrink}</h3>
        <img
          className="carousel-img"
          src={ meal.strMealThumb }
          alt={ meal.strMeal }
          data-testid={ `${index}-recommendation-title` }
        />
      </div>
    ));
    return items;
  };

  const feemdeus = () => {
    if (path.includes('meals')) {
      return mapSixMeals();
    } return mapSixDrinks();
  };

  return (
    <div className="carousel">
      {feemdeus()}
    </div>
  );
}

export default Carousel;
