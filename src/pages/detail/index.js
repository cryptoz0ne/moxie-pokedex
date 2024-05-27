import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { getPokemon } from '../../services';
import Loader from '../../components/loader';

function Detail() {
  let { slug } = useParams();

  const [isLoading, setIsLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState({})
  
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  const fetchData = async () => {
    const response = await getPokemon(slug)
    const tempPokemonData = {
      id: response.id,
      name: response.name,
      exp: response.base_experience,
      height: response.height,
      weight: response.weight,
      images: [],
      stats: response.stats
    }
    Object.keys(response.sprites).forEach(sprite => {
      if (response.sprites[sprite] && typeof response.sprites[sprite] === 'string')
        tempPokemonData.images.push(response.sprites[sprite])
    })
    setPokemonData(tempPokemonData)    
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col gap-6 px-6 h-full overflow-auto">
      <Link
        to="/"
        className="absolute left-5 top-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      </Link>

      <h1 className="text-3xl w-full text-center">Pokeman Detail</h1>

      {isLoading
        ? <div className='flex justify-center items-center w-full'>
            <Loader /> <span className="text-gray-600">Loading...</span>
          </div>
        : <div className='flex grow justify-center align-center items-center w-full'>
            <div className='flex flex-col md:flex-row rounded-md overflow-hidden shadow-lg'>
              <Carousel
                autoPlay
                infiniteLoop
                interval={1500}
                showArrows={false}
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                swipeable={false}
                className='p-6 max-w-[300px] flex items-center'
              >
                {pokemonData.images.map((image, index) => (
                  <img key={index} src={image} alt={pokemonData.name} />
                ))}
              </Carousel>
              <div className="flex flex-col p-6 bg-gray-200 w-full md:w-[300px]">
                <div className="flex justify-between">
                  <label>1. ID:</label>
                  <span className="font-bold">#{pokemonData.id}</span>
                </div>
                <div className="flex justify-between">
                  <label>2. Name:</label>
                  <span className="font-bold">{pokemonData.name}</span>
                </div>
                <div className="flex justify-between">
                  <label>3. Exp:</label>
                  <span className="font-bold">{pokemonData.exp}</span>
                </div>
                <div className="flex justify-between">
                  <label>4. Weight:</label>
                  <span className="font-bold">{pokemonData.weight}</span>
                </div>  
                <div className="flex justify-between">
                  <label>5. Height:</label>
                  <span className="font-bold">{pokemonData.height}</span>
                </div>
                <div className="flex flex-col">
                  <label>6. Stats</label>
                  <div className="flex flex-col pl-7">
                    {pokemonData.stats.map(({ base_stat, stat }, index) => (
                      <div className="flex justify-between" key={index}>
                        <label className="uppercase">{stat.name}</label>
                        <span className="font-bold">{base_stat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
      }
    </div>
  );
}

export default Detail;