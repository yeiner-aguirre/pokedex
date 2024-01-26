import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import { useEffect } from "react"
import '../components/PokemonPage/styles/PokemonPage.css'

const PokemonPage = () => {

  const { id } = useParams()

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const [pokemon, getPokemon] = useFetch(url)

  useEffect(() => {
    getPokemon()
  }, [])

  return (
    <body className="pokemon-body">
      <div className="pokemon-card">
        <img className="img-pokemon" src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
        <h2 className="pokemon-name">{pokemon?.name}</h2>
        <div className="pokemon-details">
          <div className="types-section">
            <h3>Type</h3>
            <ul className="types-pokemon">
              {pokemon?.types.map(typeInfo => (
                <li className="types-item-pokemon" key={typeInfo.type.url}>
                  {typeInfo.type.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="stats-section">
            <h2>STATS</h2>
            <ul className="pokemon_stats">
              {pokemon?.stats.map(statInfo => (
                <li className="pokemon_stats_item" key={statInfo.stat.url}>
                  <span className="pokemon_stats_label">{statInfo.stat.name}</span>
                  <div className="stat-bar">
                    <div
                      className="stat-fill"
                      style={{ width: `${(statInfo.base_stat / 150) * 100}%` }}
                    ></div>
                  </div>
                  <span className="pokemon_stats_value">{statInfo.base_stat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </body>
  )
}

export default PokemonPage