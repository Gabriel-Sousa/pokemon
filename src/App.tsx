import './styles/app.css'
import { useEffect, useState } from 'react'
import { api } from './services/api'

type result = {
  name: string
  url: string
}

interface Pokemon {
  next: string
  previous: null | string
  results: result[]
}

export function App() {
  const [pokemons, setPokemons] = useState<Pokemon>({} as Pokemon)

  function loadPokemons(nextURL: string) {
    const url = nextURL === '' ? '/pokemon' : nextURL
    try {
      api.get(url).then(response => setPokemons(response.data))

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadPokemons('')
  }, [])

  const next = pokemons.next
  const previous = !pokemons.previous ? '' : pokemons.previous

  return (
    <>
      <div className='pokemonList'>
        {pokemons.results?.map((result, i) => {

          const regexResult = result.url.match(/\d+/g)
          const resultNumberId = regexResult ? regexResult.map(num => parseInt(num)) : ''
          const idImage = resultNumberId[1]
          return (
            <div key={i} >
              <span>{result.name}</span>
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idImage}.png`} alt="" />
            </div>
          )
        })}
      </div>
      <div className='navigateButtons'>
        {previous === '' ? (

          <button disabled>Voltar</button>
        ) :
          (
            <button onClick={() => loadPokemons(previous)}>Voltar</button>

          )}

        <button onClick={() => loadPokemons(next)}>Próximo</button>
      </div>
    </>
  )


}

