import React from "react";
import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import PokeCard from "../components/PokedexPage/PokeCard";
import SelectType from "../components/PokedexPage/SelectType";
import '../components/PokemonPage/styles/PokedexPage.css';

const PokedexPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [typeSelected, setTypeSelected] = useState('allPokemons');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(18);

  const trainerName = useSelector(states => states.trainer);

  const url = `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${(currentPage - 1) * pageSize}`;
  const [pokemons, getPokemons, getTypePokemon] = useFetch(url);

  useEffect(() => {
    if (typeSelected === 'allPokemons') {
      getPokemons();
    } else {
      getTypePokemon(typeSelected);
    }
  }, [typeSelected, currentPage]);

  const inputName = useRef();

  const handleSearch = e => {
    e.preventDefault();
    setInputValue(inputName.current.value.trim().toLowerCase());
  };

  const cbFilter = (pokeInfo) => pokeInfo.name.toLowerCase().includes(inputValue);

  const totalPageCount = Math.ceil(pokemons?.count / pageSize);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 10;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPageCount, startPage + maxPagesToShow - 1);

    if (totalPageCount > maxPagesToShow && currentPage <= Math.floor(maxPagesToShow / 2) + 1) {
      endPage = maxPagesToShow;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <body className="body-pokedex">
      <div className="contenedor">
        <img className="pikachu" src="https://seeklogo.com/images/P/pikachu-logo-619ACB690E-seeklogo.com.png" alt="" />
        <h2 className="saludo-page">Hi <span className="trainer">{trainerName}</span>, here you can find your favorite pokemon </h2>
        <form className="formulario-page" onSubmit={handleSearch}>
          <div>
            <input className="input-page" ref={inputName} type="text" />
            <button className="boton-page">Search</button>
          </div>
        </form>
        <div className="select-type">
          <SelectType setTypeSelected={setTypeSelected} />
        </div>
      </div>
      <hr className="hr-page" />
      <div className="cartas-pokemons">
        {
          pokemons?.results.filter(cbFilter).map(pokeInfo => (
            <PokeCard
              key={pokeInfo.url}
              url={pokeInfo.url}
            />
          ))
        }
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}>Previous
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => setCurrentPage(prevPage => prevPage + 1)}
          disabled={!pokemons?.next}>Next</button>
      </div>
      <div className="final-container">
        <h2 className="finalpoke">Go and catch them all...</h2>
        <img className="imagen-final" src="https://cdn.icon-icons.com/icons2/896/PNG/512/pokemon_go_play_game_cinema_film_movie_icon-icons.com_69163.png" alt="" />
      </div>
    </body>
  );
};

export default PokedexPage;