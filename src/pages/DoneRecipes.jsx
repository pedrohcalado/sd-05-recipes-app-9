import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import './DoneRecipes.css';

const copy = require('clipboard-copy');

const copyText = (type, id) => {
  const link = `http://localhost:3000/${type}s/${id}`;
  document.getElementById(`share-btn-${id}`).innerText = 'Link copiado!';
  copy(link);
};

function Card({ recipe, index }) {
  const { id, image, type, area, alcoholicOrNot, category, name, doneDate, tags } = recipe;
  return (
    <div className="containerCard">
      <div className="left">
        <Link to={`/${type}s/${id}`}>
          <img data-testid={`${index}-horizontal-image`} src={image} alt="recipe" />
        </Link>
      </div>
      <div className="right">
        <div className="share-div">
          {
            type === 'comida' ?
              <p className="type" data-testid={`${index}-horizontal-top-text`}>{`${area} - ${category}`}</p> :
              <p className="type" data-testid={`${index}-horizontal-top-text`}>{`${alcoholicOrNot} - ${category}`}</p>
          }
          <button id={`share-btn-${id}`} onClick={() => copyText(type, id)}>
            <img data-testid={`${index}-horizontal-share-btn`} src={shareIcon} alt="share" />
          </button>
        </div>
        <Link className="fav-name" to={`${type}s/${id}`}>
          <h4 data-testid={`${index}-horizontal-name`}>{name}</h4>
        </Link>
        <p className="date" data-testid={`${index}-horizontal-done-date`}>Feita em: {doneDate}</p>
        <div className="tags">
          {tags.map((tagName) => <p className="tag" data-testid={`${index}-${tagName}-horizontal-tag`}>{tagName}</p>)}
        </div>
      </div>
    </div>
  );
}

function FilterButtons(props) {
  const { setFilter } = props;
  return (
    <div className="filterButtons">
      <button
        data-testid="filter-by-all-btn"
        name="All"
        onClick={(event) => setFilter(event.target.name)}
        className="filterButton"
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        name="comida"
        onClick={(event) => setFilter(event.target.name)}
        className="filterButton"
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        name="bebida"
        onClick={(event) => setFilter(event.target.name)}
        className="filterButton"
      >
        Drink
      </button>
    </div>
  );
}

function filterRecipes(recipes, filter) {
  return (
    recipes && filter !== 'All' ?
      recipes.filter((recipe) => recipe.type === filter) :
      recipes
  );
}

const mockDoneRecipes = [
  {
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot:  'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

export default function DoneRecipes(props) {
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
  }, [])

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  return (
    <div>
      <Header props={props} />
      <FilterButtons setFilter={setFilter} />
      {
        filterRecipes(doneRecipes, filter).map((recipe, index) =>
          <Card recipe={recipe} index={index} key={recipe.id} />)
      }
    </div>
  );
}

Card.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

FilterButtons.propTypes = {
  setFilter: PropTypes.func.isRequired,
};
