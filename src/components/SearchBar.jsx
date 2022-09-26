import React from 'react';

function SearchBar() {
  return (
    <div>
      <input
        type="radio"
        data-testid="ingredient-search-radio"
        value="nome-do-ingrediente"
      />
      Ingrediente
      <input
        type="radio"
        data-testid="name-search-radio"
        value="nome-da-receita"
      />
      Nome da receita
      <input
        type="radio"
        data-testid="first-letter-search-radio"
        value="primeira-letra"
      />
      Começa com ...
      <button
        type="button"
        data-testid="exec-search-btn"
        value="buscar"
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
