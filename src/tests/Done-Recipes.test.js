import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const horizontalImagee0 = '0-horizontal-image';

const mockSetLocalStorage = () => global.localStorage.setItem('doneRecipes', JSON.stringify([
  {
    id: '52977',
    type: 'meal',
    category: 'Side',
    nationality: 'Turkish',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    doneDate: '29/09/2022',
    tags: ['Soup'],
  },
  {
    id: '17203',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: '',
    name: 'Kir',
    image: 'https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg',
    doneDate: '29/09/2022',
    tags: ['IBA', 'ContemporaryClassic'],
  },
]));

describe('<DoneRecipes />', () => {
  test('Se os botões estão na tela', () => {
    // localStorage.clear();
    mockSetLocalStorage();
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, 'email@email.com');

    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, '1234567');

    const loginBtn = screen.getByTestId('login-submit-btn');
    userEvent.click(loginBtn);

    const profileBtn = screen.getByRole('img', { name: /profile icon/i });
    userEvent.click(profileBtn);

    const doneRecipesBtns = screen.getByTestId('profile-done-btn');
    userEvent.click(doneRecipesBtns);

    const allBtn = screen.getByTestId('filter-by-all-btn');
    expect(allBtn).toBeInTheDocument();

    const mealBtn = screen.getByTestId('filter-by-meal-btn');
    expect(mealBtn).toBeInTheDocument();

    const drinkBtn = screen.getByTestId('filter-by-drink-btn');
    expect(drinkBtn).toBeInTheDocument();

    const shareBtn = screen.getByTestId(horizontalImagee0);
    expect(shareBtn).toBeInTheDocument();

    // screen.logTestingPlaygroundURL();
  });
  test('Se os titulos estão na tela', () => {
    mockSetLocalStorage();
    renderWithRouter(<App />);

    const mainTittle = screen.getByTestId('page-title');
    expect(mainTittle).toBeInTheDocument();

    const itemNationality = screen.getByRole('heading', {
      name: /turkish - side/i, level: 2,
    });
    expect(itemNationality).toBeInTheDocument();

    const itemName = screen.getByTestId('0-horizontal-name');
    expect(itemName).toBeInTheDocument();
  });
  test('Se funcionabilidade do botão de filtrar por Meal está funcionando', () => {
    mockSetLocalStorage();
    renderWithRouter(<App />);

    const filterMealBtn = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(filterMealBtn);

    const img = screen.getByTestId(horizontalImagee0);
    expect(img).toBeInTheDocument();

    // const filterDrinkBtn = screen.getByTestId('filter-by-drink-btn');
    // userEvent.click(filterDrinkBtn);
  });
  test('Se a funcionabilidade do botão de filtrar por Drink está funcionando', () => {
    mockSetLocalStorage();
    renderWithRouter(<App />);

    const filterDrinkBtn = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(filterDrinkBtn);
    const drinkImg = screen.getByTestId(horizontalImagee0);
    expect(drinkImg).toBeInTheDocument();
    // screen.logTestingPlaygroundURL();
  });
  test('Se a funcionabilidade do botão de filtrar por todos está funcionando', () => {
    mockSetLocalStorage();
    renderWithRouter(<App />);

    const filteredAllBtn = screen.getByTestId('filter-by-all-btn');
    userEvent.click(filteredAllBtn);

    const drinkImg = screen.getByTestId('1-horizontal-image');
    expect(drinkImg).toBeInTheDocument();

    const img = screen.getByTestId(horizontalImagee0);
    expect(img).toBeInTheDocument();
  });

  test('Se o botao de copiar e compartilhar mantem o usuário na mesma tela', () => {
    window.document.execCommand = jest.fn(() => 'http://localhost:3000/meals/52977');
    const { history } = renderWithRouter(<App />);
    mockSetLocalStorage();

    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(shareBtn);
    expect(history.location.pathname).toBe('/');
  });
});
