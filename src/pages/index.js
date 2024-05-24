import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getPokemonList } from '../services';
import Loader from '../components/loader';

function List() {
  const [pokemonList, setPokemonList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  const fetchData = async () => {
    let response = await getPokemonList()
    setPokemonList(response.results)
    setIsLoading(false)
  }

  const getPokemonId = (pokemonUrl) => {
    return pokemonUrl.slice(0, pokemonUrl.length - 1).split("pokemon/")[1]
  }

  return (
    <div className='flex flex-wrap gap-6 justify-center'>
      {isLoading
        ? <div className='flex justify-center items-center w-full'>
            <Loader /> <span className="text-gray-600">Loading...</span>
          </div>
        : pokemonList.map(({ name, url }) => (
          <Link
            key={name}
            className="flex flex-col items-center w-full sm:w-4/12 md:w-3/12 rounded-md overflow-hidden shadow-lg"
            to={`pokemon/${name}`}
          >
            <img
              className="w-[96px] h-[96px] mb-3"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(url)}.png`}
              alt={name}
            />
            <div className="w-full px-6 py-4 bg-gray-200">
              <p className="font-bold text-xl uppercase text-center">{name}</p>
            </div>
          </Link>
        ))
      }
    </div>
  );
}

export default List;
